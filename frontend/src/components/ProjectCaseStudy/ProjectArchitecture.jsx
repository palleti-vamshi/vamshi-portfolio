import './ProjectArchitecture.css';

export default function ProjectArchitecture({ architecture }) {
  if (!architecture || !architecture.nodes || architecture.nodes.length === 0) {
    return (
      <div className="arch-placeholder">
        <span className="arch-placeholder__icon">⚙</span>
        <div className="arch-placeholder__title">Architecture Documentation Coming Soon</div>
        <p className="arch-placeholder__desc">
          System diagrams and module specifications will be published as architectural traces are formalized.
        </p>
      </div>
    );
  }

  return (
    <div className="arch-diagram" aria-label="System Architecture Diagram">
      {architecture.diagramTitle && (
        <div className="arch-diagram__title">
          <span className="arch-diagram__tag">VERIFIED ARCHITECTURE:</span>
          <span>{architecture.diagramTitle}</span>
        </div>
      )}

      <div className="arch-diagram__flow">
        {architecture.nodes.map((node, index) => (
          <div key={node.step} className="arch-node-wrapper">
            <div className="arch-node">
              <div className="arch-node__meta">
                <span className="arch-node__step">{node.step}</span>
                <span className="arch-node__label">TIER</span>
              </div>
              <div className="arch-node__name">{node.name}</div>
              <div className="arch-node__role">{node.role}</div>
            </div>

            {index < architecture.nodes.length - 1 && (
              <div className="arch-connector" aria-hidden="true">
                <span className="arch-connector__line"></span>
                <span className="arch-connector__arrow">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
