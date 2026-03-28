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
  useGrantPlan,
  useRevokePlan,
} from "../../hooks/useSubscription";
import "../style/admin.css";

export default function Premium() {
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);

  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [grantData, setGrantData] = useState({
    user: "",
    plan: "",
  });

  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [priceData, setPriceData] = useState({
    amount: "",
    discount: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: plansData, isLoading: isPlansLoading } = useGetAllPlans();
  const { data: userSubsData, isLoading: isUserSubsLoading } =
    useGetSubscribedUsers();

  const { mutate: createPlanMutate, isPending: isCreating } = useCreatePlan();
  const { mutate: updatePlanMutate, isPending: isUpdating } = useUpdatePlan();
  const { mutate: updatePriceMutate } = useUpdatePrice();

  const { mutate: grantPlanMutate, isPending: isGranting } = useGrantPlan();
  const { mutate: revokePlanMutate } = useRevokePlan();

  const plans = plansData?.data?.plans || plansData?.plans || [];
  const userSubs =
    userSubsData?.data?.userSubscriptions ||
    userSubsData?.userSubscriptions ||
    [];

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
        },
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
    setSelectedPlanId(planId);
    setPriceData({ amount: "", discount: "" });
    setIsPriceModalOpen(true);
  };

  const handleUpdatePrice = () => {
    const payload = {
      amount: Number(priceData.amount),
      discount: Number(priceData.discount) || 0,
    };

    updatePriceMutate(
      { id: selectedPlanId, payload },
      {
        onSuccess: () => {
          setIsPriceModalOpen(false);
          setPriceData({ amount: "", discount: "" });
        },
      },
    );
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
    return userSubs.filter((sub) => sub.subscriptionId?._id === planId).length;
  };

  // ==========================
  // GRANT PREMIUM
  // ==========================

  const handleGrantPremium = () => {
    const selectedPlan = plans.find((p) => p._id === grantData.plan);
    const priceId =
      selectedPlan?.currentPriceId?._id || selectedPlan?.currentPriceId;

    const payload = {
      username: grantData.user,
      subscriptionId: grantData.plan,
      priceId: priceId,
    };

    grantPlanMutate(payload, {
      onSuccess: () => {
        setIsGrantModalOpen(false);
        setGrantData({ user: "", plan: "" });
      },
    });
  };

  const planColumns = [
    { key: "title", label: "Plan Name" },

    { key: "durationInDays", label: "Duration" },

    {
      key: "price",
      label: "Price",
      render: (_, row) => `₹${row.currentPriceId?.finalPrice || 0}`,
    },

    {
      key: "users",
      label: "Users",
      render: (_, row) => getUserCount(row._id),
    },

    {
      key: "status",
      label: "Status",
      render: (_, row) => (
        <span
          className={
            row.isActive ? "admin-badge-success" : "admin-badge-danger"
          }
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
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
      ),
    },
  ];

  // ==========================
  // USER SUBS TABLE
  // ==========================

  const userColumns = [
    {
      key: "username",
      label: "User",
      render: (_, row) => row.userId?.username || "Unknown",
    },

    {
      key: "plan",
      label: "Plan",
      render: (_, row) => row.subscriptionId?.title || "N/A",
    },

    {
      key: "price",
      label: "Price",
      render: (_, row) => `₹${row.priceId?.finalPrice || 0}`,
    },

    {
      key: "status",
      label: "Status",
      render: (_, row) => (
        <span
          className={
            row.status === "active"
              ? "admin-badge-success"
              : "admin-badge-warning"
          }
        >
          {row.status}
        </span>
      ),
    },

    {
      key: "startDate",
      label: "Start",
      render: (_, row) => new Date(row.startDate).toLocaleDateString(),
    },

    {
      key: "endDate",
      label: "End",
      render: (_, row) => new Date(row.endDate).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to revoke this plan?")
              ) {
                revokePlanMutate(row._id);
              }
            }}
          >
            Revoke
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h1 className="admin-page-title">Premium Plans</h1>
        <Button
          onClick={() => {
            setEditingPlanId(null);
            reset();
            setIsCreateModal(true);
          }}
        >
          Create Plan
        </Button>
      </div>

      <Table columns={planColumns} data={isPlansLoading ? [] : plans} />

      <div className="admin-section-header mt-10">
        <h2 className="admin-page-title">User Subscriptions</h2>

        <Button onClick={() => setIsGrantModalOpen(true)}>Grant Premium</Button>
      </div>

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
            {errors.title && (
              <span className="text-red-500 text-xs">
                {errors.title.message}
              </span>
            )}
          </div>

          <div>
            <textarea
              placeholder="Description"
              className="admin-form-textarea"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Duration (days)"
              className="admin-form-input"
              {...register("durationInDays", {
                required: "Duration is required",
              })}
            />
            {errors.durationInDays && (
              <span className="text-red-500 text-xs">
                {errors.durationInDays.message}
              </span>
            )}
          </div>

          <div>
            <input
              placeholder="Features (comma separated)"
              className="admin-form-input"
              {...register("features", { required: "Features are required" })}
            />
            {errors.features && (
              <span className="text-red-500 text-xs">
                {errors.features.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating
              ? "Saving..."
              : editingPlanId
                ? "Update Plan"
                : "Create Plan"}
          </Button>
        </form>
      </Modal>

      {/* UPDATE PRICE MODAL */}
      
      <Modal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        title="Update Price"
      >
        <div className="space-y-4">
          {/* PRICE */}
          <input
            type="number"
            placeholder="Enter Price"
            className="admin-form-input"
            value={priceData.amount}
            onChange={(e) =>
              setPriceData({ ...priceData, amount: e.target.value })
            }
          />

          {/* DISCOUNT */}
          <input
            type="number"
            placeholder="Discount (%)"
            className="admin-form-input"
            value={priceData.discount}
            onChange={(e) =>
              setPriceData({ ...priceData, discount: e.target.value })
            }
          />

          {/* FINAL PRICE PREVIEW */}
          {priceData.amount && (
            <div className="text-sm text-gray-400">
              Final Price: ₹
              {Math.max(
                0,
                priceData.amount -
                  (priceData.amount * (priceData.discount || 0)) / 100,
              )}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => setIsPriceModalOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleUpdatePrice} disabled={!priceData.amount}>
              Update
            </Button>
          </div>
        </div>
      </Modal>

      {/* GRANT PREMIUM MODAL */}

      <Modal
        isOpen={isGrantModalOpen}
        onClose={() => setIsGrantModalOpen(false)}
        title="Grant Premium"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="User Name / Email"
            className="admin-form-input"
            value={grantData.user}
            onChange={(e) =>
              setGrantData({ ...grantData, user: e.target.value })
            }
          />

          <select
            className="admin-form-select"
            value={grantData.plan}
            onChange={(e) =>
              setGrantData({ ...grantData, plan: e.target.value })
            }
          >
            <option value="">Select Plan</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.title}
              </option>
            ))}
          </select>

          <div className="flex gap-3 justify-end pt-2">
            {/*<Button
              variant="secondary"
              onClick={() => setIsGrantModalOpen(false)}
            >
              Close
            </Button> */}

            <Button
              onClick={handleGrantPremium}
              disabled={!grantData.user || !grantData.plan || isGranting}
            >
              {isGranting ? "Granting..." : "Grant"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
