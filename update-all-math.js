const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function updateMathExplanations() {
  const explanations = JSON.parse(fs.readFileSync('all-math-explanations.json', 'utf8'));

  let successCount = 0;
  let errorCount = 0;

  for (const [questionNum, explanation] of Object.entries(explanations)) {
    try {
      const { data, error } = await supabase
        .from('practice_test_math_questions')
        .update({ explanation: explanation })
        .eq('test_number', 1)
        .eq('question_number', parseInt(questionNum));

      if (error) {
        console.error(`Error updating question ${questionNum}:`, error);
        errorCount++;
      } else {
        console.log(`✓ Updated Math question ${questionNum}`);
        successCount++;
      }
    } catch (err) {
      console.error(`Exception updating question ${questionNum}:`, err);
      errorCount++;
    }
  }

  console.log(`\n=== Math Update Complete ===`);
  console.log(`Success: ${successCount}/60`);
  console.log(`Errors: ${errorCount}`);
}

updateMathExplanations().catch(console.error);
