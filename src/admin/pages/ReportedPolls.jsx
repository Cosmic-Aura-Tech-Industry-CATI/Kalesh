import { useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import { mockReportedPolls } from '../data/mockData';
import '../admin.css';

export default function ReportedPolls() {
  const [polls] = useState(mockReportedPolls);

  const handleApprove = (pollId) => {
    alert(`Poll ${pollId} approved`);
  };

  const handleRemove = (pollId) => {
    alert(`Poll ${pollId} removed`);
  };

  const handleWarn = (userId) => {
    alert(`Warning sent to user ${userId}`);
  };

  const handleBan = (userId) => {
    alert(`User ${userId} banned`);
  };

  const columns = [
    { key: 'id', label: 'Poll ID' },
    { key: 'question', label: 'Question' },
    {
      key: 'options',
      label: 'Options',
      render: (options) => (
        <div className="text-xs space-y-1">
          {options.map((opt, i) => (
            <div key={i} className="text-gray-400">• {opt}</div>
          ))}
        </div>
      ),
    },
    {
      key: 'reason',
      label: 'Reason',
      render: (reason) => (
        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
          {reason}
        </span>
      ),
    },
    { key: 'totalReports', label: 'Reports' },
    { key: 'createdAt', label: 'Created' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="success" onClick={() => handleApprove(row.id)}>
            Approve
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleRemove(row.id)}>
            Remove
          </Button>
          <Button size="sm" variant="warning" onClick={() => handleWarn(row.userId)}>
            Warn
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleBan(row.userId)}>
            Ban
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Reported Polls</h1>
        <div className="text-xs sm:text-sm text-gray-400">
          {polls.length} polls pending review
        </div>
      </div>

      <Table columns={columns} data={polls} />
    </div>
  );
}
