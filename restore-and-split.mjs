/**
 * Restore and properly split examples:
 * - First 20 examples per lesson: teaching (lesson_examples)
 * - Remaining 30+ examples: practice (practice_questions)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function restoreAndSplit() {
  console.log('🔄 RESTORING AND SPLITTING EXAMPLES\n');

  // Step 1: Get all practice_questions
  const { data: allPractice } = await supabase
    .from('practice_questions')
    .select('*')
    .order('lesson_id, position');

  console.log(`📊 Found ${allPractice.length} practice questions to process\n`);

  // Group by lesson
  const byLesson = {};
  allPractice.forEach(q => {
    if (!byLesson[q.lesson_id]) {
      byLesson[q.lesson_id] = [];
    }
    byLesson[q.lesson_id].push(q);
  });

  console.log(`📚 Processing ${Object.keys(byLesson).length} lessons\n`);

  let teachingRestored = 0;
  let practiceKept = 0;

  for (const [lessonId, questions] of Object.entries(byLesson)) {
    const totalQuestions = questions.length;

    // Strategy: Keep first 20 for teaching, rest for practice (minimum 15 for practice)
    const teachingCount = Math.min(20, Math.floor(totalQuestions * 0.4));
    const practiceCount = totalQuestions - teachingCount;

    console.log(`📝 Lesson ${lessonId.substring(0, 8)}: ${totalQuestions} total → ${teachingCount} teaching + ${practiceCount} practice`);

    // Sort by position
    questions.sort((a, b) => a.position - b.position);

    // First N questions go back to lesson_examples for teaching
    const teachingQuestions = questions.slice(0, teachingCount);
    const practiceQuestions = questions.slice(teachingCount);

    // Restore teaching examples to lesson_examples
    for (const q of teachingQuestions) {
      const lessonExample = {
        lesson_id: q.lesson_id,
        position: q.position,
        title: q.title,
        problem_text: q.problem_text,
        choices: q.choices,
        correct_answer: q.correct_answer,
        answer_explanation: q.answer_explanation,
        solution_steps: q.solution_steps
      };

      const { error: insertError } = await supabase
        .from('lesson_examples')
        .insert([lessonExample]);

      if (insertError) {
        console.error(`  ❌ Error restoring teaching example:`, insertError.message);
      } else {
        teachingRestored++;
      }
    }

    // Delete teaching questions from practice_questions
    const teachingIds = teachingQuestions.map(q => q.id);
    if (teachingIds.length > 0) {
      const { error: deleteError } = await supabase
        .from('practice_questions')
        .delete()
        .in('id', teachingIds);

      if (deleteError) {
        console.error(`  ❌ Error deleting from practice:`, deleteError.message);
      }
    }

    // Reposition practice questions to start from 1
    for (let i = 0; i < practiceQuestions.length; i++) {
      const q = practiceQuestions[i];

      // Update position and recalculate difficulty
      let difficulty = 'easy';
      if (i >= practiceQuestions.length * 0.67) {
        difficulty = 'hard';
      } else if (i >= practiceQuestions.length * 0.33) {
        difficulty = 'medium';
      }

      const { error: updateError } = await supabase
        .from('practice_questions')
        .update({
          position: i + 1,
          difficulty: difficulty
        })
        .eq('id', q.id);

      if (updateError) {
        console.error(`  ❌ Error updating practice question:`, updateError.message);
      } else {
        practiceKept++;
      }
    }
  }

  console.log(`\n✅ Restoration complete:`);
  console.log(`  - Teaching examples restored: ${teachingRestored}`);
  console.log(`  - Practice questions kept: ${practiceKept}\n`);

  // Verification
  console.log('📊 FINAL COUNTS:\n');

  const { count: examplesCount } = await supabase
    .from('lesson_examples')
    .select('*', { count: 'exact', head: true });

  const { count: practiceCount } = await supabase
    .from('practice_questions')
    .select('*', { count: 'exact', head: true });

  console.log(`  - lesson_examples: ${examplesCount} rows (for teaching)`);
  console.log(`  - practice_questions: ${practiceCount} rows (for practice)\n`);

  // Show sample breakdown
  console.log('📚 Sample lesson breakdown:');
  const { data: sampleLessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, subject')
    .in('subject', ['english', 'math'])
    .limit(5);

  for (const lesson of sampleLessons || []) {
    const { count: exCount } = await supabase
      .from('lesson_examples')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', lesson.id);

    const { count: pqCount } = await supabase
      .from('practice_questions')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', lesson.id);

    console.log(`  - ${lesson.lesson_key}: ${exCount} teaching + ${pqCount} practice`);
  }

  console.log('\n✅ COMPLETE!');
}

restoreAndSplit();
