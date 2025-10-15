/**
 * Make Key Idea Boxes More Prominent
 * Add better visual styling so they're impossible to skip
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function makeKeyIdeasProminent() {
  console.log('🔧 Making Key Idea boxes more prominent...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Step 1: Find and enhance all Key Idea boxes...\n');

  // Find all Key Idea boxes (they have blue background #eff6ff)
  // Pattern: <div style="background: #eff6ff...">...<p>Key Idea:</p>...

  // RULE 1: Vertical Angles Key Idea
  const rule1KeyIdeaOld = content.match(/<div style="background: #eff6ff[^"]*">\s*<p[^>]*><strong>Key Idea:<\/strong><\/p>\s*<p[^>]*>Angles across from each other are always equal\.[^<]*<\/p>\s*<\/div>/s);

  if (rule1KeyIdeaOld) {
    const rule1KeyIdeaNew = `<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 1.2rem 1.5rem; margin: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">💡</span>
                    <p style="margin: 0; font-weight: 700; font-size: 1.05rem; color: white;">Key Idea:</p>
                </div>
                <p style="margin: 0; font-size: 1rem; line-height: 1.6; color: white; font-weight: 500;">Angles across from each other are <strong>always equal</strong>. If one angle is 70°, the angle across from it is also 70°!</p>
            </div>`;

    content = content.replace(rule1KeyIdeaOld[0], rule1KeyIdeaNew);
    console.log('  ✅ Enhanced Rule 1 Key Idea\n');
  }

  // RULE 2: Adjacent Angles Key Idea
  const rule2KeyIdeaOld = content.match(/<div style="background: #eff6ff[^"]*">\s*<p[^>]*><strong>Key Idea:<\/strong><\/p>\s*<p[^>]*>Angles next to each other on a straight line add up to 180°\.[^<]*<\/p>\s*<\/div>/s);

  if (rule2KeyIdeaOld) {
    const rule2KeyIdeaNew = `<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 1.2rem 1.5rem; margin: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">💡</span>
                    <p style="margin: 0; font-weight: 700; font-size: 1.05rem; color: white;">Key Idea:</p>
                </div>
                <p style="margin: 0; font-size: 1rem; line-height: 1.6; color: white; font-weight: 500;">Angles next to each other on a straight line add up to <strong>180°</strong>. If one angle is 55°, the adjacent angle is 180° − 55° = 125°!</p>
            </div>`;

    content = content.replace(rule2KeyIdeaOld[0], rule2KeyIdeaNew);
    console.log('  ✅ Enhanced Rule 2 Key Idea\n');
  }

  // SUMMARY BOX: "Remember These Two Rules"
  const summaryBoxOld = content.match(/<div style="background: #f0fdf4[^"]*">\s*<p[^>]*>✓ Remember These Two Rules:<\/p>\s*<ul[^>]*>[\s\S]*?<\/ul>\s*<\/div>/);

  if (summaryBoxOld) {
    const summaryBoxNew = `<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 1.2rem 1.5rem; margin: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">✓</span>
                    <p style="margin: 0; font-weight: 700; font-size: 1.05rem; color: white;">Remember These Two Rules:</p>
                </div>
                <ul style="margin: 0; padding-left: 1.5rem; color: white; font-size: 1rem; line-height: 1.8; font-weight: 500;">
                    <li><strong>Vertical angles</strong> (across from each other) are equal</li>
                    <li><strong>Adjacent angles</strong> (next to each other) sum to 180°</li>
                </ul>
            </div>`;

    content = content.replace(summaryBoxOld[0], summaryBoxNew);
    console.log('  ✅ Enhanced Summary Box\n');
  }

  // PARALLEL LINES KEY PATTERN BOX
  const parallelKeyOld = content.match(/<div style="background: #eff6ff; padding: 1\.5rem[^"]*">\s*<p[^>]*>The Key Pattern:<\/p>\s*<ul[^>]*>[\s\S]*?<\/ul>\s*<\/div>/);

  if (parallelKeyOld) {
    const parallelKeyNew = `<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 1.2rem 1.5rem; margin: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">🔑</span>
                    <p style="margin: 0; font-weight: 700; font-size: 1.05rem; color: white;">The Key Pattern:</p>
                </div>
                <ul style="margin: 0; padding-left: 1.5rem; color: white; font-size: 1rem; line-height: 1.8; font-weight: 500;">
                    <li><strong>Set 1 (angles 1, 3, 5, 7):</strong> Four angles are equal - all acute, forming vertical pairs</li>
                    <li><strong>Set 2 (angles 2, 4, 6, 8):</strong> Four angles are equal - all obtuse, forming vertical pairs</li>
                    <li><strong>Relationship:</strong> Any angle from Set 1 + any angle from Set 2 = 180°</li>
                </ul>
            </div>`;

    content = content.replace(parallelKeyOld[0], parallelKeyNew);
    console.log('  ✅ Enhanced Parallel Lines Key Pattern\n');
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

  console.log('✅ All Key Idea boxes now prominent!\n');
  console.log('📊 Enhancements:');
  console.log('  ✅ Gradient backgrounds (blue/green)');
  console.log('  ✅ Icons (💡, ✓, 🔑)');
  console.log('  ✅ White text on colored background');
  console.log('  ✅ Larger font size (1rem)');
  console.log('  ✅ Bold and eye-catching');
  console.log('  ✅ Box shadows for depth');
  console.log('  ✅ Impossible to skip!\n');

  return true;
}

async function main() {
  const success = await makeKeyIdeasProminent();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Key Idea boxes are now impossible to skip!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
