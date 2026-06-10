import { useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function Wallpapers() {
  const [open, setOpen] = useState(false);
  const [wallpapers, setWallpapers] = useState([]);

  const columns = [
    {
      key: "image",
      label: "Preview",
      render: (image) => (
        <img src={image} alt="" className="w-16 h-12 rounded object-cover" />
      ),
    },

    {
      key: "name",
      label: "Name",
    },

    {
      key: "category",
      label: "Category",
    },

    {
      key: "accessType",
      label: "Access",
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
        <div className="flex gap-2">
          <Button size="sm">Edit</Button>

          <Button size="sm" variant="danger">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Wallpaper Management</h1>

        <Button onClick={() => setOpen(true)}>Add Wallpaper</Button>
      </div>

      {/* TABLE */}
      <Table columns={columns} data={wallpapers} />

      {/* ADD WALLPAPER MODAL */}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Wallpaper">
        <div className="space-y-4">
          <input
            placeholder="Wallpaper Name"
            className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white"
          />

          <select className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white">
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="purchase">Purchase</option>
          </select>

          <input type="file" className="w-full text-white" />

          <Button className="w-full">Save Wallpaper</Button>
        </div>
      </Modal>
    </div>
  );
}
