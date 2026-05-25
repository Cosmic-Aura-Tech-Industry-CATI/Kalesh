import { useState } from "react";
import { Sparkles, ImagePlus, Trophy, Flame, Star, Plus } from "lucide-react";

import HighlightModal from "../components/HighlightModal";
import HighlightCard from "../components/HighlightCard";
import "../style/highlights.css";

export default function Highlights() {
  const [categories, setCategories] = useState([
    {
      key: "user",
      label: "User of the Week",
      icon: Trophy,
    },
    {
      key: "post",
      label: "Post of the Day",
      icon: Flame,
    },
    {
      key: "brand",
      label: "Brand of the Week",
      icon: Star,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("user");

  const [openModal, setOpenModal] = useState(false);

  const [highlights, setHighlights] = useState([]);

  const [categoryModal, setCategoryModal] = useState(false);

  const [newCategory, setNewCategory] = useState("");

  const addNewCategory = () => {
    if (!newCategory.trim()) return;

    const slug = newCategory.toLowerCase().replace(/\s+/g, "-");

    const exists = categories.find((cat) => cat.key === slug);

    if (exists) {
      alert("Category already exists");
      return;
    }

    setCategories((prev) => [
      ...prev,
      {
        key: slug,
        label: newCategory,
        icon: Plus,
      },
    ]);

    setNewCategory("");
    setCategoryModal(false);
  };

  const filteredHighlights = highlights.filter(
    (item) => item.category === activeCategory,
  );

  const handleAddHighlight = (data) => {
    setHighlights((prev) => [
      {
        id: Date.now(),
        ...data,
      },
      ...prev,
    ]);
  };

  const deleteHighlight = (id) => {
    setHighlights((prev) => prev.filter((item) => item.id !== id));
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
              <h2>{highlights.length}</h2>
              <p>Total Highlights</p>
            </div>
          </div>

          <div className="highlight-stat-card">
            <Trophy />
            <div>
              <h2>{highlights.filter((i) => i.category === "user").length}</h2>
              <p>User of Week</p>
            </div>
          </div>

          <div className="highlight-stat-card">
            <Flame />
            <div>
              <h2>{highlights.filter((i) => i.category === "post").length}</h2>
              <p>Post of Day</p>
            </div>
          </div>

          <div className="highlight-stat-card">
            <Star />
            <div>
              <h2>{highlights.filter((i) => i.category === "brand").length}</h2>
              <p>Brand of Week</p>
            </div>
          </div>
        </div>

        {/* CATEGORY TABS */}

        <div className="highlight-tabs">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`highlight-tab ${
                  activeCategory === cat.key ? "active" : ""
                }`}
              >
                <Icon size={18} />
                {cat.label}
              </button>
            );
          })}

          {/* ADD CATEGORY BUTTON */}

          <button
            className="highlight-add-category"
            onClick={() => setCategoryModal(true)}
          >
            <Plus size={18} />
          </button>
        </div>

        {/* GRID */}

        <div className="highlights-grid">
          {filteredHighlights.length > 0 ? (
            filteredHighlights.map((item) => (
              <HighlightCard
                key={item.id}
                item={item}
                deleteHighlight={deleteHighlight}
              />
            ))
          ) : (
            <div className="empty-highlights">No highlights available</div>
          )}
        </div>

        <HighlightModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          category={activeCategory}
          onSave={handleAddHighlight}
        />
      </div>

      {categoryModal && (
        <div className="category-modal-overlay">
          <div className="category-modal">
            <div className="category-modal-header">
              <h2>Create Category</h2>

              <button onClick={() => setCategoryModal(false)}>✕</button>
            </div>

            <div className="category-modal-body">
              <input
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="category-input"
              />
            </div>

            <div className="category-modal-footer">
              <button
                className="category-cancel-btn"
                onClick={() => setCategoryModal(false)}
              >
                Cancel
              </button>

              <button className="category-create-btn" onClick={addNewCategory}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
