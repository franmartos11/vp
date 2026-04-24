require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  console.log(JSON.stringify(projects.map(p => ({
    title: p.title,
    slug: p.slug,
    projectType: p.projectType,
    location: p.location,
    order: p.order
  })), null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
