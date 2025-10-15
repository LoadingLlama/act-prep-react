/**
 * Apply blue bold only to key terms with definitions
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Applying blue bold to key terms...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Key definition terms that should be blue bold
const keyTerms = [
  'add up to 90°',
  'add up to 180°',
  'opposite each other',
  'next to each other',
  'KEY RULE: Vertical angles are ALWAYS equal',
  'KEY RULE: Adjacent angles on a straight line are supplementary \\(add to 180°\\)',
  'Vertical angles are always equal',
  'Adjacent angles on a straight line',
  'Parallel lines \\+ transversal',
  'Four angles will be acute',
  'Four angles will be obtuse',
  'sides',
  'degrees \\(°\\)',
  '360°',
  '180°'
];

let count = 0;
keyTerms.forEach(term => {
  const regex = new RegExp(`<strong>${term}</strong>`, 'g');
  const matches = content.match(regex);
  if (matches) {
    content = content.replace(
      regex,
      `<strong style="color: #2563eb; font-weight: 600;">${term}</strong>`
    );
    count += matches.length;
    console.log(`✓ Applied blue to: ${term} (${matches.length} instance(s))`);
  }
});

console.log(`\n✅ Applied blue bold to ${count} key terms\n`);

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
  console.log('💾 Successfully updated lesson content!');
}
