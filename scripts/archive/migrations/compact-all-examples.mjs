/**
 * Make ALL Examples More Compact
 * - Consistent smaller fonts
 * - Reduced padding and margins
 * - Tighter spacing
 * - Less vertical space
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function compactExamples() {
  console.log('🔧 Making all examples more compact...\n');

  const { data: lesson, error: fetchError } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (fetchError) {
    console.error('❌ Error fetching lesson:', fetchError);
    return false;
  }

  let content = lesson.content;

  // Apply consistent compacting across all examples
  const replacements = [
    // Reduce solution box font sizes and padding
    {
      from: 'background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: center; font-size: 1.15rem; line-height: 2.5;',
      to: 'background: #f8f9fa; padding: 0.9rem; border-radius: 6px; margin: 0.75rem 0; text-align: center; font-size: 0.95rem; line-height: 1.8;'
    },
    // Reduce margin-bottom in solution steps
    {
      from: 'margin-bottom: 0.8rem;',
      to: 'margin-bottom: 0.5rem;'
    },
    // Reduce answer text size
    {
      from: 'text-align: center; font-size: 1.1rem; margin-top: 1.5rem;',
      to: 'text-align: center; font-size: 1rem; margin-top: 0.9rem;'
    },
    // Reduce h4 example headers spacing
    {
      from: '<h4>Example 1</h4>',
      to: '<h4 style="margin-top: 1.2rem; margin-bottom: 0.6rem;">Example 1</h4>'
    },
    {
      from: '<h4>Example 2</h4>',
      to: '<h4 style="margin-top: 1.2rem; margin-bottom: 0.6rem;">Example 2</h4>'
    },
    {
      from: '<h4>Example 3</h4>',
      to: '<h4 style="margin-top: 1.2rem; margin-bottom: 0.6rem;">Example 3</h4>'
    },
    // Reduce paragraph spacing in examples
    {
      from: '<p><strong>Problem:</strong></p>',
      to: '<p style="margin: 0.4rem 0;"><strong>Problem:</strong></p>'
    },
    {
      from: '<p><strong>Solution:</strong></p>',
      to: '<p style="margin: 0.6rem 0 0.4rem 0;"><strong>Solution:</strong></p>'
    },
    {
      from: '<p><strong>Answer:</strong>',
      to: '<p style="margin: 0.5rem 0;"><strong>Answer:</strong>'
    },
    // Make option lists more compact
    {
      from: '<p>A. ',
      to: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">A. '
    },
    {
      from: '<p>B. ',
      to: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">B. '
    },
    {
      from: '<p>C. ',
      to: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">C. '
    },
    {
      from: '<p>D. ',
      to: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">D. '
    },
    {
      from: '<p>E. ',
      to: '<p style="margin: 0.2rem 0; font-size: 0.95rem;">E. '
    },
    // Compact key idea boxes
    {
      from: 'background: #eff6ff; padding: 1.2rem; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 1.5rem 0;',
      to: 'background: #eff6ff; padding: 0.8rem 1rem; border-radius: 6px; border-left: 3px solid #3b82f6; margin: 1rem 0;'
    },
    {
      from: 'background: #fef2f2; padding: 1.2rem; border-radius: 8px; border-left: 4px solid #ef4444; margin: 1.5rem 0;',
      to: 'background: #fef2f2; padding: 0.8rem 1rem; border-radius: 6px; border-left: 3px solid #ef4444; margin: 1rem 0;'
    },
    {
      from: 'background: #f0fdf4; padding: 1.2rem; border-radius: 8px; border-left: 4px solid #10b981; margin: 1.5rem 0;',
      to: 'background: #f0fdf4; padding: 0.8rem 1rem; border-radius: 6px; border-left: 3px solid #10b981; margin: 1rem 0;'
    },
    // Reduce key idea font sizes
    {
      from: 'font-weight: 600; color: #1e3a8a; font-size: 1.05rem;',
      to: 'font-weight: 600; color: #1e3a8a; font-size: 0.95rem;'
    },
    {
      from: 'font-weight: 600; color: #7f1d1d; font-size: 1.05rem;',
      to: 'font-weight: 600; color: #7f1d1d; font-size: 0.95rem;'
    },
    {
      from: 'font-weight: 600; color: #064e3b; font-size: 1.05rem;',
      to: 'font-weight: 600; color: #064e3b; font-size: 0.95rem;'
    },
    // Reduce spacing after <br><br>
    {
      from: '<br><br>',
      to: '<br>'
    }
  ];

  // Apply all replacements
  for (const {from, to} of replacements) {
    content = content.split(from).join(to);
  }

  // Update database
  const { error: updateError } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (updateError) {
    console.error('❌ Error updating lesson:', updateError);
    return false;
  }

  console.log('✅ All examples compacted successfully!\n');
  console.log('📊 Changes applied:');
  console.log('  ✅ Reduced font sizes (1.15rem → 0.95rem)');
  console.log('  ✅ Reduced padding (1.5rem → 0.9rem)');
  console.log('  ✅ Reduced margins throughout');
  console.log('  ✅ Tighter line-height (2.5 → 1.8)');
  console.log('  ✅ Compact option lists');
  console.log('  ✅ Smaller key idea boxes');
  console.log('  ✅ Consistent spacing');
  console.log('  ✅ ~30-40% less vertical space\n');

  return true;
}

async function main() {
  console.log('🚀 Compacting all examples...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const success = await compactExamples();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Examples are now compact! Much less screen space.\n');
  } else {
    console.log('\n❌ Error occurred. Check logs above.\n');
  }
}

main();
