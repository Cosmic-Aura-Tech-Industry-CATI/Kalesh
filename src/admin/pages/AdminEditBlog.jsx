import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogBySlug, useUpdateBlog } from "../../hooks/useBlogs";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style/adminEditBlog.css";

export default function AdminEditBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBlogBySlug(slug);
  const { mutate: updateBlog } = useUpdateBlog();

  const blog = data?.data?.blog;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [readTime, setReadTime] = useState("");
  const [featured, setFeatured] = useState(false);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  // 🔥 LOAD DATA
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content || "");
      setReadTime(blog.readTime || "");
      setFeatured(blog.featured || false);
    }
  }, [blog]);

  const handleUpdate = () => {
    updateBlog(
      {
        slug,
        payload: {
          title,
          content,
          readTime,
          featured,
        },
      },
      {
        onSuccess: () => {
          alert("Updated ✅");
          navigate("/admin/blogs");
        },
      },
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (!blog) return <p>Not found</p>;

  return (
    <div className="admin-page-wrapper">
      <h2 className="admin-page-title">Edit Blog</h2>

      <div className="edit-blog-card">
        {/* TITLE */}
        <label>Blog Title</label>
        <input
          className="admin-form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog Content</label>

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={quillModules}
        />

        {/* READ TIME */}
        <label>Read Time</label>
        <input value={readTime} onChange={(e) => setReadTime(e.target.value)} />

        {/* FEATURED */}
        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured
        </label>

        <div className="edit-blog-actions">
          <button className="edit-blog-btn" onClick={handleUpdate}>
            Update Blog
          </button>

          <button
            className="edit-blog-close-btn"
            onClick={() => navigate("/admin/blogs")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
