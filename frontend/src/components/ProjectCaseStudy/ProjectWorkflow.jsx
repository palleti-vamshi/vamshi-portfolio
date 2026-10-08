import './ProjectWorkflow.css';

export default function ProjectWorkflow({ workflow }) {
  if (!workflow || workflow.length === 0) {
    return (
      <div className="workflow-placeholder">
        <p className="workflow-placeholder__text">Workflow activity documentation will be added as implementation unfolds.</p>
      </div>
    );
  }

  return (
    <div className="workflow-pipeline" aria-label="Project Workflow Activity Pipeline">
      {workflow.map((item, idx) => (
        <div key={item.stage} className="workflow-step">
          <div className="workflow-step__index">
            <span className="workflow-step__num">0{idx + 1}</span>
            {idx < workflow.length - 1 && <span className="workflow-step__track"></span>}
          </div>

          <div className="workflow-step__body">
            <div className="workflow-step__stage">{item.stage}</div>
            <p className="workflow-step__detail">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
