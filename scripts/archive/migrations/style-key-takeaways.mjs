/**
 * Style Key Takeaways:
 * - Remove checkmark from title
 * - Make title dark green
 * - Make all bullet point text dark green
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Styling Key Takeaways section...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Find the Key Takeaways section
const keyTakeawaysMatch = content.match(/(Key Takeaways<\/h4>\s*<ul[^>]*>[\s\S]*?<\/ul>)/);

if (keyTakeawaysMatch) {
  const originalSection = keyTakeawaysMatch[0];
  let updatedSection = originalSection;

  // Update each li to have dark green text color (not just the checkmark)
  updatedSection = updatedSection.replace(
    /<li style="([^"]*)">(<span[^>]*>✓<\/span>)/g,
    (match, style, checkmark) => {
      // Add dark green color to the li style
      let newStyle = style;
      if (!newStyle.includes('color:')) {
        newStyle = newStyle + ' color: #059669;';
      } else {
        newStyle = newStyle.replace(/color:\s*[^;]+;?/, 'color: #059669;');
      }
      return `<li style="${newStyle}">${checkmark}`;
    }
  );

  content = content.replace(originalSection, updatedSection);
  console.log('✅ Made bullet point text dark green');
}

// Remove any checkmark from title and make title dark green
// Find the h4 before the Key Takeaways
const h4Match = content.match(/<h4[^>]*>✓?\s*Key Takeaways<\/h4>/);
if (h4Match) {
  const originalH4 = h4Match[0];

  // Extract existing style if any
  const styleMatch = originalH4.match(/<h4([^>]*)>/);
  let attributes = styleMatch ? styleMatch[1] : '';

  // Add or update style attribute
  if (attributes.includes('style=')) {
    // Update existing style
    attributes = attributes.replace(
      /style="([^"]*)"/,
      (match, style) => {
        let newStyle = style;
        if (!newStyle.includes('color:')) {
          newStyle = newStyle + ' color: #059669;';
        } else {
          newStyle = newStyle.replace(/color:\s*[^;]+;?/, 'color: #059669;');
        }
        return `style="${newStyle}"`;
      }
    );
  } else {
    // Add new style attribute
    attributes = attributes + ' style="color: #059669;"';
  }

  const newH4 = `<h4${attributes}>Key Takeaways</h4>`;
  content = content.replace(originalH4, newH4);
  console.log('✅ Removed checkmark from title and made it dark green');
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
  console.log('\n💾 Key Takeaways styled successfully!');
}
