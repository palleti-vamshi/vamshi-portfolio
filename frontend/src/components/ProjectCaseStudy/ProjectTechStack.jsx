import Badge from '../Badge/Badge';
import './ProjectTechStack.css';

export default function ProjectTechStack({ technologies }) {
  if (!technologies || Object.keys(technologies).length === 0) {
    return <div className="techstack-empty">Technology stack details will be added.</div>;
  }

  return (
    <div className="techstack-groups">
      {Object.entries(technologies).map(([groupName, techList]) => (
        <div key={groupName} className="techstack-group">
          <span className="techstack-group__name">{groupName}</span>
          <div className="techstack-group__items">
            {techList.map((tech) => (
              <Badge key={tech} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
