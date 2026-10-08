import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import './AISection.css';

const PREVIEW_PROMPTS = [
  'What is Vamshi working toward?',
  'Tell me about LightX-IDS.',
  'What technologies has Vamshi worked with?',
  'Which project uses MongoDB?',
  "What is Vamshi's academic background?"
];

export default function AISection({ onOpenChat }) {
  return (
    <section id="ai" className="section-wrapper ai-section">
      <div className="container">
        <SectionHeader
          number="08"
          kicker="SYSTEM"
          title="ASK VAMSHI AI"
          description="Ask about my work, projects, technical interests, and engineering journey."
        />

        <div className="ai-system-overview">
          {/* Architecture Pillars */}
          <div className="ai-intro-grid">
            <div className="ai-intro-card">
              <span className="ai-intro-kicker">01 // SOURCE OF TRUTH</span>
              <h3 className="ai-intro-title">Grounded Knowledge Base</h3>
              <p className="ai-intro-text">
                Indexed directly from verified project architectures, academic credentials, and GitHub telemetry. The assistant never invents unverified achievements or corporate roles.
              </p>
            </div>

            <div className="ai-intro-card">
              <span className="ai-intro-kicker">02 // RETRIEVAL ENGINE</span>
              <h3 className="ai-intro-title">Vector Semantic Search</h3>
              <p className="ai-intro-text">
                Evaluates query intent across segmented Markdown chunks, retrieving the most relevant technical context to synthesize grounded, truthful answers.
              </p>
            </div>

            <div className="ai-intro-card">
              <span className="ai-intro-kicker">03 // TRANSPARENCY</span>
              <h3 className="ai-intro-title">Source Attribution</h3>
              <p className="ai-intro-text">
                Every generated response transparently cites the specific portfolio project or section it pulled context from, allowing immediate verification.
              </p>
            </div>
          </div>

          {/* Assistant Interactive Launcher Banner */}
          <div className="ai-launcher-banner">
            <div className="ai-launcher-left">
              <div className="ai-launcher-status">
                <span className="ai-launcher-dot"></span>
                <span className="ai-launcher-label">PORTFOLIO AI COMPANION</span>
                <Badge variant="accent" size="sm">ONLINE</Badge>
              </div>
              <h3 className="ai-launcher-headline">Have questions about my technical background?</h3>
              <p className="ai-launcher-desc">
                Launch the assistant via the button below or click the floating Vamshi AI character in the bottom-right corner to start an interactive conversation.
              </p>

              <div className="ai-launcher-prompts">
                <span className="ai-prompts-label">EXPLORE QUESTIONS:</span>
                <div className="ai-prompts-list">
                  {PREVIEW_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="ai-prompt-pill"
                      onClick={() => onOpenChat && onOpenChat(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="ai-launcher-right">
              <Button
                variant="primary"
                size="md"
                onClick={() => onOpenChat && onOpenChat()}
                className="ai-launch-action-btn"
              >
                Launch Vamshi AI ↗
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
