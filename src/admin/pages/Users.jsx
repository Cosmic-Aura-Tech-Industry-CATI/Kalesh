import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Table from "../components/Table";
import Button from "../components/Button";
import {
  useGetAllAppUsers,
  useBanUser,
  useWarnUser,
} from "../../hooks/useAppUsers";
import { useMe } from "../../hooks/useAdmins";
import "../style/admin.css";

export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: users, isLoading } = useGetAllAppUsers(page);

  const { mutate: warnUser } = useWarnUser();
  const { mutate: banUser } = useBanUser();

  const { data: adminResponse, isLoading: isAdminLoading } = useMe();
  const adminData = adminResponse?.data || adminResponse;
  const isAdmin = adminData?.role === "admin";

  const handleWarn = (userId) => {
    const reason = window.prompt("Enter warning reason:");
    if (reason) {
      warnUser({ id: userId, payload: { reason } });
    }
  };

  const handleView = (userId) => {
    if (!isAdmin) {
      alert("Access Denied");
      return;
    }

    navigate(`/admin/user/${userId}`);
  };

  const handleBan = (userId) => {
    const reason = window.prompt("Enter ban reason:");
    if (reason) {
      banUser({ id: userId, payload: { reason } });
    }
  };

  if (isLoading || isAdminLoading) {
    return (
      <div className="admin-section">
        <div className="admin-section-header">
          <h1 className="admin-page-title">User Management</h1>
          <div className="text-xs sm:text-sm text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "annonimusName",
      label: "Anonymous Name",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "pollCount",
      label: "Polls Created",
    },
    {
      key: "reportCount",
      label: "Reports",
    },
    {
      key: "moderationStatus",
      label: "Status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            status === "active"
              ? "bg-green-500/20 text-green-400"
              : status === "warned"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: "currentPlan",
      label: "Premium",
      render: (plan) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            plan
              ? "bg-orange-500/20 text-orange-400"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          {plan ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Joined",
      render: (date) => new Date(date).toLocaleDateString("en-IN"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleView(row._id)}
            >
              View
            </Button>
          )}

          <Button
            size="sm"
            variant="warning"
            onClick={() => handleWarn(row._id)}
          >
            Warn
          </Button>

          <Button size="sm" variant="danger" onClick={() => handleBan(row._id)}>
            Ban
          </Button>
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(
    (users?.totalAppUsers || 0) / (users?.limit || 10),
  );

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">User Management</h1>
        <div className="text-xs sm:text-sm text-gray-400">
          {users?.totalAppUsers || 0} users
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto rounded-xl border border-white/20">
        <Table columns={columns} data={users?.appUsers || []} />
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>

        <span className="text-gray-400 flex items-center">
          Page {page} of {totalPages}
        </span>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
