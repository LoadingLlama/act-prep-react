const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

async function examineQuestions() {
  console.log('='.repeat(80));
  console.log('EXAMINING QUESTIONS WITH GENERIC UNDERLINED TEXT');
  console.log('='.repeat(80));

  const questionsToCheck = [
    { lesson: 'adding-deleting', position: 46 },
    { lesson: 'adding-deleting', position: 47 },
    { lesson: 'logical-placement', position: 20 }
  ];

  for (const { lesson, position } of questionsToCheck) {
    const { data: lessonData } = await supabase.from('lessons').select('id').eq('lesson_key', lesson).single();
    const { data: q } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lessonData.id).eq('position', position).single();

    console.log(`\n${lesson.toUpperCase()} - Position ${position}`);
    console.log('-'.repeat(80));
    console.log('Title:', q.title);
    console.log('\nProblem Text:');
    console.log(q.problem_text);
    console.log('\nChoices:');
    q.choices.forEach(c => console.log(`  ${c.letter}. ${c.text}`));
    console.log('\n' + '='.repeat(80));
  }
}

examineQuestions();
