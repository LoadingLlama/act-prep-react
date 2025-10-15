/**
 * Analyze how the lesson is split into sections
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
console.log('');

// Simulate splitIntoTextSections logic
const content = lessonData.content;

// Look for section markers
const sectionMarker = '###SECTION###';
const exampleMarker = '###EXAMPLE###';

// Count markers
const sectionCount = (content.match(/###SECTION###/g) || []).length;
const exampleCount = (content.match(/###EXAMPLE###/g) || []).length;

console.log('Section markers (###SECTION###):', sectionCount);
console.log('Example markers (###EXAMPLE###):', exampleCount);

// Split on both markers
const parts = content.split(/(###SECTION###|###EXAMPLE###)/);
console.log('\nTotal parts after split:', parts.length);

// Filter out empty parts and markers
const sections = parts
  .filter(part => part.trim() && part !== '###SECTION###' && part !== '###EXAMPLE###');

console.log('Non-empty sections after filtering:', sections.length);
console.log('');

// Show first 100 chars of each section
sections.forEach((section, idx) => {
  const preview = section.trim().substring(0, 100).replace(/\n/g, ' ');
  const type = section.includes('Problem:') ? 'EXAMPLE' : 'TEXT';
  console.log(`Section ${idx} (${type}): ${preview}...`);
});

console.log('');
console.log('Quiz should be at position:', sections.length);
console.log('');

// Get current quiz position
const { data: quiz } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id)
  .single();

console.log('Current quiz position:', quiz.position);

if (quiz.position !== sections.length) {
  console.log('⚠️  Quiz position should be updated to:', sections.length);
}
