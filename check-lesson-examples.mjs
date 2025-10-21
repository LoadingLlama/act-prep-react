import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function checkExamples() {
  // Get a Science lesson to check its ID
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .eq('subject', 'science')
    .limit(3);

  console.log('\n=== SCIENCE LESSONS ===');
  lessons.forEach(l => console.log(`${l.lesson_key}: ${l.id}`));

  // Check examples for one Science lesson
  if (lessons && lessons.length > 0) {
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lessons[0].id);

    console.log(`\n=== EXAMPLES FOR ${lessons[0].lesson_key} ===`);
    if (examples && examples.length > 0) {
      examples.forEach((ex, idx) => {
        console.log(`\nExample ${idx + 1}:`);
        console.log(`Position: ${ex.position}`);
        console.log(`Question: ${ex.question_text?.substring(0, 100)}...`);
        console.log(`Options: ${JSON.stringify(ex.options)}`);
        console.log(`Correct: ${ex.correct_answer}`);
      });
    } else {
      console.log('NO EXAMPLES FOUND');
    }
  }

  // Check an English lesson for reference
  const { data: engLesson } = await supabase
    .from('lessons')
    .select('id, lesson_key')
    .eq('lesson_key', 'commas')
    .single();

  if (engLesson) {
    const { data: engExamples } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', engLesson.id)
      .limit(2);

    console.log(`\n=== ENGLISH EXAMPLES (commas) FOR REFERENCE ===`);
    if (engExamples && engExamples.length > 0) {
      engExamples.forEach((ex, idx) => {
        console.log(`\nExample ${idx + 1}:`);
        console.log(JSON.stringify(ex, null, 2));
      });
    }
  }
}

checkExamples();
