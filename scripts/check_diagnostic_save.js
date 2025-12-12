/**
 * Check Diagnostic Data Storage
 *
 * This script checks if diagnostic test data is being saved correctly
 *
 * To run in browser console after completing a diagnostic:
 * 1. Open browser console (F12)
 * 2. Copy and paste this entire code
 * 3. Review the output to see what was saved
 */

(async function checkDiagnosticStorage() {
  console.log('🔍 ===== DIAGNOSTIC DATA STORAGE CHECK =====\n');

  // Get Supabase client
  const { supabase } = await import('./src/services/api/supabase.service.js');
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('❌ No user logged in!');
    return;
  }

  console.log('👤 User:', user.email);
  console.log('🆔 User ID:', user.id);
  console.log('');

  // Check diagnostic sessions
  console.log('📊 Checking diagnostic_test_sessions table...');
  const { data: sessions, error: sessionsError } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (sessionsError) {
    console.error('❌ Error fetching sessions:', sessionsError);
    return;
  }

  console.log(`   Found ${sessions.length} session(s)`);

  if (sessions.length === 0) {
    console.error('❌ No diagnostic sessions found for this user!');
    console.log('   This means no diagnostic test has been started or saved.');
    return;
  }

  // Check latest session
  const latestSession = sessions[0];
  console.log('\n📋 Latest Diagnostic Session:');
  console.log('   ID:', latestSession.id);
  console.log('   Completed:', latestSession.completed);
  console.log('   Total Questions:', latestSession.total_questions);
  console.log('   Correct Answers:', latestSession.correct_answers);
  console.log('   Score %:', latestSession.score_percentage);
  console.log('   Created:', new Date(latestSession.created_at).toLocaleString());
  console.log('   Session End:', latestSession.session_end ? new Date(latestSession.session_end).toLocaleString() : 'Not ended');

  if (!latestSession.completed) {
    console.warn('⚠️  WARNING: Latest session is not marked as completed!');
  }

  // Check diagnostic results
  console.log('\n📝 Checking diagnostic_test_results table...');
  const { data: results, error: resultsError } = await supabase
    .from('diagnostic_test_results')
    .select('*')
    .eq('diagnostic_session_id', latestSession.id);

  if (resultsError) {
    console.error('❌ Error fetching results:', resultsError);
    return;
  }

  console.log(`   Found ${results.length} answer(s) saved`);
  console.log(`   Expected: 215 (75 English + 60 Math + 40 Reading + 40 Science)`);

  if (results.length === 0) {
    console.error('❌ NO ANSWERS SAVED! This is the problem.');
    console.log('   The diagnostic test completed but no answers were recorded.');
    console.log('   This could happen if:');
    console.log('   1. Network connection was lost during processing');
    console.log('   2. Browser tab was closed before processing finished');
    console.log('   3. There was an error in the save process');
    return;
  }

  // Break down by section
  const sections = ['english', 'math', 'reading', 'science'];
  const questionDetails = new Map();

  console.log('\n🔍 Fetching question details to determine sections...');
  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;
    const questionIds = results.map(r => r.question_id);

    const { data: sectionQuestions } = await supabase
      .from(tableName)
      .select('id, question_number, section')
      .in('id', questionIds);

    if (sectionQuestions) {
      sectionQuestions.forEach(q => {
        questionDetails.set(q.id, { section, question_number: q.question_number });
      });
    }
  }

  // Count by section
  const sectionCounts = {
    english: 0,
    math: 0,
    reading: 0,
    science: 0
  };

  const sectionCorrect = {
    english: 0,
    math: 0,
    reading: 0,
    science: 0
  };

  results.forEach(result => {
    const details = questionDetails.get(result.question_id);
    if (details) {
      sectionCounts[details.section]++;
      if (result.is_correct) {
        sectionCorrect[details.section]++;
      }
    }
  });

  console.log('\n📊 Results by Section:');
  console.log('   English:  ', sectionCounts.english, '/', 75, `(${sectionCorrect.english} correct)`);
  console.log('   Math:     ', sectionCounts.math, '/', 60, `(${sectionCorrect.math} correct)`);
  console.log('   Reading:  ', sectionCounts.reading, '/', 40, `(${sectionCorrect.reading} correct)`);
  console.log('   Science:  ', sectionCounts.science, '/', 40, `(${sectionCorrect.science} correct)`);
  console.log('   TOTAL:    ', results.length, '/', 215);

  const missingSections = [];
  if (sectionCounts.english < 75) missingSections.push(`English (${75 - sectionCounts.english} missing)`);
  if (sectionCounts.math < 60) missingSections.push(`Math (${60 - sectionCounts.math} missing)`);
  if (sectionCounts.reading < 40) missingSections.push(`Reading (${40 - sectionCounts.reading} missing)`);
  if (sectionCounts.science < 40) missingSections.push(`Science (${40 - sectionCounts.science} missing)`);

  if (missingSections.length > 0) {
    console.warn('\n⚠️  MISSING DATA:',missingSections.join(', '));
  }

  // Check diagnostic analysis
  console.log('\n🎯 Checking diagnostic_analysis table...');
  const { data: analysis, error: analysisError } = await supabase
    .from('diagnostic_analysis')
    .select('*')
    .eq('session_id', latestSession.id)
    .maybeSingle();

  if (analysisError) {
    console.error('❌ Error fetching analysis:', analysisError);
  } else if (!analysis) {
    console.warn('⚠️  No analysis found for this session');
  } else {
    console.log('   Overall Score:', analysis.overall_score);
    console.log('   English Score:', analysis.english_score);
    console.log('   Math Score:', analysis.math_score);
    console.log('   Reading Score:', analysis.reading_score);
    console.log('   Science Score:', analysis.science_score);
    console.log('   Weak Lessons:', analysis.weak_lessons?.length || 0);
  }

  // Summary
  console.log('\n🎯 SUMMARY:');
  if (results.length === 215 && latestSession.completed && analysis) {
    console.log('✅ All data saved correctly!');
    console.log('   - Session completed: ✓');
    console.log('   - All 215 answers saved: ✓');
    console.log('   - Analysis generated: ✓');
    console.log('\nIf you still see "No Data", try:');
    console.log('1. Clear browser cache (Ctrl+Shift+Delete)');
    console.log('2. Refresh the page');
    console.log('3. Navigate away and back to /app/insights');
  } else {
    console.error('❌ Data incomplete!');
    if (!latestSession.completed) console.log('   - Session not completed');
    if (results.length < 215) console.log(`   - Only ${results.length}/215 answers saved`);
    if (!analysis) console.log('   - No analysis generated');
    console.log('\nRECOMMENDATION: Retake the diagnostic test');
  }

  console.log('\n🔍 ===== END OF CHECK =====');
})();
