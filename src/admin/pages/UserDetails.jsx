import { useParams } from "react-router-dom";
import "../style/userDetails.css";

export default function UserDetails() {
  const { userId } = useParams();

  // API call yaha lagegi
  const user = {
    name: "Rahul Singh",
    email: "rahul@email.com",
    phone: "+91 9876543210",
  };

  return (
    <div className="admin-section">
      <h1 className="admin-page-title">User Details</h1>

      <div className="user-details-wrapper">
        <div className="user-details-card">
          <div className="user-details-item">
            <span className="user-details-label">Name</span>
            <span className="user-details-value">{user.name}</span>
          </div>

          <div className="user-details-item">
            <span className="user-details-label">Email</span>
            <span className="user-details-value">{user.email}</span>
          </div>

          <div className="user-details-item">
            <span className="user-details-label">Phone</span>
            <span className="user-details-value">{user.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
