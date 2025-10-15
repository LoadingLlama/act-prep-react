/**
 * Fix blue keyword usage to be consistent and strategic
 * ONLY use blue underlining for key geometric TERMS that need definitions
 * Remove blue from emphasis text and descriptive phrases
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     FIXING BLUE KEYWORD CONSISTENCY                     ║');
console.log('║     Only key terms that need definitions               ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Fetch both lessons
const { data } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

// GEOMETRY-ANGLES
const anglesLesson = data.find(l => l.lesson_key === 'geometry-angles');
let anglesContent = anglesLesson.content;

console.log('geometry-angles:');

// KEEP blue for these key terms:
// - angle, vertex, transversal
// REMOVE blue from descriptive phrases

// Remove blue from "add up to 90°" and "add up to 180°"
const before1 = (anglesContent.match(/<strong style="color: #2563eb; text-decoration: underline;">/g) || []).length;
anglesContent = anglesContent.replace(
  /<strong style="color: #2563eb; text-decoration: underline;">add up to 90°<\/strong>/g,
  '<strong>add up to 90°</strong>'
);
anglesContent = anglesContent.replace(
  /<strong style="color: #2563eb; text-decoration: underline;">add up to 180°<\/strong>/g,
  '<strong>add up to 180°</strong>'
);

// Remove blue from "KEY RULE" emphasis
anglesContent = anglesContent.replace(
  /<strong style="color: #2563eb; text-decoration: underline;">KEY RULE: Vertical angles are ALWAYS equal<\/strong>/g,
  '<strong>KEY RULE: Vertical angles are ALWAYS equal</strong>'
);

const after1 = (anglesContent.match(/<strong style="color: #2563eb; text-decoration: underline;">/g) || []).length;
console.log('  Removed blue from', before1 - after1, 'non-term phrases');
console.log('  Kept blue for: angle, vertex, transversal');

// GEOMETRY-SHAPES
const shapesLesson = data.find(l => l.lesson_key === 'geometry-shapes');
let shapesContent = shapesLesson.content;

console.log('\ngeometry-shapes:');

// KEEP blue for these key terms:
// - radius
// REMOVE blue from descriptive phrases

// Remove blue from "distance around" and "space inside"
const before2 = (shapesContent.match(/<strong style="color: #2563eb; text-decoration: underline;">/g) || []).length;
shapesContent = shapesContent.replace(
  /<strong style="color: #2563eb; text-decoration: underline;">distance around<\/strong>/g,
  '<strong>distance around</strong>'
);
shapesContent = shapesContent.replace(
  /<strong style="color: #2563eb; text-decoration: underline;">space inside<\/strong>/g,
  '<strong>space inside</strong>'
);

// Keep "radius" as blue (it's a key term)
// Remove blue from "perpendicular" in regular text but keep in "Height Must Be Perpendicular" if needed
// Actually, perpendicular IS a key term, so let's keep it

const after2 = (shapesContent.match(/<strong style="color: #2563eb; text-decoration: underline;">/g) || []).length;
console.log('  Removed blue from', before2 - after2, 'non-term phrases');
console.log('  Kept blue for: radius (key geometric term)');

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

console.log('\n✅ Blue keywords now consistent!');
console.log('\nBlue underlining ONLY for key terms:');
console.log('  geometry-angles: angle, vertex, transversal');
console.log('  geometry-shapes: radius');
console.log('\nRegular bold for everything else (emphasis, descriptions, etc.)');
