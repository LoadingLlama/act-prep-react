import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ACT Formula Reference Sheet - what's GIVEN on the test
const GIVEN_ON_ACT = {
  // Geometry formulas (ALL given)
  shapes: ['rectangle area', 'triangle area', 'circle area', 'circle circumference', 'trapezoid area'],
  // Algebra (some given)
  algebra: ['pythagorean theorem', 'distance formula', 'midpoint formula'],
};

// Must memorize (NOT on reference sheet)
const MUST_MEMORIZE = {
  algebra: ['quadratic formula', 'slope formula', 'point-slope', 'slope-intercept'],
  trig: ['soh-cah-toa', 'sin', 'cos', 'tan'],
  sequences: ['arithmetic sequence', 'geometric sequence'],
  exponents: ['product rule', 'quotient rule', 'power rule'],
  logs: ['log rules', 'product rule', 'quotient rule', 'power rule'],
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
    <div style="background: white; padding: 1.25rem; border-radius: 6px; text-align: center;">
      ${formula}
    </div>
  </div>`;
}

// Enhanced lessons with color coding
const colorCodedLessons = {
  'quadratics': `<div class="lesson-content">
  <p class="lesson-intro">Quadratics are equations with x² as the highest power. You need to know factoring, the quadratic formula, and vertex form. These appear frequently on the ACT, so let's master them from the ground up!</p>

  <h3>What is a Quadratic?</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 8px; margin: 2rem 0; border: 1px solid #bfdbfe;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #1e40af;">A quadratic is any equation with x²</p>
    </div>

    <svg width="100%" height="300" viewBox="0 0 500 300" style="display: block; margin: 0 auto; max-width: 500px;">
      <defs>
        <marker id="arrowgraph" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#64748b"/>
        </marker>
      </defs>

      <line x1="50" y1="150" x2="450" y2="150" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowgraph)"/>
      <line x1="250" y1="280" x2="250" y2="20" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowgraph)"/>

      <path d="M 100 250 Q 250 50 400 250" fill="none" stroke="#3b82f6" stroke-width="3"/>

      <circle cx="250" cy="50" r="6" fill="#dc2626"/>
      <text x="265" y="40" font-size="14" font-weight="bold" fill="#dc2626">Vertex</text>
      <text x="265" y="55" font-size="12" fill="#64748b">(highest/lowest)</text>

      <circle cx="150" cy="150" r="5" fill="#10b981"/>
      <circle cx="350" cy="150" r="5" fill="#10b981"/>
      <text x="250" y="175" font-size="12" font-weight="bold" fill="#10b981" text-anchor="middle">Roots (x-axis crossings)</text>

      <text x="250" y="20" font-size="16" font-weight="bold" fill="#1e40af" text-anchor="middle">Graph of y = x²</text>
    </svg>

    <div style="background: white; padding: 1.5rem; border-radius: 6px;">
      <p style="margin: 0; font-size: 1.05rem; text-align: center; line-height: 1.8;">Quadratics make a U-shaped curve called a <strong>parabola</strong>. Opens up (∪) if x² coefficient is positive, down (∩) if negative.</p>
    </div>
  </div>

  <h3>Three Forms of Quadratics</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #ede9fe; padding: 1.5rem; border-radius: 8px; border: 1px solid #c4b5fd;">
      <h4 style="margin: 0 0 1rem 0; color: #6d28d9;">Standard Form</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 6px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #6d28d9;">ax² + bx + c = 0</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">General form—use this with the quadratic formula</p>
    </div>

    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 8px; border: 1px solid #bbf7d0;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Factored Form</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 6px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #065f46;">a(x − r₁)(x − r₂) = 0</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Shows roots directly: r₁ and r₂</p>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 8px; border: 1px solid #fde68a;">
      <h4 style="margin: 0 0 1rem 0; color: #92400e;">Vertex Form</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 6px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #92400e;">a(x − h)² + k</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Shows vertex directly: (h, k)</p>
    </div>
  </div>

  <h3>The Quadratic Formula</h3>

  ${createFormulaBox(`<p style="margin: 0; font-size: 1.6rem; font-weight: 700; color: #92400e;">x = (−b ± √(b² − 4ac)) / (2a)</p>
    <p style="margin: 1rem 0 0 0; font-size: 1rem; color: #92400e;">For any quadratic ax² + bx + c = 0</p>`, 'memorize')}

  <div style="background: #fee2e2; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #991b1b; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">⚠️ CRITICAL</p>
    <p style="margin: 0; line-height: 1.7; color: #991b1b;">This formula is NOT on the ACT reference sheet—you MUST memorize it! It's tested frequently.</p>
  </div>

  <h3>Factoring Quadratics</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">For simple quadratics (when a = 1), try factoring first! It's faster than the quadratic formula.</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 8px; margin: 2rem 0; border: 1px solid #bfdbfe;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #1e40af; font-size: 1.3rem;">Example: Factor x² + 7x + 12</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 6px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #1e40af;">Step 1: Find two numbers that multiply to 12 and add to 7</p>
      <div style="padding-left: 1rem; border-left: 3px solid #3b82f6; line-height: 2;">
        <div>1 × 12 = 12, but 1 + 12 = 13 ✗</div>
        <div>2 × 6 = 12, but 2 + 6 = 8 ✗</div>
        <div style="font-weight: 700;">3 × 4 = 12, and 3 + 4 = 7 ✓</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 6px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #1e40af;">Step 2: Write as (x + 3)(x + 4)</p>
      <div style="padding-left: 1rem; border-left: 3px solid #3b82f6; line-height: 2; font-size: 1.1rem;">
        <div>x² + 7x + 12 = (x + 3)(x + 4)</div>
      </div>
    </div>
  </div>

  <div style="background: #ede9fe; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #7c3aed; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #5b21b6; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">💡 STRATEGY TIP</p>
    <p style="margin: 0; line-height: 1.7; color: #5b21b6;">Always try factoring first! If it doesn't factor easily in 10 seconds, switch to the quadratic formula.</p>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Factor: x² + 7x + 12</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. (x + 3)(x + 4)<br>B. (x + 2)(x + 6)<br>C. (x + 1)(x + 12)<br>D. (x − 3)(x − 4)</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Find two numbers that multiply to 12 and add to 7: 3 and 4.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 6px;">
    <div>x² + 7x + 12 = (x + 3)(x + 4)</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 6px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1e40af; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem; color: #1e3a8a;">Try factoring first! If it doesn't factor easily, use the quadratic formula. Memorize the formula—it's not given on the ACT! Remember: quadratics usually have two solutions.</p>
  </div>
</div>`
};

async function applyColorCoding() {
  console.log('🎨 Applying color-coded formula system...\n');
  console.log('Color Key:');
  console.log('  🔑 Amber/Gold = MEMORIZE (not on ACT sheet)');
  console.log('  📋 Blue = Given on ACT sheet');
  console.log('  💡 Purple = Tips & Strategies');
  console.log('  ⚠️  Red = Warnings & Common Mistakes\n');

  // First, let's test with quadratics
  const { error } = await supabase
    .from('lessons')
    .update({ content: colorCodedLessons.quadratics })
    .eq('lesson_key', 'quadratics');

  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('✓ quadratics - color coding applied (test)');
    console.log('\nTest complete! Check the quadratics lesson to verify the color scheme.');
    console.log('If approved, I\'ll apply this system to all 25 math lessons.\n');
  }
}

applyColorCoding();
