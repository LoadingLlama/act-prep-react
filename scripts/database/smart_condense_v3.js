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
 * Condense main explanation aggressively - 1-2 SHORT sentences
 */
function condenseMain(original) {
  if (!original) return '';

  let condensed = original;

  // Remove redundant openings
  condensed = condensed.replace(/^This choice /i, '');
  condensed = condensed.replace(/^Choice [A-Z] /i, '');
  condensed = condensed.replace(/^"([^"]+)" /g, (match, quoted) => {
    return `"${quoted}" `;
  });

  // Extract first logical unit (quote + reason or just main concept)
  const sentences = condensed.match(/[^.!?]+[.!?]+/g) || [condensed];
  let result = sentences[0].trim();

  // If first sentence has quote and main reason, keep it
  if (result.includes('"') && result.includes('eliminates')) {
    // Good, keep it
  } else if (result.includes('"') && result.includes('creates')) {
    // Good, keep it
  } else if (result.length > 200 && sentences.length > 1) {
    // Too long, try to shorten
    // Look for quote + key verb pattern
    const quoteMatch = result.match(/"[^"]*"/);
    if (quoteMatch) {
      // Find the key action verb after quote
      const afterQuote = result.substring(result.indexOf(quoteMatch[0]) + quoteMatch[0].length);
      const keyMatch = afterQuote.match(/\s+(\w+)s?\s+.{10,80}?[.!?]/i);
      if (keyMatch) {
        result = quoteMatch[0] + ' ' + keyMatch[0].substring(1).trim();
      }
    }
  }

  // Clean up
  result = result.replace(/\s+/g, ' ').trim();
  if (!result.endsWith('.') && !result.endsWith('?')) {
    result += '.';
  }

  return result;
}

/**
 * Extract JUST the error type from wrong answer - very concise
 */
function condenseWrong(original) {
  if (!original) return '';

  let condensed = original;

  // Extract just the error message, no explanation of why
  if (condensed.includes('comma splice')) {
    return 'Creates a comma splice.';
  }
  if (condensed.includes('fragment') || condensed.includes('incomplete')) {
    return 'Creates a sentence fragment.';
  }
  if (condensed.includes('subject') && condensed.includes('verb') && condensed.includes('agree')) {
    return 'Subject and verb do not agree.';
  }
  if (condensed.includes('dangling') || condensed.includes('dangled')) {
    return 'Creates a dangling modifier.';
  }
  if (condensed.includes('misplaced') || condensed.includes('modifier')) {
    return 'Creates a misplaced modifier.';
  }
  if (condensed.includes('pronoun') && condensed.includes('antecedent')) {
    return 'Pronoun and antecedent do not agree.';
  }
  if (condensed.includes('parallel')) {
    return 'Breaks parallel structure.';
  }

  // Generic approach: take first sentence and extract key error
  const firstSentence = condensed.split(/[.!?]/)[0];

  // Remove quoted text at start
  let text = firstSentence.replace(/^[^A-Z]*"[^"]*"\s+/i, '');

  // Remove phrases that just explain, keep the error
  text = text.replace(/This is incorrect because /gi, '');
  text = text.replace(/This incorrectly /gi, '');
  text = text.replace(/This fails to /gi, '');
  text = text.replace(/This doesn't /gi, 'Does not ');
  text = text.replace(/This creates /gi, 'Creates ');
  text = text.replace(/This uses /gi, 'Uses ');
  text = text.replace(/This places /gi, 'Places ');
  text = text.replace(/doesn't address the fundamental problem that /gi, '');
  text = text.replace(/that doesn't match/gi, 'that does not match');
  text = text.replace(/while /gi, 'because ');

  // Clean up and limit
  text = text.replace(/\s+/g, ' ').trim();
  if (!text.endsWith('.') && !text.endsWith('?')) {
    text += '.';
  }

  // Ensure it's reasonably short
  if (text.length > 100) {
    // Try to shorten further
    const parts = text.split(' by ');
    if (parts.length > 1) {
      text = parts[0] + '.';
    } else {
      text = text.substring(0, 97) + '...';
    }
  }

  return text;
}

/**
 * Build condensed explanation HTML
 */
function buildCondensedHTML(mainExpl, wrongAnswers) {
  const condensedMain = condenseMain(mainExpl);

  if (!condensedMain || Object.keys(wrongAnswers).length === 0) {
    return null;
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

englishQuestions.forEach((question, index) => {
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
        }
      } else {
        skippedCount++;
      }
    } catch (e) {
      skippedCount++;
    }
  }

  if ((index + 1) % 50 === 0) {
    process.stdout.write('.');
  }
});

// Write back to file
fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/english_questions.json', JSON.stringify(englishQuestions, null, 2));

console.log(`\n\n✓ Condensed ${processedCount} English explanations (1-75)`);
console.log(`✓ Saved to: /Users/cadenchiang/Desktop/act-prep-react/english_questions.json\n`);

// Show samples
console.log('--- SAMPLE OUTPUTS ---\n');
[1, 2, 4, 5, 10].forEach(qNum => {
  const q = englishQuestions.find(q => q.question_number === qNum);
  if (q && q.explanation) {
    console.log(`Q${qNum}: ${q.question_type}`);
    const html = q.explanation;
    // Extract text content
    const mainMatch = html.match(/<div style="line-height: 1\.6[^>]*>\n(.+?)\n<\/div>/);
    if (mainMatch) {
      console.log(`Main: ${mainMatch[1].substring(0, 80)}${mainMatch[1].length > 80 ? '...' : ''}`);
    }
    const choiceMatches = html.match(/Choice ([A-J]):<\/strong> ([^<]+)</g);
    if (choiceMatches) {
      choiceMatches.forEach(m => {
        const match = m.match(/Choice ([A-J]):<\/strong> ([^<]+)/);
        console.log(`  ${match[1]}: ${match[2].substring(0, 60)}${match[2].length > 60 ? '...' : ''}`);
      });
    }
    console.log();
  }
});
