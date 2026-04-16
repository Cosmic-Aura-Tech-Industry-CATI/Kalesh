import { useState } from "react";
import { useGetAllBlogs, useDeleteBlog } from "../../hooks/useBlogs";
import { useNavigate } from "react-router-dom";
import AdminBlog from "./AdminBlog";
import "../style/adminBlogPage.css";

export default function AdminBlogPage() {
  const { data, isLoading } = useGetAllBlogs();
  const { mutate: deleteBlog } = useDeleteBlog();
  const navigate = useNavigate();

  const [showCreate, setShowCreate] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  const blogs = data?.data?.blogs || [];

  return (
    <div className="admin-page-wrapper">
      <h2 className="admin-page-title">Manage Blogs</h2>

      {/* CREATE BUTTON */}
      <button
        className="admin-btn-primary mb-6"
        onClick={() => setShowCreate(!showCreate)}
      >
        {showCreate ? "Close Editor" : "+ Create Blog"}
      </button>

      {/* CREATE FORM */}
      {showCreate && <AdminBlog />}

      {/* BLOG LIST */}
      <div className="admin-grid mt-6">
        {blogs.map((blog) => (
          <div key={blog._id || blog.slug} className="blog-card">
            <img src={blog.image} alt={blog.title} />

            <div className="blog-card-content">
              <h3>{blog.title}</h3>
              <p>{blog.slug}</p>
            </div>

            <div className="blog-card-actions">
              <button
                className="admin-btn-secondary"
                onClick={() => navigate(`/admin/blog/edit/${blog.slug}`)}
              >
                Edit
              </button>

              <button
                className="admin-btn-danger"
                onClick={() => {
                  if (confirm(`Delete "${blog.title}"?`)) {
                    deleteBlog(blog.slug);
                  }
                }}
              >
                Delete
              </button>

              <button
                className="admin-btn-secondary"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
