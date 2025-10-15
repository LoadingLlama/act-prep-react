/**
 * Only use blue bold for key terms with definitions
 * Regular bold for labels
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing bold styling...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// First, revert all blue bold back to regular bold
content = content.replace(/<strong style="color: #2563eb; font-weight: 600;">/g, '<strong>');

console.log('Reverted all to regular bold');

// Now selectively apply blue bold to key terms only
const keyTerms = [
  // Angle types
  'Acute Angles',
  'Right Angles',
  'Obtuse Angles',
  'Straight Angles',
  'Reflex Angles',
  // Angle pairs
  'Complementary Angles',
  'Supplementary Angles',
  'Vertical Angles',
  'Adjacent Angles',
  // Parallel lines concepts
  'Corresponding Angles',
  'Alternate Interior Angles',
  'Alternate Exterior Angles',
  'Same-Side Interior Angles',
  'Transversal',
  // Single word versions
  'complementary',
  'supplementary',
  'vertical angles',
  'adjacent angles',
  'corresponding angles',
  'alternate interior',
  'alternate exterior',
  'transversal'
];

let count = 0;
keyTerms.forEach(term => {
  const regex = new RegExp(`<strong>${term}</strong>`, 'gi');
  const matches = content.match(regex);
  if (matches) {
    content = content.replace(
      regex,
      `<strong style="color: #2563eb; font-weight: 600;">${term}</strong>`
    );
    count += matches.length;
  }
});

console.log(`Applied blue bold to ${count} key terms\n`);

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
  console.log('✅ Successfully updated bold styling!');
  console.log('   - Key terms: blue bold');
  console.log('   - Labels (Definition, Examples, etc.): regular bold');
}
