/**
 * Restore lesson content using PostgreSQL client (pg)
 * This executes the raw SQL directly, bypassing parsing issues
 *
 * Usage: node restore_via_pg.js
 */

require('dotenv').config({ path: '../../.env' });
const { Client } = require('pg');
const fs = require('fs');

// Configuration
const SQL_FILE = './RESTORE_FULL_CONTENT.sql';

console.log('🔄 Starting content restoration via PostgreSQL client...\n');

// Get Supabase credentials
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.error('❌ Error: SUPABASE_URL not found in .env');
  process.exit(1);
}

// Extract project ID from Supabase URL
const projectMatch = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/);
if (!projectMatch) {
  console.error('❌ Error: Invalid SUPABASE_URL format');
  process.exit(1);
}

const projectId = projectMatch[1];
const dbHost = `db.${projectId}.supabase.co`;

console.log(`🔗 Supabase Project: ${projectId}`);
console.log(`📄 SQL File: ${SQL_FILE}\n`);

// Database connection config
const connectionConfig = {
  host: dbHost,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  // For direct connection, we need the actual database password
  // The service role key is for the API, not the database
  ssl: {
    rejectUnauthorized: false
  }
};

console.log('⚠️  This script requires your database password.');
console.log('Get it from: Supabase Dashboard → Settings → Database → Database password\n');

// Prompt for password
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter database password: ', async (password) => {
  readline.close();

  if (!password) {
    console.error('\n❌ Error: Password is required');
    process.exit(1);
  }

  connectionConfig.password = password;

  const client = new Client(connectionConfig);

  try {
    // Connect to database
    console.log('\n⏳ Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Read SQL file
    console.log('📖 Reading SQL file...');
    const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');
    const fileSizeMB = (fs.statSync(SQL_FILE).size / 1024 / 1024).toFixed(2);
    console.log(`✅ Loaded ${fileSizeMB} MB of SQL\n`);

    // Execute SQL
    console.log('⏳ Executing SQL (this may take 30-60 seconds)...\n');
    const startTime = Date.now();

    await client.query(sqlContent);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('✅ SQL executed successfully!\n');
    console.log('='.repeat(50));
    console.log(`⏱  Duration: ${duration} seconds`);
    console.log('='.repeat(50) + '\n');

    // Verify restoration
    console.log('📊 Verifying restoration...');
    const result = await client.query('SELECT COUNT(*) FROM lessons');
    const count = parseInt(result.rows[0].count);

    console.log(`✅ Total lessons in database: ${count}\n`);

    if (count >= 84) {
      console.log('🎉 All 84 lessons restored successfully!\n');
    } else {
      console.log(`⚠️  Warning: Expected 84 lessons, found ${count}\n`);
    }

  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error(error.message);

    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Connection refused. Check:');
      console.error('   - Database is not paused');
      console.error('   - Connection pooling is enabled');
      console.error('   - Your IP is allowed');
    } else if (error.code === '28P01') {
      console.error('\n💡 Authentication failed. Check:');
      console.error('   - Password is correct');
      console.error('   - Using database password (not service role key)');
    }

    process.exit(1);
  } finally {
    await client.end();
  }
});
