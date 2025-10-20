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

async function checkState() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║  Current Database State                           ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  const tables = [
    'lessons',
    'lesson_metadata',
    'lesson_examples',
    'lesson_term_definitions',
    'quizzes',
    'quiz_questions'
  ];

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`❌ ${table}: ${error.message}`);
    } else {
      console.log(`${count > 0 ? '✅' : '⚠️ '} ${table}: ${count} rows`);
    }
  }

  console.log('\n');
}

checkState();
