import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  AlertCircle,
  FileText,
  Users,
  Ban,
  Crown,
  CreditCard,
  Shield,
  ScrollText,
  Settings,
  Briefcase,
} from "lucide-react";
import "../style/sidebar.css";

const adminMenuItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/reported-polls", icon: AlertCircle, label: "Reported Polls" },
  { path: "/admin/poll-moderation", icon: FileText, label: "Poll Moderation" },
  { path: "/admin/users", icon: Users, label: "Users" },
  { path: "/admin/jobs", icon: Briefcase, label: "Jobs" },
  { path: "/admin/banned-users", icon: Ban, label: "Banned Users" },
  { path: "/admin/premium", icon: Crown, label: "Premium" },
  { path: "/admin/payments", icon: CreditCard, label: "Payments" },
  { path: "/admin/admins", icon: Shield, label: "Admins" },
  { path: "/admin/logs", icon: ScrollText, label: "Logs" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay (Mobile Only) */}
      {isOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`admin-sidebar-container ${
          isOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {/* Sidebar Header */}
        

        {/* Navigation Menu */}
        <nav className="admin-sidebar-menu">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`admin-sidebar-link ${
                  isActive ? "active-link" : ""
                }`}
              >
                <Icon className="admin-sidebar-icon" size={20} />
                <span className="admin-sidebar-label">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
