import { useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import "../style/admin.css";

export default function JobsPosting() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Kalesh",
      location: "Remote",
      type: "Full-Time",
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-Time",
    skill: "",
    experience: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddJob = () => {
    if (!formData.title || !formData.company) return;

    const newJob = {
      id: Date.now(),
      ...formData,
      status: "Active",
    };

    setJobs([...jobs, newJob]);
    setFormData({
      title: "",
      company: "",
      location: "",
      type: "Full-Time",
      skill: "",
      experience: "",
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const toggleStatus = (id) => {
    setJobs(
      jobs.map((job) =>
        job.id === id
          ? { ...job, status: job.status === "Active" ? "Closed" : "Active" }
          : job,
      ),
    );
  };

  return (
    <div className="admin-section">
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

      {/* Add Job Form */}
      {showForm && (
        <div className="admin-card mb-6">
          <div className="admin-form-group">
            <label className="admin-form-label">Job Title</label>
            <input
              className="admin-form-input"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Company</label>
            <input
              className="admin-form-input"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Location</label>
            <input
              className="admin-form-input"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Skill</label>
            <input
              className="admin-form-input"
              placeholder="e.g. React, Node, UI/UX"
              value={formData.skill}
              onChange={(e) =>
                setFormData({ ...formData, skill: e.target.value })
              }
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Experience</label>
            <input
              className="admin-form-input"
              placeholder="e.g. 2+ Years"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
          </div>

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
            Post Job
          </button>
        </div>
      )}

      {/* Jobs Table */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Skill</th>
              <th>Experience</th>
              <th>Type</th>
              <th>Status</th>
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
                <td>{job.type}</td>
                <td>
                  <span
                    className={
                      job.status === "Active"
                        ? "admin-badge-success"
                        : "admin-badge-danger"
                    }
                  >
                    {job.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="admin-btn-secondary"
                    onClick={() => toggleStatus(job.id)}
                  >
                    Toggle
                  </button>
                  <button
                    className="admin-btn-danger"
                    onClick={() => handleDelete(job.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
