import { io, Socket } from "socket.io-client";
import { type AppDispatch } from "../store/store";
import { acceptOrder, addIncomingOrder } from "../store/slices/orderSlice";

let socket: Socket | null = null;

const webSocketService = (dispatch: AppDispatch) => {
  const token = localStorage.getItem("authToken");
  let isConnected = false;

  return {
    connect: () => {
      // Prevent multiple connections
      if (socket && isConnected) {
        console.log("Socket already connected");
        return;
      }

      if (!socket) {
        socket = io("http://localhost:3003", {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
          reconnection: true,
          reconnectionDelay: 2000,
        });
      }

      socket?.on("connect", () => {
        isConnected = true;
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          socket?.emit("availableLocationUpdate", { longitude, latitude });
        });
        console.log("Web Socket Connected");
      });

      socket?.on("disconnect", () => {
        isConnected = false;
        console.log(`Disconnected`);
      });

      socket?.on("newDelivery", (order) => {
        console.log("orders", order);
        dispatch(addIncomingOrder(order));
      });

      // Set up acknowledgement listener once during connection
      socket?.on(
        "acknowledgement",
        (payload: {
          acknowledgement: boolean;
          err: string;
          orderId: string;
        }) => {
          console.log(payload, "acknowledgement");

          if (!payload.acknowledgement) {
            dispatch(acceptOrder(payload.orderId));
            console.log("Order accepted successfully:", payload.orderId);
          } else {
            console.error("Order acceptance failed:", payload.err);
            alert(`Failed to accept order: ${payload.err}`);
          }
        }
      );
    },

    disconnect: () => {
      if (socket) {
        socket.disconnect();
        socket = null;
        isConnected = false;
      }
      console.log("client disconnected successfully");
    },

    handleAvailableLocationUpdate: (payload: {
      longitude: number;
      latitude: number;
    }) => {
      if (socket) {
        socket.emit("availableLocationUpdate", payload);
        console.log(`available Location Sends Successfully`, payload);
      }
    },

    handleOccupiedLocationUpdate: (payload: {
      longitude: number;
      latitude: number;
    }) => {
      console.log("handleOccupiedLocationUpdate", payload);
      if (socket) {
        socket.emit("occupiedLocationUpdate", payload);
        console.log(`Updated Location Sends Successfully`);
      }
    },

    handleDeliveryAccept: (payload1: { orderId: string; userId: string }) => {
      console.log("handleDeliveryAccept", payload1);
      console.log("socket", socket);

      if (socket) {
        socket.emit("deliveryResponseAccept", payload1);
        console.log("Delivery acceptance sent:", payload1);
      } else {
        console.error("Socket not connected");
      }
    },
  };
};

export default webSocketService;
