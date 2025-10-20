#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeRename() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Executing Table Rename via RPC                 ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  const queries = [
    "ALTER TABLE section_content RENAME TO lesson_section_content;",
    "ALTER TABLE examples RENAME TO lesson_examples;",
    "ALTER TABLE term_definitions RENAME TO lesson_term_definitions;"
  ];

  for (const query of queries) {
    console.log(`Executing: ${query}`);

    try {
      const { data, error } = await supabase.rpc('exec_sql', { query });

      if (error) {
        console.log(`❌ Error: ${error.message}`);
      } else {
        console.log(`✅ Success`);
      }
    } catch (err) {
      console.log(`❌ Exception: ${err.message}`);
    }
    console.log('');
  }

  console.log('✅ All commands executed\n');
  console.log('🔍 Run verification: node scripts/verify-rename-complete.mjs\n');
}

executeRename();
