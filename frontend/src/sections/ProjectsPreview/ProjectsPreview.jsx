import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectCaseStudy from '../../components/ProjectCaseStudy/ProjectCaseStudy';
import { projects } from '../../data/projects';
import './ProjectsPreview.css';

export default function ProjectsPreview() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  const handleOpenCaseStudy = (project) => {
    setActiveCaseStudy(project);
  };

  const handleCloseCaseStudy = () => {
    setActiveCaseStudy(null);
  };

  return (
    <section id="work" className="section-wrapper projects-section">
      <div className="container">
        <SectionHeader
          number="04"
          kicker="TECHNICAL CASE STUDIES"
          title="ENGINEERING PROJECTS"
          description="Verified systems, industrial IoT prototypes, and backend architectures. Select any project to inspect the full technical case study, dataflow diagrams, and implementation details."
        />

        {/* Compact, Clean Project Cards Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={handleOpenCaseStudy}
            />
          ))}
        </div>

        {/* Informational Guidance Notice */}
        <div className="projects-notice">
          <span className="projects-notice__icon">ℹ</span>
          <p className="projects-notice__text">
            All documented architectures and workflows reflect verified project components. Benchmarks, unverified deployment metrics, and speculative performance claims are intentionally omitted.
          </p>
        </div>
      </div>

      {/* Comprehensive Case Study Drawer / Modal */}
      <ProjectCaseStudy
        project={activeCaseStudy}
        isOpen={Boolean(activeCaseStudy)}
        onClose={handleCloseCaseStudy}
      />
    </section>
  );
}
