import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetApplicationByToken,
  useUpdateApplication,
} from "../hooks/useApplication";

export default function ApplicationDetails() {
  const { token } = useParams();
  const [resumeFile, setResumeFile] = useState(null);

  const { data, isLoading, refetch } =
    useGetApplicationByToken(token);

  const { mutate, isPending } = useUpdateApplication();

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
          alert("Resume Updated Successfully ✅");
          refetch();
        },
      }
    );
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return <p className="text-center mt-10">Application Not Found</p>;

  const application = data;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Application Details</h2>

      <p><strong>Name:</strong> {application.name}</p>
      <p><strong>Email:</strong> {application.email}</p>
      <p><strong>Phone:</strong> {application.phone}</p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              application.status === "accepted"
                ? "lightgreen"
                : "orange",
          }}
        >
          {application.status}
        </span>
      </p>

      <p>
        <strong>Current Resume:</strong>{" "}
        <a href={application.resume} target="_blank" rel="noreferrer">
          View Resume
        </a>
      </p>

      <hr />

      <h3>Update Resume</h3>

      <form onSubmit={handleResumeUpdate}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />

        <br /><br />

        <button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Resume"}
        </button>
      </form>
    </div>
  );
}