/**
 * Force generate learning path from existing diagnostic data
 * This script bypasses RLS by checking Supabase dashboard data manually
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Import the actual services
const DiagnosticAnalysisService = require('./src/services/api/diagnostic-analysis.service');
const LearningPathService = require('./src/services/api/learning-path.service');

const supabase = createClient(supabaseUrl, supabaseKey);

async function findDiagnosticData() {
  console.log('🔍 Searching for diagnostic data...\n');

  // Try a direct SQL query to bypass RLS
  console.log('Method 1: Checking via Supabase client...');

  const { data: sessions, error } = await supabase
    .from('diagnostic_test_sessions')
    .select('*');

  console.log('Sessions found:', sessions?.length || 0);

  if (sessions && sessions.length > 0) {
    console.log('\n✅ Found diagnostic session(s):');
    sessions.forEach((s, i) => {
      console.log(`${i + 1}. ID: ${s.id}`);
      console.log(`   User: ${s.user_id}`);
      console.log(`   Completed: ${s.completed}`);
      console.log(`   Score: ${s.score_percentage}%`);
      console.log('');
    });
    return sessions[0];
  }

  console.log('\n⚠️  No sessions found via client.');
  console.log('\n📋 To manually check, run this SQL in Supabase Dashboard:');
  console.log('https://rabavobdklnwvwsldbix.supabase.co/project/_/sql/new');
  console.log('\nSELECT * FROM diagnostic_test_sessions ORDER BY created_at DESC LIMIT 5;');
  console.log('SELECT * FROM diagnostic_test_results LIMIT 10;');
  console.log('SELECT * FROM diagnostic_analysis ORDER BY created_at DESC LIMIT 5;');
  console.log('SELECT * FROM user_learning_paths ORDER BY created_at DESC LIMIT 5;\n');

  return null;
}

async function generateLearningPath(session) {
  console.log('🚀 Generating learning path...\n');

  try {
    // Step 1: Create or get analysis
    console.log('Step 1: Creating diagnostic analysis...');

    const analysis = await DiagnosticAnalysisService.createDiagnosticAnalysis(
      session.user_id,
      session.id
    );

    console.log('✅ Analysis created:', analysis.id);
    console.log(`   Weak lessons: ${analysis.weak_lessons?.length || 0}`);
    console.log(`   Strong lessons: ${analysis.strong_lessons?.length || 0}`);

    // Step 2: Generate learning path
    console.log('\nStep 2: Generating learning path...');

    const learningPath = await LearningPathService.generateLearningPath(
      session.user_id,
      analysis.weak_lessons || [],
      {
        targetScore: 30,
        examDate: null,
        dailyMinutes: 30
      }
    );

    console.log('✅ Learning path created:', learningPath.id);
    console.log(`   Path name: ${learningPath.path_name}`);
    console.log(`   Lessons: ${learningPath.items?.length || 0}`);

    console.log('\n🎉 Success! Learning path generated.');
    console.log('\n📍 Check the app at: http://localhost:3000');

  } catch (err) {
    console.error('❌ Error generating learning path:', err);
    console.error(err.stack);
  }
}

async function main() {
  console.log('🚀 Force Generate Learning Path\n');
  console.log('='.repeat(60) + '\n');

  const session = await findDiagnosticData();

  if (session) {
    await generateLearningPath(session);
  } else {
    console.log('⚠️  Cannot proceed without diagnostic data.');
    console.log('\nOptions:');
    console.log('1. Complete the diagnostic test in the app');
    console.log('2. Check Supabase Dashboard for existing data');
    console.log('3. Provide user_id manually to this script');
  }
}

main().catch(console.error);
