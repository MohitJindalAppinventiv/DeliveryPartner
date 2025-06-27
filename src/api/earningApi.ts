
import axiosInstance from "./axiosInstance";
import type { EarningData, PeriodType } from "../types/earningTypes";
import ENDPOINTS from "./Endpoints";
const periods: PeriodType[] = ["daily", "weekly", "monthly", "yearly"];

export const fetchAllEarnings = async (): Promise<Record<PeriodType, EarningData>> => {
  const results = await Promise.all(
    periods.map(async (period) => {
      const res = await axiosInstance.get<EarningData>(`${ENDPOINTS.GET_EARNINGS(period)}`);
      return { period, data: res.data };
    })
  );

  // Convert array to object keyed by period
  return results.reduce((acc, curr) => {
    acc[curr.period] = curr.data;
    return acc;
  }, {} as Record<PeriodType, EarningData>);
};
