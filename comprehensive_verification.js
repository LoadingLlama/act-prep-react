const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function comprehensiveVerification() {
  console.log('='.repeat(90));
  console.log('COMPREHENSIVE VERIFICATION - ALL PRACTICE QUESTIONS');
  console.log('='.repeat(90));
  console.log();

  const { data, error } = await supabase
    .from('lesson_examples')
    .select('title, problem_text, choices, correct_answer, answer_explanation')
    .order('title');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total questions: ${data.length}\n`);

  // Quality checks
  let validChoices = 0;
  let hasExplanation = 0;
  let invalidQuestions = [];

  data.forEach((q, idx) => {
    const isArrayChoices = Array.isArray(q.choices);
    const hasAllChoices = isArrayChoices && q.choices.length === 4;
    const hasExpl = q.answer_explanation && q.answer_explanation.length > 30;

    if (hasAllChoices) validChoices++;
    if (hasExpl) hasExplanation++;

    if (!hasAllChoices || !hasExpl) {
      invalidQuestions.push({
        title: q.title,
        choicesValid: hasAllChoices,
        choicesCount: isArrayChoices ? q.choices.length : 'NOT ARRAY',
        hasExplanation: hasExpl
      });
    }
  });

  // Summary
  console.log('QUALITY METRICS:');
  console.log('-'.repeat(90));
  console.log(`Valid Choices (4 items):  ${validChoices}/${data.length} (${(validChoices/data.length*100).toFixed(1)}%)`);
  console.log(`Has Explanation (>30ch):  ${hasExplanation}/${data.length} (${(hasExplanation/data.length*100).toFixed(1)}%)`);
  console.log();

  if (invalidQuestions.length > 0) {
    console.log('ISSUES FOUND:');
    console.log('-'.repeat(90));
    invalidQuestions.forEach((q, idx) => {
      console.log(`${idx + 1}. ${q.title}`);
      console.log(`   Choices: ${q.choicesValid ? '✓' : '✗'} (${q.choicesCount} items)`);
      console.log(`   Explanation: ${q.hasExplanation ? '✓' : '✗'}`);
    });
    console.log();
  }

  console.log('='.repeat(90));
  if (validChoices === data.length && hasExplanation === data.length) {
    console.log('✅ ALL CHECKS PASSED - 100% QUALITY TARGET ACHIEVED');
  } else {
    console.log('⚠️  QUALITY ISSUES REMAIN');
  }
  console.log('='.repeat(90));
}

comprehensiveVerification().catch(console.error);
