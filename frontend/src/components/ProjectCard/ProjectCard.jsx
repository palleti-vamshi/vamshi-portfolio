import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import './ProjectCard.css';

export default function ProjectCard({ project, onOpenCaseStudy }) {
  // Extract a concise set of top tech badges from project.technologies
  const topTechnologies = Object.values(project.technologies || {})
    .flat()
    .slice(0, 4);

  return (
    <article className="project-card" aria-labelledby={`proj-title-${project.id}`}>
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
