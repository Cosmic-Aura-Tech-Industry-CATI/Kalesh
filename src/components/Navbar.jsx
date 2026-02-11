import { Link } from "react-router-dom";
import { useRef } from "react";
import { Collapse } from "bootstrap";

function Navbar() {
  const menuRef = useRef(null);

  const handleLinkClick = () => {
    if (menuRef.current) {
      const collapse = new Collapse(menuRef.current, {
        hide: true
      });
      collapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top">
      <Link className="navbar-brand d-flex align-items-center mx-4" to="/">
        <img src="/images/kalesh_navbar_logo.webp" alt="logo" height="45" className="me-2" />
        
      </Link>

      <button
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="menu" ref={menuRef}>
        {/* Close Button */}
        <button
          className="mobile-menu-close"
          onClick={handleLinkClick}
          aria-label="Close menu"
        >
          <i className="fas fa-times"></i>
        </button>
        
        {/* Mobile Menu Logo */}
        <div className="mobile-menu-logo d-lg-none">
          <img src="/images/kalesh_navbar_logo.webp" alt="Kalesh Logo" height="50" />
        </div>
        
        <ul className="navbar-nav ms-auto gap-1 mx-4">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/privacy" onClick={handleLinkClick}>
              Privacy
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blog" onClick={handleLinkClick}>
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/faq" onClick={handleLinkClick}>
              FAQ
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/careers" onClick={handleLinkClick}>
              Careers
            </Link>
          </li>
        </ul>
        
        {/* Mobile Menu Copyright */}
        <div className="mobile-menu-copyright d-lg-none">
          © 2026 Kalesh
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
