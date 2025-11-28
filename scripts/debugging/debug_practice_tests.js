/**
 * Debug practice test loading issues
 * Check what's in the database and why tests aren't loading
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkPracticeTests() {
  console.log('🔍 DEBUGGING PRACTICE TEST LOADING ISSUES\n');
  console.log('='.repeat(70));

  const sections = ['english', 'math', 'reading', 'science'];
  const testNumbers = [2, 3, 4, 5, 6, 7]; // Tests 2-7 (displayed as 1-6)

  for (const testNum of testNumbers) {
    console.log(`\n📋 TEST ${testNum} (displayed as Test ${testNum - 1})`);
    console.log('-'.repeat(70));

    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;

      // Count questions for this test/section
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: false })
        .eq('test_number', testNum);

      if (error) {
        console.log(`  ❌ ${section.toUpperCase()}: ERROR - ${error.message}`);
        continue;
      }

      if (!data || data.length === 0) {
        console.log(`  ⚠️  ${section.toUpperCase()}: NO QUESTIONS FOUND`);
      } else {
        console.log(`  ✓ ${section.toUpperCase()}: ${data.length} questions`);

        // Check if questions have required fields
        const sampleQ = data[0];
        const hasCorrectAnswer = sampleQ.correct_answer !== null && sampleQ.correct_answer !== undefined;
        const hasChoices = sampleQ.choices && sampleQ.choices.length > 0;
        const hasQuestionText = sampleQ.question_text && sampleQ.question_text.length > 0;

        if (!hasCorrectAnswer || !hasChoices || !hasQuestionText) {
          console.log(`    ⚠️  Issues found:`);
          if (!hasCorrectAnswer) console.log(`       - Missing correct_answer`);
          if (!hasChoices) console.log(`       - Missing choices`);
          if (!hasQuestionText) console.log(`       - Missing question_text`);
        }

        // Check passage linkage for sections that use passages
        if (section === 'english' || section === 'reading' || section === 'science') {
          const passageTable = `practice_test_${section}_passages`;
          const { data: passages, error: passageError } = await supabase
            .from(passageTable)
            .select('id, passage_number')
            .eq('test_number', testNum);

          if (passageError) {
            console.log(`    ⚠️  Passages: ERROR - ${passageError.message}`);
          } else if (!passages || passages.length === 0) {
            console.log(`    ⚠️  Passages: NO PASSAGES FOUND`);
          } else {
            console.log(`    ✓ Passages: ${passages.length} passages`);

            // Check if questions link to passages
            const questionsWithPassages = data.filter(q => q.passage_id);
            if (questionsWithPassages.length === 0) {
              console.log(`    ⚠️  No questions linked to passages!`);
            }
          }
        }
      }
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n🔍 CHECKING SPECIFIC ISSUES\n');

  // Check Test 2 English specifically (should be "Practice Test 1" to user)
  console.log('Detailed check for Test 2 English (Practice Test 1):');
  const { data: test2English, error: test2Error } = await supabase
    .from('practice_test_english_questions')
    .select('question_number, question_text, correct_answer, choices, passage_id')
    .eq('test_number', 2)
    .order('question_number', { ascending: true })
    .limit(5);

  if (test2Error) {
    console.log(`❌ Error: ${test2Error.message}`);
  } else if (!test2English || test2English.length === 0) {
    console.log(`❌ No questions found for test_number=2`);
  } else {
    console.log(`✓ Found ${test2English.length} sample questions:`);
    test2English.forEach(q => {
      console.log(`  Q${q.question_number}: ${q.question_text.substring(0, 60)}...`);
      console.log(`    Correct: ${q.correct_answer}, Choices: ${q.choices ? 'Yes' : 'No'}, Passage: ${q.passage_id || 'None'}`);
    });
  }

  console.log('\n' + '='.repeat(70));
  console.log('DEBUG COMPLETE\n');
}

checkPracticeTests().catch(console.error);
