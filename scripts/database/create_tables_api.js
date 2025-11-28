/**
 * Creates all missing diagnostic tables using Supabase Admin API
 * This script uses the Supabase Management API to execute SQL
 */
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

console.log('📋 Creating diagnostic tables...');
console.log(`🔗 Project: ${projectRef}\n`);

// Read the SQL file
const sql = fs.readFileSync('FINAL_COMPLETE_SETUP.sql', 'utf8');

// Make POST request to Supabase SQL endpoint
const postData = JSON.stringify({ query: sql });

const options = {
  hostname: `${projectRef}.supabase.co`,
  port: 443,
  path: '/rest/v1/rpc/exec_sql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✅ Tables created successfully!');
      console.log('\n📊 Response:', data);
    } else {
      console.error('❌ Error creating tables');
      console.error('Status:', res.statusCode);
      console.error('Response:', data);
      console.log('\n⚠️  Note: You may need to run the SQL manually in Supabase Dashboard');
      console.log('    Go to: https://rabavobdklnwvwsldbix.supabase.co/project/_/sql/new');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  console.log('\n📝 Please run FINAL_COMPLETE_SETUP.sql manually:');
  console.log('   1. Go to: https://rabavobdklnwvwsldbix.supabase.co/project/_/sql/new');
  console.log('   2. Copy-paste the contents of FINAL_COMPLETE_SETUP.sql');
  console.log('   3. Click "Run"');
});

req.write(postData);
req.end();
