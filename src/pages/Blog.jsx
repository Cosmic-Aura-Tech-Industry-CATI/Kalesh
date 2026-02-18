import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";

import "./blog.css";
import { useSubscribe } from "../hooks/usePublicService";

const Blog = () => {
  const [mailId, setMailId] = useState("");
  const { mutate: subscribe, isPending } = useSubscribe();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Introducing Kalesh",
      date: "February 03, 2026",
      category: "FEATURES",
      excerpt:
        "Social media was meant to give people a voice. Somewhere along the way, it became a stage.",
      readTime: "3 min read",
      image: "blog-image.webp",
      featured: true,
      color: "#25D366",
    },
    {
      id: 2,
      title: "Meet The Team Behind Kalesh",
      date: "February 05, 2026",
      category: "Team-Kalesh",
      excerpt:
        "A mission-driven team working together across strategy, tech, and execution to redefine social expression.",
      readTime: "4 min read",
      image: "blog-team.webp",
      featured: true,
      color: "#128C7E",
    },
    {
      id: 3,
      title: "What Is Anonymous Social Media and How Does It Work?",
      date: "February 10, 2026",
      category: "FEATURES",
      excerpt:
        "Explore anonymous expression, live polls, and judgment-free conversations—built for India.",
      readTime: "2 min read",
      image: "blog-post1.webp",
      featured: false,
      color: "#34B7F1",
    },
    {
      id: 4,
      title: "What Makes Live Polls So Powerful?",
      date: "February 10, 2026",
      category: "LIVE-POLLS",
      excerpt:
        "Real-time voting, instant results, and anonymous participation make live polls the fastest way to capture real opinions.",
      readTime: "3 min read",
      image: "blog-post2.webp",
      featured: false,
      color: "#075E54",
    },
    {
      id: 5,
      title: "Anonymous vs Public Comments: Which Is Safer?",
      date: "February 10, 2026",
      category: "SECURITY",
      excerpt:
        "Anonymous comments on Kalesh protect users and keep discussions opinion-driven.",
      readTime: "5 min read",
      image: "blog-post3.webp",
      featured: false,
      color: "#25D366",
    },
  ]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    subscribe({ email: mailId });
  };

  const featuredBlogs = blogs.filter((blog) => blog.featured);
  const recentBlogs = blogs.filter((blog) => !blog.featured);

  return (
    <>
      <Helmet>
        <title>Kalesh Blog - Latest Updates, Features & News</title>
        <meta
          name="description"
          content="Stay up to date on the newest features, updates, and news from Kalesh. Discover insights about anonymous social media and live polling."
        />
        <link rel="canonical" href="https://thekalesh.com/blog" />
      </Helmet>
      <div className="whatsapp-blog">
        {/* Header Section */}
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
                      required={true}
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

        {/* Featured Section */}
        <section className="featured-section">
          <div className="container-fluid">
            <h2 className="section-heading">Featured</h2>
            <div className="featured-grid">
              {featuredBlogs.map((blog) => (
                <div className="featured-card" key={blog.id}>
                  <div className="featured-image">
                    <img src={blog.image} alt={blog.title} />
                    <div
                      className="category-tag"
                      style={{ backgroundColor: blog.color }}
                    >
                      {blog.category}
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="blog-meta">
                      <span className="blog-date">{blog.date}</span>
                      <span className="blog-readtime">{blog.readTime}</span>
                    </div>
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-excerpt">{blog.excerpt}</p>
                    <>
                      {blog.id === 1 && (
                        <Link to="/blog/blog1" className="read-link">
                          Read more →
                        </Link>
                      )}
                      {blog.id === 2 && (
                        <Link to="/blog/blogteam" className="read-link">
                          Read more →
                        </Link>
                      )}
                    </>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="recent-section">
          <div className="container-fluid">
            <div className="section-header">
              <h2 className="section-heading">Recent posts</h2>
              <a href="/blog/viewpage" className="view-all">
                View all posts →
              </a>
            </div>

            <div className="recent-grid">
              {recentBlogs.map((blog) => (
                <div className="recent-card" key={blog.id}>
                  <div className="recent-image">
                    <img src={blog.image} alt={blog.title} />
                    <div
                      className="category-badge"
                      style={{ backgroundColor: blog.color }}
                    >
                      {blog.category}
                    </div>
                  </div>
                  <div className="recent-content">
                    <div className="blog-meta">
                      <span className="blog-date">{blog.date}</span>
                      <span className="blog-readtime">{blog.readTime}</span>
                    </div>
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-excerpt">{blog.excerpt}</p>
                    {blog.id === 3 && (
                      <Link to="/blog/Post1" className="read-link">
                        Read more →
                      </Link>
                    )}
                    {blog.id === 4 && (
                      <Link to="/blog/Post2" className="read-link">
                        Read more →
                      </Link>
                    )}
                    {blog.id === 5 && (
                      <Link to="/blog/Post3" className="read-link">
                        Read more →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
