const fs = require('fs');

// Read the original questions
const questions = JSON.parse(fs.readFileSync('original-questions.json', 'utf8'));

// Function to parse choices and extract all letters
function getAllChoiceLetters(choices) {
  // Handle case where choices might be a string or array
  let choicesArray = choices;
  if (typeof choices === 'string') {
    try {
      choicesArray = JSON.parse(choices);
    } catch (e) {
      return [];
    }
  }

  if (!Array.isArray(choicesArray)) {
    return [];
  }

  return choicesArray.map(choice => {
    const match = choice.match(/^([A-J])\./);
    return match ? match[1] : null;
  }).filter(Boolean);
}

// Function to reformat a single explanation
function reformatExplanation(question) {
  const correctAnswer = question.correct_answer;
  const explanation = question.explanation;
  const choices = question.choices;

  // Get all choice letters
  const allLetters = getAllChoiceLetters(choices);

  // Extract the main correct answer explanation
  // Look for "The correct answer is X because..." or "The correct answer is X (NO CHANGE) because..."
  let correctExplanation = '';

  // Try to find the explanation for the correct answer
  const correctPattern = new RegExp(
    `The correct answer is ${correctAnswer}[^.]*?(?:because|\\(NO CHANGE\\))[\\s\\S]*?(?=Choice [A-J]|$)`,
    'i'
  );
  const correctMatch = explanation.match(correctPattern);

  if (correctMatch) {
    correctExplanation = correctMatch[0]
      .replace(new RegExp(`The correct answer is ${correctAnswer}\\s+(?:\\(NO CHANGE\\)\\s+)?because\\s+`, 'i'), '')
      .replace(/Choice [A-J].*$/s, '')
      .trim();
  } else {
    // Fallback: take everything before the first "Choice X" mention
    const firstChoiceMatch = explanation.match(/^([\\s\\S]*?)(?=Choice [A-J])/);
    if (firstChoiceMatch) {
      correctExplanation = firstChoiceMatch[1]
        .replace(/^The correct answer is [A-J].*?because\\s+/i, '')
        .trim();
    } else {
      correctExplanation = explanation.trim();
    }
  }

  // Extract wrong answer explanations
  const wrongAnswers = [];

  for (let letter of allLetters) {
    if (letter !== correctAnswer) {
      // Find this choice's explanation
      const choicePattern = new RegExp(
        `Choice ${letter}\\s*(?:\\([^)]+\\))?\\s*([\\s\\S]*?)(?=Choice [A-J]|$)`,
        'i'
      );
      const choiceMatch = explanation.match(choicePattern);

      let choiceExplanation = '';
      if (choiceMatch && choiceMatch[1]) {
        choiceExplanation = choiceMatch[1].trim();

        // Clean up common patterns
        choiceExplanation = choiceExplanation
          .replace(/^is incorrect because\\s+/i, '')
          .replace(/^incorrectly\\s+/i, 'Incorrectly ')
          .replace(/^creates?\\s+/i, 'Creates ')
          .replace(/^uses?\\s+/i, 'Uses ')
          .replace(/^\\(NO CHANGE\\)\\s+/i, '(NO CHANGE) ');

        // Ensure it starts with a capital letter
        if (choiceExplanation) {
          choiceExplanation = choiceExplanation.charAt(0).toUpperCase() + choiceExplanation.slice(1);
        }
      }

      // If no explanation found, provide a default
      if (!choiceExplanation) {
        choiceExplanation = 'Incorrect based on the explanation for the correct answer.';
      }

      wrongAnswers.push({
        letter,
        explanation: choiceExplanation
      });
    }
  }

  // Build the new formatted explanation
  let newExplanation = `**Correct Answer: ${correctAnswer}**\n`;
  newExplanation += `${correctExplanation}\n\n`;
  newExplanation += `**Why Other Answers Are Wrong:**\n\n`;

  for (let wrong of wrongAnswers) {
    newExplanation += `**Choice ${wrong.letter}:** ${wrong.explanation}\n\n`;
  }

  return newExplanation.trim();
}

// Reformat all explanations
const reformattedQuestions = questions.map(question => {
  try {
    return {
      id: question.id,
      question_number: question.question_number,
      old_explanation: question.explanation,
      new_explanation: reformatExplanation(question)
    };
  } catch (error) {
    console.error(`Error reformatting question ${question.question_number}:`, error.message);
    return {
      id: question.id,
      question_number: question.question_number,
      old_explanation: question.explanation,
      new_explanation: `**Error**: Could not reformat this explanation automatically.`
    };
  }
});

// Save to JSON file
fs.writeFileSync(
  'reformatted-explanations.json',
  JSON.stringify(reformattedQuestions, null, 2)
);

console.log(`Successfully reformatted ${reformattedQuestions.length} explanations!`);

// Show first 3 samples
console.log('\n--- Sample Reformatted Explanations ---\n');
for (let i = 0; i < Math.min(3, reformattedQuestions.length); i++) {
  console.log(`\n=== Question ${reformattedQuestions[i].question_number} ===`);
  console.log(reformattedQuestions[i].new_explanation);
  console.log('\n');
}
