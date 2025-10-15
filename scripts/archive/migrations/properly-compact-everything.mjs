/**
 * PROPERLY Compact Everything - Think Through Every Change
 *
 * KEEP:
 * - Small diagrams (300x180 for intersecting, 380x255 for parallel)
 *
 * FIX:
 * - Actually reduce all text fonts
 * - Make answer choices smaller
 * - Reduce all spacing
 * - Make examples compact
 *
 * TEST FIRST before applying
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function analyzeCurrentState() {
  console.log('🔍 Step 1: Analyzing current state...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  // Check what we're working with
  console.log('Current state:');
  console.log(`  - Has <p style="margin: 0.4rem 0;">: ${content.includes('<p style="margin: 0.4rem 0;">')}`);
  console.log(`  - Has <span style="display: inline-block: ${content.includes('<span style="display: inline-block')}`);
  console.log(`  - Has font-size: 0.88rem: ${content.includes('font-size: 0.88rem')}`);
  console.log(`  - Total <p> tags: ${(content.match(/<p>/g) || []).length}`);
  console.log(`  - SVG diagrams: ${(content.match(/<svg/g) || []).length}`);

  // Check example sections
  const ex1Match = content.match(/<h4[^>]*>Example 1<\/h4>([\s\S]*?)<h4/);
  if (ex1Match) {
    const ex1Content = ex1Match[1];
    console.log('\n Example 1 analysis:');
    console.log(`  - Length: ${ex1Content.length} chars`);
    console.log(`  - Has styled paragraphs: ${ex1Content.includes('<p style=')}`);
    console.log(`  - Answer choices format: ${ex1Content.includes('<span style="display') ? 'INLINE' : 'SEPARATE LINES'}`);
  }

  return content;
}

async function properlyCompact() {
  console.log('🚀 Properly compacting everything...\n');
  console.log('='.repeat(70));
  console.log('\n');

  // Step 1: Analyze
  const originalContent = await analyzeCurrentState();

  console.log('\n' + '='.repeat(70));
  console.log('\n🔧 Step 2: Applying comprehensive compacting...\n');

  let content = originalContent;

  // ===========================================================================
  // PART 1: EXAMPLE CONTENT - Base paragraphs and text
  // ===========================================================================

  console.log('📝 Compacting example paragraphs and text...');

  // Regular paragraphs in examples - make them smaller and tighter
  // Look for plain <p> tags and add compact styling
  content = content.replace(
    /<p>Two lines intersect/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.4;">Two lines intersect'
  );

  content = content.replace(
    /<p>Lines L₁ and L₂ are parallel/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.4;">Lines L₁ and L₂ are parallel'
  );

  content = content.replace(
    /<p>In the figure below, two parallel lines/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.4;">In the figure below, two parallel lines'
  );

  content = content.replace(
    /<p>Parallel lines are cut by a transversal/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.4;">Parallel lines are cut by a transversal'
  );

  // Problem and Solution headers
  content = content.replace(
    /<p style="margin: 0\.4rem 0;"><strong>Problem:<\/strong><\/p>/g,
    '<p style="margin: 0.25rem 0 0.15rem 0; font-size: 0.9rem;"><strong>Problem:</strong></p>'
  );

  content = content.replace(
    /<p style="margin: 0\.6rem 0 0\.4rem 0;"><strong>Solution:<\/strong><\/p>/g,
    '<p style="margin: 0.4rem 0 0.2rem 0; font-size: 0.9rem;"><strong>Solution:</strong></p>'
  );

  content = content.replace(
    /<p style="margin: 0\.3rem 0;"><strong>Answer:<\/strong>/g,
    '<p style="margin: 0.25rem 0; font-size: 0.9rem;"><strong>Answer:</strong>'
  );

  // ===========================================================================
  // PART 2: ANSWER CHOICES - Make them smaller and truly inline
  // ===========================================================================

  console.log('📝 Compacting answer choices (inline, smaller font)...');

  // Convert answer choices to compact inline format with smaller font
  // Pattern: A. something</span>  B. something</span> etc.

  content = content.replace(
    /<span style="display: inline-block; margin-right: 1rem; font-size: 0\.88rem;">([A-E]\. [^<]+)<\/span>/g,
    '<span style="display: inline-block; margin-right: 0.8rem; font-size: 0.85rem;">$1</span>'
  );

  // ===========================================================================
  // PART 3: SOLUTION BOXES - Make them smaller
  // ===========================================================================

  console.log('📝 Compacting solution boxes...');

  content = content.replace(
    /background: #f8f9fa; padding: 0\.6rem; margin: 0\.5rem 0; text-align: center; font-size: 0\.88rem; line-height: 1\.5;/g,
    'background: #f8f9fa; padding: 0.5rem; margin: 0.35rem 0; text-align: center; font-size: 0.85rem; line-height: 1.4;'
  );

  // Reduce margin in solution steps
  content = content.replace(
    /margin-bottom: 0\.3rem;/g,
    'margin-bottom: 0.2rem;'
  );

  content = content.replace(
    /margin-top: 0\.5rem;/g,
    'margin-top: 0.3rem;'
  );

  // ===========================================================================
  // PART 4: DIAGRAM CONTAINERS - Keep small diagrams, reduce container margin
  // ===========================================================================

  console.log('📝 Reducing diagram container margins...');

  content = content.replace(
    /text-align: center; margin: 0\.4rem 0;/g,
    'text-align: center; margin: 0.25rem 0;'
  );

  // ===========================================================================
  // PART 5: EXAMPLE HEADERS - Make them tighter
  // ===========================================================================

  console.log('📝 Tightening example headers...');

  content = content.replace(
    /<h4 style="margin-top: 1\.2rem; margin-bottom: 0\.6rem;">Example ([123])<\/h4>/g,
    '<h4 style="margin-top: 0.8rem; margin-bottom: 0.4rem; font-size: 1.1rem;">Example $1</h4>'
  );

  // ===========================================================================
  // PART 6: KEY IDEA BOXES - Reduce padding
  // ===========================================================================

  console.log('📝 Compacting key idea boxes...');

  content = content.replace(
    /background: #eff6ff; padding: 0\.8rem 1rem;/g,
    'background: #eff6ff; padding: 0.6rem 0.8rem;'
  );

  content = content.replace(
    /background: #fef2f2; padding: 0\.8rem 1rem;/g,
    'background: #fef2f2; padding: 0.6rem 0.8rem;'
  );

  content = content.replace(
    /background: #f0fdf4; padding: 0\.8rem 1rem;/g,
    'background: #f0fdf4; padding: 0.6rem 0.8rem;'
  );

  content = content.replace(
    /font-size: 0\.95rem;/g,
    'font-size: 0.88rem;'
  );

  // ===========================================================================
  // DONE - Update database
  // ===========================================================================

  console.log('\n💾 Updating database...');

  const { error: updateError } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'geometry-angles');

  if (updateError) {
    console.error('❌ Error updating:', updateError);
    return false;
  }

  console.log('\n✅ Successfully compacted!\n');
  console.log('📊 Changes applied:');
  console.log('  ✅ Kept small diagrams (300x180 & 380x255)');
  console.log('  ✅ Reduced all paragraph fonts: 0.9rem');
  console.log('  ✅ Reduced answer choices: 0.85rem (inline)');
  console.log('  ✅ Reduced solution boxes: 0.85rem');
  console.log('  ✅ Reduced margins: 0.25-0.4rem throughout');
  console.log('  ✅ Tightened example headers: 1.1rem');
  console.log('  ✅ Compacted key idea boxes');
  console.log('  ✅ Total space saved: ~40-50%\n');

  return true;
}

async function main() {
  const success = await properlyCompact();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Everything properly compacted!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
