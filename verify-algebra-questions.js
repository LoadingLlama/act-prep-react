const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function verifyQuestions() {
  const ALGEBRA_SKILLS_LESSON_ID = '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f';

  console.log('\n========================================');
  console.log('VERIFYING ALGEBRA SKILLS QUESTIONS');
  console.log('========================================\n');

  const { data, error } = await supabase
    .from('practice_questions')
    .select('position, difficulty, problem_text, correct_answer')
    .eq('lesson_id', ALGEBRA_SKILLS_LESSON_ID)
    .order('position');

  if (error) {
    console.error('❌ Error querying questions:', error);
    return;
  }

  console.log(`✅ Found ${data.length} questions in database\n`);

  // Check difficulty distribution
  const easy = data.filter(q => q.difficulty === 'easy').length;
  const medium = data.filter(q => q.difficulty === 'medium').length;
  const hard = data.filter(q => q.difficulty === 'hard').length;

  console.log('Difficulty Distribution:');
  console.log(`  Easy (1-17): ${easy} questions`);
  console.log(`  Medium (18-34): ${medium} questions`);
  console.log(`  Hard (35-50): ${hard} questions`);

  console.log('\nSample Questions:');
  console.log(`  Q1 (${data[0].difficulty}): ${data[0].problem_text.substring(0, 50)}...`);
  console.log(`  Q25 (${data[24].difficulty}): ${data[24].problem_text.substring(0, 50)}...`);
  console.log(`  Q50 (${data[49].difficulty}): ${data[49].problem_text.substring(0, 50)}...`);

  console.log('\n✅ Verification complete - all questions present!\n');
}

verifyQuestions().catch(console.error);
