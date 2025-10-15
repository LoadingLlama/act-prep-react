/**
 * Count text sections in geometry-angles lesson
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('Lesson:', lessonData.lesson_key);
console.log('Lesson title:', lessonData.title);
console.log('');

// Count sections marked with ###SECTION### or similar markers
const content = lessonData.content;

// Look for different section patterns
const sectionMarkers = content.match(/###SECTION###/g) || [];
const exampleMarkers = content.match(/###EXAMPLE###/g) || [];

console.log('Section markers found:', sectionMarkers.length);
console.log('Example markers found:', exampleMarkers.length);
console.log('Total sections (text + examples):', sectionMarkers.length + exampleMarkers.length);

// The frontend splits by these markers
// So if there are N markers, there are N+1 sections
const totalTextSections = sectionMarkers.length + 1;

console.log('\nTotal text sections (after splitting):', totalTextSections);
console.log('');

// Get quiz position
const { data: quiz } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id)
  .single();

console.log('Quiz title:', quiz.title);
console.log('Quiz position:', quiz.position);
console.log('');

if (quiz.position >= totalTextSections) {
  console.log('⚠️  PROBLEM: Quiz position (' + quiz.position + ') is >= total sections (' + totalTextSections + ')');
  console.log('   The quiz will be placed at the END of the lesson.');
  console.log('   It should probably be at position:', totalTextSections - 1, '(to appear after the last text section)');
} else {
  console.log('✅ Quiz position looks good');
}
