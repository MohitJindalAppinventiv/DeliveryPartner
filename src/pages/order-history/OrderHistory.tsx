import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { getDeliveries } from "../../store/slices/deliverySlice";
import { motion } from "framer-motion";
import { 
  MapPin, 
  DollarSign, 
  Package, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Truck,
} from "lucide-react";

const LIMIT = 5;

const DeliveryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { deliveries, totalCount, loading, error } = useAppSelector(
    (state) => state.delivery
  );

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalCount / LIMIT);

  useEffect(() => {
    dispatch(getDeliveries({ page, limit: LIMIT }));
  }, [dispatch, page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <div className="bg-gradient-to-r from-orange-600 to-orange-600 p-3 rounded-2xl">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Delivery History
          </h1>
        </motion.div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track all your completed and ongoing deliveries in one place
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-20"
        >
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading deliveries...</span>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
        >
          <div className="text-red-600 text-4xl mb-2">⚠️</div>
          <p className="text-red-700 text-lg font-medium">{error}</p>
        </motion.div>
      )}

      {/* No deliveries */}
      {!loading && deliveries.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center"
        >
          <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Deliveries Found</h3>
          <p className="text-gray-500">Your delivery history will appear here once you start making deliveries.</p>
        </motion.div>
      )}

      {/* Deliveries Grid */}
      <div className="grid gap-6 lg:gap-8">
        {deliveries.map((delivery, index) => {
          return (
            <motion.div
              key={delivery.orderId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200"
            >
              {/* Status Indicator Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-orange-600"></div>
              
              <div className="p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                  <div className="flex items-center gap-4 mb-4 lg:mb-0">
                    <div className="p-3 rounded-xl bg-gray-100 border border-gray-200">
                      <Package className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Order #{delivery.orderId}
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-gray-700 bg-gray-100">
                        {delivery.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Total Amount</div>
                      <div className="text-2xl font-bold text-gray-900">₹{delivery.totalOrderAmount}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Your Earning</div>
                      <div className="text-2xl font-bold text-emerald-600">₹{delivery.deliveryFee}</div>
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Pickup Location */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2.5 rounded-lg">
                        <MapPin className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-2">Pickup Location</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {delivery.pickUpLocation?.address || "Address not available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Location */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2.5 rounded-lg">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-2">Delivery Location</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {delivery.deliveryLocation?.address || "Address not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {formatDate(delivery.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Earned ₹{delivery.deliveryFee}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white shadow-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-12 h-12 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                    page === pageNum
                      ? "bg-orange-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white shadow-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DeliveryList;