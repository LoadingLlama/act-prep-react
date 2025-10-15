/**
 * Recount sections after adding ###EXAMPLE### markers
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

const content = lessonData.content;

// Count sections - the splitIntoTextSections function splits by H3 headers
// and then extracts examples as separate sections
const h3Count = (content.match(/<h3[^>]*>/g) || []).length;
const exampleMarkers = (content.match(/###EXAMPLE###/g) || []).length;

console.log('Lesson:', lessonData.lesson_key);
console.log('');
console.log('H3 headers:', h3Count);
console.log('###EXAMPLE### markers:', exampleMarkers);
console.log('');

// The splitIntoTextSections function:
// 1. Splits by H3 headers (creates text sections)
// 2. Within each H3 section, if it contains examples, it splits them out
// So if an H3 section has examples, it becomes: intro text + examples

// For geometry-angles:
// - 6 H3 sections
// - Some H3 sections have examples that get extracted
// Let's simulate what splitIntoTextSections does

// Check which H3 sections have examples
const h3Sections = content.split(/(?=<h3[^>]*>)/);
console.log('H3 sections with examples:');

let totalSections = 0;
h3Sections.forEach((section, idx) => {
  if (section.includes('<h3')) {
    const hasExamples = section.includes('###EXAMPLE###');
    const exampleCount = (section.match(/###EXAMPLE###/g) || []).length;

    if (hasExamples) {
      // This H3 section will be split into: 1 intro text + N examples
      const sectionCount = 1 + exampleCount;
      console.log(`  Section ${idx}: ${sectionCount} subsections (1 text + ${exampleCount} examples)`);
      totalSections += sectionCount;
    } else {
      console.log(`  Section ${idx}: 1 section (text only)`);
      totalSections += 1;
    }
  }
});

console.log('');
console.log('Total sections after splitting:', totalSections);
console.log('');

// Get current quiz position
const { data: quiz } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id)
  .single();

console.log('Current quiz position:', quiz.position);
console.log('Quiz should be at position:', totalSections);

if (quiz.position !== totalSections) {
  console.log('');
  console.log('⚠️  Quiz position needs to be updated!');
  console.log('Updating to:', totalSections);

  const { error } = await supabase
    .from('quizzes')
    .update({ position: totalSections })
    .eq('id', quiz.id);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ Updated quiz position to', totalSections);
  }
}
