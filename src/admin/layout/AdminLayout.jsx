import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { useMe } from "../../hooks/useAdmins";
import { AuthService } from "../../services/auth.service";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import EventSubscriber from "../components/EventSubscriber";

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isAuthenticated = AuthService.isAuthenticated();

  const { data, isLoading } = useMe();
  const currentUserId = data?.data?._id || AuthService.getCurrentUser()?._id;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="admin-container min-h-screen pt-[4.25rem]">
      {currentUserId && (
        <EventSubscriber currentUserId={currentUserId} />
      )}
      <Topbar setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <aside
          className={`
            bg-gray-900
            transition-all
            duration-300
            ${sidebarOpen ? "w-64" : "w-0"}
            overflow-hidden
          `}
        ></aside>
        <main className="flex-1 min-w-0 p-4 sm:p-6 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
