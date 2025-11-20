/**
 * Check correct_answer field values in practice tests
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAnswers() {
  console.log('🔍 CHECKING CORRECT ANSWERS IN PRACTICE TESTS\n');

  const sections = ['english', 'math', 'reading', 'science'];
  const testNumbers = [2, 3, 4, 5, 6, 7];

  for (const testNum of testNumbers) {
    console.log(`\n📋 TEST ${testNum} (Practice Test ${testNum - 1})`);
    console.log('-'.repeat(70));

    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;

      // Get first 3 questions to check correct_answer field
      const { data, error } = await supabase
        .from(tableName)
        .select('question_number, correct_answer, question_text, choices')
        .eq('test_number', testNum)
        .order('question_number', { ascending: true })
        .limit(3);

      if (error) {
        console.log(`  ❌ ${section.toUpperCase()}: ${error.message}`);
        continue;
      }

      if (!data || data.length === 0) {
        console.log(`  ⚠️  ${section.toUpperCase()}: No data`);
        continue;
      }

      console.log(`  ${section.toUpperCase()}:`);
      data.forEach(q => {
        const answerType = typeof q.correct_answer;
        const answerValue = q.correct_answer;
        const questionTextOk = q.question_text && q.question_text.length > 10 && !q.question_text.includes('TBD');
        const choicesOk = q.choices && q.choices.length > 0;

        console.log(`    Q${q.question_number}: answer="${answerValue}" (${answerType}), text=${questionTextOk ? 'OK' : 'MISSING'}, choices=${choicesOk ? 'OK' : 'MISSING'}`);
      });
    }
  }

  console.log('\n' + '='.repeat(70));
}

checkAnswers().catch(console.error);
