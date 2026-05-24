import { useNavigate } from "react-router-dom";

export default function AdminContestList() {
  const navigate = useNavigate();

  // 🔥 Dummy Data
  const contests = [
    {
      _id: "1",
      title: "Code Combat 2026",
      slug: "code-combat-2026",
      thumbnail:
        "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      type: "weekly",
      maxParticipants: 100,
      isActive: true,
    },
    {
      _id: "2",
      title: "Design Battle",
      slug: "design-battle",
      thumbnail:
        "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      type: "monthly",
      maxParticipants: 50,
      isActive: false,
    },
  ];

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
        {contests.map((contest) => (
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

            {/* Slug */}
            <p className="text-sm text-gray-400 mb-2">
              {contest.slug}
            </p>

            {/* Meta */}
            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>Type: {contest.type}</span>
              <span>{contest.maxParticipants} users</span>
            </div>

            {/* Status */}
            <div className="mb-4">
              <span
                className={`admin-badge ${
                  contest.isActive
                    ? "admin-badge-success"
                    : "admin-badge-danger"
                }`}
              >
                {contest.isActive ? "Active" : "Inactive"}
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

              <button className="admin-btn-danger flex-1">
                Delete
              </button>

              <button className="admin-btn-secondary flex-1">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}