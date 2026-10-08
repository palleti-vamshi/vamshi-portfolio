import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import { profile } from '../../data/profile';
import './Hero.css';

export default function Hero({ onOpenResume, onOpenChat }) {
  const { hero } = profile;

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Editorial Sub-header & Section Kicker */}
        <div className="hero-kicker">
          <div className="hero-kicker__left">
            <span className="hero-kicker__tag">[00 // PROLOGUE]</span>
            <span className="hero-kicker__role">AI/ML UNDERGRADUATE</span>
          </div>
          <div className="hero-kicker__right">
            <span className="hero-kicker__status-dot"></span>
            <span className="hero-kicker__location">{profile.location} · VNR VJIET</span>
          </div>
        </div>

        {/* Main Editorial Asymmetric Grid */}
        <div className="hero-main-grid">
          {/* Left Column: Typography & Identity */}
          <div className="hero-text-col">
            <div className="hero-identity">
              <span className="hero-name-label">PALLETI VAMSHI</span>
              <span className="hero-identity-divider">/</span>
              <span className="hero-identity-sub">CSE (AIML) · 2025–2029</span>
            </div>

            <h1 className="hero-headline">
              AI/ML Student <span className="hero-headline-dim">·</span> Problem Solver <span className="hero-headline-dim">·</span> Emerging Tech Explorer
            </h1>

            <div className="hero-quote-badge">
              <span className="hero-quote-mark">“</span>
              <span className="hero-quote-text">I BUILD TO UNDERSTAND.</span>
              <span className="hero-quote-mark">”</span>
            </div>

            <p className="hero-copy">
              Second-year undergraduate at VNR VJIET, Hyderabad (CGPA 9.9/10). Engineering practical, explainable intelligent systems, industrial anomaly detection architectures, and robust web applications from first principles.
            </p>

            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                href="#work"
                className="hero-cta-primary"
              >
                View My Work
                <span aria-hidden="true">→</span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-secondary"
              >
                Verified Resume ↗
              </Button>

              {onOpenChat && (
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="hero-cta-ai"
                  aria-label="Open Vamshi AI Assistant"
                >
                  <span className="hero-ai-sparkle">✦</span>
                  <span>Ask Vamshi AI</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Verified Authentic Portrait Card */}
          <div className="hero-visual-col">
            <div className="hero-portrait-frame">
              {/* Corner crosshairs for technical precision aesthetic */}
              <div className="frame-corner frame-corner--tl">+</div>
              <div className="frame-corner frame-corner--tr">+</div>
              <div className="frame-corner frame-corner--bl">+</div>
              <div className="frame-corner frame-corner--br">+</div>

              <div className="hero-image-wrapper">
                <img
                  src="/images/vamshi-portrait.jpg"
                  alt="Palleti Vamshi — AI/ML Student at VNR VJIET"
                  className="hero-portrait-img"
                  loading="eager"
                />
                <div className="hero-image-gradient-overlay"></div>
              </div>

              {/* Floating Verified Student Metadata Strip */}
              <div className="hero-portrait-meta">
                <div className="hero-portrait-meta-top">
                  <div className="hero-portrait-avatar-chip">
                    <img
                      src="/images/vamshi-avatar.jpg"
                      alt="Vamshi"
                      className="hero-avatar-tiny"
                    />
                    <span className="hero-portrait-name">Palleti Vamshi</span>
                  </div>
                  <Badge variant="accent" size="sm">VERIFIED</Badge>
                </div>
                <div className="hero-portrait-meta-sub">
                  <span>VNR VJIET · B.Tech AIML</span>
                  <span className="hero-portrait-divider">|</span>
                  <span className="hero-portrait-cgpa">CGPA 9.9 / 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Currently Exploring Grid */}
        <div className="hero-exploring">
          <div className="hero-exploring__header">
            <span className="hero-exploring__title">CURRENT CORE FOCUS</span>
            <span className="hero-exploring__line"></span>
          </div>

          <div className="hero-exploring__grid">
            {hero.currentlyExploring.map((item, idx) => (
              <div key={item.label} className="hero-exploring__card">
                <div className="hero-exploring__meta">
                  <span className="hero-exploring__num">0{idx + 1}</span>
                  <Badge variant="muted" size="sm">ACTIVE</Badge>
                </div>
                <h2 className="hero-exploring__label">{item.label}</h2>
                <p className="hero-exploring__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
