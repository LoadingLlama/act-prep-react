const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkLessonMapping() {
  console.log('=== CHECKING LESSON MAPPING IN PRACTICE TEST QUESTIONS ===\n');

  const sections = ['english', 'math', 'reading', 'science'];
  let totalQuestions = 0;
  let questionsWithLessonId = 0;
  let questionsWithoutLessonId = 0;

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;

    const { data: questions, error } = await supabase
      .from(tableName)
      .select('id, question_number, lesson_id, chapter')
      .eq('test_number', 1);

    if (error) {
      console.error(`❌ Error fetching ${section}:`, error);
      continue;
    }

    const withLesson = questions.filter(q => q.lesson_id).length;
    const withoutLesson = questions.filter(q => !q.lesson_id).length;

    totalQuestions += questions.length;
    questionsWithLessonId += withLesson;
    questionsWithoutLessonId += withoutLesson;

    console.log(`${section.toUpperCase()}:`);
    console.log(`  Total: ${questions.length} questions`);
    console.log(`  With lesson_id: ${withLesson} (${((withLesson/questions.length)*100).toFixed(1)}%)`);
    console.log(`  Without lesson_id: ${withoutLesson} (${((withoutLesson/questions.length)*100).toFixed(1)}%)`);

    if (withoutLesson > 0) {
      console.log(`  Sample unmapped questions:`, questions.filter(q => !q.lesson_id).slice(0, 3).map(q => ({
        question_number: q.question_number,
        chapter: q.chapter
      })));
    }
    console.log();
  }

  console.log('=== SUMMARY ===');
  console.log(`Total questions: ${totalQuestions}`);
  console.log(`With lesson_id: ${questionsWithLessonId} (${((questionsWithLessonId/totalQuestions)*100).toFixed(1)}%)`);
  console.log(`Without lesson_id: ${questionsWithoutLessonId} (${((questionsWithoutLessonId/totalQuestions)*100).toFixed(1)}%)`);

  if (questionsWithoutLessonId > 0) {
    console.log('\n⚠️  WARNING: Questions without lesson mapping will not be included in learning path analysis!');
    console.log('This means weak areas may not be properly identified.');
  }

  // Check available lessons
  console.log('\n=== AVAILABLE LESSONS ===\n');

  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, lesson_id, name, subject, difficulty')
    .order('lesson_id', { ascending: true });

  if (lessonsError) {
    console.error('❌ Error fetching lessons:', lessonsError);
  } else {
    console.log(`Found ${lessons.length} lessons in database:`);
    lessons.forEach(lesson => {
      console.log(`  ${lesson.lesson_id}: ${lesson.name} (${lesson.subject})`);
    });
  }
}

checkLessonMapping().then(() => process.exit(0));
