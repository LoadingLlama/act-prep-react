const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

const NUMBER_THEORY_LESSON_ID = '74013e77-3111-4dc6-beca-ff15948e4351';

// Import all batches
const batch1 = require('./number-theory-batch1.js');
const batch2 = require('./number-theory-batch2.js');
const batch3 = require('./number-theory-batch3.js');

const allQuestions = [...batch1, ...batch2, ...batch3];

console.log(`\n${'='.repeat(80)}`);
console.log(`NUMBER THEORY QUESTIONS - VERIFICATION AND INSERTION`);
console.log(`${'='.repeat(80)}\n`);
console.log(`Total questions to insert: ${allQuestions.length}`);
console.log(`Lesson ID: ${NUMBER_THEORY_LESSON_ID}\n`);

// Verification function
function verifyQuestion(q, index) {
  const issues = [];

  // Check required fields
  if (!q.problem_text) issues.push('Missing problem_text');
  if (!q.choices || q.choices.length !== 4) issues.push('Must have exactly 4 choices');
  if (!q.correct_answer || !['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
    issues.push('Invalid correct_answer');
  }
  if (!q.position) issues.push('Missing position');

  // Check each choice
  if (q.choices) {
    q.choices.forEach((choice, i) => {
      if (!choice.letter || !choice.text || !choice.explanation) {
        issues.push(`Choice ${i+1} missing letter/text/explanation`);
      }
    });
  }

  // Check that correct answer has detailed explanation
  const correctChoice = q.choices?.find(c => c.letter === q.correct_answer);
  if (correctChoice && !correctChoice.explanation.includes('CORRECT')) {
    issues.push(`Correct answer (${q.correct_answer}) explanation should start with "CORRECT"`);
  }

  return issues;
}

(async () => {
  console.log('STEP 1: Verifying all questions...\n');

  let hasErrors = false;
  allQuestions.forEach((q, i) => {
    const issues = verifyQuestion(q, i);
    if (issues.length > 0) {
      console.log(`❌ Question ${q.position} has issues:`);
      issues.forEach(issue => console.log(`   - ${issue}`));
      hasErrors = true;
    } else {
      console.log(`✓ Question ${q.position} verified`);
    }
  });

  if (hasErrors) {
    console.log('\n❌ Cannot proceed - fix errors above first.');
    return;
  }

  console.log('\n✅ All questions verified successfully!\n');
  console.log(`${'='.repeat(80)}\n`);
  console.log('STEP 2: Deleting existing Number Theory questions...\n');

  // Delete existing questions for this lesson
  const { data: deleted, error: deleteError } = await supabase
    .from('lesson_examples')
    .delete()
    .eq('lesson_id', NUMBER_THEORY_LESSON_ID);

  if (deleteError) {
    console.error('Error deleting old questions:', deleteError);
    return;
  }

  console.log('✓ Old questions deleted\n');
  console.log(`${'='.repeat(80)}\n`);
  console.log('STEP 3: Inserting new questions...\n');

  let inserted = 0;
  let errors = 0;

  for (const q of allQuestions) {
    const record = {
      lesson_id: NUMBER_THEORY_LESSON_ID,
      position: q.position,
      title: `Number Theory Practice ${q.position}`,
      problem_text: q.problem_text,
      choices: JSON.stringify(q.choices),
      correct_answer: q.correct_answer,
      answer_explanation: q.choices.find(c => c.letter === q.correct_answer)?.explanation || '',
      solution_steps: []
    };

    const { error } = await supabase
      .from('lesson_examples')
      .insert([record]);

    if (error) {
      console.error(`❌ Error inserting question ${q.position}:`, error.message);
      errors++;
    } else {
      console.log(`✓ Inserted question ${q.position}: ${q.problem_text.substring(0, 50)}...`);
      inserted++;
    }
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(`COMPLETE!`);
  console.log(`Successfully inserted: ${inserted}/${allQuestions.length} questions`);
  console.log(`Errors: ${errors}`);
  console.log(`${'='.repeat(80)}\n`);
})();
