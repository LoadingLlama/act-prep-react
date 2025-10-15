import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Fix patterns for all lessons
function applyVisualFixes(content) {
  let fixed = content;

  // 1. Replace gradients with solid subtle colors
  const gradientReplacements = {
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)': '#ede9fe',  // Purple gradient -> light purple
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)': '#fce7f3',  // Pink gradient -> light pink
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)': '#cffafe',  // Cyan gradient -> light cyan
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)': '#fef3c7',  // Yellow-pink -> light yellow
  };

  for (const [gradient, solidColor] of Object.entries(gradientReplacements)) {
    fixed = fixed.replaceAll(`background: ${gradient}`, `background: ${solidColor}`);
  }

  // 2. Fix border styles - make them subtle
  fixed = fixed.replaceAll('border: 2px solid', 'border: 1px solid');
  fixed = fixed.replaceAll('border: 3px solid', 'border: 1px solid');

  // 3. Fix malformed SVG attributes
  fixed = fixed.replaceAll(/y1="(\d+)"/g, 'y="$1"');  // Fix y1 -> y in rect elements
  fixed = fixed.replaceAll(/x1="(\d+)"/g, 'x="$1"');  // Fix x1 -> x in rect elements

  // 4. Update color scheme to be more subtle
  const colorReplacements = {
    'color: white;': 'color: #1f2937;',  // White text on gradients -> dark gray
  };

  for (const [oldColor, newColor] of Object.entries(colorReplacements)) {
    // Only replace in gradient contexts
    if (fixed.includes('linear-gradient')) {
      fixed = fixed.replaceAll(oldColor, newColor);
    }
  }

  // 5. Fix border-radius to be consistent
  fixed = fixed.replaceAll('border-radius: 12px', 'border-radius: 8px');

  // 6. Add subtle border colors to match backgrounds
  const borderColorMap = {
    '#ede9fe': '#c4b5fd',  // purple
    '#fce7f3': '#fbcfe8',  // pink
    '#cffafe': '#a5f3fc',  // cyan
    '#fef3c7': '#fde68a',  // yellow
    '#f0f9ff': '#bfdbfe',  // blue
    '#dcfce7': '#bbf7d0',  // green
    '#fee2e2': '#fecaca',  // red
  };

  for (const [bgColor, borderColor] of Object.entries(borderColorMap)) {
    const pattern = new RegExp(`background: ${bgColor.replace('#', '\\#')}; padding:`, 'g');
    fixed = fixed.replace(pattern, `background: ${bgColor}; border: 1px solid ${borderColor}; padding:`);
  }

  // 7. Fix SVG text positioning - move title text higher to avoid overlaps
  fixed = fixed.replaceAll(/<text x="(\d+)" y="40"/g, '<text x="$1" y="25"');
  fixed = fixed.replaceAll(/<text x="(\d+)" y="45"/g, '<text x="$1" y="30"');

  // 8. Replace rgba backgrounds on gradient boxes with solid colors
  fixed = fixed.replaceAll(/background: rgba\(255,255,255,0\.\d+\)/g, 'background: white');

  // 9. Update text colors to work with solid backgrounds
  const textColorFixes = {
    'fill="white"': 'fill="#1f2937"',  // Dark gray for readability on light backgrounds
  };

  for (const [oldText, newText] of Object.entries(textColorFixes)) {
    // Be selective - only in specific contexts
    fixed = fixed.replace(/(<svg[^>]*>[\s\S]*?)fill="white"/g, '$1fill="#1f2937"');
  }

  return fixed;
}

async function fixAllLessons() {
  const lessonsToFix = [
    'geometry-angles', 'trigonometry', 'geometry-shapes', 'lines',
    'circles-ellipses', 'arcs-sectors', 'fractions', 'exponents-roots',
    'inequalities', 'absolute-value', 'logarithms', 'quadratics',
    'algebra-skills', 'systems-equations', 'functions', 'percentages',
    'transforming-functions', 'exponential-growth', 'sequences', 'ratios-proportions',
    'number-theory', 'statistics-basics', 'probability', 'word-problems',
    'miscellaneous-topics'
  ];

  console.log('🔧 Applying visual fixes to all lessons...\n');

  for (const lessonKey of lessonsToFix) {
    // Get current content
    const { data: currentData } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    if (!currentData) {
      console.log(`❌ ${lessonKey} - not found`);
      continue;
    }

    // Apply fixes
    const fixedContent = applyVisualFixes(currentData.content);

    // Check what changed
    const hadGradients = currentData.content.includes('linear-gradient');
    const nowHasGradients = fixedContent.includes('linear-gradient');
    const hadMalformed = currentData.content.includes('y1="');
    const nowHasMalformed = fixedContent.includes('y1="');

    // Update
    const { error } = await supabase
      .from('lessons')
      .update({ content: fixedContent })
      .eq('lesson_key', lessonKey);

    if (error) {
      console.log(`❌ ${lessonKey} - error:`, error.message);
    } else {
      const fixes = [];
      if (hadGradients && !nowHasGradients) fixes.push('gradients removed');
      if (hadMalformed && !nowHasMalformed) fixes.push('SVG fixed');
      console.log(`✓ ${lessonKey} - ${fixes.length > 0 ? fixes.join(', ') : 'updated'}`);
    }
  }

  console.log('\n🎉 All visual fixes applied!');
}

fixAllLessons();
