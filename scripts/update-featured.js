const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const waterfront = await prisma.project.findUnique({
    where: { id: 'cmnjsvo0v0003vj5ka8foo2tn' }
  });
  
  if (!waterfront.featured) {
    console.log("Updating Waterfront Custom Residence to be featured...");
    await prisma.project.update({
      where: { id: 'cmnjsvo0v0003vj5ka8foo2tn' },
      data: { featured: true }
    });
  }

  const customSingleFamily = await prisma.project.findUnique({
    where: { id: 'cmnjsvmqq0001vj5kp2mx14bg' }
  });

  if (customSingleFamily.featured) {
    console.log("Updating Custom Single-Family Residence to NOT be featured...");
    await prisma.project.update({
      where: { id: 'cmnjsvmqq0001vj5kp2mx14bg' },
      data: { featured: false }
    });
  }

  console.log("Featured statuses updated successfully.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
