import React, { useEffect, useRef } from "react";
import { Star, TrendingUp, Package, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  getStatus,
  setLocalStatus,
  updateDeliveryStatus,
} from "../../store/slices/statusSlice";
import {
  fetchDeliveryPartner,
  selectSelectedPartner,
} from "../../store/slices/ProfileSlice";
import OrderCard, { type Order } from "../../components/orders/orderCard";
import { getAllEarnings, getEarning } from "../../store/slices/earningSlice";
import useLocationTracker from "../../hooks/useLocationTracker";
import {
  acceptOrder,
  rejectOrder,
  markDelivered,
  markPickedUp,
  clearOrders,
} from "../../store/slices/orderSlice";
import webSocketService from "../../sockets/orderSocket";
import axiosInstance from "../../api/axiosInstance";
import ENDPOINTS from "../../api/Endpoints";
import { motion } from "framer-motion";

const DeliveryDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectSelectedPartner);
  const { data } = useAppSelector(getEarning);
  const { status } = useAppSelector(getStatus);
  const orders = useAppSelector((state) => state.orders.orders);
  const isOnline = status === "ONLINE";

  // Use ref to maintain socket instance across renders
  const socketServiceRef = useRef<ReturnType<typeof webSocketService> | null>(
    null
  );

  // console.log("Rerendering", status);

  const getLocationPermission = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useLocationTracker();

  useEffect(() => {
    if (!profile) dispatch(fetchDeliveryPartner());
    if (!data.daily) dispatch(getAllEarnings());
  }, []);

  // Initialize socket service once
  useEffect(() => {
    if (!socketServiceRef.current) {
      socketServiceRef.current = webSocketService(dispatch);
    }
  }, [dispatch]);

  const handleToggle = async () => {
    if (status === "OCCUPIED") return;
    if (!isOnline) {
      // Going ONLINE: Ask for location access
      console.log("clicking");

      try {
        console.log("clicking 2");
        dispatch(setLocalStatus("ONLINE"));
        console.log("status dispatched");
        dispatch(updateDeliveryStatus("ONLINE"));
        console.log("delivery dispatched");
      } catch (error) {
        console.error("Error occured in geolocation api");
      }
      await getLocationPermission();
    } else {
      // Going OFFLINE
      dispatch(setLocalStatus("OFFLINE"));
      dispatch(clearOrders());
      dispatch(updateDeliveryStatus("OFFLINE"));
    }
  };

  const handleAccept = async (orderId: string) => {
    console.log("orders", orders);
    console.log("orderID", orderId);
    const order = orders.find((o) => o.orderId === orderId);
    console.log("order", order, "socketServiceRef", socketServiceRef);

    if (order && socketServiceRef.current) {
      try {
        // First, handle the socket communication
        await socketServiceRef.current.handleDeliveryAccept({
          orderId,
          userId: order.userId,
        });

        // Only update status after successful socket communication
        // The acceptOrder dispatch will be handled by the socket acknowledgement
        dispatch(updateDeliveryStatus("OCCUPIED"));
        dispatch(acceptOrder(orderId));
      } catch (error) {
        console.error("Error accepting order:", error);
        // Handle error - maybe show toast or alert
      }
    }
  };

  const handleReject = (orderId: string) => {
    console.log("rejecting Order");
    dispatch(rejectOrder(orderId));
  };

  const handleMarkDelivered = async (orderId: string) => {
    try {
      const response = await axiosInstance.put(`${ENDPOINTS.MARK_DELIVERED}`, {
        orderId,
      });
      // console.log(response);
      const data = await response.data;
      // console.log(data);
      // console.log(data.success);
      if (data.success) {
        console.log("calling");
        dispatch(markDelivered());
        dispatch(clearOrders());
        dispatch(updateDeliveryStatus("ONLINE"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hanleMarkPickedUp = (orderId: string) => {
    dispatch(markPickedUp(orderId));
  };

  // console.log(data.weekly?.deliveryCount, "deliv");

  const todayStats = {
    deliveries: 12,
    earnings: 850,
    distance: 45.2,
    rating: 4.8,
    onTimeDeliveries: 11,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg rounded-md">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Delivery Partner</h1>
                <p className="text-red-100 text-sm">Foodify Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Toggle */}
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? "bg-green-400 animate-pulse" : "bg-gray-400"
                  }`}
                />
                <span className="text-sm font-medium">{status}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isOnline || status === "OCCUPIED"}
                    onChange={handleToggle}
                  />
                  <div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              {/* Profile Info */}
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">{profile?.name}</p>
                  <p className="text-xs text-red-100">
                    {profile?.id.toString().slice(0, 4)}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, Mohit! 👋
          </h2>
          <p className="text-gray-600">
            Ready to deliver some happiness today?
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Today's Orders
                </p>
                <p className="text-2xl font-bold">
                  {data.daily?.deliveryCount}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Weekly's Orders
                </p>
                <p className="text-2xl font-bold">
                  {data.weekly?.deliveryCount}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Today's Earnings
                </p>
                <p className="text-2xl font-bold">₹{data.daily?.earnings}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Weekly Earnings
                </p>
                <p className="text-2xl font-bold">₹{data.weekly?.earnings}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Rating</p>
                <p className="text-2xl font-bold">{profile?.rating}</p>
              </div>
              <Star className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-6">
          <div className="inline-flex rounded-lg shadow-sm bg-white p-1">
            <h1 className="px-6 py-2 text-sm font-medium rounded-md bg-red-600 text-white shadow-md">
              Active Orders
            </h1>
          </div>
          {orders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              onAccept={handleAccept}
              onReject={handleReject}
              onMarkDelivered={handleMarkDelivered}
              onMarkPickedUp={hanleMarkPickedUp}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveryDashboard;
