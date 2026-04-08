import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useGetBlogBySlug } from "../hooks/useBlogs";
import "./Blogpage1.css";

const BlogPage1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug } = useParams();
  const { data, isLoading, isError } = useGetBlogBySlug(slug);

  const blog = data?.data?.blog || data?.data || data?.blog || data;

  if (isLoading) {
    return <div className="blog-detail-page"><div className="container-fluid text-center py-5">Loading blog...</div></div>;
  }

  if (isError || !blog) {
    return <div className="blog-detail-page"><div className="container-fluid text-center py-5">Blog not found.</div></div>;
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Kalesh Blog</title>
        <meta name="description" content={blog.excerpt} />
        <link rel="canonical" href={`https://thekalesh.com/blog/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": blog.title,
            "description": blog.excerpt,
            "image": blog.image || "https://thekalesh.com/images/blog-image.webp",
            "author": {
              "@type": "Organization",
              "name": blog.author || "Kalesh"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kalesh",
              "logo": {
                "@type": "ImageObject",
                "url": "https://thekalesh.com/logo.png"
              }
            },
            "datePublished": blog.date || blog.createdAt,
            "dateModified": blog.updatedAt || blog.date || blog.createdAt
          })}
        </script>
      </Helmet>
      <div className="blog-detail-page">
      {/* Navigation Bar */}
      <nav className="blog-nav">
        <div className="container-fluid">
          <div className="nav-content">
            <Link to="/blog/Viewpage" className="back-button">
              <i className="fas fa-arrow-left"></i> Back to Blog
            </Link>
            <div className="nav-logo">
              <img
                src="/images/logo.png"
                alt="Kalesh Logo"
                style={{ width: "2.5rem", height: "2.5rem" }}
              />
              <span>Kalesh Blog</span>
            </div>
            <div className="nav-actions">
              <a href="#" className="share-btn">
                <i className="fas fa-share-alt"></i> Share
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="article-header">
        <div className="container-fluid">
          <div className="article-header-content">
            <h1 className="article-title">{blog.title}</h1>
            <div className="article-meta">
              <div className="meta-item">
                <i className="far fa-calendar"></i>
                <span>{blog.date || new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="meta-item">
                <i className="far fa-clock"></i>
                <span>{blog.readTime || "3 min read"}</span>
              </div>
            </div>
            <div className="article-author">
              <div className="author-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="author-info">
                <h4>{blog.author || "Kalesh Team"}</h4>
                <p>Official Kalesh Blog</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero-image">
        <div className="container-fluid">
          <img
            src={blog.image || "/blog-image.webp"}
            alt={blog.title}
            className="hero-img"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="article-content">
        <div className="container-fluid">
          <div className="content-wrapper">
            <section className="content-section" style={{ whiteSpace: "pre-wrap" }}>
              {blog.content}
            </section>
          </div>
        </div>
      </article>

      {/* Footer */}
    </div>
    </>
  );
};

export default BlogPage1;
