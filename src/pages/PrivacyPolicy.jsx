import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import './GlassComponents.css';

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Kalesh</title>
        <meta name="description" content="Read Kalesh's Privacy Policy to understand how we collect, use, and protect your data on our anonymous social media platform." />
        <link rel="canonical" href="https://thekalesh.com/privacypolicy" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <SEO
        title="Privacy Policy - Kalesh"
        description="Read Kalesh's Privacy Policy to understand how we collect, use, and protect your data on our anonymous social media platform."
        ogTitle="Privacy Policy - Kalesh"
        ogDescription="Learn about Kalesh's commitment to protecting your privacy and data on India's anonymous social media platform."
        twitterTitle="Privacy Policy - Kalesh"
        twitterDescription="Read how Kalesh protects user privacy and data on our anonymous opinion platform."
      />
      <div className="glass-container">
      <div className="glass-top-gradient"></div>
      <div className="glass-bottom-gradient"></div>
      <div className="glass-inner-glow"></div>
      
      <div className="glass-content">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9 px-md-5 px-3">
            <div className="glass-header mb-5">
              <h1>Privacy Policy</h1>
              <p className="last-updated"><strong>Last Updated:</strong> January 12, 2026</p>
            </div>

            <div className="guidelines-intro mb-5">
              <p>
                Kalesh respects your privacy and is committed to protecting it. This Privacy Policy explains how Kalesh collects, uses, stores, shares, and safeguards information when you access or use our website, mobile application, and related services (collectively, the "Platform").
              </p>
              <p className="mb-0">
                Kalesh is built as an <strong>anonymous social media platform</strong>, and privacy protection is a core design principle of our product.
              </p>
            </div>

            {/* Section 1 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">1</span>
                <h2 className="section-title">Our Privacy Philosophy</h2>
              </div>
              <div className="section-content">
                <p>
                  Kalesh is designed to allow users to express opinions <strong>without public identity exposure</strong>. We intentionally minimize personal data collection and apply strong safeguards to protect users from identification, misuse, or exploitation.
                </p>
                <p><strong>Anonymity on Kalesh means:</strong></p>
                <ul>
                  <li>No public profiles with real names</li>
                  <li>No visible phone numbers or emails</li>
                  <li>No public follower or identity graphs</li>
                </ul>
                <div className="glass-note">
                  <p>However, anonymity does <strong>not</strong> mean absence of safety, moderation, or legal compliance.</p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">2</span>
                <h2 className="section-title">Information We Collect</h2>
              </div>
              <div className="section-content">
                <p>We collect only the information necessary to operate, secure, and improve the Platform.</p>
                
                <h3 style={{ color: '#ffcc99', marginTop: '1.5rem', marginBottom: '1rem' }}>2.1 Information You Provide</h3>
                <ul>
                  <li>Mobile number or login credentials (used for account verification only)</li>
                  <li>Feedback, support messages, or reports submitted to us</li>
                  <li>Content you voluntarily create (polls, votes, messages)</li>
                </ul>

                <h3 style={{ color: '#ffcc99', marginTop: '1.5rem', marginBottom: '1rem' }}>2.2 Automatically Collected Information</h3>
                <p>When you use Kalesh, we may collect:</p>
                <ul>
                  <li>Device information (device type, OS version)</li>
                  <li>App usage data (features used, session duration)</li>
                  <li>IP address (for security, abuse prevention, and legal compliance)</li>
                  <li>Log files and crash reports</li>
                </ul>

                <h3 style={{ color: '#ffcc99', marginTop: '1.5rem', marginBottom: '1rem' }}>2.3 What We Do NOT Collect</h3>
                <ul>
                  <li>Real names or profile photos</li>
                  <li>Contact lists</li>
                  <li>Location tracking (precise GPS)</li>
                  <li>Biometric data</li>
                  <li>Social media account access</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">3</span>
                <h2 className="section-title">How We Use Your Information</h2>
              </div>
              <div className="section-content">
                <p>Your information is used strictly for the following purposes:</p>
                <ul>
                  <li>To operate and maintain the Platform</li>
                  <li>To enable anonymous participation in polls and discussions</li>
                  <li>To prevent spam, abuse, fraud, and misuse of anonymity</li>
                  <li>To moderate harmful or illegal content</li>
                  <li>To improve app performance, stability, and user experience</li>
                  <li>To comply with legal obligations</li>
                </ul>
                <div className="glass-note">
                  <p>We do not sell personal data to third parties.</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">4</span>
                <h2 className="section-title">Anonymity & Internal Identifiers</h2>
              </div>
              <div className="section-content">
                <p>
                  While Kalesh does not display user identities publicly, we may internally associate accounts with:
                </p>
                <ul>
                  <li>Encrypted identifiers</li>
                  <li>Verification credentials</li>
                </ul>
                <p>
                  This is done solely for security, moderation, and legal enforcement and is never visible to other users.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">5</span>
                <h2 className="section-title">Content Visibility & User Responsibility</h2>
              </div>
              <div className="section-content">
                <p>Content posted on Kalesh may be:</p>
                <ul>
                  <li>Publicly visible within the Platform</li>
                  <li>Viewed, shared, or discussed by other users</li>
                </ul>
                <p>Users should avoid sharing:</p>
                <ul>
                  <li>Personal identifiers</li>
                  <li>Sensitive or confidential information</li>
                  <li>Information that could reveal identity indirectly</li>
                </ul>
                <div className="glass-note">
                  <p>Kalesh is not responsible for information users voluntarily disclose.</p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">6</span>
                <h2 className="section-title">Content Moderation & Safety</h2>
              </div>
              <div className="section-content">
                <p>To protect users:</p>
                <ul>
                  <li>Automated tools may scan content for policy violations</li>
                  <li>Human moderators may review reported content</li>
                  <li>Repeat or severe violations may result in account restriction or termination</li>
                </ul>
                <p>Moderation actions are taken to balance free expression with safety.</p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">7</span>
                <h2 className="section-title">Data Sharing & Disclosure</h2>
              </div>
              <div className="section-content">
                <p>We do <strong>not</strong> share user data except in limited circumstances:</p>
                <ul>
                  <li>With service providers (cloud hosting, analytics) under strict confidentiality</li>
                  <li>When required by law, court order, or government authority</li>
                  <li>To protect the safety, rights, or integrity of Kalesh or its users</li>
                </ul>
                <p>All third parties are required to follow data protection obligations.</p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">8</span>
                <h2 className="section-title">Data Storage & Security</h2>
              </div>
              <div className="section-content">
                <p>We implement industry-standard security measures including:</p>
                <ul>
                  <li>Encrypted data storage</li>
                  <li>Secure servers and access controls</li>
                  <li>Regular security monitoring</li>
                </ul>
                <div className="glass-note">
                  <p>Despite best efforts, no system is 100% secure. Users acknowledge inherent internet risks.</p>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">9</span>
                <h2 className="section-title">Data Retention</h2>
              </div>
              <div className="section-content">
                <p>We retain data:</p>
                <ul>
                  <li>Only for as long as necessary to operate the Platform</li>
                  <li>To comply with legal or regulatory requirements</li>
                  <li>To resolve disputes or enforce policies</li>
                </ul>
                <p>Inactive or terminated accounts may have data deleted or anonymized.</p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">10</span>
                <h2 className="section-title">User Rights</h2>
              </div>
              <div className="section-content">
                <p>Depending on applicable law, users may have the right to:</p>
                <ul>
                  <li>Access stored information</li>
                  <li>Request correction or deletion</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p>Requests can be submitted through official support channels.</p>
              </div>
            </div>

            {/* Section 11 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">11</span>
                <h2 className="section-title">Children's Privacy</h2>
              </div>
              <div className="section-content">
                <p>
                  Kalesh is <strong>not intended for children under 16 years of age</strong>.  
                  We do not knowingly collect data from minors. If such data is identified, it will be removed promptly.
                </p>
              </div>
            </div>

            {/* Section 12 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">12</span>
                <h2 className="section-title">Cookies & Tracking (Website)</h2>
              </div>
              <div className="section-content">
                <p>Our website may use cookies or similar technologies to:</p>
                <ul>
                  <li>Improve site functionality</li>
                  <li>Analyze traffic and performance</li>
                </ul>
                <p>Users can control cookies through browser settings.</p>
              </div>
            </div>

            {/* Section 13 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">13</span>
                <h2 className="section-title">Third-Party Links</h2>
              </div>
              <div className="section-content">
                <p>
                  Kalesh may contain links to third-party websites or services. We are not responsible for their privacy practices. Users should review third-party policies independently.
                </p>
              </div>
            </div>

            {/* Section 14 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">14</span>
                <h2 className="section-title">Changes to This Privacy Policy</h2>
              </div>
              <div className="section-content">
                <p>
                  We may update this Privacy Policy from time to time. Changes will be reflected with an updated "Last Updated" date. Continued use of the Platform indicates acceptance of the revised policy.
                </p>
              </div>
            </div>

            {/* Section 15 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">15</span>
                <h2 className="section-title">Legal Compliance</h2>
              </div>
              <div className="section-content">
                <p>This Privacy Policy is governed by:</p>
                <ul>
                  <li>Information Technology Act, 2000 (India)</li>
                  <li>IT Rules, 2021</li>
                  <li>Applicable data protection principles</li>
                </ul>
                <p>Disputes are subject to Indian jurisdiction.</p>
              </div>
            </div>

            {/* Section 16 */}
            <div className="glass-section-card">
              <div className="section-header">
                <span className="section-number">16</span>
                <h2 className="section-title">Contact Us</h2>
              </div>
              <div className="section-content">
                <p>For privacy-related questions or concerns, contact:</p>
                <div className="glass-contact-card">
                  <p><strong>Email:</strong> [official email]</p>
                  <p><strong>Company Name:</strong> Kalesh</p>
                  <p><strong>Country:</strong> India</p>
                </div>
              </div>
            </div>

            {/* Final Note */}
            <div className="glass-final-note">
              <h3 className="mb-4">Final Note</h3>
              <p className="mb-4">
                Kalesh is built to protect anonymous expression — while ensuring safety, legality, and accountability. Privacy is a right, but misuse of anonymity is not permitted.
              </p>
              <div className="glass-commitments">
                <div className="commitment-item">
                  <div className="commitment-icon">🕵️</div>
                  <p>Protect Anonymity</p>
                </div>
                <div className="commitment-item">
                  <div className="commitment-icon">🔐</div>
                  <p>Ensure Privacy</p>
                </div>
                <div className="commitment-item">
                  <div className="commitment-icon">⚖️</div>
                  <p>Maintain Legality</p>
                </div>
                <div className="commitment-item">
                  <div className="commitment-icon">🛡️</div>
                  <p>Uphold Accountability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default PrivacyPolicy;