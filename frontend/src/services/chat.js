/**
 * Client service for Profile RAG Chat Assistant.
 * Communicates with backend POST /api/chat.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
const CHAT_TIMEOUT_MS = 15000;

export async function sendChatMessage(message, history = []) {
  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new Error('Message is required');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: message.trim(),
        history
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const json = await res.json();

    if (!res.ok || !json.success) {
      const errMsg = json.message || `Request failed with status ${res.status}`;
      throw new Error(errMsg);
    }

    const answerText = json.data?.answer || "I'm having trouble retrieving a response right now.";
    const sourcesList = json.data?.sources || [];

    return {
      success: true,
      data: {
        answer: answerText,
        sources: sourcesList
      },
      answer: answerText,
      sources: sourcesList
    };
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new Error('The assistant took too long to respond. Please try asking again.');
    }

    throw err;
  }
}
