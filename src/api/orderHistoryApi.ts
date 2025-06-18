import axiosInstance from "./axiosInstance";
import type { PaginatedDeliveries } from "../types/deliveryTypes";


export const fetchDeliveries=async(page=1,limit=10):Promise<PaginatedDeliveries>=>{
   const response = await axiosInstance.get('/delivery/deliveryHistory',{
    params:{
        limit,
        page
    }
   });
   console.log("response",response);
   return response.data;
}