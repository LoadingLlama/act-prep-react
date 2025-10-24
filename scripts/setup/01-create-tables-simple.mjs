#!/usr/bin/env node

/**
 * Create ACT Question Bank Tables in Supabase
 * Simple version that creates tables one at a time
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Creating ACT Question Bank tables...\n');

// Test connection
console.log('Testing connection...');
const { data: testData, error: testError } = await supabase
  .from('_metadata')
  .select('*')
  .limit(1);

if (testError && !testError.message.includes('does not exist')) {
  console.error('❌ Connection failed:', testError.message);
  process.exit(1);
}

console.log('✅ Connected to Supabase\n');

// Note: Table creation needs to be done via Supabase Dashboard SQL Editor
// because the JavaScript client doesn't support DDL operations directly

console.log('📝 INSTRUCTIONS:');
console.log('');
console.log('1. Open Supabase Dashboard: https://app.supabase.com');
console.log('2. Go to your project: act-question-bank');
console.log('3. Click "SQL Editor" in the left sidebar');
console.log('4. Click "New query"');
console.log('5. Copy the contents of: scripts/setup/create-tables.sql');
console.log('6. Paste into the SQL editor');
console.log('7. Click "Run"');
console.log('');
console.log('OR run this command to see the SQL:');
console.log('  cat scripts/setup/create-tables.sql');
console.log('');
console.log('Once tables are created, run:');
console.log('  node scripts/setup/02-verify-setup.mjs');
console.log('');
