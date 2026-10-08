import { sendError, HttpStatus } from '../utils/apiResponse.js';

export const notFoundHandler = (req, res) => {
  return sendError(
    res,
    `Route not found: ${req.method} ${req.originalUrl}`,
    HttpStatus.NOT_FOUND
  );
};
