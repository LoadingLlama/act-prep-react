/**
 * Test the final rewrite logic on diverse examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function hasChoiceAnalysis(explanation) {
  if (!explanation) return false;
  const hasMultipleChoices = (explanation.match(/[A-E]\./g) || []).length >= 3;
  const hasSymbols = explanation.includes('✗') || explanation.includes('✓');
  return hasMultipleChoices && hasSymbols;
}

function extractFromChoiceAnalysis(letter, explanation) {
  if (!explanation) return null;

  const patterns = [
    new RegExp(`${letter}\\.\\s*[^→\\n]*→\\s*([^✗✓\\n]+)`, 'i'),
    new RegExp(`${letter}\\.\\s*[^-\\n]*-\\s*([^✗✓\\n]+)`, 'i'),
    new RegExp(`${letter}\\s*\\(.*?\\)\\s*[:""]?\\s*([^✗✓\\n]{10,100})`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = explanation.match(pattern);
    if (match && match[1]) {
      let reason = match[1].trim();
      reason = reason.replace(/^[→:-]\s*/, '');
      reason = reason.replace(/[✗✓\s]+$/, '').trim();
      if (reason.length > 5 && reason.length < 120) {
        return reason;
      }
    }
  }

  return null;
}

function getReasonForChoice(letter, choiceText, originalExplanation, isCorrect) {
  if (!originalExplanation) {
    return isCorrect ? 'Correct solution' : 'Incorrect';
  }

  if (hasChoiceAnalysis(originalExplanation)) {
    const extracted = extractFromChoiceAnalysis(letter, originalExplanation);
    if (extracted) return extracted;
  }

  if (isCorrect) {
    const lines = originalExplanation.split('\n');
    for (const line of lines) {
      if (line.includes('=') && line.includes(choiceText) && line.length < 100) {
        return line.trim();
      }
      if (line.includes('=') && line.length < 80 && line.length > 10) {
        const lastLine = line.trim();
        if (lastLine) return lastLine;
      }
    }

    const answerPattern = new RegExp(`answer is ${letter}[^\\n]{0,100}`, 'i');
    const answerMatch = originalExplanation.match(answerPattern);
    if (answerMatch) {
      const context = originalExplanation.substring(
        Math.max(0, answerMatch.index - 100),
        answerMatch.index
      );
      const contextLines = context.split('\n').filter(l => l.trim());
      if (contextLines.length > 0) {
        const lastContext = contextLines[contextLines.length - 1];
        if (lastContext.length < 100 && lastContext.length > 10) {
          return lastContext.trim();
        }
      }
    }

    return 'Correct solution';
  }

  const incorrectPatterns = [
    /would need/i,
    /should be/i,
    /incorrect/i,
    /wrong/i,
    /doesn'?t (work|fit|match|satisfy)/i,
    /can'?t be/i,
  ];

  for (const pattern of incorrectPatterns) {
    if (originalExplanation.toLowerCase().match(pattern)) {
      const match = originalExplanation.match(new RegExp(`.{0,80}${pattern.source}.{0,40}`, 'i'));
      if (match) {
        let reason = match[0].trim();
        reason = reason.replace(/[✗✓]/g, '').trim();
        if (reason.length > 100) {
          reason = reason.substring(0, 97) + '...';
        }
        if (reason.length > 10) return reason;
      }
    }
  }

  return 'Does not satisfy the requirement';
}

function rewriteExplanation(example) {
  const { choices, correct_answer, answer_explanation, title } = example;

  if (!choices || !correct_answer) {
    return answer_explanation;
  }

  const choicesArray = Array.isArray(choices) ? choices : [];
  let newExplanation = '';

  choicesArray.forEach(choice => {
    const { letter, text } = choice;
    const isCorrect = letter === correct_answer;
    const symbol = isCorrect ? '✓' : '✗';
    const reason = getReasonForChoice(letter, text, answer_explanation, isCorrect);

    newExplanation += `${letter}. "${text}" → ${reason} ${symbol}\n`;
  });

  newExplanation += `\nThe answer is ${correct_answer}.`;

  return newExplanation.trim();
}

async function testRewrite() {
  // Test on different ranges to see variety
  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .range(0, 7);

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log(`Testing final rewrite on ${examples.length} examples\n`);

  examples.forEach((ex, idx) => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Example ${idx + 1}: ${ex.title}`);
    console.log('='.repeat(80));

    console.log('\nChoices:');
    ex.choices.forEach(c => {
      const marker = c.letter === ex.correct_answer ? '✓' : ' ';
      console.log(`  ${c.letter}. ${c.text} ${marker}`);
    });

    console.log('\n--- NEW EXPLANATION ---');
    const newExplanation = rewriteExplanation(ex);
    console.log(newExplanation);
    console.log('');
  });

  console.log('\n✓ If these look good, run: node scripts/rewrite-final.mjs');
}

testRewrite().then(() => process.exit(0));
