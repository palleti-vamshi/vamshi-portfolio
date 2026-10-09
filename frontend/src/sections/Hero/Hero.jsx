import { useState, useRef, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import { profile } from '../../data/profile';
import './Hero.css';

export default function Hero({ onOpenResume, onOpenChat }) {
  const containerRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Subtle 3D mouse parallax on layered architectural matrix (gentle 2-4 deg tilt)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    const rotateX = -normY * 4;
    const rotateY = normX * 5;
    const translateX = normX * 6;
    const translateY = normY * 6;

    setMousePos({
      x: ((x / rect.width) * 100).toFixed(1),
      y: ((y / rect.height) * 100).toFixed(1)
    });

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(1)}px, 0)`,
      transition: 'transform 0.12s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Top Minimal Bar */}
        <div className="hero-top-bar">
          <div className="hero-top-bar__left">
            <span className="hero-status-dot"></span>
            <span className="hero-top-bar__text">Available for select collaborations · Hyderabad, Telangana, India</span>
          </div>
          <div className="hero-top-bar__right">
            <span className="hero-top-bar__academic">VNR VJIET · B.Tech AI & ML · CGPA 9.9 / 10</span>
          </div>
        </div>

        {/* Main 2-Column Hero Layout */}
        <div className="hero-grid">
          {/* Left Column: Headline Focal Point, Copy & CTAs */}
          <div className="hero-content">
            <div className="hero-kicker">
              <span className="hero-kicker__name">PALLETI VAMSHI</span>
              <span className="hero-kicker__sep">/</span>
              <span className="hero-kicker__location">HYDERABAD, INDIA</span>
            </div>

            {/* Prominent Architectural Headline */}
            <h1 className="hero-headline">
              <span className="hero-headline__line">I BUILD TO</span>
              <span className="hero-headline__accent">UNDERSTAND.</span>
            </h1>

            <div className="hero-role-tag">
              <span className="hero-role-dot"></span>
              <span className="hero-role-text">
                AI/ML Student <span className="hero-role-sep">·</span> Problem Solver <span className="hero-role-sep">·</span> Emerging Tech Explorer
              </span>
            </div>

            <p className="hero-description">
              I'm a second-year AI/ML student at VNR VJIET, Hyderabad, exploring artificial intelligence, machine learning, data structures, competitive programming, and emerging technologies through hands-on projects.
            </p>

            {/* Action Buttons with Convincing Depth Feedback */}
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
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
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
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${profile.links.email}`}
                className="hero-social-link"
                aria-label="Email Vamshi"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Layered 3D Architectural Matrix (Zero Photos) */}
          <div
            className="hero-visual-column"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="hero-3d-scene"
              style={{
                ...tiltStyle,
                '--mouse-x': `${mousePos.x}%`,
                '--mouse-y': `${mousePos.y}%`
              }}
            >
              {/* Depth Layer 3: Ambient Radial Blue Glow */}
              <div className="hero-depth-ambient" aria-hidden="true"></div>

              {/* Depth Layer 2: Secondary Glass Matrix Card (Tilted Deep) */}
              <div className="hero-matrix-card hero-matrix-card--back" aria-hidden="true">
                <div className="hero-matrix-back-header">
                  <span className="hero-matrix-code">SYSTEM_FOUNDATION // 2026</span>
                  <span className="hero-matrix-tag">VERIFIED</span>
                </div>
                <div className="hero-matrix-tech-tags">
                  <span className="hero-tech-pill">Python 3.12</span>
                  <span className="hero-tech-pill">Java 21</span>
                  <span className="hero-tech-pill">C++</span>
                  <span className="hero-tech-pill">Spring Boot</span>
                  <span className="hero-tech-pill">Express 5</span>
                  <span className="hero-tech-pill">MQTT</span>
                  <span className="hero-tech-pill">MySQL (3NF)</span>
                  <span className="hero-tech-pill">MongoDB</span>
                </div>
              </div>

              {/* Depth Layer 1: Primary Interactive Architectural Card */}
              <div className="hero-matrix-card hero-matrix-card--front">
                {/* Subtle Interactive Light Sheen */}
                <div className="hero-card-sheen" aria-hidden="true"></div>

                <div className="hero-matrix-header">
                  <div className="hero-matrix-indicator">
                    <span className="hero-matrix-dot"></span>
                    <span className="hero-matrix-title">ENGINEERING PILLARS</span>
                  </div>
                  <Badge variant="accent" size="sm">ACTIVE</Badge>
                </div>

                <div className="hero-matrix-pillars">
                  <div className="hero-pillar-item">
                    <div className="hero-pillar-meta">
                      <span className="hero-pillar-index">01</span>
                      <h3 className="hero-pillar-title">Machine Learning & Anomaly Detection</h3>
                    </div>
                    <p className="hero-pillar-desc">
                      LightX-IDS: Industrial IoT digital twin with continuous MQTT telemetry streaming and lightweight edge tree classifiers.
                    </p>
                  </div>

                  <div className="hero-pillar-item">
                    <div className="hero-pillar-meta">
                      <span className="hero-pillar-index">02</span>
                      <h3 className="hero-pillar-title">Backend Architecture & Relational Modeling</h3>
                    </div>
                    <p className="hero-pillar-desc">
                      Smart Campus Management: 16 normalized tables (3NF), JPA persistence, and Express 5 REST microservices.
                    </p>
                  </div>

                  <div className="hero-pillar-item">
                    <div className="hero-pillar-meta">
                      <span className="hero-pillar-index">03</span>
                      <h3 className="hero-pillar-title">Algorithms & Competitive Problem Solving</h3>
                    </div>
                    <p className="hero-pillar-desc">
                      Active competitive practice on LeetCode, CodeChef, and Codeforces focusing on algorithmic asymptotic bounds.
                    </p>
                  </div>
                </div>

                {/* Card Footer Metric Strip */}
                <div className="hero-matrix-footer">
                  <div className="hero-metric-cell">
                    <span className="hero-metric-val">9.9 / 10</span>
                    <span className="hero-metric-label">CGPA RECORD</span>
                  </div>
                  <div className="hero-metric-sep"></div>
                  <div className="hero-metric-cell">
                    <span className="hero-metric-val">VNR VJIET</span>
                    <span className="hero-metric-label">CAMPUS (2029)</span>
                  </div>
                  <div className="hero-metric-sep"></div>
                  <div className="hero-metric-cell">
                    <span className="hero-metric-val">4 SYSTEMS</span>
                    <span className="hero-metric-label">CASE STUDIES</span>
                  </div>
                </div>
              </div>

              {/* Floating Accent Badge (Elevation Layer) */}
              <div className="hero-floating-badge">
                <span className="hero-badge-spark">✦</span>
                <span className="hero-badge-text">FIRST-PRINCIPLES ENGINEERING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
