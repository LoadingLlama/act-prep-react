/**
 * Update all bold text to blue bold
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Updating bold text to blue bold...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Count before
const beforeCount = (content.match(/<strong>/g) || []).length;
console.log('Found', beforeCount, 'bold text instances');

// Replace all <strong> with <strong style="color: #2563eb; font-weight: 600;">
// Using a nice blue color (#2563eb) that's commonly used in modern UIs
content = content.replace(/<strong>/g, '<strong style="color: #2563eb; font-weight: 600;">');

// Count after
const afterCount = (content.match(/<strong style="color: #2563eb; font-weight: 600;">/g) || []).length;
console.log('Updated', afterCount, 'instances to blue bold\n');

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
  console.log('✅ Successfully updated all bold text to blue bold!');
}
