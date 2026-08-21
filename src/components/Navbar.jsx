import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Collapse } from "bootstrap";
import { AuthService } from "../services/auth.service";
import "../styles/components/navbar.css";

function Navbar() {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (menuRef.current) {
      const collapse = Collapse.getInstance(menuRef.current);
      collapse?.hide();
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (AuthService.isAuthenticated()) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  };

  const getNavClass = ({ isActive }) =>
    isActive ? "nav-link active-link" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4 sticky-top">
      <NavLink className="navbar-brand d-flex align-items-center mx-4" to="/">
        <img
          src="/images/kalesh_navbar_logo.webp"
          alt="logo"
          height="45"
          className="me-2"
        />
      </NavLink>

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

        {/* Mobile Logo */}
        <div className="mobile-menu-logo d-lg-none">
          <img
            src="/images/kalesh_navbar_logo.webp"
            alt="Kalesh Logo"
            height="50"
          />
        </div>

        <ul className="navbar-nav ms-auto gap-3 mx-4">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={getNavClass}
              onClick={handleLinkClick}
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/about"
              className={getNavClass}
              onClick={handleLinkClick}
            >
              About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/team"
              className={getNavClass}
              onClick={handleLinkClick}
            >
              Team
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/privacy"
              className={getNavClass}
              onClick={handleLinkClick}
            >
              Privacy
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/blog"
              className={getNavClass}
              onClick={handleLinkClick}
            >
              Blog
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/careers"
              className={getNavClass}
              onClick={handleLinkClick}
            >
              Careers
            </NavLink>
          </li>
        </ul>

        <div className="navbar-login-btn-container">
          <a onClick={handleAdminLogin} className="navbar-login-btn">
            Admin Login
          </a>
        </div>

        <div className="mobile-menu-copyright d-lg-none">© 2026 Kalesh</div>
      </div>
    </nav>
  );
}

export default Navbar;
