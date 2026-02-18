import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import '../styles/pages/privacy.css';

// Import images from assets folder
import AnonymityImg from '../assets/AnonymityImg.png';
import ReportImg from '../assets/Toxic-polls.png';
import ChatImg from '../assets/end-to-end.png';
import PollImg from '../assets/Anno-opinion.png';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Kalesh Privacy Overview – How We Protect Anonymity</title>
        <meta
          name="description"
          content="Understand how Kalesh protects user privacy, anonymity, and data safety on India's anonymous social media platform."
        />
        <link rel="canonical" href="https://thekalesh.com/privacy" />
      </Helmet>
      <div className="privacy-page" style={{
      backgroundColor: '#0b0b0b',
      color: '#ffffff',
      minHeight: '100vh',
      paddingTop: '80px'
    }}>
      <div className="container py-5">
        {/* Hero Section */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="hero-title mb-4" style={{ fontSize: '3rem' }}>
              Privacy <span style={{ color: '#ff6a00' }}>&</span> Security
            </h1>
            <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              At Kalesh, we're committed to protecting your privacy and ensuring a secure, 
              judgment-free experience for everyone.
            </p>
          </div>
        </div>

        {/* Row 1: Text on left (col-8), Image on right (col-4) */}
        <div className="row align-items-center mb-5">
          {/* Text Column - col-8 */}
          <div className="col-lg-8 col-md-7 mb-4 mb-md-0">
            <div className="golden-orange-form-container">
              <section>
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3">
                    <i className="fas fa-user-secret fa-2x" style={{ color: '#ff6a00' }}></i>
                  </div>
                  <div>
                    <h2 className="section-title mb-2" style={{ color: '#ffffff' }}>Anonymity</h2>
                    <div className="kalesh-divider" style={{ width: '100px' }}></div>
                  </div>
                </div>
                
                <div className="glass-card p-4">
                  <p className="mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    <strong>Kalesh maintains user anonymity through anonymous profiles</strong>, ensuring 
                    privacy, security, and judgment-free expression. Your identity is protected while 
                    you freely express yourself in our community.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Image Column - col-4 */}
          <div className="col-lg-4 col-md-5">
            <img 
                src={AnonymityImg} 
                alt="Anonymous user profile showing privacy features" 
                className="img-fluid logo-glow"
                style={{ 
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              />
          </div>
        </div>

        {/* Row 2: Image on left (col-4), Text on right (col-8) */}
        <div className="row align-items-center mb-5">
          {/* Image Column - col-4 */}
          <div className="col-lg-4 col-md-5 order-2 order-md-1">
            <img 
                src={ReportImg} 
                alt="Report system for toxic content" 
                className="img-fluid logo-glow"
                style={{ 
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              />
          </div>

          {/* Text Column - col-8 */}
          <div className="col-lg-8 col-md-7 mb-4 mb-md-0 order-1 order-md-2">
            <div className="golden-orange-form-container">
              <section>
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3">
                    <i className="fas fa-shield-alt fa-2x" style={{ color: '#ff6a00' }}></i>
                  </div>
                  <div>
                    <h2 className="section-title mb-2" style={{ color: '#ffffff' }}>Security & Safety</h2>
                    <div className="kalesh-divider" style={{ width: '100px' }}></div>
                  </div>
                </div>
                
                <div className="glass-card p-4">
                  <p className="mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Easily report toxic, abusive, or harmful content on Kalesh to help us maintain a 
                    safe, respectful, and judgment-free community. Our moderation team reviews all 
                    reports promptly to ensure a positive environment for everyone.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Row 3: Text on left (col-8), Image on right (col-4) */}
        <div className="row align-items-center mb-5">
          {/* Text Column - col-8 */}
          <div className="col-lg-8 col-md-7 mb-4 mb-md-0">
            <div className="golden-orange-form-container">
              <section>
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3">
                    <i className="fas fa-lock fa-2x" style={{ color: '#ff6a00' }}></i>
                  </div>
                  <div>
                    <h2 className="section-title mb-2" style={{ color: '#ffffff' }}>End-to-End Encrypted Messaging</h2>
                    <div className="kalesh-divider" style={{ width: '100px' }}></div>
                  </div>
                </div>
                
                <div className="glass-card p-4">
                  <p className="mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Enjoy a secure, private messaging experience on Kalesh with full end-to-end 
                    encryption that protects your chats and keeps conversations confidential. Only you 
                    and the recipient can read what's sent.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Image Column - col-4 */}
          <div className="col-lg-4 col-md-5">
            <img 
                src={ChatImg} 
                alt="End-to-end encrypted chat interface" 
                className="img-fluid logo-glow"
                style={{ 
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              />
          </div>
        </div>

        {/* Row 4: Image on left (col-4), Text on right (col-8) */}
        <div className="row align-items-center mb-5">
          {/* Image Column - col-4 */}
          <div className="col-lg-4 col-md-5 order-2 order-md-1">
            <img 
                src={PollImg} 
                alt="Anonymous poll creation interface" 
                className="img-fluid logo-glow"
                style={{ 
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              />
          </div>

          {/* Text Column - col-8 */}
          <div className="col-lg-8 col-md-7 mb-4 mb-md-0 order-1 order-md-2">
            <div className="golden-orange-form-container">
              <section>
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3">
                    <i className="fas fa-hourglass-end fa-2x" style={{ color: '#ff6a00' }}></i>
                  </div>
                  <div>
                    <h2 className="section-title mb-2" style={{ color: '#ffffff' }}>Disappearing Messages</h2>
                    <div className="kalesh-divider" style={{ width: '100px' }}></div>
                  </div>
                </div>
                
                <div className="glass-card p-4">
                  <p className="mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Enable disappearing messages on Kalesh for secure, self-destructing chats that 
                    automatically delete after a set time, ensuring privacy and data protection. Take 
                    control of your digital footprint.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Additional footer if needed space*/}
        
      </div>

      {/* Add Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
    </>
  );
};

export default Privacy;