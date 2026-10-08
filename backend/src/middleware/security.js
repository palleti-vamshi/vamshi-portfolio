import helmet from 'helmet';
import cors from 'cors';
import { config } from '../config/env.js';

/**
 * Configure Helmet with sane security headers
 */
export const helmetMiddleware = helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
});

/**
 * Allowed CORS origins resolution
 */
const getAllowedOrigins = () => {
  const allowed = [config.frontendUrl];

  if (config.isDevelopment) {
    allowed.push('http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000');
  }

  // Filter empty and return unique
  return [...new Set(allowed.filter(Boolean))];
};

/**
 * Production-ready CORS options.
 * Restricts origin to configured FRONTEND_URL and prevents unrestricted '*' in production.
 */
export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, server-to-server) where origin is undefined
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = getAllowedOrigins();

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked request from origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
});
