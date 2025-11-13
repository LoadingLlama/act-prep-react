/**
 * Direct SQL restoration to Supabase
 * Uses direct database connection (not pooler)
 */

require('dotenv').config({ path: '../../.env' });
const { Client } = require('pg');
const fs = require('fs');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const DB_PASSWORD = process.env.DB_PASSWORD;
const SQL_FILE = './RESTORE_FULL_CONTENT.sql';

console.log('🔄 Starting direct database restoration...\n');

if (!SUPABASE_URL || !DB_PASSWORD) {
  console.error('❌ Error: Missing credentials in .env');
  process.exit(1);
}

// Extract project reference
const projectRef = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

console.log(`🔗 Project: ${projectRef}`);
console.log(`📄 SQL File: ${SQL_FILE}\n`);

async function main() {
  const client = new Client({
    host: `db.${projectRef}.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('⏳ Connecting to database...');
    await client.connect();
    console.log('✅ Connected!\n');

    console.log('📖 Reading SQL file...');
    const sql = fs.readFileSync(SQL_FILE, 'utf8');
    const sizeMB = (fs.statSync(SQL_FILE).size / 1024 / 1024).toFixed(2);
    console.log(`✅ Loaded ${sizeMB} MB\n`);

    console.log('⏳ Executing SQL (this may take 30-60 seconds)...\n');
    const startTime = Date.now();

    await client.query(sql);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('✅ SQL executed successfully!\n');
    console.log('='.repeat(50));
    console.log(`⏱  Duration: ${duration} seconds`);
    console.log('='.repeat(50) + '\n');

    // Verify
    console.log('📊 Verifying restoration...');
    const result = await client.query('SELECT COUNT(*) FROM lessons');
    const count = parseInt(result.rows[0].count);

    console.log(`✅ Total lessons: ${count}\n`);

    if (count >= 84) {
      console.log('🎉 All 84 lessons restored successfully!\n');
    } else {
      console.log(`⚠️  Expected 84 lessons, found ${count}\n`);
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);

    if (error.code === 'ENOTFOUND') {
      console.error('\n💡 DNS resolution failed.');
      console.error('   The database host may not be accessible.');
      console.error('   Try checking your internet connection.');
    } else if (error.code === '28P01') {
      console.error('\n💡 Authentication failed.');
      console.error('   Please verify your database password.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Connection refused.');
      console.error('   Database may be paused or IP not whitelisted.');
    }

    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
