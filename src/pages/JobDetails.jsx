import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/pages/jobDetails.css";

const jobOpenings = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    summary:
      "We are looking for a passionate Frontend Developer to build scalable UI components and improve user experience.",
    description:
      "You will work closely with backend developers and designers to create seamless web experiences. Responsibilities include building reusable components, optimizing performance, and ensuring responsiveness across devices.",
    skills: "React, Tailwind, API Integration",
    experience: "1 – 3 Years",
    location: "Remote",
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Engineering",
    summary:
      "Seeking a Backend Developer to build secure and scalable APIs.",
    description:
      "You will design server-side logic, maintain databases, and ensure high performance and responsiveness of applications.",
    skills: "Node.js, MongoDB",
    experience: "2 – 4 Years",
    location: "Noida",
  },
];

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = jobOpenings.find(
    (item) => item.id === parseInt(jobId)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!job) {
    return <div className="container py-5 text-center">Job not found</div>;
  }

  return (
    <div className="container job-details-page py-5">

      <h1 className="job-details-title">{job.title}</h1>

      <div className="job-meta">
        <span>{job.department}</span>
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
        <p>{job.skills}</p>
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