import React from "react";
import "./Blogpage1.css";

const BlogPage1 = () => {
  return (
    <div className="blog-detail-page">
      {/* Navigation Bar */}
      <nav className="blog-nav">
        <div className="container-fluid">
          <div className="nav-content">
            <a href="/blog" className="back-button">
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
            <h1 className="article-title">Introducing Kalesh</h1>
            <div className="article-meta">
              <div className="meta-item">
                <i className="far fa-calendar"></i>
                <span>February 03, 2026</span>
              </div>
              <div className="meta-item">
                <i className="far fa-clock"></i>
                <span>3 min read</span>
              </div>
            </div>
            <div className="article-author">
              <div className="author-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="author-info">
                <h4>Kalesh Team</h4>
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
            src="/blog-image.webp"
            alt="Kalesh"
            className="hero-img"
          />
          <div className="image-caption">
            <span>
              Kalesh blogs provide a new way to follow updates from people and
              organizations
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
              <h2>Introduction : Why Kalesh Exists?</h2>
              <p>
                Social media was meant to give people a voice. Somewhere along
                the way, it became a stage. <br /> Today, most platforms reward:
                <ul>
                  <li>Popularity over honesty</li>
                  <li>Identity over ideas</li>
                  <li>Performance over participation</li>
                  </ul> 
                People scroll endlessly, but hesitate before
                posting. Not because they lack opinions — but because they fear
                judgement. <br /> This is the exact gap Kalesh was built to fill. <br /> Kalesh
                is not just another social media app. It is India’s first
                real-time anonymous opinion platform, designed to let people
                speak freely — without exposing who they are.
              </p>
              <p>
                
              </p>
            </section>

            {/*Why Kalesh is Anonymous */}

            <section className="content-section">
              <h2>What Makes Kalesh “Real” Anonymous Social Media?</h2>
              <p>
                Most platforms claim anonymity as a feature. Kalesh treats anonymity as the foundation. <br />
                From the moment a user opens the app, the experience is different: 
                <ul>
                  <li>No pressure to create a public identity.</li>
                  <li>No race for followers or likes.</li>
                  <li>No fear of being judged for opinions.</li>
                  <li>No algorithm deciding who deserves reach.</li>
                </ul>
              </p>
              
            </section>

              {/*Step-by-Step Kalesh */}
          
            <section className="content-section">
              <h2>The Kalesh User Journey: Step-by-Step Experience.</h2>
              <h2>1. Anonymous Profiles (Privacy by Design)</h2>
              <p>
                Unlike traditional social platforms, Kalesh does not push users to build a personal brand. <br />
                From a user’s perspective :
                <ul>
                  <li>You don’t upload a public profile photo.</li>
                  <li>You don’t display your real name.</li>
                  <li>You don’t carry social labels.</li>
                </ul>
                Yet, you still feel present — because your activity defines you :
                <ul>
                  <li>Polls you create.</li>
                  <li>Votes you cast.</li>
                  <li>You don’t carry social labels.</li>
                </ul>
              </p>
              
            </section>

              {/*Step-by-Step Kalesh */}
          
            <section className="content-section">
              <h2>2. Live Poll Creation: Your Opinion Goes Live Instantly</h2>
              <p>
                At the heart of Kalesh lies its most powerful feature — real-time live polls.<br />
                What a user can do :
                <ul>
                  <li>Ask serious questions.</li>
                  <li>Share fun opinions.</li>
                  <li>Raise controversial topics.</li>
                  <li>Seek honest advice.</li>
                </ul>
                The moment a poll is created :
                <ul>
                  <li>It appears instantly on the live dashboard
.</li>
                  <li>Other users start voting immediately.</li>
                  <li>Results update in real time.</li>
                </ul>
                There is no waiting for reach. <br />
                There is no dependency on followers. <br />

                Your poll lives or dies purely on interest and relevance.
              </p>
              
            </section>

            <section className="content-section">
              <h2>3. Real-Time Anonymous Voting (No Filters, No Bias)</h2>
              <p>
                Voting on Kalesh is designed to be:
                <ul>
                  <li>Fast.</li>
                  <li>Anonymous.</li>
                  <li>Pressure-free.</li>
                </ul>
                Users don’t overthink because :
                <ul>
                  <li>No one sees who voted
.</li>
                  <li>No one judges the choice.</li>
                  <li>No vote is tied to identity.</li>
                </ul>
                
                As a result, poll outcomes are :
                <ul>
                  <li>More honest

.</li>
                  <li>Less influenced.</li>
                  <li>Emotionally accurate.</li>
                </ul>
                This makes Kalesh one of the most reliable platforms for real opinions.

              </p>
              
            </section>

            <section className="content-section">
              <h2>4. Anonymous Poll Discussions (Chat That Feels Safe)</h2>
              <p>
                Opinions don’t stop at voting.<br />
                Each poll on Kalesh has an anonymous discussion space where users can :
                <ul>
                  <li>Explain why they voted a certain way.</li>
                  <li>Share personal experiences.</li>
                  <li>Respectfully disagree.</li>
                  <li>Add context to the poll.</li>
                </ul>
                Because identities are hidden :
                <ul>
                  <li>Ego disappears
.</li>
                  <li>Conversations stay topic-focused.</li>
                  <li>Introverts speak up.</li>
                  <li>Toxic behavior reduces naturally.</li>
                </ul>
                This isn’t comment chaos — it’s structured anonymous discussion.
              </p>
              
            </section>

            <section className="content-section">
              <h2>5. User Safety, Reporting & Moderation (Without Breaking Anonymity)</h2>
              <p>
                A common misconception is that anonymity means lack of control. Kalesh proves the opposite.
              From a user’s perspective :
                <ul>
                  <li>You can report inappropriate polls or chats.</li>
                  <li>You can block harmful users.</li>
                  <li>You feel protected without being exposed.</li>
                </ul>
                Behind the scenes :
                <ul>
                  <li>Moderation systems monitor misuse
.</li>
                  <li>One-account-per-number policy reduces spam.</li>
                  <li>Community guidelines are enforced.</li>
                </ul>
                Anonymity is preserved — but accountability still exists.
              </p>
              
            </section>

            <section className="content-section">
              <h2>6. Why Kalesh Feels Different Emotionally</h2>
              <p>
                Users often describe Kalesh as :
                <ul>
                  <li>Lighter.</li>
                  <li>Safer.</li>
                  <li>More honest.</li>
                  <li>Less exhausting.</li>
                </ul>
                Why? Because :
                <ul>
                  <li>There’s nothing to prove
.</li>
                  <li>There’s nothing to protect.</li>
                  <li>There’s nothing to perform.</li>
                </ul>
                You simply show up, vote, speak, and leave — without carrying digital baggage.
              </p>
              
            </section>

            <section className="content-section">
              <h2>7. Who is Kalesh built for?</h2>
              <p>
                Kalesh is built for :
                <ul>
                  <li>College students.</li>
                  <li>Gen-Z users.</li>
                  <li>Introverts.</li>
                  <li>First-time opinion sharers.</li>
                  <li>Creators seeking honest feedback.</li>
                  <li>Brands & campuses seeking real insights.</li>
                </ul>
                Anyone who has ever thought:
                
                  <p style={{color:"whitesmoke"}}>“I wish I could say this without people judging me.”</p>
              </p>
              
            </section>

            {/* Key Features */}
            <section className="content-section">
              <h2>Key Features of Kalesh</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-user-secret"></i>
                  </div>
                  <h3>Anonymity</h3>
                  <p>
                    Anonymity on Kalesh means your opinions speak louder than your identity — no names, no judgment, just real voices.
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h3>Security & Safety</h3>
                  <p>
                    Security & Safety on Kalesh are built-in by design — strong moderation, smart controls, and zero identity exposure keep every conversation protected.
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  <h3>End-to-End Encrypted Messaging</h3>
                  <p>
                    End-to-end encrypted messaging on Kalesh ensures your conversations stay strictly between you and the community — private, secure, and untouchable.
                  </p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-hourglass-end"></i>
                  </div>
                  <h3>Disappearing Messages</h3>
                  <p>Disappearing messages on Kalesh vanish after their moment — so you speak freely, without leaving a digital footprint behind.</p>
                </div>
              </div>
            </section>

            {/* How It Works */}

            {/* Quote Section */}
            <section className="quote-section">
              <div className="quote-content">
                <i className="fas fa-quote-left quote-icon"></i>
                <blockquote>
                  At Kalesh, we’re not just building another social platform — we’re building courage.
Courage to speak honestly, to question freely, and to be real without fear.
We believe the future belongs to opinions, not profiles.
Welcome to Kalesh — where your voice matters, not your identity.
                </blockquote>
                <div className="quote-author">
                  <strong>Shikhar Dixit</strong>
                  <span>CEO, Kalesh</span>
                </div>
              </div>
            </section>

            {/* Availability */}

            {/* Share Section */}

            {/* Related Articles */}
          </div>
        </div>
      </article>

      {/* Footer */}
    </div>
  );
};

export default BlogPage1;
