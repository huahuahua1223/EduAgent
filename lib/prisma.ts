import { PrismaClient } from '@prisma/client';

// PrismaClient是一个昂贵的资源，所以我们在生产环境中只创建一个实例
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma; 