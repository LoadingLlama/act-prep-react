/**
 * Reset Diagnostic Test
 * Clears all diagnostic test data for the current user
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetDiagnostic() {
  console.log('🔄 Starting diagnostic test reset...\n');

  try {
    // Get the current user from localStorage (we'll need to pass this)
    // For now, we'll delete ALL diagnostic sessions (you can filter by user_id if needed)

    console.log('📊 Fetching all diagnostic sessions...');
    const { data: sessions, error: fetchError } = await supabase
      .from('diagnostic_test_sessions')
      .select('*');

    if (fetchError) {
      console.error('❌ Error fetching sessions:', fetchError);
      return;
    }

    console.log(`Found ${sessions?.length || 0} diagnostic sessions\n`);

    if (!sessions || sessions.length === 0) {
      console.log('✅ No diagnostic sessions to delete');
      return;
    }

    // Display sessions
    sessions.forEach((session, index) => {
      console.log(`Session ${index + 1}:`);
      console.log(`  ID: ${session.id}`);
      console.log(`  User ID: ${session.user_id}`);
      console.log(`  Section: ${session.section || 'All sections'}`);
      console.log(`  Completed: ${session.completed}`);
      console.log(`  Score: ${session.score_percentage}%`);
      console.log('');
    });

    // Delete diagnostic_analysis records first (due to foreign key constraints)
    console.log('🗑️  Deleting diagnostic analysis records...');
    const { error: analysisError } = await supabase
      .from('diagnostic_analysis')
      .delete()
      .in('diagnostic_session_id', sessions.map(s => s.id));

    if (analysisError) {
      console.error('❌ Error deleting analysis:', analysisError);
    } else {
      console.log('✅ Deleted diagnostic analysis records\n');
    }

    // Delete diagnostic_test_results
    console.log('🗑️  Deleting diagnostic test results...');
    const { error: resultsError } = await supabase
      .from('diagnostic_test_results')
      .delete()
      .in('diagnostic_session_id', sessions.map(s => s.id));

    if (resultsError) {
      console.error('❌ Error deleting results:', resultsError);
    } else {
      console.log('✅ Deleted diagnostic test results\n');
    }

    // Delete diagnostic_test_sessions
    console.log('🗑️  Deleting diagnostic test sessions...');
    const { error: sessionsError } = await supabase
      .from('diagnostic_test_sessions')
      .delete()
      .in('id', sessions.map(s => s.id));

    if (sessionsError) {
      console.error('❌ Error deleting sessions:', sessionsError);
    } else {
      console.log('✅ Deleted diagnostic test sessions\n');
    }

    console.log('✅ Diagnostic test reset complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Clear browser localStorage (diagnosticProcessing flag)');
    console.log('   2. Refresh the page');
    console.log('   3. You should see the locked Learning Path');
    console.log('   4. Take the diagnostic test again from the Insights page\n');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

resetDiagnostic();
