/**
 * Fix Choice E - Missing span tags entirely
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixChoiceE() {
  console.log('🔧 Fixing Choice E...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Fixing E answer choices...\n');

  // Pattern: whitespace + E. + number + °</p>
  // Should be: <span ...>E. number°</span>

  const brokenEPattern = /(\s+)E\.\s+(\d+)°<\/p>/g;

  const fixedContent = content.replace(
    brokenEPattern,
    '$1<span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">E. $2°</span>'
  );

  const matches = [...content.matchAll(brokenEPattern)];
  console.log(`  ✅ Fixed ${matches.length} E answer choices\n`);

  if (matches.length > 0) {
    console.log('  What was fixed:');
    matches.forEach((m, i) => {
      console.log(`    ${i + 1}. "E. ${m[2]}°</p>" → "<span ...>E. ${m[2]}°</span>"`);
    });
    console.log('');
  }

  console.log('💾 Updating database...\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: fixedContent,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (error) {
    console.error('❌ Error:', error);
    return false;
  }

  console.log('✅ All E choices fixed!\n');

  return true;
}

async function main() {
  const success = await fixChoiceE();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ All answer choices should be perfect now!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
