import { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import Table from '../components/Table';
import StatCard from '../components/StatCard';
import { mockPayments } from '../data/mockData';
import '../admin.css';

export default function Payments() {
  const [payments] = useState(mockPayments);

  const todayRevenue = 398;
  const monthlyRevenue = 284.5;

  const columns = [
    { key: 'id', label: 'Transaction ID' },
    { key: 'userId', label: 'User ID' },
    {
      key: 'amount',
      label: 'Amount',
      render: (amount) => `₹${amount}`,
    },
    {
      key: 'type',
      label: 'Type',
      render: (type) => (
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
          {type}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'Success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {status}
        </span>
      ),
    },
    { key: 'date', label: 'Date & Time' },
  ];

  return (
    <div className="admin-section">
      <h1 className="admin-page-title">Payments & Revenue</h1>

      <div className="admin-stats-grid mb-6 sm:mb-8">
        <StatCard
          title="Today's Revenue"
          value={`₹${todayRevenue}`}
          icon={DollarSign}
        />
        <StatCard
          title="This Month"
          value={`₹${monthlyRevenue}K`}
          icon={TrendingUp}
          trend="+18.9% from last month"
          trendUp={true}
        />
      </div>

      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recent Transactions</h2>
      <Table columns={columns} data={payments} />
    </div>
  );
}
