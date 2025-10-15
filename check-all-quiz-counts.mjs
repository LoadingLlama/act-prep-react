import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkAllQuizzes() {
  console.log('📊 Checking quiz counts for all lessons...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .order('lesson_key');

  let totalQuizzes = 0;
  let lessonsWithMultiple = [];
  let lessonsWithQuizzes = 0;

  for (const lesson of lessons) {
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id, title, quiz_type')
      .eq('lesson_id', lesson.id);

    if (quizzes && quizzes.length > 0) {
      lessonsWithQuizzes++;
      totalQuizzes += quizzes.length;

      if (quizzes.length > 1) {
        lessonsWithMultiple.push({
          lesson_key: lesson.lesson_key,
          title: lesson.title,
          quizzes: quizzes
        });
      }
    }
  }

  console.log(`Total lessons: ${lessons.length}`);
  console.log(`Lessons with quizzes: ${lessonsWithQuizzes}`);
  console.log(`Total quizzes: ${totalQuizzes}`);
  console.log(`Lessons with multiple quizzes: ${lessonsWithMultiple.length}\n`);

  if (lessonsWithMultiple.length > 0) {
    console.log('⚠️  Lessons with MULTIPLE quizzes:');
    for (const lesson of lessonsWithMultiple) {
      console.log(`\n${lesson.lesson_key}: ${lesson.title}`);
      lesson.quizzes.forEach((quiz, i) => {
        console.log(`  ${i + 1}. ${quiz.title} (${quiz.quiz_type})`);
      });
    }
  } else {
    console.log('✅ All lessons have at most 1 quiz!');
  }

  // Check the first lesson specifically (the one user reported)
  const firstLesson = lessons[0];
  console.log(`\n\n🔍 First lesson details:`);
  console.log(`Lesson key: ${firstLesson.lesson_key}`);
  console.log(`Lesson ID: ${firstLesson.id}`);
  
  const { data: firstLessonQuizzes } = await supabase
    .from('quizzes')
    .select('id, title, quiz_type, position')
    .eq('lesson_id', firstLesson.id);

  console.log(`Quizzes: ${firstLessonQuizzes?.length || 0}`);
  firstLessonQuizzes?.forEach(quiz => {
    console.log(`  - ${quiz.title} (${quiz.quiz_type}) at position ${quiz.position}`);
  });

  // Check each quiz's question count
  for (const quiz of firstLessonQuizzes || []) {
    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);
    console.log(`    → ${questions?.length || 0} questions`);
  }
}

checkAllQuizzes().catch(console.error);
