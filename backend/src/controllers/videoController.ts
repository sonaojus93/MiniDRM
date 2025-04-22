import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getLicensedVideos(req: Request, res: Response) {
    const userId = req.user?.id;

    const licenses = await prisma.license.findMany({
        where: { userId },
        include: { video: true }
    });

    const videos = licenses.map(l => ({
        id: l.video.id,
        title: l.video.title,
    }));

    res.json({ videos });
}