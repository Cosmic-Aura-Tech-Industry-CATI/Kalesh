import { useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";

import {
  useCreateAdmin,
  useDeleteAdmin,
  useGetAllAdmins,
} from "../../hooks/useAdmins";

import "../style/admin.css";                 // ✅ Common Admin CSS
import "../style/AdminManagement.css";      // ✅ Page Specific CSS

export default function AdminManagement() {
  /* ===============================
     API Hooks
  =============================== */

  const { data: adminResponse = {}, isLoading: isAdminLoading } =
    useGetAllAdmins();

  const { mutate: createAdminAccount, isPending: isCreatingAdmin } =
    useCreateAdmin();

  const { mutate: removeAdminAccount } =
    useDeleteAdmin();

  /* ===============================
     Local State
  =============================== */

  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false);

  /* ===============================
     Form Handling
  =============================== */

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* ===============================
     Utility Functions
  =============================== */

  const formatDateTime = (isoDateString) => {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  /* ===============================
     Event Handlers
  =============================== */

  const handleDisableAdmin = (adminId) => {
    removeAdminAccount(adminId);
  };

  const openCreateAdminModal = () => {
    reset();
    setIsCreateModalOpen(true);
  };

  const handleCreateAdminSubmit = (formData) => {
    createAdminAccount(formData, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
    });
  };

  /* ===============================
     Table Configuration
  =============================== */

  const adminTableColumns = [
    { key: "name", label: "Admin Name" },

    { key: "email", label: "Email Address" },

    {
      key: "role",
      label: "Role Type",
      render: (role) => (
        <span
          className={`admin-role-badge role-${role
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {role}
        </span>
      ),
    },

    {
      key: "status",
      label: "Account Status",
      render: (status) => (
        <span className="admin-status-badge">
          {status}
        </span>
      ),
    },

    {
      key: "lastLogin",
      label: "Last Login",
      render: (date) => formatDateTime(date),
    },

    {
      key: "actions",
      label: "Actions",
      render: (_, rowData) => (
        <Button
          size="sm"
          variant="danger"
          onClick={() =>
            handleDisableAdmin(rowData._id)
          }
        >
          Disable
        </Button>
      ),
    },
  ];

  /* ===============================
     Render
  =============================== */

  return (
    <div className="admin-section admin-management-page">

      <div className="admin-section-header">
        <h1 className="admin-page-title">
          Admin & Role Management
        </h1>

        <Button onClick={openCreateAdminModal}>
          Add Admin
        </Button>
      </div>

      {isAdminLoading ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={adminTableColumns}
          data={adminResponse?.data || []}
        />
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Admin"
      >
        <form onSubmit={handleSubmit(handleCreateAdminSubmit)}>

          {/* Name */}
          <div className="admin-form-group">
            <label className="admin-form-label">
              Admin Name
            </label>

            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="admin-form-input"
              placeholder="Enter admin name"
            />

            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="admin-form-group">
            <label className="admin-form-label">
              Email Address
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="admin-form-input"
              placeholder="Enter email address"
            />

            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Role */}
          <div className="admin-form-group">
            <label className="admin-form-label">
              Role
            </label>

            <select
              {...register("role", {
                required: "Role is required",
              })}
              className="admin-form-select"
            >
              <option value="Moderator">
                Moderator
              </option>
              <option value="Support">
                Support
              </option>
              <option value="Super Admin">
                Super Admin
              </option>
            </select>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isCreatingAdmin}
          >
            {isCreatingAdmin
              ? "Adding..."
              : "Add Admin"}
          </Button>

        </form>
      </Modal>
    </div>
  );
}
