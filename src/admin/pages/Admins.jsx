import { useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { mockAdmins } from '../data/mockData';
import '../style/admin.css';

export default function Admins() {
  const [admins] = useState(mockAdmins);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDisable = (adminId) => {
    alert(`Admin ${adminId} disabled`);
  };

  const handleAddAdmin = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    alert('New admin added');
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'id', label: 'Admin ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (role) => (
        <span className={`px-2 py-1 rounded text-xs ${
          role === 'Super Admin' ? 'bg-red-500/20 text-red-400' :
          role === 'Moderator' ? 'bg-blue-500/20 text-blue-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {role}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
          {status}
        </span>
      ),
    },
    { key: 'lastLogin', label: 'Last Login' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button size="sm" variant="danger" onClick={() => handleDisable(row.id)}>
          Disable
        </Button>
      ),
    },
  ];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Admin & Role Management</h1>
        <Button onClick={handleAddAdmin}>Add Admin</Button>
      </div>

      <Table columns={columns} data={admins} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Admin">
        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 sm:px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select className="w-full px-3 sm:px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500">
              <option>Moderator</option>
              <option>Support</option>
              <option>Super Admin</option>
            </select>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Add Admin
          </Button>
        </div>
      </Modal>
    </div>
  );
}
