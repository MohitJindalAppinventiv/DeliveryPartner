import { createSlice,createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import type { EarningState,EarningsData,EarningPeriod } from "../types/earning";


const initialState:EarningState={
    data:null,
    status:"idle",
    error:null,
}

// Async Thunk
export const fetchEarnings=createAsyncThunk<EarningsData,EarningPeriod,{rejectValue:string}>("earnings/fetch",async (period,thunkAPI)=>{
    try {
        const response=await axiosInstance.get(`/api/earnings?period=${period}`);
        return response.data;
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message || "Failed to fetch earnings")
    }
})

export const earningSlice=createSlice({
    name:"earnings",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
              .addCase(fetchEarnings.pending,(state)=>{
                state.status="loading";
                state.error=null;
              })
              .addCase(fetchEarnings.fulfilled,(state,action:PayloadAction<EarningsData>)=>{
                state.status="succeeded";
                state.data=action.payload;
              })
              .addCase(fetchEarnings.rejected,(state,action)=>{
                state.status="failed";
                state.error=action.payload || "Unknow error";
              })
    }
})

export default earningSlice.reducer;