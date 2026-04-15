import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogBySlug } from "../hooks/useBlogs";
import "../styles/pages/blogdetail.css";
import { ArrowLeft, Share2, Calendar, Clock, User } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: blogResponse, isLoading, error } = useGetBlogBySlug(slug);

  if (isLoading) return <p className="loading-text">Loading...</p>;

  if (error || !blogResponse?.data?.blog) {
    return <p className="error-text">Blog not found.</p>;
  }

  const blog = blogResponse.data.blog;

  return (
    <div className="blog-detail-container">
      {/* TOP BAR */}
      <div className="blog-topbar">
        <button className="back-btn" onClick={() => navigate("/blog")}>
          <ArrowLeft size={18} /> Back to Blog
        </button>

        <div className="blog-center">
          <img src="/images/logo.png" alt="logo" className="blog-logo" />
          <span>Kalesh Blog</span>
        </div>

        <button className="share-btn">
          <Share2 size={18} /> Share
        </button>
      </div>

      {/* TITLE SECTION */}
      <div className="blog-header">
        <h1 className="blog-title">{blog.title}</h1>

        <div className="blog-meta">
          <span className="meta-item">
            <Calendar size={16} /> {blog.createdAt?.slice(0, 10)}
          </span>

          <span className="meta-item">
            <Clock size={16} /> {blog.readTime} min read
          </span>
        </div>

        <div className="blog-author">
          {/* LEFT ICON */}
          <div className="author-icon">
            <User size={22} />
          </div>

          {/* TEXT */}
          <div className="author-info">
            <strong>Kalesh Team</strong>
            <p>Official Kalesh Blog</p>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="blog-image" />
      )}

      {/* CONTENT */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
