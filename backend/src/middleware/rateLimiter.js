import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';
import { HttpStatus } from '../utils/apiResponse.js';

export const apiRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
    timestamp: new Date().toISOString()
  },
  statusCode: HttpStatus.TOO_MANY_REQUESTS
});
