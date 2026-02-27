import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import "../styles/pages/jobDetails.css";
import "../styles/pages/jobApplicationModal.css";
import { useGetJobById } from "../hooks/useJobs";
import { useCreateApplication } from "../hooks/usePublicService";

export default function JobDetails() {
  const { jobId } = useParams();
  const { data: jobData, isLoading, isError } = useGetJobById(jobId);
  const { mutate: createApplication, isPending } = useCreateApplication();

  const job = jobData?.data;

  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("resume", data.resume[0]);
    formData.append("jobId", jobId);
    formData.append("status", "pending");
    formData.append("publicToken", uuidv4());

    createApplication(formData, {
      onSuccess: () => {
        alert("Application submitted successfully!");
        reset();
        setShowApplicationForm(false);
      },
      onError: (err) => {
        alert(err.response?.data?.message || "Submission failed");
      },
    });
  };

  if (isLoading)
    return <div className="container py-5 text-center">Loading...</div>;

  if (isError || !job)
    return <div className="container py-5 text-center">Job not found</div>;

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
        <p>
          {Array.isArray(job.skill)
            ? job.skill.join(", ")
            : job.skill}
        </p>
      </div>

      <button
        className="job-apply-main-btn"
        onClick={() => setShowApplicationForm(true)}
      >
        APPLY NOW
      </button>

      {/* APPLICATION MODAL */}
      {showApplicationForm && (
        <div className="application-modal-overlay">
          <div className="application-modal">
            <h3>Apply for {job.title}</h3>

            <form onSubmit={handleSubmit(onSubmit)}>

              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}

              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}

              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                {...register("resume", {
                  required: "Resume is required",
                })}
              />
              {errors.resume && <p className="error">{errors.resume.message}</p>}

              <button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Application"}
              </button>

              <button
                type="button"
                onClick={() => setShowApplicationForm(false)}
              >
                Cancel
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}