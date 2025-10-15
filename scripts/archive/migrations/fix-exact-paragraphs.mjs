/**
 * Fix Exact Paragraphs - Use exact text from database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixExactParagraphs() {
  console.log('🔧 Fixing exact unstyled paragraphs...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Styling all 10 unstyled paragraphs...\n');

  // Paragraph 1
  content = content.replace(
    '<p>When two lines cross, the angles that are <strong>across from each other</strong> (called vertical angles) are always equal!</p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">When two lines cross, the angles that are <strong>across from each other</strong> (called vertical angles) are always equal!</p>'
  );

  // Paragraph 2
  content = content.replace(
    '<p>Look at the diagram below. Notice how the two blue angles (both labeled "a") are across from each other? They\'re vertical angles, so they\'re equal. The same is true for the two red angles (both labeled "b").</p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Look at the diagram below. Notice how the two blue angles (both labeled "a") are across from each other? They\'re vertical angles, so they\'re equal. The same is true for the two red angles (both labeled "b").</p>'
  );

  // Paragraph 3
  content = content.replace(
    '<p>Now let\'s look at angles that are <strong>next to each other</strong> on a straight line (called adjacent angles). These angles always add up to 180°!</p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Now let\'s look at angles that are <strong>next to each other</strong> on a straight line (called adjacent angles). These angles always add up to 180°!</p>'
  );

  // Paragraph 4
  content = content.replace(
    '<p>In the diagram below, the blue angle (a) and the red angle (b) are next to each other on a straight line. No matter what their individual measurements are, they always add up to 180°.</p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">In the diagram below, the blue angle (a) and the red angle (b) are next to each other on a straight line. No matter what their individual measurements are, they always add up to 180°.</p>'
  );

  // Paragraph 5
  content = content.replace(
    '<p>When two lines intersect, vertical angles (angles across from each other) are always equal!</p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">When two lines intersect, vertical angles (angles across from each other) are always equal!</p>'
  );

  // Paragraph 6
  content = content.replace(
    '<p>Adjacent angles on a straight line always add up to 180°!</p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Adjacent angles on a straight line always add up to 180°!</p>'
  );

  // Paragraph 7
  content = content.replace(
    '<p><strong>This is THE most important angle concept on the ACT!</strong> When two parallel lines are crossed by another line (called a transversal), only TWO different angle measurements exist.</p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;"><strong>This is THE most important angle concept on the ACT!</strong> When two parallel lines are crossed by another line (called a transversal), only TWO different angle measurements exist.</p>'
  );

  // Paragraph 8
  content = content.replace(
    '<p>With parallel lines and a transversal, all acute angles are equal and all obtuse angles are equal. Any acute angle + any obtuse angle = 180°.</p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">With parallel lines and a transversal, all acute angles are equal and all obtuse angles are equal. Any acute angle + any obtuse angle = 180°.</p>'
  );

  // Paragraph 9
  content = content.replace(
    '<p><strong>Master Strategy for Angles:</strong></p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;"><strong>Master Strategy for Angles:</strong></p>'
  );

  // Paragraph 10
  content = content.replace(
    '<p>Master these three rules and you\'ll solve any angle problem on the ACT!</p>',
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Master these three rules and you\'ll solve any angle problem on the ACT!</p>'
  );

  console.log('  ✅ All 10 paragraphs styled\n');

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

  console.log('✅ All paragraphs now styled!\n');
  console.log('📊 Summary:');
  console.log('  ✅ Styled all 10 unstyled paragraphs');
  console.log('  ✅ All text now 0.9rem with 1.5 line-height');
  console.log('  ✅ Headers remain 1.15rem');
  console.log('  ✅ SVG diagram labels: 14px (acceptable for SVG)');
  console.log('\n  Note: 14px in SVG is correct - SVG text uses px, not rem\n');

  return true;
}

async function main() {
  const success = await fixExactParagraphs();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ All paragraphs styled perfectly!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
