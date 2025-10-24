#!/usr/bin/env node

/**
 * CHECK TEST 1 FORMAT FOR REFERENCE
 * See what properly formatted Test 1 data looks like
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 1;

console.log('📋 CHECKING TEST 1 FORMAT FOR REFERENCE\n');
console.log('='.repeat(70));

// Check Test 1 English passages
console.log('\n📚 TEST 1 ENGLISH PASSAGES:');
const { data: englishPassages } = await supabase
  .from('act_english_passages')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('passage_number')
  .limit(2);

for (const passage of englishPassages || []) {
  console.log(`\nPassage ${passage.passage_number}:`);
  console.log(`  Title: ${passage.title}`);
  console.log(`  Introduction: ${passage.introduction}`);
  console.log(`  Text length: ${passage.passage_text?.length} chars`);
  console.log(`  Text preview: "${passage.passage_text?.substring(0, 150)}..."`);
}

// Check Test 1 Reading passages
console.log('\n📚 TEST 1 READING PASSAGES:');
const { data: readingPassages } = await supabase
  .from('act_reading_passages')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('passage_number')
  .limit(2);

for (const passage of readingPassages || []) {
  console.log(`\nPassage ${passage.passage_number}:`);
  console.log(`  Type: ${passage.passage_type}`);
  console.log(`  Title: ${passage.title}`);
  console.log(`  Author: ${passage.author}`);
  console.log(`  Source: ${passage.source}`);
  console.log(`  Introduction: ${passage.introduction}`);
  console.log(`  Text length: ${passage.passage_text?.length} chars`);
  console.log(`  Text preview: "${passage.passage_text?.substring(0, 150)}..."`);
}

// Check Test 1 Science passages
console.log('\n📚 TEST 1 SCIENCE PASSAGES:');
const { data: sciencePassages } = await supabase
  .from('act_science_passages')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('passage_number');

console.log(`Found ${sciencePassages?.length || 0} Science passages`);

for (const passage of sciencePassages || []) {
  console.log(`\nPassage ${passage.passage_number}:`);
  console.log(`  Type: ${passage.passage_type}`);
  console.log(`  Title: ${passage.title}`);
  console.log(`  Introduction: ${passage.introduction}`);
  console.log(`  Text length: ${passage.passage_text?.length} chars`);
  console.log(`  Text preview: "${passage.passage_text?.substring(0, 150)}..."`);
  console.log(`  Figures: ${passage.figures ? JSON.stringify(passage.figures).substring(0, 100) + '...' : 'None'}`);
}

// Check Test 1 questions format
console.log('\n📝 TEST 1 QUESTIONS SAMPLE:');
const { data: sampleQuestion } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .eq('question_number', 1)
  .single();

if (sampleQuestion) {
  console.log('\nSample English Question 1:');
  console.log(`  Question stem: "${sampleQuestion.question_stem?.substring(0, 100)}..."`);
  console.log(`  Choice A: "${sampleQuestion.choice_a}"`);
  console.log(`  Choice B: "${sampleQuestion.choice_b}"`);
  console.log(`  Choice C: "${sampleQuestion.choice_c}"`);
  console.log(`  Choice D: "${sampleQuestion.choice_d}"`);
  console.log(`  Correct: ${sampleQuestion.correct_answer}`);
  console.log(`  Type: ${sampleQuestion.question_type}`);
  console.log(`  Category: ${sampleQuestion.question_category}`);
}

console.log('\n✅ Test 1 format reference complete!\n');