import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useGetBlogBySlug, useShareBlog } from "../hooks/useBlogs";

import "../styles/pages/blogdetail.css";

import { ArrowLeft, Share2, Calendar, Clock, User, Heart } from "lucide-react";
import { toastSuccess, toastError } from "../lib/toast";

export default function BlogDetail() {
  const { slug } = useParams();

  const navigate = useNavigate();

  const { data: blogResponse, isLoading, error } = useGetBlogBySlug(slug);

  const { mutateAsync: shareBlogAsync } = useShareBlog();

  /* =========================
     STATES
  ========================= */

  const [liked, setLiked] = useState(false);

  const [showBurst, setShowBurst] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    text: "",
  });

  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);

  /* =========================
     LIKE FUNCTION
  ========================= */

  const handleLike = () => {
    if (!liked) {
      setLiked(true);

      setShowBurst(true);

      setShowToast(true);

      setTimeout(() => {
        setShowBurst(false);
      }, 4500);

      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } else {
      setLiked(false);
    }
  };

  /* =========================
     SHARE FUNCTION
  ========================= */

  const handleShare = async () => {
    try {
      const response = await shareBlogAsync(slug);
      const url = response?.shareUrl || window.location.href;
      try {
        // Try to copy as rich text (HTML link)
        const html = `<a href="${url}">${url}</a>`;
        const blob = new Blob([html], { type: "text/html" });
        const textBlob = new Blob([url], { type: "text/plain" });
        const item = new ClipboardItem({
          "text/html": blob,
          "text/plain": textBlob,
        });
        await navigator.clipboard.write([item]);
      } catch (writeHtmlError) {
        console.log(
          "Could not copy rich text, falling back to plain text.",
          writeHtmlError,
        );
        // Fallback to plain text if rich text copy fails
        await navigator.clipboard.writeText(url);
      }
      toastSuccess("Link copied to clipboard!");
    } catch (err) {
      console.log(err);
      toastError("Failed to copy link");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentData.name || !commentData.email || !commentData.text) {
      toastError("All fields are required");
      return;
    }

    try {
      setCommentLoading(true);

      // API call
      // await createComment({
      //   blogId: blog._id,
      //   ...commentData,
      // });

      const newComment = {
        id: Date.now(),
        ...commentData,
        createdAt: new Date(),
      };

      setComments((prev) => [newComment, ...prev]);

      setCommentData({
        name: "",
        email: "",
        text: "",
      });

      toastSuccess("Comment added successfully");
    } catch (err) {
      toastError("Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return <p className="loading-text">Loading...</p>;
  }

  /* =========================
     ERROR
  ========================= */

  if (error || !blogResponse?.data?.blog) {
    return <p className="error-text">Blog not found.</p>;
  }

  /* =========================
     BLOG DATA
  ========================= */

  const blog = blogResponse.data.blog;

  const cleanedContent = blog.content
    .replace(/<p><br><\/p>/gi, "")
    .replace(/<p><br\/><\/p>/gi, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/<h1>\s*<\/h1>/gi, "")
    .replace(/<h2>\s*<\/h2>/gi, "")
    .replace(/<h3>\s*<\/h3>/gi, "")
    .replace(/<ul>\s*<\/ul>/gi, "")
    .replace(/<ol>\s*<\/ol>/gi, "");

  // 🔍 Debug
  console.log("BLOG CONTENT HTML:");
  console.log(blog.content);

  return (
    <div className="blog-detail-container">
      {/* ================= TOP BAR ================= */}

      <div className="blog-topbar">
        <button className="back-btn" onClick={() => navigate("/blog")}>
          <ArrowLeft size={18} />
          Back to Blog
        </button>

        <div className="blog-center">
          <img src="/images/logo.png" alt="logo" className="blog-logo" />

          <span>Kalesh Blog</span>
        </div>

        <button className="share-btn" onClick={handleShare}>
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* ================= HEADER ================= */}

      <div className="blog-detail-header">
        <h1 className="blog-title">{blog.title}</h1>

        {/* META */}

        <div className="blog-meta">
          <span className="meta-item">
            <Calendar size={16} />

            {blog.createdAt?.slice(0, 10)}
          </span>

          <span className="meta-item">
            <Clock size={16} />
            {blog.readTime} min read
          </span>
        </div>

        {/* AUTHOR */}

        <div className="blog-author">
          <div className="author-icon">
            <User size={22} />
          </div>

          <div className="author-info">
            <strong>{blog.author || "Kalesh Team"}</strong>

            <p>Official Kalesh Blog</p>
          </div>
        </div>
      </div>

      {/* ================= IMAGE ================= */}

      {blog.image && (
        <div
          className="blog-image-wrapper"
          style={{
            backgroundImage: `url(${blog.image})`,
          }}
        >
          <img src={blog.image} alt={blog.title} className="blog-image" />
        </div>
      )}

      {/* ================= CONTENT ================= */}

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{
          __html: cleanedContent,
        }}
      />

      {/* ================= COMMENTS ================= */}

      <div className="blog-comments-section">
        <h2 className="comments-heading">Comments ({comments.length})</h2>

        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <div className="comment-row">
            <input
              type="text"
              placeholder="Your Name"
              value={commentData.name}
              onChange={(e) =>
                setCommentData({
                  ...commentData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Your Email"
              value={commentData.email}
              onChange={(e) =>
                setCommentData({
                  ...commentData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <textarea
            rows="5"
            placeholder="Write your comment..."
            value={commentData.text}
            onChange={(e) =>
              setCommentData({
                ...commentData,
                text: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="comment-submit-btn"
            disabled={commentLoading}
          >
            {commentLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <div className="comment-avatar">
                  {comment.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4>{comment.name}</h4>

                  <span>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FLOATING LIKE ================= */}

      <div
        className={`floating-like-btn ${liked ? "liked" : ""}`}
        onClick={handleLike}
        onDoubleClick={() => setLiked(false)}
      >
        <Heart size={30} fill={liked ? "#ff3040" : "transparent"} />
      </div>

      {/* ================= HEARTS ================= */}

      {showBurst && (
        <div className="heart-screen">
          {[...Array(25)].map((_, i) => (
            <span
              key={i}
              className="screen-heart"
              style={{
                left: `${Math.random() * 100}%`,

                top: `${Math.random() * 100}%`,

                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}

      {/* ================= TOAST ================= */}

      {showToast && (
        <div className="love-toast">This blog is blushing now 🫣</div>
      )}
    </div>
  );
}
