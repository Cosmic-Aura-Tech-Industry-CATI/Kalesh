import { useParams } from "react-router-dom";
import "../style/userDetails.css";
import { useGetAppUserById } from "../../hooks/useAppUsers";

export default function UserDetails() {
  const { userId } = useParams();

  const { data: user = {}, isLoading } = useGetAppUserById(userId);

  if (isLoading) {
    return (
      <div className="admin-section">
        <div className="admin-section-header">
          <h1 className="admin-page-title">User Details</h1>
          <div className="text-xs sm:text-sm text-gray-400">Loading...</div>
        </div>
      </div>
    );

  }

  return (
    <div className="admin-section">
      <h1 className="admin-page-title">User Details</h1>

      <div className="user-details-wrapper">
        <div className="user-details-card">
          <div className="user-details-item">
            <span className="user-details-label">Name</span>
            <span className="user-details-value">{user.data.username}</span>
          </div>

          <div className="user-details-item">
            <span className="user-details-label">Email</span>
            <span className="user-details-value">{user.data.email}</span>
          </div>

          <div className="user-details-item">
            <span className="user-details-label">Phone</span>
            <span className="user-details-value">{user.data.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
