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
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("highestDegree", data.highestDegree);
    formData.append("experience", data.experience);
    formData.append("noticePeriod", data.noticePeriod);
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

              <div className="form-group">
                <label>Full Name</label>
                <input {...register("name", { required: "Name is required" })} />
                {errors.name && <p className="error">{errors.name.message}</p>}
              </div>

              <div className="form-group">
                <label>State</label>
                <input {...register("state", { required: "State is required" })} />
                {errors.state && <p className="error">{errors.state.message}</p>}
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  defaultValue="India"
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && <p className="error">{errors.country.message}</p>}
              </div>

              <div className="form-group">
                <label>Highest Degree</label>
                <input
                  {...register("highestDegree", { required: "Degree is required" })}
                />
                {errors.highestDegree && (
                  <p className="error">{errors.highestDegree.message}</p>
                )}
              </div>

              <div className="form-group">
                <label>Experience</label>
                <select {...register("experience", { required: true })}>
                  <option value="">Select</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-2 Years">1-2 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>

              <div className="form-group">
                <label>Notice Period</label>
                <select {...register("noticePeriod", { required: true })}>
                  <option value="">Select</option>
                  <option value="Immediate">Immediate</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="60 Days">60 Days</option>
                </select>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && <p className="error">{errors.phone.message}</p>}
              </div>

              <div className="form-group full-width">
                <label>Upload Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register("resume", { required: "Resume is required" })}
                />
                {errors.resume && <p className="error">{errors.resume.message}</p>}
              </div>

              <button type="submit" className="submit-btn full-width">
                {isPending ? "Submitting..." : "Submit Application"}
              </button>

              <button
                type="button"
                className="cancel-btn full-width"
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