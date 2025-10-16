import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Check all English lesson examples in database
 */
async function checkExampleQuality() {
  console.log('🔍 CHECKING ENGLISH LESSON EXAMPLES');
  console.log('====================================\n');

  // Get all English lessons
  const { data: lessons, error: lessonsError } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('subject', 'English')
    .order('lesson_key');

  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError);
    return;
  }

  console.log(`Found ${lessons.length} English lessons\n`);

  for (const lesson of lessons) {
    // Get examples for this lesson
    const { data: examples, error: examplesError } = await supabase
      .from('examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    if (examplesError) {
      console.error(`Error fetching examples for ${lesson.lesson_key}:`, examplesError);
      continue;
    }

    console.log(`\n📚 ${lesson.lesson_key} (${lesson.title})`);
    console.log(`   Examples: ${examples.length}`);

    examples.forEach((ex, idx) => {
      console.log(`\n   Example ${idx + 1}:`);
      console.log(`   - Position: ${ex.position}`);
      console.log(`   - Title: ${ex.title}`);
      console.log(`   - Problem (first 100 chars): ${ex.problem_text?.substring(0, 100)}...`);
      console.log(`   - Choices: ${ex.choices?.length || 0}`);
      console.log(`   - Correct: ${ex.correct_answer}`);
      console.log(`   - Solution steps: ${ex.solution_steps?.length || 0}`);
    });
  }

  console.log('\n\n====================================');
  console.log('✅ Check complete!');
}

checkExampleQuality().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
