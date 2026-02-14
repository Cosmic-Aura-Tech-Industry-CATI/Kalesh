import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Button from '../components/Button';
import '../admin.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-[#ff6a00]/20 to-[#ffd700]/20 rounded-full mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text">
              KALESH ADMIN
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">Sign in to access the admin panel</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg sm:rounded-xl border border-[#d4af37]/30 p-6 sm:p-8 card-shadow">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#d4af37] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0b0b0b] border border-[#d4af37]/30 rounded-lg text-sm text-white focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00]/50 transition-colors"
                placeholder="admin@kalesh.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#d4af37] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0b0b0b] border border-[#d4af37]/30 rounded-lg text-sm text-white focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00]/50 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <div className="flex items-center justify-center gap-2">
                <LogIn size={18} className="sm:w-5 sm:h-5" />
                <span>Sign In</span>
              </div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
