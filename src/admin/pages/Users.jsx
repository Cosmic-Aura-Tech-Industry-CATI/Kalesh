import { useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import { useGetAllAppUsers } from "../../hooks/useAppUsers";
import "../style/admin.css";

export default function Users() {
  const { data: users = [], isLoading } = useGetAllAppUsers();

  const adminData = JSON.parse(localStorage.getItem("admin"));
  const isAdmin = adminData?.role === "admin";

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [plan, setPlan] = useState("monthly");

  const filteredUsers =
    users?.data?.filter((user) =>
      user.username?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const handleWarn = (userId) => {
    alert(`Warning sent to user ${userId}`);
  };

  const handleView = (userId) => {
    if (!isAdmin) {
      alert("Access Denied");
      return;
    }

    window.location.href = `/admin/user/${userId}`;
  };

  const handleTempBan = (userId) => {
    alert(`User ${userId} temporarily banned`);
  };

  const handlePermaBan = (userId) => {
    alert(`User ${userId} permanently banned`);
  };

  const grantPremium = () => {
    alert(`Premium granted (${plan}) to user ${selectedUser.id}`);
    setSelectedUser(null);
  };

  const columns = [
    { key: "anonymousName", label: "Anonymous Name" },
    { key: "username", label: "Username" },
    { key: "pollsCreated", label: "Polls Created" },
    { key: "reportsCount", label: "Reports" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            status === "Active"
              ? "bg-green-500/20 text-green-400"
              : status === "Warned"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: "isPremium",
      label: "Premium",
      render: (isPremium) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            isPremium
              ? "bg-orange-500/20 text-orange-400"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          {isPremium ? "Yes" : "No"}
        </span>
      ),
    },
    { key: "joinedAt", label: "Joined" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <Button size="sm" variant="primary" onClick={() => handleView(row.id)}>
              View
            </Button>
          )}

          <Button size="sm" variant="warning" onClick={() => handleWarn(row.id)}>
            Warn
          </Button>

          <Button size="sm" variant="danger" onClick={() => handleTempBan(row.id)}>
            Temp Ban
          </Button>

          <Button size="sm" variant="danger" onClick={() => handlePermaBan(row.id)}>
            Perma Ban
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <div className="admin-section">Loading...</div>;
  }

  return (
    <div className="admin-section">

      {/* HEADER */}
      <div className="admin-section-header">

        <h1 className="admin-page-title">User Management</h1>

        {/* SEARCH BAR */}
        <div className="relative w-72">

          <input
            type="text"
            placeholder="Search username..."
            className="admin-form-input pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>

          {/* SEARCH RESULT DROPDOWN */}
          {search && (
            <div className="absolute w-full bg-[#1a1a1a] border border-[#d4af37]/20 mt-1 rounded-lg z-50 max-h-48 overflow-y-auto">

              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="px-4 py-2 hover:bg-[#ff6a00]/20 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  {user.username}
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="px-4 py-2 text-gray-500">No users found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <Table columns={columns} data={users.data} />

      {/* PREMIUM MODAL */}
      {selectedUser && (
        <div className="admin-modal-overlay">

          <div className="admin-modal-content">

            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Grant Premium</h2>
            </div>

            <div className="admin-modal-body">

              <div className="admin-form-group">
                <label className="admin-form-label">User ID</label>
                <input
                  className="admin-form-input"
                  value={selectedUser.id}
                  disabled
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Plan</label>

                <select
                  className="admin-form-select"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>

              </div>

            </div>

            <div className="admin-modal-footer">

              <button
                className="admin-btn-secondary"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>

              <button
                className="admin-btn-primary"
                onClick={grantPremium}
              >
                Grant Premium
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}