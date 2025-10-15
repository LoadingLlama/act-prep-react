import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const enhancedLessons = {
  'transforming-functions': `<div class="lesson-content">
  <p class="lesson-intro">Function transformations change the position, size, or orientation of a function's graph. Understanding how adding, subtracting, and multiplying affect f(x) will help you visualize and solve transformation problems quickly!</p>

  <h3>The Parent Function</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">We'll use f(x) = x² as our parent function to see how transformations work.</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <svg width="100%" height="300" viewBox="0 0 400 300" style="display: block; margin: 0 auto; max-width: 400px;">
      <defs>
        <marker id="arrowtrans" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/>
        </marker>
      </defs>

      <line x1="30" y1="150" x2="370" y2="150" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowtrans)"/>
      <line x1="200" y1="280" x2="200" y2="20" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowtrans)"/>

      <path d="M 100 250 Q 200 50 300 250" fill="none" stroke="#3b82f6" stroke-width="4"/>

      <circle cx="200" cy="50" r="6" fill="#dc2626"/>
      <text x="215" y="45" font-size="16" font-weight="bold" fill="#dc2626">Vertex (0, 0)</text>

      <text x="200" y="25" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">f(x) = x²</text>
    </svg>
  </div>

  <h3>Vertical Transformations</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">f(x) + k</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700;">Shifts UP k units</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-size: 0.95rem;"><strong>Example:</strong> f(x) + 3</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem;">Moves entire graph up 3 units</p>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">f(x) − k</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700;">Shifts DOWN k units</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-size: 0.95rem;"><strong>Example:</strong> f(x) − 2</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem;">Moves entire graph down 2 units</p>
      </div>
    </div>
  </div>

  <h3>Horizontal Transformations</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">f(x − h)</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700;">Shifts RIGHT h units</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-size: 0.95rem;"><strong>Example:</strong> f(x − 4)</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem;">Moves entire graph right 4 units</p>
      </div>
      <div style="background: rgba(255,0,0,0.3); padding: 0.75rem; border-radius: 6px; margin-top: 1rem;">
        <p style="margin: 0; font-size: 0.9rem;">⚠️ Opposite sign! (x − h) shifts RIGHT</p>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">f(x + h)</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700;">Shifts LEFT h units</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-size: 0.95rem;"><strong>Example:</strong> f(x + 3)</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem;">Moves entire graph left 3 units</p>
      </div>
      <div style="background: rgba(255,0,0,0.3); padding: 0.75rem; border-radius: 6px; margin-top: 1rem;">
        <p style="margin: 0; font-size: 0.9rem;">⚠️ Opposite sign! (x + h) shifts LEFT</p>
      </div>
    </div>
  </div>

  <h3>Vertical Stretch and Compression</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">a · f(x) where |a| > 1</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #10b981;">Vertical STRETCH</p>
      </div>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">Makes graph taller</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #f0fdf4; border-radius: 6px; font-family: monospace;">2f(x): twice as tall</p>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f;">a · f(x) where 0 < |a| < 1</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #f59e0b;">Vertical COMPRESSION</p>
      </div>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">Makes graph shorter</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #fffbeb; border-radius: 6px; font-family: monospace;">(1/2)f(x): half as tall</p>
    </div>
  </div>

  <h3>Reflection</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0284c7;">
      <h4 style="margin: 0 0 1rem 0; color: #0c4a6e;">−f(x)</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #0284c7;">Flip over x-axis</p>
      </div>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">Upside down!</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #f0f9ff; border-radius: 6px; font-family: monospace;">−x² flips parabola down</p>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">f(−x)</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #db2777;">Flip over y-axis</p>
      </div>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">Mirror image!</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #fdf2f8; border-radius: 6px; font-family: monospace;">(−x)² = x² (no change for even functions)</p>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">How does the graph of g(x) = f(x) + 5 compare to f(x)?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. Shifted left 5<br>B. Shifted right 5<br>C. Shifted up 5<br>D. Shifted down 5</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Adding to the outside shifts up.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>g(x) = f(x) + 5</div>
    <div>Every y-value increases by 5</div>
    <div style="font-weight: 700;">Shifted UP 5 units</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Outside changes (f(x) ± k) shift vertically. Inside changes (f(x ± h)) shift horizontally—but the sign is OPPOSITE! f(x − 3) shifts RIGHT 3, f(x + 3) shifts LEFT 3.</p>
  </div>
</div>`,

  'exponential-growth': `<div class="lesson-content">
  <p class="lesson-intro">Exponential growth and decay appear in real-world problems about population, money, and radioactive decay. The key is recognizing the pattern: the quantity multiplies by a constant factor in each time period!</p>

  <h3>What is Exponential Growth?</h3>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 2rem; font-weight: 700;">Exponential Growth Formula</p>
    </div>

    <div style="background: rgba(255,255,255,0.2); padding: 2rem; border-radius: 12px; text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 1.8rem; font-weight: 700;">y = a(1 + r)ᵗ</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">a</p>
        <p style="margin: 0.5rem 0 0 0;">Initial amount</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">r</p>
        <p style="margin: 0.5rem 0 0 0;">Growth rate (as decimal)</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">t</p>
        <p style="margin: 0.5rem 0 0 0;">Time periods</p>
      </div>
    </div>
  </div>

  <h3>Growth vs. Decay</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 2rem; border-radius: 12px; border: 3px solid #10b981;">
      <h4 style="margin: 0 0 1.5rem 0; color: #065f46; text-align: center; font-size: 1.3rem;">Growth (Increase)</h4>
      <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <p style="margin: 0; text-align: center; font-size: 1.4rem; font-weight: 700; color: #10b981;">y = a(1 + r)ᵗ</p>
      </div>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Use when quantity INCREASES by r% each period</p>
      <div style="background: #f0fdf4; padding: 1.25rem; border-radius: 8px;">
        <p style="margin: 0; font-weight: 600;">Example:</p>
        <p style="margin: 0.5rem 0 0 0;">Population grows 5% per year</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace; color: #10b981;">y = a(1.05)ᵗ</p>
      </div>
    </div>

    <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; border: 3px solid #f59e0b;">
      <h4 style="margin: 0 0 1.5rem 0; color: #78350f; text-align: center; font-size: 1.3rem;">Decay (Decrease)</h4>
      <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <p style="margin: 0; text-align: center; font-size: 1.4rem; font-weight: 700; color: #f59e0b;">y = a(1 − r)ᵗ</p>
      </div>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Use when quantity DECREASES by r% each period</p>
      <div style="background: #fffbeb; padding: 1.25rem; border-radius: 8px;">
        <p style="margin: 0; font-weight: 600;">Example:</p>
        <p style="margin: 0.5rem 0 0 0;">Value depreciates 20% per year</p>
        <p style="margin: 0.5rem 0 0 0; font-family: monospace; color: #f59e0b;">y = a(0.80)ᵗ</p>
      </div>
    </div>
  </div>

  <h3>Step-by-Step Example</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Example: A population of 500 grows 8% per year. What's the population after 3 years?</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Identify the values</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2;">
        <div>a = 500 (initial population)</div>
        <div>r = 0.08 (8% as decimal)</div>
        <div>t = 3 (years)</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Use the growth formula</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.1rem;">
        <div>y = a(1 + r)ᵗ</div>
        <div>y = 500(1 + 0.08)³</div>
        <div>y = 500(1.08)³</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 3: Calculate</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.1rem;">
        <div>1.08³ ≈ 1.2597</div>
        <div>500 × 1.2597 ≈ 629.85</div>
        <div style="font-weight: 700;">Population ≈ 630</div>
      </div>
    </div>
  </div>

  <h3>Compound Interest</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">Compound interest is a special case of exponential growth where money grows based on interest rate!</p>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">Compound Interest Formula</p>
    </div>

    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 12px; text-align: center; margin-bottom: 1.5rem;">
      <p style="margin: 0; font-size: 1.6rem; font-weight: 700;">A = P(1 + r/n)ⁿᵗ</p>
    </div>

    <div style="background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-size: 1.1rem;"><strong>P</strong> = Principal (initial amount)</p>
      <p style="margin: 0 0 1rem 0; font-size: 1.1rem;"><strong>r</strong> = Annual interest rate (as decimal)</p>
      <p style="margin: 0 0 1rem 0; font-size: 1.1rem;"><strong>n</strong> = Times compounded per year</p>
      <p style="margin: 0; font-size: 1.1rem;"><strong>t</strong> = Number of years</p>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A car worth $20,000 depreciates 15% per year. What's its value after 2 years?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. $14,450<br>B. $15,000<br>C. $16,500<br>D. $17,000</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use decay formula: y = a(1 − r)ᵗ</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>y = 20000(1 − 0.15)²</div>
    <div>y = 20000(0.85)²</div>
    <div>y = 20000(0.7225)</div>
    <div>y = $14,450</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Growth: multiply by (1 + r). Decay: multiply by (1 − r). The exponent t is always the number of time periods. Convert percentages to decimals before calculating!</p>
  </div>
</div>`,

  'sequences': `<div class="lesson-content">
  <p class="lesson-intro">Sequences are ordered lists of numbers following a pattern. The two most important types for the ACT are arithmetic sequences (add the same number each time) and geometric sequences (multiply by the same number each time).</p>

  <h3>Arithmetic Sequences</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #1e40af;">Add the same amount each time</p>
      <p style="margin: 1rem 0 0 0; font-size: 1.2rem; font-family: monospace;">3, 7, 11, 15, 19, ...</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; color: #64748b;">+4 each time</p>
    </div>

    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; color: white; margin-bottom: 1.5rem;">
      <h4 style="margin: 0 0 1rem 0; text-align: center; font-size: 1.3rem;">Arithmetic Sequence Formula</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 1.6rem; font-weight: 700;">aₙ = a₁ + (n − 1)d</p>
      </div>
      <div style="margin: 1.5rem 0 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <div style="text-align: center;">
          <p style="margin: 0; font-size: 1.2rem; font-weight: 600;">a₁</p>
          <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">First term</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; font-size: 1.2rem; font-weight: 600;">d</p>
          <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Common difference</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; font-size: 1.2rem; font-weight: 600;">n</p>
          <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Term number</p>
        </div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #1e40af;">Example: Find the 10th term of 3, 7, 11, 15, ...</p>
      <div style="padding-left: 1rem; border-left: 3px solid #3b82f6; line-height: 2; font-size: 1.05rem;">
        <div>a₁ = 3 (first term)</div>
        <div>d = 4 (common difference)</div>
        <div>n = 10</div>
        <div style="margin-top: 0.5rem;">a₁₀ = 3 + (10 − 1)(4)</div>
        <div>a₁₀ = 3 + 36</div>
        <div style="font-weight: 700;">a₁₀ = 39</div>
      </div>
    </div>
  </div>

  <h3>Geometric Sequences</h3>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #78350f;">Multiply by the same amount each time</p>
      <p style="margin: 1rem 0 0 0; font-size: 1.2rem; font-family: monospace;">2, 6, 18, 54, 162, ...</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; color: #78350f;">×3 each time</p>
    </div>

    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 12px; color: white; margin-bottom: 1.5rem;">
      <h4 style="margin: 0 0 1rem 0; text-align: center; font-size: 1.3rem;">Geometric Sequence Formula</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 1.6rem; font-weight: 700;">aₙ = a₁ · r⁽ⁿ⁻¹⁾</p>
      </div>
      <div style="margin: 1.5rem 0 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <div style="text-align: center;">
          <p style="margin: 0; font-size: 1.2rem; font-weight: 600;">a₁</p>
          <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">First term</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; font-size: 1.2rem; font-weight: 600;">r</p>
          <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Common ratio</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; font-size: 1.2rem; font-weight: 600;">n</p>
          <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Term number</p>
        </div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #78350f;">Example: Find the 6th term of 2, 6, 18, 54, ...</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.05rem;">
        <div>a₁ = 2 (first term)</div>
        <div>r = 3 (common ratio: 6÷2 = 3)</div>
        <div>n = 6</div>
        <div style="margin-top: 0.5rem;">a₆ = 2 · 3⁽⁶⁻¹⁾</div>
        <div>a₆ = 2 · 3⁵</div>
        <div>a₆ = 2 · 243</div>
        <div style="font-weight: 700;">a₆ = 486</div>
      </div>
    </div>
  </div>

  <h3>Quick Identification</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Arithmetic?</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Subtract consecutive terms. If the difference is constant, it's arithmetic!</p>
      <div style="background: #f0fdf4; padding: 1rem; border-radius: 6px; font-family: monospace;">
        <div>5, 9, 13, 17</div>
        <div>9−5=4, 13−9=4, 17−13=4 ✓</div>
        <div style="margin-top: 0.5rem; font-weight: 700;">Arithmetic with d=4</div>
      </div>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">Geometric?</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Divide consecutive terms. If the ratio is constant, it's geometric!</p>
      <div style="background: #fdf2f8; padding: 1rem; border-radius: 6px; font-family: monospace;">
        <div>4, 12, 36, 108</div>
        <div>12÷4=3, 36÷12=3, 108÷36=3 ✓</div>
        <div style="margin-top: 0.5rem; font-weight: 700;">Geometric with r=3</div>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">In the arithmetic sequence 5, 12, 19, 26, ..., what is the 8th term?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 47<br>B. 51<br>C. 54<br>D. 56</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use aₙ = a₁ + (n − 1)d with a₁ = 5, d = 7, n = 8</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>a₈ = 5 + (8 − 1)(7)</div>
    <div>a₈ = 5 + 7(7)</div>
    <div>a₈ = 5 + 49</div>
    <div>a₈ = 54</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Arithmetic sequences ADD a constant (use aₙ = a₁ + (n−1)d). Geometric sequences MULTIPLY by a constant (use aₙ = a₁ · r⁽ⁿ⁻¹⁾). Test consecutive terms to identify which type!</p>
  </div>
</div>`,

  'ratios-proportions': `<div class="lesson-content">
  <p class="lesson-intro">Ratios compare quantities, and proportions state that two ratios are equal. These concepts appear in many ACT problems, from scaling recipes to solving for unknown values. Let's master them step by step!</p>

  <h3>What is a Ratio?</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #1e40af;">A ratio compares two quantities</p>
    </div>

    <div style="background: white; padding: 2rem; border-radius: 8px;">
      <p style="margin: 0 0 1.5rem 0; font-size: 1.1rem; text-align: center;">If there are 3 cats and 5 dogs, the ratio of cats to dogs is:</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: center;">
        <div>
          <p style="margin: 0; font-size: 1.8rem; font-weight: 700; color: #3b82f6;">3:5</p>
          <p style="margin: 0.5rem 0 0 0; color: #64748b;">Colon notation</p>
        </div>
        <div>
          <p style="margin: 0; font-size: 1.8rem; font-weight: 700; color: #10b981;">3/5</p>
          <p style="margin: 0.5rem 0 0 0; color: #64748b;">Fraction form</p>
        </div>
        <div>
          <p style="margin: 0; font-size: 1.8rem; font-weight: 700; color: #f59e0b;">3 to 5</p>
          <p style="margin: 0.5rem 0 0 0; color: #64748b;">Words</p>
        </div>
      </div>
    </div>
  </div>

  <h3>Working with Ratios</h3>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #78350f; font-size: 1.3rem;">Example: If the ratio of boys to girls is 3:4 and there are 21 boys, how many girls are there?</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 1: Set up the ratio</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.1rem;">
        <div>boys:girls = 3:4</div>
        <div>This means for every 3 boys, there are 4 girls</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 2: Find the multiplier</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.1rem;">
        <div>3 × ? = 21</div>
        <div>? = 7</div>
        <div>The multiplier is 7</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 3: Apply to girls</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.1rem;">
        <div>Girls = 4 × 7</div>
        <div style="font-weight: 700;">Girls = 28</div>
      </div>
    </div>
  </div>

  <h3>Proportions</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">A proportion states that two ratios are equal. We can cross-multiply to solve!</p>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; font-size: 1.4rem;">Cross-Multiplication Method</h4>
    <div style="background: rgba(255,255,255,0.2); padding: 2rem; border-radius: 12px; text-align: center;">
      <p style="margin: 0 0 1.5rem 0; font-size: 1.6rem; font-weight: 700;">a/b = c/d  →  ad = bc</p>
      <p style="margin: 0; font-size: 1.1rem; opacity: 0.95;">Multiply diagonally across the equals sign!</p>
    </div>
  </div>

  <h3>Step-by-Step: Solving Proportions</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Example: Solve for x: 5/8 = x/24</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Cross-multiply</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.1rem;">
        <div>5 × 24 = 8 × x</div>
        <div>120 = 8x</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Solve for x</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.1rem;">
        <div>120 = 8x</div>
        <div>120 ÷ 8 = x</div>
        <div style="font-weight: 700;">x = 15</div>
      </div>
    </div>
  </div>

  <h3>Unit Rates</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">A unit rate compares a quantity to ONE unit of another quantity. Examples: miles per hour, price per item.</p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Finding Unit Rate</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Divide the first quantity by the second</p>
      <div style="background: #f0fdf4; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600;">Example:</p>
        <p style="margin: 0.5rem 0 0 0;">300 miles in 5 hours</p>
        <p style="margin: 0.5rem 0 0 0;">300 ÷ 5 = 60 mph</p>
      </div>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">Using Unit Rate</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Multiply the unit rate by the quantity</p>
      <div style="background: #fdf2f8; padding: 1rem; border-radius: 6px;">
        <p style="margin: 0; font-weight: 600;">Example:</p>
        <p style="margin: 0.5rem 0 0 0;">At 60 mph for 3.5 hours</p>
        <p style="margin: 0.5rem 0 0 0;">60 × 3.5 = 210 miles</p>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">If 6/x = 9/12, what is x?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 4<br>B. 6<br>C. 8<br>D. 10</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Cross-multiply and solve.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>6/x = 9/12</div>
    <div>6 × 12 = 9 × x</div>
    <div>72 = 9x</div>
    <div>x = 8</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">For ratio problems, find the multiplier to scale up or down. For proportions, cross-multiply: a/b = c/d becomes ad = bc. Always check your answer makes sense!</p>
  </div>
</div>`
};

async function updateLessons() {
  console.log('Starting Phase 6 enhancements...\n');

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

  console.log('\n✓ Phase 6 complete: Enhanced 4 more lessons!');
  console.log('Next: Will continue with statistics and remaining topics...');
}

updateLessons();
