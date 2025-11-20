/**
 * Add Practice Questions to All English Lessons
 *
 * Ensures all English lessons have exactly 50 practice questions (except grammar-review)
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSONS_TO_UPDATE = [
  { key: 'sentence-structure', current: 49, needed: 1 },
  { key: 'commas', current: 49, needed: 1 },
  { key: 'punctuation', current: 49, needed: 1 },
  { key: 'verbs', current: 46, needed: 4 },
  { key: 'pronouns', current: 46, needed: 4 },
  { key: 'modifiers', current: 46, needed: 4 },
  { key: 'parallel-structure', current: 46, needed: 4 },
  { key: 'misc-topics', current: 44, needed: 6 },
  { key: 'redundancy', current: 4, needed: 46 },
  { key: 'word-choice', current: 4, needed: 46 },
  { key: 'transitions', current: 4, needed: 46 },
  { key: 'which-choice', current: 4, needed: 46 },
  { key: 'adding-deleting', current: 4, needed: 46 },
  { key: 'logical-placement', current: 4, needed: 46 }
];

function convertQuestion(actQuestion, lessonId, position) {
  // Handle choices - they might already be in the correct format or need conversion
  let choicesArray;
  if (Array.isArray(actQuestion.choices)) {
    choicesArray = actQuestion.choices.map(choice => {
      if (typeof choice === 'string') {
        const letter = choice.charAt(0);
        const text = choice.substring(3).trim();
        return { letter, text };
      }
      return choice; // Already in object format
    });
  } else {
    choicesArray = [];
  }

  return {
    lesson_id: lessonId,
    position: position,
    title: `Practice Question ${position + 1}`,
    problem_text: actQuestion.question_text || 'Which choice best corrects the underlined portion?',
    choices: choicesArray,
    correct_answer: actQuestion.correct_answer,
    solution_steps: [],
    answer_explanation: actQuestion.explanation || '',
    is_worked_example: false
  };
}

async function addQuestionsToLesson(lessonKey, currentCount, neededCount, actQuestions, startIndex) {
  console.log(`\nProcessing ${lessonKey}...`);

  // Get lesson ID
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', lessonKey)
    .single();

  if (lessonError || !lesson) {
    console.error(`  ✗ Error finding lesson ${lessonKey}:`, lessonError);
    return startIndex;
  }

  // Select questions
  const selectedQuestions = actQuestions.slice(startIndex, startIndex + neededCount);

  if (selectedQuestions.length < neededCount) {
    console.error(`  ✗ Not enough questions available (need ${neededCount}, have ${selectedQuestions.length})`);
    return startIndex;
  }

  // Convert to lesson format
  const lessonExamples = selectedQuestions.map((q, i) =>
    convertQuestion(q, lesson.id, currentCount + i)
  );

  // Insert into database
  const { error: insertError } = await supabase
    .from('lesson_examples')
    .insert(lessonExamples);

  if (insertError) {
    console.error(`  ✗ Error inserting questions:`, insertError);
    return startIndex;
  }

  console.log(`  ✓ Added ${neededCount} questions (now has 50 total)`);
  return startIndex + neededCount;
}

async function main() {
  try {
    console.log('Loading ACT English questions...');
    const actQuestions = JSON.parse(fs.readFileSync('english_questions.json', 'utf8'));
    console.log(`Loaded ${actQuestions.length} total ACT questions\n`);

    console.log('Adding questions to reach 50 per lesson:');
    console.log('=========================================');

    let questionIndex = 0;
    let totalAdded = 0;

    for (const lesson of LESSONS_TO_UPDATE) {
      questionIndex = await addQuestionsToLesson(
        lesson.key,
        lesson.current,
        lesson.needed,
        actQuestions,
        questionIndex
      );
      totalAdded += lesson.needed;
    }

    console.log('\n\n✅ SUCCESS!');
    console.log(`Added ${totalAdded} questions total`);
    console.log(`All English lessons now have 50 practice questions (except grammar-review)`);

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
