import { Type, Heading, AlignLeft } from "lucide-react";

import ParagraphEditor from "./ParagraphEditor";
import BulletEditor from "./BulletEditor";
import RichBulletEditor from "./RichBulletEditor";
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

  onUpdate,

  onDelete,
  onDuplicate,

  onMoveUp,
  onMoveDown,
}) {
  //--------------------------------------
  // INPUT CHANGE
  //--------------------------------------

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      let defaultContent = "";

      switch (value) {
        case "paragraph":
          defaultContent = "";

          break;

        case "bullet_list":
          defaultContent = [""];

          break;

        case "rich_bullet_list":
          defaultContent = [
            {
              title: "",
              description: "",
            },
          ];

          break;

        default:
          defaultContent = "";
      }

      onUpdate(section.id, "type", value);

      onUpdate(section.id, "content", defaultContent);

      return;
    }

    onUpdate(section.id, name, value);
  };

  //--------------------------------------
  // CONTENT CHANGE
  //--------------------------------------

  const handleContentChange = (value) => {
    onUpdate(section.id, "content", value);
  };

  return (
    <div className="cms-section-card">
      {/*====================================*/}
      {/* TOOLBAR */}
      {/*====================================*/}

      <SectionToolbar
        sectionNumber={index + 1}
        totalSections={totalSections}
        isFirst={index === 0}
        isLast={index === totalSections - 1}
        onDelete={() => onDelete(section.id)}
        onDuplicate={() => onDuplicate(section.id)}
        onMoveUp={() => onMoveUp(section.id)}
        onMoveDown={() => onMoveDown(section.id)}
      />

      {/*====================================*/}
      {/* HEADING */}
      {/*====================================*/}

      <div className="cms-group">
        <label>
          <Heading size={16} />
          Heading
        </label>

        <input
          type="text"
          name="heading"
          placeholder="Enter section heading"
          value={section.heading}
          onChange={handleInput}
        />
      </div>

      {/*====================================*/}
      {/* INTRO */}
      {/*====================================*/}

      <div className="cms-group mt-5">
        <label>
          <AlignLeft size={16} />
          Intro Text
        </label>

        <textarea
          rows={4}
          name="introText"
          placeholder="Enter intro text"
          value={section.introText}
          onChange={handleInput}
        />
      </div>

      {/*====================================*/}
      {/* TYPE */}
      {/*====================================*/}

      <div className="cms-group mt-5">
        <label>
          <Type size={16} />
          Content Type
        </label>

        <select name="type" value={section.type} onChange={handleInput}>
          {SECTION_TYPES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/*====================================*/}
      {/* DYNAMIC EDITOR */}
      {/*====================================*/}

      <div className="cms-editor-area">
        {/* ==================================== */}
        {/* PARAGRAPH */}
        {/* ==================================== */}

        {section.type === "paragraph" && (
          <ParagraphEditor
            value={typeof section.content === "string" ? section.content : ""}
            onChange={handleContentChange}
          />
        )}

        {/* ==================================== */}
        {/* BULLET LIST */}
        {/* ==================================== */}

        {section.type === "bullet_list" && (
          <BulletEditor
            value={Array.isArray(section.content) ? section.content : [""]}
            onChange={handleContentChange}
          />
        )}

        {/* ==================================== */}
        {/* RICH BULLET */}
        {/* ==================================== */}

        {section.type === "rich_bullet_list" && (
          <RichBulletEditor
            value={
              Array.isArray(section.content)
                ? section.content
                : [
                    {
                      title: "",
                      description: "",
                    },
                  ]
            }
            onChange={handleContentChange}
          />
        )}
      </div>
    </div>
  );
}
