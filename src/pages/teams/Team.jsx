import React from "react";
import { Link } from "react-router-dom";
import { companyInfo, teamMembers } from "./teamData";
import SEOHead from "./SEOHead";
import "../../styles/pages/team/team.css";

// Image Paths
const HERO_SILHOUETTE_IMG = "/images/team/team-silhouettes-hero.webp";
const KALESH_3D_BOX_IMG = "/images/team/kalesh-3d-box.webp";
const PHONE_MOCKUP_IMG = "/images/team/kalesh-phone-mockup.webp";

// REAL VECTOR ICONS
const Icons = {
  Mask: () => (
    <svg
      className="w-6 h-6 text-[#ff5500]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 10s3-4 10-4 10 4 10 4-3 7-10 7-10-7-10-7z" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    </svg>
  ),
  Pulse: () => (
    <svg
      className="w-6 h-6 text-[#ff5500]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg
      className="w-6 h-6 text-[#ff5500]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Users: () => (
    <svg
      className="w-6 h-6 text-[#ff5500]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  XTwitter: () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg className="w-3.5 h-3.5 fill-current text-blue-400" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.37a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
    </svg>
  ),
  Instagram: () => (
    <svg
      className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8] text-pink-400"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Dimisipedia: () => (
    <svg
      className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8] text-[#ff5500]"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10" />
      <path d="M6 10h10" />
    </svg>
  ),
  StatsUsers: () => (
    <svg
      className="w-6 h-6 text-[#ff5500]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  StatsPolls: () => (
    <svg
      className="w-6 h-6 text-amber-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" x2="18" y1="20" y2="10" />
      <line x1="12" x2="12" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  ),
  StatsShield: () => (
    <svg
      className="w-6 h-6 text-[#ff5500]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
    </svg>
  ),
  StatsHeart: () => (
    <svg
      className="w-6 h-6 text-amber-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Android: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1558-.27.0638-.6146-.2062-.7704-.2699-.1559-.6146-.0643-.7704.2057l-2.0224 3.503c-1.3934-.6366-2.946-.9904-4.5785-.9904s-3.1851.3538-4.5785.9904l-2.0224-3.503c-.1559-.27-.5006-.3616-.7704-.2057-.27.1558-.362.5004-.2062.7704l1.996 3.4572C2.7424 10.6386.99 13.7548.99 17.3333h22.02c0-3.5785-1.7524-6.6947-5.1295-8.0119" />
    </svg>
  ),
  Apple: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-1 .04-2.19.67-2.9 1.5-.63.73-1.18 1.88-1.03 2.99 1.12.09 2.28-.65 2.94-1.45z" />
    </svg>
  ),
};

const Team = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const pageTitle = "Meet the Team Behind Kalesh | Leadership & Core Engineers";
  const pageDescription =
    "Meet the 5 builders behind Kalesh — India's first real-time anonymous opinion and live polling platform for Gen-Z. Zero judgment, 100% authentic expression.";
  const canonicalUrl = companyInfo.teamUrl;

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${companyInfo.url}/#organization`,
        name: companyInfo.name,
        legalName: companyInfo.legalName,
        url: companyInfo.url,
        logo: companyInfo.logo,
        description: companyInfo.description,
        email: companyInfo.email,
        founders: teamMembers.slice(0, 3).map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.kaleshRole,
          url: `${companyInfo.url}/${member.slug}/`,
        })),
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: 5,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${companyInfo.url}/#website`,
          name: "Kalesh",
          url: companyInfo.url,
        },
        breadcrumb: {
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
              item: canonicalUrl,
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        itemListElement: teamMembers.map((member, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Person",
            name: member.name,
            jobTitle: member.kaleshRole,
            url: `${companyInfo.url}/${member.slug}/`,
            worksFor: {
              "@type": "Organization",
              name: companyInfo.legalName,
            },
          },
        })),
      },
    ],
  };

  return (
    <div className="kalesh-team-root">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        ogImage={`${companyInfo.url}${HERO_SILHOUETTE_IMG}`}
        ogType="website"
        schemaJson={schemaJson}
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="team-hero-section">
        <div className="team-hero-glow" />

        <div className="team-hero-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <h1 className="team-hero-title">
                Meet the Team <br />
                <span className="text-accent-orange">Behind Kalesh</span>
              </h1>

              <p className="team-hero-description">
                We are builders, thinkers, and doers on a mission to create
                India’s first real-time anonymous opinion &amp; polling platform
                for Gen-Z. Honest opinions. Real conversations. Zero judgment.
              </p>

              {/* 4 Feature Badges */}
              <div className="hero-badges-grid">
                <div className="hero-badge-item">
                  <div className="hero-badge-circle">
                    <Icons.Mask />
                  </div>
                  <span className="hero-badge-label">
                    Anonymous <br /> by Design
                  </span>
                </div>

                <div className="hero-badge-item">
                  <div className="hero-badge-circle">
                    <Icons.Pulse />
                  </div>
                  <span className="hero-badge-label">
                    Real-time <br /> Polls
                  </span>
                </div>

                <div className="hero-badge-item">
                  <div className="hero-badge-circle">
                    <Icons.ShieldCheck />
                  </div>
                  <span className="hero-badge-label">
                    Safe &amp; Secure <br /> Platform
                  </span>
                </div>

                <div className="hero-badge-item">
                  <div className="hero-badge-circle">
                    <Icons.Users />
                  </div>
                  <span className="hero-badge-label">
                    Built for <br /> Gen-Z
                  </span>
                </div>
              </div>
            </div>

            {/* Right Silhouette Image */}
            <div className="lg:col-span-7 team-hero-image-wrapper">
              <img
                src={HERO_SILHOUETTE_IMG}
                alt="Meet the Team Behind Kalesh - Core Leadership"
                className="team-hero-image"
                loading="eager"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OUR CORE TEAM SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="core-team-section">
        <div className="section-header">
          <h2 className="section-heading">
            Our <span className="core-underline">Core</span> Team
          </h2>
          <p className="section-subheading">
            A passionate group of individuals working together to build a
            movement where every opinion matters and nobody is judged.
          </p>
        </div>

        {/* 5 Fixed Member Cards */}
        <div className="core-team-grid">
          {teamMembers.map((member) => (
            <article key={member.id} className="team-card">
              <div>
                <div className="avatar-ring">
                  <div className="avatar-inner">
                    <img
                      src={member.avatar}
                      alt={`${member.name}, ${member.kaleshRole} of Kalesh`}
                      className="avatar-img"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.kaleshRole}</p>
                  <p className="member-tagline">{member.shortTagline}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#1f1f1f]">
                <div className="social-links-bar">
                  {member.socialLinks.x && (
                    <a
                      href={member.socialLinks.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-btn"
                      aria-label={`Visit ${member.name}'s X profile`}
                    >
                      <Icons.XTwitter />
                    </a>
                  )}
                  {member.socialLinks.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-btn"
                      aria-label={`Visit ${member.name}'s LinkedIn profile`}
                    >
                      <Icons.LinkedIn />
                    </a>
                  )}
                  {member.socialLinks.instagram && (
                    <a
                      href={member.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-btn"
                      aria-label={`Visit ${member.name}'s Instagram profile`}
                    >
                      <Icons.Instagram />
                    </a>
                  )}
                  {member.socialLinks.dimisipedia && (
                    <a
                      href={member.socialLinks.dimisipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-btn"
                      aria-label={`View ${member.name}'s profile on DIMISIpedia`}
                    >
                      <Icons.Dimisipedia />
                    </a>
                  )}
                </div>

                <Link
                  to={`/${member.slug}`}
                  onClick={handleScrollTop}
                  className="read-more-btn"
                >
                  <span>Read More</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY KALESH EXISTS                                                      */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="blended-card-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h2 className="blended-card-title">Why Kalesh Exists</h2>
              <p className="blended-card-desc">
                In a world full of filters, followers, and fake validation,
                Kalesh is a safe space where real opinions are shared freely.
                We're building a platform that puts honesty above identity and
                conversations above judgments.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full flex items-center justify-center">
                <img
                  src={KALESH_3D_BOX_IMG}
                  alt="Why Kalesh Exists 3D Box"
                  className="seamless-screen-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. STATS COUNTER BAR                                                      */}
      {/* ========================================================================= */}
      <section className="py-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="stats-grid">
          <div className="stat-box">
            <Icons.StatsUsers />
            <p className="stat-number">{companyInfo.stats.activeUsers}</p>
            <p className="stat-label">{companyInfo.stats.activeUsersLabel}</p>
          </div>

          <div className="stat-box">
            <Icons.StatsPolls />
            <p className="stat-number">Real-time</p>
            <p className="stat-label">{companyInfo.stats.livePolls}</p>
          </div>

          <div className="stat-box">
            <Icons.StatsShield />
            <p className="stat-number">100%</p>
            <p className="stat-label">{companyInfo.stats.anonymous}</p>
          </div>

          <div className="stat-box">
            <Icons.StatsHeart />
            <p className="stat-number">Honest</p>
            <p className="stat-label">Conversations</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BE A PART OF THE MOVEMENT (EXACT TARGET REFERENCE DESIGN)              */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="movement-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 text-left">
              <h2 className="movement-title">Be a Part of the Movement</h2>
              <p className="movement-description">
                Download Kalesh and experience a whole new way{" "}
                <br className="hidden sm:inline" />
                of expressing your thoughts anonymously.
              </p>

              <div className="movement-buttons-row">
                <a href="#download-android" className="btn-android">
                  <Icons.Android />
                  <span>Download on Android</span>
                </a>

                <a href="#download-ios" className="btn-ios">
                  <Icons.Apple />
                  <span>Download on iOS</span>
                </a>
              </div>
            </div>

            {/* Right Large Phone Mockup Blended into Background */}
            <div className="lg:col-span-6 movement-image-container">
              <img
                src={PHONE_MOCKUP_IMG}
                alt="Kalesh App on Smartphone"
                className="movement-phone-img"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. QUOTE FOOTER (WITH OFFICIAL GLOWING KALESH LOGO)                       */}
      {/* ========================================================================= */}
      <section className="quote-footer-bar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-center md:text-left">
            {/* Left Quote */}
            <div className="md:col-span-5 flex items-start space-x-3 justify-center md:justify-start">
              <span className="text-3xl text-accent-orange font-serif leading-none">
                “
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 italic font-medium leading-relaxed">
                Kalesh is not just an app, it's a movement to bring back real
                conversations.
              </p>
            </div>

            {/* Center Official 3D Logo */}
            <div className="md:col-span-2 quote-logo-wrapper py-2">
              <img
                src="/images/team/kalesh-logo.png"
                alt="Kalesh Official Logo"
                className="quote-center-logo"
                loading="lazy"
              />
            </div>

            {/* Right Quote */}
            <div className="md:col-span-5 flex items-start space-x-3 justify-center md:justify-end">
              <p className="text-xs sm:text-sm text-neutral-300 italic font-medium leading-relaxed text-center md:text-right">
                Every opinion matters. Every voice deserves to be heard
                anonymously.
              </p>
              <span className="text-3xl text-accent-orange font-serif leading-none">
                ”
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
