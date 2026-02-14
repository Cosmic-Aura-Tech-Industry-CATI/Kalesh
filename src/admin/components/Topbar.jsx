import { Bell, LogOut, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <div className="h-16 bg-[#141420]/95 backdrop-blur-md border-b border-gray-800 fixed top-0 right-0 left-0 lg:left-64 z-20 flex items-center justify-between px-4 sm:px-6 card-shadow">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-[#1a1a2e] rounded-lg transition-colors hover:text-orange-400"
        >
          <Menu size={20} className="text-gray-400" />
        </button>
        <h2 className="text-base sm:text-lg font-semibold text-white">Admin Panel</h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 hover:bg-orange-500/10 rounded-lg transition-colors relative group">
          <Bell size={18} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#1a1a2e]/80 rounded-lg hover:bg-[#1a1a2e] transition-colors">
          <User size={16} className="text-gray-400" />
          <span className="text-xs sm:text-sm text-gray-300">Admin User</span>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
        >
          <LogOut size={18} className="text-red-400 group-hover:text-red-300 transition-colors" />
        </button>
      </div>
    </div>
  );
}
