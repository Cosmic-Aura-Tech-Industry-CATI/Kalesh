import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2, Edit, Info } from "lucide-react";
import { useCreateJob, useGetAllJobs, useDeleteJob, useUpdateJob } from "../../hooks/useJobs";
import { useGetApplicationsByJobId } from "../../hooks/useApplication";
import "../style/admin.css";
import "../style/adminJobs.css";

export default function JobsPosting() {
  const { data: jobsData, isLoading } = useGetAllJobs();
  const { mutate: createJob, isPending: isCreating } = useCreateJob();
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
  const { mutate: deleteJob } = useDeleteJob();

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

  const { data: applicationsData, isLoading: isLoadingApps } = useGetApplicationsByJobId(selectedJob?._id || selectedJob?.id);
  const applications = applicationsData?.applications || [];

  const onSubmit = (data) => {
    if (editingJob) {
      updateJob(
        { ...data, id: editingJob.id || editingJob._id },
        {
          onSuccess: () => {
            setShowForm(false);
            reset();
            setEditingJob(null);
          },
        }
      );
    } else {
      createJob(data, {
        onSuccess: () => {
          setShowForm(false);
          reset();
        },
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setValue("title", job.title);
    setValue("company", job.company);
    setValue("location", job.location);
    setValue("skill", job.skill);
    setValue("experience", job.experience);
    setValue("type", job.type);
    setShowForm(true);
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
          <div className="admin-form-group">
            <label className="admin-form-label">Title</label>
            <input
              className="admin-form-input"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-red-500 text-xs">{errors.title.message}</span>
            )}
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Company</label>
            <input
              className="admin-form-input"
              {...register("company", { required: "Company is required" })}
            />
            {errors.company && (
              <span className="text-red-500 text-xs">{errors.company.message}</span>
            )}
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Location</label>
            <input
              className="admin-form-input"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <span className="text-red-500 text-xs">{errors.location.message}</span>
            )}
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Skill</label>
            <input
              className="admin-form-input"
              {...register("skill", { required: "Skill is required" })}
            />
            {errors.skill && (
              <span className="text-red-500 text-xs">{errors.skill.message}</span>
            )}
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Experience</label>
            <input
              className="admin-form-input"
              {...register("experience", { required: "Experience is required" })}
            />
            {errors.experience && (
              <span className="text-red-500 text-xs">{errors.experience.message}</span>
            )}
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Job Type</label>
            <select
              className="admin-form-select"
              {...register("type")}
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          <button type="submit" className="admin-btn-primary mt-4" disabled={isCreating || isUpdating}>
            {isCreating || isUpdating ? "Saving..." : editingJob ? "Update Job" : "Save Job"}
          </button>
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
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Skill</th>
                <th>Experience</th>
                <th>Applicants</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id || job._id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>{job.skill}</td>
                    <td>{job.experience}</td>
                    <td>{job.applicants?.length || 0}</td>

                    <td className="flex gap-2">
                      {/* EDIT */}
                      <button
                        className="admin-btn-secondary"
                        onClick={() => handleEdit(job)}
                      >
                        <Edit size={16} />
                      </button>

                      {/* DELETE */}
                      <button
                        className="admin-btn-danger"
                        onClick={() => handleDelete(job.id || job._id)}
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* INFO */}
                      <button
                        className="admin-btn-secondary"
                        onClick={() => {
                          setSelectedJob(job);
                          setShowApplicantsModal(true);
                        }}
                      >
                        <Info size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-400 py-4">
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
        <div className="admin-modal-overlay">
          <div className="admin-modal-content max-w-3xl">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                Applicants for {selectedJob.title}
              </h2>
              <button
                className="admin-btn-secondary"
                onClick={() => setShowApplicantsModal(false)}
              >
                Close
              </button>
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
                    <th>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingApps ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-400">
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
                          <span className={`px-2 py-1 rounded text-xs ${
                            applicant.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            applicant.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {applicant.status}
                          </span>
                        </td>
                        <td>
                          <a
                            href={applicant.resume}
                            className="admin-btn-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-gray-400 py-4">
                        No applications yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
