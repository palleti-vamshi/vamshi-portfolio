import React from 'react';

/**
 * Safe, zero-dependency Markdown renderer that outputs standard React elements
 * without dangerouslySetInnerHTML to guarantee complete XSS immunity.
 */
export default function SafeMarkdown({ content }) {
  if (!content) return null;

  // Split into lines
  const lines = content.split('\n');
  const elements = [];
  let currentList = [];
  let elementKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elementKey++}`} className="safe-md-list">
          {currentList.map((item, idx) => (
            <li key={idx} className="safe-md-item">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('- ') || line.startsWith('* ')) {
      currentList.push(line.slice(2));
    } else {
      flushList();

      if (line.length === 0) {
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={`h4-${elementKey++}`} className="safe-md-h4">
            {renderInline(line.slice(4))}
          </h4>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h3 key={`h3-${elementKey++}`} className="safe-md-h3">
            {renderInline(line.slice(3))}
          </h3>
        );
      } else {
        elements.push(
          <p key={`p-${elementKey++}`} className="safe-md-p">
            {renderInline(line)}
          </p>
        );
      }
    }
  }

  flushList();

  return <div className="safe-md-container">{elements}</div>;
}

/**
 * Parses bold, inline code, and URLs safely into React text nodes & elements
 */
function renderInline(text) {
  if (!text) return null;

  // Tokenize by inline code and bolding
  const parts = [];
  let remaining = text;
  let key = 0;

  // Regex for bold **text** or inline code `code` or markdown links [text](url)
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))/;

  while (remaining.length > 0) {
    const match = remaining.match(tokenRegex);
    if (!match) {
      parts.push(remaining);
      break;
    }

    const matchIndex = match.index;
    if (matchIndex > 0) {
      parts.push(remaining.slice(0, matchIndex));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={`bold-${key++}`} className="safe-md-bold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={`code-${key++}`} className="safe-md-code">
          {token.slice(1, -1)}
        </code>
      );
    } else if (match[2] && match[3]) {
      parts.push(
        <a
          key={`link-${key++}`}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="safe-md-link"
        >
          {match[2]} ↗
        </a>
      );
    }

    remaining = remaining.slice(matchIndex + token.length);
  }

  return parts;
}
