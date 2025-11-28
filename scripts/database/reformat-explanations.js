const fs = require('fs');

// Read the original questions
const questions = JSON.parse(fs.readFileSync('original-questions.json', 'utf8'));

// Function to extract the correct answer letter from choices
function getChoiceLetter(question, answerKey) {
  const choices = question.choices;
  // Find the choice that starts with the correct answer letter
  for (let choice of choices) {
    if (choice.startsWith(answerKey + '.') || choice.startsWith(answerKey + ' ')) {
      return answerKey;
    }
  }
  return answerKey;
}

// Function to extract all choice letters from the choices array
function getAllChoiceLetters(choices) {
  return choices.map(choice => {
    const match = choice.match(/^([A-J])\./);
    return match ? match[1] : null;
  }).filter(Boolean);
}

// Function to parse the old explanation and extract information
function parseOldExplanation(explanation, correctAnswer, choices) {
  // Extract the main explanation for the correct answer
  const lines = explanation.split('. ');

  // Get all choice letters
  const allLetters = getAllChoiceLetters(choices);

  // Find mentions of each choice in the explanation
  const choiceExplanations = {};

  for (let letter of allLetters) {
    if (letter !== correctAnswer) {
      // Look for explanations mentioning this choice
      const patterns = [
        new RegExp(`Choice ${letter}[^.]*\\.`, 'gi'),
        new RegExp(`Choice ${letter} \\([^)]+\\)[^.]*\\.`, 'gi'),
        new RegExp(`\\b${letter}\\b[^.]*\\.`, 'gi')
      ];

      for (let pattern of patterns) {
        const matches = explanation.match(pattern);
        if (matches) {
          choiceExplanations[letter] = matches.join(' ').trim();
          break;
        }
      }
    }
  }

  return { allLetters, choiceExplanations };
}

// Function to reformat a single explanation
function reformatExplanation(question) {
  const correctAnswer = question.correct_answer;
  const explanation = question.explanation;
  const choices = question.choices;

  // Parse the explanation
  const parsed = parseOldExplanation(explanation, correctAnswer, choices);

  // Find the correct answer explanation (usually at the beginning)
  const correctExplanationMatch = explanation.match(/The correct answer is [A-J].*?(?=Choice [A-J]|$)/s);
  let correctExplanation = correctExplanationMatch ? correctExplanationMatch[0] : '';

  // Clean up the correct explanation
  correctExplanation = correctExplanation
    .replace(/^The correct answer is [A-J]\s+(because|\\(NO CHANGE\\))\s+/i, '')
    .replace(/Choice [A-J].*$/s, '')
    .trim();

  // Extract wrong answer explanations
  const wrongAnswers = [];
  for (let letter of parsed.allLetters) {
    if (letter !== correctAnswer) {
      let choiceText = choices.find(c => c.startsWith(letter + '.') || c.startsWith(letter + ' '));
      if (choiceText) {
        choiceText = choiceText.replace(/^[A-J]\.?\s*/, '').trim();
      }

      // Find the explanation for this choice
      const patterns = [
        new RegExp(`Choice ${letter} \\(([^)]+)\\)\\s*([^.]+(?:\\.[^C]*)?)(?=Choice [A-J]|$)`, 'i'),
        new RegExp(`Choice ${letter}\\s*([^.]+(?:\\.[^C]*)?)(?=Choice [A-J]|$)`, 'i')
      ];

      let choiceExplanation = '';
      for (let pattern of patterns) {
        const match = explanation.match(pattern);
        if (match) {
          choiceExplanation = match[0]
            .replace(/^Choice [A-J]\s*(?:\\([^)]+\\))?\s*/i, '')
            .trim();
          break;
        }
      }

      // If still not found, try simpler extraction
      if (!choiceExplanation) {
        const simpleMatch = explanation.match(new RegExp(`Choice ${letter}[^.]*\\.`, 'i'));
        if (simpleMatch) {
          choiceExplanation = simpleMatch[0]
            .replace(/^Choice [A-J]\s*/i, '')
            .trim();
        }
      }

      wrongAnswers.push({
        letter,
        text: choiceText || `Choice ${letter}`,
        explanation: choiceExplanation || 'Incorrect for reasons stated in the correct answer explanation.'
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
  return {
    id: question.id,
    question_number: question.question_number,
    old_explanation: question.explanation,
    new_explanation: reformatExplanation(question)
  };
});

// Save to JSON file
fs.writeFileSync(
  'reformatted-explanations.json',
  JSON.stringify(reformattedQuestions, null, 2)
);

console.log(`Successfully reformatted ${reformattedQuestions.length} explanations!`);

// Show a sample
console.log('\n--- Sample Reformatted Explanation (Question 1) ---\n');
console.log(reformattedQuestions[0].new_explanation);
