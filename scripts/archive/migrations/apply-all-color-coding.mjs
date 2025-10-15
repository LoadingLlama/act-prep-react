import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Color scheme
const COLORS = {
  memorize: {
    bg: '#fef3c7',
    border: '#f59e0b',
    text: '#92400e',
    icon: '🔑'
  },
  given: {
    bg: '#dbeafe',
    border: '#3b82f6',
    text: '#1e40af',
    icon: '📋'
  },
  tip: {
    bg: '#ede9fe',
    border: '#7c3aed',
    text: '#5b21b6',
    icon: '💡'
  },
  warning: {
    bg: '#fee2e2',
    border: '#ef4444',
    text: '#991b1b',
    icon: '⚠️'
  }
};

function createFormulaBox(formula, type = 'memorize') {
  const color = COLORS[type];
  const title = type === 'memorize' ? 'MEMORIZE - Not on ACT formula sheet' :
                type === 'given' ? 'Given on ACT formula sheet' :
                type === 'tip' ? 'Strategy Tip' : 'Common Mistake';

  return `<div style="background: ${color.bg}; padding: 1.5rem; border-radius: 8px; border-left: 4px solid ${color.border}; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: ${color.text}; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">${color.icon} ${title}</p>
    <div style="background: white; padding: 1.25rem; border-radius: 6px; text-align: center;">
      ${formula}
    </div>
  </div>`;
}

// Helper function to add color coding to existing content
function addColorCoding(content, lessonKey) {
  // This function will intelligently add color-coded boxes to formulas
  // based on patterns in the content

  let enhanced = content;

  // Common patterns for formulas that need memorization (not on ACT sheet)
  const memorizePatterns = [
    { pattern: /quadratic formula[:\s]*<\/?\w*>*\s*x\s*=\s*\(?[-−]?b\s*[±]\s*√\(?b[²2²]\s*[-−]\s*4ac\)?/gi, lessonKeys: ['quadratics', 'algebra-skills'] },
    { pattern: /slope formula[:\s]*<\/?\w*>*\s*m\s*=\s*\(?y[₂2²]\s*[-−]\s*y[₁1¹]\)?/gi, lessonKeys: ['lines', 'algebra-skills'] },
    { pattern: /point-slope[:\s]*<\/?\w*>*\s*y\s*[-−]\s*y[₁1¹]\s*=\s*m\(?x\s*[-−]\s*x[₁1¹]\)?/gi, lessonKeys: ['lines'] },
    { pattern: /slope-intercept[:\s]*<\/?\w*>*\s*y\s*=\s*mx\s*\+\s*b/gi, lessonKeys: ['lines'] },
  ];

  // For now, we'll do a simple presence check and add color coding to key formulas
  // This will be lesson-specific

  return enhanced;
}

async function applyColorCodingToAll() {
  const lessons = [
    'geometry-angles', 'trigonometry', 'geometry-shapes', 'lines',
    'circles-ellipses', 'arcs-sectors', 'fractions', 'exponents-roots',
    'inequalities', 'absolute-value', 'logarithms', 'quadratics',
    'algebra-skills', 'systems-equations', 'functions', 'percentages',
    'transforming-functions', 'exponential-growth', 'sequences', 'ratios-proportions',
    'number-theory', 'statistics-basics', 'probability', 'word-problems',
    'miscellaneous-topics'
  ];

  console.log('🎨 Applying color-coded formula system to all 25 math lessons...\n');
  console.log('Color Key:');
  console.log('  🔑 Amber/Gold = MEMORIZE (not on ACT sheet)');
  console.log('  📋 Blue = Given on ACT sheet');
  console.log('  💡 Purple = Tips & Strategies');
  console.log('  ⚠️  Red = Warnings & Common Mistakes\n');

  let successCount = 0;
  let errorCount = 0;

  for (const lessonKey of lessons) {
    // For now, quadratics is already done - skip it
    if (lessonKey === 'quadratics') {
      console.log(`✓ ${lessonKey} - already has color coding`);
      successCount++;
      continue;
    }

    // For other lessons, we'll add color coding based on their content
    const { data: currentData } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    if (!currentData) {
      console.log(`❌ ${lessonKey} - not found`);
      errorCount++;
      continue;
    }

    let content = currentData.content;
    let updated = false;

    // Add lesson-specific color coding
    switch(lessonKey) {
      case 'trigonometry':
        // SOH-CAH-TOA - must memorize
        if (content.includes('SOH-CAH-TOA') || content.includes('sin') || content.includes('cos')) {
          // Mark trig ratios as memorize (not on sheet)
          content = content.replace(
            /(sin.*?cos.*?tan|SOH-CAH-TOA)/gi,
            match => createFormulaBox(`<p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #92400e;">${match}</p>`, 'memorize')
          );
          updated = true;
        }
        break;

      case 'lines':
        // Slope formula - must memorize
        if (content.includes('slope') && !content.includes(createFormulaBox)) {
          updated = true;
        }
        break;

      case 'geometry-shapes':
        // Basic area formulas - given on ACT
        if (content.includes('rectangle') || content.includes('triangle')) {
          updated = true;
        }
        break;
    }

    // For now, just mark as processed without updating
    // We'll do manual review and targeted updates
    console.log(`⏭  ${lessonKey} - analyzed (will add color coding in next phase)`);
    successCount++;
  }

  console.log(`\n✅ Analysis complete! ${successCount} lessons processed, ${errorCount} errors\n`);
  console.log('Next step: Add targeted color-coded formula boxes to each lesson based on ACT formula sheet\n');
}

applyColorCodingToAll();
