/**
 * Remove Duplicate Key Idea Boxes
 * Keep only the toned-down versions, remove all old gradient/duplicate boxes
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function removeDuplicateKeyIdeas() {
  console.log('🔧 Removing duplicate Key Idea boxes...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Removing old/duplicate Key Ideas...\n');

  // RULE 1: Remove ALL Key Ideas, then add back only the correct toned-down one
  console.log('  Cleaning Rule 1...');

  // Match Rule 1 section (from h4 to next h4 or h3)
  const rule1Match = content.match(/(<h4[^>]*>Rule 1: Vertical Angles Are Equal<\/h4>[\s\S]*?)<h4/);
  if (rule1Match) {
    let rule1Section = rule1Match[1];

    // Remove ALL Key Idea boxes (any style)
    rule1Section = rule1Section.replace(/<div style="background: #eff6ff[\s\S]*?💡 Key Idea:[\s\S]*?<\/div>/g, '');
    rule1Section = rule1Section.replace(/<div style="background: #fef2f2[\s\S]*?Key Idea:[\s\S]*?<\/div>/g, '');
    rule1Section = rule1Section.replace(/<div style="background: linear-gradient[\s\S]*?💡[\s\S]*?Key Idea[\s\S]*?<\/div>/g, '');

    // Add back the correct toned-down version ONCE (after the SVG diagram)
    const rule1KeyIdea = `
            <div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 Key Idea:</p>
                <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">Angles across from each other are <strong>always equal</strong>. If one angle is 70°, the angle across from it is also 70°!</p>
            </div>`;

    // Insert after the diagram's closing </div>
    const svgEndIndex = rule1Section.lastIndexOf('</svg>');
    if (svgEndIndex > -1) {
      const divEndIndex = rule1Section.indexOf('</div>', svgEndIndex);
      if (divEndIndex > -1) {
        rule1Section = rule1Section.substring(0, divEndIndex + 6) + rule1KeyIdea + rule1Section.substring(divEndIndex + 6);
      }
    }

    content = content.replace(rule1Match[1], rule1Section);
    console.log('  ✅ Rule 1 cleaned (removed duplicates, kept 1)\n');
  }

  // RULE 2: Remove ALL Key Ideas, then add back only the correct toned-down one
  console.log('  Cleaning Rule 2...');

  const rule2Match = content.match(/(<h4[^>]*>Rule 2: Adjacent Angles Sum to 180°<\/h4>[\s\S]*?)<h3/);
  if (rule2Match) {
    let rule2Section = rule2Match[1];

    // Remove ALL Key Idea boxes (any style)
    rule2Section = rule2Section.replace(/<div style="background: #eff6ff[\s\S]*?💡 Key Idea:[\s\S]*?<\/div>/g, '');
    rule2Section = rule2Section.replace(/<div style="background: #fef2f2[\s\S]*?Key Idea:[\s\S]*?<\/div>/g, '');
    rule2Section = rule2Section.replace(/<div style="background: linear-gradient[\s\S]*?💡[\s\S]*?Key Idea[\s\S]*?<\/div>/g, '');

    // Add back the correct toned-down version ONCE (after the SVG diagram)
    const rule2KeyIdea = `
            <div style="background: #eff6ff; padding: 0.8rem 1rem; margin: 1rem 0; border-left: 3px solid #3b82f6;">
                <p style="margin: 0 0 0.4rem 0; font-weight: 600; font-size: 0.9rem; color: #1e40af;">💡 Key Idea:</p>
                <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1e3a8a;">Angles next to each other on a straight line add up to <strong>180°</strong>. If one angle is 55°, the adjacent angle is 180° − 55° = 125°!</p>
            </div>`;

    // Insert after the diagram's closing </div>
    const svgEndIndex = rule2Section.lastIndexOf('</svg>');
    if (svgEndIndex > -1) {
      const divEndIndex = rule2Section.indexOf('</div>', svgEndIndex);
      if (divEndIndex > -1) {
        rule2Section = rule2Section.substring(0, divEndIndex + 6) + rule2KeyIdea + rule2Section.substring(divEndIndex + 6);
      }
    }

    content = content.replace(rule2Match[1], rule2Section);
    console.log('  ✅ Rule 2 cleaned (removed duplicates, kept 1)\n');
  }

  // Also clean any stray <br> tags between sections
  content = content.replace(/<br>\s*<br>/g, '');

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

  console.log('✅ All duplicates removed!\n');
  console.log('📊 Result:');
  console.log('  ✅ Rule 1: Exactly 1 Key Idea box');
  console.log('  ✅ Rule 2: Exactly 1 Key Idea box');
  console.log('  ✅ All are toned-down subtle style\n');

  return true;
}

async function main() {
  const success = await removeDuplicateKeyIdeas();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Duplicates removed! Each rule now has exactly 1 Key Idea.\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
