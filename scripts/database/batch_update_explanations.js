const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Takes an explanations object and updates the database
 * Format: { tableName: [{ id, explanation }, ...] }
 */
async function batchUpdate(explanations) {
  for (const [tableName, updates] of Object.entries(explanations)) {
    console.log(`\nUpdating ${tableName}...`);
    let count = 0;

    for (const { id, explanation } of updates) {
      const { error } = await supabase
        .from(tableName)
        .update({ explanation })
        .eq('id', id);

      if (error) {
        console.error(`Error updating ID ${id}:`, error);
      } else {
        count++;
        if (count % 5 === 0 || count === updates.length) {
          console.log(`  Progress: ${count}/${updates.length}`);
        }
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`${tableName}: Complete (${count}/${updates.length})`);
  }
}

// Example usage:
// const explanations = {
//   'practice_test_english_questions': [
//     { id: 1, explanation: '<div>...</div>' },
//     { id: 2, explanation: '<div>...</div>' }
//   ]
// };
// batchUpdate(explanations).catch(console.error);

module.exports = { batchUpdate };

if (require.main === module) {
  console.log('Batch updater ready. Import and use batchUpdate() function.');
  console.log('Example: batchUpdate({ tableName: [{ id, explanation }, ...] })');
}
