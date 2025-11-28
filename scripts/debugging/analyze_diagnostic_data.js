/**
 * Diagnostic Data Analyzer
 * Analyzes existing diagnostic test results to understand why only 75/215 were saved
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role to bypass RLS
);

async function analyzeDiagnosticData() {
  console.log('🔍 Analyzing diagnostic test data...\n');

  // Get the most recent diagnostic session
  const { data: sessions, error: sessionError } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (sessionError || !sessions || sessions.length === 0) {
    console.error('❌ Error getting diagnostic session:', sessionError);
    return;
  }

  const session = sessions[0];
  console.log('📊 Latest Diagnostic Session:');
  console.log(`   ID: ${session.id}`);
  console.log(`   User: ${session.user_id}`);
  console.log(`   Date: ${session.created_at}`);
  console.log(`   Score: ${session.score_percentage}%`);
  console.log(`   Total Questions: ${session.total_questions}`);
  console.log(`   Correct: ${session.correct_answers}\n`);

  // Get all saved results for this session
  const { data: results, error: resultsError } = await supabase
    .from('diagnostic_test_results')
    .select('*')
    .eq('diagnostic_session_id', session.id);

  if (resultsError) {
    console.error('❌ Error getting results:', resultsError);
    return;
  }

  console.log(`📝 Saved Results: ${results.length} records\n`);

  // Get all question IDs from each section
  const sections = ['english', 'math', 'reading', 'science'];
  const allQuestions = {};
  let totalExpected = 0;

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;
    const { data: questions, error: qError } = await supabase
      .from(tableName)
      .select('id, question_number')
      .eq('test_number', 1)
      .order('question_number', { ascending: true });

    if (!qError && questions) {
      allQuestions[section] = questions;
      totalExpected += questions.length;
      console.log(`✅ ${section}: ${questions.length} questions expected (numbers: ${questions.map(q => q.question_number).join(', ')})`);
    } else {
      console.error(`❌ Error loading ${section}:`, qError);
    }
  }

  console.log(`\n📊 Total Expected: ${totalExpected} questions`);
  console.log(`📊 Total Saved: ${results.length} questions`);
  console.log(`📊 Missing: ${totalExpected - results.length} questions\n`);

  // Analyze which questions were saved by section
  const savedBySection = {
    english: [],
    math: [],
    reading: [],
    science: []
  };

  const savedQuestionIds = new Set(results.map(r => r.question_id));

  for (const section of sections) {
    const sectionQuestions = allQuestions[section] || [];
    const saved = sectionQuestions.filter(q => savedQuestionIds.has(q.id));
    const missing = sectionQuestions.filter(q => !savedQuestionIds.has(q.id));

    savedBySection[section] = saved;

    console.log(`\n${section.toUpperCase()}:`);
    console.log(`   Expected: ${sectionQuestions.length} questions`);
    console.log(`   Saved: ${saved.length} questions`);
    console.log(`   Missing: ${missing.length} questions`);

    if (missing.length > 0 && missing.length < 50) {
      console.log(`   Missing question numbers: ${missing.map(q => q.question_number).join(', ')}`);
    }
  }

  // Check if there's a pattern in the missing questions
  console.log('\n🔍 Analysis:');
  const englishSaved = savedBySection.english.length;
  const mathSaved = savedBySection.math.length;
  const readingSaved = savedBySection.reading.length;
  const scienceSaved = savedBySection.science.length;

  if (readingSaved === 0 && scienceSaved === 0) {
    console.log('❌ CRITICAL: No Reading or Science questions were saved!');
    console.log('   This suggests the test flow didn\'t save results for these sections.');
  }

  if (englishSaved < allQuestions.english.length) {
    console.log(`⚠️  Only ${englishSaved}/${allQuestions.english.length} English questions saved`);
  }

  if (mathSaved < allQuestions.math.length) {
    console.log(`⚠️  Only ${mathSaved}/${allQuestions.math.length} Math questions saved`);
  }

  console.log('\n✅ Analysis complete!');
}

analyzeDiagnosticData().catch(console.error);
