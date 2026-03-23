import { useState } from "react";
import Button from "../components/Button";
import { mockSettings } from "../data/mockData";
import "../style/admin.css";

export default function Settings() {
  const [reportCategories, setReportCategories] = useState(
    mockSettings.reportCategories,
  );
  const [threshold, setThreshold] = useState(mockSettings.autoHideThreshold);
  const [maintenanceMode, setMaintenanceMode] = useState(
    mockSettings.maintenanceMode,
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      // 🔥 Backend API call
      await fetch("/api/v1/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      alert("Your password is successfully updated");

      // reset fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleSave = () => {
    alert("Settings saved successfully");
  };

  return (
    <div className="admin-section">
      <h1 className="admin-page-title">Settings</h1>

      <div className="space-y-4 sm:space-y-6">
        <div className="admin-card">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Report Categories
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {reportCategories.map((category, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-gray-700 bg-[#1a1a2e] text-orange-500 focus:ring-orange-500"
                />
                <span className="text-xs sm:text-sm text-gray-300">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Auto-Moderation
          </h2>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Auto-hide Threshold (Number of Reports)
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full max-w-xs px-3 sm:px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
            />
            <p className="text-xs text-gray-500 mt-2">
              Polls will be automatically hidden after reaching this many
              reports
            </p>
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Change Admin Password
            </h2>

            <Button onClick={() => setShowPasswordForm(!showPasswordForm)}>
              {showPasswordForm ? "Close" : "Change Password"}
            </Button>
          </div>

          {showPasswordForm && (
            <div className="mt-4">
              {/* Old Password */}
              <div className="mb-4">
                <label className="admin-form-label">Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="admin-form-input"
                  placeholder="Enter old password"
                />
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="admin-form-label">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="admin-form-input"
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="admin-form-label">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="admin-form-input"
                  placeholder="Confirm new password"
                />
              </div>

              <Button onClick={handleChangePassword}>Submit</Button>
            </div>
          )}
        </div>

        <div className="admin-card">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            System Settings
          </h2>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs sm:text-sm text-gray-300 font-medium">
                Maintenance Mode
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Temporarily disable the platform for maintenance
              </p>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-12 h-6 rounded-full appearance-none bg-gray-700 checked:bg-orange-500 relative cursor-pointer transition-colors"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
