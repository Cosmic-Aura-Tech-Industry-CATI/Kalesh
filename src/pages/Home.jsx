import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import "../styles/pages/home.css";
import { FaUserSecret } from "react-icons/fa";
import { FaFire, FaThumbsUp } from "react-icons/fa";

import { HiTrendingUp } from "react-icons/hi";

import { BsBarChartFill } from "react-icons/bs";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {" "}
      <Helmet>
        <title>Kalesh — India's Anonymous Social Media Platform</title>
        <meta
          name="description"
          content="Kalesh is India's anonymous social media platform where you can speak freely without revealing your identity. Join real-time live polls and share opinions anonymously."
        />
        <link rel="canonical" href="https://thekalesh.com/" />
      </Helmet>{" "}
      {/* ================= SEO META ================= */}
      <SEO
        title="Kalesh — India’s Anonymous Social Media Platform"
        description="Kalesh is India’s anonymous social media platform where you can speak freely without revealing your identity."
        ogTitle="Kalesh – Anonymous Opinions & Live Polls"
        ogDescription="Vote, share opinions, and engage anonymously with real-time live polls on Kalesh."
        twitterTitle="Kalesh – Anonymous Opinion Platform"
        twitterDescription="India's first real-time anonymous opinion and polling social platform."
      />
      {/* ================= HERO SECTION ================= */}
      <div className="home-hero container-fluid g-0">
        <div className="hero-bg-glow"></div>

        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <span key={i}></span>
          ))}
        </div>
        <div className="row align-items-center g-0">
          {/* Hero TEXT */}

          <div className="col-12 col-lg-6 order-2 order-lg-1  d-flex justify-content-center justify-content-lg-start">
            <motion.div
              className="hero-content w-100 text-center text-lg-start"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-badge">
                <FaUserSecret className="hero-badge-icon" />
                India's First Anonymous Social Platform
              </div>

              <h1 className="hero-title">
                India&apos;s First Anonymous Social Media Platform
              </h1>

              <p className="hero-subtitle ">
                A platform where your opinion matters, not your identity.{" "}
              </p>

              <div
                className="hero-buttons d-flex flex-column flex-sm-row 
              justify-content-center justify-content-lg-start 
              align-items-center gap-4 mt-4 mt-md-5 w-100"
              >
                <button className="btn-kalesh">
                  Download App (Coming Soon)
                </button>

                <button className="btn-outline-kalesh">
                  Join the Kalesh Community
                </button>
              </div>
            </motion.div>
          </div>

          {/* 🔥 HERO IMAGE – LCP FIX */}
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <motion.div
              className="hero-image align-items-center d-flex justify-content-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                src="/images/logo-600.webp"
                srcSet="
                      /images/logo-400.webp 400w,
                      /images/logo-600.webp 600w,
                      /images/logo-1000.webp 1000w
                    "
                sizes="(max-width: 768px) 90vw, 600px"
                width="400"
                height="300"
                className="img-fluid"
                alt="Kalesh anonymous social media platform logo"
                fetchpriority="high"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </div>
      {/* floating cards */}
      <div className="hero-features container">
        <div className="feature-card">
          <i className="fa-solid fa-user-secret"></i>
          <h4>Anonymous Profiles</h4>
        </div>

        <div className="feature-card">
          <i className="fa-solid fa-square-poll-vertical"></i>
          <h4>Real-Time Polls</h4>
        </div>

        <div className="feature-card">
          <i className="fa-solid fa-comments"></i>
          <h4>Private Chats</h4>
        </div>
      </div>
      {/* ================= INFO SECTION ================= */}
      <motion.section
        className="kalesh-info-section"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="community-particles">
          <span className="orb orb-1"></span>
          <span className="orb orb-2"></span>
          <span className="orb orb-3"></span>
          <span className="orb orb-4"></span>
          <span className="orb orb-5"></span>
        </div>

        <div className="fireflies">
          {[...Array(12)].map((_, i) => (
            <span key={i}></span>
          ))}
        </div>

        <div className="orbit-container">
          {/* Pulse Rings */}
          <div className="pulse-ring ring-1"></div>
          <div className="pulse-ring ring-2"></div>
          <div className="pulse-ring ring-3"></div>

          {/* ADD HERE */}

          <div className="orbit-path path-1"></div>
          <div className="orbit-path path-2"></div>

          <div className="anonymous-message-glow"></div>

          {/* orbit */}

          <div className="orbit">
            <img
              src="/images/avatars/avatar1.webp"
              className="avatar-1"
              alt=""
            />

            <img
              src="/images/avatars/avatar2.webp"
              className="avatar-2"
              alt=""
            />

            <img
              src="/images/avatars/avatar3.webp"
              className="avatar-3"
              alt=""
            />

            <img
              src="/images/avatars/avatar4.webp"
              className="avatar-4"
              alt=""
            />

            <img
              src="/images/avatars/avatar5.webp"
              className="avatar-5"
              alt=""
            />

            <img
              src="/images/avatars/avatar6.webp"
              className="avatar-6"
              alt=""
            />

            <img
              src="/images/avatars/avatar7.webp"
              className="avatar-7"
              alt=""
            />

            <img
              src="/images/avatars/avatar8.webp"
              className="avatar-8"
              alt=""
            />
          </div>

          {/* Center Card */}
          <div className="anonymous-message">
            <span className="message-badge">Anonymous Community</span>

            <h2>No Profile Pressure</h2>
            <h2>No Judgment</h2>
            <h2>Just Honest Opinions</h2>

            <p>
              Share your real thoughts without revealing who you are. No
              followers, no popularity contest, just authentic opinions.
            </p>
          </div>
        </div>
      </motion.section>
      {/* ===== REAL-TIME POLL INFO DIV ===== */}
      <div className="container-fluid section-poll py-4 py-md-5">
        <div className="container">
          <div className="row align-items-center mt-5 mb-5">
            {/* LEFT IMAGE COLUMN */}
            <div className="col-12 col-lg-6">
              <div className="poll-image-container text-center">
                <div className="poll-image-wrapper">
                  <div className="poll-wave wave-1"></div>
                  <div className="poll-wave wave-2"></div>
                  <div className="poll-wave wave-3"></div>

                  <div className="vote-badge badge-1">
                    <HiTrendingUp />
                    <span>12K</span>
                  </div>

                  <div className="vote-badge badge-2">
                    <FaFire />
                    <span>HOT</span>
                  </div>

                  <div className="vote-badge badge-3">
                    <BsBarChartFill />
                    <span>89%</span>
                  </div>

                  <div className="vote-badge badge-4">
                    <FaThumbsUp />
                    <span>4.8K</span>
                  </div>

                  <img
                    src="/images/realtime_poll-800.webp"
                    width="400"
                    height="600"
                    alt="Real-time Poll on kalesh"
                    className="poll-image img-fluid"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT COLUMN */}

            <div className="col-12 col-lg-6">
              <div className="poll-content px-3 px-lg-5">
                <div className="poll-live-chip">LIVE POLL SYSTEM</div>
                <h2 className="section-title">
                  Live poll broadcasting with
                  <br />
                  <span className="highlight-word">
                    instant voting
                  </span> and{" "}
                  <span className="highlight-word">
                    maximum user engagement
                  </span>
                </h2>
                <div className="poll-desc-card">
                  <p className="section-description">
                    Whether you're a new user or a well-established influencer,
                    we deliver fair, equal, and real engagement for everyone on
                    the platform.
                  </p>
                </div>
                {/* <div className="poll-metrics"> 
                  <div>
                    <h3>12K+</h3>
                    <span>Votes</span>
                  </div>

                  <div>
                    <h3>89%</h3>
                    <span>Participation</span>
                  </div>

                  <div>
                    <h3>24/7</h3>
                    <span>Active</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== CREATE POLLS INFO DIV ===== */}
      <div className="container-fluid section-create-poll py-4 py-md-5">
        <div className="container">
          <div className="row align-items-center mt-5 mb-5">
            {/* LEFT CONTENT COLUMN */}
            <div className="col-12 col-lg-6 order-2 order-lg-1">
              <div className="profile-content px-3 px-lg-5">
                <h2 className="section-title">
                  An anonymous platform that provides complete profile
                  anonymity.
                </h2>
                <p className="section-description mt-3 mt-md-4">
                  India's first anonymous social media platform that allows
                  users to create a fully anonymous profile for safe, private,
                  and judgment-free online interaction.
                </p>
              </div>
            </div>

            {/* RIGHT IMAGE COLUMN */}
            <div className="col-12 col-lg-6 order-1 order-lg-2">
              <div className="profile-image-container text-center">
                <img
                  src="/images/anonymous_profile-800.webp"
                  width="400"
                  height="800"
                  alt="kalesh_anonymous_Social_Profile"
                  className="profile-image img-fluid"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== ANONYMOUS CHAT INFO DIV ===== */}
      <div className="container-fluid section-chat py-4 py-md-5">
        <div className="container">
          <div className="row align-items-center mt-5 mb-5">
            {/* LEFT IMAGE COLUMN */}
            <div className="col-12 col-lg-6">
              <div className="chat-image-container text-center">
                <img
                  src="/images/anonymous_chat-800.webp"
                  width="400"
                  height="800"
                  alt="end_to_end_encrypted_anonymous_individual_chat"
                  className="chat-image img-fluid"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* RIGHT CONTENT COLUMN */}
            <div className="col-12 col-lg-6">
              <div className="chat-content px-3 px-lg-5">
                <h2 className="section-title">
                  We chat securely and anonymously
                </h2>
                <p className="section-description mt-3 mt-md-4">
                  When your vibe matches with a stranger, you connect through
                  one-on-one private chats that are secure, anonymous, and
                  judgment-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== CREATE POLLS INFO DIV ===== */}
      <div className="container-fluid section-create py-4 py-md-5">
        <div className="container">
          <div className="row align-items-center mt-5 mb-5">
            {/* LEFT CONTENT COLUMN */}
            <div className="col-12 col-lg-6 order-2 order-lg-1">
              <div className="create-content px-3 px-lg-5">
                <h2 className="section-title ">
                  Create polls freely, your way
                </h2>
                <p className="section-description mt-3 mt-md-4">
                  With real-time voting, instant reach, and high user
                  engagement.
                </p>
              </div>
            </div>

            {/* RIGHT IMAGE COLUMN */}
            <div className="col-12 col-lg-6 order-1 order-lg-2">
              <div className="create-image-container text-center">
                <img
                  src="/images/create_poll-800.webp"
                  width="400"
                  height="800"
                  alt="anonymous_opinion_poll_creation"
                  className="create-poll-image img-fluid"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
