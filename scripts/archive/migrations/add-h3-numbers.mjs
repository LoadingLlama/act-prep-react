/**
 * Add numbers to H3 headers (big section headers)
 * Like: 1. What Is an Angle?, 2. Types of Angles, etc.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     ADDING NUMBERS TO H3 HEADERS                        ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const { data } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

for (const lesson of data) {
  let updatedContent = lesson.content;
  let h3Number = 1;

  // Find all H3 tags and add numbers
  updatedContent = updatedContent.replace(
    /<h3([^>]*)>([^<]+)<\/h3>/g,
    (match, attrs, content) => {
      // Check if it already has a number
      if (/^\d+\.\s/.test(content.trim())) {
        return match; // Already has a number
      }

      // Add the number
      const numbered = `<h3${attrs}>${h3Number}. ${content}</h3>`;
      h3Number++;
      return numbered;
    }
  );

  console.log(lesson.lesson_key + ':');
  console.log('  Added numbers to', h3Number - 1, 'H3 headers');

  await supabase
    .from('lessons')
    .update({
      content: updatedContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', lesson.lesson_key);

  console.log('  ✅ Updated\n');
}

console.log('✅ All H3 headers now have numbers!');
console.log('\nExample: 1. What Is an Angle?');
console.log('         2. Types of Angles');
console.log('         3. Angle Pairs: Complementary and Supplementary');
