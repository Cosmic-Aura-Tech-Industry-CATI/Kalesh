import { useState } from 'react';
import Table from '../components/Table';
import { mockLogs } from '../data/mockData';
import '../style/admin.css';

export default function Logs() {
  const [logs] = useState(mockLogs);

  const columns = [
    { key: 'id', label: 'Log ID' },
    { key: 'adminName', label: 'Admin' },
    {
      key: 'action',
      label: 'Action',
      render: (action) => (
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
          {action}
        </span>
      ),
    },
    { key: 'target', label: 'Target' },
    { key: 'timestamp', label: 'Date & Time' },
    { key: 'details', label: 'Details' },
  ];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Logs & Security</h1>
        <div className="text-xs sm:text-sm text-gray-400">
          {logs.length} activity logs
        </div>
      </div>

      <Table columns={columns} data={logs} />
    </div>
  );
}
