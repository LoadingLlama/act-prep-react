/**
 * FIX: Add viewBox to all geometry-shapes SVG diagrams
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixGeometryShapesSVGs() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║    FIX: Adding viewBox to geometry-shapes SVGs          ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Fetch current content
  const { data: lesson, error: fetchError } = await supabase
    .from('lessons')
    .select('id, content')
    .eq('lesson_key', 'geometry-shapes')
    .single();

  if (fetchError || !lesson) {
    console.error('❌ Error fetching lesson:', fetchError);
    return false;
  }

  console.log('✓ Fetched lesson content');

  let content = lesson.content;
  const svgsBefore = content.match(/<svg[^>]*>/g) || [];
  console.log(`  Found ${svgsBefore.length} SVG opening tags\n`);

  // Fix each SVG by adding viewBox if it has width/height but no viewBox
  let fixCount = 0;

  // Strategy: Find SVGs with width="X" height="Y" but no viewBox
  content = content.replace(/<svg([^>]*)>/g, (match, attrs) => {
    // Check if already has viewBox
    if (attrs.includes('viewBox')) {
      return match; // Already has viewBox, skip
    }

    // Extract width and height
    const widthMatch = attrs.match(/width="(\d+)"/);
    const heightMatch = attrs.match(/height="(\d+)"/);

    if (widthMatch && heightMatch) {
      const width = widthMatch[1];
      const height = heightMatch[1];

      fixCount++;
      console.log(`  ✓ Adding viewBox="0 0 ${width} ${height}" to SVG #${fixCount}`);

      // Add viewBox attribute
      return `<svg${attrs} viewBox="0 0 ${width} ${height}">`;
    }

    return match;
  });

  console.log(`\n✓ Fixed ${fixCount} SVGs\n`);

  // Verify the fixes
  const svgsAfter = content.match(/<svg[^>]*viewBox[^>]*>/g) || [];
  console.log(`✓ Verification: ${svgsAfter.length} SVGs now have viewBox\n`);

  // Update database
  const { error: updateError } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'geometry-shapes');

  if (updateError) {
    console.error('❌ Error updating lesson:', updateError);
    return false;
  }

  console.log('✅ Successfully updated geometry-shapes lesson!');
  console.log(`   Content length: ${content.length} characters\n`);

  return true;
}

fixGeometryShapesSVGs().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
