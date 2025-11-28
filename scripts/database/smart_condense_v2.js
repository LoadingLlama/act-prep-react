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
  const choiceMatches = html.match(/<strong>Choice ([A-J])(?:\s*\(NO CHANGE\))?:<\/strong>\s*(.+?)<\/div>/g);
  if (choiceMatches) {
    choiceMatches.forEach(match => {
      const letterMatch = match.match(/Choice ([A-J])/);
      const textMatch = match.match(/<\/strong>\s*(.+?)<\/div>/);
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
function condenseMain(original) {
  if (!original) return '';

  // Take only the first 1-2 sentences
  const sentences = original.match(/[^.!?]+[.!?]+/g) || [original];
  let condensed = sentences[0].trim();

  // If very long, try to shorten while keeping key info
  if (condensed.length > 180) {
    // Look for key patterns like quoted text + explanation
    if (condensed.includes('"')) {
      const quoteMatch = condensed.match(/"[^"]*"/);
      if (quoteMatch) {
        // Extract the core reason after the quote
        const afterQuote = condensed.substring(condensed.indexOf(quoteMatch[0]) + quoteMatch[0].length);
        // Get first meaningful phrase after quote
        const phraseMatch = afterQuote.match(/\s+(.+?(?:eliminates|fixes|creates|removes|provides|establishes|corrects).*?[.!?])/);
        if (phraseMatch) {
          condensed = `${quoteMatch[0]} ${phraseMatch[1].substring(1)}`.trim();
        }
      }
    }
  }

  // Remove redundant phrases
  condensed = condensed.replace(/This choice /g, '');
  condensed = condensed.replace(/choice /g, '');

  return condensed;
}

/**
 * Condense wrong answer explanation to 1 sentence max, keeping specific error info
 */
function condenseWrong(original) {
  if (!original) return '';

  // Split by period and take first sentence
  const sentences = original.split(/[.!?]+/);
  let condensed = sentences[0].trim();

  // Remove quoted text at start
  if (condensed.startsWith('"')) {
    const quoteEnd = condensed.indexOf('"', 1);
    if (quoteEnd > 0) {
      condensed = condensed.substring(quoteEnd + 1).trim();
    }
  }

  // Remove redundant phrases but keep error type
  condensed = condensed.replace(/^(This|The|This choice) /i, '');
  condensed = condensed.replace(/creates|results in|produces|forms/g, 'creates');
  condensed = condensed.replace(/error|mistake|incorrect|wrong/gi, (match) => match.toLowerCase());

  // Handle common patterns
  if (condensed.includes('comma splice')) {
    condensed = 'Creates a comma splice.';
  } else if (condensed.includes('fragment')) {
    condensed = 'Creates a sentence fragment.';
  } else if (condensed.includes('subject-verb agreement')) {
    condensed = 'Subject and verb do not agree.';
  }

  // Ensure it ends with period
  if (!condensed.endsWith('.') && !condensed.endsWith('?')) {
    condensed += '.';
  }

  // Limit length
  if (condensed.length > 120) {
    condensed = condensed.substring(0, 117) + '...';
  }

  return condensed;
}

/**
 * Build condensed explanation HTML
 */
function buildCondensedHTML(mainExpl, wrongAnswers) {
  const condensedMain = condenseMain(mainExpl);

  if (!condensedMain || Object.keys(wrongAnswers).length === 0) {
    return null; // Can't process this one
  }

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
const problemQuestions = [];

englishQuestions.forEach((question, index) => {
  // Only process questions 1-75
  if (!question.question_number || question.question_number < 1 || question.question_number > 75) {
    return;
  }

  if (question.explanation && question.explanation.length > 0) {
    try {
      const parts = extractExplanationParts(question.explanation);

      if (parts.mainExpl && Object.keys(parts.wrongAnswers).length > 0) {
        const condensed = buildCondensedHTML(parts.mainExpl, parts.wrongAnswers);
        if (condensed) {
          question.explanation = condensed;
          processedCount++;
        } else {
          skippedCount++;
          problemQuestions.push(question.question_number);
        }
      } else {
        skippedCount++;
        problemQuestions.push(question.question_number);
      }
    } catch (e) {
      console.error(`Error processing Q${question.question_number}:`, e.message);
      skippedCount++;
      problemQuestions.push(question.question_number);
    }
  }

  if ((index + 1) % 50 === 0) {
    process.stdout.write('.');
  }
});

// Write back to file
fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/english_questions.json', JSON.stringify(englishQuestions, null, 2));

console.log(`\n\n✓ Successfully processed ${processedCount} English explanations`);
console.log(`⚠ Skipped ${skippedCount} explanations (may need manual review)`);
if (problemQuestions.length > 0 && problemQuestions.length <= 20) {
  console.log(`  Problem questions: ${problemQuestions.join(', ')}`);
}
console.log(`✓ Saved to: /Users/cadenchiang/Desktop/act-prep-react/english_questions.json`);

// Show samples
console.log(`\n--- Sample Condensed Explanations ---`);
[1, 2, 4].forEach(qNum => {
  const q = englishQuestions.find(q => q.question_number === qNum);
  if (q && q.explanation) {
    console.log(`\nQ${qNum} (${q.question_type}):`);
    const preview = q.explanation.substring(0, 250).replace(/\n/g, ' ').replace(/\s+/g, ' ');
    console.log(preview + '...\n');
  }
});
