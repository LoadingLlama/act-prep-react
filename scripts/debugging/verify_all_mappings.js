const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function verifyAllMappings() {
  console.log('=== COMPLETE DIAGNOSTIC TEST MAPPING VERIFICATION ===\n');

  const sections = ['english', 'math', 'reading', 'science'];
  const results = {
    total_questions: 0,
    mapped_questions: 0,
    unmapped_questions: 0,
    by_section: {}
  };

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;

    const { data: questions, error } = await supabase
      .from(tableName)
      .select('id, question_number, lesson_id, chapter, difficulty')
      .eq('test_number', 1)
      .order('question_number', { ascending: true });

    if (error) {
      console.error(`❌ Error fetching ${section}:`, error);
      continue;
    }

    const total = questions.length;
    const mapped = questions.filter(q => q.lesson_id).length;
    const unmapped = total - mapped;
    const percentage = ((mapped / total) * 100).toFixed(1);

    results.total_questions += total;
    results.mapped_questions += mapped;
    results.unmapped_questions += unmapped;

    results.by_section[section] = {
      total,
      mapped,
      unmapped,
      percentage,
      sample_unmapped: questions.filter(q => !q.lesson_id).slice(0, 5)
    };

    console.log(`${section.toUpperCase()}:`);
    console.log(`  Total: ${total} questions`);
    console.log(`  Mapped: ${mapped} (${percentage}%)`);
    console.log(`  Unmapped: ${unmapped} (${(100 - percentage).toFixed(1)}%)`);

    if (unmapped > 0) {
      console.log(`  ❌ NEEDS MAPPING - Sample unmapped questions:`);
      questions.filter(q => !q.lesson_id).slice(0, 5).forEach(q => {
        console.log(`     Q${q.question_number}: chapter="${q.chapter || 'null'}"`);
      });
    } else {
      console.log(`  ✅ All questions mapped!`);
    }
    console.log();
  }

  console.log('=== SUMMARY ===');
  console.log(`Total Questions: ${results.total_questions}`);
  console.log(`Mapped: ${results.mapped_questions} (${((results.mapped_questions/results.total_questions)*100).toFixed(1)}%)`);
  console.log(`Unmapped: ${results.unmapped_questions} (${((results.unmapped_questions/results.total_questions)*100).toFixed(1)}%)`);

  if (results.unmapped_questions > 0) {
    console.log('\n⚠️  WARNING: Diagnostic test will NOT properly track weak areas for unmapped questions!');
    console.log('Learning path will be incomplete and missing critical lessons.');
  } else {
    console.log('\n✅ All questions are mapped! Diagnostic test is ready to track all weak areas.');
  }

  // Check lessons available for each subject
  console.log('\n=== AVAILABLE LESSONS BY SUBJECT ===\n');

  for (const subject of ['english', 'math', 'reading', 'science']) {
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, title, subject')
      .ilike('subject', subject)
      .order('title', { ascending: true });

    if (lessonsError) {
      console.error(`Error fetching ${subject} lessons:`, lessonsError);
    } else {
      console.log(`${subject.toUpperCase()}: ${lessons?.length || 0} lessons available`);
      if (lessons && lessons.length > 0) {
        lessons.forEach((lesson, idx) => {
          console.log(`  ${idx + 1}. ${lesson.title}`);
        });
      }
      console.log();
    }
  }

  // Check for duplicate lesson_id mappings (multiple questions to same lesson is OK, but let's see the distribution)
  console.log('\n=== LESSON USAGE DISTRIBUTION ===\n');

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;

    const { data: questions } = await supabase
      .from(tableName)
      .select('lesson_id, id')
      .eq('test_number', 1)
      .not('lesson_id', 'is', null);

    if (questions && questions.length > 0) {
      const lessonCounts = {};
      questions.forEach(q => {
        lessonCounts[q.lesson_id] = (lessonCounts[q.lesson_id] || 0) + 1;
      });

      console.log(`${section.toUpperCase()}:`);
      console.log(`  ${Object.keys(lessonCounts).length} unique lessons used`);
      console.log(`  Questions per lesson: min=${Math.min(...Object.values(lessonCounts))}, max=${Math.max(...Object.values(lessonCounts))}, avg=${(questions.length / Object.keys(lessonCounts).length).toFixed(1)}`);
      console.log();
    }
  }
}

verifyAllMappings().then(() => process.exit(0));
