import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixStructuralIssues() {
  console.log('🔧 Fixing structural completeness issues...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  // Fix 1: Add "Example" label to Geometry: Shapes & Triangles
  const geometryLesson = lessons.find(l => l.title === 'Geometry: Shapes & Triangles');
  if (geometryLesson) {
    console.log('1. Fixing Geometry: Shapes & Triangles - Adding Example heading...');

    let $ = cheerio.load(geometryLesson.content, { xmlMode: false, decodeEntities: false });

    // Find "Example Problem" h3 and change it to h4 "Example 1"
    $('h3').each(function() {
      if ($(this).text().trim() === 'Example Problem') {
        $(this).replaceWith('<h4 style="margin-top: 1.5rem;">Example 1</h4>');
      }
    });

    const updatedGeometry = $.html('.lesson-content');

    await supabase
      .from('lessons')
      .update({ content: updatedGeometry, updated_at: new Date().toISOString() })
      .eq('id', geometryLesson.id);

    console.log('   ✅ Fixed Geometry lesson\n');
  }

  // Fix 2: Add Key Takeaway to Trigonometry
  const trigLesson = lessons.find(l => l.title === 'Trigonometry');
  if (trigLesson) {
    console.log('2. Fixing Trigonometry - Adding Key Takeaway...');

    let $ = cheerio.load(trigLesson.content, { xmlMode: false, decodeEntities: false });

    // Find the last element before closing and add Key Takeaway
    const lastH3 = $('h3').last();

    const keyTakeaway = `
<h4 style="margin-top: 1.5rem;">Key Takeaway</h4>
<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">
Master SOH-CAH-TOA and you'll be able to solve any right triangle problem on the ACT. Always identify what you know (sides and angles) and what you need to find, then choose the correct ratio.
</p>`;

    lastH3.after(keyTakeaway);

    const updatedTrig = $.html('.lesson-content');

    await supabase
      .from('lessons')
      .update({ content: updatedTrig, updated_at: new Date().toISOString() })
      .eq('id', trigLesson.id);

    console.log('   ✅ Fixed Trigonometry lesson\n');
  }

  console.log('✅ All structural issues fixed!');
}

fixStructuralIssues();
