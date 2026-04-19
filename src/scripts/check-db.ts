import "dotenv/config";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

async function main() {
  console.log('Connecting to database...')
  try {
    const userCount = await prisma.user.count()
    console.log(`Connection Successful! Total Users: ${userCount}`)
    
    const tableNames = await prisma.$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`
    console.log('Tables found in Public schema:', tableNames)
  } catch (e) {
    console.error('Database connection failed:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
