const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// IDs of all questions that require passage context but don't provide it
const questionIdsToDelete = [
  // adding-deleting
  '6b0eaa74-6639-4eff-89d5-c8421d219aff', // Position 2: Only Consider What the Sentence Says
  'ef76b1ae-aa8c-48d5-a0b9-1a3bfcc66b62', // Position 4: Avoid Wrong Answer Traps
  'f969d6dc-6e3a-4e3d-a04a-a9ca40ba161f', // Practice Question 18
  '1a2c6e3e-5191-4972-a03a-a58e2e825db0', // Practice Question 26

  // logical-placement
  '33338583-21fb-46b4-9ed6-f853a5209aba', // Practice Question 18
  '78c176bd-a2a2-480a-98c1-a5b598acce56', // Practice Question 26

  // parallel-structure
  '98654cb1-31bc-4f05-b0ee-3eb4aa3f9a9a', // Either...Or with Verb Forms

  // pronouns
  'e50e076a-352a-492d-819e-eed84fc07f0a', // Who as Subject of Clause

  // redundancy
  '9eabb929-ac6c-49d7-950f-97d7a2252936', // Practice Question 18
  'c8ce9dd3-d84d-42d4-a788-12e51b99a6de', // Practice Question 26

  // transitions
  '7ddec417-2e9d-4fcb-a7a6-1e337e5d7cd2', // Practice Question 18
  '78334c55-304d-4f1d-9d39-75afc596f825', // Practice Question 26

  // which-choice
  'e7772b8e-b094-49ff-a6f7-e1ed21b04523', // Practice Question 18
  'a282c61b-e1e6-49a7-8bf1-c73f5303cb0f', // Practice Question 26

  // word-choice
  'a4b2d62e-8fe3-4917-96f1-4025db28f818', // Practice Question 18
  '00c5f9e4-c6df-44be-9043-0607c84511a7'  // Practice Question 26
];

async function deleteContextDependentQuestions() {
  console.log('Deleting 16 questions that require passage context...\n');
  console.log('='.repeat(80));

  let deletedCount = 0;
  let errorCount = 0;

  for (const id of questionIdsToDelete) {
    // Get question info before deleting
    const { data: question } = await supabase
      .from('lesson_examples')
      .select('title, position')
      .eq('id', id)
      .single();

    if (!question) {
      console.log(`  ⚠️  Question not found: ${id}`);
      continue;
    }

    // Delete the question
    const { error } = await supabase
      .from('lesson_examples')
      .delete()
      .eq('id', id);

    if (error) {
      console.log(`  ✗ Failed to delete ${question.title}: ${error.message}`);
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

  // Now check final counts
  console.log('\nChecking final question counts per lesson...\n');

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

    const { data: questions, count } = await supabase
      .from('lesson_examples')
      .select('*', { count: 'exact' })
      .eq('lesson_id', lesson.id);

    const status = count === 50 ? '✓' : (count < 50 ? '⚠️ ' : '❌');
    console.log(`  ${status} ${lessonKey.padEnd(20)} - ${count} questions`);
  }
}

deleteContextDependentQuestions();
