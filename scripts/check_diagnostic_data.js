const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkDiagnosticData() {
  try {
    // First list all users to find the right one
    const { data: allProfiles, error: allError } = await supabase
      .from('profiles')
      .select('id, email')
      .order('created_at', { ascending: false })
      .limit(10);

    if (allError) {
      console.error('Error fetching users:', allError);
      return;
    }

    console.log('\n📋 Recent users:');
    allProfiles.forEach((p, idx) => {
      console.log(`${idx + 1}. ${p.email} (${p.id})`);
    });

    // Get user ID - try to find the user
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .ilike('email', '%cadenchiang%')
      .limit(1)
      .single();

    if (profileError || !profile) {
      console.error('\n❌ User with cadenchiang email not found');
      console.log('Available emails:', allProfiles.map(p => p.email));
      return;
    }

    console.log('\n👤 User found:', profile.email, '- ID:', profile.id);

    // Check diagnostic sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from('diagnostic_test_sessions')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (sessionsError) {
      console.error('Error fetching sessions:', sessionsError);
      return;
    }

    console.log('\n📊 Diagnostic Sessions:', sessions.length);
    sessions.forEach((session, idx) => {
      console.log(`\nSession ${idx + 1}:`);
      console.log('  ID:', session.id);
      console.log('  Created:', session.created_at);
      console.log('  Completed:', session.completed_at);
      console.log('  Correct:', session.correct_answers);
      console.log('  Total:', session.total_questions);
      console.log('  Score %:', session.score_percentage);
    });

    // Check if there are any diagnostic test results
    if (sessions.length > 0) {
      const latestSession = sessions[0];
      const { data: results, error: resultsError } = await supabase
        .from('diagnostic_test_results')
        .select('*')
        .eq('session_id', latestSession.id)
        .limit(10);

      if (resultsError) {
        console.error('Error fetching results:', resultsError);
      } else {
        console.log('\n📝 Sample Results (latest session):', results.length, 'total answers');
        if (results.length > 0) {
          console.log('Sample result:', results[0]);
        }
      }
    }

    // Check diagnostic analysis
    const { data: analysis, error: analysisError } = await supabase
      .from('diagnostic_analysis')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (analysisError) {
      console.error('Error fetching analysis:', analysisError);
    } else {
      console.log('\n📈 Diagnostic Analysis:');
      if (analysis.length > 0) {
        console.log('  Overall Score:', analysis[0].overall_score);
        console.log('  English Score:', analysis[0].english_score);
        console.log('  Math Score:', analysis[0].math_score);
        console.log('  Reading Score:', analysis[0].reading_score);
        console.log('  Science Score:', analysis[0].science_score);
        console.log('  Weak Lessons:', analysis[0].weak_lessons?.length || 0);
      } else {
        console.log('  No analysis found');
      }
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

checkDiagnosticData();
