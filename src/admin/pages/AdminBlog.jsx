import { useState } from "react";
import axios from "axios";
import "../style/blog.css";

export default function AdminBlog() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    readTime: "",
    image: "",
    featured: false,
    color: "#ff6a00",
  });

  const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/api/blogs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm((prev) => ({
        ...prev,
        image: res.data.url,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/blogs", {
      ...form,
      slug: slugify(form.title),
      date: new Date().toDateString(),
    });

    alert("Blog Created ✅");
  };

  return (
    <div className="blog-form-container">
      {/* 🔥 HEADING OUTSIDE CARD */}
      <h2 className="blog-heading">Create Blog</h2>

      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="blog-form-grid">
            {/* TITLE */}
            <div>
              <label className="blog-label">Title</label>
              <input
                className="blog-input"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="blog-label">Category</label>
              <input
                className="blog-input"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>

            {/* EXCERPT */}
            <div className="full-width">
              <label className="blog-label">Excerpt</label>
              <textarea
                className="blog-textarea"
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </div>

            {/* CONTENT */}
            <div className="full-width">
              <label className="blog-label">Full Content</label>
              <textarea
                className="blog-textarea"
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>

            {/* READ TIME */}
            <div>
              <label className="blog-label">Read Time</label>
              <input
                className="blog-input"
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="blog-label">Upload Image</label>
              <input
                type="file"
                className="blog-input"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </div>
          </div>

          {/* FEATURED */}
          <div className="blog-checkbox">
            <input
              type="checkbox"
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            <span>Featured Blog</span>
          </div>

          {/* BUTTON */}
          <button className="blog-submit-btn">Post Blog</button>
        </form>
      </div>
    </div>
  );
}
