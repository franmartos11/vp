const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Updating services cover images with local branded versions...");
  try {
    await prisma.service.update({
      where: { slug: "structural-engineering" },
      data: {
        coverImage: "/services/structural-eng.png"
      }
    });
    console.log("Updated structural-engineering service image to local asset.");

    await prisma.service.update({
      where: { slug: "structural-inspections" },
      data: {
        coverImage: "/services/structural-insp.png"
      }
    });
    console.log("Updated structural-inspections service image to local asset.");

    console.log("Database update completed!");
  } catch (error) {
    console.error("Error updating database:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
