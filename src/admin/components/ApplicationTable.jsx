import React, { useEffect } from "react";
import { RefreshCw, Download } from "lucide-react";
import {
  useAcceptApplication,
  useDownloadApplications,
  useGetApplicationsByJobId,
  useRejectApplication,
} from "../../hooks/useApplication";

function ApplicationTable({ title, onShowModal, jobId }) {
  const {
    data: applicationsData,
    isLoading: isLoadingApps,
    refetch,
  } = useGetApplicationsByJobId(jobId);
  const applications = applicationsData?.applications || [];

  useEffect(() => {
    refetch();
  }, [jobId]);

  const { mutate: acceptApplication } = useAcceptApplication();
  const { mutate: rejectApplication } = useRejectApplication();

  const { mutate: downloadApplications, isPending: isDownloading } =
    useDownloadApplications();
  
  const handleDownload = () => {
    downloadApplications(jobId);
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content !max-w-6xl w-full">
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Applicants for {title}</h2>
          <div className="flex gap-2">
            <button
              type="button"
              className="admin-btn-primary flex items-center gap-2"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download size={16} />
              {isDownloading ? "Downloading..." : "Download Applications"}
            </button>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => refetch()}
              title="Refresh Applications"
            >
              <RefreshCw size={16} />
            </button>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => onShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>

        <div className="admin-modal-body">
          <p className="mb-4 text-sm text-gray-400">
            Total Applications: {applications.length}
          </p>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingApps ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length > 0 ? (
                applications.map((applicant) => (
                  <tr key={applicant._id}>
                    <td>{applicant.name}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.phone}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          applicant.status === "accepted"
                            ? "bg-green-500/20 text-green-400"
                            : applicant.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {applicant.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <a
                          href={applicant.resume}
                          className="admin-btn-secondary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>

                        {/* ACCEPT */}
                        <button
                          type="button"
                          className={`admin-btn-primary ${
                            applicant.status !== "pending"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => acceptApplication(applicant._id)}
                          disabled={applicant.status !== "pending"}
                        >
                          Accept
                        </button>

                        {/* REJECT */}
                        <button
                          type="button"
                          className={`admin-btn-danger ${
                            applicant.status !== "pending"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => rejectApplication(applicant._id)}
                          disabled={applicant.status !== "pending"}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-4">
                    No applications yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ApplicationTable;
