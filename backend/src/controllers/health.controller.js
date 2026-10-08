import { getHealthStatus } from '../services/health.service.js';
import { sendSuccess, HttpStatus } from '../utils/apiResponse.js';

export const getHealth = (req, res, next) => {
  try {
    const health = getHealthStatus();
    return sendSuccess(res, health, 'API is operational', HttpStatus.OK);
  } catch (error) {
    next(error);
  }
};
