#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING TEST 6 ENGLISH Q31-75 ANSWERS\n');

const fixes = [
  { q: 40, correct: 'A' },
  { q: 42, correct: 'D' },
  { q: 52, correct: 'D' },
  { q: 54, correct: 'B' },
  { q: 57, correct: 'D' },
  { q: 58, correct: 'B' },
  { q: 59, correct: 'C' },
  { q: 60, correct: 'A' },
  { q: 70, correct: 'B' }
];

for (const fix of fixes) {
  const { data, error } = await supabase
    .from('act_english_questions')
    .update({ correct_answer: fix.correct })
    .eq('test_number', 6)
    .eq('question_number', fix.q);
  
  if (error) {
    console.error(`❌ Q${fix.q}: ${error.message}`);
  } else {
    console.log(`✅ Q${fix.q}: Updated to ${fix.correct}`);
  }
}

console.log('\n✅ All answers corrected!\n');
