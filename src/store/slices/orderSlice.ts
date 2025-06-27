// store/orderSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  orderId: string;
  userId: string;
  restaurantId: string;
  pickupLocation: {
    address: string;
    coordinates: [number, number];
    mobileNumber: string;
  };
  deliveryLocation: {
    address: string;
    coordinates: [number, number];
    mobileNumber: string;
  };
  deliveryFee: number;
  orderAmount: number;
  paymentMethod: string;
  restaurantName: string; // dummy name
  status: "NEW" | "ACCEPTED" | "PICKED_UP" | "DELIVERED";
}

interface OrderState {
  orders: Order[];
  activeOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  activeOrder: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addIncomingOrder(
      state,
      action: PayloadAction<Omit<Order, "restaurantName" | "status">>
    ) {
      const newOrder = {
        ...action.payload,
        restaurantName: "Dummy Restaurant",
        status: "NEW",
      };
      console.log(newOrder);
      state.orders.push(newOrder);
    },
    acceptOrder(state, action: PayloadAction<string>) {
      const accepted = state.orders.find((o) => o.orderId === action.payload);
      console.log("order accepted", accepted);
      if (accepted) {
        accepted.status = "ACCEPTED";
        state.activeOrder = accepted;

        state.orders = []; // remove all others
        state.orders.push(accepted);
      }
    },
    rejectOrder(state, action: PayloadAction<string>) {
      console.log(action);
      state.orders = state.orders.filter((o) => o.orderId !== action.payload);
    },
    markPickedUp(state, action: PayloadAction<string>) {
      if (state.activeOrder) state.activeOrder.status = "PICKED_UP";
      const order = state.orders.find((o) => o.orderId === action.payload);
      if (order) {
        order.status = "PICKED_UP";
      }
      console.log(state.activeOrder?.status);
    },
    markDelivered(state) {
      if (state.activeOrder) state.activeOrder.status = "DELIVERED";
    },
    clearOrders: () => {
      return initialState;
    },
  },
});

export const {
  addIncomingOrder,
  acceptOrder,
  rejectOrder,
  markPickedUp,
  markDelivered,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
