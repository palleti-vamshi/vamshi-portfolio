import { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import Badge from '../Badge/Badge';
import { profile } from '../../data/profile';
import { resumeData } from '../../data/resume';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="resume-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="resume-modal-box"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className="resume-modal-header">
          <div>
            <div className="resume-modal-meta">CURRICULUM VITAE // VERIFIED PROFILE</div>
            <h3 id="resume-modal-title" className="resume-modal-title">{profile.name}</h3>
          </div>
          <button
            type="button"
            className="resume-modal-close"
            onClick={onClose}
            aria-label="Close Resume Modal"
          >
            ✕
          </button>
        </div>

        <div className="resume-modal-body">
          <div className="resume-modal-summary-box">
            <p className="resume-modal-summary-text">{resumeData.summary}</p>
          </div>

          <div className="resume-modal-section">
            <div className="resume-section-label">EDUCATION</div>
            <div className="resume-edu-list">
              {profile.education.map((edu) => (
                <div key={edu.institution} className="resume-edu-card">
                  <div className="resume-edu-card-top">
                    <span className="resume-edu-degree">{edu.institution}</span>
                    <span className="resume-edu-score">{edu.score}</span>
                  </div>
                  <div className="resume-edu-inst">{edu.degree}</div>
                  {edu.timeline && (
                    <div className="resume-edu-standing">{edu.timeline}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="resume-modal-section">
            <div className="resume-section-label">ACHIEVEMENTS</div>
            <div className="resume-achieve-list">
              {profile.achievements.map((ach) => (
                <div key={ach.title} className="resume-achieve-card">
                  <span className="resume-achieve-title">🏆 {ach.title}</span>
                  <span className="resume-achieve-rank">{ach.rank}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="resume-modal-section">
            <div className="resume-section-label">TECHNICAL SKILLS</div>
            <div className="resume-skills-grid">
              <div>
                <span className="resume-sublabel">Languages:</span> {resumeData.skills.programming.join(', ')}
              </div>
              <div>
                <span className="resume-sublabel">AI / ML:</span> {resumeData.skills.aiMl.join(', ')}
              </div>
              <div>
                <span className="resume-sublabel">Backend:</span> {resumeData.skills.backend.join(', ')}
              </div>
              <div>
                <span className="resume-sublabel">Databases:</span> {resumeData.skills.databases.join(', ')}
              </div>
              <div>
                <span className="resume-sublabel">Tools & Protocols:</span> {resumeData.skills.toolsProtocols.join(', ')}
              </div>
            </div>
          </div>

          <div className="resume-modal-section">
            <div className="resume-section-label">FEATURED PROJECTS</div>
            <div className="resume-projects-list">
              {resumeData.projects.map((proj) => (
                <div key={proj.id} className="resume-project-item">
                  <div className="resume-project-name">
                    <span>{proj.title}</span>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-project-link"
                      >
                        Code ↗
                      </a>
                    )}
                  </div>
                  <div className="resume-project-tech">{proj.tech}</div>
                  <ul className="resume-project-bullets">
                    {proj.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="resume-modal-section">
            <div className="resume-section-label">LEADERSHIP & INVOLVEMENT</div>
            <div className="resume-leadership-card">
              <div className="resume-leadership-top">
                <span className="resume-leadership-role">AWS Student Builder Group</span>
                <span className="resume-leadership-tag">Volunteer</span>
              </div>
              <p className="resume-leadership-desc">
                Volunteer in Tech & Innovation — participating in technical exploration, cloud architectures, and peer knowledge sharing.
              </p>
            </div>
          </div>

          <div className="resume-modal-notice">
            <div className="resume-notice-title">Official 2-Page Resume Available</div>
            <p className="resume-notice-text">
              A clean, recruiter-friendly two-page technical resume PDF with verified academic credentials, engineering projects, and coding profiles is ready for download.
            </p>
          </div>
        </div>

        <div className="resume-modal-footer">
          <Button
            variant="secondary"
            size="sm"
            href={profile.socials.github}
            target="_blank"
          >
            View GitHub Profile
          </Button>
          <Button
            variant="primary"
            size="sm"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF Resume ↗
          </Button>
        </div>
      </div>
    </div>
  );
}
