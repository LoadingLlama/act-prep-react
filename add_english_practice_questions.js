/**
 * Add Practice Questions to English Lessons
 *
 * This script adds ACT practice questions from english_questions.json
 * to the three English lessons that are missing practice questions:
 * - english-intro
 * - getting-started
 * - grammar-review
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Lesson IDs from previous query
const LESSONS = {
  'english-intro': '2d597464-0463-4593-b621-cc3234b87947',
  'getting-started': '749af103-4c42-4b62-9b8b-5448836e8804',
  'grammar-review': 'a2e663e5-60b8-402a-ab1f-1d1bf2d93336'
};

/**
 * Convert ACT question format to lesson_examples format
 */
function convertToLessonExample(actQuestion, lessonId, position) {
  // Convert choices from array to object format
  const choicesArray = actQuestion.choices.map(choice => {
    const letter = choice.charAt(0); // Extract A, B, C, D (or F, G, H, J)
    const text = choice.substring(3).trim(); // Remove "A. " prefix
    return { letter, text };
  });

  return {
    lesson_id: lessonId,
    position: position,
    title: `Question ${position + 1}`,
    problem_text: actQuestion.question_text || 'Which choice best corrects the underlined portion?',
    choices: choicesArray,
    correct_answer: actQuestion.correct_answer,
    explanation: actQuestion.explanation || '',
    difficulty: 'medium', // Default difficulty
    act_source: `Test ${actQuestion.test_number}, Question ${actQuestion.question_number}`,
    passage_id: actQuestion.passage_id || null
  };
}

/**
 * Add practice questions to a lesson
 */
async function addQuestionsToLesson(lessonKey, lessonId, questions, startIndex, count) {
  console.log(`\nAdding ${count} questions to ${lessonKey}...`);

  const selectedQuestions = questions.slice(startIndex, startIndex + count);
  const lessonExamples = selectedQuestions.map((q, i) =>
    convertToLessonExample(q, lessonId, i)
  );

  const { data, error } = await supabase
    .from('lesson_examples')
    .insert(lessonExamples);

  if (error) {
    console.error(`Error adding questions to ${lessonKey}:`, error);
    return false;
  }

  console.log(`✓ Successfully added ${count} questions to ${lessonKey}`);
  return true;
}

async function main() {
  try {
    console.log('Loading ACT English questions...');
    const actQuestions = JSON.parse(fs.readFileSync('english_questions.json', 'utf8'));
    console.log(`Loaded ${actQuestions.length} ACT English questions\n`);

    console.log('Adding practice questions to English lessons:');
    console.log('===========================================');

    // english-intro: Add 10 introductory questions (questions 1-10)
    await addQuestionsToLesson(
      'english-intro',
      LESSONS['english-intro'],
      actQuestions,
      0, // Start at question 1
      10  // Add 10 questions
    );

    // getting-started: Add 10 basic questions (questions 11-20)
    await addQuestionsToLesson(
      'getting-started',
      LESSONS['getting-started'],
      actQuestions,
      10, // Start at question 11
      10  // Add 10 questions
    );

    // grammar-review: Add 50 mixed questions for comprehensive review (questions 21-70)
    await addQuestionsToLesson(
      'grammar-review',
      LESSONS['grammar-review'],
      actQuestions,
      20, // Start at question 21
      50  // Add 50 questions
    );

    console.log('\n\n✅ SUCCESS! All English lessons now have practice questions.');
    console.log('\nSummary:');
    console.log('  - english-intro: 10 questions added');
    console.log('  - getting-started: 10 questions added');
    console.log('  - grammar-review: 50 questions added');
    console.log('  - Total: 70 questions added');

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
