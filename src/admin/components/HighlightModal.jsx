import { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";

export default function HighlightModal({
  open,
  onClose,
  onSave,
  category,
  editingHighlight,
  isLoading = false,
}) {
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

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
      setErrors({});
    }
  }, [open, editingHighlight]);

  if (!open) return null;

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length === 0) return;

    const previews = selected.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setFiles(previews);
    setPreview("");
    setErrors((prev) => ({ ...prev, files: undefined }));
  };

  const validate = () => {
    const errs = {};
    const trimmedHeader = header.trim();
    const trimmedDesc = description.trim();
    const trimmedLink = link.trim();

    if (!trimmedHeader) {
      errs.header = "Header is required";
    } else if (trimmedHeader.length < 5) {
      errs.header = "Header must be at least 5 characters long";
    } else if (trimmedHeader.length > 100) {
      errs.header = "Header cannot exceed 100 characters";
    }

    if (!trimmedDesc) {
      errs.description = "Description is required";
    } else if (trimmedDesc.length < 10) {
      errs.description = "Description must be at least 10 characters long";
    } else if (trimmedDesc.length > 250) {
      errs.description = "Description cannot exceed 250 characters";
    }

    if (trimmedLink && !/^https?:\/\/.+/.test(trimmedLink)) {
      errs.link = "Please provide a valid URL (must start with http:// or https://)";
    }

    if (!editingHighlight && files.length === 0) {
      errs.files = "Please provide an image or GIF file";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    onSave({
      category,
      header: header.trim(),
      description: description.trim(),
      link: link.trim(),
      files,
    });
  };

  return (
    <div className="admin-modal-overlay">
      <div className="highlight-modal">
        <div className="highlight-modal-header">
          <h2>{editingHighlight ? "Edit Highlight" : "Add Highlight"}</h2>
          <button onClick={onClose} type="button">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="highlight-modal-body">
            {category && (
              <div className="mb-3 text-sm text-gray-400">
                Category: <span className="text-white font-medium">{category}</span>
              </div>
            )}

            <div className="admin-form-group">
              <label className="admin-form-label">
                Header <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="Enter title (5-100 characters)"
                value={header}
                onChange={(e) => {
                  setHeader(e.target.value);
                  if (errors.header) setErrors((prev) => ({ ...prev, header: undefined }));
                }}
              />
              {errors.header && (
                <span className="text-red-500 text-xs mt-1 block">{errors.header}</span>
              )}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                className="admin-form-textarea"
                placeholder="Enter description (10-250 characters)"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
                }}
              />
              {errors.description && (
                <span className="text-red-500 text-xs mt-1 block">{errors.description}</span>
              )}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Redirect Link (Optional)</label>
              <input
                type="url"
                className="admin-form-input"
                placeholder="https://thekalesh.com"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  if (errors.link) setErrors((prev) => ({ ...prev, link: undefined }));
                }}
              />
              {errors.link && (
                <span className="text-red-500 text-xs mt-1 block">{errors.link}</span>
              )}
            </div>

            <div className="upload-box">
              <UploadCloud size={40} />
              <p>{editingHighlight ? "Change Image / GIF (Optional)" : "Upload Image / GIF *"}</p>
              <input
                type="file"
                accept="image/*,image/gif"
                onChange={handleFiles}
              />
            </div>
            {errors.files && (
              <span className="text-red-500 text-xs mt-1 block">{errors.files}</span>
            )}

            <div className="preview-grid">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <img key={index} src={file.url} alt="Upload preview" />
                ))
              ) : preview && preview !== "pending" ? (
                <div className="preview-item">
                  <img src={preview} alt="Current media" />
                </div>
              ) : null}
            </div>
          </div>

          <div className="highlight-modal-footer">
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : editingHighlight ? "Update Highlight" : "Publish Highlight"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}