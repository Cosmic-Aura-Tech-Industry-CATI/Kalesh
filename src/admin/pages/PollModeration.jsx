import { useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import { mockPolls } from '../data/mockData';
import '../style/admin.css';

export default function PollModeration() {
  const [polls] = useState(mockPolls);
  const [filter, setFilter] = useState('all');

  const handleHide = (pollId) => {
    alert(`Poll ${pollId} hidden`);
  };

  const handleReview = (pollId) => {
    alert(`Reviewing poll ${pollId}`);
  };

  const handleRemove = (pollId) => {
    alert(`Poll ${pollId} removed`);
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
    { key: 'votes', label: 'Votes' },
    {
      key: 'trending',
      label: 'Status',
      render: (trending) => (
        <span className={`px-2 py-1 rounded text-xs ${
          trending ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-700 text-gray-400'
        }`}>
          {trending ? 'Trending' : 'Normal'}
        </span>
      ),
    },
    { key: 'createdAt', label: 'Created' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleHide(row.id)}>
            Hide
          </Button>
          <Button size="sm" variant="primary" onClick={() => handleReview(row.id)}>
            Review
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleRemove(row.id)}>
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Poll Moderation</h1>
      </div>

      <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 sm:gap-3">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Polls
        </Button>
        <Button
          variant={filter === 'new' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('new')}
        >
          New
        </Button>
        <Button
          variant={filter === 'trending' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('trending')}
        >
          Trending
        </Button>
      </div>

      <Table columns={columns} data={polls} />
    </div>
  );
}
