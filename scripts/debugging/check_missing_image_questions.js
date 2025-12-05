/**
 * Check the 5 questions that reference images but don't have URLs
 * Determine if they actually need images or can be understood from text
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkMissingImageQuestions() {
  console.log('🔍 EXAMINING QUESTIONS WITH MISSING IMAGES\n');
  console.log('='.repeat(80));

  const missingImageQuestions = [
    { test: 2, q: 23 },
    { test: 3, q: 9 },
    { test: 4, q: 22 },
    { test: 5, q: 32 },
    { test: 6, q: 60 }
  ];

  for (const item of missingImageQuestions) {
    const { data, error } = await supabase
      .from('practice_test_math_questions')
      .select('question_text, choices')
      .eq('test_number', item.test)
      .eq('question_number', item.q)
      .single();

    if (data) {
      console.log(`\nTest ${item.test} Q${item.q}:`);
      console.log('-'.repeat(80));
      console.log('QUESTION:');
      console.log(data.question_text);
      console.log('\nCHOICES:');
      console.log(JSON.stringify(data.choices, null, 2));
      console.log('\n' + '='.repeat(80));
    }
  }

  console.log('\n✅ ANALYSIS COMPLETE\n');
}

checkMissingImageQuestions().catch(console.error);
