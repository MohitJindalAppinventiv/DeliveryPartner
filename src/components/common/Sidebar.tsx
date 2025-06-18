// src/components/Sidebar.tsx
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Clock,
  User,
  Bell,
  LogOut,
  Menu,
  X,
  Star,
  ChefHat,
  IndianRupee,
} from "lucide-react";
import { logout } from "../../store/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Order History", icon: Clock, path: "/order-history" },
    { name: "Earnings", icon: IndianRupee, path: "/earnings" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Notifications", icon: Bell, path: "/notifications" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const dispatch=useAppDispatch();
  const navigate=useNavigate();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={toggleMobileSidebar}
            className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 shadow-sm"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center shadow-md">
              <ChefHat className="text-white h-5 w-5" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Foodify
            </h1>
          </div>

          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-700">4.5</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-40 ${
          window.innerWidth < 768 ? "mt-16" : "mt-0"
        }`}
      >
        <div className="w-72 flex flex-col h-full bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-200/50">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center p-6 border-b border-gray-200/70 space-x-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="text-white h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Foodify
            </h1>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-4">
              {navItems.map((item, index) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`group flex items-center p-4 rounded-2xl transition-all duration-200 hover:scale-105 ${
                      isActive(item.path)
                        ? "bg-orange-600 text-white shadow-lg hover:shadow-xl"
                        : "hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 text-gray-700 hover:text-gray-900"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <item.icon
                      className={`h-5 w-5 transition-all duration-200 ${
                        isActive(item.path)
                          ? "text-white"
                          : "text-gray-600 group-hover:text-gray-800"
                      }`}
                    />
                    <span className="ml-4 font-medium">
                      {item.name}
                    </span>
                    {isActive(item.path) && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-gray-200/70">
            <button
            onClick={()=>{
              dispatch(logout());
              navigate('/login')
            }}
              className="group flex items-center w-full p-4 rounded-2xl hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 hover:scale-105 transition-all"
            >
              <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
              <span className="ml-4 font-medium text-gray-700 group-hover:text-red-600">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Spacer */}
      <div className="md:hidden h-16" />
    </>
  );
};

export default Sidebar;
