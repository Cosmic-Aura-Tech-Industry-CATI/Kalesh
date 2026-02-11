import React from "react";
import "./Blogpage1.css";

const Post3 = () => {
  return (
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


            {/* Quote Section */}
            

            {/* Case Studies */}
            

            {/* Ethical Considerations */}
            

            {/* Share Section */}
            

            {/* Related Articles */}
            
          </div>
        </div>
      </article>

      {/* Footer */}
      
    </div>
  );
};

export default Post3;