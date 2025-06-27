// import { useState, useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from '../../hooks/useAppDispatch';
// import { clearNotification, updateOrderStatus } from '../../store/orderSlice';
// import { FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// // import { respondToOrder } from '../../sockets/orderSocket';

// const OrderCards = () => {
//   const dispatch = useAppDispatch();
//   const notifications = useAppSelector(state => state.orders.notifications);
//   const [visibleNotifications, setVisibleNotifications] = useState<string[]>([]);

//   // Make all new notifications visible
//   useEffect(() => {
//     const unseen = notifications.filter(n => !visibleNotifications.includes(n.id));
//     if (unseen.length > 0) {
//       setVisibleNotifications(prev => [...prev, ...unseen.map(n => n.id)]);
//     }
//   }, [notifications]);

//   const handleDismiss = (orderId: string) => {
//     setVisibleNotifications(prev => prev.filter(id => id !== orderId));
//     dispatch(clearNotification(orderId));
//   };

// //   const handleAccept = (orderId: string) => {
// //     respondToOrder(orderId, 'accepted');
// //     dispatch(updateOrderStatus({ id: orderId, status: 'accepted' }));
// //     handleDismiss(orderId);
// //   };

// //   const handleReject = (orderId: string) => {
// //     respondToOrder(orderId, 'rejected');
// //     dispatch(updateOrderStatus({ id: orderId, status: 'rejected' }));
// //     handleDismiss(orderId);
// //   };

//   const visibleOrders = notifications.filter(order =>
//     visibleNotifications.includes(order.id)
//   );

//   if (visibleOrders.length === 0) return <p className="text-center text-gray-500">No new orders.</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4 py-6">
//       {visibleOrders.map((order) => (
//         <div
//           key={order.id}
//           className="bg-white border border-orange-200 shadow rounded-lg p-4"
//         >
//           {/* Header */}
//           <div className="flex items-start justify-between mb-3">
//             <div>
//               <h3 className="font-semibold text-lg text-gray-900">New Order</h3>
//               <p className="text-sm text-gray-600">Order #{order.id}</p>
//             </div>
//             <button
//               onClick={() => handleDismiss(order.id)}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <FaTimes className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Order Details */}
//           <div className="space-y-2 mb-4 text-sm text-gray-600">
//             <div className="flex justify-between">
//               <span>Customer:</span>
//               <span className="font-medium text-gray-900">{order.customerName}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Phone:</span>
//               <span>{order.customerPhone}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Total:</span>
//               <span className="font-semibold text-green-600">₹{order.totalAmount}</span>
//             </div>
//           </div>

//           {/* Items List */}
//           <div className="mb-4">
//             <h4 className="text-sm font-medium text-gray-900 mb-2">Items:</h4>
//             <div className="space-y-1 text-sm">
//               {order.items.map((item) => (
//                 <div key={item.id} className="flex justify-between">
//                   <span>{item.name} x{item.quantity}</span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row gap-2 pt-2">
//             <button
//             //   onClick={() => handleAccept(order.id)}
//               className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-md"
//             >
//               <FaCheckCircle className="h-4 w-4" />
//               Accept
//             </button>
//             <button
//             //   onClick={() => handleReject(order.id)}
//               className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-600 hover:bg-red-50 text-sm px-3 py-2 rounded-md"
//             >
//               <FaTimesCircle className="h-4 w-4" />
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderCards;
