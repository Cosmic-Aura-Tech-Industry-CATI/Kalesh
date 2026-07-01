import { useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import {
  useGetAllWallpapers,
  useCreateWallpaper,
  useUpdateWallpaper,
  useDeleteWallpaper,
  useUpdateWallpaperPrice,
  useSetDefaultWallpaper,
} from "../../hooks/useWallpapers";
import { useGetAllPlans } from "../../hooks/useSubscription";

export default function Wallpapers() {
  const { data: wallpapersData, isLoading } = useGetAllWallpapers();
  const { data: plansData } = useGetAllPlans();

  const { mutate: createWallpaper, isPending: isCreating } = useCreateWallpaper();
  const { mutate: updateWallpaper, isPending: isUpdating } = useUpdateWallpaper();
  const { mutate: deleteWallpaper } = useDeleteWallpaper();
  const { mutate: updatePrice, isPending: isUpdatingPrice } = useUpdateWallpaperPrice();
  const { mutate: setDefault } = useSetDefaultWallpaper();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [priceWallpaperId, setPriceWallpaperId] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  const {
    register: registerWallpaper,
    handleSubmit: handleSubmitWallpaper,
    reset: resetWallpaper,
    setValue: setWallpaperValue,
    formState: { errors: wallpaperErrors },
  } = useForm();

  const {
    register: registerPrice,
    handleSubmit: handleSubmitPrice,
    reset: resetPrice,
    formState: { errors: priceErrors },
  } = useForm();

  const wallpapers = wallpapersData?.data?.data || wallpapersData?.data || wallpapersData || [];
  const plans = plansData?.data?.plans || plansData?.plans || plansData?.data?.data || [];

  const onWallpaperSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    
    if (data.subcription) {
      formData.append("subcription", data.subcription);
    }

    formData.append("isDefault", data.isDefault ? "true" : "false");

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (editingId) {
      updateWallpaper(
        { id: editingId, payload: formData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            resetWallpaper();
            setImageFile(null);
            setEditingId(null);
          },
        }
      );
    } else {
      createWallpaper(formData, {
        onSuccess: () => {
          setIsModalOpen(false);
          resetWallpaper();
          setImageFile(null);
        },
      });
    }
  };

  const onPriceSubmit = (data) => {
    updatePrice(
      {
        id: priceWallpaperId,
        payload: {
          amount: Number(data.amount),
          discount: Number(data.discount) || 0,
        },
      },
      {
        onSuccess: () => {
          setIsPriceModalOpen(false);
          resetPrice();
          setPriceWallpaperId(null);
        },
      }
    );
  };

  const handleEdit = (row) => {
    setEditingId(row._id || row.id);
    setWallpaperValue("name", row.name);
    setWallpaperValue("subcription", row.subcription?._id || row.subcription || "");
    setWallpaperValue("isDefault", row.isDefault);
    setIsModalOpen(true);
  };

  const handlePrice = (row) => {
    setPriceWallpaperId(row._id || row.id);
    resetPrice();
    setIsPriceModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this wallpaper?")) {
      deleteWallpaper(id);
    }
  };

  const handleSetDefault = (id) => {
    if (window.confirm("Are you sure you want to set this as the default wallpaper?")) {
      setDefault(id);
    }
  };

  const columns = [
    {
      key: "image",
      label: "Preview",
      render: (image) => (
        <img src={image} alt="" className="w-16 h-12 rounded object-cover bg-gray-800" />
      ),
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "price",
      label: "Price",
      render: (_, row) => (row.price ? `₹${row.price.finalPrice}` : "Free"),
    },
    {
      key: "isDefault",
      label: "Default",
      render: (isDefault) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            isDefault ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {isDefault ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            status
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => handleEdit(row)}>
            Edit
          </Button>

          <Button size="sm" variant="secondary" onClick={() => handlePrice(row)}>
            Price
          </Button>

          {!row.isDefault && (
            <Button size="sm" variant="primary" onClick={() => handleSetDefault(row._id || row.id)}>
              Set Default
            </Button>
          )}

          <Button size="sm" variant="danger" onClick={() => handleDelete(row._id || row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-section">
      {/* PAGE HEADER */}
      <div className="admin-section-header">
        <h1 className="admin-page-title">Wallpaper Management</h1>

        <Button
          onClick={() => {
            resetWallpaper();
            setEditingId(null);
            setImageFile(null);
            setIsModalOpen(true);
          }}
        >
          Add Wallpaper
        </Button>
      </div>

      {/* TABLE */}
      {isLoading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <Table columns={columns} data={wallpapers} />
      )}

      {/* ADD/EDIT WALLPAPER MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetWallpaper();
          setImageFile(null);
          setEditingId(null);
        }}
        title={editingId ? "Edit Wallpaper" : "Add Wallpaper"}
      >
        <form onSubmit={handleSubmitWallpaper(onWallpaperSubmit)} className="space-y-4">
          <div>
            <label className="admin-form-label">Name</label>
            <input
              {...registerWallpaper("name", { required: "Name is required" })}
              placeholder="Wallpaper Name"
              className="admin-form-input"
            />
            {wallpaperErrors.name && (
              <span className="text-red-500 text-xs">{wallpaperErrors.name.message}</span>
            )}
          </div>

          <div>
            <label className="admin-form-label">Subscription Plan (Optional)</label>
            <select {...registerWallpaper("subcription")} className="admin-form-select">
              <option value="">None / Free</option>
              {plans.map((plan) => (
                <option key={plan._id || plan.id} value={plan._id || plan.id}>
                  {plan.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" {...registerWallpaper("isDefault")} className="w-4 h-4" />
              Default
            </label>
          </div>

          <div>
            <label className="admin-form-label">
              Image {editingId ? "(Leave empty to keep current)" : "*"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="admin-form-input"
              required={!editingId}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? "Saving..." : "Save Wallpaper"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* PRICE MODAL */}
      <Modal
        isOpen={isPriceModalOpen}
        onClose={() => {
          setIsPriceModalOpen(false);
          resetPrice();
          setPriceWallpaperId(null);
        }}
        title="Update Price"
      >
        <form onSubmit={handleSubmitPrice(onPriceSubmit)} className="space-y-4">
          <div>
            <label className="admin-form-label">Amount</label>
            <input
              type="number"
              {...registerPrice("amount", {
                required: "Amount is required",
                min: { value: 0, message: "Cannot be negative" },
              })}
              placeholder="Amount"
              className="admin-form-input"
            />
            {priceErrors.amount && (
              <span className="text-red-500 text-xs">{priceErrors.amount.message}</span>
            )}
          </div>

          <div>
            <label className="admin-form-label">Discount</label>
            <input
              type="number"
              {...registerPrice("discount", {
                min: { value: 0, message: "Cannot be negative" },
              })}
              placeholder="Discount"
              className="admin-form-input"
            />
            {priceErrors.discount && (
              <span className="text-red-500 text-xs">{priceErrors.discount.message}</span>
            )}
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isUpdatingPrice}>
              {isUpdatingPrice ? "Updating..." : "Update Price"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
