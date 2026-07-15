import { Copy, ArrowUp, ArrowDown, Trash2 } from "lucide-react";

export default function SectionToolbar({
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onDelete,

  canMoveUp = true,
  canMoveDown = true,
}) {
  return (
    <div className="section-toolbar">
      {/* Duplicate */}

      <button
        type="button"
        className="section-toolbar-btn"
        title="Duplicate Section"
        onClick={onDuplicate}
      >
        <Copy size={16} />
      </button>

      {/* Move Up */}

      <button
        type="button"
        className="section-toolbar-btn"
        title="Move Up"
        disabled={!canMoveUp}
        onClick={onMoveUp}
      >
        <ArrowUp size={16} />
      </button>

      {/* Move Down */}

      <button
        type="button"
        className="section-toolbar-btn"
        title="Move Down"
        disabled={!canMoveDown}
        onClick={onMoveDown}
      >
        <ArrowDown size={16} />
      </button>

      {/* Delete */}

      <button
        type="button"
        className="section-toolbar-btn danger"
        title="Delete Section"
        onClick={onDelete}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
