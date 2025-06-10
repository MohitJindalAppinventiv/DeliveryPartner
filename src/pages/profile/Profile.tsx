
// import React from 'react';
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { CheckCircle, Edit, LogOut, MapPin, Bike, Phone, Mail, Calendar, Award, FileCheck } from "lucide-react";

// const DeliveryProfile = () => {
//   const deliveryPartner = {
//     photo: 'https://i.pravatar.cc/150?img=3',
//     name: 'John Doe',
//     mobile: '+91 9876543210',
//     email: 'delivery@example.com',
//     address: '123 Main Street',
//     city: 'Delhi',
//     state: 'Delhi',
//     pincode: '110001',
//     status: 'Active',
//     joinedAt: '2023-05-10',
//     deliveriesCompleted: 250,
//     recentDeliveries: [
//       { id: 1, date: '2023-06-01', amount: 420, location: 'Green Park' },
//       { id: 2, date: '2023-06-02', amount: 350, location: 'Hauz Khas' },
//       { id: 3, date: '2023-06-03', amount: 520, location: 'Connaught Place' },
//     ],
//     vehicle: 'Bike',
//     vehicleNumber: 'DL 5S AB 1234',
//     kycVerified: true,
//     rating: 4.7,
//     earnings: {
//       today: 850,
//       weekly: 5400,
//       monthly: 22000
//     },
//     availability: {
//       status: 'Available',
//       nextShift: '2023-06-05 10:00 AM'
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     }).format(date);
//   };

//   // Calculate progress toward next tier (example calculation)
//   const deliveryProgress = (deliveryPartner.deliveriesCompleted / 500) * 100;
  
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col gap-8">
//           {/* Header Section with Profile Summary */}
//           <Card className="w-full border-none shadow-lg overflow-hidden">
//             <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 h-32">
//               <div className="absolute bottom-0 left-8 transform translate-y-1/2">
//                 <div className="relative">
//                   <img
//                     src={deliveryPartner.photo}
//                     alt="Profile"
//                     className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
//                   />
//                   <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
//                 </div>
//               </div>
//             </div>
//             <CardContent className="pt-16 pb-6 px-8">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800">{deliveryPartner.name}</h2>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//                       {deliveryPartner.status}
//                     </Badge>
//                     <span className="flex items-center text-amber-500 font-medium">
//                       ⭐ {deliveryPartner.rating}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <Button variant="outline" size="sm" className="flex gap-2">
//                     <Edit className="h-4 w-4" />
//                     Edit Profile
//                   </Button>
//                   <Button variant="destructive" size="sm" className="flex gap-2">
//                     <LogOut className="h-4 w-4" />
//                     Logout
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Left Column - Personal Info */}
//             <div className="space-y-6">
//               {/* Contact Info Card */}
//               <Card className="shadow-md">
//                 <CardHeader className="pb-3">
//                   <h3 className="text-lg font-semibold">Contact Information</h3>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <Phone className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm text-gray-500">Mobile</p>
//                       <p className="font-medium">{deliveryPartner.mobile}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Mail className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm text-gray-500">Email</p>
//                       <p className="font-medium">{deliveryPartner.email}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm text-gray-500">Address</p>
//                       <p className="font-medium">{deliveryPartner.address}, {deliveryPartner.city}, {deliveryPartner.state} - {deliveryPartner.pincode}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Vehicle Info Card */}
//               <Card className="shadow-md">
//                 <CardHeader className="pb-3">
//                   <h3 className="text-lg font-semibold">Vehicle Details</h3>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <Bike className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm text-gray-500">Vehicle Type</p>
//                       <p className="font-medium">{deliveryPartner.vehicle}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <FileCheck className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm text-gray-500">Registration Number</p>
//                       <p className="font-medium">{deliveryPartner.vehicleNumber}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <CheckCircle className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm text-gray-500">KYC Status</p>
//                       <div className="flex items-center gap-2">
//                         {deliveryPartner.kycVerified ? (
//                           <>
//                             <span className="text-green-600 font-medium">Verified</span>
//                             <CheckCircle className="h-4 w-4 text-green-600" />
//                           </>
//                         ) : (
//                           <span className="text-red-500 font-medium">Pending</span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Middle Column - Performance Stats */}
//             <div className="space-y-6">
//               {/* Earnings Card */}
//               <Card className="shadow-md">
//                 <CardHeader className="pb-3">
//                   <h3 className="text-lg font-semibold">Earnings</h3>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="text-center p-2 bg-blue-50 rounded-lg">
//                       <p className="text-sm text-gray-500">Today</p>
//                       <p className="font-bold text-lg">₹{deliveryPartner.earnings.today}</p>
//                     </div>
//                     <div className="text-center p-2 bg-blue-50 rounded-lg">
//                       <p className="text-sm text-gray-500">This Week</p>
//                       <p className="font-bold text-lg">₹{deliveryPartner.earnings.weekly}</p>
//                     </div>
//                     <div className="text-center p-2 bg-blue-50 rounded-lg">
//                       <p className="text-sm text-gray-500">This Month</p>
//                       <p className="font-bold text-lg">₹{deliveryPartner.earnings.monthly}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Deliveries Stats Card */}
//               <Card className="shadow-md">
//                 <CardHeader className="pb-3">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold">Delivery Stats</h3>
//                     <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//                       Tier: Silver
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <div className="flex justify-between items-center mb-2">
//                       <p className="text-sm font-medium">{deliveryPartner.deliveriesCompleted} Deliveries</p>
//                       <p className="text-sm text-gray-500">Target: 500</p>
//                     </div>
//                     <Progress value={deliveryProgress} className="h-2" />
//                     <p className="text-xs text-gray-500 mt-1">Complete {500 - deliveryPartner.deliveriesCompleted} more deliveries to reach Gold tier</p>
//                   </div>
                  
//                   <div className="flex items-center gap-3">
//                     <Calendar className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm text-gray-500">Member Since</p>
//                       <p className="font-medium">{formatDate(deliveryPartner.joinedAt)}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center gap-3">
//                     <Award className="h-4 w-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm text-gray-500">Rating</p>
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <span key={i} className={`text-${i < Math.floor(deliveryPartner.rating) ? 'yellow' : 'gray'}-400`}>
//                             ★
//                           </span>
//                         ))}
//                         <span className="ml-2 font-medium">{deliveryPartner.rating}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Right Column - Recent Activity */}
//             <div className="space-y-6">
//               {/* Availability Card */}
//               <Card className="shadow-md">
//                 <CardHeader className="pb-3">
//                   <h3 className="text-lg font-semibold">Availability</h3>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="bg-green-50 rounded-lg p-3 flex items-center justify-between">
//                     <p className="font-medium text-green-700">Currently Available</p>
//                     <Badge className="bg-green-500">Online</Badge>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Next Scheduled Shift</p>
//                     <p className="font-medium">{deliveryPartner.availability.nextShift}</p>
//                   </div>
//                 </CardContent>
//               </Card>
              
//               {/* Recent Deliveries Card */}
//               <Card className="shadow-md">
//                 <CardHeader className="pb-3">
//                   <h3 className="text-lg font-semibold">Recent Deliveries</h3>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {deliveryPartner.recentDeliveries.map((delivery) => (
//                       <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <div>
//                           <p className="font-medium">{delivery.location}</p>
//                           <p className="text-xs text-gray-500">{delivery.date}</p>
//                         </div>
//                         <p className="font-bold text-green-600">₹{delivery.amount}</p>
//                       </div>
//                     ))}
//                     <Button variant="outline" className="w-full mt-2 text-blue-600">
//                       View All Deliveries
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryProfile;

// import React from 'react'

// const Profile = () => {
//   return (
//     <div>Profile</div>
//   )
// }

// export default Profile// src/pages/profile/Profile.tsx
import { useForm } from "react-hook-form";
import { Lock, Calendar, MapPin, Car, CreditCard, FileText } from "lucide-react";

const Profile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      vehicleColor: "Blue",
      vehicleNumber: "KA01AB1234",
      drivingLicense: "DL1234567890123",
      rcNumber: "RCKA01AB1234",
      aadharNumber: "123456789012",
      dob: "1990-01-01",
      address: "123 Main St, Bangalore, Karnataka",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (data: any) => {
    console.log("Profile updated:", data);
    // Add your update logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Vehicle Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Color</label>
                <input
                  type="text"
                  {...register("vehicleColor", { required: "Vehicle color is required" })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.vehicleColor && <p className="mt-1 text-sm text-red-500">{errors.vehicleColor.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                <input
                  type="text"
                  {...register("vehicleNumber", { required: "Vehicle number is required" })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.vehicleNumber && <p className="mt-1 text-sm text-red-500">{errors.vehicleNumber.message}</p>}
              </div>
            </div>
          </div>

          {/* Document Information (Read-only) */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Document Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Driving License</label>
                <input
                  type="text"
                  {...register("drivingLicense")}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">RC Number</label>
                <input
                  type="text"
                  {...register("rcNumber")}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Aadhar Number</label>
                <input
                  type="text"
                  {...register("aadharNumber")}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  {...register("dob", { required: "Date of birth is required" })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  {...register("address", { required: "Address is required" })}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  {...register("currentPassword")}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  {...register("newPassword")}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;