const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// IDs of the 6 remaining questions that reference "Klimas quotation" without providing it
const questionIdsToDelete = [
  "4eaa1744-8b97-4ffb-b71e-529864f62bfc", // adding-deleting - Position 27
  "1002a59d-1e20-4846-b0e4-c2da349fd99e", // logical-placement - Position 27
  "b5458dea-5a2d-468d-a416-1a7c584a8c00", // redundancy - Position 27
  "18561104-dd92-4fba-a083-dfb18dbd9ed8", // transitions - Position 27
  "98f3193d-c3be-4f30-ae65-11cceae50f6a", // which-choice - Position 27
  "4766ca39-a21c-4450-a7ef-bbf7839eab98"  // word-choice - Position 27
];

async function deleteRemainingIncompleteQuestions() {
  console.log('Deleting 6 remaining incomplete questions...\\n');
  console.log('='.repeat(80));

  let deletedCount = 0;
  let errorCount = 0;

  for (const id of questionIdsToDelete) {
    const { data: question } = await supabase
      .from('lesson_examples')
      .select('title, position')
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
      console.log(`  ✗ Failed: ${question.title} - ${error.message}`);
      errorCount++;
    } else {
      console.log(`  ✓ Deleted: ${question.title} (position ${question.position})`);
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

    const status = count >= 45 ? '✓' : '⚠️ ';
    console.log(`  ${status} ${lessonKey.padEnd(20)} - ${count} questions`);
  }
}

deleteRemainingIncompleteQuestions();
