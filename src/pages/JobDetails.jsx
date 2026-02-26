import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/pages/jobDetails.css";
import { useGetJobById } from "../hooks/useJobs";

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { data: jobData, isLoading, isError } = useGetJobById(jobId);
  const job = jobData?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div className="container py-5 text-center">Loading job details...</div>;
  }

  if (isError || !job) {
    return <div className="container py-5 text-center">Job not found</div>;
  }

  return (
    <div className="container job-details-page py-5">

      <h1 className="job-details-title">{job.title}</h1>

      <div className="job-meta">
        <span>{job.category}</span>
        <span>{job.experience}</span>
        <span>{job.location}</span>
      </div>

      <div className="job-summary">
        <h3>Job Summary</h3>
        <p>{job.summary}</p>
      </div>

      <div className="job-description">
        <h3>Job Description</h3>
        <p>{job.description}</p>
      </div>

      <div className="job-skills">
        <h3>Required Skills</h3>
        <p>{Array.isArray(job.skill) ? job.skill.join(", ") : job.skill}</p>
      </div>

      <button
        className="job-apply-main-btn"
        onClick={() => navigate("/careers")}
      >
        APPLY NOW
      </button>

    </div>
  );
}