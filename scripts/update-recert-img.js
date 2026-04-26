const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const service = await prisma.service.updateMany({
    where: { slug: 'building-recertifications' },
    data: { coverImage: '/services/recertifications.png' },
  });
  console.log(`Updated ${service.count} services.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
