import { useState, useRef, useEffect } from 'react';
import Badge from '../Badge/Badge';
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

  // Interactive Mascot Personality States: 'waving' | 'idle' | 'thinking' | 'happy' | 'clicking'
  const [mascotState, setMascotState] = useState('waving');
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouseTiltStyle, setMouseTiltStyle] = useState('perspective(400px) rotateY(0deg) rotateX(0deg)');
  const prevLoadingRef = useRef(isLoading);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Preload all 3 panda poses for instant zero-flicker transitions
  useEffect(() => {
    ['/tuxedo-panda.webp', '/tuxedo-panda-wave.webp', '/tuxedo-panda-think.webp'].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // 1. First Appearance: wave hello with paw, then settle to idle
  useEffect(() => {
    const greetingTimer = setTimeout(() => {
      setMascotState((current) => (current === 'waving' ? 'idle' : current));
    }, 1900);
    return () => clearTimeout(greetingTimer);
  }, []);

  // 2. Natural Occasional Blinking during Idle
  useEffect(() => {
    let blinkTimer;
    const scheduleBlink = () => {
      const nextDelay = 3500 + Math.random() * 3200;
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          // 25% chance of realistic double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleBlink();
              }, 110);
            }, 120);
          } else {
            scheduleBlink();
          }
        }, 130);
      }, nextDelay);
    };

    scheduleBlink();
    return () => clearTimeout(blinkTimer);
  }, []);

  // 3. AI Thinking & Response Arrival Reactions
  useEffect(() => {
    if (isLoading) {
      setMascotState('thinking');
    } else if (prevLoadingRef.current && !isLoading && !error) {
      // AI Response arrived: brief happy celebratory bounce
      setMascotState('happy');
      const happyTimer = setTimeout(() => {
        setMascotState('idle');
      }, 1900);
      return () => clearTimeout(happyTimer);
    } else if (!isLoading && mascotState === 'thinking') {
      setMascotState('idle');
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading, error, mascotState]);

  // 4. When Chat Opens/Closes
  useEffect(() => {
    if (isOpen) {
      setMascotState('happy');
      const openTimer = setTimeout(() => {
        setMascotState('idle');
      }, 1200);
      return () => clearTimeout(openTimer);
    } else {
      setMascotState('idle');
    }
  }, [isOpen]);

  // Mouse Interaction: subtle turn toward pointer and small friendly wave on hover
  const handleMouseEnter = () => {
    if (!isOpen && mascotState === 'idle') {
      setMascotState('waving');
      setTimeout(() => {
        setMascotState((current) => (current === 'waving' ? 'idle' : current));
      }, 1800);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotY = Math.max(-6, Math.min(6, (x / (rect.width / 2)) * 6));
    const rotX = Math.max(-4, Math.min(4, -(y / (rect.height / 2)) * 4));
    setMouseTiltStyle(`perspective(400px) rotateY(${rotY.toFixed(1)}deg) rotateX(${rotX.toFixed(1)}deg)`);
  };

  const handleMouseLeave = () => {
    setMouseTiltStyle('perspective(400px) rotateY(0deg) rotateX(0deg)');
  };

  // Cheerful bounce and click reaction
  const handleMascotClick = (e) => {
    e.preventDefault();
    setMascotState('clicking');
    setTimeout(() => {
      onToggle();
    }, 160);
  };

  // Determine active sprite pose
  const currentPandaWebp =
    mascotState === 'thinking'
      ? '/tuxedo-panda-think.webp'
      : mascotState === 'waving' || mascotState === 'happy' || mascotState === 'clicking'
      ? '/tuxedo-panda-wave.webp'
      : '/tuxedo-panda.webp';

  const currentPandaPng =
    mascotState === 'thinking'
      ? '/tuxedo-panda-think.png'
      : mascotState === 'waving' || mascotState === 'happy' || mascotState === 'clicking'
      ? '/tuxedo-panda-wave.png'
      : '/tuxedo-panda.png';

  // Auto-scroll to bottom of messages
  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('smooth');
    }
  }, [messages, isLoading, error]);

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

  // Submit message to RAG backend
  const handleSubmit = async (messageText) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    setError(null);
    setLastPrompt(textToSend);
    setInput('');

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
      const answer = res?.data?.answer || res?.answer;
      const sources = res?.data?.sources || res?.sources || [];

      if (answer) {
        const assistantMsg = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: answer,
          sources: sources
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(res?.message || 'Unable to generate response.');
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
          aria-label="Ask Vamshi AI Assistant"
        >
          {/* Header */}
          <div className="floating-chat-header">
            <div className="floating-chat-header-left">
              <div className="floating-chat-header-mascot" aria-hidden="true">
                <picture>
                  <source srcSet="/tuxedo-panda.webp" type="image/webp" />
                  <img
                    src="/tuxedo-panda.png"
                    alt=""
                    className="floating-chat-header-mascot-img"
                    width="28"
                    height="28"
                  />
                </picture>
              </div>
              <div className="floating-chat-identity">
                <div className="floating-chat-title-row">
                  <span className="floating-chat-name">Ask Vamshi AI</span>
                  <span className="floating-chat-status-dot" aria-hidden="true"></span>
                  <span className="floating-chat-status-text">Online</span>
                </div>
                <span className="floating-chat-sub">Grounded Portfolio RAG</span>
              </div>
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
                <div className="floating-chat-error-body">
                  <span className="floating-chat-error-icon" aria-hidden="true">⚠</span>
                  <p className="floating-chat-error-text">{error}</p>
                </div>
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

          {/* Chat Input Box (Input and Send Button on One Row) */}
          <form
            className="floating-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="floating-chat-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Vamshi's projects, skills..."
                className="floating-chat-input"
                disabled={isLoading}
                aria-label="Ask Vamshi AI a question"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="floating-chat-send-btn"
                aria-label="Send question"
                title="Send (Enter)"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 13V3M3 8l5-5 5 5"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Interactive 3D Tuxedo Panda Floating Launcher */}
      <button
        type="button"
        className={`floating-mascot-launcher ${isOpen ? 'floating-mascot-launcher--open' : ''} ${
          mascotState ? `floating-mascot-launcher--${mascotState}` : ''
        }`}
        onClick={handleMascotClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={isOpen ? 'Close Ask Vamshi AI assistant' : 'Open Ask Vamshi AI assistant'}
        aria-expanded={isOpen}
      >
        {/* Small Glowing White Comment/Chat Bubble Icon */}
        <div className="floating-mascot-bubble" aria-hidden="true" title="Chat with Panda Assistant">
          <div className="floating-mascot-bubble-core">
            <svg
              className="floating-mascot-bubble-svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            <span className="floating-mascot-bubble-pulse"></span>
          </div>
          <span className="floating-mascot-bubble-tail"></span>
        </div>

        {/* Compact Glowing Label on Hover / Focus */}
        <span className="floating-mascot-label" role="tooltip">
          Ask Vamshi AI
        </span>

        {/* 3D Panda Pod with Smooth Lighting, Shadow, and Micro-interactions */}
        <div
          className="floating-mascot-pod"
          style={{
            transform: mouseTiltStyle
          }}
        >
          <picture className="floating-mascot-picture">
            <source srcSet={currentPandaWebp} type="image/webp" />
            <img
              src={currentPandaPng}
              alt="Ask Vamshi AI panda companion in tuxedo"
              className={`floating-mascot-img floating-mascot-img--${mascotState}`}
              width="104"
              height="110"
              loading="eager"
            />
          </picture>

          {/* Natural Eye Blinking Overlays */}
          <span
            className={`panda-eyelid panda-eyelid--left ${isBlinking ? 'panda-eyelid--blink' : ''}`}
            aria-hidden="true"
          ></span>
          <span
            className={`panda-eyelid panda-eyelid--right ${isBlinking ? 'panda-eyelid--blink' : ''}`}
            aria-hidden="true"
          ></span>

          {/* Status Online Ping Indicator */}
          <span
            className="floating-mascot-status-ping"
            aria-hidden="true"
            title="AI Assistant Online"
          ></span>
        </div>
      </button>
    </div>
  );
}
