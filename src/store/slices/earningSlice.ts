

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllEarnings } from "../../api/earningApi";
import type { PeriodType, EarningData } from "../../types/earningTypes";
import type { RootState } from "../store";

interface EarningState {
  data: Partial<Record<PeriodType, EarningData>>;
  loading: boolean;
  error: string | null;
}

const initialState: EarningState = {
  data: {},
  loading: false,
  error: null,
};

export const getAllEarnings = createAsyncThunk(
  "earning/fetchAllEarnings",
  async (_, thunkAPI) => {
    try {
      return await fetchAllEarnings();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch earnings"
      );
    }
  }
);

const earningSlice = createSlice({
  name: "earning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEarnings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const getEarning = (state: RootState) => state.earnings;
export default earningSlice.reducer;
