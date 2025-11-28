const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

function reformatQuestionText(problemText, position) {
  if (!problemText) return problemText;

  // Check if this is a Logical Placement question (has [1], [2], [3] sentence markers)
  if (/\[\d+\]\s+[A-Z]/.test(problemText)) {
    // Already has proper bracket format
    return problemText;
  }

  // Add visible bracket number before underlined portions
  let reformatted = problemText.replace(/<u>/gi, `[${position}] <u>`);

  return reformatted;
}

(async () => {
  console.log('PREVIEW: Testing reformatting on sample questions...\n');

  // Get sample questions from different lesson types
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

    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position')
      .limit(3);

    if (questions && questions.length > 0) {
      for (const q of questions) {
        console.log(`\n--- Position ${q.position} ---`);
        console.log('BEFORE:');
        console.log(q.problem_text);
        console.log('\nAFTER:');
        console.log(reformatQuestionText(q.problem_text, q.position));
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('Preview complete. Review the changes above.');
  console.log('If they look correct, run the actual reformat script.');
  console.log('='.repeat(80));
})();
