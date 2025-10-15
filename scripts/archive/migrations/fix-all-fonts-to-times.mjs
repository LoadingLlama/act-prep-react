/**
 * FIX ALL FONTS: Convert all SVG fonts to Times New Roman
 * This fixes geometry-angles using Arial and geometry-shapes missing fonts
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixLessonFonts(lessonKey) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Fixing fonts in: ${lessonKey}`);
  console.log('='.repeat(60));

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content, id')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log('❌ Lesson not found');
    return false;
  }

  let content = lesson.content;
  let changeCount = 0;

  console.log('Original content length:', content.length);

  // Fix 1: Replace Arial, sans-serif with Times New Roman, serif
  const arialsFixed = (content.match(/Arial, sans-serif/g) || []).length;
  if (arialsFixed > 0) {
    content = content.replace(/Arial, sans-serif/g, 'Times New Roman, serif');
    changeCount += arialsFixed;
    console.log(`  ✓ Fixed ${arialsFixed} Arial font references`);
  }

  // Fix 2: Add font-family to <text> elements that don't have it
  // Match <text ...> where there's no font-family attribute
  const textWithoutFont = /<text([^>]*?)(?!font-family)([^>]*?)>/g;

  let match;
  let textsFixed = 0;
  const textElements = content.match(/<text[^>]*>/g) || [];

  console.log(`  Found ${textElements.length} <text> elements total`);

  textElements.forEach(element => {
    if (!element.includes('font-family')) {
      textsFixed++;
    }
  });

  if (textsFixed > 0) {
    console.log(`  ⚠️  ${textsFixed} <text> elements missing font-family`);

    // Add font-family to text elements without it
    content = content.replace(/<text([^>]*?)>/g, (match, attrs) => {
      if (attrs.includes('font-family')) {
        return match; // Already has font
      }
      // Add font-family attribute
      return `<text${attrs} font-family="Times New Roman, serif">`;
    });

    changeCount += textsFixed;
    console.log(`  ✓ Added Times New Roman to ${textsFixed} <text> elements`);
  }

  // Fix 3: Replace any other common fonts
  const replacefonts = [
    { from: /Helvetica/g, name: 'Helvetica' },
    { from: /Verdana/g, name: 'Verdana' },
    { from: /sans-serif(?!Times)/g, name: 'sans-serif (standalone)' }
  ];

  replacefonts.forEach(({ from, name }) => {
    const matches = (content.match(from) || []).length;
    if (matches > 0) {
      content = content.replace(from, 'Times New Roman, serif');
      changeCount += matches;
      console.log(`  ✓ Replaced ${matches} ${name} references`);
    }
  });

  if (changeCount === 0) {
    console.log('  ℹ️  No font changes needed');
    return true;
  }

  console.log(`\n  Total changes: ${changeCount}`);
  console.log('  New content length:', content.length);

  // Update database
  const { error } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', lessonKey);

  if (error) {
    console.error('  ❌ Error updating:', error.message);
    return false;
  }

  console.log('  ✅ Successfully updated!');
  return true;
}

async function run() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     FIX ALL FONTS → Times New Roman, serif              ║');
  console.log('╚══════════════════════════════════════════════════════════╝');

  const lessons = [
    'geometry-angles',
    'geometry-shapes',
    'lines',
    'arcs-sectors',
    'circles-ellipses'
  ];

  let successCount = 0;

  for (const lessonKey of lessons) {
    const success = await fixLessonFonts(lessonKey);
    if (success) successCount++;
  }

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                    SUMMARY                               ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(`\n✅ Successfully fixed ${successCount}/${lessons.length} lessons`);
  console.log('\nAll SVG text now uses Times New Roman, serif (ACT-authentic style)');
}

run().catch(console.error);
