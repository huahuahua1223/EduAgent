/**
 * Prisma数据库客户端配置
 * 
 * 功能：
 * - 创建并导出全局唯一的Prisma客户端实例
 * - 实现单例模式，防止开发环境热重载时创建多个连接
 * - 提供整个应用的数据库访问接口
 */

import { PrismaClient } from '@prisma/client';

// PrismaClient是一个昂贵的资源，所以我们在生产环境中只创建一个实例
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma; 