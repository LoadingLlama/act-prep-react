#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listAllTables() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Complete Table List from Database             ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  const allTableNames = [
    'lesson_metadata',
    'lesson_sections',
    'lesson_section_content',
    'lesson_examples',
    'lesson_term_definitions',
    'section_content',
    'examples',
    'term_definitions',
    'quizzes',
    'quiz_questions'
  ];

  console.log('Testing each table:\n');

  const existing = [];
  const removed = [];

  for (const table of allTableNames) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        if (error.message.includes('not find') || error.message.includes('does not exist')) {
          console.log(`❌ ${table}: Does not exist`);
          removed.push(table);
        } else {
          console.log(`⚠️  ${table}: Error - ${error.message}`);
        }
      } else {
        console.log(`✅ ${table}: ${count || 0} rows`);
        existing.push({ table, count: count || 0 });
      }
    } catch (err) {
      console.log(`❌ ${table}: Does not exist`);
      removed.push(table);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 SUMMARY:\n');

  console.log(`Existing tables: ${existing.length}`);
  existing.forEach(({ table, count }) => {
    console.log(`   ✅ ${table}: ${count} rows`);
  });

  console.log(`\nRemoved tables: ${removed.length}`);
  removed.forEach(table => {
    console.log(`   ❌ ${table}`);
  });

  const hasOldNames = existing.some(t =>
    t.table === 'section_content' ||
    t.table === 'examples' ||
    t.table === 'term_definitions'
  );

  const hasNewNames = existing.some(t =>
    t.table === 'lesson_section_content' ||
    t.table === 'lesson_examples' ||
    t.table === 'lesson_term_definitions'
  );

  console.log('\n');
  if (!hasOldNames && hasNewNames) {
    console.log('🎉 SUCCESS! Database is clean with lesson_ naming!\n');
  } else if (hasOldNames && hasNewNames) {
    console.log('⚠️  Both old and new tables exist\n');
  }
}

listAllTables();
