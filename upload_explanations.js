const { createClient } = require('@supabase/supabase-js');
const explanations = require('./all_explanations.js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Upload all explanations to the database
 */
async function uploadExplanations() {
  console.log('Starting upload of explanations...\n');

  const questionIds = Object.keys(explanations);
  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (let i = 0; i < questionIds.length; i++) {
    const questionId = questionIds[i];
    const explanation = explanations[questionId];

    try {
      const { data, error } = await supabase
        .from('practice_test_math_questions')
        .update({ explanation: explanation })
        .eq('id', questionId);

      if (error) {
        console.error(`Error updating question ${questionId}:`, error.message);
        errorCount++;
        errors.push({ questionId, error: error.message });
      } else {
        successCount++;
        console.log(`✓ Updated question ${questionId} (${i + 1}/${questionIds.length})`);
      }

      // Progress report every 15 questions
      if ((i + 1) % 15 === 0) {
        console.log(`\n--- Progress Report: ${i + 1}/${questionIds.length} questions processed ---`);
        console.log(`Successful: ${successCount}, Errors: ${errorCount}\n`);
      }

    } catch (err) {
      console.error(`Exception updating question ${questionId}:`, err.message);
      errorCount++;
      errors.push({ questionId, error: err.message });
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '='.repeat(80));
  console.log('UPLOAD COMPLETE');
  console.log('='.repeat(80));
  console.log(`Total questions processed: ${questionIds.length}`);
  console.log(`Successful updates: ${successCount}`);
  console.log(`Errors: ${errorCount}`);

  if (errors.length > 0) {
    console.log('\nErrors encountered:');
    errors.forEach(e => console.log(`  Question ${e.questionId}: ${e.error}`));
  }
}

/**
 * Verify explanations were uploaded correctly
 */
async function verifyUploads() {
  console.log('\n\nVerifying uploads...\n');

  const questionIds = Object.keys(explanations);
  let verifiedCount = 0;

  for (const questionId of questionIds) {
    const { data, error } = await supabase
      .from('practice_test_math_questions')
      .select('id, explanation')
      .eq('id', questionId)
      .single();

    if (error) {
      console.error(`Error verifying question ${questionId}:`, error.message);
    } else if (data.explanation === explanations[questionId]) {
      verifiedCount++;
    } else {
      console.warn(`Warning: Question ${questionId} explanation doesn't match!`);
    }
  }

  console.log(`\nVerification complete: ${verifiedCount}/${questionIds.length} explanations match`);
}

async function main() {
  await uploadExplanations();
  await verifyUploads();
}

main();
