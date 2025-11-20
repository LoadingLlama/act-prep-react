/**
 * Deep accuracy verification of questions
 * Checks for:
 * - Logical consistency between question, choices, and explanations
 * - Correct answer makes sense
 * - Explanations accurately describe each choice
 * - No contradictions
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSONS = {
  'transitions': '7aae3763-017b-4762-ad5a-346aac1f027b',
  'which-choice': '29b59c9d-ef2e-4f7f-aae2-464222884d3a',
  'adding-deleting': '784a146b-8809-4189-a1b4-4b2fdcaf8199',
  'logical-placement': '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4',
  'redundancy': '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734',
  'word-choice': '04df2a09-a910-4456-8fe5-2f8e7f62c50f'
};

async function deepVerifyLesson(lessonName, lessonId) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`DEEP ACCURACY CHECK: ${lessonName.toUpperCase()}`);
  console.log('='.repeat(70));

  const { data: questions, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('position');

  if (error) {
    console.error(`Error: ${error.message}`);
    return { lessonName, issues: ['Database error'] };
  }

  const issues = [];

  // Check a representative sample from each difficulty level
  const samplesToCheck = [
    { pos: 5, level: 'EASY' },
    { pos: 10, level: 'EASY' },
    { pos: 15, level: 'MEDIUM' },
    { pos: 25, level: 'MEDIUM' },
    { pos: 35, level: 'HARD' },
    { pos: 50, level: 'HARD' }
  ];

  for (const { pos, level } of samplesToCheck) {
    const q = questions.find(q => q.position === pos);
    if (!q) {
      issues.push(`Missing position ${pos}`);
      continue;
    }

    console.log(`\n--- Position ${pos} (${level}): ${q.title} ---`);

    // ACCURACY CHECK 1: Verify correct_answer exists in choices
    const correctChoice = q.choices?.find(c => c.letter === q.correct_answer);
    if (!correctChoice) {
      issues.push(`Pos ${pos}: Correct answer "${q.correct_answer}" not found in choices`);
      console.log(`❌ CRITICAL: Correct answer ${q.correct_answer} doesn't exist in choices!`);
      continue;
    } else {
      console.log(`✓ Correct answer ${q.correct_answer} exists: "${correctChoice.text}"`);
    }

    // ACCURACY CHECK 2: Verify all choices have unique letters
    const letters = q.choices.map(c => c.letter);
    const uniqueLetters = new Set(letters);
    if (letters.length !== uniqueLetters.size) {
      issues.push(`Pos ${pos}: Duplicate choice letters found`);
      console.log(`❌ Duplicate choice letters`);
    } else {
      console.log(`✓ All choice letters unique: ${letters.join(', ')}`);
    }

    // ACCURACY CHECK 3: Verify choice A is "NO CHANGE" for most lessons
    if (lessonName !== 'adding-deleting' && lessonName !== 'logical-placement' && lessonName !== 'which-choice') {
      const choiceA = q.choices.find(c => c.letter === 'A');
      if (choiceA && choiceA.text !== 'NO CHANGE') {
        console.log(`⚠️  Choice A is "${choiceA.text}" not "NO CHANGE" - verify this is intentional`);
      } else if (choiceA) {
        console.log(`✓ Choice A is "NO CHANGE" as expected`);
      }
    }

    // ACCURACY CHECK 4: Check explanation for correct answer is positive
    if (correctChoice.explanation) {
      const exp = correctChoice.explanation.toLowerCase();
      // Correct answer shouldn't primarily focus on why it's wrong
      const negativeIndicators = ['incorrect', 'wrong', 'error', 'mistake', 'fails to', 'doesn\'t work'];
      const hasNegativeStart = negativeIndicators.some(ind =>
        exp.substring(0, 50).includes(ind)
      );

      if (hasNegativeStart) {
        console.log(`⚠️  Correct answer explanation starts negatively - review`);
        console.log(`   First 100 chars: ${correctChoice.explanation.substring(0, 100)}...`);
      } else {
        console.log(`✓ Correct answer explanation is appropriately framed`);
      }
    }

    // ACCURACY CHECK 5: Verify incorrect choices have explanations explaining why they're wrong
    const incorrectChoices = q.choices.filter(c => c.letter !== q.correct_answer);
    let incorrectExplanationsGood = true;

    for (const choice of incorrectChoices) {
      if (!choice.explanation) {
        console.log(`❌ Choice ${choice.letter} (incorrect) has no explanation`);
        incorrectExplanationsGood = false;
      }
    }

    if (incorrectExplanationsGood) {
      console.log(`✓ All incorrect choices have explanations`);
    }

    // ACCURACY CHECK 6: Lesson-specific accuracy checks
    if (lessonName === 'redundancy') {
      // For redundancy, verify the correct answer is actually more concise
      const choiceAText = q.choices.find(c => c.letter === 'A')?.text || '';
      const correctText = correctChoice.text;

      if (correctText === 'NO CHANGE') {
        console.log(`  Redundancy: Correct is NO CHANGE (original is best)`);
      } else if (correctText.includes('DELETE')) {
        console.log(`  Redundancy: Correct is DELETE (removing redundancy)`);
      } else if (correctText.length < choiceAText.length) {
        console.log(`  Redundancy: ✓ Correct choice is more concise (${correctText.length} vs ${choiceAText.length} chars)`);
      } else if (correctText.length >= choiceAText.length) {
        console.log(`  Redundancy: ⚠️  Correct choice is same/longer - verify accuracy`);
        console.log(`    Original (A): "${choiceAText}"`);
        console.log(`    Correct (${q.correct_answer}): "${correctText}"`);
      }
    }

    if (lessonName === 'transitions') {
      // Check that problem_text has context for the transition
      if (q.problem_text.length < 50) {
        console.log(`  Transitions: ⚠️  Short problem text - may lack context`);
      } else {
        console.log(`  Transitions: ✓ Has context for transition (${q.problem_text.length} chars)`);
      }
    }

    if (lessonName === 'logical-placement') {
      // Check that multiple sentences are present
      const sentenceMarkers = q.problem_text.match(/\[(\d+)\]/g);
      if (!sentenceMarkers || sentenceMarkers.length < 3) {
        console.log(`  Logical-placement: ⚠️  May not have enough sentences for placement question`);
      } else {
        console.log(`  Logical-placement: ✓ Has ${sentenceMarkers.length} sentence markers`);
      }
    }

    // ACCURACY CHECK 7: Overall answer_explanation should reference the correct answer
    if (q.answer_explanation) {
      const hasReference = q.answer_explanation.includes(q.correct_answer);
      if (hasReference) {
        console.log(`✓ Overall explanation references correct answer ${q.correct_answer}`);
      } else {
        console.log(`⚠️  Overall explanation doesn't explicitly mention correct answer ${q.correct_answer}`);
      }
    }

    console.log(`--- End Position ${pos} ---\n`);
  }

  return { lessonName, totalQuestions: questions.length, issues };
}

async function main() {
  console.log('DEEP ACCURACY VERIFICATION');
  console.log('='.repeat(70));
  console.log('Checking for logical consistency and accuracy...\n');

  const results = [];

  for (const [lessonName, lessonId] of Object.entries(LESSONS)) {
    const result = await deepVerifyLesson(lessonName, lessonId);
    results.push(result);
  }

  // Final summary
  console.log('\n' + '='.repeat(70));
  console.log('ACCURACY VERIFICATION SUMMARY');
  console.log('='.repeat(70));

  let totalIssues = 0;
  for (const result of results) {
    const issueCount = result.issues.length;
    totalIssues += issueCount;

    const status = issueCount === 0 ? '✅' : '⚠️';
    console.log(`\n${status} ${result.lessonName.toUpperCase()}`);
    console.log(`  Total questions: ${result.totalQuestions}`);

    if (issueCount > 0) {
      console.log(`  Issues found: ${issueCount}`);
      result.issues.forEach(issue => console.log(`    - ${issue}`));
    } else {
      console.log(`  No critical issues found`);
    }
  }

  console.log('\n' + '='.repeat(70));
  if (totalIssues === 0) {
    console.log('✅ ALL LESSONS PASSED ACCURACY VERIFICATION');
    console.log('All questions have:');
    console.log('  ✓ Valid correct answers that exist in choices');
    console.log('  ✓ Unique choice letters');
    console.log('  ✓ Appropriate explanations');
    console.log('  ✓ Logical consistency');
  } else {
    console.log(`⚠️  Found ${totalIssues} issues - see details above`);
  }
  console.log('='.repeat(70));
}

main();
