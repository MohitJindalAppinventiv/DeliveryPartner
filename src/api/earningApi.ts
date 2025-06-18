// import axiosInstance from "./axiosInstance";
// import type { EarningData, PeriodType } from "../types/earningTypes";


// export const fetchEarnings=async (period:PeriodType)=>{
//     const response=await axiosInstance.get(`/deliveryPartners/earnings/${period}`);
//     console.log("earning api",response);
//     return response.data;
// }


import axiosInstance from "./axiosInstance";
import type { EarningData, PeriodType } from "../types/earningTypes";

const periods: PeriodType[] = ["daily", "weekly", "monthly", "yearly"];

export const fetchAllEarnings = async (): Promise<Record<PeriodType, EarningData>> => {
  const results = await Promise.all(
    periods.map(async (period) => {
      const res = await axiosInstance.get<EarningData>(`/deliveryPartners/earnings/${period}`);
      return { period, data: res.data };
    })
  );

  // Convert array to object keyed by period
  return results.reduce((acc, curr) => {
    acc[curr.period] = curr.data;
    return acc;
  }, {} as Record<PeriodType, EarningData>);
};


// import axios from "axios";

// export const fetchEarnings = async (period: PeriodType): Promise<EarningData> => {
//   const response = await axios.get<EarningData>(
//     `https://your-api.com/earnings?period=${period}`
//   );
//   return response.data;
// };
