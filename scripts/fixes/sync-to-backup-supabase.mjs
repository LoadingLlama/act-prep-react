import { createClient } from '@supabase/supabase-js';

// Production database
const prodSupabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Backup database
const backupSupabase = createClient(
  'https://ckpnqiilogfmodwhoyqo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrcG5xaWlsb2dmbW9kd2hveXFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjQ3NjczNSwiZXhwIjoyMDQ4MDUyNzM1fQ.SJgMvQ9ZJdvFX48a_9TKQnuSwOE2-BQ40L8X2mfRRZk'
);

async function syncLesson(lessonKey) {
  console.log(`\nSyncing lesson: ${lessonKey}`);

  // Get lesson from production
  const { data: prodLesson, error: prodError } = await prodSupabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  if (prodError) {
    console.error(`  ❌ Error fetching from prod:`, prodError.message);
    return;
  }

  // Check if lesson exists in backup
  const { data: backupCheck, error: checkError } = await backupSupabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', lessonKey)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error(`  ❌ Error checking backup:`, checkError.message);
    return;
  }

  if (backupCheck) {
    // Update existing lesson
    const { error: updateError } = await backupSupabase
      .from('lessons')
      .update({
        subject: prodLesson.subject,
        title: prodLesson.title,
        content: prodLesson.content,
        order_index: prodLesson.order_index,
        content_json: prodLesson.content_json,
        migrated_to_json: prodLesson.migrated_to_json
      })
      .eq('lesson_key', lessonKey);

    if (updateError) {
      console.error(`  ❌ Error updating:`, updateError.message);
      return;
    } else {
      console.log(`  ✓ Updated lesson in backup`);
    }
  } else {
    // Insert new lesson
    const { data: newLesson, error: insertError } = await backupSupabase
      .from('lessons')
      .insert({
        subject: prodLesson.subject,
        lesson_key: prodLesson.lesson_key,
        title: prodLesson.title,
        content: prodLesson.content,
        order_index: prodLesson.order_index,
        content_json: prodLesson.content_json,
        migrated_to_json: prodLesson.migrated_to_json
      })
      .select();

    if (insertError) {
      console.error(`  ❌ Error inserting:`, insertError.message);
      return;
    } else {
      console.log(`  ✓ Created new lesson in backup`);
    }
  }

  // Get examples from production
  const { data: prodExamples } = await prodSupabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', prodLesson.id);

  if (!prodExamples || prodExamples.length === 0) {
    console.log(`  ℹ No examples to sync`);
    return;
  }

  // Get backup lesson ID
  const { data: backupLesson, error: backupLessonError } = await backupSupabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', lessonKey)
    .single();

  if (backupLessonError || !backupLesson) {
    console.error(`  ❌ Could not find lesson in backup after insert/update`);
    return;
  }

  // Delete old examples
  await backupSupabase
    .from('lesson_examples')
    .delete()
    .eq('lesson_id', backupLesson.id);

  // Insert new examples
  for (const example of prodExamples) {
    const { error: exampleError } = await backupSupabase
      .from('lesson_examples')
      .insert({
        lesson_id: backupLesson.id,
        position: example.position,
        title: example.title,
        problem_text: example.problem_text,
        choices: example.choices,
        correct_answer: example.correct_answer,
        solution_steps: example.solution_steps,
        answer_explanation: example.answer_explanation,
        diagram_svg: example.diagram_svg,
        is_worked_example: example.is_worked_example
      });

    if (exampleError) {
      console.error(`  ❌ Error inserting example "${example.title}":`, exampleError.message);
    } else {
      console.log(`  ✓ Synced example: ${example.title}`);
    }
  }
}

async function syncAll() {
  console.log('='.repeat(60));
  console.log('Syncing Science lessons from Production to Backup');
  console.log('='.repeat(60));

  const scienceLessons = [
    // Unit 3
    'two-part-answers',
    'cannot-be-determined',
    'equations-as-answers',
    'mixing',
    'math-on-science',

    // Unit 4
    'water-knowledge',
    'experimental-setup',
    'outside-knowledge',
    'conflicting-viewpoints'
  ];

  for (const lessonKey of scienceLessons) {
    await syncLesson(lessonKey);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Sync complete!');
  console.log('='.repeat(60));
}

syncAll();
