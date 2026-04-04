const db = require('better-sqlite3')('./prisma/dev.db');
const projects = db.prepare('SELECT * FROM Project').all();
require('fs').writeFileSync('dump_projects2.json', JSON.stringify(projects, null, 2), 'utf-8');
