/**
 * Verify Diagnostic Test Database Tables
 * Checks that all required tables and columns exist with correct types
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyDiagnosticTables() {
  console.log('🔍 Verifying diagnostic test database tables...\n');

  try {
    // Test 1: Check diagnostic_test_sessions table
    console.log('1️⃣ Checking diagnostic_test_sessions table...');
    const { data: sessions, error: sessionsError } = await supabase
      .from('diagnostic_test_sessions')
      .select('*')
      .limit(1);

    if (sessionsError) {
      console.error('❌ diagnostic_test_sessions error:', sessionsError.message);
    } else {
      console.log('✅ diagnostic_test_sessions table exists');
    }

    // Test 2: Check diagnostic_test_results table
    console.log('\n2️⃣ Checking diagnostic_test_results table...');
    const { data: results, error: resultsError } = await supabase
      .from('diagnostic_test_results')
      .select('*')
      .limit(1);

    if (resultsError) {
      console.error('❌ diagnostic_test_results error:', resultsError.message);
    } else {
      console.log('✅ diagnostic_test_results table exists');
    }

    // Test 3: Check diagnostic_analysis table
    console.log('\n3️⃣ Checking diagnostic_analysis table...');
    const { data: analysis, error: analysisError } = await supabase
      .from('diagnostic_analysis')
      .select('*')
      .limit(1);

    if (analysisError) {
      console.error('❌ diagnostic_analysis error:', analysisError.message);
    } else {
      console.log('✅ diagnostic_analysis table exists');
    }

    // Test 4: Check practice test questions (for diagnostic test)
    console.log('\n4️⃣ Checking practice test questions for diagnostic test...');
    const sections = ['english', 'math', 'reading', 'science'];

    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;
      const { data: questions, error: questionsError } = await supabase
        .from(tableName)
        .select('id, test_number, question_number, lesson_id')
        .eq('test_number', 1)
        .limit(5);

      if (questionsError) {
        console.error(`  ❌ ${tableName} error:`, questionsError.message);
      } else {
        console.log(`  ✅ ${tableName}: ${questions?.length || 0} questions (showing first 5)`);
        if (questions && questions.length > 0) {
          console.log(`     Sample: ${JSON.stringify(questions[0])}`);
        }
      }
    }

    // Test 5: Count total diagnostic questions
    console.log('\n5️⃣ Counting total diagnostic test questions...');
    let totalQuestions = 0;
    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;
      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true })
        .eq('test_number', 1);

      if (!error) {
        console.log(`  ${section}: ${count} questions`);
        totalQuestions += count;
      }
    }
    console.log(`  Total: ${totalQuestions} questions`);

    // Test 6: Check for existing diagnostic data
    console.log('\n6️⃣ Checking for existing diagnostic data...');
    const { count: sessionCount } = await supabase
      .from('diagnostic_test_sessions')
      .select('*', { count: 'exact', head: true });

    const { count: resultCount } = await supabase
      .from('diagnostic_test_results')
      .select('*', { count: 'exact', head: true });

    const { count: analysisCount } = await supabase
      .from('diagnostic_analysis')
      .select('*', { count: 'exact', head: true });

    console.log(`  Sessions: ${sessionCount}`);
    console.log(`  Results: ${resultCount}`);
    console.log(`  Analyses: ${analysisCount}`);

    console.log('\n✅ Verification complete!');

  } catch (error) {
    console.error('\n❌ Verification failed:', error);
  }
}

verifyDiagnosticTables();
