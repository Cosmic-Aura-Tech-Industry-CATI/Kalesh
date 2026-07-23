import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="legal-empty">
      <div className="legal-empty-card">
        <div className="legal-empty-icon">
          <FileText size={58} strokeWidth={1.8} />
        </div>

        <h2>No Legal Pages</h2>

        <p>
          You haven't created any legal pages yet.
          <br />
          Create your first legal page to display Privacy Policy, Terms &
          Conditions or other important information.
        </p>

        <button
          className="legal-create-btn"
          onClick={() => navigate("/admin/legal-pages/new")}
        >
          Create First Page
        </button>
      </div>
    </div>
  );
}
