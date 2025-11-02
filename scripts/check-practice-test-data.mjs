/**
 * Check if practice test data exists in the database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkData() {
  console.log('Checking Practice Test 1 data...\n');

  // Check English questions
  const { data: englishQuestions, error: englishError } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 1);

  console.log('English Questions:', englishQuestions?.length || 0);
  if (englishError) console.error('English Error:', englishError);

  // Check Math questions
  const { data: mathQuestions, error: mathError } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .eq('test_number', 1);

  console.log('Math Questions:', mathQuestions?.length || 0);
  if (mathError) console.error('Math Error:', mathError);

  // Check Reading questions
  const { data: readingQuestions, error: readingError } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .eq('test_number', 1);

  console.log('Reading Questions:', readingQuestions?.length || 0);
  if (readingError) console.error('Reading Error:', readingError);

  // Check Science questions
  const { data: scienceQuestions, error: scienceError } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .eq('test_number', 1);

  console.log('Science Questions:', scienceQuestions?.length || 0);
  if (scienceError) console.error('Science Error:', scienceError);

  console.log('\nTotal:',
    (englishQuestions?.length || 0) +
    (mathQuestions?.length || 0) +
    (readingQuestions?.length || 0) +
    (scienceQuestions?.length || 0)
  );
}

checkData().then(() => process.exit(0));
