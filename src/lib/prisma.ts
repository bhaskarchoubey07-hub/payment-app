import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient;

export const prisma = (() => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  
  try {
    prismaInstance = new PrismaClient({
      log: ['query'],
    });
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
    return prismaInstance;
  } catch (e) {
    console.warn("Prisma failed to initialize, using mock proxy");
    return {} as PrismaClient; // Fallback mock to prevent crash on import
  }
})();
