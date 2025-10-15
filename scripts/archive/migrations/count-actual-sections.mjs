/**
 * Count actual sections including examples
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

const content = lessonData.content;

// Count h3 sections
const h3Count = (content.match(/<h3[^>]*>/g) || []).length;
console.log('H3 sections:', h3Count);

// Count h4 examples
const exampleCount = (content.match(/<h4[^>]*>Example \d+/gi) || []).length;
console.log('Examples (h4):', exampleCount);

// Simulate what splitIntoTextSections does:
// - Splits by H3
// - Each H3 section with examples gets split into: text + example sections
// So the total sections = text sections + example sections

// Quick estimate:
// If there are h3 sections with examples, each one becomes: 1 text + N examples
// If there are h3 sections without examples, they stay as 1 text section

console.log('');
console.log('Expected total sections (text + examples):', h3Count + exampleCount);
console.log('Quiz should be at position:', h3Count + exampleCount);
console.log('');

// Get current quiz position
const { data: quiz } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id)
  .single();

console.log('Current quiz position:', quiz.position);

if (quiz.position !== (h3Count + exampleCount)) {
  console.log('');
  console.log('⚠️  Recommended: Update quiz position to:', h3Count + exampleCount);
}
