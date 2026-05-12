
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      title: true,
      titleEs: true,
      shortDescription: true,
      shortDescriptionEs: true,
      fullDescription: true,
      fullDescriptionEs: true
    },
    orderBy: { order: 'asc' }
  });
  console.log(JSON.stringify(services, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
