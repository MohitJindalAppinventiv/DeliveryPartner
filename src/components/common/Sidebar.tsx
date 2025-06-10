// src/components/Sidebar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Clock,
  DollarSign,
  User,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    // { name: "Orders", icon: ClipboardList, path: "/orders" },
    { name: "Order History", icon: Clock, path: "/order-history" },
    { name: "Earnings", icon: DollarSign, path: "/earnings" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Notifications", icon: Bell, path: "/notifications" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? (
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        ) : (
          <ChevronRight className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <div className={`flex flex-col h-full bg-white shadow-lg ${collapsed ? "w-20" : "w-64"}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!collapsed && (
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-800">FoodRider</h1>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-100 hidden md:block"
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Demo Partner Section */}
          <div className="p-4 border-b">
            <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
              {!collapsed && (
                <div>
                  <p className="text-sm text-gray-500">Demo Partner</p>
                  <div className="flex items-center mt-1">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="ml-1 text-sm font-medium text-gray-700">4.5</span>
                  </div>
                </div>
              )}
              {collapsed && (
                <div className="flex flex-col items-center">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-xs mt-1 text-gray-700">4.5</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 p-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg hover:bg-gray-100 ${
                      collapsed ? "justify-center" : ""
                    }`}
                  >
                    <item.icon className="h-5 w-5 text-gray-600" />
                    {!collapsed && (
                      <span className="ml-3 text-gray-700">{item.name}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <LogOut className="h-5 w-5 text-gray-600" />
              {!collapsed && (
                <span className="ml-3 text-gray-700">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;