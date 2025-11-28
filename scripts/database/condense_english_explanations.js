const fs = require('fs');

// Read the English questions file
const englishQuestions = JSON.parse(fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/english_questions.json', 'utf8'));

/**
 * Condense an explanation to match the perfect example style
 * Main explanation: 1-2 sentences, mention specific text/concept
 * Wrong answers: 1 concise sentence each
 */
function condenseExplanation(question, originalExplanation) {
  // Parse the original explanation to extract the core reasoning
  const correctAnswer = question.correct_answer;
  const choices = question.choices;
  const questionText = question.question_text;

  // Find wrong answer choices
  const wrongChoices = {};
  choices.forEach(choice => {
    const choiceLetter = choice[0];
    if (choiceLetter !== correctAnswer) {
      wrongChoices[choiceLetter] = choice.substring(3); // Remove letter and ". "
    }
  });

  // Extract the main explanation and wrong answer explanations from the original
  let mainExpl = '';
  const wrongExpl = {};

  // Try to extract main explanation (first sentence/paragraph before "Why Other Answers Are Wrong")
  const parts = originalExplanation.split('Why Other Answers Are Wrong');
  if (parts.length > 0) {
    const mainPart = parts[0];
    // Extract text between first <div> tags
    const mainMatch = mainPart.match(/<div[^>]*>\n([^<]*)<\/div>/);
    if (mainMatch) {
      mainExpl = mainMatch[1].trim();
    }
  }

  // Extract wrong answer explanations
  const wrongParts = originalExplanation.split('Choice ');
  for (let i = 1; i < wrongParts.length; i++) {
    const part = wrongParts[i];
    const letterMatch = part.match(/^([A-J]):/);
    if (letterMatch) {
      const letter = letterMatch[1];
      // Extract first sentence
      const textMatch = part.match(/>([^<]*)<\/div>/);
      if (textMatch) {
        let text = textMatch[1].trim();
        // Remove quotes around text and keep the error explanation
        text = text.replace(/[""]/g, '');
        // Keep only the first sentence if multiple
        const sentences = text.split(/[.!?]/);
        if (sentences[0]) {
          wrongExpl[letter] = sentences[0].trim() + '.';
        }
      }
    }
  }

  // Build condensed explanation HTML
  const wrongHTML = Object.entries(wrongChoices)
    .filter(([letter]) => wrongExpl[letter])
    .map(([letter, choice]) => {
      return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> ${wrongExpl[letter]}</div>`;
    })
    .join('\n');

  const condensed = `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${mainExpl}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongHTML}
</div>
</div>`;

  return condensed;
}

// Process all English questions
let processedCount = 0;
let totalQuestions = englishQuestions.length;

// Only process questions 1-75
const englishQuestionsToProcess = englishQuestions.filter(q => q.question_number && q.question_number >= 1 && q.question_number <= 75);

console.log(`Found ${englishQuestionsToProcess.length} English questions to condense\n`);

englishQuestionsToProcess.forEach((question, index) => {
  const originalExplanation = question.explanation;

  if (originalExplanation && originalExplanation.length > 0) {
    const condensedExplanation = condenseExplanation(question, originalExplanation);
    question.explanation = condensedExplanation;
    processedCount++;

    if ((index + 1) % 10 === 0) {
      console.log(`✓ Processed ${index + 1}/${englishQuestionsToProcess.length} questions`);
    }
  }
});

// Write back to file
fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/english_questions.json', JSON.stringify(englishQuestions, null, 2));

console.log(`\n✓ Successfully condensed ${processedCount} English explanations`);
console.log(`Saved to: /Users/cadenchiang/Desktop/act-prep-react/english_questions.json`);
