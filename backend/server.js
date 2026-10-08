import { config } from './src/config/env.js';
import app from './src/app.js';

const server = app.listen(config.port, () => {
  console.log(`[API Server] Running on http://localhost:${config.port} (env: ${config.env})`);
  console.log(`[API Server] Allowed frontend origin: ${config.frontendUrl}`);
});

// Graceful shutdown handling
const shutdown = (signal) => {
  console.log(`[API Server] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('[API Server] HTTP server closed.');
    process.exit(0);
  });

  // Force shutdown after timeout if pending connections hang
  setTimeout(() => {
    console.error('[API Server] Forced shutdown due to timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
