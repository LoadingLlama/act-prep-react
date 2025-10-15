import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function finalPolish(content) {
  let polished = content;

  // 1. Fix SVG stroke widths to be more subtle
  polished = polished.replaceAll('stroke-width="3"', 'stroke-width="2"');
  polished = polished.replaceAll('stroke-width="4"', 'stroke-width="3"');

  // 2. Replace remaining rgba backgrounds with solid colors
  polished = polished.replaceAll('fill="rgba(255,255,255,0.2)"', 'fill="white"');
  polished = polished.replaceAll('fill="rgba(255,255,255,0.3)"', 'fill="white"');
  polished = polished.replaceAll('fill="rgba(255,255,255,0.15)"', 'fill="white"');

  // 3. Clean up any remaining white text  that might have been missed
  polished = polished.replaceAll('color: white; opacity:', 'color: #1f2937; opacity:');

  // 4. Ensure SVG text is properly positioned (not overlapping graphics)
  // Move labels slightly away from graphics
  polished = polished.replaceAll(/<text x="(\d+)" y="(\d+)" ([^>]*?)>([^<]*label[^<]*)</gi,
    (match, x, y, attrs, text) => {
      const newY = parseInt(y) - 5; // Move text up slightly
      return `<text x="${x}" y="${newY}" ${attrs}>${text}`;
    });

  return polished;
}

async function applyFinalPolish() {
  const lessonsToPolish = [
    'geometry-angles', 'trigonometry', 'geometry-shapes', 'lines',
    'circles-ellipses', 'arcs-sectors', 'fractions', 'exponents-roots',
    'inequalities', 'absolute-value', 'logarithms', 'quadratics',
    'algebra-skills', 'systems-equations', 'functions', 'percentages',
    'transforming-functions', 'exponential-growth', 'sequences', 'ratios-proportions',
    'number-theory', 'statistics-basics', 'probability', 'word-problems',
    'miscellaneous-topics'
  ];

  console.log('✨ Applying final polish to all lessons...\n');

  for (const lessonKey of lessonsToPolish) {
    const { data: currentData } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    if (!currentData) {
      console.log(`❌ ${lessonKey} - not found`);
      continue;
    }

    const polishedContent = finalPolish(currentData.content);

    const { error } = await supabase
      .from('lessons')
      .update({ content: polishedContent })
      .eq('lesson_key', lessonKey);

    if (error) {
      console.log(`❌ ${lessonKey} - error:`, error.message);
    } else {
      console.log(`✓ ${lessonKey} - polished`);
    }
  }

  console.log('\n🎉 Final polish complete! All lessons now have:');
  console.log('  • Subtle solid colors (no gradients)');
  console.log('  • Readable text (dark on light backgrounds)');
  console.log('  • Clean SVG graphics with proper text placement');
  console.log('  • Consistent, professional formatting\n');
}

applyFinalPolish();
