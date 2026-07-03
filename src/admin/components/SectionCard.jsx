import { Type, AlignLeft } from "lucide-react";

import SectionToolbar from "./SectionToolbar";

const SECTION_TYPES = [
  {
    label: "Paragraph",
    value: "paragraph",
  },
  {
    label: "Bullet List",
    value: "bullet_list",
  },
  {
    label: "Rich Bullet List",
    value: "rich_bullet_list",
  },
];

export default function SectionCard({
  section,
  index,
  totalSections,

  onChange,

  onDelete,
  onDuplicate,

  onMoveUp,
  onMoveDown,
}) {
  //---------------------------------
  // HANDLE CHANGE
  //---------------------------------

  const handleInput = (e) => {
    const { name, value } = e.target;

    onChange(section.id, name, value);
  };

  return (
    <div className="cms-section-card">
      {/* ========================= */}
      {/* TOOLBAR */}
      {/* ========================= */}

      <SectionToolbar
        index={index}
        totalSections={totalSections}
        onDelete={() => onDelete(section.id)}
        onDuplicate={() => onDuplicate(section.id)}
        onMoveUp={() => onMoveUp(section.id)}
        onMoveDown={() => onMoveDown(section.id)}
      />

      {/* ========================= */}
      {/* TYPE */}
      {/* ========================= */}

      <div className="cms-group">
        <label>
          <Type size={15} />
          Section Type
        </label>

        <select name="type" value={section.type} onChange={handleInput}>
          {SECTION_TYPES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* ========================= */}
      {/* HEADING */}
      {/* ========================= */}

      <div className="cms-group mt-5">
        <label>
          <Type size={15} />
          Heading
        </label>

        <input
          type="text"
          name="heading"
          value={section.heading}
          onChange={handleInput}
          placeholder="Enter section heading"
        />
      </div>

      {/* ========================= */}
      {/* INTRO */}
      {/* ========================= */}

      <div className="cms-group mt-5">
        <label>
          <AlignLeft size={15} />
          Intro Text
        </label>

        <textarea
          rows={3}
          name="introText"
          value={section.introText}
          onChange={handleInput}
          placeholder="Enter short introduction..."
        />
      </div>

      {/* ========================= */}
      {/* CONTENT PLACEHOLDER */}
      {/* ========================= */}

      <div className="cms-editor-placeholder">
        {section.type === "paragraph" && (
          <div>
            <h4>Paragraph Editor</h4>

            <p>Next Part me paragraph editor yaha render hoga.</p>
          </div>
        )}

        {section.type === "bullet_list" && (
          <div>
            <h4>Bullet List Editor</h4>

            <p>Next Part me bullet list editor yaha render hoga.</p>
          </div>
        )}

        {section.type === "rich_bullet_list" && (
          <div>
            <h4>Rich Bullet List Editor</h4>

            <p>Next Part me rich bullet editor yaha render hoga.</p>
          </div>
        )}
      </div>
    </div>
  );
}
