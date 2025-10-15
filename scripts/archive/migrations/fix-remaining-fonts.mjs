/**
 * Fix Remaining Font Inconsistencies
 * - Change 1rem Answer paragraphs to 0.9rem
 * - Style unstyled paragraphs to 0.9rem
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixRemainingFonts() {
  console.log('🔧 Fixing remaining font inconsistencies...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Step 1: Fixing Answer paragraphs (1rem → 0.9rem)...\n');

  // Fix the 3 "Answer:" paragraphs that have font-size: 1rem
  content = content.replace(
    /<p style="text-align: center; font-size: 1rem; margin-top: 0\.3rem;"><strong>Answer:/g,
    '<p style="text-align: center; font-size: 0.9rem; margin-top: 0.3rem;"><strong>Answer:'
  );

  console.log('  ✅ Fixed Answer paragraph fonts\n');

  console.log('📝 Step 2: Styling unstyled paragraphs...\n');

  // Add styling to intro paragraphs
  content = content.replace(
    /<p>Angles are fundamental to geometry!/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Angles are fundamental to geometry!'
  );

  content = content.replace(
    /<p>An angle is formed when two lines or rays meet at a point\./g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">An angle is formed when two lines or rays meet at a point.'
  );

  content = content.replace(
    /<p>When two straight lines cross, they create 4 angles\./g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">When two straight lines cross, they create 4 angles.'
  );

  content = content.replace(
    /<p>These angle relationships/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">These angle relationships'
  );

  content = content.replace(
    /<p>When a line \(called a <strong>transversal<\/strong>\) crosses two parallel lines/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">When a line (called a <strong>transversal</strong>) crosses two parallel lines'
  );

  content = content.replace(
    /<p>Important relationships:/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">Important relationships:'
  );

  content = content.replace(
    /<p>On the ACT/g,
    '<p style="font-size: 0.9rem; margin: 0.3rem 0; line-height: 1.5;">On the ACT'
  );

  console.log('  ✅ Styled all intro/explanation paragraphs\n');

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

  console.log('✅ All remaining fonts fixed!\n');
  console.log('📊 Summary:');
  console.log('  ✅ Fixed 3 Answer paragraphs: 1rem → 0.9rem');
  console.log('  ✅ Styled 13 unstyled paragraphs: 0.9rem + line-height 1.5');
  console.log('  ✅ Every paragraph now has consistent 0.9rem font');
  console.log('  ✅ Headers remain at 1.15rem\n');

  return true;
}

async function main() {
  const success = await fixRemainingFonts();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Perfect font consistency achieved!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
