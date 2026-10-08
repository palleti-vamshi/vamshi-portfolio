import { Router } from 'express';
import healthRoutes from './health.routes.js';
import codingProfilesRoutes from './codingProfiles.routes.js';

const apiRouter = Router();

// Mount sub-routers
apiRouter.use('/', healthRoutes);
apiRouter.use('/', codingProfilesRoutes);

export default apiRouter;
