import { useState } from "react";
import Table from "../components/Table";
import { useGetLogs } from "../../hooks/useLogs";
import "../style/admin.css";

export default function Logs() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, isError } = useGetLogs({
    page,
    limit,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  const logs = data?.data?.logs || [];
  const pagination = data?.pagination;

  const columns = [
    { key: "_id", label: "Log ID" },
    {
      key: "adminId",
      label: "Admin",
      render: (admin) => admin?.name || admin?.email || "System",
    },
    {
      key: "action",
      label: "Action",
      render: (action) => (
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
          {action}
        </span>
      ),
    },
    { key: "target", label: "Target" },
    {
      key: "createdAt",
      label: "Date & Time",
      render: (date) => (date ? new Date(date).toLocaleString() : "-"),
    },
    { key: "details", label: "Details" },
  ];

  // Reset page when dates change
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setPage(1);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setPage(1);
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title">Logs & Security</h1>
          <div className="text-xs sm:text-sm text-gray-400">
            {pagination?.totalLogs || 0} activity logs{" "}
            {data?.isFromCache && "(Cached)"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            className="admin-form-input px-3 py-1.5 text-sm w-auto"
            value={startDate}
            onChange={handleStartDateChange}
            placeholder="Start Date"
          />
          <span className="text-gray-400">-</span>
          <input
            type="date"
            className="admin-form-input px-3 py-1.5 text-sm w-auto"
            value={endDate}
            onChange={handleEndDateChange}
            placeholder="End Date"
          />
        </div>
      </div>

      <div className="admin-card">
        {isLoading ? (
          <div className="text-gray-400 text-center py-4">Loading logs...</div>
        ) : isError ? (
          <div className="text-red-400 text-center py-4">
            Failed to load logs.
          </div>
        ) : (
          <>
            <Table columns={columns} data={logs} />

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4 border-t border-gray-800 pt-4">
              <button
                className="admin-btn-secondary"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <span className="text-sm text-gray-400">Page {page}</span>
              <button
                className="admin-btn-secondary"
                disabled={!pagination?.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
