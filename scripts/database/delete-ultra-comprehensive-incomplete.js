const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// All 14 incomplete questions found
const questionIdsToDelete = [
  "4d947df4-3547-45a9-a52a-325161d6cc2b", // adding-deleting pos 8
  "2e123eaa-bd1c-41ad-8ef0-cc7cfce3e4a1", // adding-deleting pos 37 (Grandmaster Flash)
  "e4c964a6-d98b-4aad-bcb5-d5a0b06011f8", // logical-placement pos 8
  "7e1ee6c3-155c-4f96-8316-bcf5647ca1bc", // logical-placement pos 37 (Grandmaster Flash)
  "f4a1607e-b039-4ac9-b885-b90f45cbb8ed", // misc-topics pos 48
  "ee692168-241c-4c1e-b66a-fa2cffc2f989", // redundancy pos 8
  "e2fc85b7-cfe2-4684-a5aa-bd5acbc08813", // redundancy pos 37 (Grandmaster Flash)
  "93d473d5-e8bb-45a5-9d69-fec1b5997f06", // transitions pos 8
  "9c800d49-f512-45b8-954d-486d75a07c46", // transitions pos 37 (Grandmaster Flash)
  "9a595dfb-2753-40ed-bec2-78cde87a763f", // which-choice pos 5
  "2cb10b4a-ecb7-42ed-88aa-57ec9b146d7c", // which-choice pos 8
  "0c5811c3-3bca-4ba3-96fb-9277fb5b3498", // which-choice pos 37 (Grandmaster Flash)
  "eabcf3f2-f66e-43f3-a76c-d32421b8997c", // word-choice pos 8
  "b9f168ae-40f4-464d-b5b3-014dd7e7183a"  // word-choice pos 37 (Grandmaster Flash)
];

async function deleteUltraComprehensiveIncomplete() {
  console.log('Deleting 14 remaining incomplete questions...\\n');
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

deleteUltraComprehensiveIncomplete();
