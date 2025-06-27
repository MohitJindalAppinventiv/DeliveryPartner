// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
// import { getAllEarnings, getEarning } from "../../store/earningSlice";
// import type { PeriodType } from "../../types/earningTypes";
// import { motion } from "framer-motion";
// const periodTitles: Record<PeriodType, string> = {
//   daily: "💰 Daily Earnings",
//   weekly: "📆 Weekly Earnings",
//   monthly: "📅 Monthly Earnings",
//   yearly: "📈 Yearly Earnings",
// };

// const EarningCards = () => {
//   const dispatch = useAppDispatch();
//   const { data, loading, error } = useAppSelector(getEarning);

//   useEffect(() => {
//     if (!data) dispatch(getAllEarnings());
//   }, [dispatch]);

//   if (loading) return <p>Loading earnings...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
//     >
//       {(["daily", "weekly", "monthly", "yearly"] as PeriodType[]).map(
//         (period) => {
//           const earning = data[period];
//           return (
//             <div
//               key={period}
//               className="rounded-xl shadow-md p-4 bg-white border"
//             >
//               <h3 className="text-lg font-semibold">{periodTitles[period]}</h3>
//               {earning ? (
//                 <p className="text-xl mt-2">
//                   {earning.currency} {earning.earnings}
//                 </p>
//               ) : (
//                 <p>No data</p>
//               )}
//             </div>
//           );
//         }
//       )}
//     </motion.div>
//   );
// };

// export default EarningCards;


import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { getAllEarnings, getEarning } from "../../store/slices/earningSlice";
import type { PeriodType } from "../../types/earningTypes";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  Calendar, 
  CalendarDays, 
  TrendingUp,
  Loader2,
  AlertCircle,
  IndianRupee
} from "lucide-react";

const periodConfig: Record<PeriodType, {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  iconColor: string;
  accent: string;
}> = {
  daily: {
    title: "Today's Earnings",
    icon: <DollarSign className="w-6 h-6" />,
    gradient: "bg-gradient-to-br from-emerald-50 to-green-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    accent: "bg-emerald-500"
  },
  weekly: {
    title: "This Week",
    icon: <Calendar className="w-6 h-6" />,
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    accent: "bg-blue-500"
  },
  monthly: {
    title: "This Month",
    icon: <CalendarDays className="w-6 h-6" />,
    gradient: "bg-gradient-to-br from-purple-50 to-purple-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    accent: "bg-purple-500"
  },
  yearly: {
    title: "This Year",
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: "bg-gradient-to-br from-orange-50 to-amber-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    accent: "bg-orange-500"
  }
};

const EarningCards = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(getEarning);

  useEffect(() => {
    if (!data) dispatch(getAllEarnings());
  }, [dispatch]);

  // Loading State
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-20"
      >
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-lg font-medium text-gray-700">Loading earnings data...</span>
        </div>
      </motion.div>
    );
  }

  // Error State
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto"
      >
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Earnings</h3>
        <p className="text-red-600">{error}</p>
      </motion.div>
    );
  }

  const formatEarnings = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numAmount);
  };

  const getTotalEarnings = () => {
    if (!data) return 0;
    return Object.values(data).reduce((total, earning) => {
      return total + (earning ? parseFloat(earning.earnings.toString()) : 0);
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-orange-600 to-orange-600 p-3 rounded-2xl">
            <IndianRupee className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Earnings Overview
          </h1>
        </div>
        <p className="text-lg text-gray-600 mb-6">
          Track your delivery earnings across different time periods
        </p>
        
        {/* Total Earnings Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg"
        >
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold">Total Earnings: ₹{formatEarnings(getTotalEarnings())}</span>
        </motion.div>
      </motion.div>

      {/* Earnings Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {(["daily", "weekly", "monthly", "yearly"] as PeriodType[]).map((period, index) => {
          const earning = data?.[period];
          const config = periodConfig[period];
          
          return (
            <motion.div
              key={period}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${config.gradient} border-2 border-white/50`}
            >
              {/* Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${config.accent}`}></div>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${config.iconBg}`}>
                    <div className={config.iconColor}>
                      {config.icon}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                      {period}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {config.title}
                </h3>

                {/* Earnings Amount */}
                {earning ? (
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900">
                      ₹{formatEarnings(earning.earnings)}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-600 bg-white/70 px-2 py-1 rounded-full">
                        {earning.currency} Currency
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-gray-400">₹0.00</div>
                    <div className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full inline-block">
                      No earnings yet
                    </div>
                  </div>
                )}

                {/* Bottom Decoration */}
                <div className="absolute bottom-0 right-0 opacity-10">
                  <div className={`p-4 ${config.iconColor}`}>
                    {React.cloneElement(config.icon as React.ReactElement, { 
                      className: "w-16 h-16" 
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Additional Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Earnings Breakdown
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {(["daily", "weekly", "monthly", "yearly"] as PeriodType[]).map((period) => {
            const earning = data?.[period];
            const config = periodConfig[period];
            const percentage = data ? (earning ? (parseFloat(earning.earnings.toString()) / getTotalEarnings()) * 100 : 0) : 0;
            
            return (
              <div key={`breakdown-${period}`} className="text-center">
                <div className={`w-3 h-3 rounded-full ${config.accent} mx-auto mb-2`}></div>
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  {config.title}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default EarningCards;