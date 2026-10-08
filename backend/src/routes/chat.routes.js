import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { handleChatMessage } from '../controllers/chat.controller.js';

const router = Router();

// Chat-specific rate limiting (stricter than global API limiter)
const chatWindowMs = parseInt(process.env.CHAT_RATE_WINDOW_MS, 10) || 15 * 60 * 1000; // 15 minutes
const chatMaxLimit = parseInt(process.env.CHAT_RATE_LIMIT, 10) || 20; // 20 chat requests per window

const chatLimiter = rateLimit({
  windowMs: chatWindowMs,
  max: chatMaxLimit,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Chat request rate limit reached. Please wait a few minutes before asking another question.',
    timestamp: new Date().toISOString()
  }
});

router.post('/', chatLimiter, handleChatMessage);

export default router;
