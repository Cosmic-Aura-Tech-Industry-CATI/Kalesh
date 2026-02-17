import { useState } from "react";
import { Plus, Trash2, Edit, Info } from "lucide-react";
import "../style/admin.css";
import "../style/adminjobs.css";

export default function JobsPosting() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Kalesh",
      location: "Remote",
      skill: "React, Tailwind",
      experience: "2+ Years",
      type: "Full-Time",
      status: "Active",
      applicants: [
        {
          id: 1,
          name: "Rahul Sharma",
          email: "rahul@gmail.com",
          role: "Frontend Developer",
          resume: "#",
        },
        {
          id: 2,
          name: "Anita Verma",
          email: "anita@gmail.com",
          role: "Frontend Developer",
          resume: "#",
        },
      ],
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    skill: "",
    experience: "",
    type: "Full-Time",
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);

  const handleAddJob = () => {
    if (!formData.title || !formData.company) return;

    const newJob = {
      id: Date.now(),
      ...formData,
      status: "Active",
      applicants: [],
    };

    setJobs([...jobs, newJob]);

    setFormData({
      title: "",
      company: "",
      location: "",
      skill: "",
      experience: "",
      type: "Full-Time",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleEdit = (job) => {
    setFormData(job);
    setShowForm(true);
  };

  return (
    <div className="jobs-posting-page admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Jobs Posting</h1>

        <button
          className="admin-btn-primary flex items-center gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Add Job
        </button>
      </div>

      {/* ================= ADD / EDIT FORM ================= */}
      {showForm && (
        <div className="admin-card mb-6">
          {["title", "company", "location", "skill", "experience"].map(
            (field) => (
              <div key={field} className="admin-form-group">
                <label className="admin-form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  className="admin-form-input"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              </div>
            ),
          )}

          <div className="admin-form-group">
            <label className="admin-form-label">Job Type</label>
            <select
              className="admin-form-select"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          <button className="admin-btn-primary mt-4" onClick={handleAddJob}>
            Save Job
          </button>
        </div>
      )}

      {/* ================= JOBS TABLE ================= */}
      <div className="admin-card">
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
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.skill}</td>
                <td>{job.experience}</td>
                <td>{job.applicants.length}</td>

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
                    onClick={() => handleDelete(job.id)}
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
            ))}
          </tbody>
        </table>
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
                Total Applications: {selectedJob.applicants.length}
              </p>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role Applied</th>
                    <th>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedJob.applicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td>{applicant.name}</td>
                      <td>{applicant.email}</td>
                      <td>{applicant.role}</td>
                      <td>
                        <a
                          href={applicant.resume}
                          className="admin-btn-secondary"
                          download
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}

                  {selectedJob.applicants.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-gray-400">
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
