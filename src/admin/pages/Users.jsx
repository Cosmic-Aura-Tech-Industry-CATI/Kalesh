import Table from '../components/Table';
import Button from '../components/Button';
import { useGetAllAppUsers } from '../../hooks/useAppUsers';
import '../style/admin.css';

export default function Users() {
  const { data: users = [] } = useGetAllAppUsers();

  const handleWarn = (userId) => {
    alert(`Warning sent to user ${userId}`);
  };

  const handleTempBan = (userId) => {
    alert(`User ${userId} temporarily banned`);
  };

  const handlePermaBan = (userId) => {
    alert(`User ${userId} permanently banned`);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'pollsCreated', label: 'Polls Created' },
    { key: 'reportsCount', label: 'Reports' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'Active' ? 'bg-green-500/20 text-green-400' :
          status === 'Warned' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {status}
        </span>
      ),
    },
    {
      key: 'isPremium',
      label: 'Premium',
      render: (isPremium) => (
        <span className={`px-2 py-1 rounded text-xs ${
          isPremium ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-700 text-gray-400'
        }`}>
          {isPremium ? 'Yes' : 'No'}
        </span>
      ),
    },
    { key: 'joinedAt', label: 'Joined' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="warning" onClick={() => handleWarn(row.id)}>
            Warn
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleTempBan(row.id)}>
            Temp Ban
          </Button>
          <Button size="sm" variant="danger" onClick={() => handlePermaBan(row.id)}>
            Perma Ban
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">User Management</h1>
        <div className="text-xs sm:text-sm text-gray-400">
          {users.length} users
        </div>
      </div>

      <Table columns={columns} data={users.data} />
    </div>
  );
}
