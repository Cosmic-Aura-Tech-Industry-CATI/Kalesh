import { useState } from "react";
import { useCreateBlog } from "../../hooks/useBlogs";
import "../style/blog.css";

export default function AdminBlog() {
  const { mutate: createBlog, isPending } = useCreateBlog();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [readTime, setReadTime] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState(null);

  // ➕ ADD BLOCK
  const addBlock = (type) => {
    setBlocks((prev) => [...prev, { id: Date.now(), type, value: "" }]);
  };

  // ✏️ UPDATE
  const updateBlock = (id, value) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, value } : b)));
  };

  // ❌ DELETE
  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // 🔥 HTML GENERATOR
  const generateHTML = () => {
    let html = "";

    blocks.forEach((block) => {
      if (block.type === "heading") {
        html += `<h2>${block.value}</h2>`;
      }

      if (block.type === "subheading") {
        html += `<h3>${block.value}</h3>`;
      }

      if (block.type === "paragraph") {
        html += `<p>${block.value}</p>`;
      }

      if (block.type === "bullets") {
        const items = block.value.split(",");
        html += "<ul>";
        items.forEach((item) => {
          html += `<li>${item.trim()}</li>`;
        });
        html += "</ul>";
      }
    });

    return html;
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  // 🚀 SUBMIT
  const handleSubmit = () => {
    if (!title || !author || !image) {
      alert("Required fields missing");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", generateSlug(title));
    formData.append("author", author);
    formData.append("content", generateHTML()); // ✅ HTML
    formData.append("image", image);
    formData.append("readTime", readTime);
    formData.append("featured", featured);

    createBlog(formData);
  };

  return (
    <div className="blog-form-container">
      <h2>Create Blog</h2>

      <div className="admin-card">
        {/* TITLE */}
        <input
          className="blog-input"
          placeholder="Blog Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* AUTHOR */}
        <input
          className="blog-input"
          placeholder="Author Name"
          onChange={(e) => setAuthor(e.target.value)}
        />

        {/* IMAGE */}
        <div className="blog-image-upload">
          <label className="upload-box">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
            <span>📷 Upload Blog Image</span>
          </label>
        </div>

        {/* ADD BUTTONS */}
        <div className="blog-add-buttons">
          <button onClick={() => addBlock("heading")}>+ Heading</button>
          <button onClick={() => addBlock("subheading")}>+ Sub Heading</button>
          <button onClick={() => addBlock("paragraph")}>+ Paragraph</button>
          <button onClick={() => addBlock("bullets")}>+ Bullet Points</button>
        </div>

        {/* BLOCKS */}
        {blocks.map((block) => (
          <div key={block.id} className="blog-block">
            {/* TYPE LABEL */}
            <span className="blog-block-type">{block.type.toUpperCase()}</span>

            {/* INPUTS */}
            {block.type === "heading" && (
              <input
                placeholder="Heading (h2)"
                className="blog-input"
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {block.type === "subheading" && (
              <input
                placeholder="Sub Heading (h3)"
                className="blog-input"
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {block.type === "paragraph" && (
              <textarea
                placeholder="Paragraph"
                className="blog-textarea"
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {block.type === "bullets" && (
              <textarea
                placeholder="Points (comma separated)"
                className="blog-textarea"
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {/* 🔥 DELETE BUTTON (NOW BELOW INPUT) */}
            <button
              className="delete-btn"
              onClick={() => deleteBlock(block.id)}
            >
              Delete
            </button>
          </div>
        ))}

        {/* READ TIME */}
        <input
          placeholder="Read Time"
          className="blog-input"
          onChange={(e) => setReadTime(e.target.value)}
        />

        {/* FEATURED */}
        <label className="blog-featured">
          <input
            type="checkbox"
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured
        </label>

        {/* SUBMIT */}
        <button
          className="blog-submit-btn"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Posting..." : "Post Blog"}
        </button>
      </div>
    </div>
  );
}
