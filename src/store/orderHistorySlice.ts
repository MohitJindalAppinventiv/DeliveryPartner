import { createSlice } from "@reduxjs/toolkit";

export interface Location{
    address:string;
    mobileNumber:string;
    coordinates:[number,number];
}

export interface PaymentMethod{
        CASH_ON_DELIVERY:'CASH_ON_DELIVERY';
        PAID:'PAID';
}

export interface Delivery{
    orderId:string;
    restaurantId:string;
    userId:string;
    pickupLocation:Location;
    deliveryLocation:Location;
    totalOrderAmount:number;
    deliveryFee:number;
    paymentMethod:PaymentMethod;
}

export interface DeliveryResponse{
    data:Delivery[],
    total:number;
    page:number;
    limit:number;
}


const initialState={

}

const orderHistorySlice=createSlice({
    name:"orderHistory",
    initialState,
    reducers:{

    }
})


export const {}=orderHistorySlice.actions;
export default orderHistorySlice.reducer;