import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";

export default function InterestModal({
  open,
  onClose,
  onSubmit,
  interest = null,
  loading = false,
}) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  /**
   * Reset / Fill Form
   */
  useEffect(() => {
    if (!open) return;

    if (interest) {
      setName(interest.name || "");
      setPreview(interest.iconUrl || "");
      setIcon(null);
    } else {
      resetForm();
    }
  }, [interest, open]);

  /**
   * Cleanup Preview URL
   */
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /**
   * Reset Form
   */
  const resetForm = () => {
    setName("");
    setIcon(null);
    setPreview("");
    setErrors({});
  };

  /**
   * Validate Form
   */
  const validate = () => {
    const validationErrors = {};

    const trimmedName = name.trim();

    if (!trimmedName) {
      validationErrors.name = "Interest name is required.";
    } else if (trimmedName.length < 3) {
      validationErrors.name = "Interest name must be at least 3 characters.";
    } else if (trimmedName.length > 30) {
      validationErrors.name = "Interest name cannot exceed 30 characters.";
    }

    if (!interest && !icon) {
      validationErrors.icon = "Interest icon is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  /**
   * Image Change
   */
  const handleImageChange = (file) => {
    setIcon(file);

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

    setErrors((prev) => ({
      ...prev,
      icon: "",
    }));
  };

  /**
   * Submit Form
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      name: name.trim(),
    };

    if (icon) {
      payload.iconUrl = icon;
    }

    onSubmit(payload);
  };

  if (!open) return null;

  return (
    <div className="interest-modal-overlay">
      <div className="interest-modal">
        <div className="interest-modal-header">
          <h2>{interest ? "Edit Interest" : "Add Interest"}</h2>

          <button
            className="interest-modal-close"
            onClick={() => {
              resetForm();
              onClose();
            }}
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form className="interest-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Interest Name</label>

            <input
              type="text"
              placeholder="Enter interest name"
              value={name}
              maxLength={30}
              onChange={(e) => {
                setName(e.target.value);

                if (errors.name) {
                  setErrors((prev) => ({
                    ...prev,
                    name: "",
                  }));
                }
              }}
            />

            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <ImageUploader
            preview={preview}
            onChange={handleImageChange}
            error={errors.icon}
          />

          {/* Remaining JSX will continue in Response 2.4.1B */}

          <div className="interest-modal-footer">
            <button
              type="button"
              className="interest-cancel-btn"
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="interest-save-btn"
              disabled={loading}
            >
              {loading ? (
                <div className="button-loader">
                  <span className="spinner"></span>
                  {interest ? "Updating..." : "Saving..."}
                </div>
              ) : interest ? (
                "Update Interest"
              ) : (
                "Save Interest"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
