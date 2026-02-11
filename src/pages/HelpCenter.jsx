import { useState, useMemo, useCallback } from "react";
import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import "../styles/pages/helpcenter.css";


const HelpCenter = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // SVG Icons - Memoized to prevent recreation on re-renders
  const icons = useMemo(() => ({
    search: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    chevronRight: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m9 18 6-6-6-6" />
      </svg>
    ),
    shield: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    user: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    messageSquare: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    lock: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    zap: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    alertTriangle: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    mail: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    externalLink: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
    checkCircle: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
  }), []);

  // FAQ Data
  const faqData = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create my first anonymous poll?',
      answer: 'Tap the + button on the main feed, choose "Create Poll", type your question and options. No name or profile needed - just your anonymous opinion.',
      icon: '💡'
    },
    {
      id: 2,
      category: 'privacy',
      question: 'Is my phone number visible to other users?',
      answer: 'No. Your phone number is only used for verification and is never displayed publicly. Kalesh uses encrypted identifiers internally while keeping your identity hidden.',
      icon: '🔒'
    },
    {
      id: 3,
      category: 'safety',
      question: 'How do I report harmful content anonymously?',
      answer: 'Tap the three dots on any poll or comment, select "Report", choose the reason. Our moderation team reviews all reports while protecting your anonymity.',
      icon: '🛡️'
    },
    {
      id: 4,
      category: 'technical',
      question: 'Why am I not receiving verification codes?',
      answer: 'Ensure you\'re using the correct phone number. Check your spam folder. If issues persist, try requesting a new code or use the voice verification option.',
      icon: '⚡'
    },
    {
      id: 5,
      category: 'account',
      question: 'Can I delete my account and all my data?',
      answer: 'Yes. Go to Settings > Privacy > Delete Account. This permanently removes all your polls, votes, and associated data from our systems within 30 days.',
      icon: '🗑️'
    },
    {
      id: 6,
      category: 'privacy',
      question: 'Does Kalesh track my location?',
      answer: 'No. We do not collect GPS data or precise location information. Your approximate location (country-level) may be used for content relevance only.',
      icon: '📍'
    }
  ];

  // Category Data
  const categories = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'First steps, creating polls, voting basics',
      icon: icons.zap,
      color: '#ff6a00',
      count: 12
    },
    {
      id: 2,
      title: 'Account & Anonymity',
      description: 'Privacy settings, anonymous identity, verification',
      icon: icons.user,
      color: '#00d4aa',
      count: 8
    },
    {
      id: 3,
      title: 'Polls & Voting',
      description: 'Creating polls, voting features, real-time updates',
      icon: icons.messageSquare,
      color: '#9d4edd',
      count: 15
    },
    {
      id: 4,
      title: 'Safety & Reporting',
      description: 'Community guidelines, reporting, moderation',
      icon: icons.shield,
      color: '#ff4757',
      count: 10
    },
    {
      id: 5,
      title: 'Privacy & Data',
      description: 'Data protection, encryption, your rights',
      icon: icons.lock,
      color: '#00b4d8',
      count: 7
    },
    {
      id: 6,
      title: 'Technical Issues',
      description: 'Troubleshooting, app issues, bugs',
      icon: icons.alertTriangle,
      color: '#ffd166',
      count: 9
    }
  ];

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, []);

  const toggleFAQ = useCallback((id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  }, [activeFAQ]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Help Center – Kalesh Anonymous Support & FAQs</title>
        <meta name="description" content="Get help with Kalesh's anonymous platform. Find answers to FAQs about privacy, safety, polls, and more. 100% anonymous support." />
        <link rel="canonical" href="https://thekalesh.com/help" />
      </Helmet>
      <SEO
        title="Help Center – Kalesh Anonymous Support & FAQs"
        description="Get help with Kalesh's anonymous platform. Find answers to FAQs about privacy, safety, polls, and more. 100% anonymous support."
      />

      <div className="help-center-container">
      {/* Animated Background Elements - Reduced opacity for pure black theme */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      
      {/* Main Content */}
      <div className="help-center-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
              We've Got You — <span className="gradient-text">Anonymously.</span>
            </h1>
            <p className="hero-subtitle">
              Get help without revealing your identity. Everything you need to know about Kalesh, 
              designed to protect your privacy while you express freely.
            </p>
          </div>
        </section>

        {/* Smart Search */}
        <section className="search-section">
          <div className="search-container glass-card">
            <div className="search-icon">
              {icons.search}
            </div>
            <input
              type="text"
              placeholder="Search help topics, safety, privacy, or issues…"
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                ×
              </button>
            )}
          </div>
          {isSearching && (
            <div className="search-results glass-card">
              <p className="search-results-count">Found 8 results for "{searchQuery}"</p>
              {/* Search results would be mapped here */}
            </div>
          )}
        </section>

        {/* Category Grid */}
        <section className="categories-section">
          <h2 className="section-title">Quick Help Categories</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card glass-card"
                style={{ '--accent-color': category.color }}
              >
                <div className="category-header">
                  <div className="category-icon" style={{ color: category.color }}>
                    {category.icon}
                  </div>
                  <span className="category-count">{category.count} topics</span>
                </div>
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
                <button className="category-explore">
                  Explore {icons.chevronRight}
                </button>
                <div className="category-glow"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular FAQs */}
        <section className="faq-section">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Quick answers to common questions about anonymity and safety</p>
          </div>
          
          <div className="faq-container">
            {faqData.map((faq) => (
              <div 
                key={faq.id} 
                className={`faq-item glass-card ${activeFAQ === faq.id ? 'active' : ''}`}
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="faq-header">
                  <span className="faq-icon">{faq.icon}</span>
                  <h3 className="faq-question">{faq.question}</h3>
                  <div className="faq-toggle">
                    {icons.chevronRight}
                  </div>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                  {faq.category === 'privacy' && (
                    <div className="privacy-badge">
                      {icons.lock} Privacy Protected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section className="support-section">
          <div className="support-container glass-card">
            <div className="support-content">
              <h2 className="support-title">Still Need Help?</h2>
              <p className="support-description">
                Our anonymous support system ensures you get help without compromising your privacy.
                No names, no profiles — just solutions.
              </p>
              
              <div className="trust-badges">
                <div className="trust-badge">
                  {icons.checkCircle}
                  <span>100% Anonymous</span>
                </div>
                <div className="trust-badge">
                  {icons.checkCircle}
                  <span>Privacy-First</span>
                </div>
                <div className="trust-badge">
                  {icons.checkCircle}
                  <span>Secure Moderation</span>
                </div>
              </div>

              <div className="support-options">
                <button className="support-button primary">
                  {icons.mail}
                  Send Anonymous Request
                </button>
                <button className="support-button secondary">
                  {icons.externalLink}
                  Visit Community Forum
                </button>
              </div>
            </div>
            <div className="support-illustration">
              <div className="illustration-circle"></div>
              <div className="illustration-shield">
                {icons.shield}
              </div>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="tips-section">
          <h2 className="section-title">Anonymous Expression Tips</h2>
          <div className="tips-grid">
            <div className="tip-card glass-card">
              <div className="tip-number">01</div>
              <h3 className="tip-title">Stay Anonymous</h3>
              <p className="tip-content">
                Never share personal identifiers. Kalesh is designed for anonymous expression.
              </p>
            </div>
            <div className="tip-card glass-card">
              <div className="tip-number">02</div>
              <h3 className="tip-title">Respect Privacy</h3>
              <p className="tip-content">
                Don't try to identify other users. Respect anonymity as you expect yours respected.
              </p>
            </div>
            <div className="tip-card glass-card">
              <div className="tip-number">03</div>
              <h3 className="tip-title">Report Responsibly</h3>
              <p className="tip-content">
                Use reporting features for harmful content. Help keep the community safe.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

export default HelpCenter;