#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📊 Checking Current Supabase Tables...\n');

const tablesToCheck = [
  'act_questions',
  'act_passages',
  'lessons',
  'extraction_progress',
  'english_questions',
  'math_questions',
  'reading_questions',
  'science_questions'
];

for (const table of tablesToCheck) {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.log(`❌ ${table}: Does not exist`);
  } else {
    console.log(`✅ ${table}: ${count} rows`);
  }
}
