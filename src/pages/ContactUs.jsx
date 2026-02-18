import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

import { useCreateContact } from "../hooks/usePublicService";

import SEO from "../components/SEO";

import "../styles/pages/contactus.css";

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: createContact, isPending } = useCreateContact();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    createContact(data, {
      onSuccess: () => {
        setIsSubmitted(true);
        reset();
      },
    });
  };

  const teamMembers = [
    {
      role: "Founder & Product Lead",
      icon: "👑",
      description: "Vision and strategy",
    },
    {
      role: "Frontend Developers",
      icon: "💻",
      description: "React, UI/UX implementation",
    },
    {
      role: "Backend Developers",
      icon: "⚙️",
      description: "Server, database, APIs",
    },
    {
      role: "UI/UX Designers",
      icon: "🎨",
      description: "Visual design & user experience",
    },
    {
      role: "Community Team",
      icon: "🤝",
      description: "Growth & user engagement",
    },
    {
      role: "Security Team",
      icon: "🛡️",
      description: "Privacy & data protection",
    },
  ];

  const contactInfo = [
    {
      title: "General Inquiries",
      email: "hello@kalesh.app",
      icon: "📧",
    },
    {
      title: "Support & Help",
      email: "support@kalesh.app",
      icon: "🆘",
    },
    {
      title: "Privacy & Security",
      email: "security@kalesh.app",
      icon: "🔒",
    },
    {
      title: "Business",
      email: "business@kalesh.app",
      icon: "💼",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us – Get in Touch with Kalesh</title>
        <meta
          name="description"
          content="Contact the Kalesh team anonymously. We're here to help with your questions, support needs, and feedback."
        />
        <link rel="canonical" href="https://thekalesh.com/contact" />
      </Helmet>
      <SEO
        title="Get in Touch | Kalesh"
        description="Contact the Kalesh team anonymously. We're here to help."
      />

      <div className="contact-us-container">
        {/* Background Elements */}
        <div className="contact-glow-1"></div>
        <div className="contact-glow-2"></div>

        <div className="contact-us-content">
          {/* Hero Section */}
          <section className="contact-hero">
            <div className="contact-hero-content">
              <h1 className="contact-hero-title">
                Get in Touch —{" "}
                <span className="contact-gradient-text">Anonymously Safe</span>
              </h1>
              <p className="contact-hero-subtitle">
                Whether you have questions, feedback, or just want to connect
                with the team building Kalesh — we're here to listen. Your
                privacy is always protected.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <div className="section-header">
              <h2 className="section-title">The Kalesh Team</h2>
              <p className="section-subtitle">
                A passionate group building anonymous expression technology with
                creativity, security, and community at heart.
              </p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card glass-card">
                  <div className="team-icon">{member.icon}</div>
                  <h3 className="team-role">{member.role}</h3>
                  <p className="team-description">{member.description}</p>
                </div>
              ))}
            </div>

            <div className="team-values glass-card">
              <h3 className="values-title">Our Core Values</h3>
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">🔐</div>
                  <h4>Privacy First</h4>
                  <p>Your anonymity is our priority</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🤫</div>
                  <h4>Zero Identity</h4>
                  <p>No names, just ideas</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">⚡</div>
                  <h4>Real-Time</h4>
                  <p>Instant polls & discussions</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🛡️</div>
                  <h4>Safe Space</h4>
                  <p>Protected expression</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="form-section">
            <div className="form-container glass-card">
              <div className="form-header">
                <h2 className="form-title">Send Us a Message</h2>
                <p className="form-subtitle">
                  We read every message. For privacy reasons, you don't need to
                  share your identity unless you want to.
                </p>
              </div>

              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    We'll get back to you soon. Your privacy remains protected.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="contact-form"
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name (Optional)</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Anonymous user"
                        className="form-input"
                        {...register("name")}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email (Optional)</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="form-input"
                        {...register("email")}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      placeholder="What would you like to discuss?"
                      className="form-input"
                      {...register("subject", { required: true })}
                    />
                    {errors.subject && (
                      <span className="text-danger small">
                        Subject is required
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      placeholder="Type your message here..."
                      rows="6"
                      className="form-textarea"
                      {...register("message", { required: true })}
                    />
                    {errors.message && (
                      <span className="text-danger small">
                        Message is required
                      </span>
                    )}
                  </div>

                  <div className="privacy-note">
                    <div className="privacy-icon">🔒</div>
                    <p>
                      Your message will be handled with strict privacy. No
                      personal data is stored unless necessary for your request.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Send Message Securely"}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Contact Information */}
          <section className="info-section">
            <div className="info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card glass-card">
                  <div className="info-icon">{info.icon}</div>
                  <h3 className="info-title">{info.title}</h3>
                  <a href={`mailto:${info.email}`} className="info-email">
                    {info.email}
                  </a>
                  <p className="info-response">Response within 48 hours</p>
                </div>
              ))}
            </div>

            <div className="contact-tips glass-card">
              <h3 className="tips-title">Contact Tips</h3>
              <div className="tips-list">
                <div className="tip">
                  <div className="tip-icon">💡</div>
                  <div>
                    <h4>For Quicker Help</h4>
                    <p>Check our Help Center first for instant answers</p>
                  </div>
                </div>
                <div className="tip">
                  <div className="tip-icon">🕵️</div>
                  <div>
                    <h4>Stay Anonymous</h4>
                    <p>You don't need to share personal info unless required</p>
                  </div>
                </div>
                <div className="tip">
                  <div className="tip-icon">⚡</div>
                  <div>
                    <h4>Fast Response</h4>
                    <p>Most emails are answered within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Location & Legal */}
          <section className="legal-section">
            <div className="legal-content glass-card">
              <div className="legal-info">
                <h3 className="legal-title">Based in India</h3>
                <p className="legal-text">
                  Kalesh operates under Indian jurisdiction, following
                  Information Technology Act, 2000 and IT Rules, 2021. We're
                  committed to legal compliance while protecting user privacy.
                </p>
                <div className="legal-badges">
                  <span className="legal-badge">🇮🇳 Indian Company</span>
                  <span className="legal-badge">⚖️ Legal Compliant</span>
                  <span className="legal-badge">🔐 Privacy Protected</span>
                </div>
              </div>
              <div className="legal-illustration">
                <div className="legal-icon">📍</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
