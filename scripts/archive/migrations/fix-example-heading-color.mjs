/**
 * Change Example headings from blue to black
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Changing Example headings from blue to black...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Replace all Example h4 tags' blue color with black
content = content.replace(
  /<h4 style="([^"]*color: #2563eb;[^"]*)">Example (\d+)<\/h4>/g,
  (match, style, num) => {
    // Replace the blue color with black
    const newStyle = style.replace('color: #2563eb;', 'color: #000000;');
    return `<h4 style="${newStyle}">Example ${num}</h4>`;
  }
);

console.log('✅ Changed Example headings to black');

// Update in database
const { error } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-angles');

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log('\n💾 Example headings updated successfully!');
}
