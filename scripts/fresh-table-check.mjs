#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

// Create fresh client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  db: { schema: 'public' },
  global: { headers: { 'cache-control': 'no-cache' } }
});

async function freshCheck() {
  console.log('\n🔍 Fresh Table Check (no cache)\n');

  const oldTables = ['section_content', 'examples', 'term_definitions'];
  const newTables = ['lesson_section_content', 'lesson_examples', 'lesson_term_definitions'];

  console.log('Checking OLD table names:\n');
  for (const table of oldTables) {
    const { error } = await supabase.from(table).select('id').limit(1);
    if (error) {
      if (error.message.includes('not find') || error.code === 'PGRST204') {
        console.log(`✅ ${table}: DROPPED (does not exist)`);
      } else {
        console.log(`⚠️  ${table}: ${error.message}`);
      }
    } else {
      console.log(`❌ ${table}: Still exists`);
    }
  }

  console.log('\nChecking NEW table names:\n');
  for (const table of newTables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`❌ ${table}: ERROR - ${error.message}`);
    } else {
      console.log(`✅ ${table}: ${count} rows`);
    }
  }
}

freshCheck();
