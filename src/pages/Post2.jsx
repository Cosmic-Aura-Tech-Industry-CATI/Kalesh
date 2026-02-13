// post2.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Blogpage1.css"; // Linking to your existing CSS

const Post2 = () => {
  // State for comments
  const [comments, setComments] = useState([
   
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  // Handle new comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: "Anonymous User",
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  // Handle reply submission
  const handleReplySubmit = (commentId) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: Date.now(),
      author: "Anonymous User",
      content: replyContent,
      date: new Date().toISOString(),
      likes: 0
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyTo(null);
    setReplyContent("");
  };

  // Handle likes
  const handleLike = (commentId, isReply = false, replyId = null) => {
    if (!isReply) {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === replyId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : comment
      ));
    }
  };

  // Handle delete comment
  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    setActiveMenu(null);
  };

  // Handle delete reply
  const handleDeleteReply = (commentId, replyId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
        : comment
    ));
    setActiveMenu(null);
  };

  // Toggle menu
  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>What Are Live Polls and Why Are They Effective? | Kalesh Blog</title>
        <meta name="description" content="Discover the power of live polling. Learn how real-time voting and anonymous participation create instant, honest opinions on Kalesh." />
        <link rel="canonical" href="https://thekalesh.com/blog/Post2" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "What Are Live Polls and Why Are They So Effective?",
            "description": "Discover the power of live polling with Kalesh.",
            "author": {
              "@type": "Organization",
              "name": "Kalesh"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kalesh",
              "logo": {
                "@type": "ImageObject",
                "url": "https://thekalesh.com/logo.png"
              }
            },
            "datePublished": "2026-02-10",
            "dateModified": "2026-02-10"
          })}
        </script>
      </Helmet>
      <div className="blog-detail-page">
      {/* Navigation Bar */}
      <nav className="blog-nav">
        <div className="container-fluid">
          <div className="nav-content">
            <a href="/blog/viewpage" className="back-button">
              <i className="fas fa-arrow-left"></i> Back to Blog
            </a>
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
            
            <h1 className="article-title">
              What Are Live Polls and Why Are They So Effective?
            </h1>
            <div className="article-meta">
              <div className="meta-item">
                <i className="far fa-calendar"></i>
                <span>February 10, 2026</span>
              </div>
              <div className="meta-item">
                <i className="far fa-clock"></i>
                <span>5 min read</span>
              </div>
              
            </div>
            
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero-image">
        <div className="container-fluid">
          <img
            src="/blog-post2.webp"
            alt=""
            className="hero-img"
          />
          <div className="image-caption">
            <i className="fas fa-camera"></i>
            <span>
              Understanding the psychological mechanisms behind anonymous communication
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="article-content">
        <div className="container-fluid">
          <div className="content-wrapper">

            {/* Introduction */}
            <section className="content-section">
              <h2>What Are Live Polls and Why Are They So Effective?</h2>
              <p>
                Live polls are interactive questions that allow users to vote instantly
                and see results update in real time. Unlike traditional posts that rely on
                likes or comments, live polls turn opinions into immediate action.
              </p>
              <p>
                On platforms like Kalesh, live polls are anonymous by default. This removes
                identity pressure and encourages users to participate honestly, making
                engagement faster, simpler, and more authentic.
              </p>
            </section>

            {/* The Psychology Behind Live Polls */}
            <section className="content-section">
              <h2>Why Live Polls Drive Higher Engagement</h2>
              <p>
                Live polls work because they match how people naturally interact online —
                quick decisions, low effort, and instant feedback.
              </p>

              <div className="steps-container">
                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-mask"></i>
                  </div>
                  <div className="step-content">
                    <h3>Anonymous Participation</h3>
                    <p>
                      On Kalesh, users vote without revealing identity. This eliminates
                      hesitation and leads to more honest and unbiased responses.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-balance-scale"></i>
                  </div>
                  <div className="step-content">
                    <h3>Equal Visibility</h3>
                    <p>
                      Every vote counts the same. There are no influencers, followers, or
                      popularity bias affecting poll outcomes.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="step-content">
                    <h3>Low Effort, High Impact</h3>
                    <p>
                      Voting requires just one tap, making it easier for users to
                      participate compared to writing comments or posts.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Engagement Results */}
            <section className="content-section">
              <h2>What Makes Live Polls So Powerful on Kalesh</h2>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <h3>Instant Interaction</h3>
                  <p>
                    Polls go live immediately on the dashboard, allowing users to engage
                    the moment a question is created.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h3>Real-Time Results</h3>
                  <p>
                    Users see results update live as votes come in, keeping curiosity and
                    engagement high.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3>Honest Opinions</h3>
                  <p>
                    Anonymous voting removes fear of judgment, leading to genuine and
                    realistic responses.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <h3>Conversation Starter</h3>
                  <p>
                    Each poll opens the door for anonymous discussions, turning votes
                    into meaningful conversations.
                  </p>
                </div>
              </div>
            </section>

            {/* How Live Polls Work */}
            <section className="content-section">
              <h2>How Live Polls Work on Kalesh</h2>
              <p>
                Kalesh is designed to make polling fast, fair, and accessible for everyone.
              </p>

              <ul style={{ color: '#b3b3b3', marginLeft: '20px', lineHeight: '1.8' }}>
                <li><strong>Create a Poll:</strong> Any user can post a poll instantly</li>
                <li><strong>Go Live Instantly:</strong> Poll appears on the dashboard in real time</li>
                <li><strong>Anonymous Voting:</strong> Users vote without revealing identity</li>
                <li><strong>Live Results:</strong> Results update as votes are submitted</li>
                <li><strong>Anonymous Chat:</strong> Users discuss opinions safely</li>
              </ul>
            </section>

            {/* Real-World Usage */}
            <section className="content-section">
              <h2>Where Live Polls Are Used the Most</h2>

              <div className="steps-container">
                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="step-content">
                    <h3>College Students</h3>
                    <p>
                      Students use live polls to share opinions, vote on topics, and
                      participate freely without peer pressure.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="step-content">
                    <h3>Brands & Communities</h3>
                    <p>
                      Organizations use live polls to collect real-time, unbiased audience
                      feedback.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-hand-holding-heart"></i>
                  </div>
                  <div className="step-content">
                    <h3>Everyday Opinions</h3>
                    <p>
                      Users vote on questions they normally hesitate to answer elsewhere,
                      making engagement natural and honest.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>

      {/* Comments Section - Using exact same classnames from your CSS */}
      <section className="comments-section">
        <div className="container-fluid">
          <div className="content-wrapper">
            <div className="comments-header">
              <h2 className="comments-title">
                <i className="far fa-comments"></i> Comments
                <span className="comment-count">{comments.length}</span>
              </h2>
              <p className="comments-subtitle">
                Join the conversation anonymously. No login required.
              </p>
            </div>

            {/* Comment Form */}
            <div className="comment-form-container">
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <div className="form-group">
                  <textarea
                    className="comment-input"
                    placeholder="Share your thoughts about live polls and anonymous voting..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-footer">
                  <span className="anonymous-badge">
                    <i className="fas fa-user-secret"></i> Posting anonymously
                  </span>
                  <button type="submit" className="submit-comment-btn">
                    <i className="fas fa-paper-plane"></i> Post Comment
                  </button>
                </div>
              </form>
            </div>

            {/* Comments List */}
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-date">
                        <i className="far fa-clock"></i> {formatDate(comment.date)}
                      </span>
                      
                      {/* Three Dots Menu for Comment */}
                      <div className="comment-menu-container">
                        <button 
                          className="menu-trigger"
                          onClick={() => toggleMenu(`comment-${comment.id}`)}
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                        {activeMenu === `comment-${comment.id}` && (
                          <div className="menu-dropdown">
                            <button 
                              className="menu-item delete"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              <i className="fas fa-trash-alt"></i> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="comment-text">{comment.content}</p>
                    
                    {/* Comment Actions */}
                    <div className="comment-actions">
                      <button 
                        className="action-btn like-btn"
                        onClick={() => handleLike(comment.id)}
                      >
                        <i className="far fa-heart"></i>
                        <span>{comment.likes}</span>
                      </button>
                      <button 
                        className="action-btn reply-btn"
                        onClick={() => setReplyTo(comment.id)}
                      >
                        <i className="far fa-comment"></i>
                        Reply
                      </button>
                    </div>

                    {/* Reply Form */}
                    {replyTo === comment.id && (
                      <div className="reply-form">
                        <textarea
                          className="reply-input"
                          placeholder="Write your reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows="2"
                        ></textarea>
                        <div className="reply-actions">
                          <button 
                            className="cancel-reply-btn"
                            onClick={() => {
                              setReplyTo(null);
                              setReplyContent("");
                            }}
                          >
                            Cancel
                          </button>
                          <button 
                            className="submit-reply-btn"
                            onClick={() => handleReplySubmit(comment.id)}
                          >
                            Post Reply
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="replies-container">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="reply-item">
                            <div className="reply-avatar">
                              <i className="fas fa-user-circle"></i>
                            </div>
                            <div className="reply-content">
                              <div className="reply-header">
                                <span className="reply-author">{reply.author}</span>
                                <span className="reply-date">
                                  <i className="far fa-clock"></i> {formatDate(reply.date)}
                                </span>
                                
                                {/* Three Dots Menu for Reply */}
                                <div className="comment-menu-container">
                                  <button 
                                    className="menu-trigger"
                                    onClick={() => toggleMenu(`reply-${comment.id}-${reply.id}`)}
                                  >
                                    <i className="fas fa-ellipsis-v"></i>
                                  </button>
                                  {activeMenu === `reply-${comment.id}-${reply.id}` && (
                                    <div className="menu-dropdown">
                                      <button 
                                        className="menu-item delete"
                                        onClick={() => handleDeleteReply(comment.id, reply.id)}
                                      >
                                        <i className="fas fa-trash-alt"></i> Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="reply-text">{reply.content}</p>
                              <div className="reply-actions">
                                <button 
                                  className="action-btn like-btn"
                                  onClick={() => handleLike(comment.id, true, reply.id)}
                                >
                                  <i className="far fa-heart"></i>
                                  <span>{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
    </>
  );
};

export default Post2;