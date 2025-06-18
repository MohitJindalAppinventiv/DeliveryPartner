// src/layouts/DashboardLayout.tsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <div className="flex flex-col min-h-screen transition-all duration-300 md:ml-72">
        {/* Main Outlet Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
