export default function DeleteInterestModal({
  open,
  interest,
  loading = false,
  onCancel,
  onConfirm,
}) {
  if (!open || !interest) return null;

  return (
    <div className="interest-modal-overlay">
      <div className="delete-interest-modal">
        <div className="delete-modal-header">
          <h2>Delete Interest</h2>
        </div>

        <div className="delete-modal-body">
          <p>Are you sure you want to delete</p>

          <h3>{interest.name} ?</h3>

          <p className="delete-warning">This action cannot be undone.</p>
        </div>

        <div className="delete-modal-footer">
          <button
            className="interest-cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="interest-delete-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
