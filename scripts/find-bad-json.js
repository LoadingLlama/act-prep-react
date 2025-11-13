const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function findBadJson() {
  try {
    console.log('🔍 Searching for questions with malformed JSON in Practice Test 1 Math section...\n');

    // Get all math questions from practice test 1
    const { data: questions, error } = await supabase
      .from('practice_test_math_questions')
      .select('*')
      .eq('test_number', 1)
      .order('question_number');

    if (error) {
      console.error('Error fetching questions:', error);
      return;
    }

    console.log(`Found ${questions.length} math questions in test 1\n`);

    let badCount = 0;

    for (const q of questions) {
      try {
        // Try to parse choices
        if (typeof q.choices === 'string') {
          JSON.parse(q.choices);
        }
      } catch (err) {
        badCount++;
        console.log(`❌ Question ${q.question_number} has bad JSON:`);
        console.log(`   ID: ${q.id}`);
        console.log(`   Error: ${err.message}`);
        console.log(`   Choices (first 200 chars): ${q.choices.substring(0, 200)}`);
        console.log(`   Full choices:`);
        console.log(q.choices);
        console.log('\n');
      }
    }

    if (badCount === 0) {
      console.log('✅ No malformed JSON found!');
    } else {
      console.log(`\n⚠️  Found ${badCount} question(s) with malformed JSON`);
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

findBadJson();
