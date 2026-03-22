import { useState } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import "../style/admin.css";
import "../style/reportedpolls.css";
import { useGetAllReports, useTakeAction } from "../../hooks/useReports";

export default function ReportedPolls() {
  const [activeTab, setActiveTab] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(null);
  const [showReportsTable, setShowReportsTable] = useState(null);

  const { mutate: takeAction } = useTakeAction();

  const tables = ["polls", "comments", "profiles"];
  const backendTypes = ["poll", "comment", "user"]; // Maps to activeTab for backend filtering

  const activeType = backendTypes[activeTab];
  const { data: reportsData, isLoading } = useGetAllReports(activeType);

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % 3); // circular
  };

  const handleAction = (id, action) => {
    takeAction({ id, payload: { action } });
  };

  const formatData = () => {
    if (!reportsData?.data) return [];
    return reportsData.data.map((group) => {
      const first = group.reports?.[0] || {};
      return {
        _id: group._id, // grouped by targetUserId
        totalReports: group.reportCount,
        reports: group.reports,

        // Display fields
        username: first.targetUserId?.username || "Unknown User",
        question: first.targetPollId?.text || "Unknown Poll",
        comment: first.targetCommentId?.text || "Unknown Comment",

        // Original objects for info modal
        targetUser: first.targetUserId,
        targetPoll: first.targetPollId,
        targetComment: first.targetCommentId,
      };
    });
  };

  const tableData = formatData();

  /* ================= COMMON REPORT TABLE ================= */

  const getReportDetailsColumns = (tabIndex) => [
    {
      key: "reporterId",
      label: "Reporter Username",
      render: (reporterId) => reporterId?.username || "Unknown",
    },
    { key: "reason", label: "Reason" },
    {
      key: "createdAt",
      label: "Created On",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
    },
    {
      key: "actions",
      label: "Action",
      render: (_, row) => (
        <div
          className="reported-actions-wrapper"
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          <Button
            size="sm"
            variant="success"
            onClick={() => handleAction(row._id || row.id, "approve")}
          >
            Approve (Dismiss)
          </Button>

          {tabIndex === 0 || tabIndex === 1 ? (
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleAction(row._id || row.id, "remove")}
            >
              Remove Content
            </Button>
          ) : null}

          {tabIndex === 2 ? (
            <>
              <Button
                size="sm"
                variant="warning"
                onClick={() => handleAction(row._id || row.id, "warn")}
              >
                Warn User
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleAction(row._id || row.id, "ban")}
              >
                Ban User
              </Button>
            </>
          ) : null}
        </div>
      ),
    },
  ];

  /* ================= POLLS TABLE ================= */

  const pollsColumns = [
    { key: "question", label: "Poll Question" },
    { key: "username", label: "Creator" },
    {
      key: "totalReports",
      label: "Reports",
      render: (val, row) => (
        <Button
          size="sm"
          variant="warning"
          onClick={() => setShowReportsTable(row)}
        >
          View ({val})
        </Button>
      ),
    },
    {
      key: "info",
      label: "Info",
      render: (_, row) => (
        <button className="info-btn" onClick={() => setShowInfoModal(row)}>
          i
        </button>
      ),
    },
  ];

  /* ================= COMMENTS TABLE ================= */

  const commentsColumns = [
    { key: "comment", label: "Comment" },
    { key: "username", label: "User" },
    {
      key: "totalReports",
      label: "Reports",
      render: (val, row) => (
        <Button
          size="sm"
          variant="warning"
          onClick={() => setShowReportsTable(row)}
        >
          View ({val})
        </Button>
      ),
    },
  ];

  /* ================= PROFILES TABLE ================= */

  const profilesColumns = [
    { key: "username", label: "Username" },

    {
      key: "totalReports",
      label: "Reports",
      render: (val, row) => (
        <Button
          size="sm"
          variant="warning"
          onClick={() => setShowReportsTable(row)}
        >
          View ({val})
        </Button>
      ),
    },

    {
      key: "info",
      label: "Info",
      render: (_, row) => (
        <button className="info-btn" onClick={() => setShowInfoModal(row)}>
          i
        </button>
      ),
    },
  ];

  /* ================= RENDER ================= */

  return (
    <div className="admin-section">
      {/* HEADER */}
      <div className="reported-header">
        <h1 className="admin-page-title">{tables[activeTab].toUpperCase()}</h1>

        <button className="next-btn" onClick={handleNext}>
          →
        </button>
      </div>

      {isLoading && <p style={{ padding: "20px" }}>Loading reports...</p>}

      {!isLoading && (
        <>
          {/* TABLE SWITCH */}
          {activeTab === 0 && <Table columns={pollsColumns} data={tableData} />}

          {activeTab === 1 && (
            <Table columns={commentsColumns} data={tableData} />
          )}

          {activeTab === 2 && (
            <Table columns={profilesColumns} data={tableData} />
          )}
        </>
      )}

      {/* ================= INFO MODAL ================= */}

      {showInfoModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>Details</h3>
              <button onClick={() => setShowInfoModal(null)}>X</button>
            </div>

            <div className="admin-modal-body">
              {/* ===== POLL DETAILS ===== */}
              {activeTab === 0 && showInfoModal.targetPoll && (
                <>
                  <p>
                    <b>Question:</b> {showInfoModal.targetPoll.text}
                  </p>

                  <p>
                    <b>Options:</b>
                  </p>
                  <ul>
                    {showInfoModal.targetPoll.options?.map((opt) => (
                      <li key={opt._id}>
                        {opt.text} (Votes: {opt.votes})
                      </li>
                    ))}
                  </ul>

                  {showInfoModal.targetPoll.photo && (
                    <img
                      src={showInfoModal.targetPoll.photo}
                      alt="Poll Media"
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                  )}
                </>
              )}

              {/* ===== PROFILE DETAILS ===== */}

              {activeTab === 2 && showInfoModal.targetUser && (
                <>
                  <p>
                    <b>Username:</b> {showInfoModal.targetUser.username}
                  </p>
                  <p>
                    <b>Anonymous Name:</b>{" "}
                    {showInfoModal.targetUser.annonimusName}
                  </p>

                  <p>
                    <b>Cover Image:</b>
                  </p>
                  {showInfoModal.targetUser.coverPicture && (
                    <img
                      src={showInfoModal.targetUser.coverPicture}
                      alt="Cover"
                      style={{ width: "100%", marginBottom: "10px" }}
                    />
                  )}

                  <p>
                    <b>Profile Photo:</b>
                  </p>
                  {showInfoModal.targetUser.profilePicture && (
                    <img
                      src={showInfoModal.targetUser.profilePicture}
                      alt="Profile"
                      style={{ width: "100px", borderRadius: "50%" }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= REPORT TABLE MODAL ================= */}

      {showReportsTable && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: "800px" }}>
            <div className="admin-modal-header">
              <h3>Reports</h3>
              <button onClick={() => setShowReportsTable(null)}>X</button>
            </div>

            <div className="admin-modal-body">
              <Table
                columns={getReportDetailsColumns(activeTab)}
                data={showReportsTable.reports || []}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
