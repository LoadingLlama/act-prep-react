const fetch = require('node-fetch');
const fs = require('fs');

const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

// Read the reformatted explanations
const reformattedQuestions = JSON.parse(fs.readFileSync('reformatted-explanations.json', 'utf8'));

async function updateExplanation(question) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/practice_test_english_questions?id=eq.${question.id}`,
    {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        explanation: question.new_explanation
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update question ${question.id}: ${response.statusText}`);
  }

  return question.id;
}

async function updateAllExplanations() {
  console.log(`Starting update of ${reformattedQuestions.length} explanations...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < reformattedQuestions.length; i++) {
    const question = reformattedQuestions[i];

    try {
      await updateExplanation(question);
      successCount++;
      process.stdout.write(`\r✓ Updated ${successCount}/${reformattedQuestions.length} questions`);
    } catch (error) {
      errorCount++;
      console.error(`\n✗ Error updating question ${question.question_number} (ID: ${question.id}):`, error.message);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n\n========================================`);
  console.log(`Update Complete!`);
  console.log(`========================================`);
  console.log(`✓ Successfully updated: ${successCount} explanations`);
  if (errorCount > 0) {
    console.log(`✗ Errors: ${errorCount}`);
  }
  console.log(`========================================\n`);
}

updateAllExplanations().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
