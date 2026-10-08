import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { profile } from '../../data/profile';
import './About.css';

export default function About() {
  const { about } = profile;

  return (
    <section id="about" className="section-wrapper about-section">
      <div className="container">
        <SectionHeader
          number="01"
          kicker="BACKGROUND & PHILOSOPHY"
          title="ENGINEERING FROM FIRST PRINCIPLES"
          description="A grounded academic foundation focused on understanding core computation, mathematical models, and resilient system design."
        />

        <div className="about-layout">
          {/* Narrative Column */}
          <div className="about-narrative">
            {about.bio.map((paragraph, idx) => (
              <p key={idx} className="about-paragraph">
                {paragraph}
              </p>
            ))}

            <div className="about-focus-pills">
              <span className="about-focus-title">CURRENT PRIORITIES:</span>
              <div className="about-pills-list">
                <span className="about-pill">Algorithmic Rigor</span>
                <span className="about-pill">Explainable AI</span>
                <span className="about-pill">Decoupled Systems</span>
                <span className="about-pill">Clean API Boundaries</span>
              </div>
            </div>
          </div>

          {/* Academic & Profile Metadata Spec Sheet */}
          <div className="about-spec">
            <div className="about-spec__header">
              <span className="about-spec__title">ACADEMIC PROFILE SPECIFICATION</span>
              <span className="about-spec__badge">VERIFIED</span>
            </div>

            <dl className="about-spec__list">
              {about.details.map((item) => (
                <div key={item.label} className="about-spec__row">
                  <dt className="about-spec__term">{item.label}</dt>
                  <dd className="about-spec__def">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="about-spec__footer">
              <span className="about-spec__note">
                Status: Enrolled Full-Time • Department of AI & ML
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
