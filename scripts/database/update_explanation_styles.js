const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

// Update explanation styles to use solid black color with bold headers
function updateExplanationStyle(explanation) {
  if (!explanation) return explanation;

  // First, replace all colors and sizes
  let updated = explanation
    .replace(/color: #[0-9a-fA-F]{6}/g, 'color: #000000')
    .replace(/font-weight: \d+/g, 'font-weight: 400')
    .replace(/font-size: 0\.\d+rem/g, 'font-size: 0.9375rem')
    .replace(/line-height: \d+\.\d+/g, 'line-height: 1.6');

  // Make "Why Other Answers Are Wrong:" bold
  updated = updated.replace(
    /<strong style="font-size: 0\.9375rem; color: #000000;">Why Other Answers Are Wrong:<\/strong>/g,
    '<strong style="font-size: 0.9375rem; color: #000000; font-weight: 600;">Why Other Answers Are Wrong:</strong>'
  );

  // Make choice labels bold (Choice A:, Choice B:, etc.)
  updated = updated.replace(
    /<strong>Choice ([A-K]):<\/strong>/g,
    '<strong style="font-weight: 600;">Choice $1:</strong>'
  );

  return updated;
}

async function updateAllExplanations() {
  const tables = [
    'practice_test_english_questions',
    'practice_test_math_questions',
    'practice_test_reading_questions',
    'practice_test_science_questions'
  ];

  for (const table of tables) {
    console.log(`\n📝 Updating ${table}...`);

    const { data: questions } = await supabase
      .from(table)
      .select('id, explanation')
      .order('id');

    let updated = 0;
    for (const q of questions) {
      if (q.explanation) {
        const newExplanation = updateExplanationStyle(q.explanation);

        if (newExplanation !== q.explanation) {
          await supabase
            .from(table)
            .update({ explanation: newExplanation })
            .eq('id', q.id);
          updated++;
        }
      }
    }

    console.log(`✅ Updated ${updated} explanations in ${table}`);
  }

  console.log('\n🎉 All explanations updated with lighter, consistent styling!');
}

updateAllExplanations().catch(console.error);
