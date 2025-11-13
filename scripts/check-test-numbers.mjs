/**
 * Check which test numbers exist in the database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTestNumbers() {
  console.log('=== CHECKING TEST NUMBERS ===\n');

  // Check English questions for test numbers
  const { data: englishData } = await supabase
    .from('practice_test_english_questions')
    .select('test_number, question_number, question_type, chapter')
    .order('test_number, question_number')
    .limit(10);

  console.log('English questions sample:');
  console.log(englishData);
  console.log();

  // Get unique test numbers
  const { data: allEnglish } = await supabase
    .from('practice_test_english_questions')
    .select('test_number');

  const uniqueTests = [...new Set(allEnglish.map(q => q.test_number))].sort((a, b) => a - b);
  console.log('Unique test numbers:', uniqueTests);
  console.log();

  // Count by test number
  for (const testNum of uniqueTests) {
    const { count: englishCount } = await supabase
      .from('practice_test_english_questions')
      .select('*', { count: 'exact', head: true })
      .eq('test_number', testNum);

    const { count: mathCount } = await supabase
      .from('practice_test_math_questions')
      .select('*', { count: 'exact', head: true })
      .eq('test_number', testNum);

    const { count: readingCount } = await supabase
      .from('practice_test_reading_questions')
      .select('*', { count: 'exact', head: true })
      .eq('test_number', testNum);

    const { count: scienceCount } = await supabase
      .from('practice_test_science_questions')
      .select('*', { count: 'exact', head: true })
      .eq('test_number', testNum);

    console.log(`Test #${testNum}:`);
    console.log(`  English: ${englishCount}, Math: ${mathCount}, Reading: ${readingCount}, Science: ${scienceCount}`);
    console.log(`  Total: ${englishCount + mathCount + readingCount + scienceCount}`);
  }
}

checkTestNumbers().then(() => process.exit(0));
