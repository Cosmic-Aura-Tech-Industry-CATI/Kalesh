import { useState } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import "../style/admin.css";
import "../style/reportedpolls.css";

export default function ReportedPolls() {
  const [activeTab, setActiveTab] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(null);
  const [showReportsTable, setShowReportsTable] = useState(null);

  const tables = ["polls", "comments", "profiles"];

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % 3); // circular
  };

  /* ================= MOCK DATA ================= */

  const pollsData = [
    {
      id: "P001",
      question: "Worst fashion sense?",
      username: "user123",
      totalReports: 45,
      options: ["A", "B", "C"],
      image: "https://via.placeholder.com/300",
      reports: [
        {
          reporter: "john",
          message: "Offensive",
          createdAt: "2024-01-01",
        },
      ],
    },
  ];

  const commentsData = [
    {
      id: "C001",
      comment: "This is bad",
      username: "user456",
      totalReports: 12,
      reports: [],
    },
  ];

  const profilesData = [
    {
      id: "U001",
      username: "toxic_user",
      anonymousName: "DarkSoul",
      profilePhoto: "https://via.placeholder.com/100",
      coverImage: "https://via.placeholder.com/400x150",
      totalReports: 30,
      reports: [],
    },
  ];

  /* ================= COMMON REPORT TABLE ================= */

  const reportDetailsColumns = [
    { key: "reporter", label: "Reporter Username" },
    { key: "message", label: "Message" },
    { key: "createdAt", label: "Created On" },
    {
      key: "actions",
      label: "Action",
      render: () => (
        <div className="reported-actions-wrapper">
          <Button size="sm" variant="success">
            Approve
          </Button>
          <Button size="sm" variant="danger">
            Remove
          </Button>
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
    {
      /* {
      key: "info",
      label: "Info",
      render: (_, row) => (
        <button className="info-btn">i</button>
      ),
    }, */
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

      {/* TABLE SWITCH */}
      {activeTab === 0 && <Table columns={pollsColumns} data={pollsData} />}

      {activeTab === 1 && (
        <Table columns={commentsColumns} data={commentsData} />
      )}

      {activeTab === 2 && (
        <Table columns={profilesColumns} data={profilesData} />
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
              {showInfoModal.question && (
                <>
                  <p>
                    <b>Question:</b> {showInfoModal.question}
                  </p>

                  <p>
                    <b>Options:</b>
                  </p>
                  <ul>
                    {showInfoModal.options?.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>

                  <img
                    src={showInfoModal.image}
                    alt=""
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                </>
              )}

              {/* ===== PROFILE DETAILS ===== */}

              {showInfoModal.username && showInfoModal.anonymousName && (
                <>
                  <p>
                    <b>Username:</b> {showInfoModal.username}
                  </p>
                  <p>
                    <b>Anonymous Name:</b> {showInfoModal.anonymousName}
                  </p>

                  <p>
                    <b>Cover Image:</b>
                  </p>
                  <img
                    src={showInfoModal.coverImage}
                    alt=""
                    style={{ width: "100%", marginBottom: "10px" }}
                  />

                  <p>
                    <b>Profile Photo:</b>
                  </p>
                  <img
                    src={showInfoModal.profilePhoto}
                    alt=""
                    style={{ width: "100px", borderRadius: "50%" }}
                  />
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
                columns={reportDetailsColumns}
                data={showReportsTable.reports || []}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
