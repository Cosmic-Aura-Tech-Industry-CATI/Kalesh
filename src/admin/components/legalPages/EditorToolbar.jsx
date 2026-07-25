import { ArrowLeft, Eye, Save, Loader2 } from "lucide-react";

import SaveStatus from "./SaveStatus";

export default function EditorToolbar({
  onBack,
  onPreview,
  onSave,
  saving = false,
  dirty = false,
  canSave = true,
}) {
  return (
    <header className="editor-toolbar">
      {/* Left */}

      <div className="editor-toolbar-left">
        <button
          type="button"
          className="editor-toolbar-btn secondary"
          onClick={onBack}
        >
          <ArrowLeft size={18} />

          <span>Back</span>
        </button>
      </div>

      {/* Center */}

      <div className="editor-toolbar-center">
        <SaveStatus saving={saving} dirty={dirty} />
      </div>

      {/* Right */}

      <div className="editor-toolbar-right">
        <button
          type="button"
          className="editor-toolbar-btn preview"
          onClick={onPreview}
        >
          <Eye size={18} />

          <span>Preview</span>
        </button>

        <button
          type="button"
          className="editor-toolbar-btn save"
          disabled={saving || !canSave}
          onClick={onSave}
        >
          {saving ? (
            <>
              <Loader2 size={18} className="spin" />

              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={18} />

              <span>Save Page</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
