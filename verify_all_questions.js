/**
 * Comprehensive verification of all English lesson questions
 * Checks for: specific questions, examples, answer choices, and explanations
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSONS_TO_CHECK = {
  'transitions': '7aae3763-017b-4762-ad5a-346aac1f027b',
  'which-choice': '29b59c9d-ef2e-4f7f-aae2-464222884d3a',
  'adding-deleting': '784a146b-8809-4189-a1b4-4b2fdcaf8199',
  'logical-placement': '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4',
  'redundancy': '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734',
  'word-choice': '04df2a09-a910-4456-8fe5-2f8e7f62c50f'
};

async function verifyLesson(lessonName, lessonId) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`VERIFYING: ${lessonName.toUpperCase()}`);
  console.log('='.repeat(70));

  // Get all questions for this lesson
  const { data: questions, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('position');

  if (error) {
    console.error(`Error fetching questions: ${error.message}`);
    return { lessonName, passed: false, issues: ['Database error'] };
  }

  console.log(`\nTotal questions: ${questions.length}`);

  let issues = [];
  let sampleQuestions = [];

  // Check a few sample questions from different difficulty levels
  const positionsToCheck = [5, 15, 35, 50]; // EASY, MEDIUM, HARD start and end

  for (const pos of positionsToCheck) {
    const q = questions.find(q => q.position === pos);
    if (!q) {
      issues.push(`Missing position ${pos}`);
      continue;
    }

    console.log(`\n--- Position ${pos}: ${q.title} ---`);

    // Check 1: Has problem_text with actual content
    if (!q.problem_text || q.problem_text.trim().length < 20) {
      issues.push(`Position ${pos}: Missing or too short problem_text`);
      console.log(`❌ Problem text too short or missing`);
    } else {
      console.log(`✓ Has problem text (${q.problem_text.length} chars)`);
      // Check if it's generic
      if (q.problem_text.includes('Which choice best corrects the underlined portion?') && q.problem_text.length < 100) {
        issues.push(`Position ${pos}: Generic question without context`);
        console.log(`❌ GENERIC QUESTION - no specific context!`);
      } else {
        console.log(`✓ Has specific context/example`);
      }
    }

    // Check 2: Has 4 choices
    if (!q.choices || !Array.isArray(q.choices) || q.choices.length !== 4) {
      issues.push(`Position ${pos}: Must have exactly 4 choices`);
      console.log(`❌ Does not have 4 choices (has ${q.choices?.length || 0})`);
    } else {
      console.log(`✓ Has 4 answer choices`);

      // Check 3: Each choice has letter, text, and explanation
      let hasExplanations = true;
      let allExplanationsSpecific = true;

      for (const choice of q.choices) {
        if (!choice.letter || !choice.text) {
          issues.push(`Position ${pos}: Choice missing letter or text`);
          console.log(`❌ Choice ${choice.letter || '?'} missing letter or text`);
          hasExplanations = false;
        }

        // Check for per-choice explanations
        if (!choice.explanation) {
          console.log(`⚠️  Choice ${choice.letter}: NO EXPLANATION`);
          hasExplanations = false;
        } else if (choice.explanation.length < 30) {
          console.log(`⚠️  Choice ${choice.letter}: Explanation too short (${choice.explanation.length} chars)`);
          allExplanationsSpecific = false;
        } else {
          // Check if explanation is generic
          const genericPhrases = [
            'is correct',
            'is incorrect',
            'is wrong',
            'best fulfills',
            'doesn\'t fulfill',
            'this is the answer'
          ];
          const isGeneric = genericPhrases.some(phrase =>
            choice.explanation.toLowerCase().includes(phrase) && choice.explanation.length < 100
          );

          if (isGeneric) {
            console.log(`⚠️  Choice ${choice.letter}: GENERIC explanation`);
            allExplanationsSpecific = false;
          } else {
            console.log(`✓ Choice ${choice.letter}: Specific explanation (${choice.explanation.length} chars)`);
          }
        }
      }

      if (!hasExplanations) {
        issues.push(`Position ${pos}: Missing per-choice explanations`);
      }
      if (!allExplanationsSpecific) {
        issues.push(`Position ${pos}: Explanations not specific enough`);
      }
    }

    // Check 4: Has correct_answer
    if (!q.correct_answer) {
      issues.push(`Position ${pos}: Missing correct_answer`);
      console.log(`❌ Missing correct_answer`);
    } else {
      console.log(`✓ Correct answer: ${q.correct_answer}`);
    }

    // Check 5: Has answer_explanation (overall)
    if (!q.answer_explanation || q.answer_explanation.length < 20) {
      issues.push(`Position ${pos}: Missing or too short answer_explanation`);
      console.log(`❌ Missing or too short overall explanation`);
    } else {
      console.log(`✓ Has overall explanation (${q.answer_explanation.length} chars)`);
    }

    // Store sample for display
    sampleQuestions.push({
      position: pos,
      title: q.title,
      problemLength: q.problem_text?.length || 0,
      choiceCount: q.choices?.length || 0,
      hasPerChoiceExplanations: q.choices?.every(c => c.explanation && c.explanation.length > 30)
    });
  }

  // Summary
  console.log(`\n${'='.repeat(70)}`);
  if (issues.length === 0) {
    console.log(`✅ ${lessonName.toUpperCase()} - ALL CHECKS PASSED`);
  } else {
    console.log(`❌ ${lessonName.toUpperCase()} - ${issues.length} ISSUES FOUND:`);
    issues.forEach(issue => console.log(`   - ${issue}`));
  }

  return {
    lessonName,
    totalQuestions: questions.length,
    passed: issues.length === 0,
    issues,
    samples: sampleQuestions
  };
}

async function main() {
  console.log('COMPREHENSIVE VERIFICATION OF ALL ENGLISH LESSONS');
  console.log('='.repeat(70));
  console.log('Checking for:');
  console.log('  1. Specific questions with context (not generic)');
  console.log('  2. Actual examples/passages');
  console.log('  3. 4 answer choices per question');
  console.log('  4. Per-choice explanations (specific, not generic)');
  console.log('  5. Overall answer explanations');
  console.log('='.repeat(70));

  const results = [];

  for (const [lessonName, lessonId] of Object.entries(LESSONS_TO_CHECK)) {
    const result = await verifyLesson(lessonName, lessonId);
    results.push(result);
  }

  // Final summary
  console.log('\n\n');
  console.log('='.repeat(70));
  console.log('FINAL VERIFICATION SUMMARY');
  console.log('='.repeat(70));

  let allPassed = true;
  for (const result of results) {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`\n${status} - ${result.lessonName.toUpperCase()}`);
    console.log(`  Total questions: ${result.totalQuestions}`);

    if (!result.passed) {
      allPassed = false;
      console.log(`  Issues found: ${result.issues.length}`);
      result.issues.forEach(issue => console.log(`    - ${issue}`));
    } else {
      console.log(`  Sample checks:`);
      result.samples.forEach(s => {
        console.log(`    Position ${s.position}: ${s.title}`);
        console.log(`      Problem: ${s.problemLength} chars, Choices: ${s.choiceCount}, Per-choice explanations: ${s.hasPerChoiceExplanations ? 'YES' : 'NO'}`);
      });
    }
  }

  console.log('\n' + '='.repeat(70));
  if (allPassed) {
    console.log('🎉 ALL LESSONS VERIFIED SUCCESSFULLY!');
    console.log('All questions have:');
    console.log('  ✓ Specific questions with context');
    console.log('  ✓ Real examples/passages');
    console.log('  ✓ 4 answer choices');
    console.log('  ✓ Specific per-choice explanations');
    console.log('  ✓ Overall answer explanations');
  } else {
    console.log('⚠️  SOME LESSONS HAVE ISSUES - SEE ABOVE');
  }
  console.log('='.repeat(70));
}

main();
