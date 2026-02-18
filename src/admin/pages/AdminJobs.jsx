import React from "react";
import "../style/adminJobs.css";

export default function AdminJobs() {
  return (
    <div className="admin-jobs-page">

      {/* ===== Page Header Section ===== */}
      <div className="admin-jobs-header">
        <div className="admin-jobs-header-left">
          <h1 className="admin-jobs-title">
            Jobs Management
          </h1>
          <p className="admin-jobs-description">
            Manage all job listings, approvals, and applications.
          </p>
        </div>

        <div className="admin-jobs-header-right">
          <button className="admin-jobs-add-button">
            + Add New Job
          </button>
        </div>
      </div>

      {/* ===== Jobs Table Section ===== */}
      <div className="admin-jobs-table-wrapper">
        <table className="admin-jobs-table">

          <thead className="admin-jobs-table-head">
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Posted Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="admin-jobs-table-body">
            <tr className="admin-jobs-table-row">
              <td>Frontend Developer</td>
              <td>CodeVeda Pvt Ltd</td>
              <td>
                <span className="job-status-active">
                  Active
                </span>
              </td>
              <td>16 Feb 2026</td>
              <td>
                <button className="admin-jobs-edit-btn">
                  Edit
                </button>
              </td>
            </tr>

            <tr className="admin-jobs-table-row">
              <td>Backend Developer</td>
              <td>Kalesh Tech</td>
              <td>
                <span className="job-status-pending">
                  Pending
                </span>
              </td>
              <td>14 Feb 2026</td>
              <td>
                <button className="admin-jobs-delete-btn">
                  Delete
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
}
