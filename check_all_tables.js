/**
 * Check all practice test tables in database
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllTables() {
  console.log('🔍 Checking all practice test tables...\n');

  const tables = [
    'practice_test_english_questions',
    'practice_test_math_questions',
    'practice_test_reading_questions',
    'practice_test_science_questions'
  ];

  for (const table of tables) {
    console.log(`\n📊 Table: ${table}`);
    console.log('='.repeat(60));

    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`❌ Error: ${error.message}`);
    } else {
      console.log(`✅ Total questions: ${count}`);

      // Get breakdown by test
      const { data: breakdown } = await supabase
        .from(table)
        .select('test_number')
        .order('test_number');

      if (breakdown) {
        const byTest = {};
        breakdown.forEach(q => {
          byTest[q.test_number] = (byTest[q.test_number] || 0) + 1;
        });

        console.log('\nBreakdown by test:');
        Object.keys(byTest).sort((a, b) => a - b).forEach(testNum => {
          console.log(`  Test ${testNum}: ${byTest[testNum]} questions`);
        });
      }

      // Check for explanations
      const { data: withExplanations } = await supabase
        .from(table)
        .select('test_number, explanation')
        .not('explanation', 'is', null);

      const explained = withExplanations ? withExplanations.filter(q => q.explanation && q.explanation.trim() !== '').length : 0;
      console.log(`\n📝 Questions with explanations: ${explained}/${count}`);

      if (withExplanations) {
        const explainedByTest = {};
        withExplanations.filter(q => q.explanation && q.explanation.trim() !== '').forEach(q => {
          explainedByTest[q.test_number] = (explainedByTest[q.test_number] || 0) + 1;
        });

        if (Object.keys(explainedByTest).length > 0) {
          console.log('\nExplanations by test:');
          Object.keys(explainedByTest).sort((a, b) => a - b).forEach(testNum => {
            console.log(`  Test ${testNum}: ${explainedByTest[testNum]} explanations`);
          });
        }
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Summary complete!');
}

checkAllTables()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
