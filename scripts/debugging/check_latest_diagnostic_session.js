const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkLatestSession() {
  console.log('=== CHECKING LATEST DIAGNOSTIC TEST SESSION ===\n');

  // Get the most recent session
  const { data: sessions, error: sessionsError } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (sessionsError) {
    console.error('Error fetching sessions:', sessionsError);
    return;
  }

  if (!sessions || sessions.length === 0) {
    console.log('❌ No diagnostic test sessions found!');
    console.log('The test results were not saved to the database.');
    return;
  }

  const session = sessions[0];
  console.log('Latest Diagnostic Session:');
  console.log(`  ID: ${session.id}`);
  console.log(`  User ID: ${session.user_id}`);
  console.log(`  Completed: ${session.completed}`);
  console.log(`  Score: ${session.score_percentage}%`);
  console.log(`  Correct: ${session.correct_answers}/${session.total_questions}`);
  console.log(`  Created: ${session.created_at}`);
  console.log(`  Ended: ${session.session_end}\n`);

  // Get all results for this session
  const { data: results, error: resultsError } = await supabase
    .from('diagnostic_test_results')
    .select('*')
    .eq('diagnostic_session_id', session.id);

  if (resultsError) {
    console.error('Error fetching results:', resultsError);
    return;
  }

  console.log(`Total Results Saved: ${results.length} (should be 215)\n`);

  if (results.length !== 215) {
    console.log(`❌ PROBLEM: Only ${results.length}/215 results were saved!\n`);
  }

  // Get question IDs to look up sections
  const questionIds = results.map(r => r.question_id);
  const sections = ['english', 'math', 'reading', 'science'];
  const sectionCounts = {
    english: 0,
    math: 0,
    reading: 0,
    science: 0,
    unknown: 0
  };

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;
    const { data: questions } = await supabase
      .from(tableName)
      .select('id, question_number, lesson_id')
      .in('id', questionIds);

    if (questions) {
      sectionCounts[section] = questions.length;
      const mapped = questions.filter(q => q.lesson_id).length;
      const unmapped = questions.length - mapped;

      console.log(`${section.toUpperCase()}:`);
      console.log(`  Saved: ${questions.length} questions`);
      console.log(`  Mapped to lessons: ${mapped}`);
      console.log(`  Unmapped: ${unmapped}`);

      if (unmapped > 0) {
        console.log(`  Sample unmapped question numbers:`, questions.filter(q => !q.lesson_id).slice(0, 5).map(q => q.question_number));
      }
      console.log();
    }
  }

  const totalFound = Object.values(sectionCounts).reduce((sum, count) => sum + count, 0);
  console.log(`═══════════════════════════════════════════════════════`);
  console.log(`TOTAL QUESTIONS FOUND: ${totalFound}/215`);
  console.log(`═══════════════════════════════════════════════════════\n`);

  if (totalFound < 215) {
    console.log(`❌ Missing ${215 - totalFound} questions!\n`);
    console.log('This means those questions were NOT saved during the test.');
    console.log('Check the browser console logs during test submission for errors.\n');
  }

  // Check for duplicate question_ids
  const questionIdCounts = {};
  results.forEach(r => {
    questionIdCounts[r.question_id] = (questionIdCounts[r.question_id] || 0) + 1;
  });

  const duplicates = Object.entries(questionIdCounts).filter(([id, count]) => count > 1);
  if (duplicates.length > 0) {
    console.log(`⚠️  Found ${duplicates.length} duplicate question_ids in results!`);
    console.log('Sample duplicates:', duplicates.slice(0, 5));
  }
}

checkLatestSession().then(() => process.exit(0));
