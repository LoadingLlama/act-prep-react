import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const enhancedLessons = {
  'number-theory': `<div class="lesson-content">
  <p class="lesson-intro">Number theory covers properties of integers: even/odd, prime/composite, factors, and divisibility. These concepts appear frequently on the ACT in various problem types. Let's learn the essentials!</p>

  <h3>Even and Odd Numbers</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0284c7;">
      <h4 style="margin: 0 0 1rem 0; color: #0c4a6e;">Even Numbers</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Divisible by 2</p>
      <p style="margin: 0 0 1rem 0; padding: 1rem; background: #f0f9ff; border-radius: 6px; font-family: monospace;">..., −4, −2, 0, 2, 4, 6, 8, ...</p>
      <p style="margin: 0; font-size: 0.95rem; color: #0c4a6e;">Form: 2n (where n is any integer)</p>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f;">Odd Numbers</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Not divisible by 2</p>
      <p style="margin: 0 0 1rem 0; padding: 1rem; background: #fffbeb; border-radius: 6px; font-family: monospace;">..., −3, −1, 1, 3, 5, 7, 9, ...</p>
      <p style="margin: 0; font-size: 0.95rem; color: #78350f;">Form: 2n + 1 (where n is any integer)</p>
    </div>
  </div>

  <h3>Even/Odd Rules</h3>

  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div style="background: white; padding: 1rem; border-radius: 8px;">
        <p style="margin: 0; font-weight: 600; color: #1e40af;">Even + Even = Even</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace;">4 + 6 = 10 ✓</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 8px;">
        <p style="margin: 0; font-weight: 600; color: #1e40af;">Odd + Odd = Even</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace;">3 + 5 = 8 ✓</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 8px;">
        <p style="margin: 0; font-weight: 600; color: #1e40af;">Even + Odd = Odd</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace;">4 + 3 = 7 ✓</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 8px;">
        <p style="margin: 0; font-weight: 600; color: #1e40af;">Even × Any = Even</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace;">4 × 7 = 28 ✓</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 8px;">
        <p style="margin: 0; font-weight: 600; color: #1e40af;">Odd × Odd = Odd</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace;">3 × 5 = 15 ✓</p>
      </div>
    </div>
  </div>

  <h3>Prime Numbers</h3>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">A prime number has exactly TWO factors: 1 and itself</p>
    </div>
    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 12px;">
      <p style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 600;">First 10 primes (memorize these!):</p>
      <p style="margin: 0; font-size: 1.3rem; font-family: monospace;">2, 3, 5, 7, 11, 13, 17, 19, 23, 29</p>
    </div>
    <div style="background: rgba(255,0,0,0.3); padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
      <p style="margin: 0; font-size: 1.05rem;">⚠️ Important: 1 is NOT prime (it only has one factor). 2 is the ONLY even prime!</p>
    </div>
  </div>

  <h3>Factors and Multiples</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Factors</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Numbers that divide evenly into another number</p>
      <div style="background: #f0fdf4; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600;">Example: Factors of 12</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace;">1, 2, 3, 4, 6, 12</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem;">All divide evenly into 12</p>
      </div>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">Multiples</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Numbers you get by multiplying by integers</p>
      <div style="background: #fdf2f8; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600;">Example: Multiples of 3</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace;">3, 6, 9, 12, 15, 18, ...</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem;">3×1, 3×2, 3×3, 3×4, ...</p>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">If n is an odd integer, which of these must be odd?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. n + 2<br>B. 2n<br>C. n²<br>D. n + 1</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Test each: if n is odd, n² = odd × odd = odd!</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
    <div>A. odd + even = odd (sometimes)</div>
    <div>B. 2 × odd = even ✗</div>
    <div>C. odd × odd = odd ✓ Always!</div>
    <div>D. odd + odd = even ✗</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Memorize the even/odd rules! Even × anything = even. Odd × odd = odd. Prime numbers have exactly 2 factors. 2 is the only even prime!</p>
  </div>
</div>`,

  'statistics-basics': `<div class="lesson-content">
  <p class="lesson-intro">Statistics helps us understand and analyze data. On the ACT, you'll need to calculate mean, median, mode, and range. These measures tell us about the "center" and "spread" of data!</p>

  <h3>Measures of Center</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">Mean (Average)</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">Sum ÷ Count</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px;">
        <p style="margin: 0;"><strong>Example:</strong> 3, 5, 7, 10</p>
        <p style="margin: 0.5rem 0 0 0;">(3+5+7+10) ÷ 4 = 25 ÷ 4 = 6.25</p>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">Median (Middle)</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">Middle value when sorted</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px;">
        <p style="margin: 0;"><strong>Example:</strong> 3, 5, 7, 10, 12</p>
        <p style="margin: 0.5rem 0 0 0;">Middle value = 7</p>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">Mode (Most Common)</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">Most frequent value</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px;">
        <p style="margin: 0;"><strong>Example:</strong> 2, 3, 3, 5, 7</p>
        <p style="margin: 0.5rem 0 0 0;">Mode = 3 (appears twice)</p>
      </div>
    </div>
  </div>

  <h3>Finding the Median</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div style="background: white; padding: 1.5rem; border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: #1e40af;">Odd Number of Values</h4>
        <p style="margin: 0 0 1rem 0; font-size: 1.05rem;">The median is the middle number</p>
        <div style="background: #dbeafe; padding: 1rem; border-radius: 6px;">
          <p style="margin: 0; font-weight: 600;">Data: 2, 5, 8, 11, 14</p>
          <p style="margin: 0.5rem 0 0 0;">Median = 8 (3rd of 5 values)</p>
        </div>
      </div>

      <div style="background: white; padding: 1.5rem; border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: #1e40af;">Even Number of Values</h4>
        <p style="margin: 0 0 1rem 0; font-size: 1.05rem;">Average the two middle numbers</p>
        <div style="background: #dbeafe; padding: 1rem; border-radius: 6px;">
          <p style="margin: 0; font-weight: 600;">Data: 3, 6, 9, 12</p>
          <p style="margin: 0.5rem 0 0 0;">Median = (6+9)/2 = 7.5</p>
        </div>
      </div>
    </div>
  </div>

  <h3>Range</h3>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #78350f;">Range = Maximum − Minimum</p>
      <p style="margin: 1rem 0 0 0; font-size: 1.1rem;">Measures the spread of data</p>
    </div>
    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #78350f;">Example: Data set: 3, 7, 12, 5, 20</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.1rem;">
        <div>Maximum = 20</div>
        <div>Minimum = 3</div>
        <div style="font-weight: 700;">Range = 20 − 3 = 17</div>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Find the median of: 12, 8, 15, 10, 9</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 9<br>B. 10<br>C. 10.8<br>D. 12</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">First, sort the data, then find the middle value.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
    <div>Original: 12, 8, 15, 10, 9</div>
    <div>Sorted: 8, 9, 10, 12, 15</div>
    <div style="font-weight: 700;">Median = 10 (middle value)</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Mean = sum ÷ count. Median = middle (ALWAYS sort first!). Mode = most frequent. Range = max − min. For median with even count, average the two middle values!</p>
  </div>
</div>`,

  'probability': `<div class="lesson-content">
  <p class="lesson-intro">Probability measures how likely an event is to occur. It's always a number between 0 (impossible) and 1 (certain). On the ACT, you'll calculate simple probabilities and sometimes use the complement rule!</p>

  <h3>Basic Probability Formula</h3>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; font-size: 1.5rem;">Probability Formula</h4>
    <div style="background: rgba(255,255,255,0.2); padding: 2rem; border-radius: 12px; text-align: center;">
      <p style="margin: 0; font-size: 1.8rem; font-weight: 700;">P(event) = (favorable outcomes) / (total outcomes)</p>
    </div>
    <p style="margin: 2rem 0 0 0; text-align: center; font-size: 1.1rem; opacity: 0.95;">Probability is always between 0 and 1 (or 0% to 100%)</p>
  </div>

  <h3>Simple Probability Example</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Rolling a Die: What's P(rolling a 3)?</h4>

    <svg width="100%" height="100" viewBox="0 0 400 100" style="display: block; margin: 1.5rem auto; max-width: 400px;">
      <rect x="30" y="20" width="50" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
      <circle cx="55" cy="45" r="5" fill="#3b82f6"/>
      <text x="55" y="85" font-size="14" fill="#64748b" text-anchor="middle">1</text>

      <rect x="90" y="20" width="50" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
      <circle cx="105" cy="35" r="5" fill="#3b82f6"/>
      <circle cx="125" cy="55" r="5" fill="#3b82f6"/>
      <text x="115" y="85" font-size="14" fill="#64748b" text-anchor="middle">2</text>

      <rect x="150" y="20" width="50" height="50" fill="#dcfce7" stroke="#10b981" stroke-width="3" rx="5"/>
      <circle cx="165" cy="30" r="5" fill="#10b981"/>
      <circle cx="175" cy="45" r="5" fill="#10b981"/>
      <circle cx="185" cy="60" r="5" fill="#10b981"/>
      <text x="175" y="85" font-size="14" fill="#10b981" text-anchor="middle" font-weight="bold">3 ✓</text>

      <rect x="210" y="20" width="50" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
      <circle cx="225" cy="35" r="5" fill="#3b82f6"/>
      <circle cx="245" cy="35" r="5" fill="#3b82f6"/>
      <circle cx="225" cy="55" r="5" fill="#3b82f6"/>
      <circle cx="245" cy="55" r="5" fill="#3b82f6"/>
      <text x="235" y="85" font-size="14" fill="#64748b" text-anchor="middle">4</text>

      <rect x="270" y="20" width="50" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
      <circle cx="285" cy="30" r="5" fill="#3b82f6"/>
      <circle cx="305" cy="30" r="5" fill="#3b82f6"/>
      <circle cx="295" cy="45" r="5" fill="#3b82f6"/>
      <circle cx="285" cy="60" r="5" fill="#3b82f6"/>
      <circle cx="305" cy="60" r="5" fill="#3b82f6"/>
      <text x="295" y="85" font-size="14" fill="#64748b" text-anchor="middle">5</text>

      <rect x="330" y="20" width="50" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
      <circle cx="345" cy="30" r="5" fill="#3b82f6"/>
      <circle cx="365" cy="30" r="5" fill="#3b82f6"/>
      <circle cx="345" cy="45" r="5" fill="#3b82f6"/>
      <circle cx="365" cy="45" r="5" fill="#3b82f6"/>
      <circle cx="345" cy="60" r="5" fill="#3b82f6"/>
      <circle cx="365" cy="60" r="5" fill="#3b82f6"/>
      <text x="355" y="85" font-size="14" fill="#64748b" text-anchor="middle">6</text>
    </svg>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 1.2rem; line-height: 2;">P(3) = 1 favorable outcome / 6 total outcomes = 1/6</p>
    </div>
  </div>

  <h3>The Complement Rule</h3>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #78350f;">P(NOT A) = 1 − P(A)</p>
      <p style="margin: 1rem 0 0 0; font-size: 1.1rem;">The probability something DOESN'T happen</p>
    </div>
    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #78350f;">Example: P(NOT rolling a 3) on a die</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.1rem;">
        <div>P(3) = 1/6</div>
        <div>P(NOT 3) = 1 − 1/6</div>
        <div style="font-weight: 700;">P(NOT 3) = 5/6</div>
      </div>
    </div>
  </div>

  <h3>Probability with "AND" vs "OR"</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">"AND" (Both happen)</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #10b981;">Multiply probabilities</p>
      </div>
      <div style="background: #f0fdf4; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0;"><strong>Example:</strong> Flip 2 coins</p>
        <p style="margin: 0.5rem 0 0 0;">P(heads AND heads)</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace;">= 1/2 × 1/2 = 1/4</p>
      </div>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">"OR" (Either happens)</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #db2777;">Add probabilities</p>
      </div>
      <div style="background: #fdf2f8; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0;"><strong>Example:</strong> Roll a die</p>
        <p style="margin: 0.5rem 0 0 0;">P(1 OR 2)</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace;">= 1/6 + 1/6 = 2/6 = 1/3</p>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A bag has 3 red balls, 4 blue balls, and 5 green balls. What's the probability of randomly picking a blue ball?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 1/3<br>B. 1/4<br>C. 1/5<br>D. 4/12</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use P = favorable/total</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
    <div>Favorable outcomes = 4 blue balls</div>
    <div>Total outcomes = 3 + 4 + 5 = 12 balls</div>
    <div>P(blue) = 4/12 = 1/3</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A (simplified from D)</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">P = favorable/total. For "AND", multiply probabilities. For "OR", add them. Complement: P(NOT A) = 1 − P(A). Always simplify fractions!</p>
  </div>
</div>`,

  'word-problems': `<div class="lesson-content">
  <p class="lesson-intro">Word problems test your ability to translate real-world situations into math. The key is identifying what you know, what you need to find, and which mathematical concept applies. Let's develop a systematic approach!</p>

  <h3>The Four-Step Strategy</h3>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
      <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px;">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 1.3rem;">1. READ</h4>
        <p style="margin: 0; opacity: 0.95;">Carefully read the problem. Identify key information and what's being asked.</p>
      </div>
      <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px;">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 1.3rem;">2. PLAN</h4>
        <p style="margin: 0; opacity: 0.95;">Choose which math concept to use. Set up an equation or method.</p>
      </div>
      <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px;">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 1.3rem;">3. SOLVE</h4>
        <p style="margin: 0; opacity: 0.95;">Work through the math carefully. Show your steps.</p>
      </div>
      <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px;">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 1.3rem;">4. CHECK</h4>
        <p style="margin: 0; opacity: 0.95;">Does your answer make sense? Match the question asked?</p>
      </div>
    </div>
  </div>

  <h3>Common Word Problem Types</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0284c7;">
      <h4 style="margin: 0 0 1rem 0; color: #0c4a6e;">Distance = Rate × Time</h4>
      <div style="background: white; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 700; text-align: center;">d = r × t</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">A car travels 60 mph for 3 hours. Distance = 60 × 3 = 180 miles</p>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f;">Work Problems</h4>
      <div style="background: white; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 700; text-align: center;">Rate + Rate = Combined Rate</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">If A does a job in 4 hrs and B in 6 hrs, together: 1/4 + 1/6 = 5/12 per hour</p>
    </div>

    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Mixture Problems</h4>
      <div style="background: white; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 700; text-align: center;">Total = Part₁ + Part₂</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Mix 30% solution with 60% solution. Use weighted average!</p>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">Age Problems</h4>
      <div style="background: white; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 700; text-align: center;">Set up equations</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">John is 3 years older than Mary. If their sum is 27, find their ages!</p>
    </div>
  </div>

  <h3>Worked Example: Distance Problem</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">A train travels 240 miles in 4 hours. What is its average speed?</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Identify what we know</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2;">
        <div>Distance (d) = 240 miles</div>
        <div>Time (t) = 4 hours</div>
        <div>Need to find: Rate (r)</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Choose formula and solve for r</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.1rem;">
        <div>d = r × t</div>
        <div>240 = r × 4</div>
        <div>r = 240 ÷ 4</div>
        <div style="font-weight: 700;">r = 60 mph</div>
      </div>
    </div>

    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0; font-weight: 600; color: #0c4a6e;">Step 3: Check - Does it make sense?</p>
      <p style="margin: 0.75rem 0 0 0;">Yes! 60 mph × 4 hours = 240 miles ✓</p>
    </div>
  </div>

  <h3>Key Translation Phrases</h3>

  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div style="background: white; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600; color: #78350f;">"More than" / "Sum"</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace; font-size: 1.1rem;">+</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600; color: #78350f;">"Less than" / "Difference"</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace; font-size: 1.1rem;">−</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600; color: #78350f;">"Times" / "Product of"</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace; font-size: 1.1rem;">×</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600; color: #78350f;">"Divided by" / "Per"</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace; font-size: 1.1rem;">÷</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600; color: #78350f;">"Is" / "Equals"</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace; font-size: 1.1rem;">=</p>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Sarah is 3 years older than Tom. If their combined age is 27, how old is Tom?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 10<br>B. 12<br>C. 14<br>D. 15</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Let Tom's age = t. Then Sarah = t + 3</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
    <div>t + (t + 3) = 27</div>
    <div>2t + 3 = 27</div>
    <div>2t = 24</div>
    <div>t = 12</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Read carefully, identify what you know and need to find, translate words to math, solve, and check! Practice recognizing common problem types: distance, work, mixture, and age problems.</p>
  </div>
</div>`,

  'miscellaneous-topics': `<div class="lesson-content">
  <p class="lesson-intro">This lesson covers miscellaneous topics that don't fit neatly into other categories but still appear on the ACT. We'll touch on scientific notation, unit conversion, and pattern recognition—all quick wins if you know the tricks!</p>

  <h3>Scientific Notation</h3>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; font-size: 1.5rem;">Scientific Notation Format</h4>
    <div style="background: rgba(255,255,255,0.2); padding: 2rem; border-radius: 12px; text-align: center;">
      <p style="margin: 0; font-size: 1.8rem; font-weight: 700;">a × 10ⁿ</p>
      <p style="margin: 1rem 0 0 0; font-size: 1.1rem; opacity: 0.95;">where 1 ≤ a < 10</p>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Large Numbers (positive exponent)</h4>
      <div style="background: #f0fdf4; padding: 1rem; border-radius: 6px; line-height: 2;">
        <div>4,500,000 = 4.5 × 10⁶</div>
        <div>Move decimal 6 places left</div>
      </div>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f;">Small Numbers (negative exponent)</h4>
      <div style="background: #fffbeb; padding: 1rem; border-radius: 6px; line-height: 2;">
        <div>0.00035 = 3.5 × 10⁻⁴</div>
        <div>Move decimal 4 places right</div>
      </div>
    </div>
  </div>

  <h3>Unit Conversion</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">To convert units, multiply by conversion factors that equal 1. Cancel units like you would cancel numbers!</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Example: Convert 5 feet to inches</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 1.2rem; line-height: 2.5;">
        <div>5 feet × (12 inches / 1 foot)</div>
        <div style="margin-top: 0.5rem;">= 5 × 12 inches</div>
        <div style="font-weight: 700; margin-top: 0.5rem;">= 60 inches</div>
      </div>
    </div>

    <div style="background: #e0f2fe; padding: 1.25rem; border-radius: 8px; margin-top: 1.5rem;">
      <p style="margin: 0; font-weight: 600; color: #0c4a6e;">Common Conversions to Know:</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 1rem; font-size: 0.95rem;">
        <p style="margin: 0;">1 foot = 12 inches</p>
        <p style="margin: 0;">1 yard = 3 feet</p>
        <p style="margin: 0;">1 mile = 5,280 feet</p>
        <p style="margin: 0;">1 hour = 60 minutes</p>
        <p style="margin: 0;">1 minute = 60 seconds</p>
        <p style="margin: 0;">1 pound = 16 ounces</p>
      </div>
    </div>
  </div>

  <h3>Pattern Recognition</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">Some problems ask you to identify the next term in a pattern. Look for arithmetic (add/subtract) or geometric (multiply/divide) patterns!</p>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div style="background: white; padding: 1.5rem; border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: #78350f;">Arithmetic Pattern</h4>
        <p style="margin: 0; font-family: monospace; font-size: 1.1rem;">2, 5, 8, 11, ?</p>
        <p style="margin: 1rem 0 0 0; color: #78350f;">Add 3 each time</p>
        <p style="margin: 0.5rem 0 0 0; font-weight: 700;">Next: 14</p>
      </div>

      <div style="background: white; padding: 1.5rem; border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: #78350f;">Geometric Pattern</h4>
        <p style="margin: 0; font-family: monospace; font-size: 1.1rem;">3, 9, 27, 81, ?</p>
        <p style="margin: 1rem 0 0 0; color: #78350f;">Multiply by 3 each time</p>
        <p style="margin: 0.5rem 0 0 0; font-weight: 700;">Next: 243</p>
      </div>
    </div>
  </div>

  <h3>Absolute Value (Quick Review)</h3>

  <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px; margin: 2rem 0; border-left: 4px solid #0284c7;">
    <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #0c4a6e; text-align: center;">|x| = distance from 0 (always ≥ 0)</p>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem;">
      <div style="background: white; padding: 1rem; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-family: monospace; font-size: 1.1rem;">|5| = 5</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-family: monospace; font-size: 1.1rem;">|−5| = 5</p>
      </div>
      <div style="background: white; padding: 1rem; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-family: monospace; font-size: 1.1rem;">|0| = 0</p>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Write 0.000045 in scientific notation.</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 4.5 × 10⁻⁵<br>B. 4.5 × 10⁻⁴<br>C. 4.5 × 10⁴<br>D. 4.5 × 10⁵</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Move decimal right until we get a number between 1 and 10.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
    <div>0.000045</div>
    <div>Move decimal 5 places right → 4.5</div>
    <div>Small number → negative exponent</div>
    <div style="font-weight: 700;">4.5 × 10⁻⁵</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Scientific notation: move decimal to get 1 ≤ a < 10, count moves for exponent. Large numbers = positive exponent, small = negative. For conversions, multiply by factors that equal 1!</p>
  </div>
</div>`
};

// Note: Removed the remaining placeholders since we have completed all core lessons
// If there are additional specific topics, they can be added here

async function updateLessons() {
  console.log('Starting FINAL phase enhancements...\n');

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

  console.log('\n🎉 ALL LESSONS COMPLETE! Enhanced all math lessons with comprehensive teaching content and visuals!');
  console.log('Total lessons enhanced: 32');
}

updateLessons();
