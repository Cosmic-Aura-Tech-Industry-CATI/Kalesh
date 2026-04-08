import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function UnauthorizedModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      setOpen(true);
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, []);

  const handleRelogin = () => {
    // 👉 token remove karo
    localStorage.removeItem("token");

    setOpen(false);

    // 👉 login page redirect
    navigate("/admin/login", { replace: true });
  };

  if (!open) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content">
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Session Expired</h2>

          {/* ❌ Cross Icon */}
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-modal-body">
          <p className="text-gray-300">
            401 Unauthorized — Your session has expired. Please login again.
          </p>
        </div>

        <div className="admin-modal-footer">
          <button onClick={handleRelogin} className="admin-btn-primary">
            Re-Login
          </button>
        </div>
      </div>
    </div>
  );
}
