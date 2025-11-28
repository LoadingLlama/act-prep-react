const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 6 questions that reference "previous two sentences" without showing them
const questionIdsToDelete = [
  'f6beb146-123f-46cf-8bc5-09691ed65c4e', // redundancy - pos 31
  'ae25f3da-0818-43fe-9358-088aa671c267', // transitions - pos 31
  'd1eb1feb-3c60-4356-9397-eb09a22a8229', // which-choice - pos 31
  '9d9c5bb1-79f6-43d3-9d1c-43d343ffc696', // adding-deleting - pos 31
  '9b8a25c7-259b-4643-8fca-979ee7b7994c', // word-choice - pos 31
  'e40c1f3a-bab7-4c8c-84cb-4fc26566ad06'  // logical-placement - pos 31
];

async function deleteSentencePatternQuestions() {
  console.log('Deleting 6 incomplete sentence pattern questions...\\n');
  console.log('='.repeat(80));

  let deletedCount = 0;
  let errorCount = 0;

  for (const id of questionIdsToDelete) {
    const { data: question } = await supabase
      .from('lesson_examples')
      .select('title, position, lessons(lesson_key)')
      .eq('id', id)
      .single();

    if (!question) {
      console.log(`  ⚠️  Question not found: ${id}`);
      continue;
    }

    const { error } = await supabase
      .from('lesson_examples')
      .delete()
      .eq('id', id);

    if (error) {
      console.log(`  ✗ Failed: ${question.lessons.lesson_key} - ${question.title} - ${error.message}`);
      errorCount++;
    } else {
      console.log(`  ✓ Deleted: ${question.lessons.lesson_key} - ${question.title} (position ${question.position})`);
      deletedCount++;
    }
  }

  console.log('\\n' + '='.repeat(80));
  console.log(`✓ Successfully deleted: ${deletedCount} questions`);
  console.log(`✗ Errors: ${errorCount} questions`);
  console.log('='.repeat(80));

  // Check final counts
  console.log('\\nFinal question counts per lesson:\\n');

  const lessons = [
    'adding-deleting', 'commas', 'logical-placement', 'misc-topics',
    'modifiers', 'parallel-structure', 'pronouns', 'punctuation',
    'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'
  ];

  let totalQuestions = 0;
  for (const lessonKey of lessons) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    const { count } = await supabase
      .from('lesson_examples')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', lesson.id);

    totalQuestions += count;
    const status = count >= 40 ? '✓' : '⚠️ ';
    console.log(`  ${status} ${lessonKey.padEnd(20)} - ${count} questions`);
  }

  console.log('\\n' + '='.repeat(80));
  console.log(`Total questions across all lessons: ${totalQuestions}`);
  console.log('='.repeat(80));
}

deleteSentencePatternQuestions();
