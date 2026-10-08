import { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import Badge from '../Badge/Badge';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
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
          <div className="resume-modal-section">
            <div className="resume-section-label">EDUCATION</div>
            <div className="resume-edu-card">
              <div className="resume-edu-degree">{profile.degree}</div>
              <div className="resume-edu-inst">{profile.college}, {profile.location}</div>
              <div className="resume-edu-standing">
                Academic Standing: <span>{profile.year}</span> (Graduation: {profile.graduation}) • CGPA: <span>{profile.cgpa}</span>
              </div>
            </div>
          </div>

          <div className="resume-modal-section">
            <div className="resume-section-label">CORE FOCUS & COMPETENCIES</div>
            <div className="resume-skills-grid">
              <div>
                <span className="resume-sublabel">Languages:</span> C++, Python, JavaScript (ES6+), Java
              </div>
              <div>
                <span className="resume-sublabel">Engineering:</span> Data Structures & Algorithms, Competitive Programming
              </div>
              <div>
                <span className="resume-sublabel">AI / ML:</span> Machine Learning Foundations, Explainable AI (XAI)
              </div>
              <div>
                <span className="resume-sublabel">Web & Systems:</span> React, Node.js, Express, Spring Boot, MySQL, Git
              </div>
            </div>
          </div>

          <div className="resume-modal-section">
            <div className="resume-section-label">SELECTED PROJECTS</div>
            <div className="resume-projects-list">
              {projects.map((proj) => (
                <div key={proj.id} className="resume-project-item">
                  <div className="resume-project-name">
                    {proj.title}
                    <Badge variant="accent" size="sm" className="resume-project-status">
                      {proj.category.split('•')[0].trim()}
                    </Badge>
                  </div>
                  <p className="resume-project-desc">{proj.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="resume-modal-notice">
            <div className="resume-notice-title">Official Resume Available</div>
            <p className="resume-notice-text">
              An ATS-friendly one-page technical resume PDF has been generated from verified academic credentials, technical skills, and engineering projects.
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
