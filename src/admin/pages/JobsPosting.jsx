import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2, Edit, Info } from "lucide-react";
import {
  useCreateJob,
  useDeleteJob,
  useUpdateJob,
  useGetAdminJobs,
} from "../../hooks/useJobs";
import { useGetApplicationsByJobId } from "../../hooks/useApplication";
import "../style/admin.css";
import "../style/adminJobs.css";
import ApplicationTable from "../components/ApplicationTable";
import { useToggleJobStatus } from "../../hooks/useJobs";
import { Power } from "lucide-react";

const JobApplicationCount = ({ jobId }) => {
  const { data, isLoading } = useGetApplicationsByJobId(jobId);
  if (isLoading) return <span className="text-gray-400 text-xs">...</span>;
  const count = data?.results || data?.applications?.length || 0;
  return <span>{count}</span>;
};

export default function JobsPosting() {
  const { data: jobsData, isLoading } = useGetAdminJobs();
  const { mutate: createJob, isPending: isCreating } = useCreateJob();
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
  const { mutate: deleteJob } = useDeleteJob();
  const { mutate: toggleJobStatus } = useToggleJobStatus();

  const jobs = jobsData?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  // SAFELY GET JOB ID
  const jobId = selectedJob?._id || selectedJob?.id;

  // const { data: applicationsData, isLoading: isLoadingApps } =
  //   useGetApplicationsByJobId(jobId);

  // const applications = applicationsData?.applications || [];

  // ================= SUBMIT =================
  const onSubmit = (data) => {
    const payload = {
      ...data,
      skill: typeof data.skill === "string" ? data.skill.split(",").map((s) => s.trim()).filter(Boolean) : data.skill,
      applicationDuration: Number(data.applicationDuration),
    };

    if (editingJob) {
      updateJob(
        { ...payload, id: editingJob._id || editingJob.id },
        {
          onSuccess: () => {
            setShowForm(false);
            reset();
            setEditingJob(null);
          },
        },
      );
    } else {
      createJob(payload, {
        onSuccess: () => {
          setShowForm(false);
          reset();
        },
      });
    }
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
    }
  };

  // ================= EDIT =================
  const handleEdit = (job) => {
    setEditingJob(job);
    setValue("title", job.title);
    setValue("summary", job.summary);
    setValue("description", job.description);
    setValue("category", job.category);
    setValue("location", job.location);
    setValue(
      "skill",
      Array.isArray(job.skill) ? job.skill.join(", ") : job.skill,
    );
    setValue("experience", job.experience);
    setValue("applicationDuration", job.applicationDuration);
    setValue("type", job.type);
    setShowForm(true);
  };

  const handleToggleStatus = (job) => {
    toggleJobStatus({
      id: job._id || job.id,
      isActive: !job.isActive,
    });
  };

  const toggleDescription = (jobKey) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [jobKey]: !prev[jobKey],
    }));
  };

  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return "-";

    const diff = new Date(expiryDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days > 0 ? `${days} days left` : "Expired";
  };

  return (
    <div className="jobs-posting-page admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Jobs Posting</h1>

        <button
          className="admin-btn-primary flex items-center gap-2"
          onClick={() => {
            reset();
            setEditingJob(null);
            setShowForm(!showForm);
          }}
        >
          <Plus size={18} />
          Add Job
        </button>
      </div>

      {/* ================= ADD / EDIT FORM ================= */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="admin-card mb-6">
          {/* Job Title */}
          <div className="admin-form-group">
            <label className="admin-form-label">Job Title</label>
            <input
              className="admin-form-input"
              {...register("title", { required: "Job Title is required" })}
            />
            {errors.title && (
              <span className="text-red-500 text-xs">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Job Summary */}
          <div className="admin-form-group">
            <label className="admin-form-label">Job Summary</label>
            <textarea
              rows="2"
              className="admin-form-textarea"
              {...register("summary", {
                required: "Job Summary is required",
              })}
            />
            {errors.summary && (
              <span className="text-red-500 text-xs">
                {errors.summary.message}
              </span>
            )}
          </div>

          {/* Job Description */}
          <div className="admin-form-group">
            <label className="admin-form-label">Job Description</label>
            <textarea
              rows="4"
              className="admin-form-textarea"
              {...register("description", {
                required: "Job Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="admin-form-group">
            <label className="admin-form-label">Category</label>

            <select
              className="admin-form-select"
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option value="">Select Category</option>
              <option value="IT">IT</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Customer Support">Customer Support</option>
            </select>

            {errors.category && (
              <span className="text-red-500 text-xs">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="admin-form-group">
            <label className="admin-form-label">Location</label>
            <input
              className="admin-form-input"
              {...register("location", {
                required: "Location is required",
              })}
            />
          </div>

          {/* Skill */}
          <div className="admin-form-group">
            <label className="admin-form-label">Skill</label>
            <input
              className="admin-form-input"
              {...register("skill", { required: "Skill is required" })}
            />
          </div>

          {/* Experience */}
          <div className="admin-form-group">
            <label className="admin-form-label">Experience</label>
            <input
              className="admin-form-input"
              {...register("experience", {
                required: "Experience is required",
              })}
            />
          </div>

          {/* Job Duration */}
          <div className="admin-form-group">
            <label className="admin-form-label">Job Duration (Days)</label>

            <select
              className="admin-form-select"
              {...register("applicationDuration", {
                required: "Job Duration is required",
              })}
            >
              <option value="">Select Duration</option>
              <option value="7">7 Days</option>
              <option value="15">15 Days</option>
              <option value="30">30 Days</option>
              <option value="45">45 Days</option>
              <option value="60">60 Days</option>
            </select>

            {errors.applicationDuration && (
              <span className="text-red-500 text-xs">
                {errors.applicationDuration.message}
              </span>
            )}
          </div>

          {/* Job Type */}
          <div className="admin-form-group">
            <label className="admin-form-label">Job Type</label>
            <select className="admin-form-select" {...register("type")}>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating
                ? "Saving..."
                : editingJob
                  ? "Update Job"
                  : "Save Job"}
            </button>

            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditingJob(null);
                reset();
              }}
            >
              Close
            </button>
          </div>
        </form>
      )}

      {/* ================= JOBS TABLE ================= */}
      <div className="admin-card">
        {isLoading ? (
          <div className="text-white p-4">Loading jobs...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Job Description</th>
                <th>Location</th>
                <th>Skill</th>
                <th>Experience</th>
                <th>Expiry</th>
                <th className="w-[120px] text-center">Status</th>
                <th>Applicants</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job._id || job.id}>
                    <td>{job.title}</td>
                    <td className="job-description-cell">
                      <p
                        className={`job-description-text ${
                          expandedDescriptions[job._id || job.id]
                            ? "expanded"
                            : ""
                        }`}
                      >
                        {job.description}
                      </p>

                      {job.description && job.description.length > 140 && (
                        <button
                          type="button"
                          className="job-read-more-btn"
                          onClick={() => toggleDescription(job._id || job.id)}
                        >
                          {expandedDescriptions[job._id || job.id]
                            ? "Read less"
                            : "Read more"}
                        </button>
                      )}
                    </td>
                    <td>{job.location}</td>
                    <td>
                      {Array.isArray(job.skill)
                        ? job.skill.join(", ")
                        : job.skill}
                    </td>

                    <td>{job.experience}</td>

                    <td>{getDaysLeft(job.expiryDate)}</td>

                    {/* ✅ STATUS COLUMN */}
                    <td className="text-center">
                      {job.isActive ? (
                        <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-400 whitespace-nowrap">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-red-500/20 text-red-400 border border-red-400 whitespace-nowrap">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td>
                      <JobApplicationCount jobId={job._id || job.id} />
                    </td>

                    <td className="flex gap-2">
                      {/* EDIT */}
                      <button
                        type="button"
                        className="admin-btn-secondary"
                        onClick={() => handleEdit(job)}
                      >
                        <Edit size={16} />
                      </button>

                      {/* DELETE */}
                      <button
                        type="button"
                        className="admin-btn-danger"
                        onClick={() => handleDelete(job._id || job.id)}
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* INFO */}
                      <button
                        type="button"
                        className="admin-btn-secondary"
                        onClick={() => {
                          setSelectedJob(job);
                          setShowApplicantsModal(true);
                        }}
                      >
                        <Info size={16} />
                      </button>

                      {/* TOGGLE ACTIVE */}
                      <button
                        type="button"
                        className={`px-3 py-2 rounded-lg border transition-all duration-300 transform hover:scale-110 ${
                          job.isActive
                            ? "bg-green-500/20 text-green-400 border-green-400 hover:bg-green-500 hover:text-white hover:shadow-[0_0_20px_rgba(34,197,94,1)]"
                            : "bg-gray-700 text-gray-300 border-gray-500 hover:bg-gray-600 hover:text-white"
                        }`}
                        onClick={() => handleToggleStatus(job)}
                      >
                        <Power
                          className="transition-transform duration-300 group-hover:rotate-180"
                          size={16}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-gray-400 py-4">
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= APPLICANTS MODAL ================= */}
      {showApplicantsModal && selectedJob && (
        <ApplicationTable
          title={selectedJob.title}
          onShowModal={setShowApplicantsModal}
          jobId={jobId}
        />
      )}
    </div>
  );
}
