/**
 * Add underlines to blue bolded key terms
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Adding underlines to blue bolded text...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Count before
const beforeCount = (content.match(/<strong style="color: #2563eb; font-weight: 600;">/g) || []).length;
console.log('Blue bold instances before:', beforeCount);

// Update the style to include underline
content = content.replace(
  /<strong style="color: #2563eb; font-weight: 600;">/g,
  '<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">'
);

// Count after
const afterCount = (content.match(/<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">/g) || []).length;
console.log('Blue bold + underline instances after:', afterCount);
console.log('');

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
  console.log('✅ Successfully added underlines to blue bold text!');
}
