import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { encryptFile } from '../utils/encryption';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function uploadEncryptedVideo(req: Request, res: Response) {
    const { title } = req.body;
    const file = req.file;

    if (!file || !title) {
        return res.status(400).json({ message: 'Missing title or video' });
    }

    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const keyHex = key.toString('hex');
    const ivHex = iv.toString('hex');

    const inputPath = file.path;
    const encryptedDir = path.join(__dirname, '../../encrypted_videos');
    if (!fs.existsSync(encryptedDir)) {
        fs.mkdirSync(encryptedDir, { recursive: true });
    }

    const outputFilename = `${Date.now()}-${file.originalname}`;
    const outputPath = path.join(encryptedDir, outputFilename);

    encryptFile(inputPath, outputPath, key, iv);
    fs.unlinkSync(inputPath); // clean unencrypted upload

    await prisma.video.create({
        data: {
            title,
            filePath: outputFilename,
            aesKey: keyHex,
            aesIv: ivHex,
        },
    });

    res.json({ message: 'Encrypted video uploaded successfully!' });
}