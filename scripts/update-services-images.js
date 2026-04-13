const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Updating services cover images...");
  try {
    // 1. Update structural-engineering
    await prisma.service.update({
      where: { slug: "structural-engineering" },
      data: {
        coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format" // Engineering office/studio feeling
      }
    });
    console.log("Updated structural-engineering service image successfully.");

    // 2. Update structural-inspections
    await prisma.service.update({
      where: { slug: "structural-inspections" },
      data: {
        coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format" // Engineer detailing blueprints
      }
    });
    console.log("Updated structural-inspections service image successfully.");

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
