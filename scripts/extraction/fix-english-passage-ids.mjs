#!/usr/bin/env node

/**
 * FIX ENGLISH QUESTION passage_id FOREIGN KEYS
 * Link all 75 English questions to their proper passages
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔗 FIXING ENGLISH QUESTION passage_id REFERENCES\n');

// Get all English passages
const { data: passages, error: passageError } = await supabase
  .from('act_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

if (passageError) {
  console.error('❌ Error fetching passages:', passageError);
  process.exit(1);
}

console.log(`Found ${passages.length} English passages:\n`);
passages.forEach(p => {
  console.log(`   Passage ${p.passage_number}: ${p.title} (ID: ${p.id})`);
});

// Get all English questions
const { data: questions, error: questionError } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 1)
  .order('question_number');

if (questionError) {
  console.error('❌ Error fetching questions:', questionError);
  process.exit(1);
}

console.log(`\nFound ${questions.length} English questions\n`);

// Create mapping: passage_number -> passage_id
const passageMap = {};
passages.forEach(p => {
  passageMap[p.passage_number] = p.id;
});

console.log('📝 Updating passage_id for each question...\n');

let updatedCount = 0;

for (const q of questions) {
  const passageId = passageMap[q.passage_number];

  if (!passageId) {
    console.error(`❌ No passage found for passage_number ${q.passage_number}`);
    continue;
  }

  const { error } = await supabase
    .from('act_english_questions')
    .update({ passage_id: passageId })
    .eq('question_number', q.question_number);

  if (error) {
    console.error(`❌ Error updating Q${q.question_number}:`, error);
  } else {
    updatedCount++;
    if (updatedCount % 15 === 0) {
      console.log(`✅ Updated ${updatedCount}/75 questions...`);
    }
  }
}

console.log(`\n✅ Successfully updated ${updatedCount}/75 English questions with passage_id\n`);

// Verify the fix
const { data: verifyQuestions } = await supabase
  .from('act_english_questions')
  .select('question_number, passage_id, passage_number')
  .eq('test_number', 1)
  .order('question_number')
  .limit(10);

console.log('🔍 Verification - First 10 questions:\n');
verifyQuestions.forEach(q => {
  const hasId = q.passage_id ? '✅' : '❌';
  console.log(`   ${hasId} Q${q.question_number}: passage_number=${q.passage_number}, passage_id=${q.passage_id ? 'SET' : 'NULL'}`);
});

console.log('\n🎉 English question passage_id references fixed!\n');
