import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixRemainingGradients() {
  const lessonsToCheck = [
    'geometry-angles', 'trigonometry', 'geometry-shapes', 'lines',
    'circles-ellipses', 'arcs-sectors', 'fractions', 'exponents-roots',
    'inequalities', 'absolute-value', 'logarithms', 'quadratics',
    'algebra-skills', 'systems-equations', 'functions', 'percentages',
    'transforming-functions', 'exponential-growth', 'sequences', 'ratios-proportions',
    'number-theory', 'statistics-basics', 'probability', 'word-problems',
    'miscellaneous-topics'
  ];

  console.log('🔍 Checking for remaining gradients...\n');

  for (const lessonKey of lessonsToCheck) {
    const { data } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    let content = data.content;
    let updated = false;

    // Replace ANY remaining gradient with appropriate solid color
    if (content.includes('linear-gradient')) {
      const gradientMatches = content.match(/linear-gradient\([^)]+\)/g);

      if (gradientMatches) {
        gradientMatches.forEach(gradient => {
          // Determine replacement color based on gradient colors
          let replacement;

          if (gradient.includes('#0f172a') || gradient.includes('#1e40af')) {
            // Dark gradient -> dark solid
            replacement = '#1e3a8a';
          } else if (gradient.includes('#667eea') || gradient.includes('#764ba2')) {
            // Purple gradient -> light purple
            replacement = '#ede9fe';
          } else if (gradient.includes('#f093fb') || gradient.includes('#f5576c')) {
            // Pink gradient -> light pink
            replacement = '#fce7f3';
          } else if (gradient.includes('#4facfe') || gradient.includes('#00f2fe')) {
            // Cyan gradient -> light cyan
            replacement = '#cffafe';
          } else if (gradient.includes('#fa709a') || gradient.includes('#fee140')) {
            // Yellow-pink -> light yellow
            replacement = '#fef3c7';
          } else {
            // Default to light blue
            replacement = '#f0f9ff';
          }

          content = content.replaceAll(gradient, replacement);
          updated = true;
        });

        // If we used a dark color (#1e3a8a), text should be white
        // If we used a light color, text should be dark
        if (content.includes('#1e3a8a')) {
          // Keep white text for dark backgrounds
          console.log(`  ${lessonKey} - replaced dark gradient, kept white text`);
        } else {
          // Ensure dark text for light backgrounds
          content = content.replaceAll('color: white;', 'color: #1f2937;');
        }
      }
    }

    if (updated) {
      const { error } = await supabase
        .from('lessons')
        .update({ content })
        .eq('lesson_key', lessonKey);

      if (error) {
        console.log(`❌ ${lessonKey} - error:`, error.message);
      } else {
        console.log(`✓ ${lessonKey} - gradient fixed`);
      }
    }
  }

  console.log('\n✅ All remaining gradients fixed!\n');
}

fixRemainingGradients();
