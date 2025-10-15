import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ACT Formula Reference Sheet - what's GIVEN on the test
const GIVEN_ON_ACT = {
  geometry: [
    'rectangle area: A = lw',
    'triangle area: A = ½bh',
    'circle area: A = πr²',
    'circle circumference: C = 2πr',
    'trapezoid area: A = ½(b₁ + b₂)h',
    'pythagorean theorem: a² + b² = c²',
  ],
  algebra: [
    'distance formula: d = √[(x₂ − x₁)² + (y₂ − y₁)²]',
    'midpoint formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
  ]
};

// Must memorize (NOT on reference sheet)
const MUST_MEMORIZE = {
  algebra: [
    'quadratic formula: x = (−b ± √(b² − 4ac)) / (2a)',
    'slope formula: m = (y₂ − y₁) / (x₂ − x₁)',
    'point-slope form: y − y₁ = m(x − x₁)',
    'slope-intercept form: y = mx + b',
  ],
  trig: [
    'SOH-CAH-TOA',
    'sin θ = opposite/hypotenuse',
    'cos θ = adjacent/hypotenuse',
    'tan θ = opposite/adjacent',
  ],
  sequences: [
    'arithmetic sequence: aₙ = a₁ + (n−1)d',
    'geometric sequence: aₙ = a₁ · rⁿ⁻¹',
  ],
  exponents: [
    'product rule: xᵃ · xᵇ = xᵃ⁺ᵇ',
    'quotient rule: xᵃ / xᵇ = xᵃ⁻ᵇ',
    'power rule: (xᵃ)ᵇ = xᵃᵇ',
  ],
  logs: [
    'log(ab) = log(a) + log(b)',
    'log(a/b) = log(a) − log(b)',
    'log(aⁿ) = n·log(a)',
  ],
};

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
    <div style="background: white; padding: 1.25rem; border-radius: 6px;">
      ${formula}
    </div>
  </div>`;
}

// Add color coding to specific lessons
async function addColorCodingToLesson(lessonKey) {
  const { data } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', lessonKey)
    .single();

  if (!data) return null;

  let content = data.content;
  let updated = false;

  // Lesson-specific color coding insertions
  switch(lessonKey) {
    case 'lines':
      // Add memorize boxes for slope formulas
      if (!content.includes('MEMORIZE - Not on ACT formula sheet')) {
        const slopeBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; font-size: 1.4rem; font-weight: 700; color: #92400e;">m = (y₂ − y₁) / (x₂ − x₁)</p><p style="margin: 0; color: #92400e;">Slope formula</p>',
          'memorize'
        );
        const slopeInterceptBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; font-size: 1.4rem; font-weight: 700; color: #92400e;">y = mx + b</p><p style="margin: 0; color: #92400e;">Slope-intercept form</p>',
          'memorize'
        );
        const pointSlopeBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; font-size: 1.4rem; font-weight: 700; color: #92400e;">y − y₁ = m(x − x₁)</p><p style="margin: 0; color: #92400e;">Point-slope form</p>',
          'memorize'
        );

        // Insert after the intro section
        content = content.replace(
          /<h3>Slope of a Line<\/h3>/,
          `<h3>Slope of a Line</h3>\n\n${slopeBox}`
        );
        content = content.replace(
          /<h3>Slope-Intercept Form<\/h3>/,
          `<h3>Slope-Intercept Form</h3>\n\n${slopeInterceptBox}`
        );
        content = content.replace(
          /<h3>Point-Slope Form<\/h3>/,
          `<h3>Point-Slope Form</h3>\n\n${pointSlopeBox}`
        );
        updated = true;
      }
      break;

    case 'trigonometry':
      // Add memorize box for SOH-CAH-TOA
      if (!content.includes('MEMORIZE - Not on ACT formula sheet')) {
        const trigBox = createFormulaBox(
          '<p style="margin: 0 0 1rem 0; font-size: 1.4rem; font-weight: 700; color: #92400e; text-align: center;">SOH-CAH-TOA</p>' +
          '<p style="margin: 0 0 0.5rem 0; color: #92400e;"><strong>sin θ</strong> = opposite / hypotenuse</p>' +
          '<p style="margin: 0 0 0.5rem 0; color: #92400e;"><strong>cos θ</strong> = adjacent / hypotenuse</p>' +
          '<p style="margin: 0; color: #92400e;"><strong>tan θ</strong> = opposite / adjacent</p>',
          'memorize'
        );

        content = content.replace(
          /<h3>(Trigonometric Ratios|What is Trigonometry\?)<\/h3>/,
          `<h3>$1</h3>\n\n${trigBox}`
        );
        updated = true;
      }
      break;

    case 'geometry-shapes':
      // Add given box for area formulas
      if (!content.includes('Given on ACT formula sheet')) {
        const areaBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; color: #1e40af;"><strong>Rectangle:</strong> A = lw</p>' +
          '<p style="margin: 0 0 0.5rem 0; color: #1e40af;"><strong>Triangle:</strong> A = ½bh</p>' +
          '<p style="margin: 0 0 0.5rem 0; color: #1e40af;"><strong>Circle:</strong> A = πr²</p>' +
          '<p style="margin: 0; color: #1e40af;"><strong>Trapezoid:</strong> A = ½(b₁ + b₂)h</p>',
          'given'
        );

        content = content.replace(
          /<h3>(Area Formulas|Basic Shapes)<\/h3>/,
          `<h3>$1</h3>\n\n${areaBox}`
        );
        updated = true;
      }
      break;

    case 'sequences':
      // Add memorize boxes for sequence formulas
      if (!content.includes('MEMORIZE - Not on ACT formula sheet')) {
        const arithmeticBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; font-size: 1.4rem; font-weight: 700; color: #92400e;">aₙ = a₁ + (n−1)d</p><p style="margin: 0; color: #92400e;">Arithmetic sequence formula</p>',
          'memorize'
        );
        const geometricBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; font-size: 1.4rem; font-weight: 700; color: #92400e;">aₙ = a₁ · rⁿ⁻¹</p><p style="margin: 0; color: #92400e;">Geometric sequence formula</p>',
          'memorize'
        );

        content = content.replace(
          /<h3>Arithmetic Sequences<\/h3>/,
          `<h3>Arithmetic Sequences</h3>\n\n${arithmeticBox}`
        );
        content = content.replace(
          /<h3>Geometric Sequences<\/h3>/,
          `<h3>Geometric Sequences</h3>\n\n${geometricBox}`
        );
        updated = true;
      }
      break;

    case 'exponents-roots':
      // Add memorize boxes for exponent rules
      if (!content.includes('MEMORIZE - Not on ACT formula sheet')) {
        const exponentBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; color: #92400e;"><strong>Product Rule:</strong> xᵃ · xᵇ = xᵃ⁺ᵇ</p>' +
          '<p style="margin: 0 0 0.5rem 0; color: #92400e;"><strong>Quotient Rule:</strong> xᵃ / xᵇ = xᵃ⁻ᵇ</p>' +
          '<p style="margin: 0; color: #92400e;"><strong>Power Rule:</strong> (xᵃ)ᵇ = xᵃᵇ</p>',
          'memorize'
        );

        content = content.replace(
          /<h3>(Exponent Rules|Laws of Exponents)<\/h3>/,
          `<h3>$1</h3>\n\n${exponentBox}`
        );
        updated = true;
      }
      break;

    case 'logarithms':
      // Add memorize boxes for log rules
      if (!content.includes('MEMORIZE - Not on ACT formula sheet')) {
        const logBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; color: #92400e;"><strong>Product:</strong> log(ab) = log(a) + log(b)</p>' +
          '<p style="margin: 0 0 0.5rem 0; color: #92400e;"><strong>Quotient:</strong> log(a/b) = log(a) − log(b)</p>' +
          '<p style="margin: 0; color: #92400e;"><strong>Power:</strong> log(aⁿ) = n·log(a)</p>',
          'memorize'
        );

        content = content.replace(
          /<h3>(Logarithm Rules|Properties of Logarithms)<\/h3>/,
          `<h3>$1</h3>\n\n${logBox}`
        );
        updated = true;
      }
      break;

    case 'circles-ellipses':
      // Add given box for circle formulas
      if (!content.includes('Given on ACT formula sheet')) {
        const circleBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; color: #1e40af;"><strong>Area:</strong> A = πr²</p>' +
          '<p style="margin: 0; color: #1e40af;"><strong>Circumference:</strong> C = 2πr</p>',
          'given'
        );

        content = content.replace(
          /<h3>(Circle Formulas|Basic Circle Properties)<\/h3>/,
          `<h3>$1</h3>\n\n${circleBox}`
        );
        updated = true;
      }
      break;

    case 'algebra-skills':
      // Add given and memorize boxes for distance/midpoint formulas
      if (!content.includes('MEMORIZE - Not on ACT formula sheet')) {
        const distanceBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; font-size: 1.3rem; font-weight: 700; color: #1e40af;">d = √[(x₂ − x₁)² + (y₂ − y₁)²]</p><p style="margin: 0; color: #1e40af;">Distance formula</p>',
          'given'
        );
        const midpointBox = createFormulaBox(
          '<p style="margin: 0 0 0.5rem 0; font-size: 1.3rem; font-weight: 700; color: #1e40af;">M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</p><p style="margin: 0; color: #1e40af;">Midpoint formula</p>',
          'given'
        );

        content = content.replace(
          /<h3>Distance Formula<\/h3>/,
          `<h3>Distance Formula</h3>\n\n${distanceBox}`
        );
        content = content.replace(
          /<h3>Midpoint Formula<\/h3>/,
          `<h3>Midpoint Formula</h3>\n\n${midpointBox}`
        );
        updated = true;
      }
      break;
  }

  if (updated) {
    const { error } = await supabase
      .from('lessons')
      .update({ content })
      .eq('lesson_key', lessonKey);

    if (error) {
      return { success: false, error: error.message };
    }
  }

  return { success: true, updated };
}

async function applyComprehensiveColorCoding() {
  const lessonsToUpdate = [
    'lines', 'trigonometry', 'geometry-shapes', 'sequences',
    'exponents-roots', 'logarithms', 'circles-ellipses', 'algebra-skills'
  ];

  console.log('🎨 Applying comprehensive color-coded formula system...\n');
  console.log('Color Key:');
  console.log('  🔑 Amber/Gold = MEMORIZE (not on ACT sheet)');
  console.log('  📋 Blue = Given on ACT sheet');
  console.log('  💡 Purple = Tips & Strategies');
  console.log('  ⚠️  Red = Warnings & Common Mistakes\n');

  let successCount = 0;
  let skippedCount = 0;

  for (const lessonKey of lessonsToUpdate) {
    const result = await addColorCodingToLesson(lessonKey);

    if (!result) {
      console.log(`❌ ${lessonKey} - not found`);
    } else if (!result.success) {
      console.log(`❌ ${lessonKey} - error: ${result.error}`);
    } else if (result.updated) {
      console.log(`✓ ${lessonKey} - color coding added`);
      successCount++;
    } else {
      console.log(`⏭  ${lessonKey} - already has color coding`);
      skippedCount++;
    }
  }

  console.log(`\n✅ Complete! ${successCount} lessons updated, ${skippedCount} skipped\n`);
}

applyComprehensiveColorCoding();
