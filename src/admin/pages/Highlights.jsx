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
import { toastError } from "../../lib/toast";
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
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [highlightToDelete, setHighlightToDelete] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState("");

  const { mutate: createHighlight, isPending: isCreatingHighlight } =
    useCreateHighlight();
  const { mutate: updateHighlight, isPending: isUpdatingHighlight } =
    useUpdateHighlight();
  const { mutate: deleteHighlightMutate, isPending: isDeletingHighlight } =
    useDeleteHighlight();

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
  const { mutate: deleteCategory, isPending: isDeletingCategory } =
    useDeleteHighlightCategory();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Highlights for the stats cards
  const statsHighlights = Array.isArray(allHighlightsResponse?.data)
    ? allHighlightsResponse.data
    : Array.isArray(allHighlightsResponse)
    ? allHighlightsResponse
    : [];
  // Highlights for the grid (filtered by active category)
  const gridHighlights = Array.isArray(highlightsResponse?.data)
    ? highlightsResponse.data
    : Array.isArray(highlightsResponse)
    ? highlightsResponse
    : [];
  const categories = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : Array.isArray(categoriesData)
    ? categoriesData
    : [];

  useEffect(() => {
    if (!activeCategoryId && categories.length > 0) {
      setActiveCategoryId(categories[0]._id);
    }
  }, [categories, activeCategoryId]);

  // Keyboard accessibility: Close modals on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (categoryToDelete && !isDeletingCategory) {
          setCategoryToDelete(null);
        } else if (highlightToDelete && !isDeletingHighlight) {
          setHighlightToDelete(null);
        } else if (categoryModal && !isCreatingCategory && !isUpdatingCategory) {
          setCategoryModal(false);
          setEditingCategory(null);
        } else if (openModal && !isCreatingHighlight && !isUpdatingHighlight) {
          setOpenModal(false);
          setEditingHighlight(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    categoryToDelete,
    highlightToDelete,
    categoryModal,
    openModal,
    isDeletingCategory,
    isDeletingHighlight,
    isCreatingCategory,
    isUpdatingCategory,
    isCreatingHighlight,
    isUpdatingHighlight,
  ]);

  const onCategorySubmit = (data) => {
    const formData = new FormData();
    formData.append("type", data.type.trim());

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
    const targetCategory = editingHighlight
      ? editingHighlight.category
      : activeCategoryId;

    if (!targetCategory) {
      toastError("Please select or create a category first.");
      return;
    }

    const formData = new FormData();
    formData.append("category", targetCategory);
    formData.append("header", data.header);
    formData.append("description", data.description);
    if (data.link) formData.append("link", data.link);

    // Because the backend expects a single file (media is a String in the model),
    // we append the first file with field name 'media'
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

  const handleDeleteHighlight = (highlight) => {
    setHighlightToDelete(highlight);
  };

  const confirmDeleteHighlight = () => {
    if (!highlightToDelete) return;
    const highlightId = highlightToDelete._id || highlightToDelete.id;
    deleteHighlightMutate(highlightId, {
      onSuccess: () => {
        setHighlightToDelete(null);
      },
    });
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setValue("type", category.type);
    setCategoryModal(true);
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
  };

  const confirmDeleteCategory = () => {
    if (!categoryToDelete) return;
    deleteCategory(categoryToDelete._id, {
      onSuccess: () => {
        if (activeCategoryId === categoryToDelete._id) {
          const remaining = categories.filter(
            (c) => c._id !== categoryToDelete._id
          );
          setActiveCategoryId(remaining.length > 0 ? remaining[0]._id : "");
        }
        setCategoryToDelete(null);
      },
    });
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
            onClick={() => {
              setEditingHighlight(null);
              setOpenModal(true);
            }}
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
                deleteHighlight={() => handleDeleteHighlight(item)}
                editHighlight={() => handleEditHighlight(item)}
              />
            ))
          ) : (
            <div className="empty-highlights">No highlights available</div>
          )}
        </div>

        <HighlightModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setEditingHighlight(null);
          }}
          category={
            editingHighlight
              ? categories.find((c) => c._id === editingHighlight.category)?.type
              : categories.find((c) => c._id === activeCategoryId)?.type || ""
          }
          editingHighlight={editingHighlight}
          isLoading={isCreatingHighlight || isUpdatingHighlight}
          onSave={handleAddHighlight}
        />
      </div>

      {categoryModal && (
        <div
          className="category-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isCreatingCategory && !isUpdatingCategory) {
              setCategoryModal(false);
              setEditingCategory(null);
            }
          }}
        >
          <form className="category-modal" onSubmit={handleSubmit(onCategorySubmit)}>
            <div className="category-modal-header">
              <h2>{editingCategory ? "Edit" : "Create"} Category</h2>
              <button
                type="button"
                onClick={() => {
                  setCategoryModal(false);
                  setEditingCategory(null);
                }}
              >
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
              <button
                type="button"
                className="category-cancel-btn"
                onClick={() => {
                  setCategoryModal(false);
                  setEditingCategory(null);
                }}
                disabled={isCreatingCategory || isUpdatingCategory}
              >
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

      {/* ===== DELETE CATEGORY CONFIRMATION MODAL ===== */}
      {categoryToDelete && (
        <div
          className="category-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-category-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDeletingCategory) {
              setCategoryToDelete(null);
            }
          }}
        >
          <div className="category-delete-modal">
            <div className="category-delete-icon-wrapper">
              <div className="category-delete-icon-bg">
                <Trash2 size={28} />
              </div>
            </div>

            <div className="category-delete-content">
              <h2 id="delete-category-modal-title">Delete Category?</h2>
              <p className="category-delete-desc">
                Are you sure you want to delete{" "}
                <span className="category-delete-target-name">
                  "{categoryToDelete.type}"
                </span>
                ?
              </p>
              <p className="category-delete-warning">
                This action cannot be undone and will permanently remove this category.
              </p>
            </div>

            <div className="category-delete-footer">
              <button
                type="button"
                className="category-cancel-btn"
                onClick={() => setCategoryToDelete(null)}
                disabled={isDeletingCategory}
              >
                Cancel
              </button>
              <button
                type="button"
                className="category-delete-confirm-btn"
                onClick={confirmDeleteCategory}
                disabled={isDeletingCategory}
              >
                {isDeletingCategory ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE HIGHLIGHT CONFIRMATION MODAL ===== */}
      {highlightToDelete && (
        <div
          className="category-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-highlight-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDeletingHighlight) {
              setHighlightToDelete(null);
            }
          }}
        >
          <div className="category-delete-modal">
            <div className="category-delete-icon-wrapper">
              <div className="category-delete-icon-bg">
                <Trash2 size={28} />
              </div>
            </div>

            <div className="category-delete-content">
              <h2 id="delete-highlight-modal-title">Delete Highlight?</h2>
              <p className="category-delete-desc">
                Are you sure you want to delete{" "}
                <span className="category-delete-target-name">
                  "{highlightToDelete.header}"
                </span>
                ?
              </p>
              <p className="category-delete-warning">
                This action cannot be undone and will permanently remove this highlight.
              </p>
            </div>

            <div className="category-delete-footer">
              <button
                type="button"
                className="category-cancel-btn"
                onClick={() => setHighlightToDelete(null)}
                disabled={isDeletingHighlight}
              >
                Cancel
              </button>
              <button
                type="button"
                className="category-delete-confirm-btn"
                onClick={confirmDeleteHighlight}
                disabled={isDeletingHighlight}
              >
                {isDeletingHighlight ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
