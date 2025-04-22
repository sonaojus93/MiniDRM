import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { encryptFile } from '../utils/encryption';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function uploadEncryptedVideo(req: Request, res: Response) {
    const { title } = req.body;
    const file = req.file;
    console.log("💾 req.file:", req.file);

    if (!file || !title) {
        return res.status(400).json({ message: 'Missing title or video' });
    }

    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const keyHex = key.toString('hex');
    const ivHex = iv.toString('hex');

    const inputPath = file.path;
    console.log("💾 inputPath:", inputPath);
    const encryptedDir = path.join(__dirname, '../../encrypted_videos');
    if (!fs.existsSync(encryptedDir)) {
        fs.mkdirSync(encryptedDir, { recursive: true });
    }

    const outputFilename = `${Date.now()}-${file.originalname}`;
    const outputPath = path.join(encryptedDir, outputFilename);
    console.log("💾 outputFilename:", outputFilename);

    await encryptFile(inputPath, outputPath, key, iv); // ✅ wait for full completion
    fs.unlinkSync(inputPath); // 💣 only delete after encrypt finishes

    let dt = {
        data: {
            title,
            filePath: outputFilename,
            aesKey: keyHex,
            aesIv: ivHex,
        },
    };
    console.log("💾 dt:", dt);

    await prisma.video.create(dt);
    console.log("successfull");

    res.json({ message: 'Encrypted video uploaded successfully!' });
}