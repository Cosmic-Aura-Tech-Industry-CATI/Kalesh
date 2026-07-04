import { useEffect, useRef, useState } from "react";
import {
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Type,
  AlignLeft,
  FileText,
} from "lucide-react";

export default function ContentBlock({
  block,
  index,
  totalBlocks,

  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}) {
  //--------------------------------------
  // LOCAL VALUE
  //--------------------------------------

  const [value, setValue] = useState(() => {
    if (block.type === "bullet_list") {
      return block.content?.length ? block.content : [""];
    }

    if (block.type === "rich_bullet_list") {
      return block.content?.length
        ? block.content
        : [
            {
              title: "",
              description: "",
            },
          ];
    }

    return block.content || "";
  });

  //--------------------------------------
  // REFS
  //--------------------------------------

  const textareaRef = useRef(null);

  //--------------------------------------
  // AUTO RESIZE
  //--------------------------------------

  const autoResize = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";

    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  //--------------------------------------
  // UPDATE
  //--------------------------------------

  const handleChange = (e) => {
    const val = e.target.value;

    setValue(val);

    onUpdate(block.id, val);

    autoResize();
  };

  useEffect(() => {
    // Bullet / Rich Bullet Sync
    if (block.type === "bullet_list") {
      setValue(block.content?.length ? block.content : [""]);

      return;
    }

    if (block.type === "rich_bullet_list") {
      setValue(
        block.content?.length
          ? block.content
          : [
              {
                title: "",
                description: "",
              },
            ],
      );

      return;
    }

    setValue(block.content || "");
  }, [block]);

  useEffect(() => {
    // Paragraph Auto Resize
    autoResize();
  }, [value]);

  //--------------------------------------
  // BULLET
  //--------------------------------------

  const updateBullet = (index, text) => {
    const arr = [...value];

    arr[index] = text;

    setValue(arr);

    onUpdate(block.id, arr);
  };

  const addBullet = () => {
    const arr = [...value, ""];

    setValue(arr);

    onUpdate(block.id, arr);
  };

  const removeBullet = (index) => {
    if (value.length === 1) return;

    const arr = value.filter((_, i) => i !== index);

    setValue(arr);

    onUpdate(block.id, arr);
  };

  //--------------------------------------
  // RICH BULLET
  //--------------------------------------

  const updateRichBullet = (index, field, text) => {
    const arr = [...value];

    arr[index][field] = text;

    setValue(arr);

    onUpdate(block.id, arr);
  };

  const addRichBullet = () => {
    const arr = [
      ...value,

      {
        title: "",

        description: "",
      },
    ];

    setValue(arr);

    onUpdate(block.id, arr);
  };

  const removeRichBullet = (index) => {
    if (value.length === 1) return;

    const arr = value.filter((_, i) => i !== index);

    setValue(arr);

    onUpdate(block.id, arr);
  };

  //--------------------------------------
  // ICON
  //--------------------------------------

  const getIcon = () => {
    switch (block.type) {
      case "heading":
        return <Type size={18} />;

      case "intro":
        return <AlignLeft size={18} />;

      default:
        return <FileText size={18} />;
    }
  };

  //--------------------------------------
  // TITLE
  //--------------------------------------

  const getTitle = () => {
    switch (block.type) {
      case "heading":
        return "Heading";

      case "intro":
        return "Intro Text";

      case "paragraph":
        return "Paragraph";

      case "bullet_list":
        return "Bullet List";

      case "rich_bullet_list":
        return "Rich Bullet List";

      default:
        return "Block";
    }
  };

  return (
    <div className="content-block">
      {/* ================================= */}
      {/* TOOLBAR */}
      {/* ================================= */}

      <div className="content-toolbar">
        <div className="content-toolbar-left">
          {getIcon()}

          <span>{getTitle()}</span>
        </div>

        <div className="content-toolbar-right">
          <button
            onClick={() => onMoveUp(block.id)}
            disabled={index === 0}
            className="toolbar-btn"
          >
            <ChevronUp size={16} />
          </button>

          <button
            onClick={() => onMoveDown(block.id)}
            disabled={index === totalBlocks - 1}
            className="toolbar-btn"
          >
            <ChevronDown size={16} />
          </button>

          <button onClick={() => onDuplicate(block.id)} className="toolbar-btn">
            <Copy size={16} />
          </button>

          <button
            onClick={() => onDelete(block.id)}
            className="toolbar-btn danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* ================================= */}
      {/* HEADING */}
      {/* ================================= */}

      {block.type === "heading" && (
        <input
          type="text"
          className="cms-input"
          placeholder="Enter Heading..."
          value={value}
          onChange={handleChange}
        />
      )}

      {/* ================================= */}
      {/* INTRO */}
      {/* ================================= */}

      {block.type === "intro" && (
        <textarea
          rows={4}
          className="cms-textarea"
          placeholder="Enter Intro Text..."
          value={value}
          onChange={handleChange}
        />
      )}

      {/* ================================= */}
      {/* PARAGRAPH */}
      {/* ================================= */}

      {block.type === "paragraph" && (
        <div className="paragraph-editor">
          <textarea
            ref={textareaRef}
            className="cms-textarea paragraph-textarea"
            placeholder="Write your paragraph..."
            value={value}
            onChange={handleChange}
          />

          <div className="paragraph-footer">
            <span>Characters : {value.length}</span>

            <span>
              Words : {value.trim() ? value.trim().split(/\s+/).length : 0}
            </span>
          </div>
        </div>
      )}

      {/* ================================= */}
      {/* NEXT PART */}
      {/* ================================= */}

      {block.type === "bullet_list" && (
        <div className="bullet-editor">
          {value.map((item, index) => (
            <div className="bullet-item" key={index}>
              <span className="bullet-dot">•</span>

              <input
                type="text"
                className="cms-input"
                placeholder={`Bullet Point ${index + 1}`}
                value={item}
                onChange={(e) => updateBullet(index, e.target.value)}
              />

              <button
                type="button"
                className="bullet-delete"
                onClick={() => removeBullet(index)}
                disabled={value.length === 1}
              >
                Remove
              </button>
            </div>
          ))}

          <button type="button" className="bullet-add-btn" onClick={addBullet}>
            + Add Bullet Point
          </button>
        </div>
      )}

      {block.type === "rich_bullet_list" && (
        <div className="rich-editor">
          {value.map((item, index) => (
            <div className="rich-item" key={index}>
              <div className="rich-header">
                <h4>Rich Bullet {index + 1}</h4>

                <button
                  type="button"
                  className="rich-remove"
                  onClick={() => removeRichBullet(index)}
                  disabled={value.length === 1}
                >
                  Remove
                </button>
              </div>

              <input
                type="text"
                className="cms-input"
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  updateRichBullet(index, "title", e.target.value)
                }
              />

              <textarea
                rows={4}
                className="cms-textarea"
                placeholder="Description..."
                value={item.description}
                onChange={(e) =>
                  updateRichBullet(index, "description", e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            className="rich-add-btn"
            onClick={addRichBullet}
          >
            + Add Rich Bullet
          </button>
        </div>
      )}
    </div>
  );
}
