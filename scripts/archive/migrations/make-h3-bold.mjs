/**
 * Update H3 headers to be bold
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Making H3 headers bold...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Replace font-weight: 400 with font-weight: 700 in H3 tags
content = content.replace(
  /<h3 style="([^"]*?)font-weight: 400;([^"]*?)">/g,
  '<h3 style="$1font-weight: 700;$2">'
);

console.log('Updated H3 headers to bold (font-weight: 700)\n');

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
  console.log('✅ Successfully updated H3 headers to be bold!');
}
