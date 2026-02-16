import { Bell, LogOut, User, Menu } from 'lucide-react';
import { useLogout } from '../../hooks/useAuth';
import "../style/admin.css";
import "../style/topbar.css";


export default function Topbar({ onMenuClick }) {
  const { mutate: logout } = useLogout();

  const handleLogout = logout;

  return (
    <header className="topbar">
      <div className="topbar-container">
        <div className="topbar-left">
          <button
            onClick={onMenuClick}
            className="topbar-menu-toggle"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          <h2 className="topbar-title">Admin Panel</h2>
        </div>

        <div className="topbar-right">
          <button className="topbar-notification-btn" aria-label="Notifications">
            <Bell size={18} />
            <span className="topbar-notification-badge"></span>
          </button>

          <div className="topbar-user-info">
            <User size={16} />
            <span className="topbar-user-name">Admin User</span>
          </div>

          <button
            onClick={handleLogout}
            className="topbar-logout-btn"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
