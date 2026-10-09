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
  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('smooth');
    }
  }, [messages, isLoading]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-resize textarea
  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  // Submit message to RAG backend
  const handleSubmit = async (messageText) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    setError(null);
    setLastPrompt(textToSend);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const userMsgId = `user-${Date.now()}`;
    const userMsg = {
      id: userMsgId,
      role: 'user',
      content: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build conversation history excluding initial greeting
      const history = messages
        .filter((m) => m.id !== 'init-1')
        .slice(-6)
        .map((m) => ({
          role: m.role,
          content: m.content
        }));

      const res = await sendChatMessage(textToSend, history);

      if (res.success && res.data) {
        const assistantMsg = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: res.data.answer,
          sources: res.data.sources || []
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(res.message || 'Unable to generate response.');
      }
    } catch (err) {
      console.error('[FloatingAIChat] Chat request error:', err);
      setError(err.message || 'Failed to reach portfolio assistant.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastPrompt) {
      handleSubmit(lastPrompt);
    }
  };

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setInput('');
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
              <div className="floating-chat-badge-icon">
                <span>✦</span>
              </div>
              <div className="floating-chat-identity">
                <span className="floating-chat-name">Vamshi AI</span>
                <span className="floating-chat-sub">Portfolio RAG Assistant</span>
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
                aria-label="Close chat window"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="floating-chat-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`floating-chat-msg floating-chat-msg--${msg.role}`}
              >
                <div className="floating-chat-bubble">
                  {msg.role === 'assistant' ? (
                    <SafeMarkdown content={msg.content} />
                  ) : (
                    <p className="floating-chat-user-text">{msg.content}</p>
                  )}

                  {/* Grounded Sources Attribution */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="floating-chat-sources">
                      <span className="floating-chat-sources-label">GROUNDED SOURCES:</span>
                      <div className="floating-chat-sources-tags">
                        {msg.sources.map((src) => (
                          <span key={src} className="floating-chat-source-tag">
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading / Typing State */}
            {isLoading && (
              <div className="floating-chat-msg floating-chat-msg--assistant">
                <div className="floating-chat-bubble floating-chat-bubble--loading">
                  <div className="typing-indicator" aria-label="Thinking">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="typing-label">Retrieving portfolio knowledge...</span>
                </div>
              </div>
            )}

            {/* Error & Retry State */}
            {error && (
              <div className="floating-chat-error" role="alert">
                <p className="floating-chat-error-text">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="floating-chat-retry-btn"
                >
                  Retry Prompt
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          {messages.length <= 2 && (
            <div className="floating-chat-suggestions">
              <span className="floating-chat-suggestions-title">SUGGESTED QUESTIONS:</span>
              <div className="floating-chat-chips">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="floating-chat-chip"
                    onClick={() => handleSubmit(q)}
                    disabled={isLoading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Box */}
          <form
            className="floating-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="floating-chat-input-wrapper">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Ask about Vamshi's projects, skills..."
                className="floating-chat-textarea"
                disabled={isLoading}
                aria-label="Ask Vamshi AI a question"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="floating-chat-send-btn"
                aria-label="Send question"
              >
                ↑
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Elegant Floating AI Button Launcher */}
      <button
        type="button"
        className={`floating-ai-launcher ${isOpen ? 'floating-ai-launcher--active' : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? 'Close Vamshi AI Assistant' : 'Open Vamshi AI Assistant'}
        aria-expanded={isOpen}
      >
        <span className="floating-ai-launcher__icon">✦</span>
        <span className="floating-ai-launcher__text">Ask Vamshi AI</span>
        <span className="floating-ai-launcher__ping" aria-hidden="true"></span>
      </button>
    </div>
  );
}
