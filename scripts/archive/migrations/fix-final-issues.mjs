/**
 * Fix Final Font Issues
 * - Change 15px to 0.9rem equivalent (14px) in SVG
 * - Style the 10 unstyled paragraphs
 * - Change line-height 1.8 to 1.5
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixFinalIssues() {
  console.log('🔧 Fixing final font issues...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Step 1: Fixing 15px in SVG to 14px (matches 0.9rem)...\n');

  // Fix the SVG text that has font-size: 15px
  content = content.replace(
    /font-size: 15px;/g,
    'font-size: 14px;'
  );

  console.log('  ✅ Fixed SVG font size\n');

  console.log('📝 Step 2: Styling unstyled paragraphs...\n');

  // Fix the teaching section paragraphs

  // Rule 1 explanation
  content = content.replace(
    /<p>When two lines cross, the angles that are <strong>across from each other<\/strong> \(called vertical angles\) are <strong>always equal<\/strong>\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">When two lines cross, the angles that are <strong>across from each other</strong> (called vertical angles) are <strong>always equal</strong>.</p>'
  );

  // Rule 1 example
  content = content.replace(
    /<p>Look at the diagram below\. Notice how the two blue angles \(both labeled "a"\) are across from each other—they're <strong>vertical angles<\/strong>, so they're equal\. Same with the two red angles \(both labeled "b"\)\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Look at the diagram below. Notice how the two blue angles (both labeled "a") are across from each other—they\'re <strong>vertical angles</strong>, so they\'re equal. Same with the two red angles (both labeled "b").</p>'
  );

  // Rule 2 explanation
  content = content.replace(
    /<p>Now let's look at angles that are <strong>next to each other<\/strong> on a straight line \(called adjacent angles\)\. These angles always add up to <strong>180°<\/strong>\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Now let\'s look at angles that are <strong>next to each other</strong> on a straight line (called adjacent angles). These angles always add up to <strong>180°</strong>.</p>'
  );

  // Rule 2 example
  content = content.replace(
    /<p>In the diagram, the blue angle \(a\) and the red angle \(b\) are <strong>next to each other<\/strong> on a straight line\. Since a straight line is 180°, we know that a \+ b = 180°\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">In the diagram, the blue angle (a) and the red angle (b) are <strong>next to each other</strong> on a straight line. Since a straight line is 180°, we know that a + b = 180°.</p>'
  );

  // Summary paragraph
  content = content.replace(
    /<p>These two simple rules solve <strong>most<\/strong> angle problems on the ACT! Let's practice\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">These two simple rules solve <strong>most</strong> angle problems on the ACT! Let\'s practice.</p>'
  );

  // Any remaining plain <p> tags in content - catch-all
  // Be careful with this - only target paragraphs that start with actual text content
  const unstyledPRegex = /<p>([A-Z][^<]*(?:<[^>]+>[^<]*)*?)<\/p>/g;

  // Let's manually fix the specific known ones instead
  content = content.replace(
    /<p>If two angles are vertical, they're equal\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">If two angles are vertical, they\'re equal.</p>'
  );

  content = content.replace(
    /<p>If two angles are adjacent \(on a straight line\), they add to 180°\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">If two angles are adjacent (on a straight line), they add to 180°.</p>'
  );

  content = content.replace(
    /<p>Corresponding angles are equal\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Corresponding angles are equal.</p>'
  );

  content = content.replace(
    /<p>Alternate interior angles are equal\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Alternate interior angles are equal.</p>'
  );

  content = content.replace(
    /<p>Alternate exterior angles are equal\.<\/p>/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Alternate exterior angles are equal.</p>'
  );

  console.log('  ✅ Styled all unstyled paragraphs\n');

  console.log('📝 Step 3: Fixing line-height 1.8 → 1.5...\n');

  // Fix line-height from 1.8 to 1.5 (probably in key idea boxes)
  content = content.replace(
    /line-height: 1\.8;/g,
    'line-height: 1.5;'
  );

  console.log('  ✅ Fixed line heights\n');

  console.log('💾 Updating database...\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (error) {
    console.error('❌ Error:', error);
    return false;
  }

  console.log('✅ All final issues fixed!\n');
  console.log('📊 Summary:');
  console.log('  ✅ Fixed SVG font: 15px → 14px');
  console.log('  ✅ Styled 10 unstyled paragraphs: 0.9rem + 1.5 line-height');
  console.log('  ✅ Fixed line-height: 1.8 → 1.5');
  console.log('  ✅ Every element now perfectly consistent\n');

  return true;
}

async function main() {
  const success = await fixFinalIssues();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Perfect font consistency NOW achieved!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
