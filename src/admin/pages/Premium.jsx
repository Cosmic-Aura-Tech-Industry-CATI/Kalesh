import { useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import {
  useGetAllPlans,
  useCreatePlan,
  useUpdatePlan,
  useUpdatePrice,
  useGetSubscribedUsers,
} from "../../hooks/useSubscription";
import "../style/admin.css";

export default function Premium() {

  const [isCreateModal, setIsCreateModal] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: plansData, isLoading: isPlansLoading } = useGetAllPlans();
  const { data: userSubsData, isLoading: isUserSubsLoading } = useGetSubscribedUsers();

  const { mutate: createPlanMutate, isPending: isCreating } = useCreatePlan();
  const { mutate: updatePlanMutate, isPending: isUpdating } = useUpdatePlan();
  const { mutate: updatePriceMutate } = useUpdatePrice();

  const plans = plansData?.data?.plans || plansData?.plans || [];
  const userSubs = userSubsData?.data?.userSubscriptions || userSubsData?.userSubscriptions || [];

  // ==========================
  // SUBMIT (CREATE / UPDATE)
  // ==========================

  const onSubmit = (data) => {
    const payload = {
      ...data,
      features: data.features.split(",").map((f) => f.trim()),
      durationInDays: Number(data.durationInDays),
    };

    if (editingPlanId) {
      updatePlanMutate(
        { id: editingPlanId, payload },
        {
          onSuccess: () => {
            setIsCreateModal(false);
            setEditingPlanId(null);
            reset();
          },
        }
      );
    } else {
      createPlanMutate(payload, {
        onSuccess: () => {
          setIsCreateModal(false);
          reset();
        },
      });
    }
  };

  // ==========================
  // UPDATE PRICE
  // ==========================

  const updatePrice = (planId) => {
    const newPrice = prompt("Enter new price");
    if (newPrice) {
      updatePriceMutate({ id: planId, payload: { price: Number(newPrice) } });
    }
  };

  // ==========================
  // ACTIVATE / DEACTIVATE
  // ==========================

  const togglePlan = (plan) => {
    updatePlanMutate({
      id: plan._id,
      payload: { isActive: !plan.isActive },
    });
  };

  // ==========================
  // EDIT PLAN
  // ==========================

  const handleEdit = (plan) => {
    setEditingPlanId(plan._id);
    setValue("title", plan.title);
    setValue("description", plan.description);
    setValue("durationInDays", plan.durationInDays);
    setValue("features", plan.features ? plan.features.join(", ") : "");
    setIsCreateModal(true);
  };

  // ==========================
  // COUNT USERS PER PLAN
  // ==========================

  const getUserCount = (planId) => {
    return userSubs.filter(
      (sub) => sub.subscriptionId?._id === planId
    ).length;
  };

  // ==========================
  // PLAN TABLE
  // ==========================

  const planColumns = [

    { key: "title", label: "Plan Name" },

    { key: "durationInDays", label: "Duration" },

    {
      key: "price",
      label: "Price",
      render: (_, row) => `₹${row.currentPriceId?.finalPrice || 0}`
    },

    {
      key: "users",
      label: "Users",
      render: (_, row) => getUserCount(row._id)
    },

    {
      key: "status",
      label: "Status",
      render: (_, row) => (
        <span className={row.isActive ? "admin-badge-success" : "admin-badge-danger"}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      )
    },

    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">

          <Button size="sm" onClick={() => handleEdit(row)}>
            Edit
          </Button>

          <Button size="sm" onClick={() => updatePrice(row._id)}>
            Price
          </Button>

          <Button
            size="sm"
            variant={row.isActive ? "danger" : "primary"}
            onClick={() => togglePlan(row)}
          >
            {row.isActive ? "Deactivate" : "Activate"}
          </Button>

        </div>
      )
    }
  ];

  // ==========================
  // USER SUBS TABLE
  // ==========================

  const userColumns = [

    {
      key: "email",
      label: "User",
      render: (_, row) => row.userId?.email || "Unknown"
    },

    {
      key: "plan",
      label: "Plan",
      render: (_, row) => row.subscriptionId?.title || "N/A"
    },

    {
      key: "price",
      label: "Price",
      render: (_, row) => `₹${row.priceId?.finalPrice || 0}`
    },

    {
      key: "status",
      label: "Status",
      render: (_, row) => (
        <span className={row.status === "active" ? "admin-badge-success" : "admin-badge-warning"}>
          {row.status}
        </span>
      )
    },

    {
      key: "startDate",
      label: "Start",
      render: (_, row) => new Date(row.startDate).toLocaleDateString()
    },

    {
      key: "endDate",
      label: "End",
      render: (_, row) => new Date(row.endDate).toLocaleDateString()
    }

  ];

  return (
    <div className="admin-section">

      <div className="admin-section-header">
        <h1 className="admin-page-title">Premium Plans</h1>
        <Button onClick={() => {
          setEditingPlanId(null);
          reset();
          setIsCreateModal(true);
        }}>
          Create Plan
        </Button>
      </div>

      <Table columns={planColumns} data={isPlansLoading ? [] : plans} />

      <h2 className="admin-page-title mt-10">
        User Subscriptions
      </h2>

      <Table columns={userColumns} data={isUserSubsLoading ? [] : userSubs} />

      {/* CREATE PLAN MODAL */}

      <Modal
        isOpen={isCreateModal}
        onClose={() => {
          setIsCreateModal(false);
          setEditingPlanId(null);
          reset();
        }}
        title={editingPlanId ? "Edit Plan" : "Create Plan"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              placeholder="Plan Title"
              className="admin-form-input"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
          </div>

          <div>
            <textarea
              placeholder="Description"
              className="admin-form-textarea"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
          </div>

          <div>
            <input
              type="number"
              placeholder="Duration (days)"
              className="admin-form-input"
              {...register("durationInDays", { required: "Duration is required" })}
            />
            {errors.durationInDays && <span className="text-red-500 text-xs">{errors.durationInDays.message}</span>}
          </div>

          <div>
            <input
              placeholder="Features (comma separated)"
              className="admin-form-input"
              {...register("features", { required: "Features are required" })}
            />
            {errors.features && <span className="text-red-500 text-xs">{errors.features.message}</span>}
          </div>

          <Button type="submit" className="w-full" disabled={isCreating || isUpdating}>
            {isCreating || isUpdating ? "Saving..." : editingPlanId ? "Update Plan" : "Create Plan"}
          </Button>
        </form>

      </Modal>

    </div>
  );
}