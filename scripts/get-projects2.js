const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' }
  });
  
  projects.forEach((p) => {
    if (p.title.includes('Waterfront') || p.title.includes('Custom Single-Family')) {
      console.log(`ID: ${p.id}, Order: ${p.order}, Title: ${p.title}`);
    }
  });

  console.log("\nFirst 5 projects:");
  projects.slice(0, 5).forEach((p) => {
    console.log(`ID: ${p.id}, Order: ${p.order}, Title: ${p.title}`);
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
