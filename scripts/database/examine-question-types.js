const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  console.log('Examining question types and formats...\n');

  // Get sample from different lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('subject', 'english')
    .in('title', [
      'Topic 1.1 - Building Complete Sentences',
      'Topic 2.4 - Which Choice Questions',
      'Topic 2.6 - Logical Placement'
    ]);

  for (const lesson of lessons) {
    console.log('\n' + '='.repeat(80));
    console.log(`LESSON: ${lesson.title}`);
    console.log('='.repeat(80));

    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .limit(2);

    if (examples && examples.length > 0) {
      const ex = examples[0];
      console.log('\nSample Question 1:');
      console.log('Problem Text:');
      console.log(ex.problem_text);
      console.log('\nChoices:');
      console.log(JSON.stringify(ex.choices, null, 2));
      console.log('\nCorrect:', ex.correct_answer);
    }
  }
})();
