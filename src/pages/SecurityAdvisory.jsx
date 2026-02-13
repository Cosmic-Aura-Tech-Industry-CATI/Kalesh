import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from "../components/SEO";
import './GlassComponents.css';

function SectionCard({ number, title, content }) {
  return (
    <div className="glass-section-card">
      <div className="section-header">
        <span className="section-number">{number}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-content">
        {content}
      </div>
    </div>
  );
}

function SecurityAdvisory() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      number: "1",
      title: "Our Security-First Approach",
      content: (
        <div>
          <p>Kalesh is designed using a <strong>security-by-design</strong> and <strong>privacy-by-default</strong> philosophy. This means:</p>
          <ul>
            <li>We collect minimal data</li>
            <li>We restrict internal access strictly</li>
            <li>We design systems assuming misuse attempts</li>
            <li>We proactively mitigate abuse and threats</li>
          </ul>
          <div className="glass-note">
            <p>Anonymity without security is dangerous — Kalesh ensures both.</p>
          </div>
        </div>
      )
    },
    {
      number: "2",
      title: "Data Protection & Encryption",
      content: (
        <>
          <p>We use industry-standard practices to protect user data:</p>
          <ul>
            <li><strong>Encryption in transit</strong> using secure HTTPS/TLS protocols</li>
            <li><strong>Encryption at rest</strong> for sensitive stored data</li>
            <li>Secure key management and restricted access controls</li>
            <li>No public exposure of internal identifiers</li>
          </ul>
          <p>Even in the unlikely event of unauthorized access, encrypted data remains unreadable.</p>
        </>
      )
    },
    // Add other sections here in the array...
  ];

  return (
    <>
      <Helmet>
        <title>Security Advisory – Kalesh Platform Security & Data Protection</title>
        <meta
          name="description"
          content="Learn about Kalesh's security measures, data protection, encryption, and privacy safeguards for anonymous social media and real-time polling."
        />
        <link rel="canonical" href="https://thekalesh.com/securityadvisory" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <SEO
        title="Security Advisory – Kalesh Platform Security & Data Protection"
        description="Learn about Kalesh's security measures, data protection, encryption, and privacy safeguards for anonymous social media and real-time polling."
        ogTitle="Security Advisory - Kalesh"
        ogDescription="Discover how Kalesh protects user security and data on India's anonymous social media platform."
        twitterTitle="Security Advisory - Kalesh"
        twitterDescription="Learn about Kalesh's security measures and data protection for anonymous users."
      />

      <div className="glass-container">
        {/* Top gradient overlay layer */}
        <div className="glass-top-gradient" aria-hidden="true"></div>
        
        {/* Bottom gradient overlay layer */}
        <div className="glass-bottom-gradient" aria-hidden="true"></div>
        
        {/* Inner glow layer */}
        <div className="glass-inner-glow" aria-hidden="true"></div>
        
        {/* Main content container */}
        <div className="glass-content">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9 px-md-5 px-3">
              {/* Header with enhanced glass effect */}
              <div className="glass-header mb-5">
                <h1 className="text-center" style={{ color: '#ff6a00' }}>Security Advisory</h1>
                <p className="text-center mt-3"><strong>Last Updated:</strong> January 12, 2026</p>
              </div>

              {/* Introduction with subtle glass panel */}
              <div className="glass-panel mb-5">
                <p className="text-center">
                  At <strong>Kalesh</strong>, security is not an afterthought — it is a foundational pillar of our platform. As an anonymous social media and real-time polling platform, we understand that users trust us not only with their opinions, but also with their safety, privacy, and data integrity.
                </p>
                <p className="text-center mt-3">
                  This Security Advisory explains how we protect our platform, our users, and their data.
                </p>
              </div>

              {/* Section 1 */}
              <SectionCard 
                number="1" 
                title="Our Security-First Approach"
                content={
                  <div>
                    <p>Kalesh is designed using a <strong>security-by-design</strong> and <strong>privacy-by-default</strong> philosophy. This means:</p>
                    <ul>
                      <li>We collect minimal data</li>
                      <li>We restrict internal access strictly</li>
                      <li>We design systems assuming misuse attempts</li>
                      <li>We proactively mitigate abuse and threats</li>
                    </ul>
                    <div className="glass-note">
                      <p>Anonymity without security is dangerous — Kalesh ensures both.</p>
                    </div>
                  </div>
                }
              />

              {/* Section 2 */}
              <SectionCard 
                number="2" 
                title="Data Protection & Encryption"
                content={
                  <>
                    <p>We use industry-standard practices to protect user data:</p>
                    <ul>
                      <li><strong>Encryption in transit</strong> using secure HTTPS/TLS protocols</li>
                      <li><strong>Encryption at rest</strong> for sensitive stored data</li>
                      <li>Secure key management and restricted access controls</li>
                      <li>No public exposure of internal identifiers</li>
                    </ul>
                    <p>Even in the unlikely event of unauthorized access, encrypted data remains unreadable.</p>
                  </>
                }
              />

              {/* Section 3 */}
              <SectionCard 
                number="3" 
                title="Account & Identity Protection"
                content={
                  <>
                    <p>Although Kalesh is anonymous, internal safeguards ensure account security:</p>
                    <ul>
                      <li>One-account-per-verification mechanism to reduce fake users</li>
                      <li>Rate limiting and bot-prevention systems</li>
                      <li>Monitoring for suspicious login patterns or abuse</li>
                      <li>Protection against brute-force and automated attacks</li>
                    </ul>
                    <p>User identities are <strong>never publicly displayed or searchable</strong>.</p>
                  </>
                }
              />

              {/* Section 4 */}
              <SectionCard 
                number="4" 
                title="Infrastructure Security"
                content={
                  <>
                    <p>Kalesh runs on secure cloud infrastructure with:</p>
                    <ul>
                      <li>Hardened servers and firewalls</li>
                      <li>Regular security updates and patching</li>
                      <li>Network isolation and access segmentation</li>
                      <li>Secure backups and disaster recovery mechanisms</li>
                    </ul>
                    <p>Only authorized personnel with defined roles can access production systems.</p>
                  </>
                }
              />

              {/* Section 5 */}
              <SectionCard 
                number="5" 
                title="Application Security"
                content={
                  <>
                    <p>To protect against common application threats, we implement safeguards against:</p>
                    <ul>
                      <li>SQL injection and database attacks</li>
                      <li>Cross-site scripting (XSS)</li>
                      <li>Cross-site request forgery (CSRF)</li>
                      <li>API abuse and manipulation</li>
                      <li>Unauthorized data scraping</li>
                    </ul>
                    <p>Our codebase follows secure development practices and is regularly reviewed.</p>
                  </>
                }
              />

              {/* Section 6 */}
              <SectionCard 
                number="6" 
                title="Abuse Prevention & Anonymity Misuse Control"
                content={
                  <>
                    <p>Anonymity does not mean lack of control.</p>
                    <p>Kalesh actively detects and limits:</p>
                    <ul>
                      <li>Spam, bots, and automated manipulation</li>
                      <li>Coordinated harassment or brigading</li>
                      <li>Attempts to deanonymize or expose users</li>
                      <li>Poll manipulation or fake engagement</li>
                    </ul>
                    <p>We use a combination of automated systems and human review to maintain platform integrity.</p>
                  </>
                }
              />

              {/* Section 7 */}
              <SectionCard 
                number="7" 
                title="Content Moderation & Safety Monitoring"
                content={
                  <>
                    <p>Security also includes emotional and community safety:</p>
                    <ul>
                      <li>Real-time content scanning for harmful behavior</li>
                      <li>Reporting tools for users</li>
                      <li>Swift action on severe violations</li>
                      <li>Escalation protocols for illegal or high-risk content</li>
                    </ul>
                    <p>Moderation decisions are taken to protect the community as a whole.</p>
                  </>
                }
              />

              {/* Section 8 */}
              <SectionCard 
                number="8" 
                title="Employee & Internal Security"
                content={
                  <>
                    <p>We protect against internal risks by:</p>
                    <ul>
                      <li>Limiting employee access on a need-to-know basis</li>
                      <li>Enforcing strong authentication for internal systems</li>
                      <li>Conducting security awareness training</li>
                      <li>Logging and auditing sensitive system actions</li>
                    </ul>
                    <p>User trust is protected both technically and operationally.</p>
                  </>
                }
              />

              {/* Section 9 */}
              <SectionCard 
                number="9" 
                title="Third-Party Security"
                content={
                  <>
                    <p>We work only with trusted third-party service providers (such as cloud hosting or analytics tools) who:</p>
                    <ul>
                      <li>Follow recognized security standards</li>
                      <li>Are contractually bound to protect data</li>
                      <li>Do not access user identities or content unnecessarily</li>
                    </ul>
                    <p>We do not sell or trade user data.</p>
                  </>
                }
              />

              {/* Section 10 */}
              <SectionCard 
                number="10" 
                title="Incident Response & Breach Handling"
                content={
                  <>
                    <p>In the rare event of a security incident:</p>
                    <ul>
                      <li>We immediately investigate and contain the issue</li>
                      <li>Affected systems are secured</li>
                      <li>Impact is assessed transparently</li>
                      <li>Users and authorities are notified when legally required</li>
                    </ul>
                    <p>Our goal is <strong>fast response, minimal impact, and full accountability</strong>.</p>
                  </>
                }
              />

              {/* Section 11 */}
              <SectionCard 
                number="11" 
                title="User Responsibilities"
                content={
                  <>
                    <p>Security is strongest when users also take precautions:</p>
                    <ul>
                      <li>Do not share personal information on the platform</li>
                      <li>Keep your device secure and updated</li>
                      <li>Report suspicious activity immediately</li>
                      <li>Do not attempt to exploit or bypass platform safeguards</li>
                    </ul>
                    <p>Misuse of the platform may result in account suspension or legal action.</p>
                  </>
                }
              />

              {/* Section 12 */}
              <SectionCard 
                number="12" 
                title="Continuous Improvement"
                content={
                  <>
                    <p>Security threats evolve — and so do we.</p>
                    <p>Kalesh continuously:</p>
                    <ul>
                      <li>Monitors emerging threats</li>
                      <li>Improves systems and policies</li>
                      <li>Updates security controls</li>
                      <li>Reviews platform risks as we scale</li>
                    </ul>
                    <p>Security is an ongoing process, not a one-time setup.</p>
                  </>
                }
              />

              {/* Section 13 */}
              <SectionCard 
                number="13" 
                title="Legal & Regulatory Compliance"
                content={
                  <>
                    <p>Our security practices align with:</p>
                    <ul>
                      <li>Information Technology Act, 2000 (India)</li>
                      <li>IT Rules, 2021</li>
                      <li>Applicable data protection principles</li>
                      <li>Platform safety and user protection requirements</li>
                    </ul>
                  </>
                }
              />

              {/* Section 14 */}
              <SectionCard 
                number="14" 
                title="Responsible Disclosure"
                content={
                  <>
                    <p>If you discover a security vulnerability, we encourage responsible disclosure.</p>
                    <p>Please report security concerns to:</p>
                    <div className="glass-contact-card">
                      <p><strong>Email:</strong> 
                        <a 
                          href="mailto:security@kalesh.app" 
                          className="security-email-link"
                        >
                          security@kalesh.app
                        </a>
                      </p>
                    </div>
                    <p>Do not publicly disclose vulnerabilities before allowing us time to investigate and resolve them.</p>
                  </>
                }
              />

              {/* Final Commitment */}
              <div className="glass-final-note">
                <h3 className="text-center mb-4" style={{ color: '#ff6a00' }}>15. Final Commitment</h3>
                <p className="text-center mb-4">
                  Kalesh exists to protect <strong>real opinions without fear</strong>.
                </p>
                <p className="text-center mb-4">
                  Security is what makes that possible.
                </p>
                <div className="glass-commitments">
                  <div className="commitment-item" aria-label="Protecting anonymity">
                    <div className="commitment-icon">🔒</div>
                    <p>Protecting anonymity</p>
                  </div>
                  <div className="commitment-item" aria-label="Preventing abuse">
                    <div className="commitment-icon">🛡️</div>
                    <p>Preventing abuse</p>
                  </div>
                  <div className="commitment-item" aria-label="Securing data">
                    <div className="commitment-icon">💾</div>
                    <p>Securing data</p>
                  </div>
                  <div className="commitment-item" aria-label="Earning user trust every day">
                    <div className="commitment-icon">🤝</div>
                    <p>Earning user trust every day</p>
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

export default SecurityAdvisory;