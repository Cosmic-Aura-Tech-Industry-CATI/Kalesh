import { Outlet } from "react-router-dom";
import { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  console.log("Sidebar state:", sidebarOpen);  // 👈 Yaha add karo

  return (
    <div className="admin-container min-h-screen">
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
        >     
        </aside>
       

        <main className="flex-1 p-6 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
