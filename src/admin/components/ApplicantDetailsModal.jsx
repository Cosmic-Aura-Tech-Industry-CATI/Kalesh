import "../style/admin.css";

export default function ApplicantDetailsModal({ applicant, onClose }) {
  if (!applicant) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content !max-w-4xl w-full">
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Applicants Details</h2>
          <button
            className="admin-btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="admin-modal-body space-y-4">

          <div>
            <strong>Name:</strong> {applicant.name}
          </div>

          <div>
            <strong>Email:</strong> {applicant.email}
          </div>

          <div>
            <strong>Phone:</strong> {applicant.phone}
          </div>

          <div>
            <strong>Applied Role:</strong> {applicant.role}
          </div>

          <div>
            <strong>Experience:</strong> {applicant.experience}
          </div>

          <div>
            <strong>Skills:</strong> {applicant.skills}
          </div>

          <div>
            <strong>Status:</strong> {applicant.status}
          </div>

          {/* Resume Buttons */}
          <div className="flex gap-3 pt-4">
            {/* View Resume */}
            <a
              href={applicant.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-secondary"
            >
              View Resume
            </a>

            {/* Download Resume */}
            <a
              href={applicant.resume}
              download
              className="admin-btn-primary"
            >
              Download Resume
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}