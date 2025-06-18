// export type EarningPeriod="daily" | "weekly" | "monthly" | "lifetime";

// export interface EarningsBreakdown{
//     date:string;
//     amount:number;
//     orders:number;
// }

// export interface EarningsData{
//     total:number;
//     orders:number;
//     period:EarningPeriod;
//     breakdown:EarningsBreakdown[];
// }

// export interface EarningState{
//     data:EarningsData | null;
//     status:"idle" | "loading" | "succeeded" | "failed";
//     error:string | null;
// }

// export interface EarningData {
//   period: "daily" | "weekly" | "monthly" | "yearly"; // extend as needed
//   earnings: number;
//   currency: string; // e.g., 'INR'
// }




export type PeriodType = "daily" | "weekly" | "monthly" | "yearly";

export interface EarningData {
  period: PeriodType;
  earnings: number;
  currency: string;
}

