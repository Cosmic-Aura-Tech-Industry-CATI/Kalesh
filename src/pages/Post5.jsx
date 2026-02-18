// post5.jsx
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Blogpage1.css"; // Linking to your existing CSS

const Post5 = () => {
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
        <title>Privacy & Security on Kalesh | Kalesh Blog</title>
        <meta name="description" content="Learn how Kalesh protects your anonymity with end-to-end encryption, secure authentication, and strict privacy policies." />
        <link rel="canonical" href="https://thekalesh.com/blog/Post5" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Privacy & Security on Kalesh",
            "description": "Learn how Kalesh protects your anonymity.",
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
            "datePublished": "2026-02-09",
            "dateModified": "2026-02-09"
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
              Top Benefits of Using Anonymous Opinion Platforms
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
            src="/blog-post5.webp"
            alt="Benefits of Anonymous Opinion Platforms"
            className="hero-img"
          />
          <div className="image-caption">
            <i className="fas fa-camera"></i>
            <span>
              Honest opinions thrive where identity pressure disappears
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
              <h2>Top Benefits of Using Anonymous Opinion Platforms</h2>
              <p>
                Anonymous opinion platforms are changing how people share
                thoughts online. By removing identity from conversations, these
                platforms allow users to express real opinions without fear of
                judgment, backlash, or social pressure.
              </p>
              <p>
                Unlike traditional social media, where opinions are tied to
                profiles, followers, and reputation, anonymous platforms focus
                purely on what people think — not who they are.
              </p>
            </section>

            {/* Core Benefits */}
            <section className="content-section">
              <h2>Why Anonymous Opinion Platforms Are So Effective</h2>
              <p>
                The effectiveness of anonymous platforms comes from their
                ability to remove emotional and social barriers that usually
                prevent honest participation.
              </p>

              <div className="steps-container">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Freedom of Expression</h3>
                    <p>
                      Users can share opinions openly without worrying about how
                      they will be perceived. This leads to unfiltered thoughts,
                      genuine responses, and more meaningful conversations.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>No Social or Peer Pressure</h3>
                    <p>
                      Without likes, followers, or public profiles, users are
                      not influenced by popularity or social validation,
                      resulting in unbiased opinions.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Honest and Reliable Feedback</h3>
                    <p>
                      Anonymous opinions are often more truthful, making these
                      platforms ideal for collecting real feedback and
                      understanding genuine public sentiment.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Platform Advantages */}
            <section className="content-section">
              <h2>Key Advantages of Anonymous Opinion Platforms</h2>
              <p>
                Anonymous platforms provide a balanced environment where users
                feel safe while discussions remain constructive and focused.
              </p>

              <ul
                style={{
                  color: "#b3b3b3",
                  marginLeft: "20px",
                  lineHeight: "1.8",
                }}
              >
                <li>
                  <strong>Equal Voice for Everyone:</strong> Every opinion has
                  the same visibility, regardless of background or confidence
                  level.
                </li>
                <li>
                  <strong>Reduced Harassment:</strong> Conversations focus on
                  ideas rather than individuals, lowering personal attacks.
                </li>
                <li>
                  <strong>Judgment-Free Environment:</strong> Users feel
                  comfortable expressing unpopular or sensitive opinions.
                </li>
                <li>
                  <strong>Better Decision-Making:</strong> Honest input leads to
                  clearer insights and informed choices.
                </li>
                <li>
                  <strong>Mental Comfort:</strong> Users participate without
                  anxiety or fear of long-term consequences.
                </li>
              </ul>

              <p>
                These advantages make anonymous opinion platforms especially
                useful for students, communities, organizations, and anyone
                seeking honest dialogue.
              </p>
            </section>

            {/* Use Cases */}
            <section className="content-section">
              <h2>Where Anonymous Opinion Platforms Are Most Useful</h2>

              <div className="steps-container">
                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="step-content">
                    <h3>Students & Educational Communities</h3>
                    <p>
                      Students use anonymous platforms to ask questions, share
                      opinions, and discuss topics they might hesitate to raise
                      publicly.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="step-content">
                    <h3>Brands, Events & Feedback Collection</h3>
                    <p>
                      Brands and organizations collect unbiased feedback and
                      real opinions, helping them improve decisions and user
                      experience.
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
                      People share thoughts they normally keep to themselves,
                      creating open discussions without fear of being judged.
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
                    placeholder="Share your thoughts about the benefits of anonymous platforms..."
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

export default Post5;