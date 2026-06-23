import { useState } from "react";
import Modal from "../components/Modal";
import { Info } from "lucide-react";
import Table from "../components/Table";
import Button from "../components/Button";
import { useGetBannedUsers, useUnbanUser } from "../../hooks/useAppUsers";
import "../style/admin.css";

export default function BannedUsers() {
  const { data: usersResponse, isLoading } = useGetBannedUsers();
  const { mutate: unbanUserMutate } = useUnbanUser();

  const [selectedUser, setSelectedUser] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const handleViewInfo = (user) => {
    console.log("Selected User:", user);
    setSelectedUser(user);
    setInfoModalOpen(true);
  };

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
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleViewInfo(row)}
          >
            <Info size={16} />
          </Button>

          <Button
            size="sm"
            variant="success"
            onClick={() => handleUnban(row._id || row.id)}
          >
            Unban
          </Button>
        </div>
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
      <Modal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        title="User Information"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Username</p>
              <p className="font-medium">{selectedUser.username}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="font-medium">
                {selectedUser.email || "Not Available"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="font-medium">
                {selectedUser.phone || "Not Available"}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
