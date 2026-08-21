import { Link } from "react-router-dom";
import "../styles/components/footer.css";

function Footer() {
  return (
    <footer className="kalesh-footer">
      {/* ===== TOP FOOTER ===== */}
      <div className="container-fluid px-0 py-5">
        <div className="row align-items-start gy-4">
          {/* ===== COLUMN 1 : LOGO + CTA ===== */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="footer-brand-wrap">
              <img
                src="/images/footer-logo-200.webp"
                srcSet="
                  /images/footer-logo-200.webp 200w,
                  /images/footer-logo-400.webp 400w
                "
                sizes="(max-width: 768px) 160px, 200px"
                width="200"
                height="60"
                alt="Kalesh Logo"
                loading="lazy"
                decoding="async"
              />
              <button className="coming-soon-btn">Coming Soon</button>
            </div>
          </div>

          {/* ===== COLUMN 2 : WHAT WE DO ===== */}
          <div className="col-12 col-md-6 col-xl-3">
            <h5 className="footer-title">What We Do</h5>
            <ul className="footer-list">
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/communityguidelines">Community Guidelines</Link>
              </li>
              <li>
                <Link to="/promotions">Promotions</Link>
              </li>
            </ul>
          </div>

          {/* ===== COLUMN 3 : WHO WE ARE ===== */}
          <div className="col-12 col-md-6 col-xl-3">
            <h5 className="footer-title">Who We Are</h5>
            <ul className="footer-list">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/privacypolicy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* ===== COLUMN 4 : NEED HELP ===== */}
          <div className="col-12 col-md-6 col-xl-3">
            <h5 className="footer-title">Need Help</h5>
            <ul className="footer-list">
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="/helpcenter">Help Center</Link>
              </li>
              <li>
                <Link to="/securityadvisory">Security Advisory</Link>
              </li>
              <li>
                <Link to="/termsandconditions">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-top">
            {/* Copyright */}
            <div className="footer-copyright">
              © 2026 Kalesh. All Rights Reserved.
            </div>

            {/* Social Icons */}
            <div className="footer-bottom-social">
              <a href="https://x.com/KaleshThe76740" target="_blank" rel="noopener noreferrer" aria-label="Kalesh on X">
                <i className="fa-brands fa-x-twitter"></i>
              </a>

              <a href="https://www.facebook.com/profile.php?id=61587629125145" target="_blank" rel="noopener noreferrer" aria-label="Kalesh on Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a href="https://www.instagram.com/thekalesh47?igsh=MTdqd3Y2aHBsOWFxMg==" target="_blank" rel="noopener noreferrer" aria-label="Kalesh on Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a href="https://www.linkedin.com/company/kalesh47/" target="_blank" rel="noopener noreferrer" aria-label="Kalesh on LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>

            {/* DIMISI Branding */}
            <div className="footer-powered">
              <span>Designed & Developed By</span>

              <a
                href="https://dimisi.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="dimisi-brand"
              >
                <img src="/images/dimisi-logo.png" alt="DIMISI" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;