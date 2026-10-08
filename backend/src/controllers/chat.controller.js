import { sendSuccess, sendError, HttpStatus } from '../utils/apiResponse.js';
import { processChatMessage } from '../services/chat.service.js';

export async function handleChatMessage(req, res) {
  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return sendError(res, 'Valid message string is required', HttpStatus.BAD_REQUEST);
    }

    if (message.length > 500) {
      return sendError(res, 'Message exceeds 500 characters', HttpStatus.BAD_REQUEST);
    }

    if (history && (!Array.isArray(history) || history.length > 10)) {
      return sendError(res, 'History must be an array with at most 10 items', HttpStatus.BAD_REQUEST);
    }

    const result = await processChatMessage({ message, history });

    return sendSuccess(res, {
      answer: result.answer,
      sources: result.sources || []
    }, 'Chat response generated successfully');
  } catch (err) {
    console.error('[ChatController] Unhandled error in chat handler:', err.message);
    return sendError(
      res,
      "I'm having trouble accessing the portfolio assistant right now. Please try again or explore the project sections directly.",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
