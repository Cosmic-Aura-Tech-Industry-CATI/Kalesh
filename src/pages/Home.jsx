import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import "../styles/pages/home.css";
import { FaUserSecret, FaShieldAlt, FaLock, FaComments } from "react-icons/fa";
import {
  FaFire,
  FaThumbsUp,
  FaPlusCircle,
  FaPoll,
  FaBolt,
  FaChartPie,
} from "react-icons/fa";

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
          <div className="row align-items-center feature-row">
            {/* LEFT IMAGE COLUMN */}
            <div className="col-12 col-lg-6 mb-5 mb-lg-0">
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

            <div className="col-12 col-lg-6 mb-5 mb-lg-0">
              <div className="poll-content px-3 px-lg-5">
                <div className="poll-live-chip">LIVE POLL SYSTEM</div>
                <h2 className="poll-title">
                  Live Polls.
                  <br />
                  Real Votes.
                  <br />
                  <span>Instant Results.</span>
                </h2>
                <div className="poll-desc-card">
                  <p className="section-description">
                    Launch live polls, collect authentic opinions from anonymous
                    users, and watch results update instantly as people vote in
                    real time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== CREATE POLLS INFO DIV ===== */}
      <div className="container-fluid section-create-poll py-4 py-md-5">
        <div className="container">
          <div className="row align-items-center feature-row">
            <div className="col-12 col-lg-6 order-2 order-lg-1">
              {/* LEFT CONTENT COLUMN */}
              <div className="profile-content px-3 px-lg-5">
                <div className="anonymous-badge">
                  <span></span>
                  COMPLETE ANONYMITY
                </div>

                <h2 className="anonymous-title">
                  Your Voice.
                  <br />
                  Your Thoughts.
                  <br />
                  <span>Never Your Identity.</span>
                </h2>

                <div className="poll-desc-card">
                  <p className="anonymous-desc">
                    Speak freely, share opinions, and connect with people
                    without revealing your real name, face, or personal details.
                    Kalesh protects your identity while amplifying your voice.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE COLUMN */}
            <div className="col-12 col-lg-6 order-1 order-lg-2">
              <div className="profile-image-container text-center">
                <div className="identity-rings">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <img
                  src="/images/anonymous_profile-800.webp"
                  width="400"
                  height="800"
                  alt="kalesh_anonymous_Social_Profile"
                  className="profile-image img-fluid"
                />

                {/* Floating Icons */}
                <div className="privacy-chip chip-1">
                  <FaShieldAlt />
                  <span>No Real Name</span>
                </div>

                <div className="privacy-chip chip-2">
                  <FaLock />
                  <span>Hidden Identity</span>
                </div>

                <div className="privacy-chip chip-3">
                  <FaUserSecret />
                  <span>Anonymous Username</span>
                </div>

                <div className="privacy-chip chip-4">
                  <FaComments />
                  <span>Zero Judgement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== ANONYMOUS CHAT INFO DIV ===== */}
      <div className="container-fluid section-chat py-4 py-md-5">
        <div className="container">
          <div className="row align-items-center feature-row gx-5">
            {/* LEFT IMAGE COLUMN */}
            <div className="col-12 col-lg-6 mb-5 mb-lg-0">
              <div className="chat-image-container text-center">
                <div className="chat-glow"></div>

                <div className="chat-rings">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <img
                  src="/images/anonymous_chat-800.webp"
                  width="400"
                  height="800"
                  alt="end_to_end_encrypted_anonymous_individual_chat"
                  className="chat-image img-fluid"
                  loading="lazy"
                  decoding="async"
                />

                <div className="floating-chat-icon icon-lock">
                  <FaLock />
                </div>

                <div className="floating-chat-icon icon-shield">
                  <FaShieldAlt />
                </div>

                <div className="floating-chat-icon icon-secret">
                  <FaUserSecret />
                </div>

                <div className="floating-chat-icon icon-chat">
                  <FaComments />
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT COLUMN */}
            <div className="col-12 col-lg-6 mb-5 mb-lg-0">
              <div className="chat-content px-3 px-lg-5">
                <div className="chat-badge">
                  <span></span>
                  PRIVATE MATCHING
                </div>

                <h2 className="chat-title">
                  Connect.
                  <br />
                  Chat.
                  <br />
                  <span>Stay Anonymous.</span>
                </h2>

                <div className="poll-desc-card">
                  <p className="chat-desc">
                    Match with people who share your interests, thoughts, and
                    vibes. Every conversation stays private, secure, and
                    completely anonymous.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== CREATE POLLS INFO DIV ===== */}
      <div className="container-fluid section-create py-4 py-md-5">
        <div className="container">
          <div className="row align-items-center feature-row">
            {/* LEFT CONTENT COLUMN */}
            <div className="col-12 col-lg-6 order-2 order-lg-1">
              <div className="create-content px-3 px-lg-5">
                <div className="create-badge">
                  <span></span>
                  POLL CREATOR TOOLS
                </div>
                <h2 className="create-title">
                  Ask Anything.
                  <br />
                  Get Real Opinions.
                  <br />
                  <span>Instantly.</span>
                </h2>

                <div className="poll-desc-card">
                  <p className="create-desc">
                    Launch polls in seconds, collect honest opinions from
                    anonymous users, and watch results update in real time.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE COLUMN */}
            <div className="col-12 col-lg-6 order-1 order-lg-2">
              <div className="create-image-container text-center">
                <div className="create-rings">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <img
                  src="/images/create_poll-800.webp"
                  width="400"
                  height="800"
                  alt="anonymous_opinion_poll_creation"
                  className="create-poll-image img-fluid"
                  loading="lazy"
                  decoding="async"
                />
                <div className="creator-icon icon-create-1">
                  <FaPlusCircle />
                </div>

                <div className="creator-icon icon-create-2">
                  <FaPoll />
                </div>

                <div className="creator-icon icon-create-3">
                  <FaBolt />
                </div>

                <div className="creator-icon icon-create-4">
                  <FaChartPie />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
