import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Badge from '../../components/Badge/Badge';
import { profile } from '../../data/profile';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section-wrapper about-section">
      <div className="container">
        <SectionHeader
          number="01"
          kicker="ABOUT"
          title="A little about me."
          description="A grounded academic foundation focused on understanding core computation, mathematical models, and resilient system design."
        />

        <div className="about-editorial-grid">
          {/* Left Column: Narrative & Focus Areas */}
          <div className="about-narrative">
            <h3 className="about-statement">
              Building software from first principles to truly understand how complex systems behave.
            </h3>

            <p className="about-text">
              I'm a second-year AI/ML student at VNR VJIET, Hyderabad, exploring artificial intelligence, machine learning, data structures, competitive programming, and emerging technologies through hands-on projects.
            </p>

            <p className="about-text">
              My engineering journey is driven by practical implementation. Whether architecting lightweight intrusion detection systems for industrial IoT, developing secure campus management backends with Java and Spring, or solving algorithmic challenges, I focus on write clean, modular, and explainable code.
            </p>

            <div className="about-focus-block">
              <span className="about-focus-label">CORE AREAS OF FOCUS:</span>
              <div className="about-focus-pills">
                <span className="about-focus-pill">Machine Learning & Anomaly Detection</span>
                <span className="about-focus-pill">Data Structures & Algorithms</span>
                <span className="about-focus-pill">Competitive Programming</span>
                <span className="about-focus-pill">Backend & Full-Stack Systems</span>
                <span className="about-focus-pill">Industrial IoT Telemetry</span>
              </div>
            </div>
          </div>

          {/* Right Column: Academic & Background Card */}
          <div className="about-card-col">
            <div className="about-academic-card">
              <div className="about-card-header">
                <div className="about-card-header__left">
                  <span className="about-card-status-dot"></span>
                  <span className="about-card-title">ACADEMIC SNAPSHOT</span>
                </div>
                <Badge variant="accent" size="sm">UNDERGRADUATE</Badge>
              </div>

              <div className="about-card-body">
                <div className="about-detail-item">
                  <span className="about-detail-label">INSTITUTION</span>
                  <span className="about-detail-value">VNR VJIET, Hyderabad</span>
                </div>

                <div className="about-detail-item">
                  <span className="about-detail-label">DEGREE PROGRAM</span>
                  <span className="about-detail-value">B.Tech Artificial Intelligence & Machine Learning</span>
                </div>

                <div className="about-detail-item">
                  <span className="about-detail-label">CURRENT YEAR / GRADUATION</span>
                  <span className="about-detail-value">Second Year · Expected 2029</span>
                </div>

                <div className="about-detail-item about-detail-item--highlight">
                  <span className="about-detail-label">ACADEMIC RECORD</span>
                  <span className="about-detail-value about-score">CGPA 9.9 / 10.0</span>
                </div>

                <div className="about-detail-item">
                  <span className="about-detail-label">LOCATION</span>
                  <span className="about-detail-value">Hyderabad, Telangana, India</span>
                </div>
              </div>

              <div className="about-card-footer">
                <span className="about-quote-mark">“</span>
                <span className="about-quote-text">I build to understand.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
