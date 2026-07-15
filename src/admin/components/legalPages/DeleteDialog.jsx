import { AlertTriangle } from "lucide-react";

export default function DeleteDialog({
  open,
  page,
  loading,
  onClose,
  onConfirm,
}) {
  if (!open || !page) return null;

  return (
    <div className="legal-modal-overlay">
      <div className="legal-delete-modal">
        <div className="legal-delete-icon">
          <AlertTriangle size={48} />
        </div>

        <h2>Delete Page?</h2>

        <p>
          Are you sure you want to delete
          <strong> "{page.title}" </strong> ?
        </p>

        {page.isSystemPage && (
          <div className="legal-warning-box">
            This is a system page and cannot be deleted.
          </div>
        )}

        <div className="legal-delete-actions">
          <button className="legal-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            disabled={loading || page.isSystemPage}
            className="legal-confirm-btn"
            onClick={onConfirm}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
