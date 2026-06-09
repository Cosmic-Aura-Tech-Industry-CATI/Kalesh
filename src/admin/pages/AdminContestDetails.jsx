import { useParams } from "react-router-dom";
import { useGetContestById } from "../../hooks/useContests";

export default function AdminContestDetails() {
  const { id } = useParams();

  const { data, isLoading } =
    useGetContestById(id);

  const contest =
    data?.data ||
    data?.contest ||
    data;

  if (isLoading) {
    return (
      <div className="admin-page-wrapper">
        Loading...
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="admin-page-wrapper">
        Contest Not Found
      </div>
    );
  }

  return (
    <div className="admin-page-wrapper">
      <h1 className="admin-page-title">
        Contest Details
      </h1>

      <div className="admin-card-lg">
        <img
          src={contest.thumbnail}
          alt={contest.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />

        <h2 className="text-3xl font-bold mb-3">
          {contest.title}
        </h2>

        <p className="text-gray-400 mb-6">
          {contest.description}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <strong>Type:</strong>{" "}
            {contest.type}
          </div>

          <div>
            <strong>Status:</strong>{" "}
            {contest.status}
          </div>

          <div>
            <strong>Max Participants:</strong>{" "}
            {contest.maxParticipants}
          </div>

          <div>
            <strong>Registration Duration:</strong>{" "}
            {contest.registrationDuration}
            {" "}Days
          </div>

          <div>
            <strong>Registration Start:</strong>{" "}
            {contest.registrationStartDate
              ? new Date(
                  contest.registrationStartDate
                ).toLocaleDateString()
              : "-"}
          </div>

          <div>
            <strong>Participants:</strong>{" "}
            {contest.participants?.length || 0}
          </div>
        </div>
      </div>
    </div>
  );
}