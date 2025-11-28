const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

// This file will contain manually written explanations
// Format: { subject: { questionId: "explanation_html" } }
const explanations = {};

/**
 * Helper to format explanation HTML
 */
function formatExplanation(correctExplanation, wrongExplanations, correctAnswer) {
  const allChoices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
  const wrongChoices = allChoices.filter(c =>
    wrongExplanations.hasOwnProperty(c) && c !== correctAnswer
  );

  const wrongSections = wrongChoices
    .map((choice, index) => {
      const isLast = index === wrongChoices.length - 1;
      const marginBottom = isLast ? '' : ' margin-bottom: 0.375rem;';
      return `<div style="${marginBottom}"><strong>Choice ${choice}:</strong> ${wrongExplanations[choice]}</div>`;
    })
    .join('\n');

  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${correctExplanation}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongSections}
</div>
</div>`;
}

// I'll populate this with all explanations
// For now, this is a template showing the structure

async function updateDatabase() {
  // Load explanations from a JSON file that will be created
  const explanationsData = JSON.parse(fs.readFileSync('all_explanations.json', 'utf8'));

  const tables = {
    'English': 'practice_test_english_questions',
    'Math': 'practice_test_math_questions',
    'Reading': 'practice_test_reading_questions',
    'Science': 'practice_test_science_questions'
  };

  for (const [subject, tableName] of Object.entries(tables)) {
    if (!explanationsData[subject]) continue;

    console.log(`\nUpdating ${subject}...`);
    let count = 0;

    for (const [id, explanation] of Object.entries(explanationsData[subject])) {
      const { error } = await supabase
        .from(tableName)
        .update({ explanation })
        .eq('id', parseInt(id));

      if (error) {
        console.error(`Error updating ${id}:`, error);
      } else {
        count++;
        console.log(`${subject}: ${count}/${Object.keys(explanationsData[subject]).length}`);
      }
    }
  }

  console.log('\nDone!');
}

// Export the formatter for use
module.exports = { formatExplanation, updateDatabase };

// If run directly, update the database
if (require.main === module) {
  updateDatabase().catch(console.error);
}
