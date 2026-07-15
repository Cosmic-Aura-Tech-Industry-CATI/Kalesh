import { FileText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="legal-empty-state">
      <div className="legal-empty-icon">
        <FileText size={55} />
      </div>

      <h2>No Legal Pages</h2>

      <p>You haven't created any legal page yet.</p>

      <button className="legal-create-btn">Create First Page</button>
    </div>
  );
}
