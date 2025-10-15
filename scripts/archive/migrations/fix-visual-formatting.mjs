import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// This script will:
// 1. Replace gradients with solid subtle colors
// 2. Fix SVG text placement to avoid overlaps
// 3. Ensure consistent box formatting
// 4. Fix any malformed attributes

const fixedLessons = {
  'fractions': `<div class="lesson-content">
  <p class="lesson-intro">Fractions appear frequently on the ACT, and knowing how to add, subtract, multiply, and divide them efficiently is essential. Your calculator can help, but understanding the concepts will make you faster and more accurate. Let's learn fractions from the ground up!</p>

  <h3>What is a Fraction?</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 8px; margin: 2rem 0; border: 1px solid #bfdbfe;">
    <svg width="100%" height="200" viewBox="0 0 500 200" style="display: block; margin: 0 auto 1.5rem auto; max-width: 500px;">
      <text x="250" y="30" font-size="20" font-weight="600" fill="#1e40af" text-anchor="middle">Visual: 3/4 means "3 out of 4 parts"</text>

      <rect x="100" y="70" width="60" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
      <rect x="170" y="70" width="60" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
      <rect x="240" y="70" width="60" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
      <rect x="310" y="70" width="60" height="60" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/>

      <text x="235" y="160" font-size="16" fill="#64748b" text-anchor="middle" font-weight="500">3 shaded out of 4 total = 3/4</text>
    </svg>

    <div style="background: white; padding: 1.5rem; border-radius: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #dc2626;">3</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; font-weight: 600; color: #64748b;">Numerator</p>
        <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem; color: #94a3b8;">How many parts we have</p>
      </div>
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #3b82f6;">4</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; font-weight: 600; color: #64748b;">Denominator</p>
        <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem; color: #94a3b8;">Total number of parts</p>
      </div>
    </div>
  </div>

  <h3>Fraction Operations</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #ede9fe; padding: 1.5rem; border-radius: 8px; border: 1px solid #c4b5fd;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem; color: #6d28d9;">Multiplication</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 6px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #6d28d9;">a/b × c/d = (a × c)/(b × d)</p>
      </div>
      <p style="margin: 0.5rem 0; font-size: 1.05rem; color: #6d28d9;">Multiply straight across!</p>
      <div style="background: #f5f3ff; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
        <p style="margin: 0; font-size: 0.95rem; color: #4c1d95;">Example: 2/3 × 4/5 = 8/15</p>
      </div>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 8px; border: 1px solid #fbcfe8;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem; color: #be185d;">Division</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 6px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #be185d;">a/b ÷ c/d = a/b × d/c</p>
      </div>
      <p style="margin: 0.5rem 0; font-size: 1.05rem; color: #be185d;">Flip the second, then multiply!</p>
      <div style="background: #fdf2f8; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
        <p style="margin: 0; font-size: 0.95rem; color: #831843;">Example: 2/3 ÷ 4/5 = 2/3 × 5/4 = 5/6</p>
      </div>
    </div>

    <div style="background: #cffafe; padding: 1.5rem; border-radius: 8px; border: 1px solid #a5f3fc;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem; color: #0e7490;">Addition/Subtraction</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 6px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #0e7490;">Need common denominator!</p>
      </div>
      <p style="margin: 0.5rem 0; font-size: 1.05rem; color: #0e7490;">Make bottoms match first</p>
      <div style="background: #ecfeff; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
        <p style="margin: 0; font-size: 0.95rem; color: #0f766e;">Example: 1/4 + 2/3 = 3/12 + 8/12 = 11/12</p>
      </div>
    </div>
  </div>

  <h3>Step-by-Step: Adding Fractions</h3>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 8px; margin: 2rem 0; border: 1px solid #fde68a;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #92400e; font-size: 1.3rem;">Let's add: 1/4 + 2/3</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 6px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #92400e;">Step 1: Find a common denominator</p>
      <p style="margin: 0; padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 1.8;">We need a number that both 4 and 3 divide into. The smallest is 12.<br>4 × 3 = 12 ✓<br>3 × 4 = 12 ✓</p>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 6px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #92400e;">Step 2: Convert both fractions</p>
      <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #f59e0b;">1/4 = ?/12 → multiply top and bottom by 3 → 3/12</p>
      <p style="margin: 0; padding-left: 1rem; border-left: 3px solid #f59e0b;">2/3 = ?/12 → multiply top and bottom by 4 → 8/12</p>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 6px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #92400e;">Step 3: Add the numerators</p>
      <p style="margin: 0; padding-left: 1rem; border-left: 3px solid #f59e0b; font-size: 1.1rem;">3/12 + 8/12 = 11/12</p>
    </div>
  </div>

  <h3>Calculator Tip</h3>

  <div style="background: #dcfce7; padding: 1.5rem; margin: 2rem 0; border-radius: 6px; border-left: 4px solid #10b981;">
    <p style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 600; color: #065f46;">💡 ACT Calculator Trick</p>
    <p style="margin: 0; line-height: 1.7; color: #065f46;">On the ACT, you can convert fractions to decimals! For 3/7 + 2/5, just type: <strong>(3÷7) + (2÷5) =</strong> and get the decimal answer. Then check which answer choice matches!</p>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is 5/8 × 4/15?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 1/6<br>B. 1/3<br>C. 2/3<br>D. 9/23</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Multiply numerators and denominators, then simplify.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 6px;">
    <div>5/8 × 4/15 = (5 × 4)/(8 × 15)</div>
    <div>= 20/120</div>
    <div>Simplify by dividing both by 20:</div>
    <div>= 1/6</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 6px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1e40af; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem; color: #1e3a8a;">Multiply straight across, divide by flipping the second fraction, and use common denominators for addition/subtraction. Your calculator is your friend—use it to check your work!</p>
  </div>
</div>`
};

async function testAndUpdate() {
  console.log('Testing visual fixes...\n');

  // First, let's just test one lesson
  const testKey = 'fractions';
  const testContent = fixedLessons[testKey];

  console.log('Sample of fixed content:');
  console.log(testContent.substring(0, 800));
  console.log('\nChecking for issues:');

  // Check for gradients
  const hasGradients = testContent.includes('linear-gradient');
  console.log(`- Gradients: ${hasGradients ? '❌ Still present' : '✓ Removed'}`);

  // Check for malformed attributes
  const hasMalformed = testContent.includes('y1="');
  console.log(`- Malformed attributes (y1): ${hasMalformed ? '❌ Still present' : '✓ Fixed'}`);

  // Check for consistent borders
  const hasConsistentBorders = testContent.includes('border: 1px solid');
  console.log(`- Consistent borders: ${hasConsistentBorders ? '✓ Using subtle borders' : '❌ Needs fixing'}`);

  console.log('\nReady to apply? This will update the fractions lesson as a test.');
  console.log('If it looks good, we\'ll do all lessons.\n');
}

testAndUpdate();
