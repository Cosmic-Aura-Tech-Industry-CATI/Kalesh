import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AuthService } from "../services/auth.service";
import "../styles/components/navbar.css";

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isVisibleRef = useRef(true);
  const mobileMenuOpenRef = useRef(false);
  const prevScrollY = useRef(0);
  const rafId = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Single source of truth for the document/window scroll position
  const getScrollTop = () => {
    if (typeof document !== "undefined" && document.scrollingElement) {
      return Math.max(0, document.scrollingElement.scrollTop);
    }
    if (typeof window !== "undefined") {
      return Math.max(0, window.scrollY || window.pageYOffset || 0);
    }
    return 0;
  };

  // Helper to update visibility state only when it actually changes
  const updateVisibility = (nextVisible) => {
    if (isVisibleRef.current !== nextVisible) {
      isVisibleRef.current = nextVisible;
      setIsVisible(nextVisible);
    }
  };

  // Synchronize mobileMenuOpenRef with state
  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  // Close mobile menu and ensure navbar is visible on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    mobileMenuOpenRef.current = false;
    updateVisibility(true);
    prevScrollY.current = getScrollTop();
  }, [location.pathname]);

  // Robust & Stable Scroll-direction detection using requestAnimationFrame
  // 1. SCROLL DOWN (diff > 0) -> HIDE navbar (unless mobile menu is open)
  // 2. SCROLL UP (diff < 0) -> SHOW navbar
  // 3. TOP OF PAGE (current <= 20) -> ALWAYS SHOW navbar
  useEffect(() => {
    const scrollThreshold = 8;

    // Initialize baseline on mount
    prevScrollY.current = getScrollTop();

    const handleScroll = () => {
      // Throttle with requestAnimationFrame: skip if a frame is already queued
      if (rafId.current !== null) return;

      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null;
        const current = getScrollTop();

        // 1. TOP OF PAGE (<= 20px): Force visible
        if (current <= 20) {
          updateVisibility(true);
          prevScrollY.current = Math.max(0, current);
          return;
        }

        const diff = current - prevScrollY.current;

        // 2. Only trigger state changes if accumulated movement exceeds threshold
        if (Math.abs(diff) >= scrollThreshold) {
          if (diff > 0) {
            // USER IS SCROLLING DOWN -> HIDE NAVBAR (unless mobile menu is open)
            if (!mobileMenuOpenRef.current) {
              updateVisibility(false);
            }
          } else {
            // USER IS SCROLLING UP -> SHOW NAVBAR
            updateVisibility(true);
          }
          // Update baseline after threshold is reached
          prevScrollY.current = current;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []); // Stable effect: created once, never re-registered on mobileMenuOpen toggles

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpenRef.current) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setMobileMenuOpen(false);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (AuthService.isAuthenticated()) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Team", to: "/team" },
    { label: "Privacy", to: "/privacy" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
  ];

  return (
    <header
      className={`kalesh-floating-nav-wrapper ${
        isVisible ? "nav-visible" : "nav-hidden"
      }`}
    >
      <nav className="kalesh-floating-pill" aria-label="Main Navigation">
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="kalesh-pill-brand"
          onClick={handleLinkClick}
          aria-label="Kalesh Home"
        >
          <img
            src="/images/kalesh_navbar_logo.webp"
            alt="Kalesh Logo"
            className="kalesh-pill-logo"
          />
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="kalesh-pill-links">
          {navItems.map((item) => (
            <li key={item.to} className="kalesh-pill-item">
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `kalesh-pill-link ${isActive ? "active" : ""}`
                }
                onClick={handleLinkClick}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Admin Login Button */}
        <div className="kalesh-pill-actions">
          <button
            type="button"
            onClick={handleAdminLogin}
            className="kalesh-pill-admin-btn"
          >
            Admin Login
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className={`kalesh-pill-toggler ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="toggler-bar"></span>
          <span className="toggler-bar"></span>
          <span className="toggler-bar"></span>
        </button>
      </nav>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="kalesh-mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Dropdown Drawer */}
      <div
        className={`kalesh-mobile-drawer ${mobileMenuOpen ? "open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="kalesh-mobile-drawer-inner">
          <div className="kalesh-mobile-header">
            <NavLink
              to="/"
              className="kalesh-mobile-brand"
              onClick={handleLinkClick}
            >
              <img
                src="/images/kalesh_navbar_logo.webp"
                alt="Kalesh Logo"
                className="kalesh-mobile-logo"
              />
            </NavLink>

            <button
              type="button"
              className="kalesh-mobile-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          <ul className="kalesh-mobile-links">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `kalesh-mobile-link ${isActive ? "active" : ""}`
                  }
                  onClick={handleLinkClick}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="kalesh-mobile-footer">
            <button
              type="button"
              onClick={handleAdminLogin}
              className="kalesh-mobile-admin-btn"
            >
              Admin Login
            </button>
            <p className="kalesh-mobile-copy">© 2026 Kalesh</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
