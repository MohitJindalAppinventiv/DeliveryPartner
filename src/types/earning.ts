export type EarningPeriod="daily" | "weekly" | "monthly" | "lifetime";

export interface EarningsBreakdown{
    date:string;
    amount:number;
    orders:number;
}

export interface EarningsData{
    total:number;
    orders:number;
    period:EarningPeriod;
    breakdown:EarningsBreakdown[];
}

export interface EarningState{
    data:EarningsData | null;
    status:"idle" | "loading" | "succeeded" | "failed";
    error:string | null;
}
