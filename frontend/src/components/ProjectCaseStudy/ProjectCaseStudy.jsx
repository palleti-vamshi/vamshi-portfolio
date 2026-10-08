import { useEffect, useRef } from 'react';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import ProjectArchitecture from './ProjectArchitecture';
import ProjectWorkflow from './ProjectWorkflow';
import ProjectTechStack from './ProjectTechStack';
import './ProjectCaseStudy.css';

export default function ProjectCaseStudy({ project, isOpen, onClose }) {
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

  if (!isOpen || !project) return null;

  return (
    <div
      className="case-study-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="case-study-container"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {/* Sticky Header */}
        <div className="case-study-header">
          <div className="case-study-header__info">
            <div className="case-study-header__meta">
              <span className="case-study-header__num">PROJECT {project.number}</span>
              <span className="case-study-header__divider">/</span>
              <span className="case-study-header__cat">{project.category}</span>
              {project.evolutionBadge && (
                <>
                  <span className="case-study-header__divider">/</span>
                  <span className="case-study-header__evolution">{project.evolutionBadge}</span>
                </>
              )}
            </div>
            <h2 id="case-study-title" className="case-study-header__title">
              {project.title}
            </h2>
            <p className="case-study-header__subtitle">{project.subtitle}</p>
          </div>

          <div className="case-study-header__actions">
            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                href={project.githubUrl}
                target="_blank"
                className="case-study-gh-btn"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                GitHub Repo
                <span aria-hidden="true">↗</span>
              </Button>
            )}

            <button
              type="button"
              className="case-study-close-btn"
              onClick={onClose}
              aria-label="Close Case Study"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Case Study Body */}
        <div className="case-study-body">
          {/* 01. OVERVIEW */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">01</span>
              <h3 className="cs-section__title">OVERVIEW</h3>
            </div>
            <p className="cs-section__text">{project.description}</p>
          </section>

          {/* 02. THE PROBLEM */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">02</span>
              <h3 className="cs-section__title">THE PROBLEM</h3>
            </div>
            <p className="cs-section__text">{project.problem || 'Details will be added.'}</p>
          </section>

          {/* 03. THE APPROACH */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">03</span>
              <h3 className="cs-section__title">THE APPROACH</h3>
            </div>
            <p className="cs-section__text">{project.approach || 'Details will be added.'}</p>
          </section>

          {/* 04. SYSTEM / ARCHITECTURE */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">04</span>
              <h3 className="cs-section__title">SYSTEM / ARCHITECTURE</h3>
            </div>
            <ProjectArchitecture architecture={project.architecture} />
          </section>

          {/* 05. WORKFLOW / ACTIVITY DIAGRAM */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">05</span>
              <h3 className="cs-section__title">WORKFLOW / ACTIVITY DIAGRAM</h3>
            </div>
            <ProjectWorkflow workflow={project.workflow} />
          </section>

          {/* 06. TECHNOLOGY */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">06</span>
              <h3 className="cs-section__title">TECHNOLOGY</h3>
            </div>
            <ProjectTechStack technologies={project.technologies} />
          </section>

          {/* 07. IMPLEMENTATION */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">07</span>
              <h3 className="cs-section__title">IMPLEMENTATION</h3>
            </div>
            {project.implementation && project.implementation.length > 0 ? (
              <div className="cs-impl-grid">
                {project.implementation.map((impl) => (
                  <div key={impl.name} className="cs-impl-card">
                    <h4 className="cs-impl-card__title">{impl.name}</h4>
                    <p className="cs-impl-card__desc">{impl.detail}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="cs-section__text cs-muted-notice">Implementation details will be added.</p>
            )}
          </section>

          {/* 08. PROJECT STRUCTURE */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">08</span>
              <h3 className="cs-section__title">PROJECT STRUCTURE</h3>
            </div>
            {project.projectStructure ? (
              <pre className="cs-tree-block">
                <code>{project.projectStructure}</code>
              </pre>
            ) : (
              <p className="cs-section__text cs-muted-notice">
                Project structure will be documented as the codebase files are formalized.
              </p>
            )}
          </section>

          {/* 09. CHALLENGES */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">09</span>
              <h3 className="cs-section__title">CHALLENGES</h3>
            </div>
            <p className="cs-section__text">
              {project.challenges || 'Challenges will be documented as the project evolves.'}
            </p>
          </section>

          {/* 10. LEARNINGS */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">10</span>
              <h3 className="cs-section__title">LEARNINGS</h3>
            </div>
            <p className="cs-section__text">
              {project.learnings || 'Technical learnings will be updated as iterations progress.'}
            </p>
          </section>

          {/* 11. RESULTS / OUTPUT */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">11</span>
              <h3 className="cs-section__title">RESULTS / OUTPUT</h3>
            </div>
            <div className="cs-results-box">
              <p className="cs-section__text">{project.results || 'Not documented yet'}</p>
            </div>
          </section>

          {/* 12. README PREVIEW */}
          <section className="cs-section">
            <div className="cs-section__header">
              <span className="cs-section__num">12</span>
              <h3 className="cs-section__title">README PREVIEW</h3>
            </div>
            {project.readmeSummary ? (
              <div className="cs-readme-card">
                <div className="cs-readme-meta">README.md SUMMARY</div>
                <div className="cs-readme-item">
                  <span className="cs-readme-label">PURPOSE:</span>
                  <p className="cs-readme-val">{project.readmeSummary.purpose}</p>
                </div>
                {project.readmeSummary.setup && (
                  <div className="cs-readme-item">
                    <span className="cs-readme-label">SETUP / EXECUTION:</span>
                    <pre className="cs-readme-code">
                      <code>{project.readmeSummary.setup}</code>
                    </pre>
                  </div>
                )}
                {project.readmeSummary.status && (
                  <div className="cs-readme-item">
                    <span className="cs-readme-label">CURRENT STATUS:</span>
                    <p className="cs-readme-val">{project.readmeSummary.status}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="cs-section__text cs-muted-notice">README preview will be added.</p>
            )}
          </section>

          {/* 13. LINKS */}
          <section className="cs-section cs-section--last">
            <div className="cs-section__header">
              <span className="cs-section__num">13</span>
              <h3 className="cs-section__title">LINKS</h3>
            </div>
            <div className="cs-links-row">
              {project.githubUrl ? (
                <Button
                  variant="primary"
                  size="sm"
                  href={project.githubUrl}
                  target="_blank"
                >
                  GitHub Repository ↗
                </Button>
              ) : (
                <span className="cs-link-disabled">GitHub Repository (Local / Not Public)</span>
              )}

              {project.demoUrl ? (
                <Button
                  variant="secondary"
                  size="sm"
                  href={project.demoUrl}
                  target="_blank"
                >
                  Live Demo ↗
                </Button>
              ) : (
                <span className="cs-link-disabled">Live Demo: Not deployed yet</span>
              )}

              {project.documentationUrl ? (
                <Button
                  variant="outline"
                  size="sm"
                  href={project.documentationUrl}
                  target="_blank"
                >
                  Documentation ↗
                </Button>
              ) : (
                <span className="cs-link-disabled">Documentation: In repository</span>
              )}
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="case-study-footer">
          <span className="case-study-footer__note">
            Palleti Vamshi • Engineering Case Study Archive
          </span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Case Study
          </Button>
        </div>
      </div>
    </div>
  );
}
