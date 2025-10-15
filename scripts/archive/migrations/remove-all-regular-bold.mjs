/**
 * Remove ALL regular bold from lesson, keep only blue bold for key terms
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Removing all regular bold from geometry-angles...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Count before
const beforeCount = (content.match(/<strong>.*?<\/strong>/g) || []).length;
console.log('Regular bold instances before:', beforeCount);

// Remove all regular <strong> tags but keep blue bold
// Strategy: Replace <strong>text</strong> with just text, but NOT the blue bold ones

// First, temporarily replace blue bold with a placeholder
content = content.replace(/<strong style="color: #2563eb; font-weight: 600;">(.*?)<\/strong>/g, '###BLUEBOLD###$1###/BLUEBOLD###');

// Now remove all remaining <strong> tags
content = content.replace(/<strong>/g, '');
content = content.replace(/<\/strong>/g, '');

// Restore blue bold
content = content.replace(/###BLUEBOLD###/g, '<strong style="color: #2563eb; font-weight: 600;">');
content = content.replace(/###\/BLUEBOLD###/g, '</strong>');

// Count after
const afterCount = (content.match(/<strong>.*?<\/strong>/g) || []).length;
const blueBoldCount = (content.match(/<strong style="color: #2563eb; font-weight: 600;">/g) || []).length;

console.log('Regular bold instances after:', afterCount);
console.log('Blue bold instances (kept):', blueBoldCount);
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
  console.log('✅ Successfully removed all regular bold!');
  console.log('   - Only blue bold for key terms remains');
}
