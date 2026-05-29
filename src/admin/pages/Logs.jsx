import { useState } from "react";
import Table from "../components/Table";
import { useGetLogs } from "../../hooks/useLogs";
import "../style/admin.css";

export default function Logs() {
  // ✅ Get Current Date
  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  // ✅ Default Current Date
  const [startDate, setStartDate] =
    useState(getTodayDate());

  const [endDate, setEndDate] =
    useState(getTodayDate());

  // ✅ Proper Date Formatting
  const formattedStartDate = startDate
    ? `${startDate}T00:00:00`
    : undefined;

  const formattedEndDate = endDate
    ? `${endDate}T23:59:59`
    : undefined;

  // ✅ API Call
  const { data, isLoading, isError } =
    useGetLogs({
      page,
      limit,

      ...(formattedStartDate && {
        startDate: formattedStartDate,
      }),

      ...(formattedEndDate && {
        endDate: formattedEndDate,
      }),
    });

  // ✅ Debug Logs (remove in production)
  console.log({
    startDate,
    endDate,
    formattedStartDate,
    formattedEndDate,
  });

  console.log(
    "FULL LOGS API:",
    JSON.stringify(data, null, 2)
  );

  // ✅ Data
  const logs = data?.data?.logs || [];

  const pagination = data?.pagination || {};

  const totalLogs =
    pagination?.totalLogs > 0
      ? pagination.totalLogs
      : data?.results || logs.length;

  const totalPages =
    pagination?.totalPages ||
    (pagination?.hasNextPage
      ? page + 1
      : page);

  // ✅ Table Columns
  const columns = [
    {
      key: "adminId",
      label: "Admin",

      render: (admin) =>
        admin?.name ||
        admin?.email ||
        "System",
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

    {
      key: "targetId",
      label: "Target",

      render: (targetId) =>
        targetId?.title ||
        targetId?.username ||
        targetId?._id ||
        "-",
    },

    {
      key: "createdAt",
      label: "Date & Time",

      render: (date) =>
        date
          ? new Date(date).toLocaleString()
          : "-",
    },

    {
      key: "details",
      label: "Details",
    },
  ];

  // ✅ Date Change Handlers
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
      {/* HEADER */}
      <div className="admin-section-header flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title">
            Logs & Security
          </h1>

          <div className="text-xs sm:text-sm text-gray-400">
            {totalLogs} activity logs{" "}
            {data?.isFromCache &&
              "(Cached)"}
          </div>
        </div>

        {/* DATE FILTER */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="admin-form-input px-3 py-1.5 text-sm w-auto"
            value={startDate}
            onChange={
              handleStartDateChange
            }
          />

          <span className="text-gray-400">
            -
          </span>

          <input
            type="date"
            className="admin-form-input px-3 py-1.5 text-sm w-auto"
            value={endDate}
            onChange={
              handleEndDateChange
            }
          />
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="admin-card">
        {isLoading ? (
          <div className="text-gray-400 text-center py-4">
            Loading logs...
          </div>
        ) : isError ? (
          <div className="text-red-400 text-center py-4">
            Failed to load logs.
          </div>
        ) : (
          <>
            {/* TABLE */}
            <Table
              columns={columns}
              data={logs}
            />

            {/* EMPTY STATE */}
            {!logs.length && (
              <div className="text-center text-gray-500 py-6">
                No logs found for selected
                date.
              </div>
            )}

            {/* PAGINATION */}
            {(pagination?.hasNextPage ||
              page > 1) && (
              <div className="flex items-center justify-between mt-4 border-t border-gray-800 pt-4">
                <button
                  className="admin-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={page === 1}
                  onClick={() =>
                    setPage((p) => p - 1)
                  }
                >
                  Previous
                </button>

                <span className="text-sm text-gray-400">
                  Page {page}
                </span>

                <button
                  className="admin-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    page === totalPages ||
                    !pagination?.hasNextPage
                  }
                  onClick={() =>
                    setPage((p) => p + 1)
                  }
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}