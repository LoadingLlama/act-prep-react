/**
 * Fix intro structure and numbering:
 * 1. Remove first redundant H3 titles
 * 2. Change letter labels to numbers for type lists (1. 2. 3. 4.)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     FIXING INTRO AND NUMBERING                          ║');
console.log('║     1. Remove redundant first H3                        ║');
console.log('║     2. Use numbers (1. 2. 3.) for type lists            ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const { data } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

// GEOMETRY-ANGLES
const anglesLesson = data.find(l => l.lesson_key === 'geometry-angles');
let anglesContent = anglesLesson.content;

console.log('geometry-angles:');

// Remove first H3 "Understanding Angles" and keep the intro paragraph
anglesContent = anglesContent.replace(
  /<h3 style="margin-top: 5rem; margin-bottom: 0\.75rem; font-weight: 500;">Understanding Angles<\/h3>[\s\S]*?(<p style="font-size: 0\.9rem; line-height: 1\.6; margin: 0\.5rem 0 1rem 0;">.*?<\/p>)/,
  '$1'
);

// In "Types of Angles" section, change a) b) c) d) to 1. 2. 3. 4.
anglesContent = anglesContent.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem; font-weight: 500;">a\) Acute Angles<\/h4>/,
  '<h4 style="margin-top: 2rem; margin-bottom: 0.5rem; font-weight: 500;">1. Acute Angles</h4>'
);
anglesContent = anglesContent.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem; font-weight: 500;">b\) Right Angles<\/h4>/,
  '<h4 style="margin-top: 2rem; margin-bottom: 0.5rem; font-weight: 500;">2. Right Angles</h4>'
);
anglesContent = anglesContent.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem; font-weight: 500;">c\) Obtuse Angles<\/h4>/,
  '<h4 style="margin-top: 2rem; margin-bottom: 0.5rem; font-weight: 500;">3. Obtuse Angles</h4>'
);
anglesContent = anglesContent.replace(
  /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem; font-weight: 500;">d\) Straight Angles<\/h4>/,
  '<h4 style="margin-top: 2rem; margin-bottom: 0.5rem; font-weight: 500;">4. Straight Angles</h4>'
);

console.log('  ✅ Removed redundant first H3');
console.log('  ✅ Changed angle types to 1. 2. 3. 4.');

// GEOMETRY-SHAPES
const shapesLesson = data.find(l => l.lesson_key === 'geometry-shapes');
let shapesContent = shapesLesson.content;

console.log('\\ngeometry-shapes:');

// Remove first H3 "Area and Perimeter of Shapes" and keep the intro paragraph
shapesContent = shapesContent.replace(
  /<h3 style="margin-top: 5rem; margin-bottom: 0\.75rem; font-weight: 500;">Area and Perimeter of Shapes<\/h3>[\s\S]*?(<p style="font-size: 0\.9rem; line-height: 1\.6; margin: 0\.5rem 0 1rem 0;">.*?<\/p>)/,
  '$1'
);

console.log('  ✅ Removed redundant first H3');

// Update both lessons
await supabase
  .from('lessons')
  .update({
    content: anglesContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-angles');

await supabase
  .from('lessons')
  .update({
    content: shapesContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-shapes');

console.log('\\n✅ Fixed intro and numbering!');
console.log('\\nNew structure:');
console.log('  geometry-angles:');
console.log('    - Starts with intro paragraph (no redundant H3)');
console.log('    - Types of Angles uses: 1. 2. 3. 4.');
console.log('    - Other sections keep letter labels');
console.log('  geometry-shapes:');
console.log('    - Starts with intro paragraph (no redundant H3)');
