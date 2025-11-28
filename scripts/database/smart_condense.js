const fs = require('fs');

// Read the English questions file
const englishQuestions = JSON.parse(fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/english_questions.json', 'utf8'));

/**
 * Extract explanation components from HTML explanation
 */
function extractExplanationParts(html) {
  // Extract main explanation (text between first div and "Why Other Answers Are Wrong")
  const mainMatch = html.match(/<div style="line-height: 1\.6[^>]*>\n(.+?)\n<\/div>/);
  const mainExpl = mainMatch ? mainMatch[1].trim() : '';

  // Extract all wrong answer explanations
  const wrongAnswers = {};
  const choiceMatches = html.match(/<strong>Choice ([A-J]):<\/strong>([^<]*)</g);
  if (choiceMatches) {
    choiceMatches.forEach(match => {
      const letterMatch = match.match(/Choice ([A-J])/);
      const textMatch = match.match(/<\/strong>([^<]*)/);
      if (letterMatch && textMatch) {
        const letter = letterMatch[1];
        let text = textMatch[1].trim();
        // Remove opening quote if present
        if (text.startsWith('"')) {
          text = text.substring(1);
        }
        wrongAnswers[letter] = text;
      }
    });
  }

  return { mainExpl, wrongAnswers };
}

/**
 * Condense main explanation to 1-2 sentences max
 */
function condenseMain(original, correct_answer, choices) {
  // Take only the first 1-2 sentences, focusing on specific concepts
  const sentences = original.match(/[^.!?]+[.!?]+/g) || [original];
  let condensed = sentences[0].trim();

  // If first sentence is too long (>150 chars), try to shorten it
  if (condensed.length > 150 && sentences.length > 1) {
    // Try to keep key info
    if (condensed.includes('"')) {
      // Extract quoted portion and reason
      const quoteMatch = condensed.match(/"[^"]*"/);
      if (quoteMatch) {
        // Create shorter version
        condensed = `${quoteMatch[0]} ` + condensed.split('eliminates the')[1].substring(0, 100);
        if (!condensed.endsWith('.')) condensed += '.';
      }
    }
  }

  return condensed;
}

/**
 * Condense wrong answer explanation to 1 sentence max
 */
function condenseWrong(original) {
  // Keep only the core error without extra context
  const sentences = original.split(/[.!?]/);
  if (sentences.length > 0) {
    let condensed = sentences[0].trim();

    // Remove redundant phrases
    condensed = condensed.replace(/This is incorrect because /g, '');
    condensed = condensed.replace(/This incorrectly /g, '');
    condensed = condensed.replace(/This \w+ /g, '');
    condensed = condensed.replace(/doesn't address the fundamental problem that /g, '');
    condensed = condensed.replace(/that doesn't /g, '');
    condensed = condensed.replace(/doesn't match the /g, '');

    // Ensure it ends with period
    if (!condensed.endsWith('.') && !condensed.endsWith('?')) {
      condensed += '.';
    }

    return condensed;
  }
  return original.substring(0, 80) + '.';
}

/**
 * Build condensed explanation HTML
 */
function buildCondensedHTML(mainExpl, wrongAnswers) {
  const condensedMain = condenseMain(mainExpl);
  const wrongHTML = Object.entries(wrongAnswers)
    .map(([letter, text]) => {
      const condensed = condenseWrong(text);
      return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> ${condensed}</div>`;
    })
    .join('\n');

  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${condensedMain}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongHTML}
</div>
</div>`;
}

// Process all English questions (1-75)
let processedCount = 0;
let skippedCount = 0;

englishQuestions.forEach((question, index) => {
  // Only process questions 1-75
  if (!question.question_number || question.question_number < 1 || question.question_number > 75) {
    return;
  }

  if (question.explanation && question.explanation.length > 0) {
    try {
      const parts = extractExplanationParts(question.explanation);

      if (parts.mainExpl && Object.keys(parts.wrongAnswers).length > 0) {
        question.explanation = buildCondensedHTML(parts.mainExpl, parts.wrongAnswers);
        processedCount++;
      } else {
        skippedCount++;
      }
    } catch (e) {
      console.error(`Error processing Q${question.question_number}:`, e.message);
      skippedCount++;
    }
  }

  if ((index + 1) % 10 === 0) {
    console.log(`Processing... ${index + 1} questions reviewed`);
  }
});

// Write back to file
fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/english_questions.json', JSON.stringify(englishQuestions, null, 2));

console.log(`\n✓ Successfully processed ${processedCount} English explanations`);
console.log(`✗ Skipped ${skippedCount} explanations (incomplete data)`);
console.log(`Saved to: /Users/cadenchiang/Desktop/act-prep-react/english_questions.json`);

// Show sample of first processed question
const sample = englishQuestions.find(q => q.question_number === 2);
console.log(`\n--- Sample (Q2) ---`);
console.log(sample.explanation.substring(0, 400));
