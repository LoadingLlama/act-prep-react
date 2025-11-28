const fs = require('fs');

// Read the original questions
const questions = JSON.parse(fs.readFileSync('original-questions.json', 'utf8'));

// Function to parse choices and extract all letters
function getAllChoiceLetters(choices) {
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
  let correctExplanation = '';

  // Method 1: Extract everything from start until first "Choice X" mention
  const beforeChoices = explanation.split(/Choice [A-J]/)[0];

  // Clean up the correct answer explanation
  correctExplanation = beforeChoices
    .replace(new RegExp(`^The correct answer is ${correctAnswer}\\s+`, 'i'), '')
    .replace(/^\\(NO CHANGE\\)\\s+because\\s+/i, '')
    .replace(/^because\\s+/i, '')
    .trim();

  // Ensure first letter is capitalized
  if (correctExplanation) {
    correctExplanation = correctExplanation.charAt(0).toUpperCase() + correctExplanation.slice(1);
  }

  // Extract wrong answer explanations
  const wrongAnswers = [];

  for (let letter of allLetters) {
    if (letter !== correctAnswer) {
      // Find this choice's explanation using a more robust pattern
      const choicePattern = new RegExp(
        `Choice ${letter}\\s*(?:\\([^)]*\\))?\\s*([\\s\\S]*?)(?=Choice [A-J]|$)`,
        'g'
      );

      let choiceExplanation = '';
      const matches = [...explanation.matchAll(choicePattern)];

      if (matches.length > 0) {
        // Get the first match
        choiceExplanation = matches[0][1].trim();

        // Clean up common patterns
        choiceExplanation = choiceExplanation
          .replace(/^is incorrect because\\s+/i, '')
          .replace(/^\\(NO CHANGE\\)\\s+/i, '(NO CHANGE) ')
          .replace(/\\s+$/, '')
          .trim();

        // Ensure it starts with a capital letter
        if (choiceExplanation && choiceExplanation.length > 0) {
          choiceExplanation = choiceExplanation.charAt(0).toUpperCase() + choiceExplanation.slice(1);
        }
      }

      // If no explanation found, provide a default
      if (!choiceExplanation) {
        choiceExplanation = 'Incorrect based on the reasons explained for the correct answer.';
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
      new_explanation: reformatExplanation(question)
    };
  } catch (error) {
    console.error(`Error reformatting question ${question.question_number}:`, error.message);
    return {
      id: question.id,
      question_number: question.question_number,
      new_explanation: `**Error**: Could not reformat - ${error.message}`
    };
  }
});

// Save to JSON file
fs.writeFileSync(
  'reformatted-explanations.json',
  JSON.stringify(reformattedQuestions, null, 2)
);

console.log(`✓ Successfully reformatted ${reformattedQuestions.length} explanations!`);
console.log(`✓ Saved to: reformatted-explanations.json`);

// Show first 2 samples
console.log('\n--- Sample Reformatted Explanations ---\n');
for (let i = 0; i < Math.min(2, reformattedQuestions.length); i++) {
  console.log(`Question ${reformattedQuestions[i].question_number}:`);
  console.log(reformattedQuestions[i].new_explanation);
  console.log('\n' + '='.repeat(80) + '\n');
}
