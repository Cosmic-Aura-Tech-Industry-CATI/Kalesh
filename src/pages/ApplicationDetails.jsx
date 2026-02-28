import { useParams } from "react-router-dom";
import "../styles/pages/ApplicationDetails.css";
import { useState } from "react";
import {
  useGetApplicationByToken,
  useUpdateApplication,
} from "../hooks/useApplication";

export default function ApplicationDetails() {
  const { token } = useParams();
  const [resumeFile, setResumeFile] = useState(null);

  const { data, isLoading, refetch } = useGetApplicationByToken(token);

  const { mutate, isPending } = useUpdateApplication();
  console.log(data);
  const handleResumeUpdate = (e) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please select resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    mutate(
      { token, payload: formData },
      {
        onSuccess: () => {
          alert("Resume Updated Successfully");
          refetch();
        },
      }
    );
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return <p className="text-center mt-10">Application Not Found</p>;

  return (
    <div className="application-wrapper">
      <h2 className="application-title">Application Details</h2>

      <div className="application-info">
        <p>
          <strong>Name:</strong> {data.application.name}
        </p>
        <p>
          <strong>Email:</strong> {data.application.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.application.phone}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              data.application.status === "accepted"
                ? "status-accepted"
                : data.application.status === "rejected"
                ? "status-rejected"
                : "status-pending"
            }
          >
            {data.application.status}
          </span>
        </p>

        <p>
          <strong>Current Resume:</strong>{" "}
          <a
            href={data.application.resume}
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

          <button type="submit" disabled={isPending} className="resume-button">
            {isPending ? "Updating..." : "Update Resume"}
          </button>
        </form>
      </div>
    </div>
  );
}
