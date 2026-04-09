import { useState } from "react";
import { useCreateBlog } from "../../hooks/useBlogs";
import "../style/blog.css";

export default function AdminBlog() {
  const { mutate: createBlog, isPending: isCreating } = useCreateBlog();

  const [blocks, setBlocks] = useState([]);
  const [readTime, setReadTime] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState(null); // ✅ single image

  // ➕ ADD BLOCK
  const addBlock = (type) => {
    setBlocks((prev) => [...prev, { id: Date.now(), type, value: "" }]);
  };

  // ✏️ UPDATE BLOCK
  const updateBlock = (id, value) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, value } : b)));
  };

  // ❌ DELETE BLOCK
  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // 🚀 SUBMIT
  const handleSubmit = () => {
    const formData = new FormData();

    // ✅ header ko title bana do
    const headerBlock = blocks.find((b) => b.type === "header");

    formData.append("title", headerBlock?.value || "Untitled");

    // ❌ header ko blocks me include nahi karna
    const filteredBlocks = blocks.filter((b) => b.type !== "header");

    formData.append("content", JSON.stringify(filteredBlocks));

    if (image) {
      formData.append("image", image);
    }

    formData.append("readTime", readTime);
    formData.append("featured", featured);
    formData.append("date", new Date().toDateString());

    createBlog(formData);
  };

  return (
    <div className="blog-form-container">
      <h2 className="blog-heading">Create Blog</h2>

      <div className="admin-card">
        {/* ✅ SINGLE IMAGE UPLOAD */}
        <div style={{ marginBottom: "20px" }}>
          <label className="blog-label">Upload Image</label>
          <input
            type="file"
            className="blog-input"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* 🔥 IMAGE PREVIEW */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{
                width: "150px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        {/* ➕ ADD BUTTONS */}
        <div className="blog-add-buttons">
          <button type="button" onClick={() => addBlock("header")}>
            + Main Header
          </button>

          <button type="button" onClick={() => addBlock("subheader")}>
            + Sub Header
          </button>

          <button type="button" onClick={() => addBlock("description")}>
            + Description
          </button>

          <button type="button" onClick={() => addBlock("bullets")}>
            + Bullet Points
          </button>
        </div>

        {/* 🧱 BLOCKS */}
        {blocks.map((block) => (
          <div key={block.id} className="blog-block">
            {/* DELETE BTN */}
            <button
              type="button"
              className="delete-btn"
              onClick={() => deleteBlock(block.id)}
            >
              ✕
            </button>

            {block.type === "header" && (
              <input
                placeholder="Main Header"
                className="blog-input"
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {block.type === "subheader" && (
              <input
                placeholder="Sub Header"
                className="blog-input"
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {block.type === "description" && (
              <textarea
                placeholder="Description"
                className="blog-textarea"
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {block.type === "bullets" && (
              <textarea
                placeholder="Bullet Points (comma separated)"
                className="blog-textarea"
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}
          </div>
        ))}

        {/* READ TIME */}
        <div style={{ marginTop: "20px" }}>
          <label className="blog-label">Read Time</label>
          <input
            className="blog-input"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
          />
        </div>

        {/* FEATURED */}
        <div className="blog-checkbox">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <span>Featured Blog</span>
        </div>

        {/* SUBMIT */}
        <button
          className="blog-submit-btn"
          onClick={handleSubmit}
          disabled={isCreating}
        >
          {isCreating ? "Posting..." : "Post Blog"}
        </button>
      </div>
    </div>
  );
}
