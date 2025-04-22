import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function validateLicenseAndStream(req: Request, res: Response) {
    const userId = req.user?.id;
    const videoId = parseInt(req.params.videoId);

    const license = await prisma.license.findFirst({
        where: { userId, videoId },
        include: { video: true },
    });

    if (!license || !license.video) {
        return res.status(403).json({ message: 'No valid license or video' });
    }

    const { aesKey, aesIv, filePath } = license.video;
    const key = Buffer.from(aesKey, 'hex');
    const iv = Buffer.from(aesIv, 'hex');

    const encryptedPath = path.join(__dirname, '../../encrypted_videos', filePath);
    if (!fs.existsSync(encryptedPath)) {
        return res.status(404).json({ message: 'Encrypted file not found' });
    }

    res.setHeader('Content-Type', 'video/mp4');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    fs.createReadStream(encryptedPath).pipe(decipher).pipe(res);
}