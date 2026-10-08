import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import { profile } from '../../data/profile';
import './ProjectsPreview.css';

export default function ProjectsPreview() {
  const { projects } = profile;

  return (
    <section id="work" className="section-wrapper projects-section">
      <div className="container">
        <SectionHeader
          number="04"
          kicker="PORTFOLIO"
          title="SELECTED WORK"
          description="Verified systems and prototypes under active research and development. Detailed case studies will be expanded in Phase 3."
        />

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <article key={project.id} className="project-card">
              <div className="project-card__header">
                <div className="project-card__meta">
                  <span className="project-card__num">PROJECT 0{idx + 1}</span>
                  <Badge variant="accent" size="sm">
                    {project.status}
                  </Badge>
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__subtitle">{project.subtitle}</p>
              </div>

              <div className="project-card__body">
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__highlights">
                  <span className="project-highlights__title">ARCHITECTURAL HIGHLIGHTS</span>
                  <ul className="project-highlights__list">
                    {project.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="project-highlights__item">
                        <span className="project-highlights__bullet">›</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="project-card__footer">
                <div className="project-domains">
                  {project.domains.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="project-actions">
                  <Button
                    variant="outline"
                    size="sm"
                    href={project.githubUrl}
                    target="_blank"
                    className="project-btn"
                  >
                    View Repository
                    <span aria-hidden="true">↗</span>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-notice">
          <span className="projects-notice__icon">ℹ</span>
          <p className="projects-notice__text">
            All presented systems reflect verified projects. Metrics, benchmarks, and interactive architecture traces will be documented under Phase 3 case studies.
          </p>
        </div>
      </div>
    </section>
  );
}
