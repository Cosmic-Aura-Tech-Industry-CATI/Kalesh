import { Link, useLocation } from 'react-router-dom';
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
} from 'lucide-react';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/reported-polls', icon: AlertCircle, label: 'Reported Polls' },
  { path: '/admin/poll-moderation', icon: FileText, label: 'Poll Moderation' },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/banned-users', icon: Ban, label: 'Banned Users' },
  { path: '/admin/premium', icon: Crown, label: 'Premium' },
  { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { path: '/admin/admins', icon: Shield, label: 'Admins' },
  { path: '/admin/logs', icon: ScrollText, label: 'Logs' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-[#0b0b0b]/95 backdrop-blur-md h-screen fixed left-0 top-0 border-r border-[#d4af37]/20 z-40 transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-[#d4af37]/20">
          <h1 className="text-xl sm:text-2xl font-bold gradient-text">
            KALESH ADMIN
          </h1>
        </div>

        <nav className="px-3 overflow-y-auto max-h-[calc(100vh-100px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ff6a00] to-[#ffd700] text-white shadow-lg shadow-[#ff6a00]/30'
                    : 'text-gray-400 hover:bg-[#1a1a1a]/80 hover:text-[#ff6a00] hover:translate-x-1'
                }`}
              >
                <Icon size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
