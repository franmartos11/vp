
const { Client } = require('pg');

async function testConnection() {
  const connectionString = "postgresql://postgres.wsfctvptfxhqduhzwurj:HCB6ArxR6zJrUz3L@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require";
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Successfully connected!');
    const res = await client.query('SELECT NOW()');
    console.log('Current time from DB:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error:', err.message);
    console.error('Full error:', err);
  }
}

testConnection();
