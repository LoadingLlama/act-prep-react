import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAllLessons() {
  console.log('🔍 CHECKING ALL LESSONS IN DATABASE');
  console.log('====================================\n');

  // Get ALL lessons to see structure
  const { data: lessons, error } = await supabase
    .from('lesson_metadata')
    .select('*')
    .limit(50);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total lessons: ${lessons.length}\n`);

  // Group by subject/category
  const bySubject = {};
  lessons.forEach(l => {
    const subject = l.subject || l.category || 'Unknown';
    if (!bySubject[subject]) bySubject[subject] = [];
    bySubject[subject].push(l);
  });

  Object.entries(bySubject).forEach(([subject, list]) => {
    console.log(`\n${subject}: ${list.length} lessons`);
    list.forEach(l => {
      console.log(`  - ${l.lesson_key}: ${l.title}`);
    });
  });

  // Now check examples
  console.log('\n\n🔍 CHECKING EXAMPLES');
  console.log('=====================\n');

  const { data: examples } = await supabase
    .from('examples')
    .select(`
      *,
      lesson_metadata(lesson_key, title, subject, category)
    `)
    .limit(200);

  console.log(`Total examples: ${examples?.length || 0}\n`);

  // Group examples by lesson
  const byLesson = {};
  examples?.forEach(ex => {
    const lessonKey = ex.lesson_metadata?.lesson_key || 'unknown';
    if (!byLesson[lessonKey]) byLesson[lessonKey] = [];
    byLesson[lessonKey].push(ex);
  });

  Object.entries(byLesson).forEach(([lessonKey, exList]) => {
    console.log(`\n${lessonKey}: ${exList.length} examples`);
    exList.forEach((ex, idx) => {
      console.log(`  ${idx + 1}. ${ex.title}`);
      console.log(`     Problem: ${ex.problem_text?.substring(0, 80)}...`);
    });
  });
}

checkAllLessons().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
