const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const questionIdsToDelete = [
  "6b0eaa74-6639-4eff-89d5-c8421d219aff",
  "ef76b1ae-aa8c-48d5-a0b9-1a3bfcc66b62",
  "f969d6dc-6e3a-4e3d-a04a-a9ca40ba161f",
  "1a2c6e3e-5191-4972-a03a-a58e2e825db0",
  "475f59a4-ecae-42e6-ba6f-99f0a356425b",
  "33338583-21fb-46b4-9ed6-f853a5209aba",
  "78c176bd-a2a2-480a-98c1-a5b598acce56",
  "5407ad1b-c838-442d-a066-51dc200424f7",
  "9eabb929-ac6c-49d7-950f-97d7a2252936",
  "c8ce9dd3-d84d-42d4-a788-12e51b99a6de",
  "aeaf7810-4919-4c96-abc1-1e59efb7082c",
  "7ddec417-2e9d-4fcb-a7a6-1e337e5d7cd2",
  "78334c55-304d-4f1d-9d39-75afc596f825",
  "76ddddf1-cfb6-499d-85fa-5b3f9fe019b2",
  "e7772b8e-b094-49ff-a6f7-e1ed21b04523",
  "a282c61b-e1e6-49a7-8bf1-c73f5303cb0f",
  "993cfc97-0916-4640-96fe-964e1f0cb8f0",
  "a4b2d62e-8fe3-4917-96f1-4025db28f818",
  "00c5f9e4-c6df-44be-9043-0607c84511a7",
  "e8a44d39-4d87-4c6f-8c05-7955982ea617"
];

async function deleteAllIncompleteQuestions() {
  console.log('Deleting 20 questions that lack proper context...\n');
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

  console.log('\n' + '='.repeat(80));
  console.log(`✓ Successfully deleted: ${deletedCount} questions`);
  console.log(`✗ Errors: ${errorCount} questions`);
  console.log('='.repeat(80));

  // Check final counts
  console.log('\nFinal question counts per lesson:\n');

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

deleteAllIncompleteQuestions();
