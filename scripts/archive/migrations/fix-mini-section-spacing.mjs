/**
 * Fix all spacing in mini sections to be compact and consistent
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing mini section spacing for compact, consistent layout...\n');

const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Count before
const ulCount = (content.match(/<ul style="/g) || []).length;
const liCount = (content.match(/<li style="/g) || []).length;
console.log(`Before: ${ulCount} styled ULs, ${liCount} styled LIs`);

// Fix outer UL (Definition lists) - reduce margin and line-height
content = content.replace(
  /<ul style="margin: 1rem 0; padding-left: 1\.5rem; line-height: 2;"/g,
  '<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"'
);
console.log('✅ Fixed outer UL spacing (margin: 1rem → 0.3rem-0.5rem, line-height: 2 → 1.5)');

// Fix nested UL (Examples/Think of it as) - minimal margin
content = content.replace(
  /<ul style="margin: 0\.5rem 0; padding-left: 1\.5rem;"/g,
  '<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"'
);
console.log('✅ Fixed nested UL spacing (margin: 0.5rem → 0.15rem)');

// Fix outer LI (Definition line) - reduce margin
content = content.replace(
  /<li style="margin: 0\.4rem 0;"/g,
  '<li style="margin: 0.15rem 0;"'
);
console.log('✅ Fixed outer LI spacing (margin: 0.4rem → 0.15rem)');

// Fix LI with color (Key Takeaways) - keep consistent
content = content.replace(
  /<li style="margin: 0\.4rem 0; color: #047857;"/g,
  '<li style="margin: 0.15rem 0; color: #047857;"'
);
console.log('✅ Fixed Key Takeaways LI spacing');

// Fix H4 margin-bottom before these lists (if it exists)
content = content.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem;/g,
  '<h4 style="margin-top: 2rem; margin-bottom: 0.3rem;'
);
console.log('✅ Reduced H4 margin-bottom to bring list closer');

// Count after
const ulCountAfter = (content.match(/<ul style="/g) || []).length;
const liCountAfter = (content.match(/<li style="/g) || []).length;
console.log(`\nAfter: ${ulCountAfter} styled ULs, ${liCountAfter} styled LIs`);

// Show sample
const acuteIndex = content.indexOf('Acute Angles');
if (acuteIndex !== -1) {
  const sample = content.substring(acuteIndex, acuteIndex + 500);
  console.log('\nSample after fix (Acute Angles):');
  console.log('---');
  console.log(sample);
  console.log('---');
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
  console.error('\n❌ Error:', error);
} else {
  console.log('\n💾 Mini section spacing updated successfully!');
  console.log('\nNew spacing:');
  console.log('  - Outer UL: margin 0.3rem-0.5rem, line-height 1.5');
  console.log('  - Nested UL: margin 0.15rem');
  console.log('  - Outer LI: margin 0.15rem');
  console.log('  - H4 to list: 0.3rem gap');
}
