import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Sparkles,
  ImagePlus,
  Trophy,
  Flame,
  Star,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

import HighlightModal from "../components/HighlightModal";
import HighlightCard from "../components/HighlightCard";
import {
  useGetAllHighlights,
  useCreateHighlight,
  useDeleteHighlight,
  useUpdateHighlight,
  useGetHighlightsByCategory,
} from "../../hooks/useHighlight";
import {
  useGetAllHighlightCategories,
  useCreateHighlightCategory,
  useUpdateHighlightCategory,
  useDeleteHighlightCategory,
} from "../../hooks/useHighlightCategory";
import "../style/highlights.css";

export default function Highlights() {
  const [openModal, setOpenModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingHighlight, setEditingHighlight] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState("");

  const { mutate: createHighlight } = useCreateHighlight();
  const { mutate: updateHighlight } = useUpdateHighlight();
  const { mutate: deleteHighlightMutate } = useDeleteHighlight();

  // Fetch all highlights for stats
  const { data: allHighlightsResponse } = useGetAllHighlights();

  const { data: highlightsResponse, isLoading: areHighlightsLoading } =
    useGetHighlightsByCategory(activeCategoryId);

  const { data: categoriesData, isLoading: areCategoriesLoading } =
    useGetAllHighlightCategories();
  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateHighlightCategory();
  const { mutate: updateCategory, isPending: isUpdatingCategory } =
    useUpdateHighlightCategory();
  const { mutate: deleteCategory } = useDeleteHighlightCategory();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Highlights for the stats cards
  const statsHighlights = allHighlightsResponse?.data || allHighlightsResponse || [];
  // Highlights for the grid (filtered by active category)
  const gridHighlights = highlightsResponse?.data || highlightsResponse || [];
  const categories = categoriesData?.data || [];

  useEffect(() => {
    if (!activeCategoryId && categories.length > 0) {
      setActiveCategoryId(categories[0]._id);
    }
  }, [categories, activeCategoryId]);

  const onCategorySubmit = (data) => {
    const formData = new FormData();
    formData.append("type", data.type);

    // Use the file from react-hook-form's data object
    if (data.coverImage && data.coverImage.length > 0) {
      formData.append("coverImage", data.coverImage[0]);
    }

    const options = {
      onSuccess: () => {
        setCategoryModal(false);
        reset();
        setCoverImageFile(null);
        setEditingCategory(null);
      },
    };

    if (editingCategory) {
      updateCategory({ id: editingCategory._id, payload: formData }, options);
    } else {
      createCategory(formData, options);
    }
  };

  const handleAddHighlight = (data) => {
    const formData = new FormData();

    if (editingHighlight) {
      formData.append("category", editingHighlight.category);
    } else {
      formData.append("category", activeCategoryId);
    }

    formData.append("header", data.header);
    formData.append("description", data.description);
    if (data.link) formData.append("link", data.link);

    // Because the backend expects a single file (media is a String in the model),
    // we should only append the first file instead of looping and appending multiple.
    if (data.files && data.files.length > 0) {
      formData.append("media", data.files[0].file);
    }

    const options = {
      onSuccess: () => {
        setOpenModal(false);
        setEditingHighlight(null);
      },
    };

    if (editingHighlight) {
      updateHighlight({ id: editingHighlight._id, payload: formData }, options);
    } else {
      createHighlight(formData, options);
    }
  };

  const deleteHighlight = (id) => {
    if (window.confirm("Are you sure you want to delete this highlight?")) {
      deleteHighlightMutate(id, {
        onSuccess: () => setEditingHighlight(null),
      });
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setValue("type", category.type);
    setCategoryModal(true);
  };

  const handleDeleteCategory = (category) => {
    if (
      window.confirm(`Are you sure you want to delete "${category.type}"?`)
    ) {
      deleteCategory(category._id);
    }
  };

  const handleEditHighlight = (highlight) => {
    setEditingHighlight(highlight);
    setOpenModal(true);
  };

  return (
    <div className="admin-container">
      <div className="admin-page-wrapper">
        <div className="highlights-header">
          <div>
            <h1 className="admin-page-title">Highlights Management</h1>

            <p className="admin-page-subtitle">
              Manage app highlights professionally
            </p>
          </div>

          <button
            className="admin-btn-primary highlights-add-btn"
            onClick={() => setOpenModal(true)}
          >
            <ImagePlus size={18} />
            Add Highlight
          </button>
        </div>

        {/* STATS */}

        <div className="admin-stats-grid">
          <div className="highlight-stat-card">
            <Sparkles />
            <div>
              <h2>{statsHighlights.length}</h2>
              <p>Total Highlights</p>
            </div>
          </div>

          {categories.map((cat) => (
            <div className="highlight-stat-card" key={cat._id}>
              <img
                src={cat.coverImage}
                alt={cat.type}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <h2>
                  {statsHighlights.filter((h) => h.category === cat._id).length}
                </h2>
                <p>{cat.type}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CATEGORY TABS */}

        <div className="highlight-tabs">
          {areCategoriesLoading ? (
            <div>Loading categories...</div>
          ) : (
            categories.map((cat) => (
              <div key={cat._id} className="highlight-tab-wrapper">
                <button
                  onClick={() => setActiveCategoryId(cat._id)}
                  className={`highlight-tab ${
                    activeCategoryId === cat._id ? "active" : ""
                  }`}
                >
                  <img src={cat.coverImage} alt={cat.type} className="h-5 w-5 rounded-full object-cover" />
                  {cat.type}
                </button>
                <div className="highlight-tab-actions">
                  <button className="edit-category-btn" onClick={() => handleEditCategory(cat)}>
                    <Edit size={12} />
                  </button>
                  <button className="delete-category-btn" onClick={() => handleDeleteCategory(cat)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* ADD CATEGORY BUTTON */}
          <button
            className="highlight-add-category"
            onClick={() => {
              setEditingCategory(null);
              reset();
              setCoverImageFile(null);
              setCategoryModal(true);
            }}
          >
            <Plus size={18} />
          </button>
        </div>

        {/* GRID */}

        <div className="highlights-grid">
          {areHighlightsLoading ? <div>Loading highlights...</div> : gridHighlights.length > 0 ? (
            gridHighlights.map((item) => (
              <HighlightCard
                key={item._id || item.id}
                item={item}
                deleteHighlight={() => deleteHighlight(item._id || item.id)}
                editHighlight={() => handleEditHighlight(item)}
              />
            ))
          ) : (
            <div className="empty-highlights">No highlights available</div>
          )}
        </div>

        <HighlightModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          category={
            editingHighlight
              ? categories.find((c) => c._id === editingHighlight.category)?.type
              : categories.find((c) => c._id === activeCategoryId)?.type || ""
          }
          editingHighlight={editingHighlight}
          onSave={handleAddHighlight}
        />
      </div>

      {categoryModal && (
        <div className="category-modal-overlay">
          <form className="category-modal" onSubmit={handleSubmit(onCategorySubmit)}>
            <div className="category-modal-header">
              <h2>{editingCategory ? "Edit" : "Create"} Category</h2>
              <button type="button" onClick={() => setCategoryModal(false)}>
                ✕
              </button>
            </div>

            <div className="category-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Category Name</label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  {...register("type", {
                    required: "Type is required",
                    minLength: {
                      value: 3,
                      message: "Type must be at least 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Type cannot exceed 50 characters",
                    },
                  })}
                  className="category-input"
                />
                {errors.type && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.type.message}
                  </span>
                )}
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">
                  Cover Image{" "}
                  {editingCategory ? "(Leave empty to keep current)" : "*"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImageFile(e.target.files[0])}
                  className="admin-form-input"
                  {...register("coverImage", { required: !editingCategory })}
                />
                 {errors.coverImage && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.coverImage.message}
                  </span>
                )}
              </div>
            </div>

            <div className="category-modal-footer">
              <button type="button" className="category-cancel-btn" onClick={() => setCategoryModal(false)}>
                Cancel
              </button>
              <button
                type="submit"
                className="category-create-btn"
                disabled={isCreatingCategory || isUpdatingCategory}
              >
                {isCreatingCategory || isUpdatingCategory ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
