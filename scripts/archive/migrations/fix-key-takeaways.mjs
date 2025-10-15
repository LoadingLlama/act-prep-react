/**
 * Fix Key Takeaways styling:
 * - Remove checkmark from title
 * - Add dark green checkmarks to each bullet point
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing Key Takeaways section...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Find and replace the Key Takeaways section
// Remove checkmark from title and add dark green checkmarks to bullets

// Old pattern: <h3>✓ Key Takeaways</h3><ul>...
// New pattern: <h3>Key Takeaways</h3><ul> with dark green checkmarks

// First, remove the checkmark from the title (it's an h4, not h3)
content = content.replace(
  /Key Takeaways<\/h4>/,
  'Key Takeaways</h4>'
);

console.log('✅ Ensured no checkmark in title');

// Now add dark green checkmarks to each list item in the Key Takeaways section
// Find the ul that follows "Key Takeaways" h4

// Find the Key Takeaways section (looking for h4 this time)
const keyTakeawaysMatch = content.match(/Key Takeaways<\/h4>\s*<ul[^>]*>([\s\S]*?)<\/ul>/);

if (keyTakeawaysMatch) {
  const originalUl = keyTakeawaysMatch[0];

  // Replace each <li style="..."> with the checkmark added
  const updatedUl = originalUl.replace(
    /<li style="([^"]*)">([^<])/g,
    '<li style="$1"><span style="color: #059669; font-weight: 600; margin-right: 0.5rem;">✓</span>$2'
  );

  content = content.replace(originalUl, updatedUl);
  console.log('✅ Added dark green checkmarks to bullet points');
} else {
  console.log('⚠️  Could not find Key Takeaways section');
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
