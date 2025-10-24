#!/usr/bin/env node

/**
 * DEBUG TEST 2 QUESTIONS
 * Check what's actually in the Test 2 questions right now
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 DEBUGGING TEST 2 QUESTIONS\n');
console.log('='.repeat(70));

// Check a few specific questions
const { data: englishQ1, error: englishError } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 2)
  .eq('question_number', 1)
  .single();

console.log('📝 English Question 1:');
if (englishError) {
  console.error('❌ Error:', englishError.message);
} else if (englishQ1) {
  console.log(`Question stem: "${englishQ1.question_stem}"`);
  console.log(`Choice A: "${englishQ1.choice_a}"`);
  console.log(`Choice B: "${englishQ1.choice_b}"`);
  console.log(`Choice C: "${englishQ1.choice_c}"`);
  console.log(`Choice D: "${englishQ1.choice_d}"`);
  console.log(`Correct: ${englishQ1.correct_answer}`);

  const hasGoodStem = englishQ1.question_stem &&
                     !englishQ1.question_stem.includes('[Question') &&
                     englishQ1.question_stem.length > 10;
  const hasChoices = englishQ1.choice_a && englishQ1.choice_b && englishQ1.choice_c && englishQ1.choice_d;
  const hasAnswer = englishQ1.correct_answer && englishQ1.correct_answer !== 'Z';

  console.log(`Good stem: ${hasGoodStem}`);
  console.log(`Has choices: ${hasChoices}`);
  console.log(`Has answer: ${hasAnswer}`);
} else {
  console.log('❌ No data found');
}

// Check total counts
console.log('\n📊 Question Counts:');
const tables = [
  ['act_english_questions', 'English'],
  ['act_math_questions', 'Math'],
  ['act_reading_questions', 'Reading'],
  ['act_science_questions', 'Science']
];

for (const [tableName, sectionName] of tables) {
  const { count, error } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true })
    .eq('test_number', 2);

  console.log(`${sectionName}: ${count} questions ${error ? '❌' : '✅'}`);
}

// Check Reading passages specifically
console.log('\n📚 Reading Passages:');
const { data: readingPassages, error: readingError } = await supabase
  .from('act_reading_passages')
  .select('passage_number, title, passage_text')
  .eq('test_number', 2)
  .order('passage_number');

if (readingError) {
  console.error('❌ Error:', readingError.message);
} else {
  for (const passage of readingPassages || []) {
    const hasGoodTitle = passage.title && !passage.title.includes('[') && !passage.title.includes('Passage');
    const hasGoodText = passage.passage_text &&
                       !passage.passage_text.includes('[') &&
                       !passage.passage_text.includes('manual') &&
                       passage.passage_text.length > 200;

    console.log(`Passage ${passage.passage_number}: "${passage.title}" - ${hasGoodTitle && hasGoodText ? '✅' : '❌'}`);
    if (!hasGoodText) {
      console.log(`  Text preview: "${passage.passage_text?.substring(0, 100)}..."`);
    }
  }
}

console.log('\n✅ Debug complete!');