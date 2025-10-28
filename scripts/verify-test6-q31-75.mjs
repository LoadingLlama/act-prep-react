#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 VERIFYING TEST 6 ENGLISH Q31-75 EXTRACTION\n');

// Check passages
const { data: passages, error: pError } = await supabase
  .from('act_english_passages')
  .select('*')
  .eq('test_number', 6)
  .in('passage_number', [3, 4, 5])
  .order('passage_number');

if (pError) {
  console.error('❌ Error fetching passages:', pError.message);
} else {
  console.log('📖 PASSAGES FOUND:', passages.length);
  passages.forEach(p => {
    console.log(`  Passage ${p.passage_number}: ${p.title}`);
  });
}

// Check questions
const { data: questions, error: qError } = await supabase
  .from('act_english_questions')
  .select('question_number, passage_number, correct_answer, question_type')
  .eq('test_number', 6)
  .gte('question_number', 31)
  .lte('question_number', 75)
  .order('question_number');

if (qError) {
  console.error('❌ Error fetching questions:', qError.message);
} else {
  console.log('\n📝 QUESTIONS FOUND:', questions.length);
  
  // Answer key verification
  const expectedAnswers = {
    31: 'A', 32: 'A', 33: 'C', 34: 'B', 35: 'C', 36: 'B', 37: 'B', 38: 'A', 39: 'C', 40: 'A',
    41: 'B', 42: 'D', 43: 'C', 44: 'C', 45: 'D',
    46: 'D', 47: 'D', 48: 'C', 49: 'A', 50: 'B', 51: 'B', 52: 'D', 53: 'B', 54: 'B', 55: 'A',
    56: 'D', 57: 'D', 58: 'B', 59: 'C', 60: 'A',
    61: 'A', 62: 'D', 63: 'A', 64: 'A', 65: 'C', 66: 'D', 67: 'B', 68: 'A', 69: 'B', 70: 'B',
    71: 'D', 72: 'D', 73: 'A', 74: 'B', 75: 'C'
  };
  
  let correctCount = 0;
  let wrongCount = 0;
  
  questions.forEach(q => {
    const expected = expectedAnswers[q.question_number];
    if (q.correct_answer === expected) {
      correctCount++;
    } else {
      wrongCount++;
      console.log(`  ❌ Q${q.question_number}: Got ${q.correct_answer}, Expected ${expected}`);
    }
  });
  
  console.log('\n✅ Answer Key Verification:');
  console.log(`  Correct: ${correctCount}/45`);
  console.log(`  Wrong: ${wrongCount}/45`);
  
  // Question type distribution
  const typeCount = {};
  questions.forEach(q => {
    typeCount[q.question_type] = (typeCount[q.question_type] || 0) + 1;
  });
  
  console.log('\n📊 Question Type Distribution:');
  Object.entries(typeCount).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
}

console.log('\n' + '='.repeat(60) + '\n');
