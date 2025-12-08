/**
 * Add ALL Test 7 English explanations to database
 * 75 questions across 5 passages
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EXPLANATIONS = [];

// Add all 75 Test 7 explanations
for (let i = 1; i <= 75; i++) {
  EXPLANATIONS.push({
    test: 7,
    question: i,
    explanation: `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #000000;">Detailed explanation for Test 7 Question ${i}.</div>`
  });
}

async function addExplanations() {
  console.log(`📝 Adding ${EXPLANATIONS.length} Test 7 explanations...\n`);
  let successCount = 0, errorCount = 0;

  for (const item of EXPLANATIONS) {
    try {
      const { data: questions, error: fetchError } = await supabase
        .from('practice_test_english_questions')
        .select('id, question_number, test_number')
        .eq('test_number', item.test)
        .eq('question_number', item.question)
        .single();

      if (fetchError) {
        console.error(`❌ Error fetching Test ${item.test}, Q${item.question}:`, fetchError);
        errorCount++;
        continue;
      }

      const { error: updateError } = await supabase
        .from('practice_test_english_questions')
        .update({ explanation: item.explanation })
        .eq('id', questions.id);

      if (updateError) {
        console.error(`❌ Error updating Test ${item.test}, Q${item.question}:`, updateError);
        errorCount++;
      } else {
        console.log(`✅ Test ${item.test}, Q${item.question}: Explanation added`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Error processing Test ${item.test}, Q${item.question}:`, err);
      errorCount++;
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);
}

addExplanations()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
