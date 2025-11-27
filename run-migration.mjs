/**
 * Execute migration to separate lesson_examples and practice_questions
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runMigration() {
  console.log('🚀 STARTING MIGRATION\n');

  try {
    // Step 1: Migrate English examples to practice_questions
    console.log('📝 Step 1: Migrating English examples to practice_questions...');

    const { data: englishExamples, error: fetchError } = await supabase
      .from('lesson_examples')
      .select('*, lessons!inner(subject)')
      .eq('lessons.subject', 'english');

    if (fetchError) {
      console.error('❌ Error fetching English examples:', fetchError);
      return;
    }

    console.log(`  - Found ${englishExamples.length} English examples to migrate`);

    // Group by lesson to calculate difficulty
    const byLesson = {};
    englishExamples.forEach(ex => {
      if (!byLesson[ex.lesson_id]) {
        byLesson[ex.lesson_id] = [];
      }
      byLesson[ex.lesson_id].push(ex);
    });

    let migratedCount = 0;

    for (const [lessonId, examples] of Object.entries(byLesson)) {
      console.log(`  - Processing lesson ${lessonId.substring(0, 8)}... (${examples.length} examples)`);

      for (let i = 0; i < examples.length; i++) {
        const ex = examples[i];

        // Determine difficulty
        let difficulty = 'easy';
        if (i >= examples.length * 0.67) {
          difficulty = 'hard';
        } else if (i >= examples.length * 0.33) {
          difficulty = 'medium';
        }

        const practiceQuestion = {
          lesson_id: ex.lesson_id,
          subject: 'english',
          position: ex.position,
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
          console.error(`    ❌ Error inserting question ${ex.position}:`, insertError.message);
        } else {
          migratedCount++;
        }
      }
    }

    console.log(`  ✅ Migrated ${migratedCount} English examples to practice_questions\n`);

    // Step 2: Delete ALL from lesson_examples
    console.log('📝 Step 2: Deleting ALL lesson_examples...');

    const { count: beforeCount } = await supabase
      .from('lesson_examples')
      .select('*', { count: 'exact', head: true });

    console.log(`  - Current lesson_examples count: ${beforeCount}`);

    const { error: deleteError } = await supabase
      .from('lesson_examples')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (using dummy condition)

    if (deleteError) {
      console.error('❌ Error deleting lesson_examples:', deleteError);
      return;
    }

    const { count: afterCount } = await supabase
      .from('lesson_examples')
      .select('*', { count: 'exact', head: true });

    console.log(`  ✅ Deleted all lesson_examples. New count: ${afterCount}\n`);

    // Step 3: Verification
    console.log('📊 VERIFICATION:\n');

    const { count: practiceCount } = await supabase
      .from('practice_questions')
      .select('*', { count: 'exact', head: true });

    console.log(`  - lesson_examples: ${afterCount} rows`);
    console.log(`  - practice_questions: ${practiceCount} rows\n`);

    // Count by subject
    const { data: bySubject } = await supabase
      .from('practice_questions')
      .select('subject, difficulty')
      .order('subject');

    const counts = {};
    bySubject.forEach(q => {
      if (!counts[q.subject]) counts[q.subject] = { easy: 0, medium: 0, hard: 0 };
      counts[q.subject][q.difficulty]++;
    });

    console.log('  Practice questions by subject:');
    Object.entries(counts).forEach(([subject, diffs]) => {
      const total = diffs.easy + diffs.medium + diffs.hard;
      console.log(`    - ${subject}: ${total} total (${diffs.easy} easy, ${diffs.medium} medium, ${diffs.hard} hard)`);
    });

    console.log('\n✅ MIGRATION COMPLETE!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

runMigration();
