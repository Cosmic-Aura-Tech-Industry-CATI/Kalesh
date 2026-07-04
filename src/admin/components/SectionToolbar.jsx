import {
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  LayoutPanelTop,
} from "lucide-react";

export default function SectionToolbar({
  sectionNumber,
  totalSections,

  isFirst,
  isLast,

  onDelete,
  onDuplicate,

  onMoveUp,
  onMoveDown,
}) {
  return (
    <div className="section-toolbar">
      {/* LEFT */}

      <div className="section-toolbar-left">
        <div className="section-badge">
          <LayoutPanelTop size={16} />
          Section {sectionNumber}
        </div>
      </div>

      {/* RIGHT */}

      <div className="section-toolbar-right">
        {/* MOVE UP */}

        <button
          type="button"
          className="toolbar-btn"
          disabled={isFirst}
          onClick={onMoveUp}
          title="Move Up"
        >
          <ChevronUp size={18} />
        </button>

        {/* MOVE DOWN */}

        <button
          type="button"
          className="toolbar-btn"
          disabled={isLast}
          onClick={onMoveDown}
          title="Move Down"
        >
          <ChevronDown size={18} />
        </button>

        {/* DUPLICATE */}

        <button
          type="button"
          className="toolbar-btn"
          onClick={onDuplicate}
          title="Duplicate"
        >
          <Copy size={18} />
        </button>

        {/* DELETE */}

        <button
          type="button"
          className="toolbar-btn danger"
          onClick={onDelete}
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
