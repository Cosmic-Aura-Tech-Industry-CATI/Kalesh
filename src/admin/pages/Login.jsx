import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
import Button from "../components/Button";
import { useLogin } from "../../hooks/useAuth";
import "../style/admin.css";
import "../style/login.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: login, isPending, error } = useLogin();

  const onSubmit = (data) => login(data);

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
            <h1 className="admin-login-title">Kalesh Admin Panel</h1>
          </div>

          <p className="admin-login-subtitle">
            Sign in to access the admin panel
          </p>
        </div>

        {/* Form Card */}
        <div className="admin-login-card">
          <form onSubmit={handleSubmit(onSubmit)} className="admin-login-form">
            {error && (
              <div className="text-red-500 text-sm text-center mb-4">
                {error?.response?.data?.message ||
                  "Login failed. Please check your credentials."}
              </div>
            )}

            <div className="admin-form-group">
              <label className="admin-form-label">Email Address</label>

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="admin-form-input"
                placeholder="admin@kalesh.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>

              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="admin-form-input"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="admin-login-button"
              size="lg"
              disabled={isPending}
            >
              <div className="admin-login-button-content">
                {isPending ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
