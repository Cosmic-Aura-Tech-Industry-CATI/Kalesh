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
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b0f] to-[#1a1a2e] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text">
              KALESH ADMIN
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">Sign in to access the admin panel</p>
        </div>

        <div className="bg-[#141420] rounded-lg sm:rounded-xl border border-gray-700 p-6 sm:p-8 card-shadow">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="admin@kalesh.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
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
