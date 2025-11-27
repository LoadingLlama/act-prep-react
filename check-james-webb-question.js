const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

async function checkQuestion() {
  const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', 'adding-deleting').single();
  const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id).order('position');

  // Find the James Webb question
  const jwQuestion = questions.find(q => (q.problem_text || '').includes('James Webb'));

  if (jwQuestion) {
    console.log('Found James Webb question at position:', jwQuestion.position);
    console.log('\n=== PROBLEM TEXT ===');
    console.log(jwQuestion.problem_text);
    console.log('\n=== LENGTH:', jwQuestion.problem_text.length);
    console.log('\n=== TITLE ===');
    console.log(jwQuestion.title);
  } else {
    console.log('James Webb question not found');
  }
}

checkQuestion();
