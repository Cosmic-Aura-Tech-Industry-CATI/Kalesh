import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { teamMembers, companyInfo } from "./teamData";
import SEOHead from "./SEOHead";
import "../../styles/pages/team/team-member.css";

// PROFILE VECTOR ICONS
const Icons = {
  // Scalloped Verified Check Badge
  VerifiedBadge: () => (
    <svg className="verified-badge-icon" viewBox="0 0 24 24" fill="#ff5500">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.8 4.2l-4.2-4.2 1.4-1.4 2.8 2.8 7.4-7.4 1.4 1.4-8.8 8.8z" />
    </svg>
  ),
  // Person User Icon for At Kalesh
  Person: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  // Organization / Building Icon for At DIMISI
  Building: () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  // External Link Icon
  ExternalLink: () => (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  // Social Icons
  XTwitter: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.37a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
    </svg>
  ),
  Instagram: () => (
    <svg
      className="w-4 h-4 fill-none stroke-current stroke-2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  DimisipediaLogo: () => (
    <svg
      className="w-4 h-4 fill-none stroke-current stroke-2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  // Experience, Education, Passion SVGs (Matching Image)
  ExperienceIcon: () => (
    <svg
      className="w-5 h-5 text-[#ff5500]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  EducationIcon: () => (
    <svg
      className="w-5 h-5 text-[#ff5500]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  PassionIcon: () => (
    <svg
      className="w-5 h-5 text-[#ff5500]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
};

const TeamMemberProfile = ({ forcedSlug }) => {
  const { memberSlug } = useParams();
  const currentSlug = forcedSlug || memberSlug;
  const [openFaq, setOpenFaq] = useState(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentSlug]);

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const member = teamMembers.find((m) => m.slug === currentSlug);

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const firstName = member.name.split(" ")[0];
  const pronounThought =
    member.id === "sheelu-singh"
      ? "Her Thought on Kalesh"
      : "His Thought on Kalesh";
  const relatedMembers = teamMembers.filter((m) => m.id !== member.id);
  const pageTitle =
    member.metaTitle ||
    `${member.name} — ${member.kaleshRole} of Kalesh | TheKalesh`;
  const pageDescription =
    member.metaDescription ||
    `Learn about ${member.name}, ${member.kaleshRole} at Kalesh and ${member.dimisiRole} at ${companyInfo.legalName}.`;
  const canonicalUrl = `${companyInfo.url}/${member.slug}/`;

  const verifiedSameAs = Object.values(member.socialLinks).filter(
    (url) => url && url.startsWith("http"),
  );

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${canonicalUrl}#person`,
        name: member.name,
        jobTitle: member.kaleshRole,
        description: member.metaDescription || member.bio,
        image: `${companyInfo.url}${member.avatar}`,
        url: canonicalUrl,
        sameAs: verifiedSameAs,
        ...(member.knowsAbout ? { knowsAbout: member.knowsAbout } : {}),
        worksFor: [
          {
            "@type": "Organization",
            name: companyInfo.name,
            url: companyInfo.url,
            description: companyInfo.description,
          },
          {
            "@type": "Organization",
            name: "DIMISI Technologies Pvt Ltd",
            url: member.socialLinks.dimisipedia || "https://dimisipedia.me",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kanpur",
              addressRegion: "Uttar Pradesh",
              addressCountry: "India",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: companyInfo.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Team",
            item: companyInfo.teamUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: member.name,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="profile-root">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        ogImage={`${companyInfo.url}${member.avatar}`}
        ogType="profile"
        schemaJson={schemaJson}
      />

      <div className="profile-page-container">
        {/* ========================================================================= */}
        {/* 1. TOP BREADCRUMB NAVIGATION                                              */}
        {/* ========================================================================= */}
        <div className="profile-breadcrumb-nav">
          <nav aria-label="Breadcrumb">
            <ol className="profile-breadcrumb-list">
              <li>
                <Link to="/" onClick={handleScrollTop} className="breadcrumb-link">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-separator">&gt;</li>
              <li>
                <Link to="/team" onClick={handleScrollTop} className="breadcrumb-link">
                  Team
                </Link>
              </li>
              <li className="breadcrumb-separator">&gt;</li>
              <li className="breadcrumb-active" aria-current="page">
                {member.name}
              </li>
            </ol>
          </nav>
        </div>

        {/* ========================================================================= */}
        {/* 2. TOP HERO SECTION                                                       */}
        {/* ========================================================================= */}
        <section className="profile-top-hero">
          <div className="profile-ambient-glow" />

          <div className="profile-hero-grid">
            {/* Left Avatar */}
            <div className="profile-avatar-container">
              <div className="profile-avatar-glowing-ring">
                <div className="profile-avatar-inner">
                  <img
                    src={member.avatar}
                    alt={`${member.name}, ${member.kaleshRole} of Kalesh`}
                    className="profile-avatar-img"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* Right Info */}
            <div className="profile-info-col">
              <div className="profile-name-row">
                <h1 className="profile-main-name">{member.name}</h1>
                <Icons.VerifiedBadge />
              </div>

              <p className="profile-role-title">{member.kaleshRole} – Kalesh</p>

              <div className="profile-quote-wrapper">
                <span className="quote-symbol">“</span>
                <p className="profile-quote-text">{member.heroQuote}</p>
                <span className="quote-symbol">”</span>
              </div>

              {/* Dual Role Badges */}
              <div className="role-cards-grid">
                <div className="role-box-card">
                  <div className="role-box-icon-circle">
                    <Icons.Person />
                  </div>
                  <div className="role-box-content">
                    <p className="role-box-label">At Kalesh</p>
                    <p className="role-box-value">{member.kaleshRole}</p>
                  </div>
                </div>

                <div className="role-box-card">
                  <div className="role-box-icon-circle">
                    <Icons.Building />
                  </div>
                  <div className="role-box-content">
                    <p className="role-box-label">
                      At DIMISI TECHNOLOGIES PVT LTD
                    </p>
                    <p className="role-box-value">{member.dimisiRole}</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="profile-cta-buttons">
                <Link
                  to="/"
                  onClick={handleScrollTop}
                  className="btn-primary-explore"
                >
                  <span>Explore Kalesh</span>
                  <span>→</span>
                </Link>

                {member.socialLinks.dimisipedia && (
                  <a
                    href={member.socialLinks.dimisipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dimisipedia-outline"
                  >
                    <span>View on DIMISIpedia</span>
                    <Icons.ExternalLink />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CONNECT WITH MEMBER SECTION                                            */}
        {/* ========================================================================= */}
        <section className="connect-member-card">
          <div className="connect-member-grid">
            <div>
              <h2 className="connect-heading">Connect with {firstName}</h2>
              <p className="connect-subheading">
                Follow their journey and connect on social platforms.
              </p>
            </div>

            <div className="connect-cards-row">
              {member.socialLinks.x && (
                <a
                  href={member.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect-platform-card"
                  aria-label={`Visit ${member.name}'s X profile`}
                >
                  <div className="connect-icon-box icon-box-x">
                    <Icons.XTwitter />
                  </div>
                  <div className="connect-text-col">
                    <p className="connect-platform-name">X (Twitter)</p>
                    <p className="connect-platform-handle">
                      {member.socialLinks.xHandle || "@" + member.slug}
                    </p>
                  </div>
                </a>
              )}

              {member.socialLinks.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect-platform-card"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                >
                  <div className="connect-icon-box icon-box-linkedin">
                    <Icons.LinkedIn />
                  </div>
                  <div className="connect-text-col">
                    <p className="connect-platform-name">LinkedIn</p>
                    <p className="connect-platform-handle">
                      {member.socialLinks.linkedinHandle ||
                        "/in/" + member.slug}
                    </p>
                  </div>
                </a>
              )}

              {member.socialLinks.instagram && (
                <a
                  href={member.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect-platform-card"
                  aria-label={`Visit ${member.name}'s Instagram profile`}
                >
                  <div className="connect-icon-box icon-box-instagram">
                    <Icons.Instagram />
                  </div>
                  <div className="connect-text-col">
                    <p className="connect-platform-name">Instagram</p>
                    <p className="connect-platform-handle">
                      {member.socialLinks.instagramHandle || "@" + member.slug}
                    </p>
                  </div>
                </a>
              )}

              {member.socialLinks.dimisipedia && (
                <a
                  href={member.socialLinks.dimisipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect-platform-card"
                  aria-label={`View ${member.name}'s DIMISIpedia profile`}
                >
                  <div className="connect-icon-box icon-box-dimisipedia">
                    <Icons.DimisipediaLogo />
                  </div>
                  <div className="connect-text-col">
                    <p className="connect-platform-name text-[#ff5500]">
                      <span>DIMISIpedia</span>
                      <Icons.ExternalLink />
                    </p>
                    <p className="connect-platform-handle">View Profile</p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ABOUT SECTION (EXACT AS TARGET REFERENCE IMAGE)                        */}
        {/* ========================================================================= */}
        <section className="about-section-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Bio */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <h2 className="about-title">About {member.name}</h2>
              {typeof member.bio === "string" ? (
                member.bio
                  .split("\n\n")
                  .map((para, idx) => (
                    <p key={idx} className="about-body-text">
                      {para}
                    </p>
                  ))
              ) : (
                <p className="about-body-text">{member.bio}</p>
              )}
            </div>

            {/* Right Column: Experience, Education, Passion Inner Box */}
            <div className="lg:col-span-5 about-info-box text-left">
              {/* Experience */}
              <div className="about-info-item">
                <div className="about-info-icon-wrapper">
                  <Icons.ExperienceIcon />
                </div>
                <div className="about-info-content">
                  <p className="about-info-label">Experience</p>
                  <p className="about-info-value">{member.experience}</p>
                </div>
              </div>

              {/* Education */}
              <div className="about-info-item">
                <div className="about-info-icon-wrapper">
                  <Icons.EducationIcon />
                </div>
                <div className="about-info-content">
                  <p className="about-info-label">Education</p>
                  <p className="about-info-value">{member.education}</p>
                </div>
              </div>

              {/* Passion */}
              <div className="about-info-item">
                <div className="about-info-icon-wrapper">
                  <Icons.PassionIcon />
                </div>
                <div className="about-info-content">
                  <p className="about-info-label">Passion</p>
                  <p className="about-info-value">{member.passion}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. THOUGHT ON KALESH SECTION (EXACT AS TARGET REFERENCE IMAGE)            */}
        {/* ========================================================================= */}
        <section className="thought-section-card text-left">
          <h2 className="thought-title">{pronounThought}</h2>
          <div className="thought-quote-container">
            <span className="quote-symbol">“</span>
            <p className="thought-quote-text">{member.thoughtOnKalesh}</p>
            <span className="quote-symbol">”</span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. ROLES, BUILDING, FAQS, RELATED TEAM MEMBERS                            */}
        {/* ========================================================================= */}
        <div className="space-y-10 pb-16">
          {/* Roles & What They Are Building */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="profile-section-card flex flex-col justify-between text-left">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  Role &amp; Responsibilities at Kalesh
                </h2>
                <ul className="space-y-2.5">
                  {member.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-2 text-xs sm:text-sm text-neutral-300"
                    >
                      <span className="text-[#ff5500] font-bold">✓</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1a1a1a] text-xs text-neutral-400">
                <span className="font-semibold text-neutral-300">
                  Parent Entity:{" "}
                </span>
                {member.dimisiRole} at {companyInfo.legalName}
              </div>
            </section>

            <section className="profile-section-card text-left">
              <h2 className="text-xl font-bold text-white mb-4">
                What They Are Building at Kalesh
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {member.whatTheyAreBuilding.map((item, idx) => (
                  <div key={idx} className="building-card-box">
                    <h3 className="text-xs sm:text-sm font-bold text-[#ff5500]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Quick Answers Accordion (AEO) */}
          <section className="profile-section-card text-left">
            <h2 className="text-xl font-bold text-white mb-6">
              Quick Answers About {firstName}
            </h2>
            <div className="space-y-3">
              {member.faqs.map((faq, idx) => (
                <div key={idx} className="faq-accordion-item">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    className="faq-accordion-btn"
                  >
                    <span>{faq.question}</span>
                    <span className="text-[#ff5500]">
                      {openFaq === idx ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-neutral-400 border-t border-[#1a1a1a] pt-3 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Meet the Rest of the Team */}
          <section className="profile-section-card text-left">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Meet the Rest of the Kalesh Team
              </h2>
              <Link
                to="/team"
                onClick={handleScrollTop}
                className="text-xs text-[#ff5500] hover:underline font-semibold"
              >
                View All 5 →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedMembers.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/${rel.slug}`}
                  onClick={handleScrollTop}
                  className="bg-black border border-[#1f1f1f] hover:border-[#ff5500] p-4 rounded-xl flex items-center space-x-3 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-800 overflow-hidden shrink-0 border border-[#ff5500]/40">
                    <img
                      src={rel.avatar}
                      alt={rel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">
                      {rel.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {rel.kaleshRole}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberProfile;
