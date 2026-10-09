import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { profile } from '../../data/profile';
import './SkillsPreview.css';

const CATEGORY_ICONS = {
  Languages: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'AI / ML': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  Development: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  'Data / Backend': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Tools: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  )
};

export default function SkillsPreview() {
  const { toolbox } = profile;

  return (
    <section id="skills" className="section-wrapper skills-section">
      <div className="container">
        <SectionHeader
          number="05"
          kicker="CAPABILITIES MATRIX"
          title="TECHNICAL TOOLBOX"
          description="Proficiency categorizations based on active codebase utility and engineering practice. Structured honestly without arbitrary percentage metrics."
        />

        <div className="skills-legend">
          <span className="skills-legend__title">PROFICIENCY INDICATORS:</span>
          <div className="skills-legend__items">
            <span className="skills-legend__item">
              <span className="legend-indicator legend-indicator--comfortable"></span>
              <span>Comfortable — Daily practical fluency</span>
            </span>
            <span className="skills-legend__item">
              <span className="legend-indicator legend-indicator--learning"></span>
              <span>Learning — Active academic & project focus</span>
            </span>
            <span className="skills-legend__item">
              <span className="legend-indicator legend-indicator--exploring"></span>
              <span>Exploring — Research prototypes & evaluation</span>
            </span>
          </div>
        </div>

        <div className="skills-vertical-stack">
          {toolbox.categories.map((category) => (
            <div key={category.name} className="skill-category-row">
              <div className="skill-category-meta">
                <span className="skill-category-icon" aria-hidden="true">
                  {CATEGORY_ICONS[category.name] || CATEGORY_ICONS.Tools}
                </span>
                <h3 className="skill-category-heading">{category.name}</h3>
                <span className="skill-category-count">{category.skills.length}</span>
              </div>

              <div className="skill-chips-container">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-tech-chip"
                    title={skill.note ? `${skill.name} — ${skill.note}` : skill.name}
                  >
                    <span
                      className={`skill-chip-dot skill-chip-dot--${(skill.level || 'comfortable').toLowerCase()}`}
                      aria-hidden="true"
                    />
                    <span className="skill-chip-label">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
