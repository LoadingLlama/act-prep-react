#!/usr/bin/env node

/**
 * Analyze Practice Tests 1-7 to understand exact ACT patterns
 * This will help us generate authentic questions
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function analyzePracticeTests() {
  console.log('📊 Analyzing Practice Tests 1-7 for ACT patterns...\n');

  // 1. Get all lessons
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('*')
    .in('subject', ['English', 'Math', 'Reading', 'Science'])
    .order('subject', { ascending: true })
    .order('lesson_key', { ascending: true });

  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError);
    return;
  }

  console.log(`✅ Found ${lessons.length} lessons across all subjects\n`);

  // Group by subject
  const lessonsBySubject = {
    English: lessons.filter(l => l.subject === 'English'),
    Math: lessons.filter(l => l.subject === 'Math'),
    Reading: lessons.filter(l => l.subject === 'Reading'),
    Science: lessons.filter(l => l.subject === 'Science')
  };

  console.log('📚 Lessons by Subject:');
  Object.entries(lessonsBySubject).forEach(([subject, subjectLessons]) => {
    console.log(`  ${subject}: ${subjectLessons.length} lessons`);
  });
  console.log();

  // 2. Analyze English questions
  const { data: englishQuestions, error: engError } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  if (!engError && englishQuestions) {
    console.log(`📝 ENGLISH: ${englishQuestions.length} questions total`);

    // Analyze question types
    const questionTypes = {};
    const lessonDistribution = {};

    englishQuestions.forEach(q => {
      questionTypes[q.question_type] = (questionTypes[q.question_type] || 0) + 1;
      lessonDistribution[q.lesson_id] = (lessonDistribution[q.lesson_id] || 0) + 1;
    });

    console.log('  Question Types:');
    Object.entries(questionTypes).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
      console.log(`    ${type || 'untagged'}: ${count} (${((count/englishQuestions.length)*100).toFixed(1)}%)`);
    });
    console.log();
  }

  // 3. Analyze English passages
  const { data: englishPassages } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  if (englishPassages) {
    console.log(`  Passages: ${englishPassages.length} total`);
    const passageTypes = {};
    englishPassages.forEach(p => {
      passageTypes[p.passage_type] = (passageTypes[p.passage_type] || 0) + 1;
    });
    console.log('  Passage Types:');
    Object.entries(passageTypes).forEach(([type, count]) => {
      console.log(`    ${type}: ${count}`);
    });
    console.log();
  }

  // 4. Analyze Math questions
  const { data: mathQuestions } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  if (mathQuestions) {
    console.log(`🔢 MATH: ${mathQuestions.length} questions total`);

    const questionTypes = {};
    mathQuestions.forEach(q => {
      questionTypes[q.question_type] = (questionTypes[q.question_type] || 0) + 1;
    });

    console.log('  Question Types:');
    Object.entries(questionTypes).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([type, count]) => {
      console.log(`    ${type || 'untagged'}: ${count} (${((count/mathQuestions.length)*100).toFixed(1)}%)`);
    });
    console.log();
  }

  // 5. Analyze Reading
  const { data: readingQuestions } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  const { data: readingPassages } = await supabase
    .from('practice_test_reading_passages')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  if (readingQuestions && readingPassages) {
    console.log(`📖 READING: ${readingQuestions.length} questions, ${readingPassages.length} passages`);

    const passageTypes = {};
    readingPassages.forEach(p => {
      passageTypes[p.passage_type] = (passageTypes[p.passage_type] || 0) + 1;
    });
    console.log('  Passage Types:');
    Object.entries(passageTypes).forEach(([type, count]) => {
      console.log(`    ${type}: ${count}`);
    });
    console.log();
  }

  // 6. Analyze Science
  const { data: scienceQuestions } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  const { data: sciencePassages } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  if (scienceQuestions && sciencePassages) {
    console.log(`🔬 SCIENCE: ${scienceQuestions.length} questions, ${sciencePassages.length} passages`);

    const passageTypes = {};
    sciencePassages.forEach(p => {
      passageTypes[p.passage_type] = (passageTypes[p.passage_type] || 0) + 1;
    });
    console.log('  Passage Types:');
    Object.entries(passageTypes).forEach(([type, count]) => {
      console.log(`    ${type}: ${count}`);
    });
    console.log();
  }

  console.log('✅ Analysis complete!');
}

analyzePracticeTests().catch(console.error);
