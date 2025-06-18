// import {
//   createSlice,
//   createAsyncThunk,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import axiosInstance from "../api/axiosInstance";
// import type {
//   EarningState,
//   EarningsData,
//   EarningPeriod,
// } from "../types/earningTypes";

// const initialState: EarningState = {
//   data: null,
//   status: "idle",
//   error: null,
// };

// // Async Thunk
// export const fetchEarnings = createAsyncThunk<
//   EarningsData,
//   EarningPeriod,
//   { rejectValue: string }
// >("earnings/fetch", async (period, thunkAPI) => {
//   try {
//     const response = await axiosInstance.get(
//       `/deliveryPartners/?period=${period}`
//     );
//     return response.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.message || "Failed to fetch earnings"
//     );
//   }
// });

// export const earningSlice = createSlice({
//   name: "earnings",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEarnings.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(
//         fetchEarnings.fulfilled,
//         (state, action: PayloadAction<EarningsData>) => {
//           state.status = "succeeded";
//           state.data = action.payload;
//         }
//       )
//       .addCase(fetchEarnings.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || "Unknow error";
//       });
//   },
// });

// export default earningSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchEarnings } from "../api/earningApi";
// import type { EarningData } from "../types/earningTypes";

// interface EarningState {
//   data: EarningData | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: EarningState = {
//   data: null,
//   loading: false,
//   error: null,
// };

// export const getEarnings = createAsyncThunk(
//   "earning/fetchEarnings",
//   async (_, thunkAPI) => {
//     try {
//       return await fetchEarnings();
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch earnings");
//     }
//   }
// );

// const earningSlice = createSlice({
//   name: "earning",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getEarnings.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getEarnings.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(getEarnings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default earningSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchEarnings } from "../api/earningApi";
// import type { EarningData, PeriodType } from "../types/earningTypes";

// interface EarningState {
//   data: EarningData | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: EarningState = {
//   data: null,
//   loading: false,
//   error: null,
// };

// export const getEarnings = createAsyncThunk(
//   "earning/fetchEarnings",
//   async (period: PeriodType, thunkAPI) => {
//     try {
//       return await fetchEarnings(period);
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch earnings");
//     }
//   }
// );

// const earningSlice = createSlice({
//   name: "earning",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getEarnings.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getEarnings.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(getEarnings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default earningSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllEarnings } from "../api/earningApi";
import type { PeriodType, EarningData } from "../types/earningTypes";

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
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch earnings");
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

export default earningSlice.reducer;


