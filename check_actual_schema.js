/**
 * Check actual database schema for lessons and diagnostic tables
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkActualSchema() {
  console.log('🔍 Checking actual database schema...\n');

  try {
    // Check lessons table
    console.log('1️⃣ Checking lessons table...');
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .limit(3);

    if (lessonsError) {
      console.error('  ❌ Error:', lessonsError.message);
    } else if (lessons && lessons.length > 0) {
      console.log('  ✅ Sample lesson:');
      console.log('  ', JSON.stringify(lessons[0], null, 2).split('\n').join('\n  '));
      console.log(`  Total columns: ${Object.keys(lessons[0]).length}`);
      console.log(`  Columns: ${Object.keys(lessons[0]).join(', ')}`);
      console.log(`  ID type: ${typeof lessons[0].id}`);
      console.log(`  ID value: ${lessons[0].id}`);
    } else {
      console.log('  ⚠️ No lessons found in database');
    }

    // Check practice test questions
    console.log('\n2️⃣ Checking practice_test_english_questions...');
    const { data: questions, error: questionsError } = await supabase
      .from('practice_test_english_questions')
      .select('*')
      .eq('test_number', 1)
      .limit(1);

    if (questionsError) {
      console.error('  ❌ Error:', questionsError.message);
    } else if (questions && questions.length > 0) {
      console.log('  ✅ Sample question:');
      console.log(`  Columns: ${Object.keys(questions[0]).join(', ')}`);
      console.log(`  Has lesson_id column: ${questions[0].hasOwnProperty('lesson_id')}`);
      if (questions[0].lesson_id !== undefined) {
        console.log(`  lesson_id value: ${questions[0].lesson_id}`);
      }
    } else {
      console.log('  ⚠️ No questions found');
    }

    // Check diagnostic_test_results
    console.log('\n3️⃣ Checking diagnostic_test_results table structure...');
    const { data: results, error: resultsError } = await supabase
      .from('diagnostic_test_results')
      .select('*')
      .limit(1);

    if (resultsError) {
      console.error('  ❌ Error:', resultsError.message);
    } else {
      console.log('  ✅ Table exists');
      if (results && results.length > 0) {
        console.log(`  Columns: ${Object.keys(results[0]).join(', ')}`);
      } else {
        console.log('  No data yet (table is empty)');
      }
    }

    // Check diagnostic_analysis
    console.log('\n4️⃣ Checking diagnostic_analysis table...');
    const { data: analysis, error: analysisError } = await supabase
      .from('diagnostic_analysis')
      .select('*')
      .limit(1);

    if (analysisError) {
      console.error('  ❌ Error:', analysisError.message);
    } else {
      console.log('  ✅ Table exists');
      if (analysis && analysis.length > 0) {
        console.log(`  Columns: ${Object.keys(analysis[0]).join(', ')}`);
      } else {
        console.log('  No data yet (table is empty)');
      }
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

checkActualSchema();
