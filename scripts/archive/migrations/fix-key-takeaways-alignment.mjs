/**
 * Remove indentation from Key Takeaways bullet points
 * Make them flush left aligned with the title
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

// Find Key Takeaways section and remove all padding-left from ul
// The ul in Key Takeaways typically has padding-left
content = content.replace(
  /<ul style="([^"]*list-style:\s*none[^"]*)"/g,
  (match, styles) => {
    // This is likely the Key Takeaways ul (it has list-style: none)
    // Remove any padding-left or margin-left
    let newStyles = styles
      .replace(/padding-left:\s*[^;]+;?/g, '')
      .replace(/margin-left:\s*[^;]+;?/g, '')
      .trim();

    // Add padding-left: 0 to ensure no indentation
    if (!newStyles.includes('padding-left')) {
      newStyles += ' padding-left: 0;';
    }

    return `<ul style="${newStyles}"`;
  }
);

console.log('✓ Removed indentation from Key Takeaways ul');

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
console.log('Key Takeaways bullet points are now flush left aligned with the title');
