import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";
import {
  useLogin,
  useVerifyOtp,
  useForgetPassword,
  useResetPassword,
} from "../../hooks/useAuth";
import "../style/admin.css";
import "../style/login.css";

export default function Login() {
  // --- Existing Login States ---
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");

  // --- Forgot Password States ---
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [fpStep, setFpStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [fpEmail, setFpEmail] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpNewPassword, setFpNewPassword] = useState("");
  const [fpConfirmPassword, setFpConfirmPassword] = useState("");
  const [fpError, setFpError] = useState("");

  // --- Password Visibility States ---
  const [showPassword, setShowPassword] = useState(false); // For main login
  const [showNewPassword, setShowNewPassword] = useState(false); // For FP step 3
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For FP step 3

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: login, isPending, error } = useLogin();

  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();
  const { mutate: forgetPasswordMutate, isPending: isSendingFpOtp } =
    useForgetPassword();
  const { mutate: resetPasswordMutate, isPending: isResettingPassword } =
    useResetPassword();

  const navigate = useNavigate();

  // --- Main Login Handlers ---
  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        setEmailForOtp(data.email);
        setShowOtp(true);
      },
    });
  };

  const handleVerifyOtp = async () => {
    verifyOtp(
      { email: emailForOtp, otp, otpType: "login" },
      {
        onSuccess: () => {
          setShowOtp(false); // ✅ popup close
          navigate("/admin/dashboard");
        },
      },
    );
  };

  // --- Forgot Password Handlers ---
  const handleSendFpOtp = () => {
    if (!fpEmail) return setFpError("Please enter your email");
    setFpError("");
    forgetPasswordMutate(
      { email: fpEmail },
      {
        onSuccess: () => {
          setFpStep(2);
        },
      },
    );
  };

  const handleVerifyFpOtp = () => {
    if (!fpOtp || fpOtp.length < 6)
      return setFpError("Please enter a valid 6-digit OTP");
    verifyOtp({ email: fpEmail, otp: fpOtp, otpType: "forgot_password" });
    setFpError("");
    // Move to step 3 to collect the new password. The actual OTP verification happens during reset.
    setFpStep(3);
  };

  const handleResetPassword = () => {
    if (fpNewPassword !== fpConfirmPassword) {
      return setFpError("Passwords do not match!");
    }
    if (fpNewPassword.length < 6) {
      return setFpError("Password must be at least 6 characters");
    }
    setFpError("");

    resetPasswordMutate(
      { email: fpEmail, password: fpNewPassword },
      {
        onSuccess: () => {
          setShowForgotPassword(false);
          setFpStep(1);
          setFpEmail("");
          setFpOtp("");
          setFpNewPassword("");
          setFpConfirmPassword("");
        },
      },
    );
  };

  // --- Common Style for Eye Icon Buttons ---
  const eyeButtonStyle = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#ff6b00", // Admin panel theme color
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "0",
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label className="admin-form-label" style={{ marginBottom: 0 }}>
                  Password
                </label>
                {/* Forgot Password Link */}
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff6b00",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: 0,
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Main Login Password Input with Toggle */}
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="admin-form-input"
                  style={{ paddingRight: "40px", margin: 0 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={eyeButtonStyle}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="admin-login-button"
              size="lg"
              disabled={isPending}
              style={{ marginTop: "24px" }}
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* --- MAIN LOGIN OTP POPUP --- */}
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

        {/* --- FORGOT PASSWORD MULTI-STEP POPUP --- */}
        {showForgotPassword && (
          <div className="otp-popup-overlay">
            <div className="otp-popup-card" style={{ position: "relative" }}>
              {/* Close Modal Button */}
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setFpStep(1);
                  setFpError("");
                }}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ✕
              </button>

              <h3 className="otp-popup-title">Reset Password</h3>

              {fpError && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  {fpError}
                </p>
              )}

              {/* STEP 1: Enter Email */}
              {fpStep === 1 && (
                <>
                  <p className="otp-popup-subtitle">
                    Enter your registered email address
                  </p>
                  <input
                    type="email"
                    value={fpEmail}
                    onChange={(e) => setFpEmail(e.target.value)}
                    placeholder="admin@kalesh.com"
                    className="admin-form-input"
                    style={{ marginBottom: "15px" }}
                  />
                  <button
                    onClick={handleSendFpOtp}
                    className="otp-popup-button"
                    disabled={isSendingFpOtp}
                  >
                    {isSendingFpOtp ? "Sending..." : "Send OTP"}
                  </button>
                </>
              )}

              {/* STEP 2: Verify OTP */}
              {fpStep === 2 && (
                <>
                  <p className="otp-popup-subtitle">
                    Enter the 6-digit OTP sent to {fpEmail}
                  </p>
                  <input
                    type="text"
                    maxLength="6"
                    value={fpOtp}
                    onChange={(e) => setFpOtp(e.target.value)}
                    placeholder="------"
                    className="otp-popup-input"
                    style={{ marginBottom: "15px" }}
                  />
                  <button
                    onClick={handleVerifyFpOtp}
                    className="otp-popup-button"
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {/* STEP 3: Set New Password */}
              {fpStep === 3 && (
                <>
                  <p className="otp-popup-subtitle">Create a new password</p>

                  {/* New Password Field with Toggle */}
                  <div style={{ position: "relative", marginBottom: "10px" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={fpNewPassword}
                      onChange={(e) => setFpNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="admin-form-input"
                      style={{ paddingRight: "40px", margin: 0 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={eyeButtonStyle}
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  {/* Confirm Password Field with Toggle */}
                  <div style={{ position: "relative", marginBottom: "15px" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={fpConfirmPassword}
                      onChange={(e) => setFpConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      className="admin-form-input"
                      style={{ paddingRight: "40px", margin: 0 }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={eyeButtonStyle}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handleResetPassword}
                    className="otp-popup-button"
                    disabled={isResettingPassword}
                  >
                    {isResettingPassword
                      ? "Resetting..."
                      : "Create New Password"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
