import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetAllContests, useDeleteContest } from "../../hooks/useContests";
import Modal from "../components/Modal";
import { AlertTriangle, Trash2 } from "lucide-react";

export default function AdminContestList() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllContests();
  const { mutate: deleteContest } = useDeleteContest();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedContestId, setSelectedContestId] = useState(null);

  if (isLoading) {
    return (
      <div className="admin-page-wrapper">
        <div className="admin-section-header">
          <h1 className="admin-page-title">Manage Contests</h1>
          <div className="text-xs sm:text-sm text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  // Safely extract contests data
  const contests = data?.data?.contests || data?.data || data || [];

  const handleDelete = (id) => {
    setSelectedContestId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteContest(selectedContestId, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        setSelectedContestId(null);
      },
    });
  };

  return (
    <div className="admin-page-wrapper">
      {/* Header */}
      <div className="admin-section-header">
        <h1 className="admin-page-title">Manage Contests</h1>

        <button
          onClick={() => navigate("/admin/contest/create")}
          className="admin-btn-primary"
        >
          + Create Contest
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contests.length > 0 ? (
          contests.map((contest) => (
            <div key={contest._id} className="admin-card hover-lift">
              {/* Image */}
              <img
                src={contest.thumbnail}
                alt={contest.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              {/* Title */}
              <h3 className="text-lg font-semibold mb-1">{contest.title}</h3>

              {/* Description */}
              <p
                className="text-sm text-gray-400 mb-2 line-clamp-2"
                title={contest.description}
              >
                {contest.description}
              </p>

              {/* Meta */}
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span className="capitalize">Type: {contest.type}</span>
              </div>

              {/* Status */}
              <div className="mb-4">
                <span
                  className={`admin-badge ${
                    contest.status === "active" || contest.status === "ongoing"
                      ? "admin-badge-success"
                      : contest.status === "upcoming"
                        ? "admin-badge-warning"
                        : "admin-badge-danger"
                  }`}
                >
                  <span className="capitalize">
                    {contest.status || "Unknown"}
                  </span>
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/contest/edit/${contest._id}`)}
                  className="admin-btn-secondary flex-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(contest._id)}
                  className="admin-btn-danger flex-1"
                >
                  Delete
                </button>

                <button
                  onClick={() => navigate(`/admin/contest/${contest._id}`)}
                  className="admin-btn-secondary flex-1"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No contests found.</p>
        )}
      </div>
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Contest"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete this contest?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="admin-btn-secondary"
            >
              Cancel
            </button>

            <button onClick={confirmDelete} className="admin-btn-danger">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
