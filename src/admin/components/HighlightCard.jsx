import { Trash2, ExternalLink, Edit } from "lucide-react";

export default function HighlightCard({ item, deleteHighlight, editHighlight }) {
  return (
    <div className="highlight-card">
      <div className="highlight-media-wrapper">
        <div
          className="highlight-media"
          onClick={() => item.link && window.open(item.link, "_blank")}
        >
          <img src={item.media} alt="" />

          {item.link && (
            <div className="highlight-link-icon">
              <ExternalLink size={18} />
            </div>
          )}
        </div>
      </div>

      <div className="highlight-card-content">
        <h3>{item.header}</h3>

        <p>{item.description}</p>
      </div>

      <div className="highlight-card-footer">
        <button
          className="admin-btn-secondary"
          onClick={editHighlight}
        >
          <Edit size={16} />
          Edit
        </button>
        <button
          className="admin-btn-danger"
          onClick={deleteHighlight}
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
