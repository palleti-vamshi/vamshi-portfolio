import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Badge from '../../components/Badge/Badge';
import { profile } from '../../data/profile';
import './About.css';

export default function About() {
  const { about } = profile;
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);

  return (
    <section id="about" className="section-wrapper about-section">
      <div className="container">
        <SectionHeader
          number="01"
          kicker="BACKGROUND & PHILOSOPHY"
          title="ENGINEERING FROM FIRST PRINCIPLES"
          description="A grounded academic foundation focused on understanding core computation, mathematical models, and resilient system design."
        />

        <div className="about-layout">
          {/* Narrative Column */}
          <div className="about-narrative">
            <div className="about-narrative__lead">
              <span className="about-lead-kicker">PROFILE // INTENT</span>
              <h3 className="about-lead-heading">
                Learning deep systems through relentless hands-on building.
              </h3>
            </div>

            {about.bio.map((paragraph, idx) => (
              <p key={idx} className="about-paragraph">
                {paragraph}
              </p>
            ))}

            <div className="about-focus-pills">
              <span className="about-focus-title">CORE ENGINEERING PRIORITIES:</span>
              <div className="about-pills-list">
                <span className="about-pill">Algorithmic Rigor</span>
                <span className="about-pill">Explainable AI</span>
                <span className="about-pill">Decoupled Systems</span>
                <span className="about-pill">Industrial IoT Telemetry</span>
                <span className="about-pill">Clean API Boundaries</span>
              </div>
            </div>
          </div>

          {/* Academic & Verified Student Credential Spec Card */}
          <div className="about-credentials-col">
            <div className="about-id-card">
              <div className="about-id-header">
                <div className="about-id-header-left">
                  <span className="about-id-dot"></span>
                  <span className="about-id-title">VERIFIED STUDENT CREDENTIAL</span>
                </div>
                <Badge variant="success" size="sm">ACTIVE ENROLLMENT</Badge>
              </div>

              {/* ID Card Visual Preview */}
              <div
                className="about-id-preview-frame"
                onClick={() => setIsIdModalOpen(true)}
                title="Click to view full VNR VJIET Student ID"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsIdModalOpen(true)}
              >
                <img
                  src="/images/vamshi-id-card.jpg"
                  alt="Official VNR VJIET College ID Card - Palleti Vamshi (Roll No: 25071A6652)"
                  className="about-id-preview-img"
                  loading="lazy"
                />
                <div className="about-id-preview-overlay">
                  <span className="about-id-zoom-btn">
                    <span>Inspect ID Card</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>

              {/* Structured Metadata Spec Sheet */}
              <div className="about-spec-body">
                <div className="about-spec-row">
                  <span className="about-spec-label">INSTITUTION</span>
                  <span className="about-spec-value">VNR VJIET, Hyderabad</span>
                </div>
                <div className="about-spec-row">
                  <span className="about-spec-label">DEGREE</span>
                  <span className="about-spec-value">B.Tech CSE (AI & ML)</span>
                </div>
                <div className="about-spec-row">
                  <span className="about-spec-label">ROLL NO</span>
                  <span className="about-spec-value mono-accent">25071A6652</span>
                </div>
                <div className="about-spec-row">
                  <span className="about-spec-label">BATCH / STANDING</span>
                  <span className="about-spec-value">2025–2029 (2nd Year)</span>
                </div>
                <div className="about-spec-row about-spec-row--highlight">
                  <span className="about-spec-label">ACADEMIC SCORE</span>
                  <span className="about-spec-value about-spec-cgpa">CGPA 9.9 / 10.0</span>
                </div>
              </div>

              <div className="about-id-footer">
                <span className="about-id-footer-text">
                  Autonomous Institution · UGC Recognized · Hyderabad
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ID Card Expansion Modal */}
      {isIdModalOpen && (
        <div
          className="id-modal-backdrop"
          onClick={() => setIsIdModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Verified Student ID Card"
        >
          <div
            className="id-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="id-modal-header">
              <span className="id-modal-title">VNR VJIET // OFFICIAL STUDENT ID CARD</span>
              <button
                type="button"
                className="id-modal-close"
                onClick={() => setIsIdModalOpen(false)}
                aria-label="Close ID card view"
              >
                ✕
              </button>
            </div>
            <div className="id-modal-image-box">
              <img
                src="/images/vamshi-id-card.jpg"
                alt="Palleti Vamshi - VNR VJIET Student ID"
                className="id-modal-img"
              />
            </div>
            <div className="id-modal-footer">
              <span>Palleti Vamshi · Roll: 25071A6652 · CSE (AIML)</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
