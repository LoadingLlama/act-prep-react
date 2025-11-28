const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateQuestion(questionId, explanation, table = 'practice_test_reading_questions') {
  const { error } = await supabase
    .from(table)
    .update({ explanation })
    .eq('id', questionId);

  if (error) {
    console.error(`Error updating question ${questionId}:`, error);
    return false;
  }

  console.log(`Successfully updated question ${questionId}`);
  return true;
}

// Get arguments from command line: node updateExplanation.js <questionId> "<explanation>" [table]
const args = process.argv.slice(2);
const questionId = parseInt(args[0]);
const explanation = args[1];
const table = args[2] || 'practice_test_reading_questions';

if (!questionId || !explanation) {
  console.error('Usage: node updateExplanation.js <questionId> "<explanation>" [table]');
  process.exit(1);
}

updateQuestion(questionId, explanation, table);
