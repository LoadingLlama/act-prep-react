/**
 * Tone Down Key Idea Boxes - Make them subtle and professional
 * Remove bold gradients, reduce visual weight, fix spacing
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function toneDownKeyIdeas() {
  console.log('🔧 Toning down Key Idea boxes...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Making Key Idea boxes more subtle...\n');

  // Replace all the gradient Key Idea boxes with subtle light blue boxes
  // Pattern: gradient blue box with 💡 icon

  // Rule 1 Key Idea
  const rule1OldPattern = /<div style="background: linear-gradient\(135deg, #3b82f6 0%, #2563eb 100%\); padding: 1\.2rem 1\.5rem; margin: 1\.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba\(59, 130, 246, 0\.25\);">\s*<div style="display: flex; align-items: center; gap: 0\.75rem; margin-bottom: 0\.75rem;">\s*<span style="font-size: 1\.5rem;">💡<\/span>\s*<p style="margin: 0; font-weight: 700; font-size: 1\.05rem; color: white;">Key Idea:<\/p>\s*<\/div>\s*<p style="margin: 0; font-size: 1rem; line-height: 1\.6; color: white; font-weight: 500;">Angles across from each other are <strong>always equal<\/strong>\. If one angle is 70°, the angle across from it is also 70°!<\/p>\s*<\/div>/;

  const rule1NewBox = `<div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 Key Idea:</p>
                <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">Angles across from each other are <strong>always equal</strong>. If one angle is 70°, the angle across from it is also 70°!</p>
            </div>`;

  content = content.replace(rule1OldPattern, rule1NewBox);
  console.log('  ✅ Toned down Rule 1 Key Idea\n');

  // Rule 2 Key Idea
  const rule2OldPattern = /<div style="background: linear-gradient\(135deg, #3b82f6 0%, #2563eb 100%\); padding: 1\.2rem 1\.5rem; margin: 1\.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba\(59, 130, 246, 0\.25\);">\s*<div style="display: flex; align-items: center; gap: 0\.75rem; margin-bottom: 0\.75rem;">\s*<span style="font-size: 1\.5rem;">💡<\/span>\s*<p style="margin: 0; font-weight: 700; font-size: 1\.05rem; color: white;">Key Idea:<\/p>\s*<\/div>\s*<p style="margin: 0; font-size: 1rem; line-height: 1\.6; color: white; font-weight: 500;">Angles next to each other on a straight line add up to <strong>180°<\/strong>\. If one angle is 55°, the adjacent angle is 180° − 55° = 125°!<\/p>\s*<\/div>/;

  const rule2NewBox = `<div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 Key Idea:</p>
                <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">Angles next to each other on a straight line add up to <strong>180°</strong>. If one angle is 55°, the adjacent angle is 180° − 55° = 125°!</p>
            </div>`;

  content = content.replace(rule2OldPattern, rule2NewBox);
  console.log('  ✅ Toned down Rule 2 Key Idea\n');

  // Summary Box
  const summaryOldPattern = /<div style="background: linear-gradient\(135deg, #10b981 0%, #059669 100%\); padding: 1\.2rem 1\.5rem; margin: 1\.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba\(16, 185, 129, 0\.25\);">\s*<div style="display: flex; align-items: center; gap: 0\.75rem; margin-bottom: 0\.75rem;">\s*<span style="font-size: 1\.5rem;">✓<\/span>\s*<p style="margin: 0; font-weight: 700; font-size: 1\.05rem; color: white;">Remember These Two Rules:<\/p>\s*<\/div>\s*<ul style="margin: 0; padding-left: 1\.5rem; color: white; font-size: 1rem; line-height: 1\.8; font-weight: 500;">\s*<li><strong>Vertical angles<\/strong> \(across from each other\) are equal<\/li>\s*<li><strong>Adjacent angles<\/strong> \(next to each other\) sum to 180°<\/li>\s*<\/ul>\s*<\/div>/;

  const summaryNewBox = `<div style="background: #f0fdf4; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #10b981;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #065f46;">✓ Remember These Two Rules:</p>
                <ul style="margin: 0; padding-left: 1.5rem; color: #064e3b; font-size: 0.9rem; line-height: 1.6;">
                    <li><strong>Vertical angles</strong> (across from each other) are equal</li>
                    <li><strong>Adjacent angles</strong> (next to each other) sum to 180°</li>
                </ul>
            </div>`;

  content = content.replace(summaryOldPattern, summaryNewBox);
  console.log('  ✅ Toned down Summary Box\n');

  // Parallel Lines Key Pattern Box
  const parallelOldPattern = /<div style="background: linear-gradient\(135deg, #3b82f6 0%, #2563eb 100%\); padding: 1\.2rem 1\.5rem; margin: 1\.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba\(59, 130, 246, 0\.25\);">\s*<div style="display: flex; align-items: center; gap: 0\.75rem; margin-bottom: 0\.75rem;">\s*<span style="font-size: 1\.5rem;">🔑<\/span>\s*<p style="margin: 0; font-weight: 700; font-size: 1\.05rem; color: white;">The Key Pattern:<\/p>\s*<\/div>\s*<ul style="margin: 0; padding-left: 1\.5rem; color: white; font-size: 1rem; line-height: 1\.8; font-weight: 500;">\s*<li><strong>Set 1 \(angles 1, 3, 5, 7\):<\/strong> Four angles are equal - all acute, forming vertical pairs<\/li>\s*<li><strong>Set 2 \(angles 2, 4, 6, 8\):<\/strong> Four angles are equal - all obtuse, forming vertical pairs<\/li>\s*<li><strong>Relationship:<\/strong> Any angle from Set 1 \+ any angle from Set 2 = 180°<\/li>\s*<\/ul>\s*<\/div>/;

  const parallelNewBox = `<div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">🔑 The Key Pattern:</p>
                <ul style="margin: 0; padding-left: 1.5rem; color: #1e3a8a; font-size: 0.9rem; line-height: 1.6;">
                    <li><strong>Set 1 (angles 1, 3, 5, 7):</strong> Four angles are equal - all acute, forming vertical pairs</li>
                    <li><strong>Set 2 (angles 2, 4, 6, 8):</strong> Four angles are equal - all obtuse, forming vertical pairs</li>
                    <li><strong>Relationship:</strong> Any angle from Set 1 + any angle from Set 2 = 180°</li>
                </ul>
            </div>`;

  content = content.replace(parallelOldPattern, parallelNewBox);
  console.log('  ✅ Toned down Parallel Lines Key Pattern\n');

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

  console.log('✅ All Key Idea boxes toned down!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Removed bold gradients → subtle light backgrounds');
  console.log('  ✅ Removed box shadows');
  console.log('  ✅ Changed white text → dark blue text');
  console.log('  ✅ Reduced font sizes: 1rem → 0.9rem');
  console.log('  ✅ Reduced padding: 1.2rem → 0.8rem');
  console.log('  ✅ Reduced margins: 1.5rem → 1rem');
  console.log('  ✅ Simpler left border accent');
  console.log('  ✅ More professional and subtle\n');

  return true;
}

async function main() {
  const success = await toneDownKeyIdeas();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Key Idea boxes are now subtle and professional!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
