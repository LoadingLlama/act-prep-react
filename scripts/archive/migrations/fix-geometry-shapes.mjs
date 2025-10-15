import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function simplifyMathContent(content) {
  let simplified = content;

  // 1. Remove gradient backgrounds completely
  simplified = simplified.replace(/background:\s*linear-gradient\([^)]+\)/g, 'background: #f8f9fa');

  // 2. Replace ALL colored backgrounds with simple light gray
  simplified = simplified.replace(/background:\s*#[0-9a-f]{6}/gi, 'background: #f8f9fa');

  // 3. Simplify all text colors to black
  simplified = simplified.replace(/color:\s*#[0-9a-f]{6}/gi, 'color: #000');
  simplified = simplified.replace(/color:\s*white/gi, 'color: #000');

  // 4. Remove emojis
  simplified = simplified.replace(/[🔑📋💡⚠️✓❌⏭]/g, '');

  // 5. Simplify borders
  simplified = simplified.replace(/border:\s*\d+px\s+solid\s+#[0-9a-f]{6}/gi, 'border: 1px solid #ddd');
  simplified = simplified.replace(/border-left:\s*\d+px\s+solid\s+#[0-9a-f]{6}/gi, 'border-left: 3px solid #ddd');

  // 6. Reduce padding
  simplified = simplified.replace(/padding:\s*2rem/g, 'padding: 1rem');
  simplified = simplified.replace(/padding:\s*2\.5rem/g, 'padding: 1rem');
  simplified = simplified.replace(/padding:\s*1\.5rem/g, 'padding: 0.75rem');

  // 7. Fix SVG malformed attributes
  simplified = simplified.replace(/\s+y1="/g, ' y="');
  simplified = simplified.replace(/\s+x1="/g, ' x="');

  // 8. Reduce stroke widths
  simplified = simplified.replace(/stroke-width="4"/g, 'stroke-width="2"');
  simplified = simplified.replace(/stroke-width="3"/g, 'stroke-width="2"');

  // 9. Simplify SVG colors
  simplified = simplified.replace(/stroke="#[0-9a-f]{6}"/gi, 'stroke="#333"');
  simplified = simplified.replace(/fill="#[0-9a-f]{6}"/gi, 'fill="#666"');

  // 10. Remove uppercase/letter-spacing
  simplified = simplified.replace(/text-transform:\s*uppercase;/g, '');
  simplified = simplified.replace(/letter-spacing:\s*[^;]+;/g, '');

  // 11. Simplify font sizes
  simplified = simplified.replace(/font-size:\s*2rem/g, 'font-size: 1.2rem');
  simplified = simplified.replace(/font-size:\s*1\.6rem/g, 'font-size: 1.1rem');
  simplified = simplified.replace(/font-size:\s*1\.4rem/g, 'font-size: 1.05rem');
  simplified = simplified.replace(/font-size:\s*1\.3rem/g, 'font-size: 1.05rem');

  return simplified;
}

async function fixFailedLessons() {
  const failedLessons = ['geometry-shapes', 'lines'];

  console.log('🔧 Fixing failed lessons...\n');

  for (const lessonKey of failedLessons) {
    const { data } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    if (!data) {
      console.log(`❌ ${lessonKey} - not found`);
      continue;
    }

    const simplified = simplifyMathContent(data.content);

    // Check if simplified content is valid
    if (!simplified || simplified.trim().length === 0) {
      console.log(`❌ ${lessonKey} - simplification resulted in empty content`);
      continue;
    }

    const { error } = await supabase
      .from('lessons')
      .update({ content: simplified })
      .eq('lesson_key', lessonKey);

    if (error) {
      console.log(`❌ ${lessonKey} - error: ${error.message}`);
      // Try with original content minus specific problematic parts
      let safeSimplifed = data.content;
      safeSimplifed = safeSimplifed.replace(/[🔑📋💡⚠️✓❌⏭]/g, '');
      safeSimplifed = safeSimplifed.replace(/font-size:\s*2rem/g, 'font-size: 1.2rem');
      safeSimplifed = safeSimplifed.replace(/color:\s*#[0-9a-f]{6}/gi, 'color: #000');

      const { error: retryError } = await supabase
        .from('lessons')
        .update({ content: safeSimplifed })
        .eq('lesson_key', lessonKey);

      if (retryError) {
        console.log(`❌ ${lessonKey} - retry failed: ${retryError.message}`);
      } else {
        console.log(`✓ ${lessonKey} - simplified (safe mode)`);
      }
    } else {
      console.log(`✓ ${lessonKey} - simplified`);
    }
  }

  console.log('\n✅ Complete!\n');
}

fixFailedLessons();
