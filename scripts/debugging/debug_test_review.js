const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

(async () => {
  console.log('Debugging Test Review Issue...\n');

  const { data: sessions, error: sessionsError } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .order('created_at', { ascending: false });

  if (sessionsError) {
    console.error('Error fetching sessions:', sessionsError);
    return;
  }

  const sessionCount = sessions ? sessions.length : 0;
  console.log('Found ' + sessionCount + ' diagnostic test sessions\n');

  if (!sessions || sessions.length === 0) {
    console.log('No diagnostic sessions found.');
    return;
  }

  const latestSession = sessions[0];
  console.log('Latest session ID:', latestSession.id);
  console.log('Created at:', latestSession.created_at);
  console.log('Score:', latestSession.score_percentage + '%');

  const { data: results, error: resultsError } = await supabase
    .from('diagnostic_test_results')
    .select('*')
    .eq('diagnostic_session_id', latestSession.id);

  if (resultsError) {
    console.error('Error fetching results:', resultsError);
    return;
  }

  const resultCount = results ? results.length : 0;
  console.log('\nFound ' + resultCount + ' results for this session');
  console.log('Expected: 215 questions\n');

  if (!results || results.length === 0) {
    console.log('PROBLEM: No results saved!');
    console.log('Solution: Retake diagnostic test');
    return;
  }

  if (results.length < 215) {
    console.log('WARNING: Only ' + results.length + '/215 saved!');
  }

  const questionIds = results.map(r => r.question_id);
  console.log('Sample question IDs:', questionIds.slice(0, 10));
  
  console.log('\nChecking if question details can be loaded...\n');
  
  const sections = ['english', 'math', 'reading', 'science'];
  let totalFound = 0;
  
  for (const section of sections) {
    const tableName = 'practice_test_' + section + '_questions';
    const { data: sectionQuestions } = await supabase
      .from(tableName)
      .select('id, question_number, question_text')
      .in('id', questionIds)
      .limit(5);

    const count = sectionQuestions ? sectionQuestions.length : 0;
    totalFound += count;
    console.log(section + ': Found ' + count + ' questions');
  }

  console.log('\nTotal question details found: ' + totalFound + '/' + resultCount);

  if (totalFound === 0) {
    console.log('\nPROBLEM: Question IDs do not match!');
    console.log('You took the test BEFORE running SQL fixes.');
    console.log('SOLUTION: Run SQL fixes and retake test.');
  } else if (totalFound < resultCount) {
    console.log('\nPartial match. Some questions missing.');
  } else {
    console.log('\nAll questions found! Review should work.');
  }
})();
