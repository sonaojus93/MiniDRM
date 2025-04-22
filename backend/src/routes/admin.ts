import express from 'express';
import multer from 'multer';
import { uploadEncryptedVideo } from '../controllers/adminController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authMiddleware, upload.single('video'), uploadEncryptedVideo);

export default router;