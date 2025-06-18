import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export interface Order{
  id:string;
  customerName:string;
  address:string;
  total:number;
}

interface OrderState{
    incoming:Order[]
}

const initialState: OrderState={
    incoming:[]
}


const orderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{
        addIncomingOrder: (state,action:PayloadAction<Order>)=>{
            const exists=state.incoming.find(o=>o.id===action.payload.id);
            if(!exists) state.incoming.push(action.payload);
        },
        removeOrder: (state,action:PayloadAction<string>)=>{
            state.incoming=state.incoming.filter(o=>o.id!==action.payload);
        },
        resetOrders:state=>{
            state.incoming=[];
        }
    }
})

export const {addIncomingOrder,removeOrder,resetOrders} = orderSlice.actions;
export default orderSlice.reducer;
