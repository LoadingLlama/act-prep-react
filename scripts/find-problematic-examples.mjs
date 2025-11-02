/**
 * Find examples with potential formatting issues
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function findProblematicExamples() {
  console.log('🔍 Scanning all examples for formatting issues...\n');

  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .order('position');

  if (error) {
    console.error('❌ Error fetching examples:', error);
    return;
  }

  console.log(`Found ${examples.length} total examples\n`);

  const issues = {
    missingProblemText: [],
    missingExplanation: [],
    shortExplanation: [],
    noChoices: [],
    malformedChoices: [],
    noCorrectAnswer: [],
    explanationDoesntMentionAnswer: [],
    hasUndefined: [],
    poorFormatting: []
  };

  for (const example of examples) {
    const id = example.id;
    const title = example.title || 'Untitled';

    // Check for missing problem text
    if (!example.problem_text || example.problem_text.trim() === '') {
      issues.missingProblemText.push({ id, title });
    }

    // Check for missing explanation
    if (!example.answer_explanation || example.answer_explanation.trim() === '') {
      issues.missingExplanation.push({ id, title });
    }

    // Check for very short explanations
    if (example.answer_explanation && example.answer_explanation.length < 30) {
      issues.shortExplanation.push({ id, title, length: example.answer_explanation.length });
    }

    // Check for missing or malformed choices (if not a worked example)
    if (!example.is_worked_example) {
      if (!example.choices || !Array.isArray(example.choices) || example.choices.length === 0) {
        issues.noChoices.push({ id, title });
      } else {
        // Check if choices are properly structured
        const hasInvalidChoice = example.choices.some(choice =>
          !choice.text || !choice.letter || typeof choice.text !== 'string' || typeof choice.letter !== 'string'
        );
        if (hasInvalidChoice) {
          issues.malformedChoices.push({ id, title });
        }
      }
    }

    // Check for missing correct answer
    if (!example.correct_answer) {
      issues.noCorrectAnswer.push({ id, title });
    }

    // Check if explanation mentions the correct answer
    if (example.answer_explanation && example.correct_answer) {
      if (!example.answer_explanation.includes(example.correct_answer)) {
        issues.explanationDoesntMentionAnswer.push({ id, title, answer: example.correct_answer });
      }
    }

    // Check for undefined/null in text
    if (example.answer_explanation &&
        (example.answer_explanation.includes('undefined') || example.answer_explanation.includes('null'))) {
      issues.hasUndefined.push({ id, title });
    }

    // Check for poor formatting (missing spaces after periods, etc.)
    if (example.answer_explanation) {
      // Check for periods followed immediately by capital letters (missing space)
      if (example.answer_explanation.match(/\.[A-Z]/)) {
        issues.poorFormatting.push({ id, title, issue: 'Missing space after period' });
      }
    }
  }

  // Print report
  console.log('═'.repeat(80));
  console.log('📊 FORMATTING ISSUES REPORT');
  console.log('═'.repeat(80));

  const printIssues = (categoryName, items) => {
    if (items.length > 0) {
      console.log(`\n❌ ${categoryName}: ${items.length} examples`);
      items.forEach((item, idx) => {
        console.log(`   ${idx + 1}. ${item.title} (ID: ${item.id.substring(0, 8)}...)`);
        if (item.length !== undefined) console.log(`      Length: ${item.length} characters`);
        if (item.answer) console.log(`      Answer: ${item.answer}`);
        if (item.issue) console.log(`      Issue: ${item.issue}`);
      });
    } else {
      console.log(`\n✅ ${categoryName}: None`);
    }
  };

  printIssues('Missing Problem Text', issues.missingProblemText);
  printIssues('Missing Explanation', issues.missingExplanation);
  printIssues('Very Short Explanation (<30 chars)', issues.shortExplanation);
  printIssues('No Choices', issues.noChoices);
  printIssues('Malformed Choices', issues.malformedChoices);
  printIssues('No Correct Answer', issues.noCorrectAnswer);
  printIssues('Explanation Doesn\'t Mention Answer', issues.explanationDoesntMentionAnswer);
  printIssues('Contains "undefined" or "null"', issues.hasUndefined);
  printIssues('Poor Formatting', issues.poorFormatting);

  // Summary
  const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);
  console.log('\n' + '═'.repeat(80));
  console.log(`📈 SUMMARY: ${totalIssues} total issues found across all categories`);
  console.log('═'.repeat(80));

  if (totalIssues === 0) {
    console.log('\n🎉 All examples look good!');
  }
}

findProblematicExamples().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
