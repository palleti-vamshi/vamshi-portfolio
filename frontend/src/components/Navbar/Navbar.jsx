import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './Navbar.css';

export default function Navbar({ onOpenResume }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Coding', href: '#coding' },
    { label: 'AI', href: '#ai' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ['hero', 'about', 'work', 'skills', 'coding', 'ai', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-header--scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <a href="#hero" className="navbar-brand" aria-label="Palleti Vamshi Portfolio Home">
          <span className="navbar-brand__prefix">PV //</span>
          <span className="navbar-brand__name">VAMSHI</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-desktop-nav" aria-label="Main Navigation">
          <ul className="navbar-nav-list">
            {navLinks.map((link) => {
              const targetId = link.href.substring(1);
              const isActive = activeSection === targetId;
              return (
                <li key={link.label} className="navbar-nav-item">
                  <a
                    href={link.href}
                    className={`navbar-nav-link ${isActive ? 'navbar-nav-link--active' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions / CTA */}
        <div className="navbar-actions">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenResume}
            className="navbar-resume-btn"
            aria-label="View or download resume details"
          >
            Resume
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            <span className={`toggle-icon ${mobileMenuOpen ? 'toggle-icon--open' : ''}`}>
              <span className="toggle-icon__line"></span>
              <span className="toggle-icon__line"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`navbar-mobile-drawer ${mobileMenuOpen ? 'navbar-mobile-drawer--open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container mobile-drawer-content">
          <div className="mobile-drawer-meta">NAVIGATION</div>
          <ul className="mobile-drawer-list">
            {navLinks.map((link, idx) => {
              const targetId = link.href.substring(1);
              const isActive = activeSection === targetId;
              return (
                <li key={link.label} className="mobile-drawer-item">
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`mobile-drawer-link ${isActive ? 'mobile-drawer-link--active' : ''}`}
                  >
                    <span className="mobile-drawer-num">0{idx + 1}</span>
                    <span className="mobile-drawer-text">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mobile-drawer-footer">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="mobile-resume-btn"
            >
              Resume
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
