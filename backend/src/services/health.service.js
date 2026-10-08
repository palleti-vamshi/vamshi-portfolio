import { config } from '../config/env.js';

export const getHealthStatus = () => {
  return {
    status: 'healthy',
    service: 'vamshi-portfolio-api',
    environment: config.env,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  };
};
