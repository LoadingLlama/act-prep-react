#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔍 Verifying modular table structure...\n');

async function verify() {
  const tables = ['lesson_metadata', 'lesson_sections', 'section_content', 'lesson_examples'];

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`  ❌ ${table}: ${error.message}`);
      } else {
        console.log(`  ✅ ${table}: ${count || 0} rows`);
      }
    } catch (err) {
      console.log(`  ❌ ${table}: ${err.message}`);
    }
  }

  console.log('\n📊 Checking old lessons table...');

  const { count: oldCount, error: oldError } = await supabase
    .from('lessons')
    .select('*', { count: 'exact', head: true });

  if (oldError) {
    console.log(`  ❌ lessons: ${oldError.message}`);
  } else {
    console.log(`  ✅ lessons: ${oldCount || 0} rows (ready to migrate)\n`);
  }
}

verify();
