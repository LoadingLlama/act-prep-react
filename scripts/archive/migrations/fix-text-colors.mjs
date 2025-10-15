import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Fix text colors on light backgrounds
function fixTextColors(content) {
  let fixed = content;

  // Light backgrounds that need dark text
  const lightBackgrounds = ['#ede9fe', '#fce7f3', '#cffafe', '#fef3c7', '#f0f9ff', '#dcfce7', '#fee2e2'];

  for (const bgColor of lightBackgrounds) {
    // Pattern: background: COLOR; ... color: white;
    const pattern = new RegExp(
      `(background: ${bgColor.replace('#', '\\#')}[^}]*?)color: white;`,
      'g'
    );
    fixed = fixed.replace(pattern, '$1color: #1f2937;');

    // Also fix direct style attributes
    const pattern2 = new RegExp(
      `(style="[^"]*background: ${bgColor.replace('#', '\\#')}[^"]*?)color: white;`,
      'g'
    );
    fixed = fixed.replace(pattern2, '$1color: #1f2937;');
  }

  // Fix any remaining white text on light backgrounds in divs
  fixed = fixed.replace(
    /(background: #[ef][0-9a-f]{5}[^}]*?)color: white;/g,
    '$1color: #1f2937;'
  );

  // Update SVG stroke colors from white to dark on light backgrounds
  lightBackgrounds.forEach(bg => {
    const svgPattern = new RegExp(
      `(<div[^>]*background: ${bg.replace('#', '\\#')}[^>]*>[\\s\\S]*?<svg[\\s\\S]*?)stroke="white"`,
      'g'
    );
    fixed = fixed.replace(svgPattern, '$1stroke="#64748b"');
  });

  // Fix fill colors in SVGs within light background divs
  lightBackgrounds.forEach(bg => {
    const fillPattern = new RegExp(
      `(<div[^>]*background: ${bg.replace('#', '\\#')}[^>]*>[\\s\\S]*?<svg[\\s\\S]*?)fill="white"`,
      'g'
    );
    fixed = fixed.replace(fillPattern, '$1fill="#1f2937"');
  });

  return fixed;
}

async function fixAllTextColors() {
  const lessonsToFix = [
    'geometry-angles', 'trigonometry', 'geometry-shapes', 'lines',
    'circles-ellipses', 'arcs-sectors', 'fractions', 'exponents-roots',
    'inequalities', 'absolute-value', 'logarithms', 'quadratics',
    'algebra-skills', 'systems-equations', 'functions', 'percentages',
    'transforming-functions', 'exponential-growth', 'sequences', 'ratios-proportions',
    'number-theory', 'statistics-basics', 'probability', 'word-problems',
    'miscellaneous-topics'
  ];

  console.log('🎨 Fixing text colors for readability...\n');

  for (const lessonKey of lessonsToFix) {
    const { data: currentData } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    if (!currentData) {
      console.log(`❌ ${lessonKey} - not found`);
      continue;
    }

    const fixedContent = fixTextColors(currentData.content);

    const hadWhiteText = currentData.content.includes('color: white;');
    const nowHasWhiteText = fixedContent.includes('color: white;');

    const { error } = await supabase
      .from('lessons')
      .update({ content: fixedContent })
      .eq('lesson_key', lessonKey);

    if (error) {
      console.log(`❌ ${lessonKey} - error:`, error.message);
    } else {
      const fixed = hadWhiteText && !nowHasWhiteText;
      console.log(`✓ ${lessonKey}${fixed ? ' - text colors fixed' : ''}`);
    }
  }

  console.log('\n✨ All text colors fixed for readability!');
}

fixAllTextColors();
