#!/usr/bin/env node

/**
 * UPDATE LESSON IDs FOR ALL PRACTICE ACT 3 QUESTIONS
 * Assign the correct lesson_id to all Practice ACT 3 questions across all sections
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 UPDATE LESSON IDs FOR ALL PRACTICE ACT 3 QUESTIONS');
console.log('Assigning the correct lesson_id to all Practice ACT 3 questions');
console.log('=' .repeat(80));

// The correct lesson_id for Practice ACT 3
const PRACTICE_ACT_3_LESSON_ID = '406a197f-f7d0-4c0d-9582-594dbb1bd8a0';

/**
 * Update lesson_ids for all sections
 */
async function updateAllLessonIds() {
  console.log(`\n🎯 UPDATING ALL PRACTICE ACT 3 QUESTIONS WITH LESSON_ID:`);
  console.log(`   Lesson ID: ${PRACTICE_ACT_3_LESSON_ID}`);
  console.log(`   Lesson: "Topic 3.3 - Practice Passages"`);

  const sections = [
    { name: 'English', table: 'act_english_questions', expected: 75 },
    { name: 'Math', table: 'act_math_questions', expected: 60 },
    { name: 'Reading', table: 'act_reading_questions', expected: 40 },
    { name: 'Science', table: 'act_science_questions', expected: 40 }
  ];

  let totalUpdated = 0;
  const errors = [];

  for (const section of sections) {
    console.log(`\n📝 UPDATING ${section.name.toUpperCase()} QUESTIONS...`);

    try {
      // Update all questions for this section where test_number = 3
      const { error, count } = await supabase
        .from(section.table)
        .update({ lesson_id: PRACTICE_ACT_3_LESSON_ID })
        .eq('test_number', 3);

      if (error) {
        errors.push(`${section.name}: ${error.message}`);
        console.log(`  ❌ Failed to update ${section.name} questions: ${error.message}`);
      } else {
        console.log(`  ✅ Updated ${count || 'unknown'} ${section.name} questions`);
        totalUpdated += (count || 0);
      }

      // Verify the update
      const { data: verifyQuestions } = await supabase
        .from(section.table)
        .select('question_number, lesson_id')
        .eq('test_number', 3)
        .eq('lesson_id', PRACTICE_ACT_3_LESSON_ID);

      const updatedCount = verifyQuestions?.length || 0;
      console.log(`  🔍 Verified: ${updatedCount}/${section.expected} questions now have correct lesson_id`);

      if (updatedCount !== section.expected) {
        errors.push(`${section.name}: Expected ${section.expected} questions but only ${updatedCount} have correct lesson_id`);
      }

    } catch (err) {
      errors.push(`${section.name}: ${err.message}`);
      console.log(`  ❌ Error updating ${section.name}: ${err.message}`);
    }
  }

  console.log('\n' + '=' .repeat(80));
  console.log('🎯 LESSON_ID UPDATE RESULTS');
  console.log('=' .repeat(80));

  if (errors.length === 0) {
    console.log('🎉 ✅ ALL LESSON_IDs UPDATED SUCCESSFULLY!');
    console.log(`✅ Total questions updated: ${totalUpdated}`);
    console.log(`✅ All Practice ACT 3 questions now have lesson_id: ${PRACTICE_ACT_3_LESSON_ID}`);
  } else {
    console.log('❌ LESSON_ID UPDATE ISSUES:');
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return {
    success: errors.length === 0,
    totalUpdated,
    errors
  };
}

/**
 * Final verification of lesson_ids
 */
async function verifyLessonIdUpdate() {
  console.log('\n🔍 FINAL VERIFICATION OF LESSON_ID UPDATES...');

  const sections = [
    { name: 'English', table: 'act_english_questions' },
    { name: 'Math', table: 'act_math_questions' },
    { name: 'Reading', table: 'act_reading_questions' },
    { name: 'Science', table: 'act_science_questions' }
  ];

  let allGood = true;

  for (const section of sections) {
    // Count questions with correct lesson_id
    const { count: correctCount } = await supabase
      .from(section.table)
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 3)
      .eq('lesson_id', PRACTICE_ACT_3_LESSON_ID);

    // Count questions with null lesson_id
    const { count: nullCount } = await supabase
      .from(section.table)
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 3)
      .is('lesson_id', null);

    // Count total questions
    const { count: totalCount } = await supabase
      .from(section.table)
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 3);

    const status = (nullCount === 0 && correctCount === totalCount) ? '✅' : '❌';
    console.log(`  ${status} ${section.name}: ${correctCount}/${totalCount} correct, ${nullCount} null`);

    if (nullCount > 0 || correctCount !== totalCount) {
      allGood = false;
    }
  }

  return allGood;
}

/**
 * Main function
 */
async function updateLessonIds() {
  const updateResults = await updateAllLessonIds();
  const verificationPassed = await verifyLessonIdUpdate();

  console.log('\n🏆 FINAL LESSON_ID UPDATE STATUS:');
  if (updateResults.success && verificationPassed) {
    console.log('🎉 ✅ LESSON_ID UPDATE COMPLETE AND VERIFIED!');
    console.log('🎯 All 215 Practice ACT 3 questions now have proper lesson_ids');
  } else {
    console.log('❌ LESSON_ID UPDATE INCOMPLETE - manual review needed');
  }

  return updateResults.success && verificationPassed;
}

updateLessonIds().catch(console.error);