import { useState } from 'react';
import Button from '../components/Button';
import { mockSettings } from '../data/mockData';
import '../admin.css';

export default function Settings() {
  const [reportCategories, setReportCategories] = useState(mockSettings.reportCategories);
  const [threshold, setThreshold] = useState(mockSettings.autoHideThreshold);
  const [maintenanceMode, setMaintenanceMode] = useState(mockSettings.maintenanceMode);

  const handleSave = () => {
    alert('Settings saved successfully');
  };

  return (
    <div className="admin-section">
      <h1 className="admin-page-title">Settings</h1>

      <div className="space-y-4 sm:space-y-6">
        <div className="admin-card">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Report Categories</h2>
          <div className="space-y-2 sm:space-y-3">
            {reportCategories.map((category, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-gray-700 bg-[#1a1a2e] text-orange-500 focus:ring-orange-500"
                />
                <span className="text-xs sm:text-sm text-gray-300">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Auto-Moderation</h2>
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
              Polls will be automatically hidden after reaching this many reports
            </p>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">System Settings</h2>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs sm:text-sm text-gray-300 font-medium">Maintenance Mode</span>
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
