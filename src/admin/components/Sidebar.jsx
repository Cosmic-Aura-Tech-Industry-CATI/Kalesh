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
  UserCog,
} from "lucide-react";
import "../style/sidebar.css";

const menuItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/reported-polls", icon: AlertCircle, label: "Reports" },
  { path: "/admin/users", icon: Users, label: "Users" },
  { path: "/admin/banned-users", icon: Ban, label: "Banned Users" },
  { path: "/admin/jobs", icon: Briefcase, label: "Jobs Posting" },
  { path: "/admin/blog", icon: FileText, label: "Blog" },
  { path: "/admin/admins", icon: UserCog, label: "Admins" },
  { path: "/admin/premium", icon: Crown, label: "Premium Users" },
  { path: "/admin/payments", icon: CreditCard, label: "Payments" },
  { path: "/admin/poll-moderation", icon: Shield, label: "Moderation" },
  { path: "/admin/logs", icon: ScrollText, label: "Activity Logs" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay only for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        admin-sidebar
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <nav className="admin-sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`admin-sidebar-item ${isActive ? "active" : ""}`}
              >
                <Icon size={18} />
                <span className="sidebar-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
