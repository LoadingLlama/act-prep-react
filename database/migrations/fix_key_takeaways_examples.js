const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Lesson IDs
const TOPIC_1_1 = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac'; // Building Complete Sentences
const TOPIC_1_2 = '3e8f0696-1bf7-4b5c-880d-fb5359923b7d'; // Essential Comma Rules
const TOPIC_1_3 = '66776383-9334-4efb-bd72-74b1bbeab8ac'; // Advanced Punctuation

async function fixKeyTakeawaysExamples() {
  console.log('Removing examples that appear after Key Takeaways sections...\n');

  const fixes = [
    { lessonId: TOPIC_1_1, position: 5, title: 'Topic 1.1' },
    { lessonId: TOPIC_1_2, position: 6, title: 'Topic 1.2' },
    { lessonId: TOPIC_1_3, position: 7, title: 'Topic 1.3' }
  ];

  for (const fix of fixes) {
    // Get the example(s) at this position
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', fix.lessonId)
      .eq('position', fix.position);

    if (!examples || examples.length === 0) {
      console.log(`✓ ${fix.title}: No examples at position ${fix.position}`);
      continue;
    }

    console.log(`\n${fix.title}: Found ${examples.length} example(s) at position ${fix.position}:`);
    examples.forEach(ex => console.log(`  - ${ex.title}`));

    // Delete these examples
    const { error } = await supabase
      .from('lesson_examples')
      .delete()
      .eq('lesson_id', fix.lessonId)
      .eq('position', fix.position);

    if (error) {
      console.error(`❌ Error deleting: ${error.message}`);
    } else {
      console.log(`✓ Deleted ${examples.length} example(s) from ${fix.title}`);
    }
  }

  console.log('\n✓ Complete! Examples no longer appear after Key Takeaways.');
  console.log('\nThese examples are still available in Practice mode (50 questions per topic).');
}

fixKeyTakeawaysExamples();
