const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const lessonsNeedingQuestions = [
  { key: 'logical-placement', needed: 14 },
  { key: 'misc-topics', needed: 1 },
  { key: 'redundancy', needed: 13 },
  { key: 'transitions', needed: 13 },
  { key: 'which-choice', needed: 16 },
  { key: 'word-choice', needed: 13 }
];

async function examineStyles() {
  console.log('='.repeat(80));
  console.log('EXAMINING QUESTION STYLES FOR EACH LESSON');
  console.log('='.repeat(80));

  for (const lesson of lessonsNeedingQuestions) {
    const { data: lessonData } = await supabase.from('lessons').select('id, title').eq('lesson_key', lesson.key).single();
    const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lessonData.id).order('position').limit(3);

    console.log(`\n${'='.repeat(80)}`);
    console.log(`${lesson.key.toUpperCase()} - Current: ${questions.length} total, Need: ${lesson.needed} more`);
    console.log(`Lesson: ${lessonData.title}`);
    console.log('='.repeat(80));

    // Show first 2 questions as examples
    for (let i = 0; i < Math.min(2, questions.length); i++) {
      const q = questions[i];
      console.log(`\nPosition ${q.position}: ${q.title}`);
      console.log('-'.repeat(80));
      console.log('Problem Text:');
      console.log(q.problem_text.substring(0, 300) + (q.problem_text.length > 300 ? '...' : ''));
      console.log('\nChoices:');
      q.choices.forEach(c => console.log(`  ${c.letter}. ${c.text.substring(0, 60)}${c.text.length > 60 ? '...' : ''}`));
      console.log('\nSample Explanation (Choice A):');
      console.log(q.choices[0].explanation);
    }
  }
}

examineStyles();
