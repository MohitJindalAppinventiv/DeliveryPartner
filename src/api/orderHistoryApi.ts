import axiosInstance from "./axiosInstance";
import type { PaginatedDeliveries } from "../types/deliveryTypes";
import ENDPOINTS from "./Endpoints";

export const fetchDeliveries=async(page=1,limit=10):Promise<PaginatedDeliveries>=>{
   const response = await axiosInstance.get(`${ENDPOINTS.DELIVERY_HISTORY}`,{
    params:{
        limit,
        page
    }
   });
   console.log("response",response);
   return response.data;
}