const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.project.update({
    where: { id: 'cmnjsvo0v0003vj5ka8foo2tn' }, // Waterfront
    data: { order: 1 }
  });

  await prisma.project.update({
    where: { id: 'cmnjsvmqq0001vj5kp2mx14bg' }, // Custom Single-Family
    data: { order: 10 }
  });

  console.log("Projects reordered successfully.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
