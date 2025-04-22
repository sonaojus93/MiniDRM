import express from 'express';
import { getLicensedVideos } from '../controllers/videoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/my', authMiddleware, getLicensedVideos);

export default router;