import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import shikhar from "../assets/Shikhar_Dixit.png";
import swat from "../assets/Swatantra_Singh.png";
import nish from "../assets/Nishkarsh_Mishra.png";
import sheelu from "../assets/Sheelu_Singh.png";
import mridul from "../assets/Mridul_Mishra.png";
import sid from "../assets/Siddhant_Shekhar.png";
import "../styles/pages/about.css";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeSection, setActiveSection] = useState("hero");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Target date: March 16, 2026
  const targetDate = new Date("March 16, 2026 00:00:00").getTime();

  useEffect(() => {
    // Countdown timer logic
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Initialize timer
    setTimeLeft(calculateTimeLeft());

    // Update timer every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Format numbers to always show 2 digits
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const teamMembers = [
    {
      id: 1,
      name: "Shikhar Dixit",
      role: "CEO",
      description:
        "Shikhar Dixit is the CEO of Kalesh, responsible for setting the company's vision and strategy. He leads product direction, business growth, and investor relations, ensuring Kalesh remains a safe, anonymous platform for real-time and honest Gen-Z expression.",
      linkedin: "https://www.linkedin.com/in/shikhar040/",
      image: shikhar,
    },
    {
      id: 2,
      name: "Swatantra Singh",
      role: "CTO",
      description:
        "Swatantra Singh serves as the CTO of Kalesh, leading the company’s technology vision and infrastructure. He oversees platform architecture, product development, scalability, and system performance, ensuring robust technology and seamless user experience as Kalesh grows.",
      linkedin: "https://www.linkedin.com/in/swatantra-singh308/",
      image: swat,
    },
    {
      id: 3,
      name: "Nishkarsh Mishra",
      role: "CFO",
      description:
        "Nishkarsh Mishra serves as the CFO of Kalesh, overseeing financial strategy, budgeting, and resource allocation. He ensures efficient capital management, supports data-driven decision-making, and drives sustainable growth while aligning financial planning with the company’s expansion goals.",
      linkedin: "https://www.linkedin.com/in/0nishkarshm/",
      image: nish,
    },
    {
      id: 4,
      name: "Sheelu Singh",
      role: "Android Developer",
      description:
        "Sheelu Singh is the Android Developer of the Kalesh app, responsible for building, optimizing, and maintaining the Android application to ensure a smooth, secure, and high-performance user experience.",
      linkedin: "https://www.linkedin.com/in/sheelu-singh-bbb788307/",
      image: sheelu,
    },
    {
      id: 5,
      name: "Mridul Mishra",
      role: "Backend Developer",
      description:
        "Mridul Mishra is the Backend Developer at Kalesh, responsible for designing and maintaining server-side systems, databases, and APIs to ensure secure, scalable, and reliable app performance.",
      linkedin: "https://www.linkedin.com/in/mridul-mishra-4717b828b/",
      image: mridul,
    },
    {
      id: 6,
      name: "Siddhant Shekhar",
      role: "Web Developer",
      description:
        "Siddhant Shekhar is the Web Developer at Kalesh, responsible for developing and maintaining the web platforms, including the admin panel and support interfaces, ensuring smooth functionality and seamless user experience.",
      linkedin: "https://www.linkedin.com/in/shekhar18/",
      image: sid,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "team"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNotifyClick = () => {
    alert(
      "Thank you! We will notify you when Kalesh launches on March 16, 2026!",
    );
  };

  const handleCTAClick = () => {
    window.location.href = "/careers";
  };

  return (
    <>
      <Helmet>
        <title>About Kalesh – India's First Anonymous Opinion Platform</title>
        <meta name="description" content="Learn about Kalesh, India's first real-time anonymous opinion and polling platform built for Gen Z and judgment-free expression." />
        <link rel="canonical" href="https://thekalesh.com/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Kalesh",
            "description": "Learn about Kalesh - India's first anonymous social media platform",
            "url": "https://thekalesh.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "Kalesh",
              "description": "India's first anonymous opinion and real-time polling social platform for Gen Z",
              "url": "https://thekalesh.com",
              "logo": "https://thekalesh.com/logo.png",
              "foundingDate": "2025",
              "sameAs": [
                "https://x.com/KaleshThe76740",
                "https://www.facebook.com/profile.php?id=61587629125145",
                "https://www.instagram.com/thekalesh47",
                "https://www.linkedin.com/company/kalesh47/"
              ]
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://thekalesh.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://thekalesh.com/about"
              }
            ]
          })}
        </script>
      </Helmet>
      <SEO
        title="About Kalesh – India’s First Anonymous Opinion Platform"
        description="Learn about Kalesh, India's first real-time anonymous opinion and polling platform built for Gen Z and judgment-free expression."
      />

      <div className="about-page-wrapper">
        {/* Animated Background Particles */}
        <div className="animated-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 30 + 20}s`,
                background:
                  i % 3 === 0 ? "#ff6a00" : i % 3 === 1 ? "#ffd700" : "#00ffcc",
              }}
            />
          ))}
        </div>

        {/* Floating Orbs */}
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>

        {/* Animated Grid Background */}
        <div className="hero-bg-grid"></div>

        {/* Navigation Dots */}
        <div className="nav-dots">
          {["hero", "about", "team"].map((section) => (
            <button
              key={section}
              className={`nav-dot ${activeSection === section ? "active" : ""}`}
              onClick={() => scrollToSection(section)}
              aria-label={`Go to ${section} section`}
            >
              <div className="dot-inner"></div>
            </button>
          ))}
        </div>

        {/* ================= HERO SECTION ================= */}
        <section id="hero" className="hero-section">
          <div className="container">
            <div className="hero-content-wrapper">
              <div className="hero-grid">
                {/* Left - Logo and Slogan */}
                <div className="hero-left">
                  <div className="logo-container">
                    <div className="logo-3d-wrapper">
                      <img
                        src="/images/logo-600.webp"
                        alt="Kalesh Logo"
                        className="hero-logo"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="logo-hologram"></div>
                    </div>
                  </div>

                  <div className="hero-slogan">
                    <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
                      About 
                    </h1>
                    <div className="kalesh-text" aria-hidden="true">
                      <span className="k-letter">K</span>
                      <span className="alesh-text">ALESH</span>
                    </div>
                    <p className="tagline">
                      A Platform Where Your Opinion Matters
                      <br />
                      <span className="highlight">Not Your Identity</span>
                    </p>
                  </div>
                </div>

                {/* Right - Coming Soon Button */}
                <div className="hero-right">
                  <div className="coming-soon-card">
                    <div
                      className="coming-soon-badge"
                      style={{ marginBottom: "60px" }}
                    >
                      <span className="badge-text">COMING SOON</span>
                      <div className="badge-glow"></div>
                    </div>
                    <div className="coming-soon-content">
                      <p>
                        <span className="highlight" style={{fontSize:"2.1rem"}}>Something Big is Coming</span> <br />
                        <p style={{textAlign:"justify", marginTop:"20px"}}>
                          Kalesh is redefining how people express, interact, and connect online.
Anonymous. Instant. Unfiltered.
Launching soon.
                        </p>
                      </p>
                      <button
                        className="notify-btn"
                        onClick={handleNotifyClick}
                      >
                        <span className="btn-text">Notify Me</span>
                        <span className="btn-icon">→</span>
                      </button>
                    </div>

                    {/*  
                    <div className="countdown-timer">
                      <div className="timer-glow"></div>
                      <div className="timer-grid">
                      
                        <div className="timer-item">
                          <span className="timer-value">
                            {formatNumber(timeLeft.days)}
                          </span>
                          <span className="timer-label">Days</span>
                        </div>

                       
                        <div className="timer-separator">:</div>

                        
                        <div className="timer-item">
                          <span className="timer-value">
                            {formatNumber(timeLeft.hours)}
                          </span>
                          <span className="timer-label">Hours</span>
                        </div>

                       
                        <div className="timer-separator">:</div>

                        
                        <div className="timer-item">
                          <span className="timer-value">
                            {formatNumber(timeLeft.minutes)}
                          </span>
                          <span className="timer-label">Minutes</span>
                        </div>
                      </div>

                      
                      <div className="launch-date-info">
                        <p className="launch-date">
                          Launch Date:{" "}
                          <span className="date-highlight">March 16, 2026</span>
                        </p>
                      </div>
                    </div>
                    */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section id="about" className="about-section">
          <div className="container">
            {/* Section Header */}
            <div className="section-header">
              <div className="section-title-wrapper">
                <h1 className="section-title">About Us</h1>
                <div className="title-underline">
                  <div className="underline-line"></div>
                  <div className="underline-dot"></div>
                </div>
              </div>
            </div>

            <div className="about-column mb-5">
              <div className="about-card futuristic-card">
                <div className="card-header"></div>
                <div className="card-content">
                  <p className="content-justify">
                    Kalesh was created to challenge the way opinions are shared
                    online. In a digital world dominated by profiles, likes,
                    followers, and social validation, many people hesitate to
                    express what they truly feel. Fear of judgment, screenshots,
                    online backlash, and long-term reputation often silence
                    honest voices. <br /> We believe opinions should be valued
                    for their content, not the identity behind them. That’s why
                    Kalesh is built as a fully anonymous, real-time opinion and
                    polling platform where users can speak freely without
                    pressure. <br /> Our platform empowers Gen-Z users,
                    students, introverts, and creators to share thoughts, create
                    live polls, and participate in discussions without revealing
                    who they are. With instant engagement and no popularity
                    bias, every opinion gets a fair chance to be heard. <br />{" "}
                    At the same time, brands, colleges, and institutions gain
                    access to honest, unbiased audience feedback in real time.
                    Backed by strong moderation and safety controls, Kalesh
                    offers a secure, judgment-free space designed for authentic
                    expression. <br /> Kalesh isn’t just another social platform
                    — it’s a shift toward real conversations, real opinions, and
                    real engagement
                  </p>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="about-content-grid">
              {/* Left Column */}
              <div className="about-column">
                <div className="about-card futuristic-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <h3>The Problem</h3>
                  </div>
                  <div className="card-content">
                    <p>
                      In today's digital ecosystem, most social media platforms
                      are identity-driven and centered around public profiles,
                      likes, and followers, which creates social pressure and
                      discourages honest expression. Users often hesitate to
                      share their real opinions due to fear of judgment, online
                      backlash, screenshots, and long-term reputational impact.
                    </p>
                    <p>
                      This environment particularly affects Gen-Z users,
                      students, and introverts, who lack a safe and comfortable
                      space to express themselves freely. Additionally, existing
                      platforms prioritize reach based on popularity rather than
                      content relevance, making it difficult for new users to be
                      heard and preventing brands and institutions from
                      receiving instant, unbiased audience feedback.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="about-column">
                <div className="about-card futuristic-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <i className="fas fa-bullseye"></i>
                    </div>
                    <h3>The Solution</h3>
                  </div>
                  <div className="card-content">
                    <p>
                      Kalesh solves this problem by offering a fully anonymous,
                      real-time opinion and polling platform that removes
                      identity pressure and promotes authentic participation.
                      Users can create live polls, vote instantly, and engage in
                      discussions without revealing their identity, ensuring
                      opinions are judged by content rather than personal
                      branding.
                    </p>
                    <p>
                      The real-time engagement model allows users to participate
                      immediately after joining, while colleges, brands, and
                      creators gain access to honest and unbiased feedback. With
                      strong moderation and safety controls, Kalesh provides a
                      secure, judgment-free environment that enables genuine
                      expression and meaningful engagement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Anonymous</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">Real-time</div>
                  <div className="stat-label">Polling</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">Zero</div>
                  <div className="stat-label">Judgment</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">Safe</div>
                  <div className="stat-label">Space</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TEAM SECTION ================= */}
        <section id="team" className="team-section">
          <div className="container">
            {/* Section Header */}
            <div className="section-header">
              <div className="section-title-wrapper">
                <h2 className="section-title">Our Super Team</h2>
                <div className="title-underline">
                  <div className="underline-line"></div>
                  <div className="underline-dot"></div>
                </div>
              </div>
              <p className="section-subtitle">
                The brilliant minds behind Kalesh's revolutionary platform
              </p>
            </div>

            {/* Team Grid */}
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member-card">
                  {/* Card Inner Glow */}
                  <div className="card-inner-glow"></div>

                  {/* Floating Elements */}
                  <div className="card-floating-element floating-1"></div>
                  <div className="card-floating-element floating-2"></div>
                  <div className="card-floating-element floating-3"></div>
                  <div className="card-floating-element floating-4"></div>

                  {/* Member Image */}
                  <div className="member-image-container">
                    <div className="image-hologram-frame">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="member-image"
                      />
                      <div className="image-hologram-overlay"></div>
                    </div>
                    <div className="image-particle-effect"></div>
                  </div>

                  {/* Member Info */}
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <div className="member-role">
                      <span className="role-neon-badge">{member.role}</span>
                    </div>
                    <p className="member-description" style={{textAlign:"justify"}}>{member.description}</p>
                  </div>

                  {/* LinkedIn Button */}
                  <div className="member-connect">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neon-linkedin-btn"
                    >
                      <div className="linkedin-icon">
                        <i className="fab fa-linkedin-in"></i>
                      </div>
                      <span className="connect-text">Connect on LinkedIn</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Call to Action */}
            <div className="team-cta">
              <div className="cta-hologram-card">
                <h3>Join Our Mission</h3>
                <p>Be part of the revolution in social media</p>
                <button className="hologram-cta-btn" onClick={handleCTAClick}>
                  <span>View Careers</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;