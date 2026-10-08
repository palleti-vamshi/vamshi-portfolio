import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Badge from '../../components/Badge/Badge';
import { profile } from '../../data/profile';
import './SkillsPreview.css';

export default function SkillsPreview() {
  const { toolbox } = profile;

  const getLevelBadgeVariant = (level) => {
    switch (level) {
      case 'Comfortable':
        return 'success';
      case 'Learning':
        return 'accent';
      case 'Exploring':
        return 'muted';
      default:
        return 'default';
    }
  };

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

        <div className="skills-categories-grid">
          {toolbox.categories.map((category) => (
            <div key={category.name} className="skill-category-card">
              <div className="skill-category-header">
                <h3 className="skill-category-name">{category.name}</h3>
                <span className="skill-category-count">{category.skills.length} items</span>
              </div>

              <div className="skill-items-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item-row">
                    <div className="skill-item-main">
                      <span className="skill-item-name">{skill.name}</span>
                      <p className="skill-item-note">{skill.note}</p>
                    </div>

                    <div className="skill-item-status">
                      <Badge variant={getLevelBadgeVariant(skill.level)} size="sm">
                        {skill.level}
                      </Badge>
                    </div>
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
