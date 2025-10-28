#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('Fixing Test 7 English answer key errors...\n');

const fixes = [
  { q: 30, correct: 'C' },
  { q: 41, correct: 'C' },
  { q: 42, correct: 'A' },
  { q: 44, correct: 'D' },
  { q: 61, correct: 'C' }
];

for (const fix of fixes) {
  const { error } = await supabase
    .from('act_english_questions')
    .update({ correct_answer: fix.correct })
    .eq('test_number', 7)
    .eq('question_number', fix.q);

  if (error) {
    console.error(`Error fixing Q${fix.q}:`, error);
  } else {
    console.log(`✓ Fixed Q${fix.q}: → ${fix.correct}`);
  }
}

console.log('\n✅ All fixes complete!\n');
