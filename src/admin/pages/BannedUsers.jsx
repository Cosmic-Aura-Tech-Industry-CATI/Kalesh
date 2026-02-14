import { useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import { mockBannedUsers } from '../data/mockData';
import '../admin.css';

export default function BannedUsers() {
  const [users] = useState(mockBannedUsers);

  const handleUnban = (userId) => {
    alert(`User ${userId} unbanned`);
  };

  const columns = [
    { key: 'id', label: 'User ID' },
    { key: 'username', label: 'Username' },
    {
      key: 'banType',
      label: 'Ban Type',
      render: (type) => (
        <span className={`px-2 py-1 rounded text-xs ${
          type === 'Permanent' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {type}
        </span>
      ),
    },
    { key: 'reason', label: 'Reason' },
    { key: 'bannedAt', label: 'Banned On' },
    { key: 'expiryDate', label: 'Expires' },
    { key: 'bannedBy', label: 'Banned By' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button size="sm" variant="success" onClick={() => handleUnban(row.id)}>
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
          {users.length} banned users
        </div>
      </div>

      <Table columns={columns} data={users} />
    </div>
  );
}
