import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useGetContestById, useUpdateContest } from "../../hooks/useContests";

export default function AdminEditContest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetContestById(id);
  const { mutate: updateContest, isPending } = useUpdateContest();

  const contest = data?.data;

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "weekly",
    registrationDuration: "",
    registrationStartDate: "",
    maxParticipants: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);

  useEffect(() => {
    if (contest) {
      setForm({
        title: contest.title || "",
        description: contest.description || "",
        type: contest.type || "weekly",
        registrationDuration: contest.registrationDuration || "",
        registrationStartDate:
          contest.registrationStartDate?.split("T")[0] || "",
        maxParticipants: contest.maxParticipants || "",
      });
    }
  }, [contest]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    updateContest(
      {
        id,
        payload: formData,
      },
      {
        onSuccess: () => {
          navigate("/admin/contests");
        },
      },
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="admin-page-wrapper">
      <div className="flex items-center justify-between mb-6">
        <h1 className="admin-page-title">Edit Contest</h1>

        <button
          type="button"
          onClick={() => navigate("/admin/contests")}
          className="admin-btn-secondary flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Contests
        </button>
      </div>

      <form onSubmit={handleSubmit} className="admin-card-lg">
        {/* Title */}
        <div className="admin-form-group">
          <label className="admin-form-label">Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="admin-form-input"
            required
          />
        </div>

        {/* Description */}
        <div className="admin-form-group">
          <label className="admin-form-label">Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="admin-form-textarea"
            rows={4}
          />
        </div>

        {/* Current Thumbnail */}
        {contest?.thumbnail && (
          <div className="admin-form-group">
            <label className="admin-form-label">Current Thumbnail</label>

            <img
              src={contest.thumbnail}
              alt={contest.title}
              style={{
                width: "180px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          </div>
        )}

        {/* Upload New Thumbnail */}
        <div className="admin-form-group">
          <label className="admin-form-label">Change Thumbnail</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            className="admin-form-input"
          />

          {thumbnailFile && (
            <img
              src={URL.createObjectURL(thumbnailFile)}
              alt="preview"
              style={{
                width: "120px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        {/* Type */}
        <div className="admin-form-group">
          <label className="admin-form-label">Type</label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="admin-form-select"
          >
            <option value="weekly">Weekly</option>

            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Registration Duration */}
        <div className="admin-form-group">
          <label className="admin-form-label">
            Registration Duration (days)
          </label>

          <input
            type="number"
            name="registrationDuration"
            value={form.registrationDuration}
            onChange={handleChange}
            className="admin-form-input"
          />
        </div>

        {/* Registration Start Date */}
        <div className="admin-form-group">
          <label className="admin-form-label">Registration Start Date</label>

          <input
            type="date"
            name="registrationStartDate"
            value={form.registrationStartDate}
            onChange={handleChange}
            className="admin-form-input"
          />
        </div>

        {/* Max Participants */}
        <div className="admin-form-group">
          <label className="admin-form-label">Max Participants</label>

          <input
            type="number"
            name="maxParticipants"
            value={form.maxParticipants}
            onChange={handleChange}
            className="admin-form-input"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="admin-btn-primary"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Contest"}
        </button>
      </form>
    </div>
  );
}
