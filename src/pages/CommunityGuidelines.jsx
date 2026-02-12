import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import './GlassComponents.css';

function CommunityGuidelines() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Community Guidelines – Kalesh Anonymous Platform Rules</title>
        <meta
          name="description"
          content="Learn Kalesh's community guidelines for safe anonymous expression. Understand rules for respectful discussions, privacy protection, and content policies."
        />
        <meta 
          name="keywords" 
          content="community guidelines, anonymous platform rules, Kalesh policies, respectful discussion, privacy protection"
        />
        <link rel="canonical" href="https://thekalesh.com/communityguidelines" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <SEO
        title="Community Guidelines – Kalesh Anonymous Platform Rules"
        description="Learn Kalesh's community guidelines for safe anonymous expression. Understand rules for respectful discussions, privacy protection, and content policies."
        ogTitle="Community Guidelines - Kalesh"
        ogDescription="Understand Kalesh's community guidelines for safe and respectful anonymous discussions."
        twitterTitle="Community Guidelines - Kalesh"
        twitterDescription="Learn the community rules for India's anonymous opinion platform."
      />

      <div className="glass-container">
        <div className="glass-top-gradient" aria-hidden="true"></div>
        <div className="glass-bottom-gradient" aria-hidden="true"></div>
        <div className="glass-inner-glow" aria-hidden="true"></div>
        
        <div className="glass-content">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9 px-md-5 px-3">
              <header className="glass-header mb-5">
                <h1 className="h1">Community Guidelines</h1>
                <p className="last-updated" aria-label="Last updated date">
                  <strong>Last Updated:</strong> January 12, 2026
                </p>
              </header>

              {/* Welcome section */}
              <section className="guidelines-intro text-center mb-5" aria-labelledby="welcome-heading">
                <h2 id="welcome-heading" className="h3" style={{ color: '#ffcc99' }}>
                  Welcome to Kalesh <span aria-label="light bulb emoji" role="img">💡</span>
                </h2>
                <p className="mb-3">
                  Kalesh is a place for <strong>real opinions, honest polls, and open conversations — without identity pressure</strong>.  
                  To keep this space safe, respectful, and fun for everyone, we ask all users to follow these guidelines.
                </p>
                <p className="mb-0" style={{ color: '#ff6a00', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Anonymity is a freedom, not a license to harm.
                </p>
              </section>

              {/* Section 1 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">1</span>
                  <h2 className="section-title h2">What Kalesh Is For</h2>
                </div>
                <div className="section-content">
                  <p>Kalesh is built for:</p>
                  <ul>
                    <li>Sharing honest opinions through polls</li>
                    <li>Voting freely without judgment</li>
                    <li>Anonymous discussions that respect others</li>
                    <li>Expressing thoughts you wouldn't feel safe sharing elsewhere</li>
                  </ul>
                  <p>We encourage <strong>bold ideas, diverse views, and real conversations.</strong></p>
                </div>
              </article>

              {/* Section 2 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">2</span>
                  <h2 className="section-title h2">Be Respectful (Even When You Disagree)</h2>
                </div>
                <div className="section-content">
                  <p>You can disagree strongly — that's okay.</p>
                  <p>But you <strong>must not</strong>:</p>
                  <ul>
                    <li>Harass, insult, or threaten others</li>
                    <li>Use hate speech or slurs</li>
                    <li>Target people or groups based on religion, caste, gender, sexuality, race, disability, or nationality</li>
                  </ul>
                  <div className="glass-note">
                    <p><strong>Debate ideas, not people.</strong></p>
                  </div>
                </div>
              </article>

              {/* Section 3 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">3</span>
                  <h2 className="section-title h2">No Harassment or Bullying</h2>
                </div>
                <div className="section-content">
                  <p>Harassment ruins anonymity for everyone.</p>
                  <p>Do <strong>not</strong>:</p>
                  <ul>
                    <li>Repeatedly attack or mock someone</li>
                    <li>Encourage others to gang up on a user</li>
                    <li>Shame, intimidate, or humiliate others</li>
                    <li>Use polls or chats to target individuals</li>
                  </ul>
                  <div className="glass-note">
                    <p>If it feels like bullying — it probably is.</p>
                  </div>
                </div>
              </article>

              {/* Section 4 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">4</span>
                  <h2 className="section-title h2">No Illegal or Dangerous Content</h2>
                </div>
                <div className="section-content">
                  <p>For everyone's safety, the following are <strong>not allowed</strong>:</p>
                  <ul>
                    <li>Violence, threats, or encouragement of harm</li>
                    <li>Content involving sexual exploitation of minors</li>
                    <li>Promotion of self-harm or suicide</li>
                    <li>Drugs, weapons, or criminal activities</li>
                    <li>Extremism or terrorism</li>
                  </ul>
                  <div className="glass-note" style={{ borderColor: '#ff9999', backgroundColor: 'rgba(255, 106, 0, 0.1)' }}>
                    <p style={{ color: '#ffcc99', fontWeight: 'bold' }}>
                      Such content may lead to <strong>immediate account termination</strong> and legal action if required.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 5 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">5</span>
                  <h2 className="section-title h2">Protect Privacy — Yours & Others'</h2>
                </div>
                <div className="section-content">
                  <p>Kalesh is anonymous by design.</p>
                  <p>Do <strong>not</strong>:</p>
                  <ul>
                    <li>Share your phone number, address, or personal details</li>
                    <li>Share someone else's private information</li>
                    <li>Try to reveal or guess another user's identity</li>
                    <li>Post screenshots or personal data from outside the app</li>
                  </ul>
                  <div className="glass-note">
                    <p>Respect privacy the way you want yours respected.</p>
                  </div>
                </div>
              </article>

              {/* Section 6 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">6</span>
                  <h2 className="section-title h2">No Spam or Manipulation</h2>
                </div>
                <div className="section-content">
                  <p>Please don't:</p>
                  <ul>
                    <li>Post the same poll or message repeatedly</li>
                    <li>Use bots, scripts, or fake engagement</li>
                    <li>Create multiple accounts to manipulate results</li>
                    <li>Post scams, misleading links, or promotions</li>
                  </ul>
                  <p>Kalesh is about <strong>real opinions</strong>, not fake reach.</p>
                </div>
              </article>

              {/* Section 7 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">7</span>
                  <h2 className="section-title h2">Sensitive & NSFW Content</h2>
                </div>
                <div className="section-content">
                  <p>We understand real conversations can involve sensitive topics.</p>
                  <p>However:</p>
                  <ul>
                    <li>Sexual content must not be explicit</li>
                    <li>Content involving minors is strictly forbidden</li>
                    <li>Graphic or disturbing content may be removed</li>
                  </ul>
                  <p>We aim to keep Kalesh <strong>safe for a broad Gen-Z audience</strong>.</p>
                </div>
              </article>

              {/* Section 8 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">8</span>
                  <h2 className="section-title h2">Use Reporting — Don't Fight Back</h2>
                </div>
                <div className="section-content">
                  <p>If you see something that breaks these guidelines:</p>
                  <ul>
                    <li>Use the <strong>Report</strong> feature</li>
                    <li>Block the user if needed</li>
                  </ul>
                  <div className="glass-note">
                    <p>Do not retaliate or escalate — our moderation team will handle it.</p>
                  </div>
                </div>
              </article>

              {/* Section 9 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">9</span>
                  <h2 className="section-title h2">Moderation & Enforcement</h2>
                </div>
                <div className="section-content">
                  <p>To keep Kalesh safe:</p>
                  <ul>
                    <li>Content may be reviewed by automated systems or moderators</li>
                    <li>Violations can result in:
                      <ul>
                        <li>Content removal</li>
                        <li>Temporary restrictions</li>
                        <li>Permanent account bans</li>
                      </ul>
                    </li>
                  </ul>
                  <div className="glass-note">
                    <p>Severe or repeated violations may lead to <strong>immediate removal</strong>.</p>
                  </div>
                </div>
              </article>

              {/* Section 10 - Golden Rule */}
              <article className="glass-section-card" style={{ borderLeft: '4px solid #ffcc00' }}>
                <div className="section-header">
                  <span 
                    className="section-number" 
                    aria-hidden="true"
                    style={{ background: 'linear-gradient(135deg, #ffcc00, #ffdd55)' }}
                  >
                    10
                  </span>
                  <h2 className="section-title h2" style={{ color: '#ffcc00' }}>One Simple Rule to Remember</h2>
                </div>
                <div className="section-content">
                  <div 
                    style={{
                      backgroundColor: 'rgba(255, 204, 0, 0.1)',
                      border: '1px solid rgba(255, 204, 0, 0.3)',
                      borderRadius: '12px',
                      padding: '2rem',
                      textAlign: 'center',
                      margin: '1.5rem 0'
                    }}
                    role="note"
                  >
                    <p style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: '#ffcc99',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      If you wouldn't say it face-to-face respectfully, don't say it here — even anonymously.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 11 */}
              <article className="glass-section-card">
                <div className="section-header">
                  <span className="section-number" aria-hidden="true">11</span>
                  <h2 className="section-title h2">Why These Rules Exist</h2>
                </div>
                <div className="section-content">
                  <p>Kalesh only works when:</p>
                  <ul>
                    <li>People feel safe sharing honestly</li>
                    <li>Anonymity is not abused</li>
                    <li>Opinions don't turn into attacks</li>
                  </ul>
                  <p>These rules protect your freedom to speak and everyone's right to feel safe.</p>
                </div>
              </article>

              {/* Final Note */}
              <section className="glass-final-note">
                <h3 className="h3 mb-4">Final Note <span aria-label="orange square emoji" role="img">🟧</span></h3>
                <p className="mb-3" style={{ fontSize: '1.2rem' }}>
                  Kalesh is not about being loud. It's about being real.
                </p>
                <div className="glass-commitments" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                  <div className="commitment-item">
                    <div className="commitment-icon" aria-label="speaking head emoji" role="img">🗣️</div>
                    <p>Speak freely</p>
                  </div>
                  <div className="commitment-item">
                    <div className="commitment-icon" aria-label="ear emoji" role="img">👂</div>
                    <p>Listen openly</p>
                  </div>
                  <div className="commitment-item">
                    <div className="commitment-icon" aria-label="construction emoji" role="img">🚧</div>
                    <p>Respect boundaries</p>
                  </div>
                </div>
                <p style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#ffcc99',
                  marginTop: '2rem'
                }}>
                  Welcome to the Kalesh community.
                </p>
              </section>

              {/* Community Commitments */}
              <aside className="glass-section-card" style={{ marginTop: '4rem' }}>
                <div className="section-header">
                  <span className="section-number" aria-label="light bulb emoji" role="img">💡</span>
                  <h2 className="section-title h2">Community Commitments</h2>
                </div>
                <div className="section-content">
                  <p>Together, we commit to:</p>
                  <div className="glass-commitments">
                    <div className="commitment-item">
                      <div className="commitment-icon" aria-label="shushing face emoji" role="img">🤫</div>
                      <p>Protect Anonymity</p>
                    </div>
                    <div className="commitment-item">
                      <div className="commitment-icon" aria-label="red heart emoji" role="img">❤️</div>
                      <p>Show Respect</p>
                    </div>
                    <div className="commitment-item">
                      <div className="commitment-icon" aria-label="shield emoji" role="img">🛡️</div>
                      <p>Ensure Safety</p>
                    </div>
                    <div className="commitment-item">
                      <div className="commitment-icon" aria-label="magnifying glass emoji" role="img">🔍</div>
                      <p>Report Issues</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityGuidelines;