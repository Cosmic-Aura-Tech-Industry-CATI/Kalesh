import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";

import {
  useCreateAdmin,
  useDeleteAdmin,
  useGetAllAdmins,
  useDisableAdmin,
  useActivateAdmin,
} from "../../hooks/useAdmins";

import "../style/admin.css"; // ✅ Common CSS
import "../style/AdminManagement.css"; // ✅ Page Specific CSS

export default function AdminManagement() {
  /* ================================
     API Hooks
  ================================= */

  const { data: adminResponse = {}, isLoading: isAdminLoading } =
    useGetAllAdmins();

  const { mutate: createAdminAccount, isPending: isCreatingAdmin } =
    useCreateAdmin();

  const { mutate: disableAdminAccount } = useDisableAdmin();

  const { mutate: activateAdminAccount } = useActivateAdmin();

  const { mutate: deleteAdminAccount } = useDeleteAdmin();

  /* ================================
     Local State
  ================================= */

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /* ================================
     Form Setup
  ================================= */

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* ================================
     Utility Functions
  ================================= */

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  /* ================================
     Event Handlers
  ================================= */

  const handleDisableAdmin = (adminId) => {
    deleteAdminAccount(adminId);
  };

  const handleActivateAdmin = (adminId) => {
    activateAdminAccount(adminId);
  };

  const handleDeleteAdmin = (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      deleteAdminAccount(adminId);
    }
  };

  const openCreateAdminModal = () => {
    reset();
    setIsPasswordVisible(false);
    setIsCreateModalOpen(true);
  };

  const handleCreateAdminSubmit = (formData) => {
    createAdminAccount(formData, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
    });
  };

  /* ================================
     Table Configuration
  ================================= */

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
      render: (status) => <span className="admin-status-badge">{status}</span>,
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
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Disable */}
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDisableAdmin(rowData._id)}
          >
            Disable
          </Button>

          {/* Activate */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleActivateAdmin(rowData._id)}
          >
            Activate
          </Button>

          {/* Delete */}
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDeleteAdmin(rowData._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  /* ================================
     Render
  ================================= */

  return (
    <div className="admin-section admin-management-page">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Admin & Role Management</h1>

        <Button onClick={openCreateAdminModal}>Add Admin</Button>
      </div>

      {isAdminLoading ? (
        <div>Loading...</div>
      ) : (
        <Table columns={adminTableColumns} data={adminResponse?.data || []} />
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Admin"
      >
        <form onSubmit={handleSubmit(handleCreateAdminSubmit)}>
          {/* Admin Name */}
          <div className="admin-form-group">
            <label className="admin-form-label">Admin Name</label>

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
            <label className="admin-form-label">Email Address</label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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

          {/* Password */}
          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>

            <div className="admin-password-wrapper">
              <input
                type={isPasswordVisible ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="admin-form-input admin-password-input"
                placeholder="Enter password"
              />

              <span
                className="admin-password-toggle"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Role */}
          <div className="admin-form-group">
            <label className="admin-form-label">Role</label>

            <select
              {...register("role", {
                required: "Role is required",
              })}
              className="admin-form-select"
            >
              <option value="moderator">moderator</option>
              <option value="support">support</option>
              <option value="admin">admin</option>
            </select>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isCreatingAdmin}>
            {isCreatingAdmin ? "Adding..." : "Add Admin"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
