#!/usr/bin/env node

/**
 * FIX ENGLISH LESSONS COMPLETE
 * Update ALL English questions with proper lesson_id and difficulty_level assignments
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔧 FIXING ALL ENGLISH QUESTIONS LESSON ASSIGNMENTS\n');
console.log('='.repeat(70));

// Complete lesson mapping from Test 1
const lessonMapping = {
  'comma-splice': { lesson_id: 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac', difficulty_level: 'medium' },
  'fragment': { lesson_id: 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac', difficulty_level: 'medium' },
  'dash': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'comma-usage': { lesson_id: '3e8f0696-1bf7-4b5c-880d-fb5359923b7d', difficulty_level: 'medium' },
  'deleting-sentence': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'verb-agreement': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'easy' },
  'colon': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'sentence-placement': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' },
  'word-choice': { lesson_id: '04df2a09-a910-4456-8fe5-2f8e7f62c50f', difficulty_level: 'medium' },
  'modifier-misplaced': { lesson_id: 'f7ac1d6c-6416-47fd-9720-807224100517', difficulty_level: 'hard' },
  'which-choice': { lesson_id: '29b59c9d-ef2e-4f7f-aae2-464222884d3a', difficulty_level: 'hard' },
  'main-idea': { lesson_id: '29b59c9d-ef2e-4f7f-aae2-464222884d3a', difficulty_level: 'hard' },
  'verb-form': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'medium' },
  'redundancy': { lesson_id: '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734', difficulty_level: 'easy' },
  'transition': { lesson_id: '7aae3763-017b-4762-ad5a-346aac1f027b', difficulty_level: 'hard' },
  'verb-tense': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'easy' },
  'idiom': { lesson_id: '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16', difficulty_level: 'easy' },
  'logical-placement': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' },
  'parallel-structure': { lesson_id: 'e6153221-e330-4db4-8cc7-9c5a1d51a301', difficulty_level: 'hard' },
  'pronoun-ambiguous': { lesson_id: '3c3585a1-f137-4331-8390-29ef1f5e889f', difficulty_level: 'medium' },
  'adding-info': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'wordiness': { lesson_id: '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734', difficulty_level: 'medium' },
  'adding-sentence': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'modifier-dangling': { lesson_id: 'f7ac1d6c-6416-47fd-9720-807224100517', difficulty_level: 'hard' },
  'grammar': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'medium' },
  'punctuation': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'style': { lesson_id: '04df2a09-a910-4456-8fe5-2f8e7f62c50f', difficulty_level: 'medium' },
  'organization': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' }
};

// Get all English questions that need lesson assignment
const { data: englishQuestions, error: fetchError } = await supabase
  .from('act_english_questions')
  .select('question_number, question_type, lesson_id, difficulty_level')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (fetchError) {
  console.error('❌ Error fetching English questions:', fetchError);
  process.exit(1);
}

console.log(`📚 Found ${englishQuestions.length} English questions to check`);

let updateCount = 0;
let skippedCount = 0;
let errorCount = 0;

for (const question of englishQuestions) {
  const lessonInfo = lessonMapping[question.question_type];

  if (!lessonInfo) {
    console.log(`⚠️  Q${question.question_number}: No lesson mapping for type "${question.question_type}"`);
    skippedCount++;
    continue;
  }

  // Check if already has lesson assignment
  if (question.lesson_id && question.difficulty_level) {
    console.log(`✅ Q${question.question_number}: Already has lesson assignment`);
    skippedCount++;
    continue;
  }

  console.log(`🔄 Q${question.question_number}: Updating ${question.question_type} -> ${lessonInfo.lesson_id} (${lessonInfo.difficulty_level})`);

  // Update the question with lesson assignment
  const { error: updateError } = await supabase
    .from('act_english_questions')
    .update({
      lesson_id: lessonInfo.lesson_id,
      difficulty_level: lessonInfo.difficulty_level
    })
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', question.question_number);

  if (updateError) {
    console.error(`❌ Error updating Q${question.question_number}:`, updateError.message);
    errorCount++;
  } else {
    updateCount++;
  }
}

console.log('\n📊 LESSON ASSIGNMENT RESULTS:');
console.log('='.repeat(50));
console.log(`✅ Updated: ${updateCount} questions`);
console.log(`⏭️  Skipped (already assigned): ${skippedCount} questions`);
console.log(`❌ Errors: ${errorCount} questions`);

if (updateCount > 0) {
  console.log('\n🎉 Successfully updated English questions with lesson assignments!');
}

// Verify the fix
const { data: verifyData, error: verifyError } = await supabase
  .from('act_english_questions')
  .select('question_number, lesson_id, difficulty_level')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (!verifyError) {
  const withLessons = verifyData.filter(q => q.lesson_id && q.difficulty_level).length;
  console.log(`\n✅ VERIFICATION: ${withLessons}/75 English questions now have lesson assignments`);

  if (withLessons === 75) {
    console.log('🎊 ALL ENGLISH QUESTIONS NOW HAVE LESSON ASSIGNMENTS! 🎊');
  } else {
    const stillMissing = verifyData.filter(q => !q.lesson_id || !q.difficulty_level);
    console.log('❌ Still missing lesson assignments:');
    stillMissing.forEach(q => {
      console.log(`   Q${q.question_number}: lesson_id=${q.lesson_id || 'NULL'}, difficulty=${q.difficulty_level || 'NULL'}`);
    });
  }
}

console.log('\n🏁 English lesson assignment fix complete!\n');