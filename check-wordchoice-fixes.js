const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkWordChoiceFixes() {
  console.log('Checking if word-choice fixes actually persisted...\n');

  // IDs from fix-wordchoice-explanations.js
  const wordChoiceIds = [
    { id: 'bc9a4158-faac-4996-9053-18c620ac98f6', title: 'Identifying Context' },
    { id: '7faec793-cbd2-4e65-81a9-940c4a1ee2d5', title: 'Testing Each Word' },
    { id: '3893c3d2-6523-4805-8413-09c4b15631cb', title: 'Using Known Words' },
    { id: 'd02089c7-880d-4c79-b2fb-608ca6514113', title: 'Similar Meanings, Different Uses' }
  ];

  for (const item of wordChoiceIds) {
    const { data } = await supabase
      .from('lesson_examples')
      .select('title, answer_explanation, choices')
      .eq('id', item.id)
      .single();

    console.log('='.repeat(80));
    console.log(`Question: ${data.title}`);
    console.log(`\nExpected title: ${item.title}`);
    console.log(`\nExplanation preview:`);
    console.log(data.answer_explanation.substring(0, 200));
    console.log('\nChoice A explanation:');
    console.log(data.choices[0].explanation.substring(0, 150));

    // Check if it has the specific word-choice explanation markers
    const hasSpecificContent =
      data.answer_explanation.includes('revealed') ||
      data.answer_explanation.includes('adamant') ||
      data.answer_explanation.includes('tune it out') ||
      data.answer_explanation.includes('disinterested in');

    const hasGenericContent =
      data.answer_explanation.includes("doesn't best fulfill") ||
      data.answer_explanation.includes("might seem plausible");

    if (hasSpecificContent && !hasGenericContent) {
      console.log('\n✓ This one HAS specific explanations!\n');
    } else {
      console.log('\n❌ This one still has GENERIC explanations!\n');
    }
  }
}

checkWordChoiceFixes();
