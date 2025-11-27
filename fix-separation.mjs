/**
 * Fix separation: Remove duplicates and migrate English practice questions
 *
 * Strategy:
 * 1. Delete the 90 math questions from lesson_examples (keep only in practice_questions)
 * 2. For English lessons, split examples into teaching (lesson_examples) and practice (practice_questions)
 *    - First 20 examples = teaching examples (keep in lesson_examples)
 *    - Remaining examples = practice questions (migrate to practice_questions)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lesson IDs
const FRACTIONS_ID = 'a8cd8513-f0a8-4bb1-9890-f21dc053939a';
const EXPONENTS_ID = 'b8c03bf0-99df-460d-be21-0015eebe7920';
const NUMBER_THEORY_ID = '74013e77-3111-4dc6-beca-ff15948e4351';

async function fixSeparation() {
  console.log('🔧 FIXING LESSON_EXAMPLES vs PRACTICE_QUESTIONS SEPARATION\n');

  // Step 1: Delete math questions from lesson_examples (they're already in practice_questions)
  console.log('📝 Step 1: Removing duplicated math questions from lesson_examples...');

  const mathLessonIds = [FRACTIONS_ID, EXPONENTS_ID, NUMBER_THEORY_ID];

  for (const lessonId of mathLessonIds) {
    const { data: deleted, error } = await supabase
      .from('lesson_examples')
      .delete()
      .eq('lesson_id', lessonId)
      .select();

    if (error) {
      console.error(`  ❌ Error deleting from lesson_examples:`, error);
    } else {
      console.log(`  ✅ Deleted ${deleted?.length || 0} examples for lesson ${lessonId}`);
    }
  }

  console.log('\n📝 Step 2: Migrating English practice questions...');

  // Get all English lessons
  const { data: englishLessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, subject')
    .eq('subject', 'english')
    .order('lesson_key');

  console.log(`  - Found ${englishLessons?.length || 0} English lessons`);

  let totalMigrated = 0;
  let totalKept = 0;

  // For each English lesson, split examples
  for (const lesson of englishLessons || []) {
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    if (!examples || examples.length === 0) {
      console.log(`  - ${lesson.lesson_key}: No examples, skipping`);
      continue;
    }

    // Strategy: Keep first 15 as teaching examples, migrate rest to practice
    const teachingExamples = examples.slice(0, 15);
    const practiceExamples = examples.slice(15);

    console.log(`  - ${lesson.lesson_key}: ${examples.length} total → ${teachingExamples.length} teaching + ${practiceExamples.length} practice`);

    if (practiceExamples.length === 0) {
      console.log(`    ℹ️  No practice examples to migrate (lesson has ≤15 examples)`);
      totalKept += teachingExamples.length;
      continue;
    }

    // Migrate practice examples to practice_questions table
    for (let i = 0; i < practiceExamples.length; i++) {
      const ex = practiceExamples[i];

      // Determine difficulty based on position
      let difficulty = 'easy';
      if (i >= practiceExamples.length * 0.67) {
        difficulty = 'hard';
      } else if (i >= practiceExamples.length * 0.33) {
        difficulty = 'medium';
      }

      const practiceQuestion = {
        lesson_id: ex.lesson_id,
        subject: 'english',
        position: i + 1, // Reposition starting from 1
        difficulty: difficulty,
        title: ex.title,
        problem_text: ex.problem_text,
        choices: ex.choices,
        correct_answer: ex.correct_answer,
        answer_explanation: ex.answer_explanation,
        solution_steps: ex.solution_steps || []
      };

      const { error: insertError } = await supabase
        .from('practice_questions')
        .insert([practiceQuestion]);

      if (insertError) {
        console.error(`    ❌ Error inserting practice question:`, insertError);
      }
    }

    // Delete the migrated examples from lesson_examples
    const practiceExampleIds = practiceExamples.map(ex => ex.id);
    const { error: deleteError } = await supabase
      .from('lesson_examples')
      .delete()
      .in('id', practiceExampleIds);

    if (deleteError) {
      console.error(`    ❌ Error deleting migrated examples:`, deleteError);
    } else {
      console.log(`    ✅ Migrated ${practiceExamples.length} to practice_questions, kept ${teachingExamples.length} for teaching`);
      totalMigrated += practiceExamples.length;
      totalKept += teachingExamples.length;
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`  - Total English examples migrated to practice: ${totalMigrated}`);
  console.log(`  - Total English examples kept for teaching: ${totalKept}`);
  console.log(`  - Math questions removed from lesson_examples: 90`);

  // Verify final state
  console.log('\n📊 Final Verification:');
  const { count: examplesCount } = await supabase
    .from('lesson_examples')
    .select('*', { count: 'exact', head: true });

  const { count: practiceCount } = await supabase
    .from('practice_questions')
    .select('*', { count: 'exact', head: true });

  console.log(`  - Total lesson_examples: ${examplesCount}`);
  console.log(`  - Total practice_questions: ${practiceCount}`);

  console.log('\n✅ Separation complete!');
}

fixSeparation();
