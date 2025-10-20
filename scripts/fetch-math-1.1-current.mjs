import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchMath11() {
  console.log('Fetching all math lessons to find 1.1...');

  // First, list all math lessons to see what exists
  const { data: allLessons, error: listError } = await supabase
    .from('lessons')
    .select('lesson_key, title, subject')
    .eq('subject', 'math')
    .order('lesson_key');

  if (listError) {
    console.error('Error listing lessons:', listError);
    return;
  }

  console.log('\nAvailable Math Lessons:');
  allLessons.forEach(l => console.log(`  ${l.lesson_key} - ${l.title}`));

  // Try to fetch backsolving lesson (which should be Math 1.1)
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'backsolving')
    .single();

  if (error) {
    console.error('\nError fetching backsolving lesson:', error);
    return;
  }

  if (!lesson) {
    console.log('No lesson found with key backsolving');
    return;
  }

  console.log('\n=== MATH 1.1 LESSON ===');
  console.log('Title:', lesson.title);
  console.log('Subject:', lesson.subject);
  console.log('Lesson Key:', lesson.lesson_key);
  console.log('Category:', lesson.category);

  // Save the content
  const content = lesson.content || '';
  fs.writeFileSync('current-math-1.1.html', content);
  console.log('\nSaved current content to: current-math-1.1.html');
  console.log('Content length:', content.length, 'characters');

  // Also save full lesson object as JSON for reference
  fs.writeFileSync('current-math-1.1.json', JSON.stringify(lesson, null, 2));
  console.log('Saved full lesson object to: current-math-1.1.json');
}

fetchMath11();
