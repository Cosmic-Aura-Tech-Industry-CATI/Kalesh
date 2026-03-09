import { useForm } from "react-hook-form";
import { useState } from "react";
import { LogIn } from "lucide-react";
import Button from "../components/Button";
import { useLogin, useVerifyOtp } from "../../hooks/useAuth";
import "../style/admin.css";
import "../style/login.css";

export default function Login() {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    mutate: login,
    isPending,
    error,
  } = useLogin();

  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();

  const onSubmit = (data) => {
    login(data);
    setEmailForOtp(data.email);
    setShowOtp(true);
  };

  const handleVerifyOtp = async () => {
    verifyOtp({ email: emailForOtp, otp });
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        {/* HEADER */}
        <div className="admin-login-header">
          <div className="admin-login-logo-wrapper">
            <img
              src="/images/logo-600.webp"
              alt="Kalesh Logo"
              className="admin-login-logo"
            />
          </div>

          <h1 className="admin-login-title">Kalesh Admin Panel</h1>

          <p className="admin-login-subtitle">
            Sign in to access the admin panel
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="admin-login-card">
          <form onSubmit={handleSubmit(onSubmit)} className="admin-login-form">
            {error && (
              <div className="text-red-500 text-sm text-center mb-4">
                {error?.response?.data?.message || "Login failed"}
              </div>
            )}

            <div className="admin-form-group">
              <label className="admin-form-label">Email</label>

              <input
                type="email"
                {...register("email", { required: true })}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>

              <input
                type="password"
                {...register("password", { required: true })}
                className="admin-form-input"
              />
            </div>

            <Button
              type="submit"
              className="admin-login-button"
              size="lg"
              disabled={isPending}
            >
              <LogIn size={18} />
              Sign In
            </Button>
          </form>
        </div>

        {/* OTP POPUP */}
        {showOtp && (
          <div className="otp-popup-overlay">
            <div className="otp-popup-card">
              <h3 className="otp-popup-title">Enter Verification Code</h3>

              <p className="otp-popup-subtitle">
                We sent a 6 digit OTP to your email
              </p>

              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="------"
                className="otp-popup-input"
              />

              <button
                onClick={handleVerifyOtp}
                className="otp-popup-button"
                disabled={isVerifyingOtp}
              >
                {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
