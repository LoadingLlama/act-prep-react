/**
 * Add Key Idea Boxes to Rule 1 and Rule 2
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addKeyIdeaBoxes() {
  console.log('🔧 Adding Key Idea boxes to Rule 1 and Rule 2...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  // ADD KEY IDEA BOX TO RULE 1 (after the diagram)
  console.log('📝 Adding Key Idea box to Rule 1...\n');

  const rule1KeyIdea = `

            <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 1.2rem 1.5rem; margin: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">💡</span>
                    <p style="margin: 0; font-weight: 700; font-size: 1.05rem; color: white;">Key Idea:</p>
                </div>
                <p style="margin: 0; font-size: 1rem; line-height: 1.6; color: white; font-weight: 500;">Angles across from each other are <strong>always equal</strong>. If one angle is 70°, the angle across from it is also 70°!</p>
            </div>`;

  // Insert after Rule 1 SVG diagram
  const rule1SvgEnd = content.indexOf('</svg>', content.indexOf('Rule 1: Vertical Angles Are Equal')) + 6;
  if (rule1SvgEnd > 6) {
    const rule1InsertPoint = content.indexOf('</div>', rule1SvgEnd) + 6;
    content = content.substring(0, rule1InsertPoint) + rule1KeyIdea + content.substring(rule1InsertPoint);
    console.log('  ✅ Added Key Idea to Rule 1\n');
  }

  // ADD KEY IDEA BOX TO RULE 2 (after the diagram)
  console.log('📝 Adding Key Idea box to Rule 2...\n');

  const rule2KeyIdea = `

            <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 1.2rem 1.5rem; margin: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">💡</span>
                    <p style="margin: 0; font-weight: 700; font-size: 1.05rem; color: white;">Key Idea:</p>
                </div>
                <p style="margin: 0; font-size: 1rem; line-height: 1.6; color: white; font-weight: 500;">Angles next to each other on a straight line add up to <strong>180°</strong>. If one angle is 55°, the adjacent angle is 180° − 55° = 125°!</p>
            </div>`;

  // Insert after Rule 2 SVG diagram
  const rule2SvgEnd = content.indexOf('</svg>', content.indexOf('Rule 2: Adjacent Angles Sum to 180°')) + 6;
  if (rule2SvgEnd > 6) {
    const rule2InsertPoint = content.indexOf('</div>', rule2SvgEnd) + 6;
    content = content.substring(0, rule2InsertPoint) + rule2KeyIdea + content.substring(rule2InsertPoint);
    console.log('  ✅ Added Key Idea to Rule 2\n');
  }

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

  console.log('✅ Key Idea boxes added!\n');
  console.log('📊 Summary:');
  console.log('  ✅ Rule 1: Blue gradient box with 💡 icon');
  console.log('  ✅ Rule 2: Blue gradient box with 💡 icon');
  console.log('  ✅ White text, bold, impossible to miss\n');

  return true;
}

async function main() {
  const success = await addKeyIdeaBoxes();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ All rules now have prominent Key Idea boxes!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
