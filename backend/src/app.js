import express from 'express';
import { config } from './config/env.js';
import { helmetMiddleware, corsMiddleware } from './middleware/security.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();

// Security headers
app.use(helmetMiddleware);

// CORS enforcement
app.use(corsMiddleware);

// Request body parser with payload size restriction
app.use(express.json({ limit: config.bodyLimit }));
app.use(express.urlencoded({ extended: true, limit: config.bodyLimit }));

// Rate limiter applied across all /api routes
app.use('/api', apiRateLimiter);

// API Routes
app.use('/api', apiRouter);

// Catch-all for unhandled routes
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;
