import './SectionHeader.css';

export default function SectionHeader({
  number,
  kicker,
  title,
  description,
  align = 'left',
  className = ''
}) {
  return (
    <div className={`section-header section-header--${align} ${className}`.trim()}>
      <div className="section-header__metadata">
        {number && <span className="section-header__number">{number}</span>}
        {number && kicker && <span className="section-header__divider">/</span>}
        {kicker && <span className="section-header__kicker">{kicker}</span>}
      </div>
      {title && <h2 className="section-header__title">{title}</h2>}
      {description && <p className="section-header__desc">{description}</p>}
    </div>
  );
}
