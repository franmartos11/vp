require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Updating service cover image...");
  try {
    // 1. Update building-recertifications coverImage
    await prisma.service.update({
      where: { slug: "building-recertifications" },
      data: {
        coverImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&auto=format"
      }
    });
    console.log("Updated building-recertifications service image successfully.");

    // 2. Reorder specific portfolio projects
    console.log("Updating portfolio projects order...");
    
    // Give all other projects a higher order to sink them
    await prisma.project.updateMany({
      data: { order: { increment: 10 } }
    });

    // Top 3
    await prisma.project.update({
      where: { slug: "custom-single-family-residence-mep" }, // Left image
      data: { order: 1 }
    });
    console.log("Promoted: custom-single-family-residence-mep");

    await prisma.project.update({
      where: { slug: "multi-family-residential-development" }, // Center image
      data: { order: 2 }
    });
    console.log("Promoted: multi-family-residential-development");

    await prisma.project.update({
      where: { slug: "High-End-Custom-Residence " }, // Right image
      data: { order: 3 }
    });
    console.log("Promoted: High-End-Custom-Residence");

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
