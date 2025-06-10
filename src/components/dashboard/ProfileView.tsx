import React from 'react'
import { User, Bell, LogOut } from 'lucide-react'
const ProfileView = ({ partner, notifications, updatePartner }) => {
  return (
    <div className="space-y-6">
    <h2 className="text-xl font-semibold">Profile</h2>
    
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{partner.name}</h3>
          <p className="text-gray-600">{partner.email}</p>
        </div>
        <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          ✏️ Edit Profile
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <p className="text-gray-900">{partner.phone}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
          <p className="text-gray-900">{partner.vehicleType}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <p className="text-gray-900">⭐ {partner.rating}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Deliveries</label>
          <p className="text-gray-900">{partner.totalDeliveries}</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>
      <div className="space-y-3">
        {notifications.map(notification => (
          <div key={notification.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start">
              <Bell className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6">
      <button className="w-full flex items-center justify-center py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </button>
    </div>
  </div>
  )
}

export default ProfileView