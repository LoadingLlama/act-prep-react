const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  const allEnglishLessons = [
    'adding-deleting', 'commas', 'logical-placement', 'misc-topics',
    'modifiers', 'parallel-structure', 'pronouns', 'punctuation',
    'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'
  ];

  let totalRemaining = 0;
  const remaining = [];

  for (const lessonKey of allEnglishLessons) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id);

    for (const q of questions) {
      if (!q.problem_text) continue;

      const bracketMatches = [...q.problem_text.matchAll(/\[([^\]]+)\]/g)];

      for (const match of bracketMatches) {
        const content = match[1];
        // Skip structural markers
        if (content.match(/^(NEW SENTENCE|\d+|Sentence \d+|PROPOSED)$/i)) {
          continue;
        }

        totalRemaining++;
        remaining.push({
          lesson: lessonKey,
          position: q.position,
          title: q.title,
          bracket: match[0],
          id: q.id
        });
        break; // Only count once per question
      }
    }
  }

  console.log(`Remaining questions with content bracket placeholders: ${totalRemaining}\n`);

  const byLesson = {};
  remaining.forEach(q => {
    if (!byLesson[q.lesson]) byLesson[q.lesson] = [];
    byLesson[q.lesson].push(q);
  });

  for (const [lesson, questions] of Object.entries(byLesson)) {
    console.log(`\n${lesson} (${questions.length} questions):`);
    questions.slice(0, 5).forEach(q => {
      console.log(`  Position ${q.position}: ${q.title}`);
      console.log(`    Bracket: ${q.bracket}`);
    });
    if (questions.length > 5) {
      console.log(`  ... and ${questions.length - 5} more`);
    }
  }

  if (totalRemaining > 0) {
    console.log('\n\nAll remaining bracket IDs:');
    console.log(JSON.stringify(remaining.map(q => q.id), null, 2));
  }
})();
