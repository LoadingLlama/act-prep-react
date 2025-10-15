/**
 * Remove top gray border from Example headings and keep only the left dark red border
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

// Remove border-top and padding-top from Example headings
content = content.replace(
  /<h4 style="([^"]*)">Example (\d+)<\/h4>/g,
  (match, styles, num) => {
    // Remove border-top, padding-top, and margin-top from styles
    let newStyles = styles
      .replace(/border-top:\s*[^;]+;/g, '')
      .replace(/padding-top:\s*[^;]+;/g, '')
      .replace(/margin-top:\s*[^;]+;/g, '');

    // Add clean margin-top
    newStyles = 'margin-top: 3rem; ' + newStyles;

    return `<h4 style="${newStyles}">Example ${num}</h4>`;
  }
);

console.log('✓ Cleaned up Example heading styles');

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
console.log('Example headings now have only:');
console.log('- Dark red left border (4px solid #b91c1c)');
console.log('- Left padding for spacing from border');
console.log('- Clean top margin');
