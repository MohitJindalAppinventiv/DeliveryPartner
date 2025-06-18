
// import React, { useState } from 'react';
// import { Bell, MapPin, Clock, Star, TrendingUp, Package, Phone, Navigation, LogOut, User } from 'lucide-react';

// const DeliveryDashboard: React.FC = () => {
//   const [isOnline, setIsOnline] = useState(true);
//   const [activeOrders] = useState([
//     {
//       id: '#ZOM001',
//       restaurant: 'Burger King',
//       restaurantAddress: 'Connaught Place, New Delhi',
//       customer: 'Rahul Sharma',
//       customerAddress: 'A-203, Rajeev Chowk, New Delhi',
//       phone: '+91 98765 43210',
//       amount: '₹320',
//       distance: '2.3 km',
//       eta: '15 mins',
//       status: 'pickup_ready',
//       priority: 'high'
//     },
//     {
//       id: '#ZOM002',
//       restaurant: 'Pizza Hut',
//       restaurantAddress: 'Karol Bagh, New Delhi',
//       customer: 'Priya Singh',
//       customerAddress: 'B-101, Rajouri Garden, New Delhi',
//       phone: '+91 87654 32109',
//       amount: '₹450',
//       distance: '3.8 km',
//       eta: '25 mins',
//       status: 'preparing',
//       priority: 'normal'
//     }
//   ]);

//   const todayStats = {
//     deliveries: 12,
//     earnings: 850,
//     distance: 45.2,
//     rating: 4.8,
//     onTimeDeliveries: 11
//   };

//   const weeklyEarnings = [120, 340, 250, 420, 380, 290, 850];
//   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//   const [activeTab, setActiveTab] = useState('orders');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     console.log('Logging out...');
//     // Add logout logic here
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
//       {/* Enhanced Header with Navbar */}
//       <header className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg sticky top-0 z-50">
//         <div className="px-6 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                 <Package className="w-6 h-6" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold">Delivery Partner</h1>
//                 <p className="text-red-100 text-sm">Foodify Dashboard</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4">
//               {/* Online/Offline Toggle */}
//               <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
//                 <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
//                 <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={isOnline}
//                     onChange={() => setIsOnline((prev) => !prev)}
//                   />
//                   <div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
//                 </label>
//               </div>
              
//               {/* Notifications */}
//               <button className="text-white hover:bg-white/10 relative rounded-full p-2">
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute -top-1 -right-1 bg-yellow-500 text-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
//               </button>

//               {/* Profile Dropdown */}
//               <div className="relative">
//                 <button 
//                   className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-md"
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 >
//                   <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                     <User className="w-4 h-4" />
//                   </div>
//                   <div className="text-left hidden md:block">
//                     <p className="text-sm font-medium">Mohit Kumar</p>
//                     <p className="text-xs text-red-100">Partner ID: ZOM123</p>
//                   </div>
//                 </button>

//                 {isDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
//                     <div className="p-2">
//                       <h3 className="text-sm font-medium text-gray-900 px-2 py-1">My Account</h3>
//                       <div className="border-t border-gray-200 my-1"></div>
//                       <button className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center">
//                         <User className="mr-2 h-4 w-4" />
//                         <span>Profile Settings</span>
//                       </button>
//                       <button className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center">
//                         <Bell className="mr-2 h-4 w-4" />
//                         <span>Notifications</span>
//                       </button>
//                       <button className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center">
//                         <Package className="mr-2 h-4 w-4" />
//                         <span>Delivery History</span>
//                       </button>
//                       <div className="border-t border-gray-200 my-1"></div>
//                       <button 
//                         className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100 rounded flex items-center"
//                         onClick={handleLogout}
//                       >
//                         <LogOut className="mr-2 h-4 w-4" />
//                         <span>Logout</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="p-6 max-w-7xl mx-auto">
//         {/* Welcome Section */}
//         <div className="mb-6">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Mohit! 👋</h2>
//           <p className="text-gray-600">Ready to deliver some happiness today?</p>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//           {/* Today's Orders Card */}
//           <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg overflow-hidden shadow">
//             <div className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100 text-sm">Today's Orders</p>
//                   <p className="text-2xl font-bold">{todayStats.deliveries}</p>
//                 </div>
//                 <Package className="w-8 h-8 text-blue-200" />
//               </div>
//             </div>
//           </div>

//           {/* Earnings Card */}
//           <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg overflow-hidden shadow">
//             <div className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100 text-sm">Earnings</p>
//                   <p className="text-2xl font-bold">₹{todayStats.earnings}</p>
//                 </div>
//                 <TrendingUp className="w-8 h-8 text-green-200" />
//               </div>
//             </div>
//           </div>

//           {/* Distance Card */}
//           <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg overflow-hidden shadow">
//             <div className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100 text-sm">Distance</p>
//                   <p className="text-2xl font-bold">{todayStats.distance} km</p>
//                 </div>
//                 <Navigation className="w-8 h-8 text-purple-200" />
//               </div>
//             </div>
//           </div>

//           {/* Rating Card */}
//           <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg overflow-hidden shadow">
//             <div className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-yellow-100 text-sm">Rating</p>
//                   <p className="text-2xl font-bold">{todayStats.rating}</p>
//                 </div>
//                 <Star className="w-8 h-8 text-yellow-200" />
//               </div>
//             </div>
//           </div>

//           {/* On Time Card */}
//           <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg overflow-hidden shadow">
//             <div className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-indigo-100 text-sm">On Time</p>
//                   <p className="text-2xl font-bold">{todayStats.onTimeDeliveries}/{todayStats.deliveries}</p>
//                 </div>
//                 <Clock className="w-8 h-8 text-indigo-200" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="space-y-6">
//           <div className="inline-flex rounded-md shadow-sm" role="group">
//             <button
//               type="button"
//               className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'orders' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//               onClick={() => setActiveTab('orders')}
//             >
//               Active Orders
//             </button>
//             <button
//               type="button"
//               className={`px-4 py-2 text-sm font-medium ${activeTab === 'earnings' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//               onClick={() => setActiveTab('earnings')}
//             >
//               Earnings
//             </button>
//             <button
//               type="button"
//               className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'performance' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//               onClick={() => setActiveTab('performance')}
//             >
//               Performance
//             </button>
//           </div>

//           {/* Orders Tab */}
//           {activeTab === 'orders' && (
//             <div className="space-y-4">
//               <div className="bg-white rounded-lg shadow">
//                 <div className="px-6 py-4 border-b">
//                   <h3 className="flex items-center gap-2 text-lg font-semibold">
//                     <Package className="w-5 h-5" />
//                     Active Deliveries ({activeOrders.length})
//                   </h3>
//                 </div>
//                 <div className="p-6 space-y-4">
//                   {activeOrders.map((order) => (
//                     <div key={order.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
//                       <div className="flex justify-between items-start mb-3">
//                         <div className="flex items-center gap-2">
//                           <span className={`px-2 py-1 text-xs rounded-full ${order.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
//                             {order.id}
//                           </span>
//                           <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'pickup_ready' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
//                             {order.status === 'pickup_ready' ? 'Ready for Pickup' : 'Preparing'}
//                           </span>
//                         </div>
//                         <span className="font-semibold text-green-600">{order.amount}</span>
//                       </div>

//                       <div className="grid md:grid-cols-2 gap-4 mb-4">
//                         <div className="space-y-2">
//                           <div className="flex items-start gap-2">
//                             <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
//                             <div>
//                               <p className="font-medium text-sm">{order.restaurant}</p>
//                               <p className="text-gray-600 text-xs">{order.restaurantAddress}</p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <div className="flex items-start gap-2">
//                             <MapPin className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
//                             <div>
//                               <p className="font-medium text-sm">{order.customer}</p>
//                               <p className="text-gray-600 text-xs">{order.customerAddress}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4 text-sm text-gray-600">
//                           <span className="flex items-center gap-1">
//                             <Navigation className="w-4 h-4" />
//                             {order.distance}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Clock className="w-4 h-4" />
//                             {order.eta}
//                           </span>
//                         </div>

//                         <div className="flex gap-2">
//                           <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
//                             <Phone className="w-4 h-4" />
//                             Call
//                           </button>
//                           <button 
//                             className={`px-3 py-1.5 text-sm text-white rounded-md ${order.status === 'pickup_ready' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
//                           >
//                             {order.status === 'pickup_ready' ? 'Start Delivery' : 'Track Order'}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Earnings Tab */}
//           {activeTab === 'earnings' && (
//             <div className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="bg-white rounded-lg shadow">
//                   <div className="px-6 py-4 border-b">
//                     <h3 className="text-lg font-semibold">Weekly Earnings</h3>
//                   </div>
//                   <div className="p-6">
//                     <div className="space-y-4">
//                       {days.map((day, index) => (
//                         <div key={day} className="flex items-center justify-between">
//                           <span className="text-sm font-medium">{day}</span>
//                           <div className="flex items-center gap-2">
//                             <div className="w-32 bg-gray-200 rounded-full h-2">
//                               <div 
//                                 className="bg-green-500 h-2 rounded-full transition-all"
//                                 style={{ width: `${(weeklyEarnings[index] / Math.max(...weeklyEarnings)) * 100}%` }}
//                               ></div>
//                             </div>
//                             <span className="text-sm font-semibold w-16 text-right">₹{weeklyEarnings[index]}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow">
//                   <div className="px-6 py-4 border-b">
//                     <h3 className="text-lg font-semibold">Earnings Breakdown</h3>
//                   </div>
//                   <div className="p-6 space-y-4">
//                     <div className="flex justify-between items-center">
//                       <span>Base Amount</span>
//                       <span className="font-semibold">₹600</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span>Distance Bonus</span>
//                       <span className="font-semibold">₹150</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span>Peak Hours</span>
//                       <span className="font-semibold">₹80</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span>Tips</span>
//                       <span className="font-semibold">₹20</span>
//                     </div>
//                     <hr className="border-gray-200" />
//                     <div className="flex justify-between items-center font-bold text-lg">
//                       <span>Total Today</span>
//                       <span className="text-green-600">₹{todayStats.earnings}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Performance Tab */}
//           {activeTab === 'performance' && (
//             <div className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="bg-white rounded-lg shadow">
//                   <div className="px-6 py-4 border-b">
//                     <h3 className="text-lg font-semibold">Performance Metrics</h3>
//                   </div>
//                   <div className="p-6 space-y-6">
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium">On-Time Delivery Rate</span>
//                         <span className="text-sm font-semibold">92%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
//                       </div>
//                     </div>

//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium">Customer Rating</span>
//                         <span className="text-sm font-semibold">{todayStats.rating}/5.0</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
//                       </div>
//                     </div>

//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-sm font-medium">Order Acceptance</span>
//                         <span className="text-sm font-semibold">88%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow">
//                   <div className="px-6 py-4 border-b">
//                     <h3 className="text-lg font-semibold">Monthly Goals</h3>
//                   </div>
//                   <div className="p-6 space-y-4">
//                     <div className="text-center">
//                       <p className="text-3xl font-bold text-green-600">67%</p>
//                       <p className="text-sm text-gray-600">Monthly Target Completed</p>
//                     </div>
                    
//                     <div className="space-y-3">
//                       <div className="flex justify-between text-sm">
//                         <span>Deliveries: 201/300</span>
//                         <span>67%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
//                       </div>
                      
//                       <div className="flex justify-between text-sm">
//                         <span>Earnings: ₹15,400/₹25,000</span>
//                         <span>62%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryDashboard;



import React, { useState } from 'react';
import { MapPin, Clock, Star, TrendingUp, Package, Phone, Navigation, LogOut, User } from 'lucide-react';

const DeliveryDashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeOrders] = useState([
    {
      id: '#ZOM001',
      restaurant: 'Burger King',
      restaurantAddress: 'Connaught Place, New Delhi',
      customer: 'Rahul Sharma',
      customerAddress: 'A-203, Rajeev Chowk, New Delhi',
      phone: '+91 98765 43210',
      amount: '₹320',
      distance: '2.3 km',
      eta: '15 mins',
      status: 'pickup_ready',
      priority: 'high'
    },
    {
      id: '#ZOM002',
      restaurant: 'Pizza Hut',
      restaurantAddress: 'Karol Bagh, New Delhi',
      customer: 'Priya Singh',
      customerAddress: 'B-101, Rajouri Garden, New Delhi',
      phone: '+91 87654 32109',
      amount: '₹450',
      distance: '3.8 km',
      eta: '25 mins',
      status: 'preparing',
      priority: 'normal'
    }
  ]);

  const todayStats = {
    deliveries: 12,
    earnings: 850,
    distance: 45.2,
    rating: 4.8,
    onTimeDeliveries: 11
  };

  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Delivery Partner</h1>
                <p className="text-red-100 text-sm">Foodify Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Online/Offline Toggle */}
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isOnline}
                    onChange={() => setIsOnline((prev) => !prev)}
                  />
                  <div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              
              {/* Profile */}
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">Mohit Kumar</p>
                  <p className="text-xs text-red-100">Partner ID: ZOM123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Mohit! 👋</h2>
          <p className="text-gray-600">Ready to deliver some happiness today?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {/* Today's Orders Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Today's Orders</p>
                <p className="text-2xl font-bold">{todayStats.deliveries}</p>
              </div>
              <Package className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          {/* Earnings Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Earnings</p>
                <p className="text-2xl font-bold">₹{todayStats.earnings}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </div>



          {/* Rating Card */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Rating</p>
                <p className="text-2xl font-bold">{todayStats.rating}</p>
              </div>
              <Star className="w-8 h-8 text-orange-200" />
            </div>
          </div>

          {/* On Time Card */}

        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="inline-flex rounded-lg shadow-sm bg-white p-1" role="group">
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'orders' ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('orders')}
            >
              Active Orders
            </button>
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <Package className="w-5 h-5 text-gray-600" />
                    Active Deliveries ({activeOrders.length})
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${order.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                            {order.id}
                          </span>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${order.status === 'pickup_ready' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {order.status === 'pickup_ready' ? 'Ready for Pickup' : 'Preparing'}
                          </span>
                        </div>
                        <span className="font-bold text-green-600 text-lg">{order.amount}</span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-sm text-gray-800">{order.restaurant}</p>
                              <p className="text-gray-600 text-xs">{order.restaurantAddress}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-sm text-gray-800">{order.customer}</p>
                              <p className="text-gray-600 text-xs">{order.customerAddress}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1 font-medium">
                            <Navigation className="w-4 h-4" />
                            {order.distance}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Clock className="w-4 h-4" />
                            {order.eta}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Phone className="w-4 h-4" />
                            Call
                          </button>
                          <button 
                            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${order.status === 'pickup_ready' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                          >
                            {order.status === 'pickup_ready' ? 'Start Delivery' : 'Track Order'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;