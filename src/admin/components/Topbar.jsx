import { Menu } from "lucide-react";

import "../style/admin.css";
import "../style/topbar.css";
export default function Topbar({ setSidebarOpen }) {
  return (
    <div className="admin-header">
      <div className="admin-header-content flex items-center gap-4">
        {/* Menu Button */}
        <button
          className="p-2 bg-red-500"
          onClick={() => {
            console.log("clicked");
            setSidebarOpen((prev) => !prev);
          }}
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <h1 className="text-xl font-bold gradient-text">KALESH Admin</h1>
      </div>
    </div>
  );
}
