const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const services = await prisma.service.findMany();
  console.log(services.map(s => ({ title: s.title, coverImage: s.coverImage })));
}

main().finally(() => prisma.$disconnect());
