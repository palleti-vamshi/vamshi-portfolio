import { retrieveRelevantChunks } from './retrieval.service.js';
import { generateGroundedAnswer, isLLMConfigured } from './llm.service.js';

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 10;

/**
 * Basic pattern detection for obvious system override attempts
 */
function isDirectInjectionAttempt(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  const patterns = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /reveal\s+(your\s+)?system\s+prompt/i,
    /what\s+is\s+your\s+system\s+prompt/i,
    /show\s+me\s+(the\s+)?system\s+prompt/i,
    /print\s+(your\s+)?(api[_\s]?key|environment\s+variables|\.env)/i,
    /tell\s+me\s+(your\s+)?(api[_\s]?key|secret)/i,
    /give\s+me\s+(the\s+)?(api[_\s]?key|token)/i
  ];

  return patterns.some((p) => p.test(lower));
}

/**
 * Execute the RAG Chat Pipeline
 */
export async function processChatMessage({ message, history = [] }) {
  const startTime = Date.now();

  // 1. Validate user message
  if (!message || typeof message !== 'string') {
    throw new Error('Message is required and must be a string');
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) {
    throw new Error('Message cannot be empty');
  }

  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Message exceeds maximum limit of ${MAX_MESSAGE_LENGTH} characters`);
  }

  // 2. Validate history
  const safeHistory = Array.isArray(history) ? history.slice(-MAX_HISTORY_MESSAGES) : [];

  // 3. Prompt Injection Defense
  if (isDirectInjectionAttempt(trimmedMessage)) {
    return {
      answer: "I cannot fulfill that request. I am here to help answer questions about Palleti Vamshi's background, projects, skills, and engineering journey.",
      sources: []
    };
  }

  // 4. Retrieve Top-K context chunks from knowledge base
  const { chunks, sources } = await retrieveRelevantChunks(trimmedMessage);

  // 5. Check LLM availability
  if (!isLLMConfigured()) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[ChatService Dev] LLM is not configured: GEMINI_API_KEY / LLM_API_KEY is missing or empty.');
    }
    // Factual, transparent response when no LLM API key is present
    return {
      answer: "I'm having trouble accessing the portfolio assistant right now. Please try again or explore the project sections directly.",
      sources: []
    };
  }

  // 6. Generate grounded answer via LLM
  const llmResult = await generateGroundedAnswer({
    query: trimmedMessage,
    contextChunks: chunks,
    history: safeHistory
  });

  const durationMs = Date.now() - startTime;
  console.log(`[ChatService] Processed query in ${durationMs}ms | Chunks: ${chunks.length} | Available: ${llmResult.available}`);

  return {
    answer: llmResult.answer,
    sources: llmResult.available ? sources : []
  };
}
