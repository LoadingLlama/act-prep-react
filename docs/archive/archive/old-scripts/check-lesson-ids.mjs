#!/usr/bin/env node

/**
 * CHECK LESSON IDs FOR PRACTICE ACT 3
 * Find the correct lesson_id to assign to all Practice ACT 3 questions
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING LESSON IDs FOR PRACTICE ACT 3');
console.log('Finding the correct lesson_id to assign to all Practice ACT 3 questions');
console.log('=' .repeat(80));

async function checkLessonIds() {
  // Check existing lessons table
  console.log('\n📚 CHECKING LESSONS TABLE...');
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .order('title');

  console.log(`Found ${lessons?.length || 0} lessons in database`);

  // Look for Practice ACT 3 related lessons
  const practiceAct3Lessons = lessons?.filter(lesson =>
    lesson.title?.toLowerCase().includes('practice') &&
    lesson.title?.toLowerCase().includes('act') &&
    lesson.title?.toLowerCase().includes('3')
  ) || [];

  console.log('\n📋 PRACTICE ACT 3 RELATED LESSONS:');
  if (practiceAct3Lessons.length > 0) {
    practiceAct3Lessons.forEach(lesson => {
      console.log(`  📖 ${lesson.title} (ID: ${lesson.id})`);
      console.log(`     Description: ${lesson.description || 'No description'}`);
    });
  } else {
    console.log('  ❌ No Practice ACT 3 specific lessons found');
  }

  // Check what lesson_ids are used by existing ACT questions
  console.log('\n🔍 CHECKING EXISTING QUESTION LESSON IDs...');

  const sections = [
    { name: 'English', table: 'act_english_questions' },
    { name: 'Math', table: 'act_math_questions' },
    { name: 'Reading', table: 'act_reading_questions' },
    { name: 'Science', table: 'act_science_questions' }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('lesson_id, test_number')
      .not('lesson_id', 'is', null)
      .limit(5);

    console.log(`  📝 ${section.name} sample lesson_ids:`)
    const uniqueLessonIds = [...new Set(questions?.map(q => q.lesson_id) || [])];
    uniqueLessonIds.forEach(lessonId => {
      const testNumbers = [...new Set(questions?.filter(q => q.lesson_id === lessonId).map(q => q.test_number))];
      console.log(`    ${lessonId} (used for test numbers: ${testNumbers.join(', ')})`);
    });
  }

  // Look for the most appropriate lesson_id
  let recommendedLessonId = null;

  if (practiceAct3Lessons.length > 0) {
    recommendedLessonId = practiceAct3Lessons[0].id;
    console.log(`\n✅ RECOMMENDED LESSON_ID: ${recommendedLessonId}`);
    console.log(`   From lesson: "${practiceAct3Lessons[0].title}"`);
  } else {
    // Look for a general ACT practice lesson
    const generalActLessons = lessons?.filter(lesson =>
      lesson.title?.toLowerCase().includes('act') ||
      lesson.title?.toLowerCase().includes('practice')
    ) || [];

    if (generalActLessons.length > 0) {
      recommendedLessonId = generalActLessons[0].id;
      console.log(`\n⚠️  NO SPECIFIC PRACTICE ACT 3 LESSON FOUND`);
      console.log(`✅ RECOMMENDED GENERAL LESSON_ID: ${recommendedLessonId}`);
      console.log(`   From lesson: "${generalActLessons[0].title}"`);
    } else {
      console.log(`\n❌ NO SUITABLE LESSON FOUND`);
      console.log(`📋 ALL AVAILABLE LESSONS:`);
      lessons?.forEach(lesson => {
        console.log(`  📖 ${lesson.title} (ID: ${lesson.id})`);
      });
    }
  }

  return {
    recommendedLessonId,
    availableLessons: lessons,
    practiceAct3Lessons
  };
}

checkLessonIds().catch(console.error);