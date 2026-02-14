import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Button from '../components/Button';
import "../style/admin.css";
import "../style/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">

        {/* Logo Section */}
        <div className="admin-login-header">
          
          <div className="admin-login-logo-wrapper">
            <img
              src="/images/logo-600.webp"
              alt="Kalesh Logo"
              className="admin-login-logo"
            />
          </div>

          <div className="admin-login-title-wrapper">
            <h1 className="admin-login-title">
              Kalesh Admin Panel
            </h1>
          </div>

          <p className="admin-login-subtitle">
            Sign in to access the admin panel
          </p>

        </div>

        {/* Form Card */}
        <div className="admin-login-card">
          <form onSubmit={handleLogin} className="admin-login-form">

            <div className="admin-form-group">
              <label className="admin-form-label">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-form-input"
                placeholder="admin@kalesh.com"
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" className="admin-login-button" size="lg">
              <div className="admin-login-button-content">
                <LogIn size={18} />
                <span>Sign In</span>
              </div>
            </Button>

          </form>
        </div>

      </div>
    </div>
  );
}
