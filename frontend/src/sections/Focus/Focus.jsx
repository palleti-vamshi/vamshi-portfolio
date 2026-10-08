import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { profile } from '../../data/profile';
import './Focus.css';

export default function Focus() {
  const { focusAreas } = profile;

  return (
    <section id="focus" className="section-wrapper focus-section">
      <div className="container">
        <SectionHeader
          number="03"
          kicker="TECHNICAL DOMAINS"
          title="WHAT I WORK ON"
          description="Disciplines I actively invest time in, combining theoretical exploration with project-driven engineering."
        />

        <div className="focus-list">
          {focusAreas.map((area, index) => (
            <article key={area.id} className="focus-item">
              <div className="focus-item__index">
                <span className="focus-num">0{index + 1}</span>
                <span className="focus-line"></span>
              </div>

              <div className="focus-item__content">
                <h3 className="focus-item__title">{area.title}</h3>
                <p className="focus-item__summary">{area.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
