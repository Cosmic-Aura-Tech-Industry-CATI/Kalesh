import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import './GlassComponents.css';

function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms & Conditions – Kalesh Anonymous Platform Rules</title>
        <meta
          name="description"
          content="Read Kalesh's terms and conditions for anonymous social media. Learn about user responsibilities, anonymity, content policies, and platform rules."
        />
        <link rel="canonical" href="https://thekalesh.com/termsandconditions" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <SEO
        title="Terms & Conditions – Kalesh Anonymous Platform Rules"
        description="Read Kalesh's terms and conditions for anonymous social media. Learn about user responsibilities, anonymity, content policies, and platform rules."
        ogTitle="Terms & Conditions - Kalesh"
        ogDescription="Understand Kalesh's platform rules and user responsibilities for anonymous social media."
        twitterTitle="Terms & Conditions - Kalesh"
        twitterDescription="Read Kalesh's terms and conditions for India's anonymous opinion platform."
      />

      <div className="glass-container">
        {/* Add aria-hidden for decorative elements */}
        <div className="glass-top-gradient" aria-hidden="true"></div>
        <div className="glass-bottom-gradient" aria-hidden="true"></div>
        <div className="glass-inner-glow" aria-hidden="true"></div>
        
        <div className="glass-content">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9 px-md-5 px-3">
              <div className="glass-header mb-5">
                <h1>Terms & Conditions</h1>
                <p className="last-updated"><strong>Last Updated:</strong> January 12, 2026</p>
              </div>

              <div className="guidelines-intro mb-5">
                <p>
                  Welcome to <strong>Kalesh</strong>. These Terms and Conditions ("Terms") govern your access to and use of the Kalesh website, mobile application, and related services (collectively, the "Platform"). By accessing or using Kalesh, you agree to be bound by these Terms. If you do not agree, please do not use the Platform.
                </p>
              </div>

              {/* Section 1 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">1</span>
                  <h2 className="section-title">About Kalesh</h2>
                </div>
                <div className="section-content">
                  <p>
                    Kalesh is an <strong>anonymous social media platform</strong> that allows users to create, participate in, and engage with <strong>real-time polls, discussions, and interactions</strong> without publicly revealing their identity. Kalesh prioritizes free expression while maintaining user safety and legal compliance.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">2</span>
                  <h2 className="section-title">Eligibility</h2>
                </div>
                <div className="section-content">
                  <p>You must be at least 16 years old to use Kalesh.</p>
                  <p>By using the Platform, you confirm that:</p>
                  <ul>
                    <li>You meet the minimum age requirement</li>
                    <li>You are legally capable of entering into a binding agreement</li>
                    <li>You are using the Platform for lawful purposes only</li>
                  </ul>
                  <p>Kalesh reserves the right to restrict or terminate access if eligibility requirements are violated.</p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">3</span>
                  <h2 className="section-title">Account Registration & Anonymity</h2>
                </div>
                <div className="section-content">
                  <ul>
                    <li>Kalesh operates on an <strong>anonymous identity model</strong>.</li>
                    <li>Users are not required to publicly display personal identifiers such as name, photo, or social handles.</li>
                    <li>Internally, Kalesh may collect limited information (such as mobile number or device identifiers) <strong>only for security, moderation, and abuse prevention purposes</strong>.</li>
                    <li>Users must not attempt to impersonate others, create multiple accounts to manipulate engagement, or misuse anonymity.</li>
                  </ul>
                  <div className="glass-note">
                    <p><strong>Anonymity does not mean lack of accountability.</strong></p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">4</span>
                  <h2 className="section-title">User Conduct & Responsibilities</h2>
                </div>
                <div className="section-content">
                  <p>While using Kalesh, you agree <strong>not to post, share, or engage in content that</strong>:</p>
                  <ul>
                    <li>Is illegal, abusive, threatening, hateful, or violent</li>
                    <li>Promotes harassment, bullying, or discrimination</li>
                    <li>Contains sexually explicit material involving minors</li>
                    <li>Encourages self-harm, suicide, or dangerous activities</li>
                    <li>Spreads misinformation, spam, or malicious links</li>
                    <li>Violates intellectual property or privacy rights</li>
                    <li>Attempts to deanonymize, expose, or harm other users</li>
                  </ul>
                  <p>Kalesh maintains a <strong>zero-tolerance policy</strong> for severe violations.</p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">5</span>
                  <h2 className="section-title">Content Ownership & License</h2>
                </div>
                <div className="section-content">
                  <ul>
                    <li>You <strong>retain ownership</strong> of the content you create on Kalesh.</li>
                    <li>By posting content, you grant Kalesh a <strong>non-exclusive, worldwide, royalty-free license</strong> to use, display, distribute, and moderate such content for operating and improving the Platform.</li>
                    <li>Kalesh does not claim ownership of user opinions or poll responses.</li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">6</span>
                  <h2 className="section-title">Moderation, Reporting & Enforcement</h2>
                </div>
                <div className="section-content">
                  <ul>
                    <li>Kalesh uses <strong>automated systems and human moderation</strong> to maintain platform safety.</li>
                    <li>Users may report content or behavior that violates these Terms.</li>
                    <li>Kalesh reserves the right to:
                      <ul>
                        <li>Remove or restrict content</li>
                        <li>Suspend or permanently ban accounts</li>
                        <li>Cooperate with legal authorities when required by law</li>
                      </ul>
                    </li>
                  </ul>
                  <p>Decisions taken for safety or compliance may be final.</p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">7</span>
                  <h2 className="section-title">No Expectation of Privacy for Public Content</h2>
                </div>
                <div className="section-content">
                  <p>
                    While Kalesh provides anonymity, <strong>content shared publicly on the Platform may be viewed, shared, or discussed by other users</strong>.
                    Users should avoid sharing sensitive personal or confidential information.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">8</span>
                  <h2 className="section-title">Third-Party Links & Services</h2>
                </div>
                <div className="section-content">
                  <p>
                    Kalesh may contain links or integrations to third-party websites or services. Kalesh is not responsible for the content, policies, or practices of third parties. Use them at your own risk.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">9</span>
                  <h2 className="section-title">Platform Availability & Changes</h2>
                </div>
                <div className="section-content">
                  <p>Kalesh may:</p>
                  <ul>
                    <li>Modify, suspend, or discontinue features at any time</li>
                    <li>Introduce new services, limits, or policies</li>
                    <li>Experience downtime due to maintenance or technical issues</li>
                  </ul>
                  <p>Kalesh is provided on an "as-is" and "as-available" basis.</p>
                </div>
              </div>

              {/* Section 10 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">10</span>
                  <h2 className="section-title">Disclaimer of Warranties</h2>
                </div>
                <div className="section-content">
                  <p>Kalesh does not guarantee:</p>
                  <ul>
                    <li>Accuracy or reliability of user-generated content</li>
                    <li>Continuous or error-free operation</li>
                    <li>That opinions expressed reflect factual correctness</li>
                  </ul>
                  <p>All opinions shared on Kalesh belong solely to the users who post them.</p>
                </div>
              </div>

              {/* Section 11 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">11</span>
                  <h2 className="section-title">Limitation of Liability</h2>
                </div>
                <div className="section-content">
                  <p>To the maximum extent permitted by law, Kalesh shall not be liable for:</p>
                  <ul>
                    <li>Any indirect, incidental, or consequential damages</li>
                    <li>Loss of data, reputation, or business</li>
                    <li>User-generated content or interactions</li>
                  </ul>
                  <p>Use of the Platform is at your own discretion and risk.</p>
                </div>
              </div>

              {/* Section 12 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">12</span>
                  <h2 className="section-title">Termination</h2>
                </div>
                <div className="section-content">
                  <p>Kalesh reserves the right to suspend or terminate your access:</p>
                  <ul>
                    <li>For violation of these Terms</li>
                    <li>For misuse of anonymity</li>
                    <li>For legal or safety reasons</li>
                  </ul>
                  <p>Termination may occur without prior notice in serious cases.</p>
                </div>
              </div>

              {/* Section 13 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">13</span>
                  <h2 className="section-title">Governing Law & Jurisdiction</h2>
                </div>
                <div className="section-content">
                  <p>
                    These Terms shall be governed by and interpreted in accordance with the <strong>laws of India</strong>. Any disputes shall be subject to the exclusive jurisdiction of courts located in <strong>India</strong>.
                  </p>
                </div>
              </div>

              {/* Section 14 */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">14</span>
                  <h2 className="section-title">Changes to These Terms</h2>
                </div>
                <div className="section-content">
                  <p>
                    Kalesh may update these Terms from time to time. Continued use of the Platform after updates constitutes acceptance of the revised Terms.
                  </p>
                </div>
              </div>

              {/* Section 15 - Contact */}
              <div className="glass-section-card">
                <div className="section-header">
                  <span className="section-number">15</span>
                  <h2 className="section-title">Contact Information</h2>
                </div>
                <div className="section-content">
                  <p>For questions, concerns, or legal notices, please contact:</p>
                  <div className="glass-contact-card">
                    <p><strong>Email:</strong> 
                      <a 
                        href="mailto:support@kalesh.app" 
                        className="contact-email-link"
                      >
                        support@kalesh.app
                      </a>
                    </p>
                    <p><strong>Company Name:</strong> Kalesh</p>
                    <p><strong>Location:</strong> India</p>
                  </div>
                </div>
              </div>

              {/* Final Note */}
              <div className="glass-final-note">
                <h3 className="mb-4">Important Note on Anonymity</h3>
                <p className="mb-4">
                  Kalesh is built to protect anonymous expression — not to protect harmful behavior. Freedom of speech exists alongside responsibility.
                </p>
                <div className="glass-commitments">
                  <div className="commitment-item" aria-label="Protect Expression">
                    <div className="commitment-icon">🗣️</div>
                    <p>Protect Expression</p>
                  </div>
                  <div className="commitment-item" aria-label="Ensure Responsibility">
                    <div className="commitment-icon">⚖️</div>
                    <p>Ensure Responsibility</p>
                  </div>
                  <div className="commitment-item" aria-label="Maintain Safety">
                    <div className="commitment-icon">🛡️</div>
                    <p>Maintain Safety</p>
                  </div>
                  <div className="commitment-item" aria-label="Build Community">
                    <div className="commitment-icon">🤝</div>
                    <p>Build Community</p>
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

export default TermsAndConditions;