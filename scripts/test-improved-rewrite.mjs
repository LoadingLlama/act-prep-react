/**
 * Test the improved rewrite logic
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function extractReasonForChoice(letter, choiceText, originalExplanation, isCorrect) {
  if (!originalExplanation) {
    return isCorrect ? 'Correct answer' : 'Incorrect';
  }

  // Pattern 1: "A. "text" → reason ✗/✓"
  const pattern1 = new RegExp(
    `${letter}\\.\\s*["""]?[^"""→]*["""]?\\s*[→:-]\\s*([^✗✓\\n]+)[✗✓]?`,
    'i'
  );
  const match1 = originalExplanation.match(pattern1);
  if (match1 && match1[1]) {
    let reason = match1[1].trim();
    reason = reason.replace(/[✗✓\s]+$/, '').trim();
    if (reason.length > 100) {
      reason = reason.substring(0, 97) + '...';
    }
    if (reason.length > 5) return reason;
  }

  // Pattern 2: "A. text - reason"
  const pattern2 = new RegExp(
    `${letter}\\.\\s*[^-→\\n]{3,50}\\s*[-–—]\\s*([^✗✓\\n]{5,120})`,
    'i'
  );
  const match2 = originalExplanation.match(pattern2);
  if (match2 && match2[1]) {
    let reason = match2[1].trim();
    reason = reason.replace(/[✗✓\s]+$/, '').trim();
    if (reason.length > 100) {
      reason = reason.substring(0, 97) + '...';
    }
    if (reason.length > 5) return reason;
  }

  // Pattern 3: Look for the choice text followed by explanation
  const escapedChoiceText = choiceText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern3 = new RegExp(
    `${escapedChoiceText}[\\s:,-]*([^\\n]{10,120})`,
    'i'
  );
  const match3 = originalExplanation.match(pattern3);
  if (match3 && match3[1]) {
    let reason = match3[1].trim();
    reason = reason.replace(/[✗✓\s]+$/, '').trim();
    reason = reason.replace(/^[→:,-]\s*/, '');
    if (reason.length > 100) {
      reason = reason.substring(0, 97) + '...';
    }
    if (reason.length > 5) return reason;
  }

  // Fallback: Generic reasons based on correctness
  if (isCorrect) {
    const lines = originalExplanation.split('\n');
    for (const line of lines) {
      if (line.includes('=') && line.length < 100 && line.length > 10) {
        return line.trim();
      }
    }
    return 'Correct answer';
  } else {
    if (originalExplanation.toLowerCase().includes('would need')) {
      const needMatch = originalExplanation.match(/would need[^✗\n]{5,60}/i);
      if (needMatch) return needMatch[0].trim();
    }
    if (originalExplanation.toLowerCase().includes('should be')) {
      const shouldMatch = originalExplanation.match(/should be[^✗\n]{5,60}/i);
      if (shouldMatch) return shouldMatch[0].trim();
    }
    return 'Does not satisfy the requirement';
  }
}

function rewriteExplanation(example) {
  const { choices, correct_answer, answer_explanation } = example;

  if (!choices || !correct_answer) {
    return answer_explanation;
  }

  const choicesArray = Array.isArray(choices) ? choices : [];
  let newExplanation = '';

  choicesArray.forEach(choice => {
    const { letter, text } = choice;
    const isCorrect = letter === correct_answer;
    const symbol = isCorrect ? '✓' : '✗';
    const reason = extractReasonForChoice(letter, text, answer_explanation, isCorrect);

    newExplanation += `${letter}. "${text}" → ${reason} ${symbol}\n`;
  });

  newExplanation += `\nThe answer is ${correct_answer}.`;

  return newExplanation.trim();
}

async function testRewrite() {
  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(5);

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log(`Testing improved rewrite on ${examples.length} examples\n`);

  examples.forEach((ex, idx) => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Example ${idx + 1}: ${ex.title}`);
    console.log('='.repeat(80));

    console.log('\nChoices:');
    ex.choices.forEach(c => {
      const marker = c.letter === ex.correct_answer ? '✓' : ' ';
      console.log(`  ${c.letter}. ${c.text} ${marker}`);
    });

    console.log('\n--- CURRENT EXPLANATION ---');
    console.log(ex.answer_explanation);

    console.log('\n--- NEW EXPLANATION (IMPROVED) ---');
    const newExplanation = rewriteExplanation(ex);
    console.log(newExplanation);
    console.log('');
  });

  console.log('\nIf these look good, run: node scripts/rewrite-all-explanations-improved.mjs');
}

testRewrite().then(() => process.exit(0));
