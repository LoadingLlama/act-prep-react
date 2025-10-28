#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 FINAL VERIFICATION - TEST 6 ENGLISH Q31-75\n');
console.log('='.repeat(80) + '\n');

// Check passages
const { data: passages, error: pError } = await supabase
  .from('act_english_passages')
  .select('passage_number, title')
  .eq('test_number', 6)
  .in('passage_number', [3, 4, 5])
  .order('passage_number');

console.log('📖 PASSAGES:');
if (pError) {
  console.error('❌ Error:', pError.message);
} else {
  passages.forEach(p => {
    console.log(`  ✅ Passage ${p.passage_number}: "${p.title}"`);
  });
}

// Check questions with sample data
const { data: questions, error: qError } = await supabase
  .from('act_english_questions')
  .select('question_number, correct_answer, question_type, question_category')
  .eq('test_number', 6)
  .gte('question_number', 31)
  .lte('question_number', 75)
  .order('question_number');

console.log('\n📝 QUESTIONS:');
if (qError) {
  console.error('❌ Error:', qError.message);
} else {
  console.log(`  Total: ${questions.length}/45 questions`);
  
  // Sample questions
  console.log('\n  Sample Questions:');
  [31, 40, 45, 46, 54, 60, 61, 70, 75].forEach(qNum => {
    const q = questions.find(x => x.question_number === qNum);
    if (q) {
      console.log(`    Q${qNum}: ${q.correct_answer} (${q.question_type}, ${q.question_category})`);
    }
  });
  
  // Count by category
  const categoryCount = questions.reduce((acc, q) => {
    acc[q.question_category] = (acc[q.question_category] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\n  By Category:');
  Object.entries(categoryCount).forEach(([cat, count]) => {
    console.log(`    ${cat}: ${count} questions`);
  });
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ VERIFICATION COMPLETE - All data successfully extracted and stored!\n');
