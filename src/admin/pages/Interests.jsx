import { useState } from "react";
import "../style/interests.css";

import InterestTable from "../components/InterestTable";
import InterestModal from "../components/InterestModal";
import DeleteInterestModal from "../components/DeleteInterestModal";

import toast from "react-hot-toast";

import {
  useCreateInterest,
  useDeleteInterest,
  useGetInterests,
  useUpdateInterest,
} from "../../hooks/useInterests";

export default function Interests() {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedInterest, setSelectedInterest] = useState(null);


  const { data, isLoading } = useGetInterests();

  const createMutation = useCreateInterest();

  const updateMutation = useUpdateInterest();

  const deleteMutation = useDeleteInterest();

  const interests = data?.data || data || [];

  const handleCreate = (payload) => {
    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Interest created successfully.");

        setOpenModal(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      },
    });
  };

  const handleUpdate = (payload) => {
    updateMutation.mutate(
      {
        id: selectedInterest._id,
        data: payload,
      },
      {
        onSuccess: () => {
          toast.success("Interest updated successfully.");

          setOpenModal(false);

          setSelectedInterest(null);
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Something went wrong.",
          );
        },
      },
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(selectedInterest._id, {
      onSuccess: () => {
        toast.success(`"${selectedInterest.name}" deleted successfully`);

        setDeleteModal(false);
        setSelectedInterest(null);
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete interest.",
        );
      },
    });
  };

  return (
    <div className="interest-page">
      <div className="interest-header">
        <h2>Interest Management</h2>

        <button
          className="add-interest-btn"
          onClick={() => {
            setSelectedInterest(null);
            setOpenModal(true);
          }}
        >
          + Add Interest
        </button>
      </div>


      <InterestTable
        loading={isLoading}
        interests={interests}
        onEdit={(interest) => {
          setSelectedInterest(interest);
          setOpenModal(true);
        }}
        onDelete={(interest) => {
          setSelectedInterest(interest);
          setDeleteModal(true);
        }}
      />

      <InterestModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedInterest(null);
        }}
        interest={selectedInterest}
        loading={createMutation.isPending || updateMutation.isPending}
        onSubmit={selectedInterest ? handleUpdate : handleCreate}
      />

      <DeleteInterestModal
        open={deleteModal}
        loading={deleteMutation.isPending}
        interest={selectedInterest}
        onCancel={() => {
          setDeleteModal(false);
          setSelectedInterest(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
