import { useState, useRef } from 'react';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import './ProjectCard.css';

export default function ProjectCard({ project, onOpenCaseStudy }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  // Top technology badges (up to 4)
  const topTechnologies = Object.values(project.technologies || {})
    .flat()
    .slice(0, 4);

  // Subtle 3D perspective tilt on hover (3-6 degrees max)
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const rotateY = normalizedX * 8;
    const rotateX = -normalizedY * 8;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 0)`,
      '--mouse-x': `${(normalizedX + 0.5) * 100}%`,
      '--mouse-y': `${(normalizedY + 0.5) * 100}%`,
      transition: 'transform 0.08s ease-out'
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
      transition: 'transform 0.4s ease-out'
    });
  };

  return (
    <article
      ref={cardRef}
      className={`project-card ${isHovered ? 'project-card--hovered' : ''}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-labelledby={`proj-title-${project.id}`}
    >
      {/* Specular Highlight Sheen */}
      <div className="project-card__sheen" aria-hidden="true"></div>

      {/* Header with Project Number & Category */}
      <div className="project-card__header">
        <div className="project-card__meta">
          <span className="project-card__num">{project.number} / PROJECT</span>
          <Badge variant="accent" size="sm">
            {project.category.split('•')[0].trim()}
          </Badge>
        </div>

        <h3 id={`proj-title-${project.id}`} className="project-card__title">
          {project.title}
        </h3>

        {project.evolutionBadge && (
          <div className="project-card__evolution">
            <span className="project-card__evolution-tag">EVOLUTION:</span>
            <span className="project-card__evolution-text">{project.evolutionBadge}</span>
          </div>
        )}

        <p className="project-card__subtitle">{project.subtitle}</p>
      </div>

      {/* Body with Description & Engineering Focus */}
      <div className="project-card__body">
        <p className="project-card__desc">{project.description}</p>

        {project.engineeringFocus && (
          <div className="project-card__focus">
            <span className="project-card__focus-label">ENGINEERING FOCUS:</span>
            <span className="project-card__focus-text">{project.engineeringFocus}</span>
          </div>
        )}

        {/* Technology Badges */}
        <div className="project-card__tech">
          {topTechnologies.map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer with Actions */}
      <div className="project-card__footer">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onOpenCaseStudy(project)}
          className="project-card__btn-casestudy"
          aria-label={`View technical case study for ${project.title}`}
        >
          View Case Study
          <span aria-hidden="true">→</span>
        </Button>

        {project.githubUrl ? (
          <Button
            variant="outline"
            size="sm"
            href={project.githubUrl}
            target="_blank"
            className="project-card__btn-gh"
            aria-label={`View GitHub repository for ${project.title}`}
          >
            GitHub
            <span aria-hidden="true">↗</span>
          </Button>
        ) : (
          <span className="project-card__no-repo" title="Repository not publicly available">
            Repo Private / Local
          </span>
        )}
      </div>
    </article>
  );
}
