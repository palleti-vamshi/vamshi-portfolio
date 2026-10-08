import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Badge from '../../components/Badge/Badge';
import './AISection.css';

export default function AISection() {
  const pillars = [
    {
      kicker: 'INTERPRETABILITY',
      title: 'Explainable AI (XAI)',
      desc: 'Black-box predictions fail in mission-critical environments. Investigating attribution methods (SHAP / TreeExplainer) to ensure model inference remains transparent and verifiable.'
    },
    {
      kicker: 'EDGE EFFICIENCY',
      title: 'Constrained Hardware Inference',
      desc: 'Optimizing feature representations and model footprints so real-time threat detection and classification can execute reliably on resource-limited IoT endpoints.'
    },
    {
      kicker: 'KNOWLEDGE SYSTEMS',
      title: 'Retrieval-Augmented Architecture',
      desc: 'Studying contextual indexing and grounded embeddings to connect language models to verified, private domain documents with minimal hallucination.'
    }
  ];

  return (
    <section id="ai" className="section-wrapper ai-section">
      <div className="container">
        <SectionHeader
          number="08"
          kicker="INTELLIGENT SYSTEMS"
          title="AI PHILOSOPHY & ROADMAP"
          description="Investigating machine learning from the twin perspectives of model interpretability and lightweight embedded execution."
        />

        <div className="ai-pillars-grid">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="ai-pillar-card">
              <span className="ai-pillar-kicker">{pillar.kicker}</span>
              <h3 className="ai-pillar-title">{pillar.title}</h3>
              <p className="ai-pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div className="ai-roadmap-callout">
          <div className="ai-roadmap-header">
            <span className="ai-roadmap-tag">PROJECT ROADMAP</span>
            <Badge variant="muted" size="sm">SCHEDULED FOR PHASE 3</Badge>
          </div>
          <h4 className="ai-roadmap-title">Profile Retrieval-Augmented Assistant</h4>
          <p className="ai-roadmap-desc">
            An interactive chatbot powered by a vector database and retrieval-augmented generation (RAG) is planned for Phase 3. It will allow visitors to query verified academic records, engineering decisions, and research projects directly through this interface.
          </p>
        </div>
      </div>
    </section>
  );
}
