import { createAsyncThunk,createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { updateStatus } from "../../api/statusApi";
// import {startLocationTracking,stopLocationTracking} from './locationThunk'
import type { RootState } from "../store";
export type Status="ONLINE" | "OFFLINE" | "OCCUPIED";

interface PartnerState {
    status:Status;
    error:string | null;
    loading:boolean;
}

const initialState:PartnerState={
    status:"OFFLINE",
    loading:false,
    error:null,
}

export const updateDeliveryStatus=createAsyncThunk<Status,Status,{rejectValue:string}>('deliveryStatus/update',async(newStatus,{rejectWithValue})=>{
    try {
        const response=await updateStatus(newStatus);
        if(response.success){
            return newStatus;
        }
        else{
            return rejectWithValue(response.message || "Failed to update status")
        }
    } catch (error:any) {
        return rejectWithValue(error.response?.data?.message || "Failed to update status");
    }
})

const statusSlice=createSlice({
   name:'status',
   initialState,
   reducers:{
     setLocalStatus(state,action:PayloadAction<Status>){
        console.log("status is updaging")
        state.status=action.payload;
     }
   },
   extraReducers:(builder)=> {
       builder
            .addCase(updateDeliveryStatus.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(updateDeliveryStatus.fulfilled,(state,action:PayloadAction<Status>)=>{
                state.status=action.payload;
                state.loading=false;
            })
            .addCase(updateDeliveryStatus.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload || "Error updating status";
            })
   },
})

  export const getStatus  = (state:RootState) => state.status;
export const {setLocalStatus}=statusSlice.actions;
export default statusSlice.reducer;
// export {startLocationTracking,stopLocationTracking};