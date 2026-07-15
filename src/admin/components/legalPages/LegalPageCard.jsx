import { Eye, Pencil, Trash2, FileText, ShieldCheck } from "lucide-react";

export default function LegalPageCard({ page, onPreview, onEdit, onDelete }) {
  console.log(page);
  return (
    <div className="legal-card">
      {/* ================= HEADER ================= */}

      <div className="legal-card-header">
        <div className="legal-card-icon">
          <FileText size={28} strokeWidth={2.2} />
        </div>

        <div className="legal-card-info">
          <h3>{page.title}</h3>

          <div className="legal-card-slug">{page.slug}</div>
        </div>
      </div>

      {/* ================= BODY ================= */}

      <div className="legal-card-body">
        {/* Category */}

        <div className="legal-info-row">
          <div className="legal-info-left">
            <span className="legal-label">Category</span>

            <span className="legal-value">
              {page.category
                ?.replaceAll("_", " ")
                ?.replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </div>
        </div>

        {/* Updated */}

        <div className="legal-info-row">
          <div className="legal-info-left">
            <span className="legal-label">Updated</span>

            <span className="legal-value">
              {page.lastUpdated
                ? new Date(page.lastUpdated).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
        </div>

        {/* Status */}

        <div className="legal-info-row">
          <div className="legal-info-left">
            <span className="legal-label">Status</span>

            <div className="legal-status-badges">
              {page.isSystemPage ? (
                <span className="legal-status-badge system">
                  <ShieldCheck size={13} />
                  <span>System Page</span>
                </span>
              ) : (
                <span className="legal-status-badge custom">
                  <FileText size={13} />
                  <span>Custom Page</span>
                </span>
              )}

              {page.isProtected && (
                <span className="legal-status-badge protected">
                  🔒
                  <span>Protected</span>
                </span>
              )}

              <span className="legal-status-badge active">
                🟢
                <span>Active</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div className="legal-card-footer">
        <button
          type="button"
          className="legal-action preview"
          onClick={() => onPreview?.(page)}
        >
          <Eye size={18} />

          <span>Preview</span>
        </button>

        <button
          type="button"
          className="legal-action edit"
          onClick={() => onEdit?.(page)}
        >
          <Pencil size={18} />

          <span>Edit</span>
        </button>

        <button
          type="button"
          className="legal-action delete"
          onClick={() => onDelete?.(page)}
          disabled={page.isSystemPage}
          title={
            page.isSystemPage
              ? "System pages cannot be deleted."
              : "Delete page"
          }
        >
          <Trash2 size={18} />

          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
