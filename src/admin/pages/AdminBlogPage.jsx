import { useState } from "react";

import {
  useGetAllBlogs,
  useDeleteBlog,
} from "../../hooks/useBlogs";

import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaHeart,
  FaShareAlt,
  FaClock,
} from "react-icons/fa";

import AdminBlog from "./AdminBlog";

import "../style/adminBlogPage.css";

export default function AdminBlogPage() {

  const { data, isLoading } =
    useGetAllBlogs();

  const { mutate: deleteBlog } =
    useDeleteBlog();

  const navigate = useNavigate();

  const [showCreate, setShowCreate] =
    useState(false);

  if (isLoading)
    return <p>Loading...</p>;

  const blogs =
    data?.data?.blogs || [];

  return (
    <div className="admin-page-wrapper">

      {/* ================= HEADER ================= */}

      <div className="admin-page-header">

        <div>
          <h2 className="admin-page-title">
            Manage Blogs
          </h2>

          <p className="admin-page-subtitle">
            Create, manage and track
            your blog analytics
          </p>
        </div>

        <button
          className="admin-btn-primary"
          onClick={() =>
            setShowCreate(!showCreate)
          }
        >
          {showCreate
            ? "Close Editor"
            : "+ Create Blog"}
        </button>

      </div>

      {/* ================= CREATE BLOG ================= */}

      {showCreate && (
        <div className="blog-editor-wrapper">
          <AdminBlog />
        </div>
      )}

      {/* ================= BLOG LIST ================= */}

      <div className="admin-grid">

        {blogs.map((blog) => (

          <div
            key={blog._id || blog.slug}
            className="blog-card"
          >

            {/* IMAGE */}

            <div className="blog-image-wrapper">

              <img
                src={blog.image}
                alt={blog.title}
              />

            </div>

            {/* CONTENT */}

            <div className="blog-card-content">

              <h3>{blog.title}</h3>

              <p className="blog-slug">
                {blog.slug}
              </p>

              {/* STATS */}

              <div className="blog-stats">

                <div className="stat-box">
                  <FaEye className="stat-icon" />

                  <span>
                    {blog.views || 0}
                  </span>
                </div>

                <div className="stat-box">
                  <FaHeart className="stat-icon heart-icon" />

                  <span>
                    {blog.likes || 0}
                  </span>
                </div>

                <div className="stat-box">
                  <FaShareAlt className="stat-icon" />

                  <span>
                    {blog.shares || 0}
                  </span>
                </div>

                <div className="stat-box">
                  <FaClock className="stat-icon" />

                  <span>
                    {blog.readTime || 0} min
                  </span>
                </div>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="blog-card-actions">

              <button
                className="admin-btn-secondary"
                onClick={() =>
                  navigate(
                    `/admin/blog/edit/${blog.slug}`
                  )
                }
              >
                Edit
              </button>

              <button
                className="admin-btn-danger"
                onClick={() => {

                  if (
                    confirm(
                      `Delete "${blog.title}"?`
                    )
                  ) {
                    deleteBlog(blog.slug);
                  }

                }}
              >
                Delete
              </button>

              <button
                className="admin-btn-view"
                onClick={() =>
                  navigate(
                    `/blog/${blog.slug}`
                  )
                }
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