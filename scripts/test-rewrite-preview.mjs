/**
 * Test the rewrite logic on a few examples before running on all 231
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function extractReasonForChoice(letter, originalExplanation, isCorrect) {
  if (!originalExplanation) {
    return isCorrect ? 'Correct answer' : 'Incorrect';
  }

  const lowerExpl = originalExplanation.toLowerCase();

  // Try to find mentions of the choice in the original explanation
  const patterns = [
    // Pattern: "A. "text" → reason"
    new RegExp(`${letter}\\.\\s*["""]?([^"""]+)["""]?\\s*[→:-]\\s*([^✗✓\\n]{10,150})`, 'i'),
    // Pattern: "A. text - reason"
    new RegExp(`${letter}\\.\\s*([^-→\\n]{5,50})\\s*[-→]\\s*([^✗✓\\n]{10,100})`, 'i'),
    // Pattern: just find the letter followed by text
    new RegExp(`${letter}[:\\.]\\s*([^\\n]{15,120})`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = originalExplanation.match(pattern);
    if (match) {
      // Get the last capture group (the reason)
      let reason = match[match.length - 1]?.trim();
      if (reason) {
        // Clean up
        reason = reason.replace(/^[→:-]\s*/, '');
        reason = reason.replace(/[✗✓]/g, '').trim();

        // Remove trailing punctuation if it's cut off
        reason = reason.replace(/\s*\.\.\.$/, '');

        // Truncate if too long
        if (reason.length > 100) {
          reason = reason.substring(0, 97) + '...';
        }

        return reason;
      }
    }
  }

  // Fallback: extract from context
  if (isCorrect) {
    // Look for positive indicators
    if (lowerExpl.includes('correct') || lowerExpl.includes('right answer')) {
      const correctMatch = originalExplanation.match(/[^.!?]{20,100}(correct|right)/i);
      if (correctMatch) {
        let reason = correctMatch[0].trim();
        if (reason.length > 100) reason = reason.substring(0, 97) + '...';
        return reason;
      }
    }
    return 'Meets all requirements';
  } else {
    return 'Does not meet the requirement';
  }
}

function rewriteExplanation(example) {
  const { choices, correct_answer, answer_explanation } = example;

  if (!choices || !correct_answer) {
    console.warn(`Example ${example.id} missing choices or correct_answer`);
    return answer_explanation;
  }

  const choicesArray = Array.isArray(choices) ? choices : [];
  let newExplanation = '';

  choicesArray.forEach(choice => {
    const { letter, text } = choice;
    const isCorrect = letter === correct_answer;
    const symbol = isCorrect ? '✓' : '✗';
    const reason = extractReasonForChoice(letter, answer_explanation, isCorrect);

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

  console.log(`Testing rewrite on ${examples.length} examples\n`);

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

    console.log('\n--- NEW EXPLANATION (PREVIEW) ---');
    const newExplanation = rewriteExplanation(ex);
    console.log(newExplanation);
    console.log('');
  });

  console.log('\nIf these look good, run: node scripts/rewrite-all-explanations.mjs');
}

testRewrite().then(() => process.exit(0));
