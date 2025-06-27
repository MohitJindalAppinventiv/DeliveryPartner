import React from "react";
import { MapPin, Phone } from "lucide-react";
import { type Order } from "../../store/slices/orderSlice";

interface OrderCardProps {
  order: Order;
  onAccept: (orderId: string) => void;
  onReject: (orderId: string) => void;
  onMarkDelivered: (orderId: string) => void;
  onMarkPickedUp: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onAccept,
  onReject,
  onMarkDelivered,
  onMarkPickedUp,
}) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Order #{order.orderId}
          </h2>
          <p className="text-sm text-gray-600">
            {order.restaurantName} &middot; {order.paymentMethod}
          </p>
        </div>
        <div className="text-right mt-2 sm:mt-0">
          <span className="text-xl font-bold text-green-600">
            ₹{order.orderAmount}
          </span>
          <p className="text-xs text-gray-500">
            + ₹{order.deliveryFee} delivery
          </p>
        </div>
      </div>

      {/* Locations */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
        {/* Pickup */}
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-700">Pickup:</p>
              <p className="text-gray-600">{order.pickupLocation.address}</p>
              <p className="text-gray-500 flex items-center gap-1">
                <Phone className="w-3 h-3" />{" "}
                {order.pickupLocation.mobileNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-green-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-700">Delivery:</p>
              <p className="text-gray-600">{order.deliveryLocation.address}</p>
              <p className="text-gray-500 flex items-center gap-1">
                <Phone className="w-3 h-3" />{" "}
                {order.deliveryLocation.mobileNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        {order.status === "NEW" && (
          <div className="flex flex-col sm:flex-row gap-2 sm:w-auto w-full">
            <button
              className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAccept(order.orderId);
              }}
            >
              Accept
            </button>
            <button
              className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              onClick={() => onReject(order.orderId)}
            >
              Reject
            </button>
          </div>
        )}

        {order.status === "ACCEPTED" && (
          <button
            className="px-4 py-2 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-lg w-full sm:w-auto"
            onClick={() => onMarkPickedUp(order.orderId)}
          >
            Picked UP
          </button>
        )}

        {order.status === "PICKED_UP" && (
          <button
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            onClick={() => onMarkDelivered(order.orderId)}
          >
            Mark Delivered
          </button>
        )}

        {order.status === "DELIVERED" && (
          <span className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-lg w-full sm:w-auto">
            Delivered ✅
          </span>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
