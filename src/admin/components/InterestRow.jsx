export default function InterestRow({ interest, onEdit, onDelete }) {
  const { name, slug, iconUrl, isActive, createdAt } = interest;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "--";

  return (
    <tr>
      {/* Icon */}
      <td>
        <div className="interest-icon">
          <img src={iconUrl} alt={name} loading="lazy" />
        </div>
      </td>

      {/* Name */}
      <td>
        <span className="interest-name">{name}</span>
      </td>

      {/* Slug */}
      <td>
        <span className="interest-slug">{slug}</span>
      </td>

      {/* Status */}
      <td>
        <span className={`interest-status ${isActive ? "active" : "inactive"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>

      {/* Created */}
      <td>{formattedDate}</td>

      {/* Actions */}
      <td>
        <div className="interest-actions">
          <button
            className="interest-edit-btn"
            onClick={() => onEdit(interest)}
          >
            Edit
          </button>

          <button
            className="interest-delete-btn"
            onClick={() => onDelete(interest)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
