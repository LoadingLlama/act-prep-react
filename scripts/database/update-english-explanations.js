/**
 * Script to update English question explanations in Supabase database
 *
 * Purpose: Updates the explanation field for all 75 ACT English practice test questions
 *
 * Usage: node update-english-explanations.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Main function to update all English question explanations
 *
 * @returns {Promise<void>}
 */
async function updateExplanations() {
  try {
    console.log('Starting English explanations update process...\n');

    // Read the explanations JSON file
    const explanationsPath = path.join(__dirname, 'english-explanations-batch.json');
    const explanationsData = JSON.parse(fs.readFileSync(explanationsPath, 'utf8'));

    console.log(`Loaded ${explanationsData.length} explanations from file\n`);

    // Track statistics
    const stats = {
      total: explanationsData.length,
      successful: 0,
      failed: 0,
      errors: []
    };

    // Update each question
    for (const item of explanationsData) {
      const { question_id, question_number, explanation } = item;

      try {
        console.log(`Updating question ${question_number} (ID: ${question_id})...`);

        // Update the database
        const { data, error } = await supabase
          .from('practice_test_english_questions')
          .update({ explanation: explanation })
          .eq('id', question_id);

        if (error) {
          throw error;
        }

        stats.successful++;
        console.log(`✓ Question ${question_number} updated successfully\n`);

      } catch (error) {
        stats.failed++;
        const errorMsg = `Question ${question_number} (ID: ${question_id}): ${error.message}`;
        stats.errors.push(errorMsg);
        console.error(`✗ Error updating question ${question_number}:`, error.message, '\n');
      }
    }

    // Print summary
    console.log('='.repeat(60));
    console.log('UPDATE SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total questions processed: ${stats.total}`);
    console.log(`Successfully updated: ${stats.successful}`);
    console.log(`Failed: ${stats.failed}`);

    if (stats.errors.length > 0) {
      console.log('\nErrors encountered:');
      stats.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    } else {
      console.log('\n✓ All explanations updated successfully!');
    }
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n✗ Fatal error during update process:');
    console.error('Cause:', error.message);
    console.error('Context: Failed to read explanations file or initialize update process');
    console.error('Impact: No explanations were updated');
    process.exit(1);
  }
}

// Run the update function
updateExplanations()
  .then(() => {
    console.log('\nUpdate process completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Unexpected error:', error);
    process.exit(1);
  });
