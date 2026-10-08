import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { profile } from '../../data/profile';
import './ProblemSolving.css';

export default function ProblemSolving() {
  const { problemSolving } = profile;

  return (
    <section id="approach" className="section-wrapper problem-solving-section">
      <div className="container">
        <SectionHeader
          number="02"
          kicker="METHODOLOGY"
          title="HOW I APPROACH A PROBLEM"
          description="A disciplined, engineering-first workflow applied across competitive programming, software architecture, and machine learning pipelines."
        />

        <div className="approach-grid">
          {problemSolving.steps.map((step) => (
            <div key={step.number} className="approach-card">
              <div className="approach-card__top">
                <span className="approach-card__number">{step.number}</span>
                <span className="approach-card__status">PHASE</span>
              </div>
              <h3 className="approach-card__name">{step.name}</h3>
              <div className="approach-card__tagline">{step.tagline}</div>
              <p className="approach-card__desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
