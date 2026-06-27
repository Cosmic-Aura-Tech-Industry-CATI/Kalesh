import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import Table from "../components/Table";
import Button from "../components/Button";
import {
  useGetAllAppUsers,
  useSearchAppUsers,
  useBanUser,
  useWarnUser,
} from "../../hooks/useAppUsers";
import { useMe } from "../../hooks/useAdmins";
import "../style/admin.css";

export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: allUsers, isLoading: allUsersLoading } = useGetAllAppUsers({
    page,
    limit: 30,
  });

  const { data: searchedUsers, isLoading: searchLoading } =
    useSearchAppUsers(debouncedSearch);

  const users =
    debouncedSearch.trim().length > 0 ? searchedUsers || allUsers : allUsers;

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
    navigate(`/admin/user/${userId}`);
  };

  const handleBan = (userId) => {
    const reason = window.prompt("Enter ban reason:");
    if (reason) {
      banUser({ id: userId, payload: { reason } });
    }
  };

  if (allUsersLoading && !allUsers) {
    return (
      <div className="admin-section">
        <h1 className="admin-page-title">User Management</h1>
        <p className="text-gray-400 mt-4">Loading...</p>
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
                : status === "deleted"
                  ? "bg-gray-500/20 text-gray-300"
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

          {row.moderationStatus !== "deleted" && (
            <>
              <Button
                size="sm"
                variant="warning"
                onClick={() => handleWarn(row._id)}
              >
                Warn
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => handleBan(row._id)}
              >
                Ban
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil((allUsers?.totalAppUsers || 0) / 30);

  return (
    <div className="admin-section">
      <div className="admin-section-header flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="admin-page-title">User Management</h1>
          <p className="text-sm text-gray-400 mt-1">
            Total Users:{" "}
            <span className="text-orange-400 font-semibold">
              {users?.totalAppUsers || 0}
            </span>
          </p>
        </div>

        <div className="relative w-full md:w-[420px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search username, anonymous name..."
            className="
        w-full
        h-12
        rounded-xl
        border
        border-[#323232]
        bg-[#1A1A1A]
        pl-12
        pr-14
        text-white
        placeholder:text-gray-500
        transition-all
        duration-300
        focus:border-orange-500
        focus:ring-2
        focus:ring-orange-500/20
        outline-none
      "
          />
        </div>
      </div>

      <div className="relative">
        {searchLoading && (
          <div className="absolute top-3 right-4 z-10 flex items-center gap-2 rounded-lg bg-[#1a1a1a]/90 px-3 py-1 text-sm text-orange-400 shadow-lg">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-400 border-t-transparent"></div>
            Searching...
          </div>
        )}

        <div className="h-[500px] overflow-y-auto rounded-xl border border-white/20">
          <Table columns={columns} data={users?.appUsers || []} />
        </div>
      </div>

      {!debouncedSearch && (
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
      )}
    </div>
  );
}
