const Database = require('better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to local SQLite DB...");
  const db = new Database('./prisma/dev.db');
  
  // Read local Projects
  const projects = db.prepare('SELECT * FROM Project').all();
  console.log(`Found ${projects.length} projects in local SQLite.`);

  // Read local Services
  const services = db.prepare('SELECT * FROM Service').all();
  console.log(`Found ${services.length} services in local SQLite.`);

  // Upsert to Supabase Postgres using Prisma
  for (const p of projects) {
    if (p.createdAt) p.createdAt = new Date(p.createdAt);
    if (p.updatedAt) p.updatedAt = new Date(p.updatedAt);
    if (p.featured !== undefined) p.featured = !!p.featured;
    
    try {
      await prisma.project.upsert({
        where: { id: p.id },
        update: p,
        create: p,
      });
      console.log(`✅ Uploaded project: ${p.title}`);
    } catch (err) {
      console.error(`❌ Failed to upload project ${p.title}:`, err.message);
    }
  }

  for (const s of services) {
    if (s.createdAt) s.createdAt = new Date(s.createdAt);
    if (s.updatedAt) s.updatedAt = new Date(s.updatedAt);
    
    try {
      await prisma.service.upsert({
        where: { id: s.id },
        update: s,
        create: s,
      });
      console.log(`✅ Uploaded service: ${s.title}`);
    } catch (err) {
      console.error(`❌ Failed to upload service ${s.title}:`, err.message);
    }
  }

  console.log("Data transfer complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
