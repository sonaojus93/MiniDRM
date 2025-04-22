import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // 🔥 Delete licenses before videos
    await prisma.license.deleteMany({});
    await prisma.video.deleteMany({});
    console.log('✅ Deleted all videos and their licenses.');
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error('❌ Error:', e);
        prisma.$disconnect();
    });