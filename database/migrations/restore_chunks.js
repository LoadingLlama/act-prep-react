/**
 * Restore content using split SQL chunks via Supabase SQL endpoint
 * Uses service role key for authentication
 *
 * Usage: node restore_chunks.js
 */

require('dotenv').config({ path: '../../.env' });
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CHUNKS_DIR = './chunks';

console.log('🔄 Starting content restoration via SQL chunks...\n');

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Error: Missing SUPABASE_URL or SERVICE_KEY in .env');
  process.exit(1);
}

console.log(`🔗 Supabase URL: ${SUPABASE_URL}`);
console.log(`📁 Chunks directory: ${CHUNKS_DIR}\n`);

/**
 * Execute SQL via Supabase REST API
 */
async function executeSql(sql) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  return response;
}

/**
 * Alternative: Use pg with direct connection string
 */
async function executeSqlViaPg(sql) {
  const { Client } = require('pg');

  // Supabase connection pooler URL (IPv4)
  const connectionString = `postgresql://postgres.rabavobdklnwvwsldbix:${process.env.DB_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`;

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  await client.query(sql);
  await client.end();
}

/**
 * Main execution
 */
async function main() {
  try {
    // Find all chunk files
    const files = fs.readdirSync(CHUNKS_DIR)
      .filter(f => f.startsWith('RESTORE_FULL_CONTENT_part_') && f.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.error('❌ No chunk files found in', CHUNKS_DIR);
      process.exit(1);
    }

    console.log(`📊 Found ${files.length} chunk files\n`);

    // Process each chunk
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filepath = path.join(CHUNKS_DIR, file);
      const fileSize = (fs.statSync(filepath).size / 1024).toFixed(1);

      console.log(`⏳ Processing ${file} (${fileSize} KB)...`);

      const sql = fs.readFileSync(filepath, 'utf8');

      try {
        // Try executing via pg module
        const { Client } = require('pg');

        // Build connection string from Supabase URL
        const projectId = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

        // Prompt for password if not in env
        if (!process.env.DB_PASSWORD && i === 0) {
          console.log('\n⚠️  Database password required for direct execution');
          console.log('Get it from: Supabase Dashboard → Settings → Database');
          console.log('\nAdd to .env file as: DB_PASSWORD=your_password\n');
          process.exit(1);
        }

        const client = new Client({
          host: `aws-0-us-west-1.pooler.supabase.com`,
          port: 6543,
          database: 'postgres',
          user: `postgres.${projectId}`,
          password: process.env.DB_PASSWORD,
          ssl: { rejectUnauthorized: false }
        });

        await client.connect();
        await client.query(sql);
        await client.end();

        console.log(`   ✅ Completed\n`);

      } catch (error) {
        console.error(`   ❌ Failed: ${error.message}\n`);
        throw error;
      }
    }

    console.log('='.repeat(50));
    console.log('🎉 All chunks processed successfully!');
    console.log('='.repeat(50) + '\n');

    // Verify
    console.log('📊 Verifying restoration...');
    const { Client } = require('pg');
    const projectId = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

    const client = new Client({
      host: `aws-0-us-west-1.pooler.supabase.com`,
      port: 6543,
      database: 'postgres',
      user: `postgres.${projectId}`,
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();
    const result = await client.query('SELECT COUNT(*) FROM lessons');
    await client.end();

    const count = parseInt(result.rows[0].count);
    console.log(`✅ Total lessons: ${count}\n`);

    if (count >= 84) {
      console.log('🎉 All 84 lessons restored successfully!\n');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main();
