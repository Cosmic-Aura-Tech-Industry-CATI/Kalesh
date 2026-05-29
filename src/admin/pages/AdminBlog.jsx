import { useState } from "react";
import { useCreateBlog } from "../../hooks/useBlogs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style/blog.css";

export default function AdminBlog() {
  const { mutate: createBlog, isPending } = useCreateBlog();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [readTime, setReadTime] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  // ➕ ADD BLOCK
  const addBlock = (type) => {
    setBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        value: "",
        level: "h2",
        listType: "ul",
      },
    ]);
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
        html += `<${block.level}>${block.value}</${block.level}>`;
      }

      if (block.type === "subheading") {
        html += `<h3>${block.value}</h3>`;
      }

      if (block.type === "paragraph") {
        html += `<p>${block.value.replace(/\n/g, "<br/>")}</p>`;
      }

      if (block.type === "list") {
        const items = block.value.split("\n").filter((item) => item.trim());

        html += `<${block.listType}>`;

        items.forEach((item) => {
          html += `<li>${item.trim()}</li>`;
        });

        html += `</${block.listType}>`;
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
    formData.append("content", content);
    formData.append("image", image);
    formData.append("readTime", readTime);
    formData.append("featured", featured);

    // ✅ YAHI ADD KARNA HAI
    createBlog(formData, {
      onSuccess: () => {
        alert("Blog created ✅");

        setTitle("");
        setAuthor("");
        setContent("");
        setImage(null);
        setImagePreview(null);
      },
    });
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
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) return;

                // 🔥 MAX 2MB
                if (file.size > 2 * 1024 * 1024) {
                  alert("Image must be less than 2MB ❌");
                  return;
                }

                setImage(file);
                setImagePreview(URL.createObjectURL(file));
              }}
              hidden
            />
            <span>📷 Upload Blog Image</span>
          </label>

          {/* 👇 PREVIEW YAHI ADD KARNA HAI */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <p>Image selected ✅</p>
            </div>
          )}
        </div>

        

        <div className="blog-editor">
          <label className="blog-editor-label">Blog Content</label>

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={quillModules}
          />
        </div>

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
