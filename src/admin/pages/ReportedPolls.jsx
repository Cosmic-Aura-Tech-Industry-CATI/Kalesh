import { useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import { mockReportedPolls } from '../data/mockData';
import '../style/admin.css';
import '../style/reported-polls.css';

export default function ReportedPolls() {
  const [reportedPolls] = useState(mockReportedPolls);

  const handleApprovePoll = (pollId) => {
    alert(`Poll ${pollId} approved`);
  };

  const handleRemovePoll = (pollId) => {
    alert(`Poll ${pollId} removed`);
  };

  const handleWarnUser = (userId) => {
    alert(`Warning sent to user ${userId}`);
  };

  const handleBanUser = (userId) => {
    alert(`User ${userId} banned`);
  };

  const reportedPollColumns = [
    { key: 'id', label: 'Poll ID' },
    { key: 'question', label: 'Poll Question' },
    {
      key: 'options',
      label: 'Poll Options',
      render: (options) => (
        <div className="reported-options-list">
          {options.map((option, index) => (
            <div key={index} className="reported-option-item">
              • {option}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'reason',
      label: 'Report Reason',
      render: (reason) => (
        <span className="reported-reason-badge">
          {reason}
        </span>
      ),
    },
    { key: 'totalReports', label: 'Total Reports' },
    { key: 'createdAt', label: 'Created On' },
    {
      key: 'actions',
      label: 'Moderation Actions',
      render: (_, row) => (
        <div className="reported-actions-wrapper">
          <Button
            size="sm"
            variant="success"
            onClick={() => handleApprovePoll(row.id)}
          >
            Approve
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() => handleRemovePoll(row.id)}
          >
            Remove
          </Button>

          <Button
            size="sm"
            variant="warning"
            onClick={() => handleWarnUser(row.userId)}
          >
            Warn
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() => handleBanUser(row.userId)}
          >
            Ban
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-section reported-polls-section">
      <div className="admin-section-header reported-polls-header">
        <h1 className="admin-page-title">Reported Polls</h1>
        <div className="reported-polls-count">
          {reportedPolls.length} polls pending review
        </div>
      </div>

      <Table columns={reportedPollColumns} data={reportedPolls} />
    </div>
  );
}