// post1.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Blogpage1.css"; // Linking to your existing CSS

const Post1 = () => {
  // State for comments
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState(""); // Anonymous name for comment
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyAuthor, setReplyAuthor] = useState(""); // Anonymous name for reply
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAuthorInput, setShowAuthorInput] = useState(false); // Toggle for comment author input
  const [showReplyAuthorInput, setShowReplyAuthorInput] = useState(false); // Toggle for reply author input

  // Handle new comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Use custom name if provided, otherwise default to "Anonymous User"
    const author = commentAuthor.trim() || "Anonymous User";

    const comment = {
      id: Date.now(),
      author: author,
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setCommentAuthor(""); // Reset author name
    setShowAuthorInput(false); // Hide author input after posting
  };

  // Handle reply submission
  const handleReplySubmit = (commentId) => {
    if (!replyContent.trim()) return;

    // Use custom name if provided, otherwise default to "Anonymous User"
    const author = replyAuthor.trim() || "Anonymous User";

    const reply = {
      id: Date.now(),
      author: author,
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
    setReplyAuthor(""); // Reset reply author
    setShowReplyAuthorInput(false); // Hide reply author input
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

  // Toggle author input for comment
  const toggleAuthorInput = () => {
    setShowAuthorInput(!showAuthorInput);
  };

  // Toggle author input for reply
  const toggleReplyAuthorInput = () => {
    setShowReplyAuthorInput(!showReplyAuthorInput);
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
        <title>What Is Anonymous Social Media? | Kalesh Blog</title>
        <meta name="description" content="Learn how anonymous social media works, its benefits, and why platforms like Kalesh are changing online expression forever." />
        <link rel="canonical" href="https://thekalesh.com/blog/Post1" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "What Is Anonymous Social Media and How Does It Work?",
            "description": "Learn how anonymous social media works and its benefits.",
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
            "datePublished": "2026-02-05",
            "dateModified": "2026-02-05"
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
                src="/images/logo-600.webp"
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
              What Is Anonymous Social Media and How Does It Work?
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
            src="/blog-post1.webp"
            alt="Future of Social Media"
            className="hero-img"
          />
          <div className="image-caption">
            <i className="fas fa-camera"></i>
            <span>
              The evolution of digital communication in the anonymous space
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
        <h2>What Is Anonymous Social Media and How Does It Work?</h2>
        <p>
          Anonymous social media is a type of platform where users can share opinions,
          vote, and interact without revealing their personal identity. Instead of profiles,
          followers, and public validation, the focus remains purely on ideas and opinions.
        </p>
        <p>
          On identity-driven platforms, people often hesitate to speak honestly due to
          fear of judgment, screenshots, or long-term reputation damage. This is especially
          common among <strong>students, introverts, and Gen-Z users</strong>. Anonymous
          social media removes this fear by separating identity from expression.
        </p>
      </section>

      {/* The Anonymous Revolution */}
      <section className="content-section">
        <h2>Why Anonymous Platforms Like Kalesh Are Growing Rapidly</h2>
        <p>
          The rise of anonymous platforms is a direct response to how modern users behave
          online. People want to participate, but without social pressure or personal risk.
        </p>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Freedom of Expression</h3>
              <p>
                On Kalesh, users can express real opinions without worrying about who is
                watching. This leads to honest responses, unfiltered thoughts, and
                meaningful participation.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>No Social Validation Pressure</h3>
              <p>
                Kalesh removes likes, followers, and public profiles. Users engage with
                content based on interest, not popularity, making interactions more real
                and unbiased.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Equal Voice for Everyone</h3>
              <p>
                Whether someone is confident or introverted, new or experienced, every
                opinion on Kalesh has equal visibility and value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="content-section">
        <h2>How Kalesh Maintains Anonymity and User Safety</h2>
        <p>
          Kalesh is built with a privacy-first approach that balances anonymity with
          responsibility, ensuring users feel safe while expressing themselves.
        </p>

        <ul style={{ color: '#b3b3b3', marginLeft: '20px', lineHeight: '1.8' }}>
          <li>
            <strong>Anonymous Profiles:</strong> Users interact without displaying real
            names or public identities.
          </li>
          <li>
            <strong>One Account Per Mobile Number:</strong> Prevents spam while keeping
            user identity hidden.
          </li>
          <li>
            <strong>Real-Time Moderation:</strong> Harmful or abusive content is actively
            monitored and controlled.
          </li>
          <li>
            <strong>Reporting & Blocking Tools:</strong> Users can report misuse and block
            disruptive behavior instantly.
          </li>
          <li>
            <strong>No Public Data Exposure:</strong> Personal details are never visible
            to other users.
          </li>
        </ul>
      </section>

      {/* Use Cases */}
      <section className="content-section">
        <h2>How People Use Anonymous Social Media on Kalesh</h2>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="step-content">
              <h3>College Students & Campuses</h3>
              <p>
                Students use Kalesh to share opinions, participate in live polls,
                discuss sensitive topics, and give honest feedback without fear of
                peer judgment.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">
              <i className="fas fa-building"></i>
            </div>
            <div className="step-content">
              <h3>Brands, Events & Communities</h3>
              <p>
                Organizations use Kalesh polls to collect real-time, unbiased opinions
                from audiences, helping them understand genuine public sentiment.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">
              <i className="fas fa-heart"></i>
            </div>
            <div className="step-content">
              <h3>Everyday Honest Conversations</h3>
              <p>
                Users discuss thoughts they would normally hesitate to share elsewhere,
                creating open conversations without identity pressure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</article>

{/* Comments Section */}
<section className="comments-section">
  <div className="container-fluid">
    <div className="content-wrapper">
      <div className="comments-header">
        <h2 className="comments-title">
          <i className="far fa-comments"></i> Comments
          <span className="comment-count">{comments.length}</span>
        </h2>
        <p className="comments-subtitle">
          Join the conversation anonymously. Choose your anonymous name below.
        </p>
      </div>

      {/* Comment Form */}
      <div className="comment-form-container">
        <form onSubmit={handleCommentSubmit} className="comment-form">
          {/* Anonymous Name Input - Toggleable */}
          <div className="form-group">
            <div className="author-input-toggle">
              <button 
                type="button" 
                className="toggle-author-btn"
                onClick={toggleAuthorInput}
              >
                <i className="fas fa-user-secret"></i>
                {showAuthorInput ? 'Hide name option' : 'Choose anonymous name'}
              </button>
            </div>
            
            {showAuthorInput && (
              <div className="author-input-container">
                <input
                  type="text"
                  className="author-input"
                  placeholder="Enter your anonymous name (optional)"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  maxLength="50"
                />
                <span className="input-hint">
                  Leave empty to post as "Anonymous User"
                </span>
              </div>
            )}
          </div>

          <div className="form-group">
            <textarea
              className="comment-input"
              placeholder="Share your thoughts about anonymous social media..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <div className="form-footer">
            <span className="anonymous-badge">
              <i className="fas fa-user-secret"></i> 
              Posting as: <strong>{commentAuthor.trim() || "Anonymous User"}</strong>
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
                  {/* Anonymous Name Input for Reply - Toggleable */}
                  <div className="form-group">
                    <div className="author-input-toggle">
                      <button 
                        type="button" 
                        className="toggle-author-btn small"
                        onClick={toggleReplyAuthorInput}
                      >
                        <i className="fas fa-user-secret"></i>
                        {showReplyAuthorInput ? 'Hide name option' : 'Choose anonymous name'}
                      </button>
                    </div>
                    
                    {showReplyAuthorInput && (
                      <div className="author-input-container">
                        <input
                          type="text"
                          className="author-input"
                          placeholder="Enter your anonymous name (optional)"
                          value={replyAuthor}
                          onChange={(e) => setReplyAuthor(e.target.value)}
                          maxLength="50"
                        />
                        <span className="input-hint">
                          Leave empty to reply as "Anonymous User"
                        </span>
                      </div>
                    )}
                  </div>

                  <textarea
                    className="reply-input"
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows="2"
                  ></textarea>
                  <div className="reply-actions">
                    <span className="anonymous-badge small">
                      <i className="fas fa-user-secret"></i> 
                      Replying as: <strong>{replyAuthor.trim() || "Anonymous User"}</strong>
                    </span>
                    <div className="reply-buttons">
                      <button 
                        className="cancel-reply-btn"
                        onClick={() => {
                          setReplyTo(null);
                          setReplyContent("");
                          setReplyAuthor("");
                          setShowReplyAuthorInput(false);
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

export default Post1;