import {
  Type,
  List,
  ListOrdered,
  Trash2,
  ChevronUp,
  ChevronDown,
  Copy,
} from "lucide-react";

export default function SectionToolbar({
  index,
  totalSections,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
}) {
  return (
    <div className="section-toolbar">
      <div className="section-toolbar-left">
        <div className="section-number">Section {index + 1}</div>
      </div>

      <div className="section-toolbar-right">
        {/* Move Up */}

        <button
          type="button"
          className="toolbar-btn"
          onClick={onMoveUp}
          disabled={index === 0}
          title="Move Up"
        >
          <ChevronUp size={16} />
        </button>

        {/* Move Down */}

        <button
          type="button"
          className="toolbar-btn"
          onClick={onMoveDown}
          disabled={index === totalSections - 1}
          title="Move Down"
        >
          <ChevronDown size={16} />
        </button>

        {/* Duplicate */}

        <button
          type="button"
          className="toolbar-btn"
          onClick={onDuplicate}
          title="Duplicate"
        >
          <Copy size={16} />
        </button>

        {/* Delete */}

        <button
          type="button"
          className="toolbar-btn toolbar-danger"
          onClick={onDelete}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
