const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function findOldQuestions() {
  console.log('Finding old practice questions with data corruption...\n');

  // Get all questions with "Practice" in the title
  const { data, error } = await supabase
    .from('lesson_examples')
    .select('id, title, choices')
    .or('title.ilike.%Practice%')
    .order('title');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Questions with "Practice" in title:');
  console.log('='.repeat(90));

  data.forEach(q => {
    const isArray = Array.isArray(q.choices);
    console.log(`\n${q.title}`);
    console.log(`  ID: ${q.id}`);
    console.log(`  Choices type: ${isArray ? 'array (' + q.choices.length + ' items)' : 'NOT ARRAY'}`);
  });

  console.log('\n' + '='.repeat(90));
  console.log(`\nTotal "Practice" questions: ${data.length}`);

  const corrupted = data.filter(q => !Array.isArray(q.choices) || q.choices.length !== 4);
  console.log(`Corrupted: ${corrupted.length}`);

  if (corrupted.length > 0) {
    console.log('\nCorrupted question IDs:');
    corrupted.forEach(q => {
      console.log(`  ${q.id} - ${q.title}`);
    });
  }
}

findOldQuestions().catch(console.error);
