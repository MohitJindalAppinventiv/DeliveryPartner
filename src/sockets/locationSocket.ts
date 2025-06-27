// import { store } from "../store/index.tsx";
// import { addOrder } from "../store/slices/orderSlice.ts";
// import type { Order } from "../store/slices/orderSlice";
// import { io, Socket } from "socket.io-client";

// // Mock data for testing
// const mockItems = [
//   { id: "1", name: "Butter Chicken", quantity: 2, price: 349 },
//   { id: "2", name: "Paneer Tikka", quantity: 1, price: 299 },
//   { id: "3", name: "Dal Makhani", quantity: 1, price: 249 },
//   { id: "4", name: "Naan", quantity: 2, price: 49 },
//   { id: "5", name: "Biryani", quantity: 1, price: 399 },
// ];

// const mockCustomerNames = [
//   "Rahul Sharma",
//   "Priya Patel",
//   "Amit Kumar",
//   "Neha Singh",
//   "Raj Malhotra",
// ];

// let socket: Socket | null = null;
// const token = localStorage.getItem("managerAccessToken");

// // Retry configuration
// const MAX_RECONNECT_ATTEMPTS = 10; // Maximum number of retry attempts
// const RECONNECT_INTERVAL_MS = 5000; // Time in milliseconds between retries (5 seconds)

// const createMockWebSocketService = () => {
//   let reconnectAttempts = 0; // Counter for reconnect attempts
//   let reconnectTimeout: ReturnType<typeof setTimeout> | null = null; // To clear pending timeouts

//   const generateMockOrder = (): Order => {
//     const randomItems = mockItems
//       .sort(() => 0.5 - Math.random())
//       .slice(0, Math.floor(Math.random() * 3) + 1);

//     const totalAmount = randomItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     // Generate a unique ID for the order
//     const orderId =
//       "ORD" +
//       Math.floor(Math.random() * 1000000)
//         .toString()
//         .padStart(6, "0");

//     return {
//       _id: orderId, // Use _id as per your OrderNotification component's key
//       userId: "USR" + Math.floor(Math.random() * 1000).toString().padStart(3, "0"), // Added userId for completeness
//       customerName:
//         mockCustomerNames[Math.floor(Math.random() * mockCustomerNames.length)],
//       customerPhone:
//         "+91 " + Math.floor(Math.random() * 9000000000 + 1000000000),
//       items: randomItems,
//       total: totalAmount, // Changed totalAmount to total as per your component
//       status: "pending",
//       orderTime: new Date().toISOString(),
//       deliveryAddress: "123 Test Address, New Delhi",
//       paymentMethod: Math.random() > 0.5 ? "Online" : "Cash on Delivery",
//       tax: Math.floor(totalAmount * 0.05), // Added mock tax
//     };
//   };

//   const connectWebSocket = (restaurantId: string) => {
//     // Clear any existing reconnect timeout if trying to connect explicitly
//     if (reconnectTimeout) {
//       clearTimeout(reconnectTimeout);
//       reconnectTimeout = null;
//     }

//     if (socket && socket.connected) {
//       console.log("WebSocket already connected.");
//       return; // Prevent connecting multiple times
//     }

//     console.log(`Attempting to connect WebSocket (Attempt: ${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})`);

//     socket = io("http://localhost:3005", {
//       extraHeaders: {
//         Authorization: Bearer ${token},
//       }
//     });

//     socket.on("connect", () => {
//       console.log("WebSocket connected successfully!");
//       reconnectAttempts = 0; // Reset attempts on successful connection
//       // You might want to emit an event here to join a room specific to the restaurant
//       // socket.emit("joinRestaurantRoom", restaurantId);
//     });

//     socket.on("connect_error", (error) => {
//       console.error("WebSocket connection error:", error.message);
//       if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
//         reconnectAttempts++;
//         console.log(Retrying connection in ${RECONNECT_INTERVAL_MS / 1000} seconds...);
//         reconnectTimeout = setTimeout(() => connectWebSocket(restaurantId), RECONNECT_INTERVAL_MS);
//       } else {
//         console.error("Maximum WebSocket reconnect attempts reached. Please check the server.");
//         // Optionally dispatch an action to inform the UI about persistent connection issues
//         // store.dispatch(setConnectionStatus('failed'));
//       }
//     });

//     socket.on("disconnect", (reason) => {
//       console.log("WebSocket disconnected:", reason);
//       if (reason === "io client disconnect") {
//         // Disconnected intentionally, no retry needed
//         console.log("Disconnected by client.");
//       } else {
//         // Disconnected due to server or network issues, try to reconnect
//         console.log("Attempting to reconnect WebSocket...");
//         if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
//           reconnectAttempts++;
//           reconnectTimeout = setTimeout(() => connectWebSocket(restaurantId), RECONNECT_INTERVAL_MS);
//         } else {
//           console.error("Maximum WebSocket reconnect attempts reached after disconnect.");
//           // store.dispatch(setConnectionStatus('failed'));
//         }
//       }
//     });

//     socket.on("newOrder", (data) => {
//       console.log("New order received:", data);
//       store.dispatch(addOrder(data));
//     });

//     // You can uncomment the mock order generation if you want to test it locally
//     // // har 15-30 sec me ek order generate karega
//     // intervalId = window.setInterval(() => {
//     //   const mockOrder = generateMockOrder();
//     //   store.dispatch(addOrder(mockOrder)); // Dispatch mock order
//     // }, Math.random() * 15000 + 15000);

//     // // pehla order generate karega turant
//     // setTimeout(() => {
//     //   const mockOrder = generateMockOrder();
//     //   store.dispatch(addOrder(mockOrder));
//     // }, 2000);
//   };

//   return {
//     connect: (restaurantId: string) => {
//       connectWebSocket(restaurantId);
//     },
//     handleOrderAccept: (orderId: string) => {
//       console.log("Accepting order:", orderId);
//       if (socket) {
//         socket.emit("orderResponse", { approved: true, orderId });
//       } else {
//         console.warn("WebSocket not connected. Cannot accept order.");
//       }
//     },
//     handleOrderReject: (orderId: string) => {
//       console.log("Rejecting order:", orderId);
//       if (socket) {
//         socket.emit("orderResponse", { approved: false, orderId });
//       } else {
//         console.warn("WebSocket not connected. Cannot reject order.");
//       }
//     },
//     disconnect: () => {
//       if (socket) {
//         socket.disconnect(); // Disconnect intentionally
//         socket = null;
//         console.log("WebSocket manually disconnected.");
//       }
//       if (reconnectTimeout) {
//         clearTimeout(reconnectTimeout);
//         reconnectTimeout = null;
//       }
//       reconnectAttempts = 0; // Reset attempts
//     },
//   };
// };

// export const websocketService = createMockWebSocketService();