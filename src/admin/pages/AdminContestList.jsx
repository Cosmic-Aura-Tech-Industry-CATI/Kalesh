import { useNavigate } from "react-router-dom";
import { useGetAllContests, useDeleteContest } from "../../hooks/useContests";

export default function AdminContestList() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllContests();
  const { mutate: deleteContest } = useDeleteContest();

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
    if (window.confirm("Are you sure you want to delete this contest?")) {
      deleteContest(id);
    }
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
            <div
              key={contest._id}
              className="admin-card hover-lift"
            >
              {/* Image */}
              <img
                src={contest.thumbnail}
                alt={contest.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              {/* Title */}
              <h3 className="text-lg font-semibold mb-1">
                {contest.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-2 line-clamp-2" title={contest.description}>
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
                  <span className="capitalize">{contest.status || "Unknown"}</span>
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(`/admin/contest/edit/${contest._id}`)
                  }
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

                <button className="admin-btn-secondary flex-1">
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No contests found.</p>
        )}
      </div>
    </div>
  );
}