import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lessons = [
  { key: '2.2', file: 'LESSON_2_2_AREAS_VOLUMES_TRIANGLES.html', title: 'Areas, Volumes & Triangles' },
  { key: '2.3', file: 'LESSON_2_3_LINES.html', title: 'Lines & Slopes' },
  { key: '2.4', file: 'LESSON_2_4_ARCS_SECTORS.html', title: 'Arcs & Sectors' },
  { key: '2.5', file: 'LESSON_2_5_CIRCLES_ELLIPSES_HYPERBOLAS.html', title: 'Circles, Ellipses & Hyperbolas' },
  { key: '3.1', file: 'LESSON_3_1_ALGEBRA_SKILLS.html', title: 'Algebra Skills' },
  { key: '3.2', file: 'LESSON_3_2_FRACTIONS.html', title: 'Fractions' },
  { key: '3.3', file: 'LESSON_3_3_EXPONENTS_ROOTS.html', title: 'Exponents & Roots' }
];

function extractQuizData(content, lessonKey, lessonTitle) {
  const questions = [];

  // Find the Mastery Check section
  const masteryCheckMatch = content.match(/<h3[^>]*>Mastery Check<\/h3>([\s\S]*?)(?:<\/div>\s*<\/div>\s*<\/body>|$)/);

  if (!masteryCheckMatch) {
    console.log(`⚠ No Mastery Check section found in lesson ${lessonKey}`);
    return null;
  }

  const masterySection = masteryCheckMatch[1];

  // Match all questions - updated regex to match the exact format
  const questionRegex = /<h4[^>]*>Question\s*(\d+)<\/h4>([\s\S]*?)(?=<h4[^>]*>Question\s*\d+<\/h4>|<details|$)/g;

  let questionMatch;
  while ((questionMatch = questionRegex.exec(masterySection)) !== null) {
    const questionNumber = questionMatch[1];
    const questionBlock = questionMatch[2];

    // Extract question text - first paragraph after the h4
    const questionTextMatch = questionBlock.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    const questionText = questionTextMatch ? questionTextMatch[1].trim() : '';

    // Extract answer choices - they're in a paragraph with <span> tags
    const answersMatch = questionBlock.match(/<p[^>]*>([\s\S]*?<span[^>]*>A\.[^<]*<\/span>[\s\S]*?)<\/p>/);
    const answersText = answersMatch ? answersMatch[1] : '';

    // Parse individual answer choices
    const answerChoices = [];
    const answerRegex = /<span[^>]*>([A-E])\.\s*([^<]*)<\/span>/g;
    let answerMatch;
    while ((answerMatch = answerRegex.exec(answersText)) !== null) {
      answerChoices.push({
        letter: answerMatch[1],
        text: answerMatch[2].trim()
      });
    }

    if (answerChoices.length === 0) {
      console.log(`⚠ No answer choices found for Question ${questionNumber} in lesson ${lessonKey}`);
      continue;
    }

    // Find the details block for this question
    const detailsMatch = masterySection.match(
      new RegExp(`Question\\s*${questionNumber}<\/h4>[\\s\\S]*?<details[^>]*>([\\s\\S]*?)<\/details>`, 'i')
    );

    if (!detailsMatch) {
      console.log(`⚠ No solution found for Question ${questionNumber} in lesson ${lessonKey}`);
      continue;
    }

    const detailsContent = detailsMatch[1];

    // Extract answer letter
    const correctAnswerMatch = detailsContent.match(/<strong>Answer:\s*([A-E])<\/strong>/);
    const correctAnswer = correctAnswerMatch ? correctAnswerMatch[1] : null;

    // Extract explanation
    const explanationMatch = detailsContent.match(/<strong>Answer:\s*[A-E]<\/strong><\/p>\s*<p>([\s\S]*?)<\/p>/);
    const explanation = explanationMatch ? explanationMatch[1].trim() : '';

    if (!correctAnswer) {
      console.log(`⚠ No correct answer found for Question ${questionNumber} in lesson ${lessonKey}`);
      continue;
    }

    // Map answer choices to options format
    const options = answerChoices.map(choice => ({
      text: choice.text,
      isCorrect: choice.letter === correctAnswer,
      explanation: choice.letter === correctAnswer ? explanation : `This is not the correct answer. The correct answer is ${correctAnswer}.`
    }));

    questions.push({
      questionNumber: parseInt(questionNumber),
      text: questionText,
      options: options
    });
  }

  if (questions.length === 0) {
    console.log(`⚠ No questions extracted from lesson ${lessonKey}`);
    return null;
  }

  return {
    lessonKey: lessonKey,
    title: `Mastery Quiz: ${lessonTitle}`,
    intro: 'Test your understanding with these ACT-style questions. Try them without looking back first!',
    questions: questions.sort((a, b) => a.questionNumber - b.questionNumber)
  };
}

const allQuizData = {};

for (const lesson of lessons) {
  const filePath = resolve(__dirname, '../docs', lesson.file);

  console.log(`\nProcessing ${lesson.key}: ${lesson.file}...`);

  try {
    const content = readFileSync(filePath, 'utf8');
    const quizData = extractQuizData(content, lesson.key, lesson.title);

    if (quizData) {
      allQuizData[lesson.key] = quizData;
      console.log(`✓ Extracted ${quizData.questions.length} questions from lesson ${lesson.key}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${lesson.key}:`, error.message);
  }
}

// Write to JSON file
const outputPath = resolve(__dirname, 'extracted-quiz-data.json');
writeFileSync(outputPath, JSON.stringify(allQuizData, null, 2), 'utf8');

console.log(`\n✅ Quiz data extracted and saved to ${outputPath}`);
console.log(`\nSummary:`);
Object.entries(allQuizData).forEach(([key, data]) => {
  console.log(`  ${key}: ${data.questions.length} questions`);
});
