const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const images = [
    "/services/structural_engineering_hero_1775153134772.png",
    "/services/building_recertifications_1775153156148.png",
    "/services/structural_inspections_1775153188744.png",
    "/services/mep_engineering_1775153240891.png"
  ];

  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  
  for (let i = 0; i < services.length; i++) {
    await prisma.service.update({
      where: { id: services[i].id },
      data: { coverImage: images[i] }
    });
    console.log(`Updated local image for ${services[i].title}`);
  }
}

main().finally(() => prisma.$disconnect());
