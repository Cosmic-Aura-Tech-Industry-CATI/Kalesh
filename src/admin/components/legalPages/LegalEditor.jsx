import SectionCard from "./SectionCard";
import AddSectionMenu from "./AddSectionMenu";

export default function LegalEditor({
  title,
  category,
  sections,

  setTitle,
  setCategory,
  setSections,

  onSave,
  onPreview,
  saving,
  canSave,
}) {
  //----------------------------------------
  // Add Section
  //----------------------------------------

  const handleAddSection = (type) => {
    const newSection = {
      heading: "",

      introText: "",

      type,

      content:
        type === "paragraph"
          ? ""
          : type === "bullet_list"
            ? [""]
            : [
                {
                  title: "",
                  description: "",
                },
              ],
    };

    setSections((prev) => [...prev, newSection]);
  };

  //----------------------------------------
  // Update Section
  //----------------------------------------

  const handleSectionChange = (index, updatedSection) => {
    const updated = [...sections];

    updated[index] = updatedSection;

    setSections(updated);
  };

  return (
    <div className="legal-editor">
      {/* =======================================================
          Page Information
        ======================================================= */}

      <div className="legal-editor-card">
        <h2 className="editor-card-title">Page Information</h2>

        <div className="editor-form">
          <div className="editor-row">
            {/* Title */}

            <div className="editor-group">
              <label htmlFor="page-title">Page Title</label>

              <input
                id="page-title"
                type="text"
                placeholder="e.g. Privacy Policy"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <small>This title will be visible inside the app.</small>
            </div>

            {/* Category */}

            <div className="editor-group">
              <label htmlFor="page-category">Category</label>

              <select
                id="page-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>

                <option value="privacy_policy">Privacy Policy</option>

                <option value="terms_and_conditions">Terms & Conditions</option>

                <option value="community_guidelines">
                  Community Guidelines
                </option>

                <option value="refund_policy">Refund Policy</option>

                <option value="about_us">About Us</option>

                <option value="other">Other</option>
              </select>

              <small>Used for routing and organization.</small>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
        Sections
        ======================================================= */}

      <div className="legal-editor-card">
        <div className="editor-section-header">
          <h2>Sections</h2>

          <span>
            {sections.length} {sections.length === 1 ? "Section" : "Sections"}
          </span>
        </div>

        {/* Empty */}

        {sections.length === 0 ? (
          <div className="empty-sections">
            <h3>No Sections Added</h3>

            <p>
              Click <strong>+ Add Section</strong> below to start building your
              legal page.
            </p>
          </div>
        ) : (
          <div className="sections-wrapper">
            {sections.map((section, index) => (
              <SectionCard
                key={index}
                index={index + 1}
                section={section}
                canMoveUp={index > 0}
                canMoveDown={index < sections.length - 1}
                onChange={(updatedSection) => {
                  const updated = [...sections];

                  updated[index] = updatedSection;

                  setSections(updated);
                }}
                onDuplicate={() => {
                  const updated = [...sections];

                  updated.splice(index + 1, 0, {
                    ...section,
                  });

                  setSections(updated);
                }}
                onMoveUp={() => {
                  if (index === 0) return;

                  const updated = [...sections];

                  [updated[index - 1], updated[index]] = [
                    updated[index],
                    updated[index - 1],
                  ];

                  setSections(updated);
                }}
                onMoveDown={() => {
                  if (index === sections.length - 1) return;

                  const updated = [...sections];

                  [updated[index], updated[index + 1]] = [
                    updated[index + 1],
                    updated[index],
                  ];

                  setSections(updated);
                }}
                onDelete={() => {
                  setSections(sections.filter((_, i) => i !== index));
                }}
              />
            ))}
          </div>
        )}

        {/* Add Section */}

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AddSectionMenu
            onAdd={(type) => {
              let content = "";

              if (type === "bullet_list") {
                content = [""];
              }

              if (type === "rich_bullet_list") {
                content = [
                  {
                    title: "",
                    description: "",
                  },
                ];
              }

              setSections([
                ...sections,
                {
                  heading: "",
                  introText: "",
                  type,
                  content,
                },
              ]);
            }}
          />
        </div>

        {/* =======================================================
          Bottom Actions
        ======================================================= */}

        <div className="editor-bottom-actions">
          <button
            type="button"
            className="editor-bottom-btn preview"
            onClick={onPreview}
          >
            Preview
          </button>

          <button
            type="button"
            className="editor-bottom-btn save"
            disabled={saving || !canSave}
            onClick={onSave}
          >
            {saving ? "Saving..." : "Save Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
