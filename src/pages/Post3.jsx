// post3.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Blogpage1.css";

const Post3 = () => {
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
        <title>Anonymous vs Public Comments: Which Is Safer? | Kalesh Blog</title>
        <meta name="description" content="Compare anonymous and public commenting. Learn why anonymous comments on Kalesh protect users and keep discussions opinion-driven." />
        <link rel="canonical" href="https://thekalesh.com/blog/Post3" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Anonymous vs Public Comments: Which Is Safer?",
            "description": "Compare anonymous and public commenting on Kalesh.",
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
              Anonymous Comment vs Public Comments: Which Is Safer?
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
            src="/blog-post3.webp"
            alt=""
            className="hero-img"
          />
          <div className="image-caption">
            <i className="fas fa-camera"></i>
            <span>
              Understanding which comment system offers better safety and freedom of expression.
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
              <h2>Anonymous Comments vs Public Comments: Which Is Safer?</h2>
              <p>
                Online discussions usually happen in public comment sections where names,
                profiles, and social identity are visible. While this creates transparency,
                it also introduces fear — fear of judgment, screenshots, harassment, and
                long-term reputation damage.
              </p>
              <p>
                Anonymous comments take a different approach. By removing identity from
                the conversation, platforms like Kalesh allow users to express opinions
                freely, focusing on the message instead of the person behind it.
              </p>
            </section>

            {/* Safety Difference */}
            <section className="content-section">
              <h2>Why Anonymous Comments Feel Safer</h2>
              <p>
                The difference between anonymous and public comments comes down to how
                users perceive risk while expressing themselves.
              </p>

              <div className="steps-container">
                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-mask"></i>
                  </div>
                  <div className="step-content">
                    <h3>Identity Protection</h3>
                    <p>
                      Anonymous comments protect users from personal attacks, stalking,
                      and unwanted attention by keeping identities hidden.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-balance-scale"></i>
                  </div>
                  <div className="step-content">
                    <h3>Reduced Fear of Judgment</h3>
                    <p>
                      Without names or profiles attached, users feel more comfortable
                      sharing honest opinions, even on sensitive topics.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="step-content">
                    <h3>Lower Harassment Risk</h3>
                    <p>
                      Anonymous systems reduce targeted harassment since attackers
                      cannot link comments to real-world identities.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Platform Comparison */}
            <section className="content-section">
              <h2>Anonymous vs Public Comments: Key Differences</h2>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shield-heart"></i>
                  </div>
                  <h3>Emotional Safety</h3>
                  <p>
                    Anonymous comments reduce anxiety and hesitation, allowing users
                    to participate without worrying about personal consequences.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h3>Honest Conversations</h3>
                  <p>
                    Public comments are often filtered and cautious, while anonymous
                    comments tend to be more direct and genuine.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3>Opinion Diversity</h3>
                  <p>
                    Anonymous platforms encourage participation from introverts and
                    users who usually stay silent in public spaces.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <h3>Topic-Focused Discussion</h3>
                  <p>
                    When identity is removed, discussions shift away from personal
                    attacks and focus more on the subject itself.
                  </p>
                </div>
              </div>
            </section>

            {/* Safety on Kalesh */}
            <section className="content-section">
              <h2>How Kalesh Keeps Anonymous Comments Safe</h2>
              <p>
                Anonymity alone does not guarantee safety. Kalesh combines anonymity
                with strong moderation and user controls to maintain healthy discussions.
              </p>

              <ul style={{ color: '#b3b3b3', marginLeft: '20px', lineHeight: '1.8' }}>
                <li><strong>Anonymous by Default:</strong> No public profiles or visible identities</li>
                <li><strong>One Account Per Mobile Number:</strong> Limits spam and misuse</li>
                <li><strong>Reporting & Blocking:</strong> Users can report harmful behavior instantly</li>
                <li><strong>Active Moderation:</strong> Inappropriate content is reviewed and removed</li>
                <li><strong>Topic-Based Discussions:</strong> Comments stay relevant and focused</li>
              </ul>
            </section>

            {/* Real-World Usage */}
            <section className="content-section">
              <h2>Where Anonymous Comments Work Best</h2>

              <div className="steps-container">
                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="step-content">
                    <h3>Students & Campuses</h3>
                    <p>
                      Students discuss opinions, feedback, and concerns without fear
                      of peer judgment or social backlash.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="step-content">
                    <h3>Communities & Brands</h3>
                    <p>
                      Anonymous comments help organizations collect honest feedback
                      that users would hesitate to share publicly.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">
                    <i className="fas fa-hand-holding-heart"></i>
                  </div>
                  <div className="step-content">
                    <h3>Everyday Conversations</h3>
                    <p>
                      Users talk openly about opinions and experiences that are usually
                      filtered in public comment sections.
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
                    placeholder="Share your thoughts about anonymous vs public comments..."
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

export default Post3;