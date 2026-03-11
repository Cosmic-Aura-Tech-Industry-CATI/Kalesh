import { useParams } from "react-router-dom";
import "../styles/pages/ApplicationDetails.css";
import { useState } from "react";
import {
  useGetApplicationByToken,
  useUpdateApplication,
} from "../hooks/useApplication";
import { toastWarning } from "../lib/toast";

export default function ApplicationDetails() {
  const { token } = useParams();
  const [resumeFile, setResumeFile] = useState(null);

  const { data, isLoading, refetch } =
    useGetApplicationByToken(token);

  const { mutate, isPending } = useUpdateApplication();

  const application = data?.application || data;

  const handleResumeUpdate = (e) => {
    e.preventDefault();

    if (!resumeFile) {
      toastWarning("Please select resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    mutate(
      { token, payload: formData },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!application)
    return <p className="text-center mt-10">Application Not Found</p>;

  return (
    <div className="application-wrapper">
      <h2 className="application-title">Application Status</h2>

      <div className="application-info">

        <p><strong>Name:</strong> {application.name}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Phone:</strong> {application.phone}</p>

        <p><strong>State:</strong> {application.state}</p>
        <p><strong>Country:</strong> {application.country}</p>

        <p><strong>Highest Degree:</strong> {application.highestDegree}</p>
        <p><strong>Experience:</strong> {application.experience}</p>
        <p><strong>Notice Period:</strong> {application.noticePeriod}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              application.status === "accepted"
                ? "status-accepted"
                : application.status === "rejected"
                ? "status-rejected"
                : "status-pending"
            }
          >
            {application.status}
          </span>
        </p>

        <p>
          <strong>Current Resume:</strong>{" "}
          <a
            href={application.resume}
            target="_blank"
            rel="noreferrer"
            className="resume-link"
          >
            View Resume
          </a>
        </p>

      </div>

      <hr className="application-divider" />

      <div className="resume-section">
        <h3>Update Resume</h3>

        <form onSubmit={handleResumeUpdate}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="resume-input"
          />

          <button
            type="submit"
            disabled={isPending}
            className="resume-button"
          >
            {isPending ? "Updating..." : "Update Resume"}
          </button>
        </form>
      </div>
    </div>
  );
}