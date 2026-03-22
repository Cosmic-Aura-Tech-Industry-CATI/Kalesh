import Table from "../components/Table";
import Button from "../components/Button";
import { useGetBannedUsers, useUnbanUser } from "../../hooks/useAppUsers";
import "../style/admin.css";

export default function BannedUsers() {
  const { data: usersResponse, isLoading } = useGetBannedUsers();
  const { mutate: unbanUserMutate } = useUnbanUser();

  const users =
    usersResponse?.data?.bannedUsers || usersResponse?.bannedUsers || [];

  console.log(users);

  const handleUnban = (userId) => {
    if (window.confirm("Are you sure you want to unban this user?")) {
      unbanUserMutate(userId);
    }
  };

  const columns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone", render: (phone) => phone || "N/A" },
    { key: "warningCount", label: "Warnings" },
    {
      key: "updatedAt",
      label: "Banned On",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <Button
          size="sm"
          variant="success"
          onClick={() => handleUnban(row._id || row.id)}
        >
          Unban
        </Button>
      ),
    },
  ];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Banned Users</h1>
        <div className="text-xs sm:text-sm text-gray-400">
          {isLoading ? "Loading..." : `${users.length} banned users`}
        </div>
      </div>

      <Table columns={columns} data={isLoading ? [] : users} />
    </div>
  );
}
