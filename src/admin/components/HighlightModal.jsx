import { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";

export default function HighlightModal({
  open,
  onClose,
  onSave,
  category,
  editingHighlight,
}) {
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (open) {
      if (editingHighlight) {
        setHeader(editingHighlight.header || "");
        setDescription(editingHighlight.description || "");
        setLink(editingHighlight.link || "");
        setPreview(editingHighlight.media || "");
        setFiles([]);
      } else {
        setHeader("");
        setDescription("");
        setLink("");
        setFiles([]);
        setPreview("");
      }
    }
  }, [open, editingHighlight]);
  if (!open) return null;

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);

    const previews = selected.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setFiles(previews);
    setPreview("");
  };

  const handleSubmit = () => {
    if (!header || (files.length === 0 && !editingHighlight)) return;

    onSave({
      category,
      header,
      description,
      link,
      files,
    });

    onClose();

    setHeader("");
    setDescription("");
    setLink("");
    setFiles([]);
  };

  return (
    <div className="admin-modal-overlay">

      <div className="highlight-modal">

        <div className="highlight-modal-header">
          <h2>Add Highlight</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="highlight-modal-body">

          <div className="admin-form-group">
            <label className="admin-form-label">
              Header
            </label>

            <input
              type="text"
              className="admin-form-input"
              placeholder="Enter title"
              value={header}
              onChange={(e) =>
                setHeader(e.target.value)
              }
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">
              Description
            </label>

            <textarea
              rows="4"
              className="admin-form-textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">
              Redirect Link (Optional)
            </label>

            <input
              type="url"
              className="admin-form-input"
              placeholder="https://"
              value={link}
              onChange={(e) =>
                setLink(e.target.value)
              }
            />
          </div>

          <div className="upload-box">

            <UploadCloud size={40} />

            <p>Upload Images / GIFs</p>

            <input
              type="file"
              multiple
              accept="image/*,image/gif"
              onChange={handleFiles}
            />
          </div>

          <div className="preview-grid">

            {files.length > 0 ? files.map((file, index) => (
              <img
                key={index}
                src={file.url}
                alt=""
              />
            )) : preview && (
              <div className="preview-item">
                <img src={preview} alt="Current media" />
              </div>
            )}
          </div>

        </div>

        <div className="highlight-modal-footer">

          <button
            className="admin-btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="admin-btn-primary"
            onClick={handleSubmit}
          >
            Publish Highlight
          </button>

        </div>

      </div>

    </div>
  );
}