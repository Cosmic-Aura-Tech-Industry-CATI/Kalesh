import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from "../components/SEO";
import './GlassComponents.css';

function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const faqData = [
    {
      question: "What is Kalesh?",
      answer: "Kalesh is an anonymous social media platform that follows the core concepts of traditional social media, such as profiles, followers, following, likes, impressions, and content history — while fully maintaining user anonymity. It allows users to share opinions, create real-time polls, participate in discussions, and build an anonymous presence without revealing their real identity.",
      category: "basics",
      tags: ["platform", "anonymous", "social media"]
    },
    {
      question: "Is Kalesh an anonymous social media platform or a polling app?",
      answer: "Kalesh is both. It is a full-featured anonymous social media platform where users can maintain anonymous profiles, gain followers, and track impressions, while also being centered around real-time opinion polls that are broadcast live to users.",
      category: "basics",
      tags: ["platform", "polling", "social media"]
    },
    {
      question: "How is Kalesh different from traditional social media platforms?",
      answer: "Traditional social media platforms focus on real identities, public profiles, and social validation pressure. Kalesh removes real identity while retaining social media mechanics like followers, engagement, reach, and content history. This allows users to express opinions freely without fear of judgment, screenshots, or real-world consequences.",
      category: "comparison",
      tags: ["differences", "traditional social media", "anonymity"]
    },
    {
      question: "How is Kalesh different from Instagram?",
      answer: "Instagram is identity-driven and centered around curated personal branding, where reach depends heavily on follower count and image presentation. Kalesh removes identity pressure completely while still allowing users to build an anonymous presence based on opinions, engagement, and participation. Visibility on Kalesh depends on interaction, not real-world popularity.",
      category: "comparison",
      tags: ["vs Instagram", "differences", "social media"]
    },
    {
      question: "How is Kalesh different from Twitter (X)?",
      answer: "Twitter ties opinions directly to public identities, often leading to trolling, backlash, and screenshot culture. Kalesh allows users to express opinions anonymously, participate in debates, and engage in discussions without exposing their identity, making conversations more honest and less toxic.",
      category: "comparison",
      tags: ["vs Twitter", "differences", "anonymity"]
    },
    {
      question: "Is Kalesh completely anonymous?",
      answer: "Yes. Kalesh maintains full anonymity at the public level. Real names, photos, and personal identities are never shown. Users interact through anonymous profiles that represent their activity, opinions, and engagement — not their real-world identity.",
      category: "privacy",
      tags: ["anonymity", "privacy", "identity"]
    },
    {
      question: "What is an anonymous profile on Kalesh?",
      answer: "An anonymous profile on Kalesh is a social profile that displays a user's polls, comments, impressions, followers, and engagement history without revealing who the user is in real life. It allows users to build reputation and reach while remaining anonymous.",
      category: "features",
      tags: ["profile", "anonymous", "social media"]
    },
    {
      question: "Can users have followers and following on Kalesh?",
      answer: "Yes. Kalesh supports followers and following just like traditional social media platforms. Users can follow anonymous profiles they find interesting and stay updated with their polls and discussions.",
      category: "features",
      tags: ["followers", "following", "engagement"]
    },
    {
      question: "Can other users see my previous polls and comments?",
      answer: "Yes, depending on your profile settings. Kalesh allows users to choose between public and private profile options:\n\n• Public profile → Others can see your polls and comments\n• Private profile → Your activity is hidden from profile view",
      category: "privacy",
      tags: ["profile settings", "visibility", "privacy"]
    },
    {
      question: "What is the purpose of public and private profiles?",
      answer: "Public and private profile options give users control over visibility. Some users may want to build an anonymous public presence, while others may prefer to participate privately without showcasing their activity history.",
      category: "privacy",
      tags: ["profile settings", "privacy", "control"]
    },
    {
      question: "How do real-time polls work on Kalesh?",
      answer: "Real-time polls are broadcast instantly on the Kalesh dashboard. As users vote, results update live, creating immediate engagement and interaction. Polls do not depend on follower count alone and are visible to active users in real time.",
      category: "features",
      tags: ["polls", "real-time", "engagement"]
    },
    {
      question: "What sections are available on the Kalesh dashboard?",
      answer: "The dashboard is divided into:\n\n• Recent → Shows real-time polls from all users, including new users and influencers, creating an unbiased feed\n• Popular → Shows trending polls based on impressions, likes, comments, and engagement",
      category: "features",
      tags: ["dashboard", "sections", "navigation"]
    },
    {
      question: "What makes the \"Recent\" section unique?",
      answer: "The Recent section is completely unbiased. It allows Gen-Z users to interact with polls from anyone — new users or popular creators — without algorithmic favoritism based on fame or follower count.",
      category: "features",
      tags: ["Recent section", "unbiased", "feed"]
    },
    {
      question: "What appears in the \"Popular\" section?",
      answer: "The Popular section highlights polls that are trending based on engagement metrics such as impressions, reactions, comments, and overall activity. This helps surface discussions that are resonating most with the community.",
      category: "features",
      tags: ["Popular section", "trending", "engagement"]
    },
    {
      question: "Can users react to polls?",
      answer: "Yes. Users can react to polls using five different emoji reactions, allowing emotional expression beyond simple voting.",
      category: "features",
      tags: ["reactions", "emoji", "engagement"]
    },
    {
      question: "Can users comment and discuss on polls?",
      answer: "Yes. Each poll supports anonymous comments where users can discuss, debate, and share opinions freely. This enables healthy debates, discussions, and casual conversations.",
      category: "features",
      tags: ["comments", "discussions", "debates"]
    },
    {
      question: "Does Kalesh support anonymous debates?",
      answer: "Yes. Kalesh is designed to encourage anonymous debates and discussions, allowing users to exchange views without fear of personal attacks or identity-based judgment.",
      category: "features",
      tags: ["debates", "discussions", "anonymity"]
    },
    {
      question: "Can users chat one-on-one on Kalesh?",
      answer: "Yes. Kalesh allows users to search for anonymous friends and start one-on-one anonymous chats.",
      category: "features",
      tags: ["chat", "messaging", "one-on-one"]
    },
    {
      question: "What happens to one-on-one chats?",
      answer: "One-on-one chats on Kalesh are automatically deleted after 24 hours, ensuring privacy, safety, and reducing long-term data trails.",
      category: "privacy",
      tags: ["chat", "privacy", "auto-delete"]
    },
    {
      question: "Can users search for other users on Kalesh?",
      answer: "Yes. Users can search for other anonymous profiles and connect with them while maintaining anonymity.",
      category: "features",
      tags: ["search", "profiles", "connect"]
    },
    {
      question: "How does Kalesh handle competitions and highlights?",
      answer: "Kalesh organizes User of the Week and User of the Month competitions based on engagement, participation, and activity. Selected users are highlighted on the platform, giving recognition without revealing identity.",
      category: "features",
      tags: ["competitions", "highlights", "recognition"]
    },
    {
      question: "Can anonymous users still become popular on Kalesh?",
      answer: "Yes. Popularity on Kalesh is driven by engagement, opinions, and participation — not identity. Anonymous users can gain followers, impressions, and platform recognition.",
      category: "features",
      tags: ["popularity", "engagement", "recognition"]
    },
    {
      question: "Does Kalesh support content history?",
      answer: "Yes. Users can maintain a record of their past polls and comments, allowing them to track engagement and build an anonymous content presence over time.",
      category: "features",
      tags: ["content history", "tracking", "engagement"]
    },
    {
      question: "Is Kalesh suitable for Gen-Z users?",
      answer: "Yes. Kalesh is built specifically for Gen-Z, focusing on real-time interaction, freedom of expression, reduced judgment, and unbiased visibility.",
      category: "audience",
      tags: ["Gen-Z", "users", "target audience"]
    },
    {
      question: "Is Kalesh safe to use?",
      answer: "Kalesh includes moderation tools, reporting systems, and time-bound chats to maintain a safe and respectful environment while preserving anonymity.",
      category: "safety",
      tags: ["safety", "moderation", "security"]
    },
    {
      question: "Can brands or colleges use Kalesh?",
      answer: "Yes. Brands and colleges can use Kalesh for sponsored polls, competitions, and honest audience feedback while maintaining user trust and anonymity.",
      category: "business",
      tags: ["brands", "colleges", "organizations"]
    },
    {
      question: "Is Kalesh free to use?",
      answer: "Yes. Kalesh is free for users. Additional premium or promotional features may be introduced in the future.",
      category: "pricing",
      tags: ["free", "pricing", "cost"]
    },
    {
      question: "Is Kalesh an Indian app?",
      answer: "Yes. Kalesh is an India-first platform built for Indian Gen-Z users and communities.",
      category: "availability",
      tags: ["India", "Indian app", "location"]
    },
    {
      question: "Can polls on Kalesh go viral?",
      answer: "Yes. Polls can trend organically based on engagement, impressions, reactions, and discussions, not just follower count.",
      category: "features",
      tags: ["viral", "trending", "engagement"]
    },
    {
      question: "Why should someone choose Kalesh over other social media apps?",
      answer: "Users should choose Kalesh if they want:\n\n• Anonymity with social media features\n• Honest opinions without fear\n• Real-time engagement\n• Unbiased visibility\n• Temporary private chats\n• Community-driven discussions",
      category: "comparison",
      tags: ["benefits", "advantages", "why Kalesh"]
    },
    {
      question: "Is Kalesh just another anonymous app?",
      answer: "No. Kalesh is a full anonymous social media ecosystem, combining profiles, followers, real-time polls, chats, debates, and recognition — not just anonymous posting.",
      category: "basics",
      tags: ["ecosystem", "platform", "unique"]
    },
    {
      question: "What is the long-term vision of Kalesh?",
      answer: "Kalesh aims to become India's largest anonymous opinion-based social network, where ideas, engagement, and authenticity matter more than identity.",
      category: "basics",
      tags: ["vision", "future", "goals"]
    }
  ];

  const categories = [
    { id: "all", name: "All Questions", icon: "🌐", color: "#3b82f6" },
    { id: "basics", name: "Getting Started", icon: "🚀", color: "#10b981" },
    { id: "features", name: "Features & Tools", icon: "⚡", color: "#8b5cf6" },
    { id: "privacy", name: "Privacy & Security", icon: "🔒", color: "#06b6d4" },
    { id: "safety", name: "Safety & Moderation", icon: "🛡️", color: "#f59e0b" },
    { id: "audience", name: "Who Can Use It", icon: "👥", color: "#ec4899" }
  ];

  const filteredFaq = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqData.filter((f) => {
      const matchesCategory = selected === 'all' ? true : f.category === selected;
      const matchesQuery = q
        ? (f.question + ' ' + f.answer + ' ' + f.tags.join(' ')).toLowerCase().includes(q)
        : true;
      return matchesCategory && matchesQuery;
    });
  }, [query, selected]);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const copyLinkToFaq = (index) => {
    const url = `${window.location.origin}${window.location.pathname}#faq-${index}`;
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions (FAQ) – Kalesh Anonymous Social Platform India</title>
        <meta
          name="description"
          content="Find comprehensive answers about Kalesh - India's first anonymous social media platform. Learn about real-time polls, anonymous chat, privacy protection, safety features, and how to get started with honest, judgment-free discussions."
        />
        <meta
          name="keywords"
          content="Kalesh FAQ, anonymous social media India, real-time polls, anonymous chat, privacy protection, student social app, Gen-Z app India, honest discussions, how to use Kalesh, Kalesh features, safe anonymous platform, college social app"
        />
        <link rel="canonical" href="https://thekalesh.com/faq" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Frequently Asked Questions (FAQ) – Kalesh Anonymous Platform" />
        <meta property="og:description" content="Get answers to all your questions about Kalesh - features, privacy, safety, and how to start engaging anonymously" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thekalesh.com/faq" />
        <meta property="og:image" content="https://thekalesh.com/logo.png" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ – Kalesh Anonymous Social Platform" />
        <meta name="twitter:description" content="Everything you need to know about India's first anonymous social platform" />
      </Helmet>

      {/* Enhanced FAQ Schema with more questions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.slice(0, 10).map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      <div className="glass-container">
        {/* Gradient overlays */}
        <div className="glass-top-gradient" aria-hidden="true"></div>
        <div className="glass-bottom-gradient" aria-hidden="true"></div>
        <div className="glass-inner-glow" aria-hidden="true"></div>
        
        <div className="glass-content">
          {/* Enhanced Header */}
          <div className="faq-hero-section">
            <div className="faq-hero-icon">❓</div>
            <h1 className="faq-hero-title">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="faq-hero-subtitle">
              Everything you need to know about Kalesh - India's first anonymous social platform.
              <br />Can't find your answer? <a href="/ContactUs" className="faq-contact-link">Contact our support team →</a>
            </p>
            <div className="faq-stats">
              <div className="faq-stat-item">
                <div className="faq-stat-number">{faqData.length}</div>
                <div className="faq-stat-label">Questions Answered</div>
              </div>
              <div className="faq-stat-divider"></div>
              <div className="faq-stat-item">
                <div className="faq-stat-number">{categories.length - 1}</div>
                <div className="faq-stat-label">Categories</div>
              </div>
              <div className="faq-stat-divider"></div>
              <div className="faq-stat-item">
                <div className="faq-stat-number">24/7</div>
                <div className="faq-stat-label">Support</div>
              </div>
            </div>
          </div>

          {/* Enhanced Search Bar - NO ICON */}
          <div className="faq-search-section">
            <div className="search-box-wrapper">
              <input
                type="text"
                placeholder="Search for answers... (e.g., 'privacy', 'features', 'anonymous chat')"
                className="faq-search-input"
                aria-label="Search FAQ questions and answers"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  className="search-clear-btn"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            {query && (
              <div className="search-hint">
                <span className="search-hint-icon">💡</span>
                Try searching for: "download", "safety", "anonymous", "brands"
              </div>
            )}
          </div>

          {/* Enhanced Category Filters */}
          <div className="faq-categories-section">
            <h3 className="category-section-title">Browse by Category</h3>
            <div className="category-filters-grid">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn-enhanced ${selected === category.id ? 'category-btn-active' : ''}`}
                  onClick={() => setSelected(category.id)}
                  aria-pressed={selected === category.id}
                  style={{
                    '--category-color': category.color,
                  }}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-btn-text">{category.name}</span>
                  {selected === category.id && <span className="category-active-indicator"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Results */}
          <div className="faq-results-wrapper">
            {filteredFaq.length > 0 ? (
              <>
                <div className="faq-results-header">
                  <div className="faq-count-badge">
                    <span className="faq-count-number">{filteredFaq.length}</span>
                    <span className="faq-count-text">Result{filteredFaq.length !== 1 ? 's' : ''} Found</span>
                  </div>
                  {query && (
                    <div className="faq-search-summary">
                      Showing results for: <strong>"{query}"</strong>
                    </div>
                  )}
                </div>

                <div className="faq-accordion">
                  {filteredFaq.map((faq, index) => (
                    <div
                      key={index}
                      id={`faq-${index}`}
                      className={`faq-accordion-item ${expandedFaq === index ? 'faq-accordion-item-expanded' : ''}`}
                    >
                      <button
                        className="faq-accordion-header"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={expandedFaq === index}
                      >
                        <div className="faq-accordion-header-content">
                          <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                          <h2 className="faq-accordion-question">{faq.question}</h2>
                        </div>
                        <div className="faq-accordion-icon" aria-hidden="true">
                          <i className="fa-solid fa-chevron-circle-down"></i>
                        </div>
                      </button>
                      
                      <div className={`faq-accordion-content ${expandedFaq === index ? 'faq-accordion-content-expanded' : ''}`}>
                        <div className="faq-accordion-answer">
                          {faq.answer.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                        
                        <div className="faq-accordion-footer">
                          <div className="faq-tags">
                            {faq.tags.map((tag, i) => (
                              <span key={i} className="faq-tag">{tag}</span>
                            ))}
                          </div>
                          <div className="faq-actions">
                            <button 
                              className="faq-action-btn"
                              onClick={() => copyLinkToFaq(index)}
                              title="Copy link to this question"
                            >
                              {copiedIndex === index ? '✓ Copied!' : '🔗 Share'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="faq-empty-state">
                <div className="empty-icon">🔍</div>
                <h3 className="empty-title">No Questions Found</h3>
                <p className="empty-text">
                  We couldn't find any questions matching "{query}".
                  <br />Try adjusting your search or browse by category.
                </p>
                <button 
                  className="empty-reset-btn" 
                  onClick={() => { setQuery(''); setSelected('all'); }}
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>

          {/* Quick Links Section */}
          <div className="faq-quick-links">
            <h3 className="quick-links-title">Popular Questions</h3>
            <div className="quick-links-grid">
              <button className="quick-link-btn" onClick={() => setQuery('anonymous')}>
                🔒 How is my anonymity protected?
              </button>
              <button className="quick-link-btn" onClick={() => setQuery('download')}>
                📱 How do I download Kalesh?
              </button>
              <button className="quick-link-btn" onClick={() => setQuery('safety')}>
                🛡️ Is Kalesh safe to use?
              </button>
              <button className="quick-link-btn" onClick={() => setQuery('free')}>
                💰 Is Kalesh free?
              </button>
            </div>
          </div>

          {/* Still Have Questions */}
          <div className="glass-final-note">
            <h3 className="text-center mb-4" style={{ color: '#ff6a00', fontSize: '2rem' }}>
              Still have questions?
            </h3>
            <div className="final-note-icon">💬</div>
            <p className="text-center mb-6 final-note-text">
              Can't find the answer you're looking for? Our friendly support team is here to help you 24/7.
              <br />We typically respond within 2-4 hours.
            </p>
            <div className="final-note-actions">
              <a href="/ContactUs" className="glass-primary-btn">
                Contact Support
              </a>
              <a href="/helpcenter" className="glass-secondary-btn">
                Visit Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;