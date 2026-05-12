
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      titleEs: true,
      description: true,
      descriptionEs: true,
      projectType: true,
      projectTypeEs: true,
      location: true,
      locationEs: true
    },
    orderBy: { order: 'asc' }
  });
  console.log(JSON.stringify(projects, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
