import express from 'express';
import { validateLicenseAndStream } from '../controllers/licenseController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:videoId', authMiddleware, validateLicenseAndStream);

export default router;