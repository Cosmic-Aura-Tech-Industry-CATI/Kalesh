import { useRef } from "react";
import toast from "react-hot-toast";

const ALLOWED_TYPES = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function ImageUploader({ preview, onChange, error }) {
  const inputRef = useRef(null);

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate File Type
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only SVG, PNG, JPG, JPEG and WEBP files are allowed.");

      e.target.value = "";
      return;
    }

    // Validate Size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Maximum image size is 2 MB.");

      e.target.value = "";
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange(null);
  };

  return (
    <div className="form-group">
      <label>Interest Icon</label>

      <div className="image-upload-wrapper">
        <div className="image-upload-box" onClick={handleSelect}>
          {preview ? (
            <img src={preview} alt="Interest" className="image-preview" />
          ) : (
            <div className="upload-placeholder">
              <div className="upload-icon">📁</div>

              <p>Click to Upload</p>

              <small>SVG • PNG • JPG • JPEG • WEBP</small>

              <small>Max Size : 2 MB</small>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".svg,.png,.jpg,.jpeg,.webp"
          onChange={handleFileChange}
        />

        <div className="upload-actions">
          <button type="button" className="upload-btn" onClick={handleSelect}>
            {preview ? "Replace Image" : "Choose Image"}
          </button>

          {preview && (
            <button type="button" className="remove-btn" onClick={handleRemove}>
              Remove
            </button>
          )}
        </div>

        {error && <span className="form-error">{error}</span>}
      </div>
    </div>
  );
}
