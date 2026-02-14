import { useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { mockPremiumUsers } from '../data/mockData';
import '../admin.css';

export default function Premium() {
  const [users] = useState(mockPremiumUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  const handleGrant = () => {
    setIsModalOpen(true);
  };

  const handleRevoke = (userId) => {
    alert(`Premium revoked for user ${userId}`);
  };

  const handleGrantSubmit = () => {
    alert(`Premium granted to user ${selectedUser}`);
    setIsModalOpen(false);
    setSelectedUser('');
  };

  const columns = [
    { key: 'id', label: 'User ID' },
    { key: 'username', label: 'Username' },
    {
      key: 'plan',
      label: 'Plan',
      render: (plan) => (
        <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
          {plan}
        </span>
      ),
    },
    { key: 'startDate', label: 'Start Date' },
    { key: 'expiryDate', label: 'Expiry Date' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
          {status}
        </span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (amount) => `₹${amount}`,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button size="sm" variant="danger" onClick={() => handleRevoke(row.id)}>
          Revoke
        </Button>
      ),
    },
  ];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Premium Management</h1>
        <Button onClick={handleGrant}>Grant Premium</Button>
      </div>

      <Table columns={columns} data={users} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Grant Premium">
        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              User ID
            </label>
            <input
              type="text"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter user ID"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Plan Type
            </label>
            <select className="w-full px-3 sm:px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500">
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <Button onClick={handleGrantSubmit} className="w-full">
            Grant Premium
          </Button>
        </div>
      </Modal>
    </div>
  );
}
