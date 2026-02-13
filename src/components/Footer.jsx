import { Link } from "react-router-dom";
import "../styles/components/footer.css";


function Footer() {
  return (
    <footer className="kalesh-footer">
      {/* ===== TOP FOOTER ===== */}
      <div className="container-fluid px-0 py-5">
        <div className="row align-items-center gy-4">
          {/* ===== COLUMN 1 : LOGO + CTA ===== */}
          <div className="col-3">
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
          <div className="col-3">
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
          <div className="col-3">
            <h5 className="footer-title">Who We Are</h5>
            <ul className="footer-list">
              <li>
                <Link to="/about">About Us</Link>
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
          <div className="col-3">
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
            </ul>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="footer-bottom py-3">
        <div className="container">
          <div className="row align-items-center gy-2">
            {/* COPYRIGHT */}
            <div className="col-12 col-md-4 text-center text-md-start">
              © 2026 Kalesh
            </div>

            {/* TERMS */}
            <div className="col-12 col-md-4 text-center">
              <Link to="/termsandconditions">Terms &amp; Conditions</Link>
            </div>

            {/* SOCIAL ICONS */}
            <div className="col-12 col-md-4 text-center text-md-end footer-socials">
              <a href="https://x.com/KaleshThe76740" aria-label="X (Twitter)">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61587629125145" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/thekalesh47?igsh=MTdqd3Y2aHBsOWFxMg==" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/kalesh47/" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
