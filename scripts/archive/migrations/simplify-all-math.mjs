import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function simplifyMathContent(content) {
  let simplified = content;

  // 1. Remove ALL color-coded boxes - replace with simple text
  simplified = simplified.replace(/<div style="background: #[a-f0-9]{6}; padding: [^"]+; border-radius: [^"]+; border-left: [^"]+" margin: [^"]+;">\s*<p style="[^"]*">[^<]*<\/p>\s*<div style="[^"]*">\s*([^<]+)\s*<\/div>\s*<\/div>/gi, '');

  // 2. Remove gradient backgrounds completely
  simplified = simplified.replace(/background: linear-gradient\([^)]+\);?/g, '');

  // 3. Replace colored background boxes with simple light gray
  simplified = simplified.replace(/background: #[ef][a-f0-9]{5};/g, 'background: #f8f9fa;');
  simplified = simplified.replace(/background: #[cd][a-f0-9]{5};/g, 'background: #f8f9fa;');

  // 4. Simplify all text colors to black
  simplified = simplified.replace(/color: #[0-9a-f]{6};/g, 'color: #000;');
  simplified = simplified.replace(/color: white;/g, 'color: #000;');

  // 5. Remove emojis from content
  simplified = simplified.replace(/[🔑📋💡⚠️✓❌]/g, '');

  // 6. Simplify borders - all 1px solid light gray
  simplified = simplified.replace(/border: \d+px solid #[0-9a-f]{6};/g, 'border: 1px solid #ddd;');
  simplified = simplified.replace(/border-left: \d+px solid #[0-9a-f]{6};/g, 'border-left: 3px solid #ddd;');

  // 7. Reduce padding to be less bulky
  simplified = simplified.replace(/padding: 2rem;/g, 'padding: 1rem;');
  simplified = simplified.replace(/padding: 2\.5rem;/g, 'padding: 1rem;');
  simplified = simplified.replace(/padding: 1\.5rem;/g, 'padding: 0.75rem;');

  // 8. Fix SVG issues
  // Fix malformed attributes
  simplified = simplified.replace(/y1="/g, 'y="');
  simplified = simplified.replace(/x1="/g, 'x="');

  // Reduce stroke widths to be subtle
  simplified = simplified.replace(/stroke-width="4"/g, 'stroke-width="2"');
  simplified = simplified.replace(/stroke-width="3"/g, 'stroke-width="2"');

  // Simplify SVG colors to basic black/gray
  simplified = simplified.replace(/stroke="#[0-9a-f]{6}"/g, 'stroke="#333"');
  simplified = simplified.replace(/fill="#[0-9a-f]{6}"/g, 'fill="#666"');

  // 9. Remove uppercase transforms
  simplified = simplified.replace(/text-transform: uppercase;/g, '');
  simplified = simplified.replace(/letter-spacing: [^;]+;/g, '');

  // 10. Simplify font sizes - make them smaller
  simplified = simplified.replace(/font-size: 2rem;/g, 'font-size: 1.2rem;');
  simplified = simplified.replace(/font-size: 1\.6rem;/g, 'font-size: 1.1rem;');
  simplified = simplified.replace(/font-size: 1\.4rem;/g, 'font-size: 1.05rem;');
  simplified = simplified.replace(/font-size: 1\.3rem;/g, 'font-size: 1.05rem;');

  return simplified;
}

async function simplifyAllMath() {
  const mathLessons = [
    'geometry-angles', 'trigonometry', 'geometry-shapes', 'lines',
    'circles-ellipses', 'arcs-sectors', 'fractions', 'exponents-roots',
    'inequalities', 'absolute-value', 'logarithms', 'quadratics',
    'algebra-skills', 'systems-equations', 'functions', 'percentages',
    'transforming-functions', 'exponential-growth', 'sequences', 'ratios-proportions',
    'number-theory', 'statistics-basics', 'probability', 'word-problems',
    'miscellaneous-topics'
  ];

  console.log('🔧 Simplifying all math lessons to plain text format...\n');
  console.log('Changes:');
  console.log('  • Removing all color-coded boxes');
  console.log('  • Converting to plain black text');
  console.log('  • Simplifying visuals');
  console.log('  • Reducing font sizes');
  console.log('  • Making format clean and minimal\n');

  let successCount = 0;

  for (const lessonKey of mathLessons) {
    const { data } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    if (!data) {
      console.log(`❌ ${lessonKey} - not found`);
      continue;
    }

    const simplifiedContent = simplifyMathContent(data.content);

    const { error } = await supabase
      .from('lessons')
      .update({ content: simplifiedContent })
      .eq('lesson_key', lessonKey);

    if (error) {
      console.log(`❌ ${lessonKey} - error:`, error.message);
    } else {
      console.log(`✓ ${lessonKey} - simplified`);
      successCount++;
    }
  }

  console.log(`\n✅ Complete! ${successCount}/25 lessons simplified\n`);
}

simplifyAllMath();
