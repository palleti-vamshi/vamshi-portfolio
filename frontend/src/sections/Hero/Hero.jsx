import { useState, useRef } from 'react';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import { profile } from '../../data/profile';
import './Hero.css';

export default function Hero({ onOpenResume, onOpenChat }) {
  const imageFrameRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  // Subtle 3D mouse parallax on photograph (3-8px shift, 2-4deg tilt)
  const handleMouseMove = (e) => {
    if (!imageFrameRef.current) return;
    const rect = imageFrameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / (rect.height / 2)) * 4;
    const rotateY = (x / (rect.width / 2)) * 4;
    const translateX = (x / (rect.width / 2)) * 6;
    const translateY = (y / (rect.height / 2)) * 6;

    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(1)}px, 0)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Top Minimal Bar */}
        <div className="hero-top-bar">
          <div className="hero-top-bar__left">
            <span className="hero-status-dot"></span>
            <span className="hero-top-bar__text">Available for select collaborations · Hyderabad, IN</span>
          </div>
          <div className="hero-top-bar__right">
            <span className="hero-top-bar__academic">VNR VJIET · B.Tech AI & ML · CGPA 9.9</span>
          </div>
        </div>

        {/* Main 2-Column Hero Layout */}
        <div className="hero-grid">
          {/* Left Column: Identity, Typography, Copy & CTAs */}
          <div className="hero-content">
            <div className="hero-kicker">
              <span className="hero-kicker__name">PALLETI VAMSHI</span>
            </div>

            <h1 className="hero-headline">
              AI/ML Student <span className="hero-headline__separator">·</span> Problem Solver <span className="hero-headline__separator">·</span> Emerging Tech Explorer
            </h1>

            <div className="hero-quote-badge">
              <span className="hero-quote-badge__mark">“</span>
              <span className="hero-quote-badge__text">I BUILD TO UNDERSTAND.</span>
              <span className="hero-quote-badge__mark">”</span>
            </div>

            <p className="hero-description">
              I'm a second-year AI/ML student at VNR VJIET, Hyderabad, exploring artificial intelligence, machine learning, data structures, competitive programming, and emerging technologies through hands-on projects.
            </p>

            {/* Action Buttons */}
            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                href="#work"
                className="hero-btn-primary"
              >
                Explore My Work
                <span aria-hidden="true">↓</span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-resume"
              >
                View Resume ↗
              </Button>

              {onOpenChat && (
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="hero-btn-ai"
                  aria-label="Open Vamshi AI Assistant"
                >
                  <span className="hero-btn-ai__icon">✦</span>
                  <span>Ask AI Assistant</span>
                </button>
              )}
            </div>

            {/* Social Links Row */}
            <div className="hero-social-links">
              <span className="hero-social-label">CONNECT:</span>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="Vamshi's GitHub Profile"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="Vamshi's LinkedIn Profile"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${profile.links.email}`}
                className="hero-social-link"
                aria-label="Email Vamshi"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Large Professional Portrait with Subtle 3D Tilt */}
          <div className="hero-image-column">
            <div
              ref={imageFrameRef}
              className="hero-portrait-card"
              style={tiltStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Layered Accent Border Glow */}
              <div className="hero-portrait-card__glow" aria-hidden="true"></div>

              {/* Image Frame */}
              <div className="hero-portrait-frame">
                <img
                  src="/images/vamshi-portrait.jpg"
                  alt="Palleti Vamshi — AI/ML Student at VNR VJIET"
                  className="hero-portrait-img"
                  loading="eager"
                />
                <div className="hero-portrait-gradient-overlay" aria-hidden="true"></div>
              </div>

              {/* Minimal Clean Caption Strip */}
              <div className="hero-portrait-caption">
                <div className="hero-caption-left">
                  <span className="hero-caption-name">Palleti Vamshi</span>
                  <span className="hero-caption-sub">VNR VJIET · Hyderabad</span>
                </div>
                <Badge variant="accent" size="sm">CGPA 9.9</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
