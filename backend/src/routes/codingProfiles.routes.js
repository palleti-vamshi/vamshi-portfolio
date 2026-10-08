import { Router } from 'express';
import { getCodingProfilesController } from '../controllers/codingProfiles.controller.js';

const router = Router();

router.get('/coding-profiles', getCodingProfilesController);

export default router;
