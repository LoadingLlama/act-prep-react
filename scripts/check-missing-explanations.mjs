import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkMissingExplanations() {
  // Get lesson ID for backsolving
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('lesson_key', 'backsolving');

  if (!lessons || lessons.length === 0) {
    console.log('No lesson found');
    return;
  }

  console.log('Checking:', lessons[0].title);

  // Get quiz
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id, title')
    .eq('lesson_id', lessons[0].id);

  if (!quizzes || quizzes.length === 0) {
    console.log('No quiz found');
    return;
  }

  console.log('Quiz:', quizzes[0].title);
  console.log('');

  // Get all questions
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('id, question_text, question_order')
    .eq('quiz_id', quizzes[0].id)
    .order('question_order');

  if (!questions) {
    console.log('No questions found');
    return;
  }

  const missing = [];
  const details = [];

  for (const q of questions) {
    const { data: options } = await supabase
      .from('quiz_options')
      .select('option_text, is_correct, explanation, option_order')
      .eq('question_id', q.id)
      .order('option_order');

    const correctOption = options?.find(o => o.is_correct);
    const hasExplanation = correctOption && correctOption.explanation && correctOption.explanation.trim().length > 0;

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const correctLetter = correctOption ? letters[correctOption.option_order] : 'N/A';

    details.push({
      number: q.question_order + 1,
      question: q.question_text.substring(0, 80),
      correctAnswer: correctLetter,
      hasExplanation,
      qId: q.id,
      optionText: correctOption?.option_text
    });

    if (!hasExplanation) {
      missing.push(q.question_order + 1);
    }
  }

  console.log(`Total questions: ${questions.length}`);
  console.log(`Questions WITH explanations: ${details.filter(d => d.hasExplanation).length}`);
  console.log(`Questions MISSING explanations: ${missing.length}`);
  console.log('');

  if (missing.length > 0) {
    console.log('⚠️  Questions needing explanations:');
    details.filter(d => !d.hasExplanation).forEach(d => {
      console.log(`  Q${d.number}: ${d.question}... (Answer: ${d.correctAnswer})`);
    });
  } else {
    console.log('✅ All questions have explanations!');
  }

  return details;
}

checkMissingExplanations();
