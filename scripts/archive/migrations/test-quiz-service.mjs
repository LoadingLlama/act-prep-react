/**
 * Test the QuizzesService to see what data it returns
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('id, lesson_key')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('Lesson:', lessonData.lesson_key);
console.log('Lesson UUID:', lessonData.id);
console.log('');

// Simulate what QuizzesService.getQuizzesByLessonId does
const { data, error } = await supabase
  .from('quizzes')
  .select(`
    *,
    quiz_questions (
      *,
      quiz_options (*)
    )
  `)
  .eq('lesson_id', lessonData.id)
  .order('position', { ascending: true });

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log(`✅ Found ${data.length} quiz(zes)`);
  console.log('');

  // Transform data like the service does
  const transformedData = data?.map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    intro: quiz.intro,
    type: quiz.quiz_type,
    position: quiz.position,
    isRequired: quiz.is_required,
    isFinal: quiz.quiz_type === 'final',
    questions: quiz.quiz_questions
      ?.sort((a, b) => a.question_order - b.question_order)
      .map(question => ({
        text: question.question_text,
        options: question.quiz_options
          ?.sort((a, b) => a.option_order - b.option_order)
          .map(option => ({
            text: option.option_text,
            isCorrect: option.is_correct,
            explanation: option.explanation
          })) || []
      })) || []
  }));

  console.log('🔄 Transformed data:');
  transformedData.forEach((quiz, idx) => {
    console.log(`\nQuiz ${idx + 1}:`);
    console.log(`  Title: ${quiz.title}`);
    console.log(`  Position: ${quiz.position}`);
    console.log(`  Questions: ${quiz.questions.length}`);

    if (quiz.questions.length > 0) {
      console.log(`\n  Sample Question 1:`);
      console.log(`    Text: ${quiz.questions[0].text.substring(0, 80)}...`);
      console.log(`    Options: ${quiz.questions[0].options.length}`);

      if (quiz.questions[0].options.length > 0) {
        console.log(`    Sample Option A: "${quiz.questions[0].options[0].text}"`);
        console.log(`    Sample Option B: "${quiz.questions[0].options[1].text}"`);
      } else {
        console.log(`    ⚠️  NO OPTIONS FOUND!`);
      }
    } else {
      console.log(`  ⚠️  NO QUESTIONS FOUND!`);
    }
  });
}
