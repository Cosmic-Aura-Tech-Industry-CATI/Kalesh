import { useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { mockAdmins } from "../data/mockData";
import { useCreateAdmin, useDeleteAdmin, useGetAllAdmins } from "../../hooks/useAdmins";
import "../style/admin.css";

export default function Admins() {
  const { data: admins = [], isLoading } = useGetAllAdmins();
  const { mutate: createAdmin, isPending } = useCreateAdmin();
  const { mutate: deleteAdmin } = useDeleteAdmin()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function formatDate(isoDate) {
    const date = new Date(isoDate);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
  
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const handleDisable = (adminId) => {
    deleteAdmin(adminId)
  };

  const handleAddAdmin = () => {
    reset();
    setIsModalOpen(true);
  };

  const onSubmit = (data) => {
    createAdmin(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (role) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            role === "Super Admin"
              ? "bg-red-500/20 text-red-400"
              : role === "Moderator"
              ? "bg-blue-500/20 text-blue-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {role}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
          {status}
        </span>
      ),
    },
    { key: "lastLogin", label: "Last Login", render: (date) => formatDate(date) },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <Button
          size="sm"
          variant="danger"
          onClick={() => handleDisable(row._id)}
        >
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

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} data={admins.data} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Admin"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 sm:px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter name"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 sm:px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
              placeholder="Enter email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full px-3 sm:px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
            >
              <option value="Moderator">Moderator</option>
              <option value="Support">Support</option>
              <option value="Super Admin">Super Admin</option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-xs">
                {errors.role.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Adding..." : "Add Admin"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
