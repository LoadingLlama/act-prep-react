/**
 * Check Practice Test 1 questions structure
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTest1Questions() {
  console.log('=== PRACTICE TEST #1 QUESTIONS ===\n');

  // Check English questions
  const { data: englishQuestions } = await supabase
    .from('practice_test_english_questions')
    .select('id, question_number, question_type, chapter')
    .eq('test_number', 1)
    .order('question_number');

  console.log('ENGLISH QUESTIONS:', englishQuestions?.length || 0);
  if (englishQuestions && englishQuestions.length > 0) {
    console.log('Sample:', englishQuestions.slice(0, 3));
  }
  console.log();

  // Check Math questions
  const { data: mathQuestions } = await supabase
    .from('practice_test_math_questions')
    .select('id, question_number, question_type, chapter')
    .eq('test_number', 1)
    .order('question_number');

  console.log('MATH QUESTIONS:', mathQuestions?.length || 0);
  if (mathQuestions && mathQuestions.length > 0) {
    console.log('Sample:', mathQuestions.slice(0, 3));
  }
  console.log();

  // Check Reading questions
  const { data: readingQuestions } = await supabase
    .from('practice_test_reading_questions')
    .select('id, question_number, question_type, chapter')
    .eq('test_number', 1)
    .order('question_number');

  console.log('READING QUESTIONS:', readingQuestions?.length || 0);
  if (readingQuestions && readingQuestions.length > 0) {
    console.log('Sample:', readingQuestions.slice(0, 3));
  }
  console.log();

  // Check Science questions
  const { data: scienceQuestions } = await supabase
    .from('practice_test_science_questions')
    .select('id, question_number, question_type, chapter')
    .eq('test_number', 1)
    .order('question_number');

  console.log('SCIENCE QUESTIONS:', scienceQuestions?.length || 0);
  if (scienceQuestions && scienceQuestions.length > 0) {
    console.log('Sample:', scienceQuestions.slice(0, 3));
  }
  console.log();

  console.log('TOTAL QUESTIONS:',
    (englishQuestions?.length || 0) +
    (mathQuestions?.length || 0) +
    (readingQuestions?.length || 0) +
    (scienceQuestions?.length || 0)
  );
}

checkTest1Questions().then(() => process.exit(0));
