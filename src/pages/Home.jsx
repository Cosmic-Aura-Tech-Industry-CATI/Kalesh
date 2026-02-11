import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import "../styles/pages/home.css";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>      <Helmet>
        <title>Kalesh — India's Anonymous Social Media Platform</title>
        <meta name="description" content="Kalesh is India's anonymous social media platform where you can speak freely without revealing your identity. Join real-time live polls and share opinions anonymously." />
        <link rel="canonical" href="https://thekalesh.com/" />
      </Helmet>      {/* ================= SEO META ================= */}
      <SEO
        title="Kalesh — India’s Anonymous Social Media Platform"
        description="Kalesh is India’s anonymous social media platform where you can speak freely without revealing your identity."
        ogTitle="Kalesh – Anonymous Opinions & Live Polls"
        ogDescription="Vote, share opinions, and engage anonymously with real-time live polls on Kalesh."
        twitterTitle="Kalesh – Anonymous Opinion Platform"
        twitterDescription="India's first real-time anonymous opinion and polling social platform."
      />

      <div className="home-wrapper">
        {/* ================= HERO SECTION ================= */}
        <div className="container-fluid home-hero">
          <div className="container-fluid px-0">
            <div className="row align-items-center g-0">
              {/* Hero TEXT */}

              <div className="col-12 col-lg-6 order-2 order-lg-1">
                <div className="hero-content">
                  <h1 className="hero-title">
                    India&apos;s First Anonymous Social Media Platform
                  </h1>

                  <p className="hero-subtitle ">
                    A platform where your opinion matters, not your
                    identity.{" "}
                  </p>

                  <div className="hero-buttons d-flex flex-column flex-sm-row gap-4 mt-4 mt-md-5">
                    <button className="btn-kalesh">
                      Download App (Coming Soon)
                    </button>

                    <button className="btn-outline-kalesh">
                      Join the Kalesh Community
                    </button>
                  </div>
                </div>
              </div>

              {/* 🔥 HERO IMAGE – LCP FIX */}
              <div className="col-12 col-lg-6 order-1 order-lg-2">
                <div className="hero-image align-items-center d-flex justify-content-center mx-5">
                  <img
                    src="/images/logo-600.webp"
                    srcSet="
                      /images/logo-600.webp 600w,
                    "
                    sizes="(max-width: 768px) 90vw, 600px"
                    width="400"
                    height="300"
                    className="img-fluid logo-glow"
                    alt="Kalesh anonymous social media platform logo"
                    fetchpriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= INFO SECTION ================= */}
        <div className="kalesh-info-section">
          <div className="container">
            <div className="info-image-row mt-4 mt-md-5">
              <img
                src="/images/logoupper-1200.webp"
                width="1200"
                height="290 "
                className="info-full-image"
                alt="Kalesh Top Banner"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="info-content text-center g-0">
              <h2 className="info-title mb-3 fs-3">No Profile Pressure</h2>
              <h2 className="info-title mb-3 fs-3">No Judgment</h2>
              <h2 className="info-title mb-3 mb-md-4 fs-3">
                Just Honest Opinions
              </h2>
            </div>

            <div className="info-image-row mb-4 mb-md-5">
              <img
                src="/images/logolower-1200.webp"
                width="1200"
                height="290"
                className="info-full-image"
                alt="Kalesh Bottom Banner"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* ===== REAL-TIME POLL INFO DIV ===== */}
        <div className="container-fluid section-poll py-4 py-md-5">
          <div className="container">
            <div className="row align-items-center mt-5 mb-5">
              
              {/* LEFT IMAGE COLUMN */}
              <div className="col-12 col-lg-6">
                <div className="poll-image-container text-center">
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
              {/* RIGHT CONTENT COLUMN */}
              <div className="col-12 col-lg-6">
                <div className="poll-content px-3 px-lg-5">
                  <h2 className="section-title">
                    Live poll broadcasting with instant voting and maximum user
                    engagement
                  </h2>
                  <p className="section-description mt-3 mt-md-4">
                    Whether you're a new user or a well-established influencer, we
                    deliver fair, equal, and real engagement for everyone on the
                    platform
                  </p>
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
                    An anonymous platform that provides complete profile anonymity.
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
                  <h2 className="section-title ">Create polls freely, your way</h2>
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
      </div>
    </>
  );
}

export default Home;
