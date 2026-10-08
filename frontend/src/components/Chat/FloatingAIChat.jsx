import { useState, useRef, useEffect } from 'react';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import SafeMarkdown from './SafeMarkdown';
import { sendChatMessage } from '../../services/chat';
import './FloatingAIChat.css';

const SUGGESTED_QUESTIONS = [
  'What is Vamshi working toward?',
  'Tell me about LightX-IDS.',
  'What technologies has Vamshi worked with?',
  'Which project uses MongoDB?',
  "What is Vamshi's academic background?"
];

const INITIAL_MESSAGE = {
  id: 'init-1',
  role: 'assistant',
  content:
    "Hi — I'm Vamshi's portfolio assistant. Ask me about his projects, technical interests, education, or problem-solving journey.",
  sources: []
};

export default function FloatingAIChat({ isOpen, onToggle, onClose }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastPrompt, setLastPrompt] = useState('');

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, error, isOpen]);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setError(null);
    setInput('');
    setLastPrompt(query);

    const userMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    const historyPayload = newMessages
      .filter((m) => m.id !== 'init-1')
      .slice(-6)
      .map((m) => ({
        role: m.role,
        content: m.content
      }));

    try {
      const res = await sendChatMessage(query, historyPayload);
      const assistantMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: res.answer,
        sources: res.sources || []
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message || 'Unable to connect to the portfolio assistant.');
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setInput('');
  };

  const handleRetry = () => {
    if (lastPrompt) {
      handleSendMessage(lastPrompt);
    }
  };

  return (
    <div className="floating-ai-root" aria-live="polite">
      {/* Floating Chat Modal / Popover */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="floating-chat-window"
          role="dialog"
          aria-modal="false"
          aria-label="Vamshi AI Chat Assistant"
        >
          {/* Header */}
          <div className="floating-chat-header">
            <div className="floating-chat-header-left">
              <div className="floating-chat-avatar-thumb-wrapper">
                <img
                  src="/images/vamshi-avatar.jpg"
                  alt="Vamshi AI"
                  className="floating-chat-avatar-thumb"
                />
                <span className="floating-chat-dot"></span>
              </div>
              <div className="floating-chat-identity">
                <span className="floating-chat-name">VAMSHI AI</span>
                <span className="floating-chat-sub">RAG ASSISTANT</span>
              </div>
              <Badge variant="accent" size="sm">GROUNDED</Badge>
            </div>
            <div className="floating-chat-header-actions">
              <button
                type="button"
                className="floating-chat-tool-btn"
                onClick={handleClear}
                disabled={isLoading || messages.length <= 1}
                title="Reset conversation"
              >
                Clear
              </button>
              <button
                type="button"
                className="floating-chat-close-btn"
                onClick={onClose}
                aria-label="Close Chat"
                title="Minimize chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Suggestions Bar */}
          <div className="floating-chat-suggestions">
            <span className="floating-suggestions-label">PROMPTS:</span>
            <div className="floating-suggestions-scroll">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="floating-suggestion-chip"
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Message Stream */}
          <div className="floating-chat-stream">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`floating-msg-row floating-msg-row--${msg.role}`}
              >
                <div className={`floating-msg-bubble floating-msg-bubble--${msg.role}`}>
                  <div className="floating-msg-author">
                    {msg.role === 'assistant' ? 'VAMSHI AI' : 'VISITOR'}
                  </div>

                  <div className="floating-msg-content">
                    <SafeMarkdown content={msg.content} />
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="floating-msg-sources">
                      <span className="floating-sources-label">Sources:</span>
                      <div className="floating-sources-chips">
                        {msg.sources.map((src) => (
                          <span key={src} className="floating-source-tag">
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="floating-msg-row floating-msg-row--assistant">
                <div className="floating-msg-bubble floating-msg-bubble--assistant floating-msg-bubble--loading">
                  <div className="floating-msg-author">VAMSHI AI // RETRIEVING</div>
                  <div className="floating-loading-dots">
                    <span className="floating-dot"></span>
                    <span className="floating-dot"></span>
                    <span className="floating-dot"></span>
                    <span className="floating-loading-text">Searching verified knowledge base...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="floating-error-card">
                <span className="floating-error-icon" aria-hidden="true">⚠</span>
                <div className="floating-error-body">
                  <p className="floating-error-msg">{error}</p>
                  <button
                    type="button"
                    className="floating-retry-btn"
                    onClick={handleRetry}
                  >
                    Retry Question ↗
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            className="floating-chat-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className="floating-input-box">
              <textarea
                ref={textareaRef}
                className="floating-textarea"
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Vamshi's projects, skills, or education..."
                rows={2}
                maxLength={500}
                disabled={isLoading}
                aria-label="Ask Vamshi AI"
              />
              <div className="floating-input-bottom">
                <span className="floating-counter">{input.length} / 500</span>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isLoading || !input.trim()}
                  className="floating-send-btn"
                >
                  {isLoading ? '...' : 'Send ↗'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Floating AI Character Launcher Button */}
      <button
        type="button"
        className={`floating-ai-launcher ${isOpen ? 'floating-ai-launcher--active' : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? 'Close Vamshi AI Assistant' : 'Open Vamshi AI Assistant'}
        aria-expanded={isOpen}
      >
        <div className="floating-ai-avatar">
          <img
            src="/images/vamshi-avatar.jpg"
            alt="Vamshi AI"
            className="floating-ai-avatar-img"
          />
          <span className="floating-ai-ping"></span>
        </div>
        <div className="floating-ai-pill">
          <span className="floating-ai-pill-text">VAMSHI AI</span>
          <span className="floating-ai-status-indicator"></span>
        </div>
      </button>
    </div>
  );
}
