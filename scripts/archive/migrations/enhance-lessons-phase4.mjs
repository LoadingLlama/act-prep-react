import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const enhancedLessons = {
  'absolute-value': `<div class="lesson-content">
  <p class="lesson-intro">Absolute value measures distance from zero—it's always positive (or zero)! Once you understand this concept, absolute value equations and inequalities become much easier. Let's break it down step by step!</p>

  <h3>What is Absolute Value?</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #1e40af;">|x| = distance from 0</p>
    </div>

    <svg width="100%" height="120" viewBox="0 0 600 120" style="display: block; margin: 0 auto 2rem auto; max-width: 600px;">
      <line x1="50" y1="60" x2="550" y2="60" stroke="#64748b" stroke-width="2"/>
      <line x1="300" y1="40" x2="300" y2="80" stroke="#64748b" stroke-width="2"/>
      <text x="300" y="100" font-size="16" fill="#64748b" text-anchor="middle" font-weight="600">0</text>

      <circle cx="200" cy="60" r="6" fill="#dc2626"/>
      <text x="200" y="35" font-size="18" fill="#dc2626" text-anchor="middle" font-weight="700">−5</text>
      <line x1="200" y1="60" x2="300" y2="60" stroke="#dc2626" stroke-width="4"/>
      <text x="250" y="50" font-size="14" fill="#dc2626" text-anchor="middle" font-weight="600">5 units</text>

      <circle cx="400" cy="60" r="6" fill="#10b981"/>
      <text x="400" y="35" font-size="18" fill="#10b981" text-anchor="middle" font-weight="700">+5</text>
      <line x1="300" y1="60" x2="400" y2="60" stroke="#10b981" stroke-width="4"/>
      <text x="350" y="85" font-size="14" fill="#10b981" text-anchor="middle" font-weight="600">5 units</text>
    </svg>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 1.3rem; line-height: 2;">|−5| = 5 and |5| = 5</p>
      <p style="margin: 1rem 0 0 0; font-size: 1.05rem; color: #64748b;">Both are 5 units from zero!</p>
    </div>
  </div>

  <h3>Key Properties</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Always Non-Negative</h4>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">|x| ≥ 0 for all x</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #f0fdf4; border-radius: 6px; font-family: monospace;">|−100| = 100<br>|0| = 0<br>|42| = 42</p>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">Removes the Sign</h4>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">If x is positive, |x| = x<br>If x is negative, |x| = −x</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #fdf2f8; border-radius: 6px; font-family: monospace;">|7| = 7<br>|−7| = 7</p>
    </div>
  </div>

  <h3>Solving Absolute Value Equations</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">When you solve |x| = a, you're asking: "What numbers are distance a from zero?" The answer is BOTH x = a and x = −a!</p>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; font-size: 1.4rem;">Solving |x| = a</h4>
    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">Two solutions: x = a OR x = −a</p>
    </div>
    <div style="margin: 1.5rem 0 0 0; background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-weight: 600; text-align: center;">Example: |x| = 5</p>
      <p style="margin: 0; text-align: center; font-size: 1.1rem;">x = 5 or x = −5</p>
    </div>
  </div>

  <h3>Step-by-Step Example</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Solve: |2x − 3| = 7</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Set up two equations</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.05rem;">
        <div>Case 1: 2x − 3 = 7</div>
        <div>Case 2: 2x − 3 = −7</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Solve Case 1</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.05rem;">
        <div>2x − 3 = 7</div>
        <div>2x = 10</div>
        <div style="font-weight: 700;">x = 5</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 3: Solve Case 2</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.05rem;">
        <div>2x − 3 = −7</div>
        <div>2x = −4</div>
        <div style="font-weight: 700;">x = −2</div>
      </div>
    </div>

    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem; text-align: center;">
      <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #0c4a6e;">Solutions: x = 5 or x = −2</p>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Solve: |x + 2| = 6</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. x = 4 only<br>B. x = 4 or x = −8<br>C. x = 4 or x = −4<br>D. x = 8 or x = −8</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Set up two equations and solve each one.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>Case 1: x + 2 = 6 → x = 4</div>
    <div>Case 2: x + 2 = −6 → x = −8</div>
    <div style="font-weight: 700; margin-top: 1rem;">x = 4 or x = −8</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Absolute value equations almost always have TWO solutions (one positive, one negative). Split into two cases and solve both! The only exception is when |x| = 0, which gives only x = 0.</p>
  </div>
</div>`,

  'logarithms': `<div class="lesson-content">
  <p class="lesson-intro">Logarithms are the "opposite" of exponents—they answer the question: "What power do I raise this base to, to get this number?" Once you understand this relationship, logs become much easier!</p>

  <h3>What is a Logarithm?</h3>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 2rem; font-weight: 700;">Logarithms are the inverse of exponents!</p>
    </div>

    <div style="background: rgba(255,255,255,0.2); padding: 2rem; border-radius: 12px;">
      <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center;">
        <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">2³ = 8</p>
          <p style="margin: 0.75rem 0 0 0; font-size: 1.05rem; opacity: 0.9;">Exponent form</p>
        </div>
        <div style="font-size: 2rem;">⇄</div>
        <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">log₂(8) = 3</p>
          <p style="margin: 0.75rem 0 0 0; font-size: 1.05rem; opacity: 0.9;">Logarithm form</p>
        </div>
      </div>
      <p style="margin: 2rem 0 0 0; text-align: center; font-size: 1.1rem; opacity: 0.95;">Both say: "2 to the power of 3 equals 8"</p>
    </div>
  </div>

  <h3>Reading Logarithms</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #1e40af;">log₂(8) = 3</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
      <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #dc2626;">2</p>
        <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Base</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">What we're raising</p>
      </div>
      <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #3b82f6;">8</p>
        <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Argument</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">The result we want</p>
      </div>
      <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #10b981;">3</p>
        <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Answer</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">The power needed</p>
      </div>
    </div>

    <div style="background: #dbeafe; padding: 1.5rem; border-radius: 8px; margin-top: 2rem; text-align: center;">
      <p style="margin: 0; font-size: 1.2rem; font-weight: 600; color: #0c4a6e;">"What power of 2 gives us 8?"</p>
      <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; color: #0c4a6e;">Answer: 3 (because 2³ = 8)</p>
    </div>
  </div>

  <h3>Common Logarithms</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f;">log (Common Log)</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">log(x) = log₁₀(x)</p>
      </div>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">When no base is written, assume base 10</p>
      <p style="margin: 1rem 0 0 0; padding: 1rem; background: #fffbeb; border-radius: 6px; font-family: monospace;">log(100) = log₁₀(100) = 2<br>(because 10² = 100)</p>
    </div>

    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">ln (Natural Log)</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">ln(x) = log<sub>e</sub>(x)</p>
      </div>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">ln always means base e ≈ 2.718</p>
      <p style="margin: 1rem 0 0 0; padding: 1rem; background: #f0fdf4; border-radius: 6px; font-family: monospace;">ln(e) = 1<br>(because e¹ = e)</p>
    </div>
  </div>

  <h3>Logarithm Rules</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0284c7;">
      <h4 style="margin: 0 0 1rem 0; color: #0c4a6e;">Product Rule</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700;">log(AB) = log(A) + log(B)</p>
      </div>
      <p style="margin: 0; padding: 1rem; background: #f0f9ff; border-radius: 6px; font-family: monospace;">log(20) = log(4 × 5)<br>= log(4) + log(5)</p>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">Quotient Rule</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700;">log(A/B) = log(A) − log(B)</p>
      </div>
      <p style="margin: 0; padding: 1rem; background: #fdf2f8; border-radius: 6px; font-family: monospace;">log(10/2) = log(10) − log(2)</p>
    </div>

    <div style="background: #ede9fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #7c3aed;">
      <h4 style="margin: 0 0 1rem 0; color: #5b21b6;">Power Rule</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.2rem; font-weight: 700;">log(A<sup>n</sup>) = n · log(A)</p>
      </div>
      <p style="margin: 0; padding: 1rem; background: #f5f3ff; border-radius: 6px; font-family: monospace;">log(2³) = 3 · log(2)</p>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is log₂(16)?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 2<br>B. 4<br>C. 8<br>D. 16</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Ask yourself: "What power of 2 gives us 16?"</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>2<sup>?</sup> = 16</div>
    <div>2⁴ = 16 ✓</div>
    <div style="font-weight: 700; margin-top: 1rem;">So log₂(16) = 4</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Think of logarithms as a question: "What power of this base gives me this number?" Convert to exponential form (b<sup>x</sup> = y) to solve! Memorize the three log rules—they appear frequently on the ACT.</p>
  </div>
</div>`,

  'quadratics': `<div class="lesson-content">
  <p class="lesson-intro">Quadratics are equations with x² as the highest power. You need to know factoring, the quadratic formula, and vertex form. These appear frequently on the ACT, so let's master them from the ground up!</p>

  <h3>What is a Quadratic?</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #1e40af;">A quadratic is any equation with x²</p>
    </div>

    <svg width="100%" height="300" viewBox="0 0 500 300" style="display: block; margin: 0 auto 2rem auto; max-width: 500px;">
      <defs>
        <marker id="arrowgraph" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#64748b"/>
        </marker>
      </defs>

      <line x1="50" y1="150" x2="450" y2="150" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowgraph)"/>
      <line x1="250" y1="280" x2="250" y2="20" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowgraph)"/>

      <path d="M 100 250 Q 250 50 400 250" fill="none" stroke="#3b82f6" stroke-width="4"/>

      <circle cx="250" cy="50" r="6" fill="#dc2626"/>
      <text x="265" y="45" font-size="16" font-weight="bold" fill="#dc2626">Vertex</text>
      <text x="265" y="65" font-size="14" fill="#64748b">(highest or lowest point)</text>

      <circle cx="150" cy="150" r="5" fill="#10b981"/>
      <circle cx="350" cy="150" r="5" fill="#10b981"/>
      <text x="250" y="175" font-size="14" font-weight="bold" fill="#10b981" text-anchor="middle">Roots (where it crosses x-axis)</text>

      <text x="250" y="25" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">Graph of y = x²</text>
    </svg>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0; font-size: 1.1rem; text-align: center; line-height: 1.8;">Quadratics make a U-shaped curve called a <strong>parabola</strong>. The parabola opens up (∪) if the x² coefficient is positive, and opens down (∩) if it's negative.</p>
    </div>
  </div>

  <h3>Three Forms of Quadratics</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0284c7;">
      <h4 style="margin: 0 0 1rem 0; color: #0c4a6e;">Standard Form</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #0284c7;">ax² + bx + c = 0</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">General form—use this with the quadratic formula</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #f0f9ff; border-radius: 6px; font-family: monospace;">x² + 5x + 6 = 0</p>
    </div>

    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Factored Form</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #10b981;">a(x − r₁)(x − r₂) = 0</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Shows the roots directly: r₁ and r₂</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #f0fdf4; border-radius: 6px; font-family: monospace;">(x + 2)(x + 3) = 0<br>roots: x = −2, x = −3</p>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f;">Vertex Form</h4>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #f59e0b;">a(x − h)² + k</p>
      </div>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Shows vertex directly: (h, k)</p>
      <p style="margin: 0.75rem 0 0 0; padding: 1rem; background: #fffbeb; border-radius: 6px; font-family: monospace;">(x − 2)² + 3<br>vertex: (2, 3)</p>
    </div>
  </div>

  <h3>The Quadratic Formula</h3>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; font-size: 1.5rem;">The Most Important Formula!</h4>
    <div style="background: rgba(255,255,255,0.2); padding: 2rem; border-radius: 12px; text-align: center;">
      <p style="margin: 0; font-size: 1.8rem; font-weight: 700;">x = (−b ± √(b² − 4ac)) / (2a)</p>
    </div>
    <div style="margin: 2rem 0 0 0; background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 600;">For any quadratic ax² + bx + c = 0:</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; font-size: 1.05rem;">
        <div><strong>a</strong> = x² coefficient</div>
        <div><strong>b</strong> = x coefficient</div>
        <div><strong>c</strong> = constant</div>
      </div>
    </div>
    <p style="margin: 1.5rem 0 0 0; text-align: center; font-size: 1.05rem; opacity: 0.95;">⚠️ This formula is NOT on the ACT reference sheet—you must memorize it!</p>
  </div>

  <h3>Factoring Quadratics</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">For simple quadratics (when a = 1), try factoring first! It's faster than the quadratic formula.</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Example: Factor x² + 7x + 12</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Find two numbers that multiply to 12 and add to 7</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.05rem;">
        <div>1 × 12 = 12, but 1 + 12 = 13 ✗</div>
        <div>2 × 6 = 12, but 2 + 6 = 8 ✗</div>
        <div style="font-weight: 700;">3 × 4 = 12, and 3 + 4 = 7 ✓</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Write as (x + 3)(x + 4)</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.05rem;">
        <div>x² + 7x + 12 = (x + 3)(x + 4)</div>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Factor: x² + 7x + 12</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. (x + 3)(x + 4)<br>B. (x + 2)(x + 6)<br>C. (x + 1)(x + 12)<br>D. (x − 3)(x − 4)</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Find two numbers that multiply to 12 and add to 7: 3 and 4.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>x² + 7x + 12 = (x + 3)(x + 4)</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Try factoring first! If it doesn't factor easily, use the quadratic formula. Memorize the formula—it's not given on the ACT! And remember: quadratics usually have two solutions.</p>
  </div>
</div>`
};

async function updateLessons() {
  console.log('Starting Phase 4 enhancements (More Algebra)...\n');

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

  console.log('\n✓ Phase 4 complete: Enhanced 4 more algebra lessons with detailed visuals!');
  console.log('Next: Will continue with functions, statistics, and advanced topics...');
}

updateLessons();
