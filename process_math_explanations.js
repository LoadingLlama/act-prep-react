const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch all 60 math questions from the database
 */
async function fetchAllQuestions() {
  console.log('Fetching all 60 math questions...');

  const { data, error } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .order('id', { ascending: true })
    .limit(60);

  if (error) {
    console.error('Error fetching questions:', error);
    return null;
  }

  console.log(`Successfully fetched ${data.length} questions`);
  return data;
}

/**
 * Parse choices from JSON string to array
 */
function parseChoices(choicesStr) {
  if (Array.isArray(choicesStr)) {
    return choicesStr;
  }
  if (typeof choicesStr === 'string') {
    try {
      return JSON.parse(choicesStr);
    } catch (e) {
      return choicesStr.split(',').map(c => c.trim());
    }
  }
  return [];
}

/**
 * Generate detailed explanation with actual calculations
 */
function generateExplanation(question) {
  const questionText = question.question_text;
  const choices = parseChoices(question.choices);
  const correctAnswer = question.correct_answer;
  const questionType = question.question_type;

  // This is a placeholder - in the actual implementation, each question
  // will need a custom explanation based on its specific content
  return {
    id: question.id,
    questionNumber: question.question_number,
    questionText: questionText,
    choices: choices,
    correctAnswer: correctAnswer,
    questionType: questionType
  };
}

async function main() {
  const questions = await fetchAllQuestions();

  if (!questions) {
    console.error('Failed to fetch questions');
    return;
  }

  // Process questions and display for manual explanation creation
  console.log('\n=== ALL 60 QUESTIONS FOR EXPLANATION ===\n');

  questions.forEach((q, idx) => {
    const parsed = generateExplanation(q);
    console.log(`\n${'='.repeat(80)}`);
    console.log(`QUESTION ${idx + 1} (ID: ${q.id})`);
    console.log(`${'='.repeat(80)}`);
    console.log(`Type: ${parsed.questionType}`);
    console.log(`Text: ${parsed.questionText}`);
    console.log(`Choices:`);
    parsed.choices.forEach(c => console.log(`  ${c}`));
    console.log(`Correct Answer: ${parsed.correctAnswer}`);
    console.log('');
  });

  console.log(`\n\nTotal questions to process: ${questions.length}`);
}

main();
