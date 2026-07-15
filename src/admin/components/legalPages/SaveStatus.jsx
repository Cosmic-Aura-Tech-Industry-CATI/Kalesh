import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function SaveStatus({ saving = false, dirty = false }) {
  if (saving) {
    return (
      <div className="save-status saving">
        <Loader2 size={16} className="save-status-spinner" />

        <span>Saving...</span>
      </div>
    );
  }

  if (dirty) {
    return (
      <div className="save-status unsaved">
        <AlertCircle size={16} />

        <span>Unsaved Changes</span>
      </div>
    );
  }

  return (
    <div className="save-status saved">
      <CheckCircle2 size={16} />

      <span>Saved</span>
    </div>
  );
}
