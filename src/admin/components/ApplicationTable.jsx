import React, { useEffect, useState } from "react";
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

  const [selectedApplicant, setSelectedApplicant] = useState(null);

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

  const handleResumeDownload = async (e, url, filename) => {
    e.preventDefault();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(url, "_blank");
    }
  };

  return (
    <>
      {/* ================= MAIN APPLICANTS MODAL ================= */}
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
                  <th>Actions</th>
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
                          {/* VIEW DETAILS */}
                          <button
                            type="button"
                            className="admin-btn-secondary"
                            onClick={() => setSelectedApplicant(applicant)}
                          >
                            View
                          </button>

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

      {/* ================= APPLICANT DETAILS MODAL ================= */}
      {selectedApplicant && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content !max-w-5xl w-full">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Applicants Details</h2>
              <button
                className="admin-btn-secondary"
                onClick={() => setSelectedApplicant(null)}
              >
                Close
              </button>
            </div>

            <div className="admin-modal-body space-y-8">
              {/* ================= APPLICANT INFO ================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {/* Name */}
                <div>
                  <div className="applicant-info-label">Name</div>
                  <div className="applicant-info-value">
                    {selectedApplicant.name || "—"}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="applicant-info-label">Email</div>
                  <div className="applicant-info-value">
                    {selectedApplicant.email || "—"}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <div className="applicant-info-label">Phone</div>
                  <div className="applicant-info-value">
                    {selectedApplicant.phone || "—"}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <div className="applicant-info-label">Status</div>
                  <div className="applicant-info-value capitalize">
                    {selectedApplicant.status || "—"}
                  </div>
                </div>

                {/* Country */}
                <div>
                  <div className="applicant-info-label">Country</div>
                  <div className="applicant-info-value">
                    {selectedApplicant.country || "—"}
                  </div>
                </div>

                {/* State */}
                <div>
                  <div className="applicant-info-label">State</div>
                  <div className="applicant-info-value">
                    {selectedApplicant.state || "—"}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <div className="applicant-info-label">Experience</div>
                  <div className="applicant-info-value">
                    {selectedApplicant.experience || "—"}
                  </div>
                </div>

                {/* Highest Degree */}
                <div>
                  <div className="applicant-info-label">Highest Degree</div>
                                  <div className="applicant-info-value">
                    {selectedApplicant.highestDegree || "—"}
                  </div>
                </div>

                {/* Notice Period */}
                <div>
                  <div className="applicant-info-label">Notice Period</div>
                  <div className="applicant-info-value">
                    {selectedApplicant.noticePeriod || "—"}
                  </div>
                </div>                
              </div>
              
              {/* ================= RESUME SECTION ================= */}
              <div className="border-t border-[#d4af37]/20 pt-6">
                <h3 className="text-sm font-semibold text-[#d4af37] mb-4">
                  Resume
                </h3>

                <div className="flex flex-wrap gap-4">
                  {/* View Resume → Chrome Open */}
                  <a
                    href={selectedApplicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn-secondary"
                  >
                    View Resume
                  </a>

                  {/* Download Resume → File Download */}
                  <a
                    href={selectedApplicant.resume}
                    className="admin-btn-primary"
                    onClick={(e) =>
                      handleResumeDownload(
                        e,
                        selectedApplicant.resume,
                        `${(selectedApplicant.name || "applicant").replace(/\s+/g, "_")}_resume`
                      )
                    }
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ApplicationTable;
