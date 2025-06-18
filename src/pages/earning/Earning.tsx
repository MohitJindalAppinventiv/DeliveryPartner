// // src/pages/EarningsPage.tsx
// import { useEffect, useMemo, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   type ChartData,
// } from "chart.js";
// import { CalendarClock, Wallet, TrendingUp } from "lucide-react";
// import { motion } from "framer-motion";

// import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
// import { fetchEarnings } from "../../store/earningSlice";
// import { type EarningPeriod } from "../../types/earningTypes";
// import { cn } from "../../utils/cn";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const EarningsPage = () => {
//   const dispatch = useAppDispatch();
//   const [activePeriod, setActivePeriod] = useState<EarningPeriod>("daily");
//   const { data, status, error } = useAppSelector((s) => s.earnings);

//   useEffect(() => {
//     dispatch(fetchEarnings(activePeriod));
//   }, [activePeriod, dispatch]);

//   const earnings = useMemo(() => {
//     if (!data) {
//       return {
//         total: 0,
//         orders: 0,
//         period: activePeriod,
//         breakdown: [],
//       };
//     }

//     return {
//       total: data.total ?? 0,
//       orders: data.orders ?? 0,
//       period: data.period,
//       breakdown: Array.isArray(data.breakdown) ? data.breakdown : [],
//     };
//   }, [data, activePeriod]);

//   const breakdown = Array.isArray(earnings.breakdown) ? earnings.breakdown : [];

//   const chartData: ChartData<"bar"> = {
//     labels: breakdown.map((b) => b.date),
//     datasets: [
//       {
//         type: "bar",
//         label: "Earnings",
//         data: breakdown.map((b) => b.amount),
//         backgroundColor: "rgba(255, 82, 0, 0.7)",
//         borderColor: "rgba(255, 82, 0, 1)",
//         borderWidth: 1,
//         borderRadius: 6,
//       },
//       {
//         type: "line",
//         label: "Orders",
//         data: breakdown.map((b) => b.orders),
//         borderColor: "rgba(242, 193, 0, 1)",
//         borderWidth: 3,
//         tension: 0.3,
//         yAxisID: "y1",
//         pointBackgroundColor: "rgba(242, 193, 0, 1)",
//         pointRadius: 4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (v: any) => `₹${v}`,
//           color: "#333",
//         },
//         grid: {
//           color: "rgba(204, 204, 204, 0.5)",
//         },
//       },
//       y1: {
//         beginAtZero: true,
//         position: "right" as const,
//         grid: { drawOnChartArea: false },
//         ticks: {
//           precision: 0,
//           color: "#333",
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           color: "#333",
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top" as const,
//         labels: {
//           color: "#333",
//           font: {
//             weight: "bold",
//           },
//           boxWidth: 12,
//           padding: 20,
//           usePointStyle: true,
//         },
//       },
//       tooltip: {
//         backgroundColor: "#fff",
//         titleColor: "#ff5200",
//         bodyColor: "#333",
//         borderColor: "#ccc",
//         borderWidth: 1,
//         padding: 12,
//         boxShadow: "4px 8px rgba(0,0,0,0.1)",
//         callbacks: {
//           label: (ctx: any) => {
//             const label = ctx.dataset.label || "";
//             const val = ctx.raw;
//             return label === "Earnings"
//               ? `${label}: ₹${val.toFixed(2)}`
//               : `${label}: ${val}`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="space-y-6 p-4 md:p-7 max-w-7xl mx-auto">
//       {/* Heading */}
//       <header className="space-y-2">
//         <h1 className="text-2xl md:text-3xl font-bold text-[#333]">
//           Earnings Dashboard
//         </h1>
//         <p className="text-[#333] text-sm md:text-base">
//           Track your delivery earnings and performance metrics
//         </p>
//       </header>

//       {/* Period selector */}
//       <div className="flex flex-wrap gap-2 md:gap-3">
//         {(["daily", "weekly", "monthly"] as EarningPeriod[]).map((p) => (
//           <motion.button
//             key={p}
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setActivePeriod(p)}
//             className={cn(
//               "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
//               activePeriod === p
//                 ? "bg-[#ff5200] text-white shadow-md"
//                 : "bg-white text-[#333] border border-[#ccc] hover:bg-[#f4a261] hover:text-white"
//             )}
//           >
//             <CalendarClock className="h-4 w-4" />
//             <span>
//               {p === "daily"
//                 ? "Today"
//                 : p === "weekly"
//                 ? "This Week"
//                 : "This Month"}
//             </span>
//           </motion.button>
//         ))}
//       </div>

//       {/* Summary cards */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
//       >
//         <SummaryCard
//           title="Total Earnings"
//           value={`₹${earnings.total.toFixed(2)}`}
//           icon={<Wallet className="h-5 w-5 text-[#ff5200]" />}
//           trend={earnings.total > 0 ? "up" : "neutral"}
//           trendValue="12%"
//         />
//         <SummaryCard
//           title="Completed Orders"
//           value={`${earnings.orders}`}
//           icon={<TrendingUp className="h-5 w-5 text-[#f2c100]" />}
//           trend={earnings.orders > 0 ? "up" : "neutral"}
//           trendValue="8%"
//         />
//       </motion.div>

//       {/* Earnings chart */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="bg-white rounded-lg shadow-[4px_8px_rgba(0,0,0,0.1)] border border-[#ccc] p-4 md:p-6"
//       >
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
//           <h2 className="text-lg font-bold text-[#333]">Earnings Breakdown</h2>
//           <div className="text-sm text-[#333]">
//             {activePeriod === "daily"
//               ? "Daily"
//               : activePeriod === "weekly"
//               ? "Weekly"
//               : "Monthly"}{" "}
//             View
//           </div>
//         </div>
//         {status === "loading" ? (
//           <Loader />
//         ) : error ? (
//           <div className="bg-[#e63946]/10 text-[#e63946] p-4 rounded-lg">
//             {error}
//           </div>
//         ) : (
//           <div className="h-80 md:h-96">
//             <Bar data={chartData} options={chartOptions} />
//           </div>
//         )}
//       </motion.div>

//       {/* Performance stats */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="bg-white rounded-lg shadow-[4px_8px_rgba(0,0,0,0.1)] border border-[#ccc] p-4 md:p-6"
//       >
//         <h2 className="text-lg font-bold text-[#333] mb-4">
//           Performance Statistics
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatCard
//             title="Avg. Earning per Order"
//             value={
//               earnings.orders
//                 ? `₹${(earnings.total / earnings.orders).toFixed(2)}`
//                 : "₹0.00"
//             }
//             change="+5.2%"
//           />
//           <StatCard
//             title="Peak Earnings Day"
//             value={
//               breakdown.length
//                 ? breakdown.reduce((max, day) =>
//                     day.amount > max.amount ? day : max
//                   ).date
//                 : "-"
//             }
//             change="+12%"
//           />
//           <StatCard title="Total Delivery Hours" value="24.5h" change="+3.1%" />
//           <StatCard title="Customer Rating" value="4.8/5" change="+0.2" />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// interface SummaryCardProps {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
//   trend?: "up" | "down" | "neutral";
//   trendValue?: string;
// }

// const SummaryCard: React.FC<SummaryCardProps> = ({
//   title,
//   value,
//   icon,
//   trend = "neutral",
//   trendValue,
// }) => {
//   const trendColors = {
//     up: "text-green-600 bg-green-50",
//     down: "text-[#e63946] bg-[#e63946]/10",
//     neutral: "text-gray-600 bg-gray-50",
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-[4px_8px_rgba(0,0,0,0.1)] border border-[#ccc] p-4 md:p-6">
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-sm font-bold text-[#333]">{title}</h3>
//           <p className="text-2xl md:text-3xl font-bold mt-1 text-[#333]">
//             {value}
//           </p>
//         </div>
//         <div className="p-2 rounded-lg bg-[#ff5200]/10">{icon}</div>
//       </div>
//       {trendValue && (
//         <div
//           className={`mt-4 inline-flex items-center text-xs px-2 py-1 rounded-md ${trendColors[trend]}`}
//         >
//           {trend === "up" ? (
//             <svg
//               className="w-3 h-3 mr-1"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           ) : trend === "down" ? (
//             <svg
//               className="w-3 h-3 mr-1"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           ) : (
//             <svg
//               className="w-3 h-3 mr-1"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           )}
//           {trendValue}
//         </div>
//       )}
//     </div>
//   );
// };

// interface StatCardProps {
//   title: string;
//   value: string;
//   change?: string;
// }

// const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
//   const isPositive = change?.startsWith("+");

//   return (
//     <div className="bg-white rounded-lg shadow-[4px_8px_rgba(0,0,0,0.1)] border border-[#ccc] p-4">
//       <h3 className="text-sm font-bold text-[#333]">{title}</h3>
//       <p className="text-xl font-bold mt-1 text-[#333]">{value}</p>
//       {change && (
//         <span
//           className={`inline-flex items-center mt-2 text-xs ${
//             isPositive ? "text-green-600" : "text-[#e63946]"
//           }`}
//         >
//           {isPositive ? (
//             <svg
//               className="w-3 h-3 mr-1"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           ) : (
//             <svg
//               className="w-3 h-3 mr-1"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           )}
//           {change}
//         </span>
//       )}
//     </div>
//   );
// };

// const Loader = () => (
//   <div className="flex items-center justify-center h-64">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5200]" />
//   </div>
// );

// export default EarningsPage;

// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
// import { getEarnings } from "../../store/earningSlice";
// import type { PeriodType } from "../../types/earningTypes";

// const EarningStats = () => {
//   const dispatch = useAppDispatch();
//   const { data, loading, error } = useAppSelector((state) => state.earnings);

//   const [period, setPeriod] = useState<PeriodType>("daily");

//   useEffect(() => {
//     dispatch(getEarnings(period));
//   }, [dispatch, period]);

//   return (
//     <div>
//       <select value={period} onChange={(e) => setPeriod(e.target.value as PeriodType)}>
//         <option value="daily">Daily</option>
//         <option value="weekly">Weekly</option>
//         <option value="monthly">Monthly</option>
//         <option value="yearly">Yearly</option>
//       </select>

//       {loading && <p>Loading earnings...</p>}
//       {error && <p>Error: {error}</p>}
//       {data && (
//         <div>
//           <h2>Earnings ({data?.period})</h2>
//           <p>
//             {data.currency} {data?.earnings}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EarningStats;

// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
// import { getAllEarnings } from "../../store/earningSlice";
// import type { PeriodType } from "../../types/earningTypes";

// const periodTitles: Record<PeriodType, string> = {
//   daily: "💰 Daily Earnings",
//   weekly: "📆 Weekly Earnings",
//   monthly: "📅 Monthly Earnings",
//   yearly: "📈 Yearly Earnings",
// };

// const EarningCards = () => {
//   const dispatch = useAppDispatch();
//   const { data, loading, error } = useAppSelector((state) => state.earnings);

//   useEffect(() => {
//     dispatch(getAllEarnings());
//   }, [dispatch]);

//   if (loading) return <p>Loading earnings...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//       {(["daily", "weekly", "monthly", "yearly"] as PeriodType[]).map((period) => {
//         const earning = data[period];
//         return (
//           <div key={period} className="rounded-xl shadow-md p-4 bg-white border">
//             <h3 className="text-lg font-semibold">{periodTitles[period]}</h3>
//             {earning ? (
//               <p className="text-xl mt-2">
//                 {earning.currency} {earning.earnings}
//               </p>
//             ) : (
//               <p>No data</p>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default EarningCards;

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { getAllEarnings } from "../../store/earningSlice";
import type { PeriodType } from "../../types/earningTypes";

const periodTitles: Record<PeriodType, string> = {
  daily: "💰 Daily Earnings",
  weekly: "📆 Weekly Earnings",
  monthly: "📅 Monthly Earnings",
  yearly: "📈 Yearly Earnings",
};

const periodIcons: Record<PeriodType, string> = {
  daily: "💰",
  weekly: "📆",
  monthly: "📅",
  yearly: "📈",
};

const periodColors: Record<PeriodType, string> = {
  daily: "from-orange-400 to-orange-300",
  weekly: "from-orange-500 to-orange-400",
  monthly: "from-orange-600 to-orange-500",
  yearly: "from-orange-700 to-orange-600",
};

const EarningCards = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.earnings);

  useEffect(() => {
    dispatch(getAllEarnings());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3 bg-orange-50 px-6 py-4 rounded-xl border border-orange-200">
          <div className="w-6 h-6 border-3 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-700 font-medium text-lg">
            Loading earnings...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4">
          <p className="text-red-700 font-medium text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          💼 Earnings Overview
        </h2>
        <p className="text-gray-600 text-lg">
          Track your performance across different time periods
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(["daily", "weekly", "monthly", "yearly"] as PeriodType[]).map(
          (period) => {
            const earning = data[period];
            return (
              <div
                key={period}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-200 overflow-hidden"
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${periodColors[period]} p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <h3 className="text-lg font-bold">
                        {periodTitles[period].replace(/[💰📆📅📈]\s/, "")}
                      </h3>
                      <p className="text-orange-100 text-sm font-medium">
                        Performance
                      </p>
                    </div>
                    <div className="text-3xl bg-white/20 p-3 rounded-xl">
                      {periodIcons[period]}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-orange-50/30">
                  {earning ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Total Amount
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-orange-600 font-medium">
                            {earning.currency}
                          </span>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-gray-800">
                        {earning.earnings.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-600 font-medium">
                          Active Period
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-4xl mb-2">📊</div>
                      <p className="text-gray-500 font-medium">
                        No data available
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Start earning to see statistics
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-white border-t border-orange-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {period.charAt(0).toUpperCase() + period.slice(1)} view
                    </span>
                    <div className="flex items-center gap-1 text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
                      <span>View details</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default EarningCards;
