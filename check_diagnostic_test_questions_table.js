require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkDiagnosticTestQuestionsTable() {
  console.log('\n🔍 Checking diagnostic_test_questions table\n');

  // Check if table exists and what's in it
  const { data, error, count } = await supabase
    .from('diagnostic_test_questions')
    .select('id, question_number, section, lesson_id', { count: 'exact' })
    .limit(50);

  if (error) {
    console.error('❌ Error querying diagnostic_test_questions:', error);
    return;
  }

  console.log(`📊 Total rows in diagnostic_test_questions: ${count}`);

  if (data && data.length > 0) {
    console.log('\n📋 Sample data:');
    data.slice(0, 10).forEach(q => {
      console.log(`  ID: ${q.id}, Section: ${q.section}, Q#: ${q.question_number}, Lesson: ${q.lesson_id}`);
    });

    // Check for science section
    const scienceQuestions = data.filter(q => q.section === 'science');
    console.log(`\n🔬 Science questions found: ${scienceQuestions.length}`);

    if (scienceQuestions.length > 0) {
      console.log('Science question IDs:', scienceQuestions.map(q => q.id).join(', '));
    }
  } else {
    console.log('⚠️  Table is EMPTY or has no data');
  }

  console.log('\n🔍 Checking if question ID 417 exists in diagnostic_test_questions...');
  const { data: q417 } = await supabase
    .from('diagnostic_test_questions')
    .select('*')
    .eq('id', 417)
    .single();

  if (q417) {
    console.log('✅ Question 417 EXISTS in diagnostic_test_questions');
  } else {
    console.log('❌ Question 417 DOES NOT EXIST in diagnostic_test_questions');
    console.log('   This explains the RLS policy violation!');
  }

  console.log('\n🔍 Checking if question ID 401 (Science Q1) exists...');
  const { data: q401 } = await supabase
    .from('diagnostic_test_questions')
    .select('*')
    .eq('id', 401)
    .single();

  if (q401) {
    console.log('✅ Question 401 EXISTS in diagnostic_test_questions');
  } else {
    console.log('❌ Question 401 DOES NOT EXIST in diagnostic_test_questions');
  }
}

checkDiagnosticTestQuestionsTable()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
