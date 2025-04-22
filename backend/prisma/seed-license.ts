// prisma/seed-license.ts
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
    const userEmail = 'TEST@GMAIL.COM';  // 👈 Replace this
    const videoTitle = 'Thumbayum Thulasiyum';     // 👈 Replace this

    // Get user
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
    });

    if (!user) {
        console.error(`❌ User not found: ${userEmail}`);
        return;
    }

    // Get video
    const video = await prisma.video.findFirst({
        where: { title: videoTitle },
    });

    if (!video) {
        console.error(`❌ Video not found: ${videoTitle}`);
        return;
    }

    // Create license
    const license = await prisma.license.create({
        data: {
            token: uuidv4(),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
            userId: user.id,
            videoId: video.id,
        },
    });

    console.log('✅ License created:', license);
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
    });