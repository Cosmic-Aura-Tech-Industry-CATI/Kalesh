import { useEffect, useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import "../style/admin.css";

export default function Premium() {

  const [plans, setPlans] = useState([]);
  const [userSubs, setUserSubs] = useState([]);

  const [isCreateModal, setIsCreateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    durationInDays: "",
    features: ""
  });

  // ==========================
  // GET ALL PLANS
  // ==========================

  const fetchPlans = async () => {
    const res = await fetch("/api/plans");
    const data = await res.json();
    setPlans(data.data.plans || []);
  };

  // ==========================
  // GET USER SUBSCRIPTIONS
  // ==========================

  const fetchUserSubs = async () => {
    const res = await fetch("/api/plans/users");
    const data = await res.json();
    setUserSubs(data.data.userSubscriptions || []);
  };

  useEffect(() => {
    fetchPlans();
    fetchUserSubs();
  }, []);

  // ==========================
  // CREATE PLAN
  // ==========================

  const createPlan = async () => {

    await fetch("/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        features: formData.features.split(",")
      })
    });

    setIsCreateModal(false);
    fetchPlans();
  };

  // ==========================
  // UPDATE PLAN
  // ==========================

  const updatePlan = async (planId) => {

    await fetch(`/api/plans/${planId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    fetchPlans();
  };

  // ==========================
  // UPDATE PRICE
  // ==========================

  const updatePrice = async (planId) => {

    const newPrice = prompt("Enter new price");

    await fetch(`/api/plans/${planId}/price`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice })
    });

    fetchPlans();
  };

  // ==========================
  // ACTIVATE / DEACTIVATE
  // ==========================

  const togglePlan = async (plan) => {

    await fetch(`/api/plans/${plan._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isActive: !plan.isActive
      })
    });

    fetchPlans();
  };

  // ==========================
  // COUNT USERS PER PLAN
  // ==========================

  const getUserCount = (planId) => {
    return userSubs.filter(
      (sub) => sub.subscriptionId._id === planId
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

          <Button size="sm" onClick={() => updatePlan(row._id)}>
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
      render: (_, row) => row.userId.email
    },

    {
      key: "plan",
      label: "Plan",
      render: (_, row) => row.subscriptionId.title
    },

    {
      key: "price",
      label: "Price",
      render: (_, row) => `₹${row.priceId.finalPrice}`
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
        <Button onClick={() => setIsCreateModal(true)}>
          Create Plan
        </Button>
      </div>

      <Table columns={planColumns} data={plans} />

      <h2 className="admin-page-title mt-10">
        User Subscriptions
      </h2>

      <Table columns={userColumns} data={userSubs} />

      {/* CREATE PLAN MODAL */}

      <Modal
        isOpen={isCreateModal}
        onClose={() => setIsCreateModal(false)}
        title="Create Plan"
      >

        <div className="space-y-4">

          <input
            placeholder="Plan Title"
            className="admin-form-input"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="admin-form-textarea"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            placeholder="Duration (days)"
            className="admin-form-input"
            onChange={(e) =>
              setFormData({ ...formData, durationInDays: e.target.value })
            }
          />

          <input
            placeholder="Features (comma separated)"
            className="admin-form-input"
            onChange={(e) =>
              setFormData({ ...formData, features: e.target.value })
            }
          />

          <Button className="w-full" onClick={createPlan}>
            Create Plan
          </Button>

        </div>

      </Modal>

    </div>
  );
}