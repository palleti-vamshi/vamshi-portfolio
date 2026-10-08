import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import { profile } from '../../data/profile';
import './Hero.css';

export default function Hero({ onOpenResume }) {
  const { hero } = profile;

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Editorial Sub-header & Section Kicker */}
        <div className="hero-kicker">
          <span className="hero-kicker__tag">{hero.kicker}</span>
          <span className="hero-kicker__location">{profile.location}</span>
        </div>

        {/* Name Identity */}
        <div className="hero-identity">
          <span className="hero-name-label">PALLETI VAMSHI</span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline">{hero.headline}</h1>

        {/* Supporting Copy */}
        <p className="hero-copy">{hero.supportingCopy}</p>

        {/* Call to Actions */}
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
            onClick={onOpenResume}
            className="hero-cta-secondary"
          >
            Resume
          </Button>
        </div>

        {/* Currently Exploring Grid */}
        <div className="hero-exploring">
          <div className="hero-exploring__header">
            <span className="hero-exploring__title">CURRENTLY EXPLORING</span>
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
