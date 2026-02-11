import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Blogteam.css';

const Blogteam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Shikhar Dixit",
      role: "CEO, Kalesh",
      bio: "Kalesh is built to give people freedom to speak honestly. Our team believes opinions deserve safety, speed, and respect — without identity pressure.",
      email: "dixitshikhar004@gmail.com",
      joined: "2026",
      
    },
    {
      id: 2,
      name: "Swatantra Singh",
      role: "CTO, Kalesh",
      bio: "We’re building Kalesh with strong fundamentals — low acquisition costs, high engagement, and a scalable model designed for sustainable growth.",
      email: "swatantrasingh308@gmail.com",
      joined: "2026",
      
    },
    {
      id: 3,
      name: "Nishkarsh Mishra",
      role: "CFO, Kalesh",
      bio: "Kalesh ensures safety with strict moderation, spam control, one-account-per-number policy, and device blocking to maintain a secure, respectful anonymous platform.",
      email: "mnishkarsh72@gmail.com",
      joined: "2026",
      
    },
    {
      id: 4,
      name: "Sheelu Singh",
      role: "Android Developer, Kalesh",
      bio: "I focus on building a fast, stable Android experience for Kalesh, ensuring users can engage instantly, securely, and without friction.",
      email: "sheelusingh7905@gmail.com",
      joined: "2026",
    },
    {
      id: 5,
      name: "Mridul Mishra",
      role: "Backend Developer, Kalesh",
      bio: "I build and maintain Kalesh’s backend to ensure scalability, speed, and reliability as users engage in real-time, anonymous interactions.",
      email: "mridulmishra2117@gmail.com",
      joined: "2026",
    },
    {
      id: 6,
      name: "Siddhant Shekhar",
      role: "Web Developer, Kalesh",
      bio: "I build Kalesh’s web experience to be fast, intuitive, and accessible, ensuring users can participate seamlessly across devices without friction.",
      email: "siddhantishekhar@gmail.com",
      joined: "2026",
    }
  ];


  return (
    <>
      <Helmet>
        <title>Meet The Team Behind Kalesh | Kalesh Blog</title>
        <meta name="description" content="Meet the passionate team building Kalesh - India's first anonymous social media platform. Learn about our mission-driven approach to online expression." />
        <link rel="canonical" href="https://thekalesh.com/blog/team" />
      </Helmet>
      <div className="team-page">
      {/* Navigation */}
      <nav className="team-nav">
        <div className="container-fluid">
          <div className="nav-content">
            <a href="/blog" className="back-button">
              <i className="fas fa-arrow-left"></i> Back to Blog
            </a>
            <div className="nav-logo">
              <i className="fas fa-users"></i>
              <span>Meet Our Team</span>
            </div>
            <div className="nav-actions">
              <a href="/contact" className="contact-btn">
                <i className="fas fa-envelope"></i> Contact Team
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="team-hero">
        <div className="container-fluid">
          <div className="hero-content">
            <div className="hero-text">
              <h6 className="team-label">TEAM-KALESH</h6>
              <h1 className="team-title">
                The Guardians of Your
                <span className="gradient-text"> Privacy & Kalesh</span>
              </h1>
              <p className="team-subtitle">
                Meet the minds behind Kalesh’s privacy-first infrastructure. Our team is dedicated to safeguarding anonymous expression and ensuring every conversation remains secure.
              </p>
            </div>
            
          </div>
        </div>
      </header>

      {/* Team Grid */}
      <section className="team-grid-section">
        <div className="container-fluid">
          <div className="section-header">
            <h2 className="section-title">Kalesh Team Desciption</h2>
            
          </div>

          <div className="team-grid">
            {teamMembers.map(member => (
              <div className="team-card" key={member.id}>
                <div className="card-inner">
                  <div className="card-front">
                    <div className="">
                      
                      <div className="member-status">
                        <i className="fas fa-circle"></i> Active
                      </div>
                    </div>
                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-role">{member.role}</p>
                      
                      
                    </div>
                    
                  </div>
                  
                  <div className="card-back">
                    <div className="back-content">
                      <h3 className="back-name">{member.name}</h3>
                      <p className="back-role">{member.role}</p>
                      <p className="back-bio">{member.bio}</p>
                      
                      <div className="back-details">
                        <div className="detail-item">
                          <i className="fas fa-envelope"></i>
                          <span>{member.email}</span>
                        </div>
                        <div className="detail-item">
                          <i className="fas fa-calendar-alt"></i>
                          <span>Joined {member.joined}</span>
                        </div>
                        
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
    </>
  );
};

export default Blogteam;