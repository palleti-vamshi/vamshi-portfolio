import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  target,
  rel,
  type = 'button',
  ...rest
}) {
  const combinedClassName = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={onClick}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
