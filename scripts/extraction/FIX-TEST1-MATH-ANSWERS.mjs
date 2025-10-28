#!/usr/bin/env node

/**
 * FIX TEST 1 MATH ANSWER FORMAT
 * Normalize F/G/H/J/K to A/B/C/D/E
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING TEST 1 MATH ANSWER FORMAT\n');
console.log('Normalizing F/G/H/J/K to A/B/C/D/E\n');
console.log('='.repeat(80));

// Get all Test 1 Math questions
const { data: mathQ } = await supabase
  .from('act_math_questions')
  .select('*')
  .eq('test_number', 1)
  .order('question_number');

console.log('\nFound ' + mathQ.length + ' Math questions in Test 1\n');

const mapping = {
  'F': 'A',
  'G': 'B',
  'H': 'C',
  'J': 'D',
  'K': 'E'
};

let fixed = 0;

for (const q of mathQ || []) {
  if (mapping[q.correct_answer]) {
    const normalized = mapping[q.correct_answer];

    const { error } = await supabase
      .from('act_math_questions')
      .update({ correct_answer: normalized })
      .eq('test_number', 1)
      .eq('question_number', q.question_number);

    if (!error) {
      console.log('  Q' + q.question_number + ': ' + q.correct_answer + ' → ' + normalized);
      fixed++;
    }
  }
}

console.log('\n='.repeat(80));
console.log('\n✅ Fixed ' + fixed + ' Math answer formats\n');
console.log('='.repeat(80) + '\n');
