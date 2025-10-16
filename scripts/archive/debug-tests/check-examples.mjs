import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkExamples() {
  // Get all lessons with their example counts
  const { data: lessons, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title');

  if (lessonError) {
    console.error('❌ Error fetching lessons:', lessonError);
    return;
  }

  console.log('📊 LESSON EXAMPLES SUMMARY\n');
  console.log('Lesson Key | Example Count | Title');
  console.log('-----------|---------------|------');

  for (const lesson of lessons) {
    const { data: examples, error: exampleError } = await supabase
      .from('examples')
      .select('id')
      .eq('lesson_id', lesson.id);

    if (exampleError) {
      console.error(`❌ Error fetching examples for ${lesson.lesson_key}:`, exampleError);
      continue;
    }

    const count = examples?.length || 0;
    if (count > 0) {
      console.log(`${lesson.lesson_key?.padEnd(10) || 'null'.padEnd(10)} | ${String(count).padEnd(13)} | ${lesson.title}`);
    }
  }
}

checkExamples().catch(err => {
  console.error('❌ Check failed:', err);
  process.exit(1);
});
