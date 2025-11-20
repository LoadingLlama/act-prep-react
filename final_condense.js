const fs = require('fs');

// Read the English questions file
const englishQuestions = JSON.parse(fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/english_questions.json', 'utf8'));

/**
 * Parse explanation HTML to get clean text
 */
function parseExplanationHTML(html) {
  // Extract main explanation - get text between first div's opening tag and </div>
  const mainMatch = html.match(/<div style="line-height: 1\.6[^>]*>\n(.+?)\n<\/div>/s);
  let mainText = mainMatch ? mainMatch[1].trim() : '';

  // Extract all choice explanations - get text after "Choice X:" and before "</div>"
  const wrongAnswers = {};
  const choicePattern = /<strong>Choice ([A-J])(?:\s*\([^)]*\))?:<\/strong>\s*([^<]+)</g;
  let match;
  while ((match = choicePattern.exec(html)) !== null) {
    wrongAnswers[match[1]] = match[2].trim();
  }

  return { mainText, wrongAnswers };
}

/**
 * Condense main explanation to 1-2 SHORT sentences
 */
function condenseMainExpl(text) {
  if (!text) return '';

  // Remove this, choice prefixes
  let condensed = text.replace(/^This choice /i, '');
  condensed = condensed.replace(/^Choice [A-Z] /i, '');

  // Get first sentence
  const firstSentence = condensed.match(/[^.!?]+[.!?]/);
  if (!firstSentence) return text.substring(0, 150) + '.';

  let result = firstSentence[0].trim();

  // If it's about a quote + action, that's good
  if (result.includes('"')) {
    // Perfect, keep the quoted choice + its effect
    return result;
  }

  // Otherwise keep first sentence, limit to ~160 chars
  if (result.length > 160) {
    result = result.substring(0, 157) + '.';
  }

  return result;
}

/**
 * Extract concise error description from wrong answer
 */
function condenseWrongAnswer(text) {
  if (!text) return 'Incorrect.';

  // Remove quoted choice text (e.g., '"Mantas are" ')
  let condensed = text.replace(/^"[^"]*"\s+/i, '');

  // Check for specific error types - if found, return concise version
  if (condensed.match(/comma splice/i)) {
    return 'Creates a comma splice.';
  }
  if (condensed.match(/sentence fragment|fragment|incomplete/i)) {
    return 'Creates a sentence fragment.';
  }
  if (condensed.match(/subject.*verb.*agree|verb.*subject.*agree/i)) {
    return 'Subject and verb do not agree.';
  }
  if (condensed.match(/dangling.*modifier|modifier.*dangling/i)) {
    return 'Creates a dangling modifier.';
  }
  if (condensed.match(/misplaced.*modifier|modifier.*misplaced/i)) {
    return 'Creates a misplaced modifier.';
  }
  if (condensed.match(/pronoun.*antecedent|antecedent.*pronoun/i)) {
    return 'Pronoun and antecedent do not agree.';
  }
  if (condensed.match(/parallel/i)) {
    return 'Breaks parallel structure.';
  }
  if (condensed.match(/tense/i)) {
    return 'Incorrect verb tense.';
  }
  if (condensed.match(/modifier/i)) {
    return 'Modifier placement is incorrect.';
  }

  // Generic: try to extract first phrase about what's wrong
  // First, get the first sentence
  const firstSent = condensed.split(/[.!?]/)[0];

  // Remove wordy intros
  let error = firstSent
    .replace(/^This /, '')
    .replace(/^The /, '')
    .replace(/incorrectly |improperly |unnecessarily /i, '')
    .replace(/does not address.*that /, '')
    .replace(/doesn't address.*that /, '');

  error = error.trim();

  // If still too long, truncate
  if (error.length > 90) {
    // Find a good break point (before "by", "because", "with")
    const breakPoint = error.match(/ by | because | while | with | and /);
    if (breakPoint) {
      const idx = error.indexOf(breakPoint[0]);
      error = error.substring(0, idx) + '.';
    } else {
      error = error.substring(0, 87) + '.';
    }
  } else if (!error.endsWith('.') && !error.endsWith('?')) {
    error += '.';
  }

  return error;
}

/**
 * Build final condensed HTML
 */
function buildFinalHTML(mainText, wrongAnswers) {
  const main = condenseMainExpl(mainText);
  if (!main || Object.keys(wrongAnswers).length === 0) return null;

  const wrongHTML = Object.entries(wrongAnswers)
    .map(([letter, text]) => {
      const condensed = condenseWrongAnswer(text);
      return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> ${condensed}</div>`;
    })
    .join('\n');

  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${main}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongHTML}
</div>
</div>`;
}

// Process all 75 English questions
let processedCount = 0;

englishQuestions.forEach((question, index) => {
  if (!question.question_number || question.question_number < 1 || question.question_number > 75) {
    return;
  }

  if (question.explanation && question.explanation.length > 0) {
    try {
      const { mainText, wrongAnswers } = parseExplanationHTML(question.explanation);

      if (mainText && Object.keys(wrongAnswers).length > 0) {
        const finalHTML = buildFinalHTML(mainText, wrongAnswers);
        if (finalHTML) {
          question.explanation = finalHTML;
          processedCount++;
        }
      }
    } catch (e) {
      // Skip problematic questions
    }
  }

  if ((index + 1) % 50 === 0) process.stdout.write('.');
});

// Write back
fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/english_questions.json', JSON.stringify(englishQuestions, null, 2));

console.log(`\n\n✓ Final condensation complete: ${processedCount}/75 English questions\n`);

// Show final samples
console.log('=== FINAL SAMPLE OUTPUTS ===\n');

[1, 2, 3, 4, 5].forEach(qNum => {
  const q = englishQuestions.find(q => q.question_number === qNum);
  if (q && q.explanation) {
    console.log(`Q${qNum}:`);
    console.log(q.explanation);
    console.log('\n---\n');
  }
});
