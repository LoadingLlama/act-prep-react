const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const FRACTIONS_LESSON_ID = 'a8cd8513-f0a8-4bb1-9890-f21dc053939a';

async function checkQuestions() {
  const { data, error } = await supabase
    .from('practice_questions')
    .select('position, difficulty, problem_text')
    .eq('lesson_id', FRACTIONS_LESSON_ID)
    .order('position');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`\nFound ${data.length} questions in Fractions lesson:\n`);

  const easy = data.filter(q => q.difficulty === 'easy').length;
  const medium = data.filter(q => q.difficulty === 'medium').length;
  const hard = data.filter(q => q.difficulty === 'hard').length;

  console.log(`Easy: ${easy}`);
  console.log(`Medium: ${medium}`);
  console.log(`Hard: ${hard}`);

  console.log('\nFirst few questions:');
  data.slice(0, 5).forEach(q => {
    console.log(`Q${q.position} (${q.difficulty}): ${q.problem_text.substring(0, 40)}...`);
  });
}

checkQuestions().catch(console.error);
