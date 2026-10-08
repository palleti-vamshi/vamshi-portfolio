import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Button from '../../components/Button/Button';
import SystemStatus from '../../components/SystemStatus/SystemStatus';
import { profile } from '../../data/profile';
import './Contact.css';

export default function Contact({ onOpenResume }) {
  return (
    <footer id="contact" className="contact-section">
      <div className="container">
        <SectionHeader
          number="09"
          kicker="COMMUNICATION"
          title="GET IN TOUCH"
          description="Open for academic collaboration, research discussions, open-source work, and competitive programming exchanges."
        />

        <div className="contact-grid">
          {/* Main Inquiry Card */}
          <div className="contact-card contact-card--main">
            <span className="contact-card__label">COLLABORATION & RESEARCH</span>
            <h3 className="contact-card__heading">Let's discuss systems, algorithms, or AI architectures.</h3>
            <p className="contact-card__text">
              Whether you are working on interesting machine learning problems, competitive programming challenges, or backend engineering systems, feel free to reach out.
            </p>

            <div className="contact-actions">
              <Button
                variant="primary"
                size="md"
                href={`mailto:${profile.socials.email}?subject=Portfolio Inquiry - Palleti Vamshi`}
              >
                Send Direct Email
                <span aria-hidden="true">→</span>
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={onOpenResume}
              >
                View Profile Credentials
              </Button>
            </div>
          </div>

          {/* Channels & Location */}
          <div className="contact-details">
            <div className="contact-detail-item">
              <span className="contact-detail-title">EMAIL</span>
              <a
                href={`mailto:${profile.socials.email}`}
                className="contact-detail-link"
              >
                {profile.socials.email}
              </a>
              <span className="contact-detail-note">Primary direct communication</span>
            </div>

            <div className="contact-detail-item">
              <span className="contact-detail-title">GITHUB</span>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-link"
              >
                github.com/palleti-vamshi
                <span aria-hidden="true">↗</span>
              </a>
              <span className="contact-detail-note">Code repositories & technical prototypes</span>
            </div>

            <div className="contact-detail-item">
              <span className="contact-detail-title">LINKEDIN</span>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-link"
              >
                linkedin.com/in/vamshi-palleti-466001344
                <span aria-hidden="true">↗</span>
              </a>
              <span className="contact-detail-note">Professional profile & network</span>
            </div>

            <div className="contact-detail-item">
              <span className="contact-detail-title">LOCATION & CAMPUS</span>
              <div className="contact-detail-val">
                {profile.college}
              </div>
              <span className="contact-detail-note">{profile.location}</span>
            </div>
          </div>
        </div>

        {/* System Diagnostic Status & Footer Bottom */}
        <div className="contact-system-status">
          <div className="contact-system-status__title">PHASE ARCHITECTURE HEALTH</div>
          <SystemStatus />
        </div>

        <div className="contact-footer-bottom">
          <div className="contact-copyright">
            © {new Date().getFullYear()} Palleti Vamshi. Engineered with React, Node.js & Vite.
          </div>
          <div className="contact-phase-tag">
            PHASE 2: PREMIUM DESIGN SYSTEM
          </div>
        </div>
      </div>
    </footer>
  );
}
