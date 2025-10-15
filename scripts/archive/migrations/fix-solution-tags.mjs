/**
 * Fix Solution tags - parser expects <strong>Solution:</strong>
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fetching geometry-angles lesson...\n');

const { data, error } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

if (error) {
  console.error('Error fetching lesson:', error);
  process.exit(1);
}

let content = data.content;

console.log('Fixing Solution tags to use <strong>...');

// Change the Solution paragraph to use <strong> tags (required by parser)
content = content.replace(
  /<p style="font-weight: 600; margin: 1\.5rem 0 0\.75rem 0; color: #374151;">Solution:<\/p>/g,
  '<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>'
);

console.log('✓ Fixed Solution tags');

// Update the database
console.log('\nUpdating database...');
const { error: updateError } = await supabase
  .from('lessons')
  .update({ content: content })
  .eq('lesson_key', 'geometry-angles');

if (updateError) {
  console.error('❌ Error updating:', updateError);
  process.exit(1);
}

console.log('✅ Successfully updated lesson!');
console.log('Parser should now be able to find answer choices');
