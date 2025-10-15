import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function comprehensiveCheck() {
  console.log('🔍 COMPREHENSIVE QUIZ VERIFICATION\n');
  console.log('='.repeat(50) + '\n');

  // 1. Count total lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title');

  console.log('📚 Total lessons: ' + lessons.length);

  // 2. Count total quizzes by type
  const { data: allQuizzes } = await supabase
    .from('quizzes')
    .select('id, quiz_type, title, lesson_id');

  const byType = {};
  allQuizzes.forEach(q => {
    byType[q.quiz_type] = (byType[q.quiz_type] || 0) + 1;
  });

  console.log('📝 Total quizzes: ' + allQuizzes.length);
  console.log('   Quiz types:');
  Object.entries(byType).forEach(([type, count]) => {
    console.log('     - ' + type + ': ' + count);
  });
  console.log('');

  // 3. Check for lessons with multiple quizzes
  const quizzesByLesson = {};
  allQuizzes.forEach(q => {
    if (!quizzesByLesson[q.lesson_id]) {
      quizzesByLesson[q.lesson_id] = [];
    }
    quizzesByLesson[q.lesson_id].push(q);
  });

  const lessonsWithMultiple = Object.entries(quizzesByLesson)
    .filter(([_, quizzes]) => quizzes.length > 1);

  if (lessonsWithMultiple.length > 0) {
    console.log('⚠️  PROBLEM: ' + lessonsWithMultiple.length + ' lessons have multiple quizzes!');
    lessonsWithMultiple.slice(0, 3).forEach(([lessonId, quizzes]) => {
      const lesson = lessons.find(l => l.id === lessonId);
      console.log('   - ' + lesson.lesson_key + ': ' + quizzes.length + ' quizzes');
      quizzes.forEach(q => {
        console.log('     * ' + q.title + ' (' + q.quiz_type + ')');
      });
    });
    console.log('');
  } else {
    console.log('✅ Each lesson has exactly 1 quiz\n');
  }

  // 4. Check for lessons without quizzes
  const lessonsWithoutQuizzes = lessons.filter(lesson => 
    !quizzesByLesson[lesson.id]
  );

  if (lessonsWithoutQuizzes.length > 0) {
    console.log('⚠️  PROBLEM: ' + lessonsWithoutQuizzes.length + ' lessons have NO quizzes!');
    lessonsWithoutQuizzes.slice(0, 5).forEach(lesson => {
      console.log('   - ' + lesson.lesson_key);
    });
    console.log('');
  } else {
    console.log('✅ All lessons have at least 1 quiz\n');
  }

  // 5. Check question counts
  console.log('🔢 Checking question counts...');
  let wrongQuestionCount = [];
  for (const quiz of allQuizzes) {
    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);

    if (questions.length !== 10) {
      wrongQuestionCount.push({
        title: quiz.title,
        count: questions.length
      });
    }
  }

  if (wrongQuestionCount.length > 0) {
    console.log('⚠️  PROBLEM: ' + wrongQuestionCount.length + ' quizzes do not have 10 questions!');
    wrongQuestionCount.slice(0, 5).forEach(q => {
      console.log('   - ' + q.title + ': ' + q.count + ' questions');
    });
    console.log('');
  } else {
    console.log('✅ All quizzes have exactly 10 questions\n');
  }

  // 6. Check the first lesson specifically
  console.log('🎯 Checking FIRST lesson (the one user reported):');
  const firstLesson = lessons.find(l => l.lesson_key === 'absolute-value') || lessons[0];
  console.log('   Lesson: ' + firstLesson.lesson_key);
  console.log('   ID: ' + firstLesson.id);

  const { data: firstLessonQuizzes } = await supabase
    .from('quizzes')
    .select('id, title, quiz_type, position')
    .eq('lesson_id', firstLesson.id);

  console.log('   Quizzes: ' + firstLessonQuizzes.length);
  for (const quiz of firstLessonQuizzes) {
    const { data: qs } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);
    console.log('     - ' + quiz.title + ' (' + quiz.quiz_type + '): ' + qs.length + ' questions at position ' + quiz.position);
  }
  console.log('');

  // 7. Final summary
  console.log('='.repeat(50));
  console.log('📊 FINAL SUMMARY:');
  console.log('   ✓ Total lessons: ' + lessons.length);
  console.log('   ✓ Total quizzes: ' + allQuizzes.length);
  console.log('   ✓ Lessons with multiple quizzes: ' + lessonsWithMultiple.length);
  console.log('   ✓ Lessons without quizzes: ' + lessonsWithoutQuizzes.length);
  console.log('   ✓ Quizzes with wrong question count: ' + wrongQuestionCount.length);
  
  const allGood = lessonsWithMultiple.length === 0 && 
                  lessonsWithoutQuizzes.length === 0 && 
                  wrongQuestionCount.length === 0 &&
                  allQuizzes.length === lessons.length;

  if (allGood) {
    console.log('\n✅✅✅ PERFECT! All checks passed! ✅✅✅');
  } else {
    console.log('\n❌ Issues detected - see details above');
  }
}

comprehensiveCheck().catch(console.error);
