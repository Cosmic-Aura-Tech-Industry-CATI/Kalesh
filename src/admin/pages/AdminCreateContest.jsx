import { useState } from "react";
import { useCreateContest } from "../../hooks/useContests";

export default function AdminCreateContest() {
  const { mutate: createContest, isPending } = useCreateContest();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "weekly",
    registrationDuration: "",
    registrationStartDate: "",
    maxParticipants: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);

  // file change
  const handleFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // append fields
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("type", form.type);
    formData.append(
      "registrationDuration",
      Number(form.registrationDuration || 0)
    );
    formData.append("registrationStartDate", form.registrationStartDate);
    formData.append("maxParticipants", Number(form.maxParticipants || 0));

    // append image
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    createContest(formData, {
      onSuccess: () => {
        // reset form
        setForm({
          title: "",
          description: "",
          type: "weekly",
          registrationDuration: "",
          registrationStartDate: "",
          maxParticipants: "",
        });
        setThumbnailFile(null);
      },
    });
  };

  return (
    <div className="admin-page-wrapper">
      <h1 className="admin-page-title">Create Contest</h1>

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

        {/* Thumbnail Upload */}
        <div className="admin-form-group">
          <label className="admin-form-label">Thumbnail Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="admin-form-input"
          />

          {/* Preview */}
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
          <label className="admin-form-label">
            Registration Start Date
          </label>
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
          {isPending ? "Creating..." : "Create Contest"}
        </button>
      </form>
    </div>
  );
}