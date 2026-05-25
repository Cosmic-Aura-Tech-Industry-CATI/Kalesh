import {
  Trash2,
  ExternalLink,
} from "lucide-react";

export default function HighlightCard({
  item,
  deleteHighlight,
}) {
  return (
    <div className="highlight-card">

      <div className="highlight-media-wrapper">

        {item.files.map((file, index) => (
          <div
            key={index}
            className="highlight-media"
            onClick={() =>
              item.link &&
              window.open(item.link, "_blank")
            }
          >
            <img
              src={file.url}
              alt=""
            />

            {item.link && (
              <div className="highlight-link-icon">
                <ExternalLink size={18} />
              </div>
            )}
          </div>
        ))}

      </div>

      <div className="highlight-card-content">

        <h3>{item.header}</h3>

        <p>{item.description}</p>

      </div>

      <div className="highlight-card-footer">

        <button
          className="admin-btn-danger"
          onClick={() =>
            deleteHighlight(item.id)
          }
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}