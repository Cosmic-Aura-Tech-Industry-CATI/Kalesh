import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content-wrapper">
        <Topbar />

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
