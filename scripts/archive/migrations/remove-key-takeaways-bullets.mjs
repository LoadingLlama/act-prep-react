/**
 * Remove bullet points from Key Takeaways list
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Removing bullet points from Key Takeaways...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Find the Key Takeaways ul and add list-style: none
const keyTakeawaysMatch = content.match(/Key Takeaways<\/h4>\s*<ul style="([^"]*)">/);

if (keyTakeawaysMatch) {
  const originalUl = keyTakeawaysMatch[0];
  const currentStyle = keyTakeawaysMatch[1];

  // Add list-style: none to the style
  let newStyle = currentStyle;
  if (!newStyle.includes('list-style')) {
    newStyle = currentStyle + ' list-style: none;';
  }

  const updatedUl = originalUl.replace(
    `<ul style="${currentStyle}">`,
    `<ul style="${newStyle}">`
  );

  content = content.replace(originalUl, updatedUl);
  console.log('✅ Removed bullet points from Key Takeaways list');
} else {
  console.log('⚠️  Could not find Key Takeaways ul tag');
}

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
  console.log('\n💾 Key Takeaways updated successfully!');
}
