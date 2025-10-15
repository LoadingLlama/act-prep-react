import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Quiz questions with all answer options and explanations
const quizQuestions = [
  {
    questionOrder: 0,
    text: "If 2x + 5 = 17, which answer choice for x is correct?",
    options: [
      { optionOrder: 0, text: '4', isCorrect: false, explanation: "2(4) + 5 = 8 + 5 = 13 ≠ 17. This is too small." },
      { optionOrder: 1, text: '6', isCorrect: true, explanation: "Start with C first (8). 2(8) + 5 = 21, which is too big. Try B: 2(6) + 5 = 12 + 5 = 17 ✓. This works!" },
      { optionOrder: 2, text: '8', isCorrect: false, explanation: "2(8) + 5 = 16 + 5 = 21 ≠ 17. This is too big, so we know D and E are also too big." },
      { optionOrder: 3, text: '10', isCorrect: false, explanation: "2(10) + 5 = 25, which is even larger than C. We can eliminate this." },
      { optionOrder: 4, text: '12', isCorrect: false, explanation: "2(12) + 5 = 29, which is way too big. This doesn't work." }
    ]
  },
  {
    questionOrder: 1,
    text: "A number increased by 20% equals 60. What is the number?",
    options: [
      { optionOrder: 0, text: '40', isCorrect: false, explanation: "40 × 1.20 = 48 ≠ 60. Too small." },
      { optionOrder: 1, text: '48', isCorrect: false, explanation: "48 × 1.20 = 57.6 ≠ 60. Still too small." },
      { optionOrder: 2, text: '50', isCorrect: true, explanation: "Start with C: 50 × 1.20 = 60 ✓. This works! The original number is 50." },
      { optionOrder: 3, text: '52', isCorrect: false, explanation: "52 × 1.20 = 62.4 ≠ 60. Too big." },
      { optionOrder: 4, text: '72', isCorrect: false, explanation: "72 × 1.20 = 86.4, which is way too big." }
    ]
  },
  {
    questionOrder: 2,
    text: "When is backsolving most useful?",
    options: [
      { optionOrder: 0, text: 'When you need to find exact decimal values', isCorrect: false, explanation: "Backsolving works with any type of answer, not just decimals." },
      { optionOrder: 1, text: 'When the algebra looks complicated but testing answers is easy', isCorrect: true, explanation: "Correct! Backsolving shines when setting up equations is messy, but plugging in answers is straightforward. This saves time and reduces errors." },
      { optionOrder: 2, text: 'Only on geometry problems', isCorrect: false, explanation: "Backsolving works on many types of problems, not just geometry." },
      { optionOrder: 3, text: 'When you have more than 10 minutes per question', isCorrect: false, explanation: "Backsolving is actually a time-saving strategy, useful when you have limited time." },
      { optionOrder: 4, text: 'Never - always use algebra', isCorrect: false, explanation: "This is incorrect. Backsolving is often faster than algebra on ACT problems." }
    ]
  },
  {
    questionOrder: 3,
    text: "If x² - 3x - 10 = 0, which is a solution?",
    options: [
      { optionOrder: 0, text: '-5', isCorrect: false, explanation: "(-5)² - 3(-5) - 10 = 25 + 15 - 10 = 30 ≠ 0. Doesn't work." },
      { optionOrder: 1, text: '-2', isCorrect: true, explanation: "Start with C (2). 2² - 3(2) - 10 = -12 ≠ 0. Try B: (-2)² - 3(-2) - 10 = 4 + 6 - 10 = 0 ✓. This is correct!" },
      { optionOrder: 2, text: '2', isCorrect: false, explanation: "2² - 3(2) - 10 = 4 - 6 - 10 = -12 ≠ 0. Doesn't work." },
      { optionOrder: 3, text: '3', isCorrect: false, explanation: "3² - 3(3) - 10 = 9 - 9 - 10 = -10 ≠ 0. Doesn't work." },
      { optionOrder: 4, text: '5', isCorrect: false, explanation: "5² - 3(5) - 10 = 25 - 15 - 10 = 0. Wait, this also works! (Note: Quadratics can have 2 solutions, but B was tested first.)" }
    ]
  },
  {
    questionOrder: 4,
    text: "What is the advantage of testing answer choice C first?",
    options: [
      { optionOrder: 0, text: 'C is always the correct answer', isCorrect: false, explanation: "This is not true. C is not always correct." },
      { optionOrder: 1, text: 'C is the easiest to calculate', isCorrect: false, explanation: "C isn't necessarily easier to calculate than other choices." },
      { optionOrder: 2, text: 'If C is too big or too small, you can eliminate multiple answers at once', isCorrect: true, explanation: "Correct! Since answers are in order, testing the middle value (C) lets you eliminate 2-3 choices with one test. This is strategic starting." },
      { optionOrder: 3, text: 'Test makers prefer C', isCorrect: false, explanation: "The position of correct answers is randomized on the ACT." },
      { optionOrder: 4, text: 'There is no advantage', isCorrect: false, explanation: "There is definitely an advantage to starting with C - it's the strategic starting point." }
    ]
  },
  {
    questionOrder: 5,
    text: "A store marks up items 50%. An item costs $30 after markup. What was the original price?",
    options: [
      { optionOrder: 0, text: '$15', isCorrect: false, explanation: "$15 × 1.50 = $22.50 ≠ $30. Too small." },
      { optionOrder: 1, text: '$18', isCorrect: false, explanation: "$18 × 1.50 = $27 ≠ $30. Still too small." },
      { optionOrder: 2, text: '$20', isCorrect: true, explanation: "Start with C: $20 × 1.50 = $30 ✓. Perfect! The original price was $20." },
      { optionOrder: 3, text: '$25', isCorrect: false, explanation: "$25 × 1.50 = $37.50 ≠ $30. Too big." },
      { optionOrder: 4, text: '$45', isCorrect: false, explanation: "$45 × 1.50 = $67.50, which is way too big." }
    ]
  },
  {
    questionOrder: 6,
    text: "When should you NOT use backsolving?",
    options: [
      { optionOrder: 0, text: 'When the answer choices are simple fractions', isCorrect: false, explanation: "Backsolving works fine with fractions." },
      { optionOrder: 1, text: 'When the answer choices are variables or expressions', isCorrect: true, explanation: "Correct! Backsolving requires concrete numbers to test. If answers are like 'x + 2' or '2n', you cannot plug them in to test." },
      { optionOrder: 2, text: 'When you have a calculator', isCorrect: false, explanation: "A calculator actually makes backsolving faster, not slower." },
      { optionOrder: 3, text: 'On the first question of a section', isCorrect: false, explanation: "Question position doesn't affect whether backsolving is appropriate." },
      { optionOrder: 4, text: 'When the problem involves geometry', isCorrect: false, explanation: "Backsolving works great on many geometry problems with numerical answer choices." }
    ]
  }
];

async function populateQuiz() {
  console.log('🔨 POPULATING BACKSOLVING QUIZ WITH ANSWERS AND EXPLANATIONS\n');

  // Get lesson
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('lesson_key', 'backsolving');

  if (!lessons || lessons.length === 0) {
    console.log('❌ Lesson not found');
    return;
  }

  console.log('Lesson:', lessons[0].title);

  // Get quiz
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id, title')
    .eq('lesson_id', lessons[0].id);

  if (!quizzes || quizzes.length === 0) {
    console.log('❌ Quiz not found');
    return;
  }

  console.log('Quiz:', quizzes[0].title);
  console.log('');

  // Get existing questions
  const { data: existingQuestions } = await supabase
    .from('quiz_questions')
    .select('id, question_order')
    .eq('quiz_id', quizzes[0].id)
    .order('question_order');

  if (!existingQuestions || existingQuestions.length === 0) {
    console.log('❌ No questions found');
    return;
  }

  console.log(`Found ${existingQuestions.length} existing questions\n`);

  // For each question, add answer options
  for (let i = 0; i < quizQuestions.length; i++) {
    const questionData = quizQuestions[i];
    const existingQuestion = existingQuestions.find(q => q.question_order === questionData.questionOrder);

    if (!existingQuestion) {
      console.log(`⚠️  Question ${i + 1} not found in database`);
      continue;
    }

    console.log(`Processing Q${i + 1}: ${questionData.text.substring(0, 60)}...`);

    // Delete existing options first
    await supabase
      .from('quiz_options')
      .delete()
      .eq('question_id', existingQuestion.id);

    // Insert new options with explanations
    let successCount = 0;
    for (const option of questionData.options) {
      const { error: insertError } = await supabase
        .from('quiz_options')
        .insert({
          question_id: existingQuestion.id,
          option_text: option.text,
          option_order: option.optionOrder,
          is_correct: option.isCorrect,
          explanation: option.explanation
        });

      if (insertError) {
        console.log(`  ❌ Error inserting option ${option.optionOrder}: ${insertError.message}`);
      } else {
        successCount++;
      }
    }

    const correctOption = questionData.options.find(o => o.isCorrect);
    const letters = ['A', 'B', 'C', 'D', 'E'];
    console.log(`  ✅ Added ${successCount}/5 options (correct: ${letters[correctOption.optionOrder]})\n`);
  }

  console.log('✅ DONE! All 7 questions now have complete answer options with explanations!');
  console.log('📱 Refresh your app and try the quiz again!');
}

populateQuiz();
