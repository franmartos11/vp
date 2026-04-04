const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const images = [
    "https://images.unsplash.com/photo-1541888081198-bc4a7e9da1ca?w=1600&auto=format", // wait I shouldn't use this one
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format", // valid
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format", // valid
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format", // valid
    "https://images.unsplash.com/photo-1542314831-c6a4d14effb2?w=1600&auto=format" // valid
  ];

  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  
  for (let i = 0; i < services.length; i++) {
    await prisma.service.update({
      where: { id: services[i].id },
      data: { coverImage: images[i + 1] }
    });
    console.log(`Updated image for ${services[i].title}`);
  }
}

main().finally(() => prisma.$disconnect());
