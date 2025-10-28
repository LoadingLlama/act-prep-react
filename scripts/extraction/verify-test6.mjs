#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function verify() {
  // Check passages
  const { data: passages, error: pError } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', 6)
    .order('passage_number');

  if (pError) {
    console.error('Error fetching passages:', pError);
    return;
  }

  console.log('\n=== PASSAGES ===');
  passages.forEach(p => {
    console.log(`Passage ${p.passage_number}: ${p.passage_type}`);
    console.log(`  Title: ${p.title.slice(0, 60)}...`);
  });

  // Check questions with answer key
  const { data: questions, error: qError } = await supabase
    .from('act_reading_questions')
    .select('question_number, correct_answer')
    .eq('test_number', 6)
    .order('question_number');

  if (qError) {
    console.error('Error fetching questions:', qError);
    return;
  }

  console.log('\n=== ANSWER KEY VERIFICATION ===');
  const expected = {
    '1-10': 'B,B,A,A,C,D,C,D,A,B',
    '11-20': 'B,B,C,C,A,B,A,A,C,D',
    '21-30': 'B,A,D,D,C,A,D,A,D,C',
    '31-40': 'B,D,A,A,D,C,C,B,C,A'
  };

  const q1_10 = questions.slice(0, 10).map(q => q.correct_answer).join(',');
  const q11_20 = questions.slice(10, 20).map(q => q.correct_answer).join(',');
  const q21_30 = questions.slice(20, 30).map(q => q.correct_answer).join(',');
  const q31_40 = questions.slice(30, 40).map(q => q.correct_answer).join(',');

  console.log(`Q1-10:  ${q1_10} ${q1_10 === expected['1-10'] ? '✓' : '✗ Expected: ' + expected['1-10']}`);
  console.log(`Q11-20: ${q11_20} ${q11_20 === expected['11-20'] ? '✓' : '✗ Expected: ' + expected['11-20']}`);
  console.log(`Q21-30: ${q21_30} ${q21_30 === expected['21-30'] ? '✓' : '✗ Expected: ' + expected['21-30']}`);
  console.log(`Q31-40: ${q31_40} ${q31_40 === expected['31-40'] ? '✓' : '✗ Expected: ' + expected['31-40']}`);

  console.log(`\nTotal questions: ${questions.length}/40`);
}

verify();
