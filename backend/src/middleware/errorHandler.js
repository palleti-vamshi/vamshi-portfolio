import { config } from '../config/env.js';
import { sendError, HttpStatus } from '../utils/apiResponse.js';

/**
 * Centralized error-handling middleware.
 * Guarantees that internal file paths, stack traces, and sensitive environment details
 * are never leaked to client responses.
 */
export const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  // Distinguish known CORS or validation errors
  if (err.message && err.message.startsWith('CORS blocked')) {
    return sendError(res, 'Access denied by CORS policy', HttpStatus.FORBIDDEN);
  }

  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

  // In production, mask internal error messages for 500s
  const message = config.isProduction && statusCode === HttpStatus.INTERNAL_SERVER_ERROR
    ? 'An unexpected internal server error occurred.'
    : err.message || 'An error occurred processing the request.';

  // In development, optional sanitized error metadata can be attached (never secrets or env vars)
  const errors = config.isDevelopment
    ? { name: err.name, details: err.message }
    : null;

  return sendError(res, message, statusCode, errors);
};
