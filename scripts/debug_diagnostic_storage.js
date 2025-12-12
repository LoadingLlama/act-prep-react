/**
 * Debug Diagnostic Storage
 * Run this in the browser console while logged in as cadenchiangjunk@gmail.com
 * to check what diagnostic data exists
 */

// Paste this into browser console:
console.log('🔍 Checking diagnostic data for current user...');

// Check current user
const user = JSON.parse(localStorage.getItem('sb-YOUR_PROJECT_REF-auth-token'))?.user;
console.log('Current user:', user?.email, user?.id);

// Check diagnostic session
const checkDiagnostic = async () => {
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );

  // Get diagnostic sessions
  const { data: sessions, error } = await supabase
    .from('diagnostic_test_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  console.log('📊 Diagnostic sessions:', sessions);

  if (sessions && sessions.length > 0) {
    const latestSession = sessions[0];

    // Check results
    const { data: results } = await supabase
      .from('diagnostic_test_results')
      .select('count')
      .eq('session_id', latestSession.id);

    console.log('📝 Total answers saved:', results);

    // Check analysis
    const { data: analysis } = await supabase
      .from('diagnostic_analysis')
      .select('*')
      .eq('session_id', latestSession.id)
      .single();

    console.log('📈 Analysis:', analysis);
  }
};

checkDiagnostic();
