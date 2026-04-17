import { Menu, Bell, User, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthService } from "../../services/auth.service";

import "../style/admin.css";
import "../style/topbar.css";

export default function Topbar({ setSidebarOpen }) {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminDetails, setShowAdminDetails] = useState(false);

  const [admin, setAdmin] = useState(null);

  // 🔹 Fetch logged admin info
  useEffect(() => {
    const data = AuthService.getCurrentUser();
    setAdmin(data);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-container">
        {/* LEFT */}
        <div className="admin-topbar-left">
          <button
            className="admin-sidebar-toggle-btn"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <Menu size={22} />
          </button>

          <h1 className="admin-brand-title">
            <span className="admin-brand-main">Kalesh</span>
            <span className="admin-brand-badge">Admin</span>
          </h1>
        </div>

        {/* RIGHT */}
        <div className="admin-topbar-right">
          {/* 🔔 Notification */}
          {/* <div className="admin-dropdown-wrapper"> 
            <button
              className="admin-icon-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowAdminDetails(false);
              }}
            >
              <Bell size={18} />
              <span className="admin-notification-badge"></span>
            </button>

            {showNotifications && (
              <div className="admin-dropdown">
                <p>No new notifications</p>
              </div>
            )}
          </div>/ */}

          {/* 🔙 Back to Home */}
          <button className="admin-back-btn" onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
          </button>

          {/* 👤 Admin User */}
          <div className="admin-dropdown-wrapper">
            <button
              className="admin-user-info"
              onClick={() => {
                setShowAdminDetails(!showAdminDetails);
                setShowNotifications(false);
              }}
            >
              <User size={16} />
              <span className="admin-user-name">{admin?.name || "Admin"}</span>
            </button>

            {showAdminDetails && (
              <div className="admin-dropdown">
                <p>
                  <strong>Name:</strong> {admin?.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {admin?.email || "N/A"}
                </p>
                <p>
                  <strong>Role:</strong> {admin?.role || "N/A"}
                </p>
              </div>
            )}
          </div>

          {/* 🚪 Logout */}
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
