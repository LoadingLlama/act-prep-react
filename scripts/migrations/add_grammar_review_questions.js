/**
 * Add Practice Questions to Grammar Review Lesson
 *
 * Adds 50 ACT English questions to the grammar-review lesson
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

const GRAMMAR_REVIEW_ID = 'a2e663e5-60b8-402a-ab1f-1d1bf2d93336';

/**
 * Convert ACT question to lesson_examples format
 */
function convertQuestion(actQuestion, position) {
  // Parse choices from array format ["A. text", "B. text"] to object format
  const choicesArray = actQuestion.choices.map(choice => {
    const letter = choice.charAt(0);
    const text = choice.substring(3).trim();
    return { letter, text };
  });

  return {
    lesson_id: GRAMMAR_REVIEW_ID,
    position: position,
    title: `Practice Question ${position + 1}`,
    problem_text: actQuestion.question_text || 'Which choice best corrects the underlined portion?',
    choices: choicesArray,
    correct_answer: actQuestion.correct_answer,
    answer_explanation: actQuestion.explanation || '',
    is_worked_example: false
  };
}

async function addQuestions() {
  try {
    console.log('Loading ACT English questions...');
    const actQuestions = JSON.parse(fs.readFileSync('english_questions.json', 'utf8'));
    console.log(`Loaded ${actQuestions.length} total questions\n`);

    // Select 50 questions - use a variety from different tests
    // Questions from test 1: positions 0-49 (50 questions)
    const selectedQuestions = actQuestions.slice(0, 50);

    console.log(`Converting ${selectedQuestions.length} questions to lesson format...`);
    const lessonExamples = selectedQuestions.map((q, i) => convertQuestion(q, i));

    console.log('Inserting questions into database...');
    const { data, error } = await supabase
      .from('lesson_examples')
      .insert(lessonExamples);

    if (error) {
      console.error('Error inserting questions:', error);
      process.exit(1);
    }

    console.log('\n✅ SUCCESS!');
    console.log(`Added ${lessonExamples.length} practice questions to grammar-review lesson`);
    console.log('\nQuestions added:');
    console.log(`  - Positions 0-49 (50 questions total)`);
    console.log(`  - Source: ACT Test 1, Questions 1-50`);

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

addQuestions();
