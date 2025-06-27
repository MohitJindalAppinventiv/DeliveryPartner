import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Delivery, PaginatedDeliveries } from "../../types/deliveryTypes";
import { fetchDeliveries } from "../../api/orderHistoryApi";;

interface DeliveryState {
  deliveries: Delivery[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: DeliveryState = {
  deliveries: [],
  loading: false,
  error: null,
  totalCount: 0,
};

export const getDeliveries = createAsyncThunk(
  "delivery/fetchAll",
  async ({ page, limit }: { page: number; limit: number }) => {
    const data = await fetchDeliveries(page, limit);
    return data;
  }
);


const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default deliverySlice.reducer;
