import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const enhancedLessons = {
  'fractions': `<div class="lesson-content">
  <p class="lesson-intro">Fractions appear frequently on the ACT, and knowing how to add, subtract, multiply, and divide them efficiently is essential. Your calculator can help, but understanding the concepts will make you faster and more accurate. Let's learn fractions from the ground up!</p>

  <h3>What is a Fraction?</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <svg width="100%" height="200" viewBox="0 0 500 200" style="display: block; margin: 0 auto 1.5rem auto; max-width: 500px;">
      <text x="250" y="40" font-size="24" font-weight="bold" fill="#1e40af" text-anchor="middle">Visual: 3/4 means "3 out of 4 parts"</text>

      <rect x="100" y="80" width="60" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
      <rect x="170" y1="80" width="60" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
      <rect x="240" y="80" width="60" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
      <rect x="310" y="80" width="60" height="60" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/>

      <text x="235" y="170" font-size="18" fill="#1e40af" text-anchor="middle" font-weight="600">3 shaded out of 4 total = 3/4</text>
    </svg>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 3rem; font-weight: 700; color: #dc2626;">3</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; font-weight: 600; color: #64748b;">Numerator</p>
        <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">How many parts we have</p>
      </div>
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 3rem; font-weight: 700; color: #3b82f6;">4</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; font-weight: 600; color: #64748b;">Denominator</p>
        <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">Total number of parts</p>
      </div>
    </div>
  </div>

  <h3>Fraction Operations</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">Multiplication</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">a/b × c/d = (a × c)/(b × d)</p>
      </div>
      <p style="margin: 0.5rem 0; font-size: 1.05rem; opacity: 0.95;">Multiply straight across!</p>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px; margin-top: 1rem;">
        <p style="margin: 0; font-size: 0.95rem;">Example: 2/3 × 4/5 = 8/15</p>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">Division</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">a/b ÷ c/d = a/b × d/c</p>
      </div>
      <p style="margin: 0.5rem 0; font-size: 1.05rem; opacity: 0.95;">Flip the second, then multiply!</p>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px; margin-top: 1rem;">
        <p style="margin: 0; font-size: 0.95rem;">Example: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6</p>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">Addition/Subtraction</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">Need common denominator!</p>
      </div>
      <p style="margin: 0.5rem 0; font-size: 1.05rem; opacity: 0.95;">Make bottoms match first</p>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px; margin-top: 1rem;">
        <p style="margin: 0; font-size: 0.95rem;">Example: 1/4 + 2/3 = 3/12 + 8/12 = 11/12</p>
      </div>
    </div>
  </div>

  <h3>Step-by-Step: Adding Fractions</h3>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #78350f; font-size: 1.3rem;">Let's add: 1/4 + 2/3</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 1: Find a common denominator</p>
      <p style="margin: 0; padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 1.8;">We need a number that both 4 and 3 divide into. The smallest is 12.<br>4 × 3 = 12 ✓<br>3 × 4 = 12 ✓</p>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 2: Convert both fractions</p>
      <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #f59e0b;">1/4 = ?/12 → multiply top and bottom by 3 → 3/12</p>
      <p style="margin: 0; padding-left: 1rem; border-left: 3px solid #f59e0b;">2/3 = ?/12 → multiply top and bottom by 4 → 8/12</p>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 3: Add the numerators</p>
      <p style="margin: 0; padding-left: 1rem; border-left: 3px solid #f59e0b; font-size: 1.1rem;">3/12 + 8/12 = 11/12</p>
    </div>
  </div>

  <h3>Calculator Tip</h3>

  <div style="background: #dcfce7; padding: 1.5rem; margin: 2rem 0; border-radius: 8px; border-left: 4px solid #10b981;">
    <p style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 600; color: #065f46;">💡 ACT Calculator Trick</p>
    <p style="margin: 0; line-height: 1.7;">On the ACT, you can convert fractions to decimals! For 3/7 + 2/5, just type: <strong>(3÷7) + (2÷5) =</strong> and get the decimal answer. Then check which answer choice matches!</p>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is 5/8 × 4/15?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 1/6<br>B. 1/3<br>C. 2/3<br>D. 9/23</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Multiply numerators and denominators, then simplify.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>5/8 × 4/15 = (5 × 4)/(8 × 15)</div>
    <div>= 20/120</div>
    <div>Simplify by dividing both by 20:</div>
    <div>= 1/6</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Multiply straight across, divide by flipping the second fraction, and use common denominators for addition/subtraction. Your calculator is your friend—use it to check your work!</p>
  </div>
</div>`,

  'exponents-roots': `<div class="lesson-content">
  <p class="lesson-intro">Exponents and roots are inverse operations—exponents repeatedly multiply, while roots "undo" that multiplication. Master the rules of exponents and you'll breeze through these problems on the ACT!</p>

  <h3>What are Exponents?</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 3rem; font-weight: 700; color: #1e40af;">2⁵ = 2 × 2 × 2 × 2 × 2 = 32</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #dc2626;">2</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Base</p>
        <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem; color: #64748b;">The number being multiplied</p>
      </div>
      <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #3b82f6;">5</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Exponent</p>
        <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem; color: #64748b;">How many times to multiply</p>
      </div>
    </div>
  </div>

  <h3>Exponent Rules</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0284c7;">
      <h4 style="margin: 0 0 1rem 0; color: #0c4a6e;">Product Rule</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #0284c7;">x<sup>a</sup> × x<sup>b</sup> = x<sup>a+b</sup></p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">When multiplying same bases, <strong>add</strong> exponents</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #f0f9ff; border-radius: 6px; font-family: monospace;">2³ × 2⁴ = 2⁷</p>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">Quotient Rule</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #db2777;">x<sup>a</sup> / x<sup>b</sup> = x<sup>a−b</sup></p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">When dividing same bases, <strong>subtract</strong> exponents</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #fdf2f8; border-radius: 6px; font-family: monospace;">5⁸ / 5³ = 5⁵</p>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f;">Power Rule</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #f59e0b;">(x<sup>a</sup>)<sup>b</sup> = x<sup>a×b</sup></p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">When raising a power to a power, <strong>multiply</strong> exponents</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #fffbeb; border-radius: 6px; font-family: monospace;">(3²)⁴ = 3⁸</p>
    </div>

    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Zero Exponent</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #10b981;">x⁰ = 1</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Anything to the zero power equals 1 (except 0⁰)</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #f0fdf4; border-radius: 6px; font-family: monospace;">999⁰ = 1</p>
    </div>

    <div style="background: #ede9fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #7c3aed;">
      <h4 style="margin: 0 0 1rem 0; color: #5b21b6;">Negative Exponent</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #7c3aed;">x<sup>−a</sup> = 1/x<sup>a</sup></p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Negative exponent means "flip it"</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #f5f3ff; border-radius: 6px; font-family: monospace;">2<sup>−3</sup> = 1/2³ = 1/8</p>
    </div>
  </div>

  <h3>Square Roots and Radicals</h3>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <p style="margin: 0; font-size: 2rem; font-weight: 700;">√16 = 4 because 4² = 16</p>
    </div>
    <p style="margin: 0; text-align: center; font-size: 1.1rem; opacity: 0.95;">The square root "undoes" squaring</p>

    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
      <p style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 600;">Common Square Roots to Memorize:</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; font-size: 1.05rem;">
        <p style="margin: 0;">√1 = 1</p>
        <p style="margin: 0;">√4 = 2</p>
        <p style="margin: 0;">√9 = 3</p>
        <p style="margin: 0;">√16 = 4</p>
        <p style="margin: 0;">√25 = 5</p>
        <p style="margin: 0;">√36 = 6</p>
        <p style="margin: 0;">√49 = 7</p>
        <p style="margin: 0;">√64 = 8</p>
        <p style="margin: 0;">√81 = 9</p>
        <p style="margin: 0;">√100 = 10</p>
        <p style="margin: 0;">√121 = 11</p>
        <p style="margin: 0;">√144 = 12</p>
      </div>
    </div>
  </div>

  <h3>Radical Rules</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 12px; border: 2px solid #3b82f6;">
      <h4 style="margin: 0 0 1rem 0; color: #1e40af;">Multiplication</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700;">√a × √b = √(ab)</p>
      </div>
      <p style="margin: 0; padding: 1rem; background: #dbeafe; border-radius: 6px; font-family: monospace;">√2 × √8 = √16 = 4</p>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border: 2px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f;">Division</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700;">√a / √b = √(a/b)</p>
      </div>
      <p style="margin: 0; padding: 1rem; background: #fef9c3; border-radius: 6px; font-family: monospace;">√50 / √2 = √25 = 5</p>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Simplify: x⁵ × x³</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. x⁸<br>B. x¹⁵<br>C. x²<br>D. 2x⁸</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use the product rule: when multiplying same bases, add the exponents.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>x⁵ × x³ = x<sup>5+3</sup></div>
    <div>= x⁸</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Remember the three main rules: add exponents when multiplying (x<sup>a</sup> × x<sup>b</sup> = x<sup>a+b</sup>), subtract when dividing (x<sup>a</sup> / x<sup>b</sup> = x<sup>a−b</sup>), and multiply when raising a power to a power ((x<sup>a</sup>)<sup>b</sup> = x<sup>ab</sup>)!</p>
  </div>
</div>`,

  'inequalities': `<div class="lesson-content">
  <p class="lesson-intro">Inequalities work almost exactly like equations, but with one critical rule: when you multiply or divide by a negative number, you must flip the inequality sign! Let's learn how to solve and graph inequalities step by step.</p>

  <h3>Inequality Symbols</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #dbeafe; padding: 1.5rem; border-radius: 12px; text-align: center; border: 2px solid #3b82f6;">
      <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #1e40af;">></p>
      <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Greater than</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">x > 5 means x is more than 5</p>
    </div>

    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; text-align: center; border: 2px solid #10b981;">
      <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #065f46;">≥</p>
      <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Greater than or equal</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">x ≥ 5 means x is 5 or more</p>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; text-align: center; border: 2px solid #f59e0b;">
      <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #78350f;"><</p>
      <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Less than</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">x < 5 means x is less than 5</p>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; text-align: center; border: 2px solid #db2777;">
      <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #831843;">≤</p>
      <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Less than or equal</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">x ≤ 5 means x is 5 or less</p>
    </div>
  </div>

  <h3>The Critical Rule</h3>

  <div style="background: #fee2e2; padding: 2rem; margin: 2rem 0; border-radius: 12px; border: 3px solid #dc2626;">
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #991b1b;">⚠️ FLIP THE SIGN WHEN MULTIPLYING/DIVIDING BY A NEGATIVE!</p>
    </div>
    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 600; color: #991b1b;">Example:</p>
      <div style="font-size: 1.15rem; line-height: 2.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;">
        <div>−2x < 6</div>
        <div>Divide both sides by −2:</div>
        <div style="color: #dc2626; font-weight: 700;">x > −3 (sign flipped from < to >!)</div>
      </div>
    </div>
  </div>

  <h3>Solving Inequalities</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">Solve inequalities just like equations—isolate the variable using the same steps. Just remember to flip the sign if you multiply or divide by a negative!</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Step-by-Step Example: Solve −3x + 7 > 16</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Isolate the term with x</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.05rem;">
        <div>−3x + 7 > 16</div>
        <div>Subtract 7 from both sides:</div>
        <div>−3x > 9</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Divide by −3 and FLIP the sign!</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.05rem;">
        <div>−3x > 9</div>
        <div>Divide both sides by −3:</div>
        <div style="color: #dc2626; font-weight: 700;">x < −3 (sign flipped!)</div>
      </div>
    </div>
  </div>

  <h3>Graphing Inequalities on a Number Line</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px;">
      <h4 style="margin: 0 0 1rem 0; color: #0c4a6e; text-align: center;">x > 3</h4>
      <svg width="100%" height="60" viewBox="0 0 300 60">
        <line x1="30" y1="30" x2="270" y2="30" stroke="#64748b" stroke-width="2"/>
        <circle cx="150" cy="30" r="8" fill="white" stroke="#3b82f6" stroke-width="3"/>
        <line x1="150" y1="30" x2="270" y2="30" stroke="#3b82f6" stroke-width="4"/>
        <polygon points="270,30 260,25 260,35" fill="#3b82f6"/>
        <text x="150" y="55" font-size="14" fill="#64748b" text-anchor="middle">3</text>
      </svg>
      <p style="margin: 1rem 0 0 0; text-align: center; font-size: 0.95rem; color: #0c4a6e;"><strong>Open circle</strong> (not equal), shade right</p>
    </div>

    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46; text-align: center;">x ≥ 3</h4>
      <svg width="100%" height="60" viewBox="0 0 300 60">
        <line x1="30" y1="30" x2="270" y2="30" stroke="#64748b" stroke-width="2"/>
        <circle cx="150" cy="30" r="8" fill="#10b981" stroke="#10b981" stroke-width="3"/>
        <line x1="150" y1="30" x2="270" y2="30" stroke="#10b981" stroke-width="4"/>
        <polygon points="270,30 260,25 260,35" fill="#10b981"/>
        <text x="150" y="55" font-size="14" fill="#64748b" text-anchor="middle">3</text>
      </svg>
      <p style="margin: 1rem 0 0 0; text-align: center; font-size: 0.95rem; color: #065f46;"><strong>Filled circle</strong> (includes equal), shade right</p>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f; text-align: center;">x < 3</h4>
      <svg width="100%" height="60" viewBox="0 0 300 60">
        <line x1="30" y1="30" x2="270" y2="30" stroke="#64748b" stroke-width="2"/>
        <circle cx="150" cy="30" r="8" fill="white" stroke="#f59e0b" stroke-width="3"/>
        <line x1="30" y1="30" x2="150" y2="30" stroke="#f59e0b" stroke-width="4"/>
        <polygon points="30,30 40,25 40,35" fill="#f59e0b"/>
        <text x="150" y="55" font-size="14" fill="#64748b" text-anchor="middle">3</text>
      </svg>
      <p style="margin: 1rem 0 0 0; text-align: center; font-size: 0.95rem; color: #78350f;"><strong>Open circle</strong> (not equal), shade left</p>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px;">
      <h4 style="margin: 0 0 1rem 0; color: #831843; text-align: center;">x ≤ 3</h4>
      <svg width="100%" height="60" viewBox="0 0 300 60">
        <line x1="30" y1="30" x2="270" y2="30" stroke="#64748b" stroke-width="2"/>
        <circle cx="150" cy="30" r="8" fill="#db2777" stroke="#db2777" stroke-width="3"/>
        <line x1="30" y1="30" x2="150" y2="30" stroke="#db2777" stroke-width="4"/>
        <polygon points="30,30 40,25 40,35" fill="#db2777"/>
        <text x="150" y="55" font-size="14" fill="#64748b" text-anchor="middle">3</text>
      </svg>
      <p style="margin: 1rem 0 0 0; text-align: center; font-size: 0.95rem; color: #831843;"><strong>Filled circle</strong> (includes equal), shade left</p>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Solve for x: −3x + 7 > 16</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. x > −3<br>B. x < −3<br>C. x > 3<br>D. x < 3</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Solve like an equation, but flip the sign when dividing by −3.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>−3x + 7 > 16</div>
    <div>−3x > 9</div>
    <div style="color: #dc2626; font-weight: 700;">x < −3 (sign flipped!)</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">The most common mistake with inequalities is forgetting to flip the sign when multiplying or dividing by a negative! Always watch for this. Everything else works exactly like equations.</p>
  </div>
</div>`
};

async function updateLessons() {
  console.log('Starting Phase 3 enhancements (Algebra)...\n');

  for (const [key, content] of Object.entries(enhancedLessons)) {
    const { error } = await supabase
      .from('lessons')
      .update({ content })
      .eq('lesson_key', key);

    if (error) {
      console.error(`✗ Error updating ${key}:`, error);
    } else {
      console.log(`✓ Enhanced ${key} with comprehensive teaching content!`);
    }
  }

  console.log('\n✓ Phase 3 complete: Enhanced 3 algebra lessons with detailed visuals!');
  console.log('Next: Will continue with remaining algebra and advanced topics...');
}

updateLessons();
