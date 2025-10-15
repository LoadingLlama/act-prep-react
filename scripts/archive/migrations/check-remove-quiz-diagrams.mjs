/**
 * Check and remove diagrams from quiz questions
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get geometry-angles lesson UUID
const { data: lessonData } = await supabase
  .from('lessons')
  .select('id, lesson_key')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('Lesson:', lessonData.lesson_key);
console.log('Lesson ID:', lessonData.id);

// Get quizzes for this lesson
const { data: quizzes } = await supabase
  .from('quizzes')
  .select('id, title')
  .eq('lesson_id', lessonData.id);

console.log('\nTotal quizzes:', quizzes.length);

for (const quiz of quizzes) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Quiz: ${quiz.title}`);
  console.log(`Quiz ID: ${quiz.id}`);

  // Get quiz questions
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quiz.id)
    .order('order_index');

  console.log(`Total questions: ${questions.length}`);

  let diagramCount = 0;
  for (const question of questions) {
    if (question.diagram) {
      diagramCount++;
      console.log(`\n  Question ${question.order_index + 1}: HAS DIAGRAM`);
      console.log(`    Question text: ${question.question_text?.substring(0, 80) || 'N/A'}...`);
      console.log(`    Diagram length: ${question.diagram.length} chars`);

      // Remove the diagram
      await supabase
        .from('quiz_questions')
        .update({ diagram: null })
        .eq('id', question.id);

      console.log(`    ✅ REMOVED diagram`);
    }
  }

  console.log(`\nTotal diagrams removed: ${diagramCount}`);
}

console.log('\n✅ All diagrams removed from quiz questions!');
