import React from "react";

import SectionToolbar from "./SectionToolbar";

export default function SectionCard({
  index = 1,
  section = {},
  onChange,

  onDuplicate,
  onMoveUp,
  onMoveDown,
  onDelete,

  canMoveUp = true,
  canMoveDown = true,
}) {
  // ============================
  // Update Helper
  // ============================

  const update = (field, value) => {
    onChange?.({
      ...section,
      [field]: value,
    });
  };

  // ============================
  // Change Content Type
  // ============================

  const handleTypeChange = (type) => {
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

    onChange?.({
      ...section,
      type,
      content,
    });
  };

  return (
    <div className="section-card">
      {/* ================= Header ================= */}

      <div className="section-card-header">
        <div className="section-card-title">
          <span className="section-number">{index}</span>

          <div>
            <h3>Section {index}</h3>

            <p>Configure heading, introduction and content.</p>
          </div>
        </div>

        <SectionToolbar
          onDuplicate={onDuplicate}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={onDelete}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
        />
      </div>

      {/* ================= Heading ================= */}

      <div className="editor-group">
        <label>Heading</label>

        <input
          type="text"
          value={section.heading || ""}
          placeholder="Enter section heading"
          onChange={(e) => update("heading", e.target.value)}
        />
      </div>

      {/* ================= Intro ================= */}

      <div className="editor-group">
        <label>Introduction</label>

        <textarea
          rows={4}
          value={section.introText || ""}
          placeholder="Short introduction..."
          onChange={(e) => update("introText", e.target.value)}
        />
      </div>

      {/* ================= Type ================= */}

      <div className="editor-group">
        <label>Content Type</label>

        <select
          value={section.type || "paragraph"}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="paragraph">Paragraph</option>

          <option value="bullet_list">Bullet List</option>

          <option value="rich_bullet_list">Rich Bullet List</option>
        </select>
      </div>

      {/* ================= Content ================= */}

      <div className="editor-group">
        <label>Content</label>

        {/* ===========================================
      Paragraph
  =========================================== */}

        {section.type === "paragraph" && (
          <textarea
            rows={10}
            className="editor-paragraph"
            placeholder="Write your paragraph..."
            value={section.content || ""}
            onChange={(e) => update("content", e.target.value)}
          />
        )}

        {/* ===========================================
      Bullet List
  =========================================== */}

        {section.type === "bullet_list" && (
          <div className="bullet-wrapper">
            {(section.content || []).map((bullet, i) => (
              <div key={i} className="bullet-item">
                <span className="bullet-dot">•</span>

                <input
                  value={bullet}
                  placeholder={`Bullet ${i + 1}`}
                  onChange={(e) => {
                    const bullets = [...section.content];

                    bullets[i] = e.target.value;

                    update("content", bullets);
                  }}
                />

                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => {
                    const bullets = [...section.content];

                    bullets.splice(i, 1);

                    update("content", bullets);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-item-btn"
              onClick={() =>
                update("content", [...(section.content || []), ""])
              }
            >
              + Add Bullet
            </button>
          </div>
        )}

        {/* ===========================================
      Rich Bullet
  =========================================== */}

        {section.type === "rich_bullet_list" && (
          <div className="rich-wrapper">
            {(section.content || []).map((item, i) => (
              <div key={i} className="rich-card">
                <input
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...section.content];

                    updated[i] = {
                      ...updated[i],
                      title: e.target.value,
                    };

                    update("content", updated);
                  }}
                />

                <textarea
                  rows={4}
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...section.content];

                    updated[i] = {
                      ...updated[i],
                      description: e.target.value,
                    };

                    update("content", updated);
                  }}
                />

                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => {
                    const updated = [...section.content];

                    updated.splice(i, 1);

                    update("content", updated);
                  }}
                >
                  Remove Item
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-item-btn"
              onClick={() =>
                update("content", [
                  ...(section.content || []),
                  {
                    title: "",
                    description: "",
                  },
                ])
              }
            >
              + Add Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
