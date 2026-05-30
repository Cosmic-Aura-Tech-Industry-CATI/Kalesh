import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "./blog.css";
import { useSubscribe } from "../hooks/usePublicService";
import { useGetAllBlogs, useShareBlog } from "../hooks/useBlogs";
import { Heart, Eye, Share2 } from "lucide-react";
import { toastSuccess, toastError } from "../lib/toast";

const Blog = () => {
  const [mailId, setMailId] = useState("");
  const { mutate: subscribe, isPending } = useSubscribe();
  const { data: blogsResponse, isLoading } = useGetAllBlogs();
  const { mutateAsync: shareBlogAsync } = useShareBlog();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (blogsResponse) {
      const fetchedBlogs = Array.isArray(blogsResponse)
        ? blogsResponse
        : blogsResponse?.data?.blogs ||
          blogsResponse?.data ||
          blogsResponse?.blogs ||
          [];

      setBlogs(fetchedBlogs);
    }
  }, [blogsResponse]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    subscribe({ email: mailId });
  };

  const handleShare = async (e, blog) => {
    e.preventDefault();
    try {
      const response = await shareBlogAsync(blog.slug);
      const url = response?.shareUrl || `${window.location.origin}/blog/${blog.slug}`;
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
        console.log("Could not copy rich text, falling back to plain text.", writeHtmlError);
        // Fallback to plain text if rich text copy fails
        await navigator.clipboard.writeText(url);
      }
      toastSuccess("Link copied to clipboard!");
    } catch (err) {
      console.log(err);
      toastError("Failed to copy link");
    }
  };

  const featuredBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) => blog.featured)
    : [];

  const recentBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) => !blog.featured)
    : [];

  return (
    <>
      <Helmet>
        <title>Kalesh Blog - Latest Updates, Features & News</title>

        <meta
          name="description"
          content="Stay up to date on the newest features, updates, and news from Kalesh."
        />

        <link rel="canonical" href="https://thekalesh.com/blog" />
      </Helmet>

      <div className="whatsapp-blog">
        {/* HEADER */}
        <header className="blog-header">
          <div className="container-fluid">
            <div className="header-content">
              <div className="header-left">
                <h6 className="blog-label">KALESH BLOG</h6>

                <h1 className="blog-main-title">
                  Latest Updates & News from Kalesh
                </h1>

                <p className="blog-subtitle">
                  Stay up to date on the newest features, updates, and news from
                  India's first anonymous social media platform.
                </p>
              </div>

              <div className="header-right">
                <div className="subscribe-box">
                  <h4>Never miss an update</h4>

                  <div className="subscribe-form">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setMailId(e.target.value)}
                      value={mailId}
                      required
                    />

                    <button className="btn-subscribe" onClick={handleSubscribe}>
                      {isPending ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>

                  <p className="privacy-text">
                    Your information will be used in accordance with Kalesh's
                    Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* FEATURED BLOGS */}
        <section className="featured-section">
          <div className="container-fluid">
            <h2 className="section-heading">Featured</h2>

            {isLoading ? (
              <p>Loading featured blogs...</p>
            ) : (
              <div className="featured-grid">
                {featuredBlogs.map((blog) => (
                  <div className="featured-card" key={blog.id || blog._id}>
                    <div className="featured-image">
                      <img
                        src={blog.image || "/blog-image.webp"}
                        alt={blog.title}
                      />

                      <div
                        className="category-tag"
                        style={{
                          backgroundColor: blog.color || "#ff6a00",
                        }}
                      >
                        {blog.category}
                      </div>
                    </div>

                    <div className="featured-content">
                      <div className="blog-meta">
                        <span className="blog-date">
                          {blog.date ||
                            new Date(blog.createdAt).toLocaleDateString()}
                        </span>

                        <span className="blog-author-name">
                          {blog.author || "Kalesh"}
                        </span>

                        <span className="blog-readtime">
                          {blog.readTime} min
                        </span>
                      </div>

                      {/* UPDATED CLASS */}
                      <h3 className="blog-card-title">{blog.title}</h3>

                      <p className="blog-excerpt">{blog.excerpt}</p>

                      <div className="blog-card-footer">
                        <Link to={`/blog/${blog.slug}`} className="read-link">
                          Read more →
                        </Link>

                        <div className="blog-stats">
                          <div className="blog-stat-item">
                            <Heart size={16} />
                            <span>{blog.likeCount || 0}</span>
                          </div>

                          <div className="blog-stat-item">
                            <Eye size={16} />
                            <span>{blog.views || 0}</span>
                          </div>

                          <div
                            className="blog-stat-item"
                            onClick={(e) => handleShare(e, blog)}
                            style={{ cursor: "pointer" }}
                            title="Share Blog"
                          >
                            <Share2 size={16} />
                            <span>{blog.shareCount || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* RECENT BLOGS */}
        <section className="recent-section">
          <div className="container-fluid">
            <div className="section-header">
              <h2 className="section-heading">Recent posts</h2>

              <a href="/blog/viewpage" className="view-all">
                View all posts →
              </a>
            </div>

            {isLoading ? (
              <p>Loading recent blogs...</p>
            ) : (
              <div className="recent-grid">
                {recentBlogs.map((blog) => (
                  <div className="recent-card" key={blog.id || blog._id}>
                    <div className="recent-image">
                      <img
                        src={blog.image || "/blog-image.webp"}
                        alt={blog.title}
                      />

                      <div
                        className="category-badge"
                        style={{
                          backgroundColor: blog.color || "#ff6a00",
                        }}
                      >
                        {blog.category}
                      </div>
                    </div>

                    <div className="recent-content">
                      <div className="blog-meta">
                        <span className="blog-date">
                          {blog.date ||
                            new Date(blog.createdAt).toLocaleDateString()}
                        </span>

                        <span className="blog-author-name">
                          {blog.author || "Kalesh"}
                        </span>

                        <span className="blog-readtime">
                          {blog.readTime} min
                        </span>
                      </div>

                      {/* UPDATED CLASS */}
                      <h3 className="blog-card-title">{blog.title}</h3>

                      <p className="blog-excerpt">{blog.excerpt}</p>

                      <div className="blog-card-footer">
                        <Link to={`/blog/${blog.slug}`} className="read-link">
                          Read more →
                        </Link>

                        <div className="blog-stats">
                          <div className="blog-stat-item">
                            <Heart size={16} />
                            <span>{blog.likes || 0}</span>
                          </div>

                          <div className="blog-stat-item">
                            <Eye size={16} />
                            <span>{blog.views || 0}</span>
                          </div>

                          <div
                            className="blog-stat-item"
                            onClick={(e) => handleShare(e, blog)}
                            style={{ cursor: "pointer" }}
                            title="Share Blog"
                          >
                            <Share2 size={16} />
                            <span>{blog.shares || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
