import InterestRow from "./InterestRow";

export default function InterestTable({
  interests = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <div className="interest-table-loading">Loading interests...</div>;
  }

  if (!loading && interests.length === 0) {
    return (
      <div className="interest-empty-state">
        <img src="/empty.svg" width={140} />

        <h3>No Interests Yet</h3>

        <p>Click on "Add Interest" to create your first interest.</p>
      </div>
    );
  }

  return (
    <div className="interest-table-wrapper">
      <table className="interest-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Created</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>
          {interests.map((interest) => (
            <InterestRow
              key={interest._id}
              interest={interest}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
