import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const enhancedLessons = {
  'algebra-skills': `<div class="lesson-content">
  <p class="lesson-intro">Strong algebra skills are the foundation for success on the ACT Math section. In this lesson, we'll review essential techniques like combining like terms, distributing, and manipulating equations. These skills will help you solve problems faster and more accurately!</p>

  <h3>Combining Like Terms</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">Like terms have the same variable AND the same exponent. You can add or subtract like terms by adding/subtracting their coefficients.</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div style="background: #dcfce7; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
        <h4 style="margin: 0 0 1rem 0; color: #065f46;">✓ Like Terms</h4>
        <p style="margin: 0.5rem 0; font-family: monospace; font-size: 1.05rem;">3x + 5x = 8x</p>
        <p style="margin: 0.5rem 0; font-family: monospace; font-size: 1.05rem;">2x² + 7x² = 9x²</p>
        <p style="margin: 0.5rem 0; font-family: monospace; font-size: 1.05rem;">4 + 9 = 13</p>
        <p style="margin: 1rem 0 0 0; font-size: 0.95rem; color: #065f46;">Same variable, same exponent ✓</p>
      </div>

      <div style="background: #fee2e2; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #dc2626;">
        <h4 style="margin: 0 0 1rem 0; color: #991b1b;">✗ NOT Like Terms</h4>
        <p style="margin: 0.5rem 0; font-family: monospace; font-size: 1.05rem;">3x + 5y ≠ combine</p>
        <p style="margin: 0.5rem 0; font-family: monospace; font-size: 1.05rem;">2x² + 7x ≠ combine</p>
        <p style="margin: 0.5rem 0; font-family: monospace; font-size: 1.05rem;">4x + 9 ≠ combine</p>
        <p style="margin: 1rem 0 0 0; font-size: 0.95rem; color: #991b1b;">Different variables or exponents ✗</p>
      </div>
    </div>
  </div>

  <h3>Distributive Property</h3>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; font-size: 1.4rem;">a(b + c) = ab + ac</h4>
    <p style="margin: 0 0 2rem 0; text-align: center; font-size: 1.1rem; opacity: 0.95;">Multiply the outside term by EACH term inside</p>

    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 600;">Example 1:</p>
      <div style="font-size: 1.15rem; line-height: 2.5; font-family: monospace;">
        <div>3(x + 5)</div>
        <div>= 3·x + 3·5</div>
        <div>= 3x + 15</div>
      </div>
    </div>

    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 12px;">
      <p style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 600;">Example 2:</p>
      <div style="font-size: 1.15rem; line-height: 2.5; font-family: monospace;">
        <div>−2(4x − 7)</div>
        <div>= −2·4x + (−2)·(−7)</div>
        <div>= −8x + 14</div>
      </div>
    </div>
  </div>

  <h3>Factoring Out Common Factors</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">Factoring is the reverse of distributing—you pull out a common factor from all terms.</p>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #78350f; font-size: 1.3rem;">Example: Factor 6x + 15</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 1: Find the GCF (Greatest Common Factor)</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2;">
        <div>Factors of 6: 1, 2, 3, 6</div>
        <div>Factors of 15: 1, 3, 5, 15</div>
        <div style="font-weight: 700;">GCF = 3</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 2: Factor out the GCF</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.1rem;">
        <div>6x + 15 = 3(2x + 5)</div>
      </div>
    </div>
  </div>

  <h3>Solving for a Variable</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">To isolate a variable, use inverse operations to undo what's being done to it. Work in reverse order of operations (PEMDAS backwards).</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Example: Solve for x: 3x + 7 = 22</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Subtract 7 from both sides</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2;">
        <div>3x + 7 = 22</div>
        <div>3x = 15</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Divide both sides by 3</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2;">
        <div>3x = 15</div>
        <div style="font-weight: 700;">x = 5</div>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Simplify: 5(2x − 3) + 4x</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 14x − 15<br>B. 14x − 3<br>C. 10x − 15<br>D. 6x − 3</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">First distribute, then combine like terms.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>5(2x − 3) + 4x</div>
    <div>= 10x − 15 + 4x</div>
    <div>= 14x − 15</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Master the basics: combine like terms (same variable and exponent), distribute carefully (watch negative signs!), and solve equations step by step. These skills appear in almost every ACT math problem!</p>
  </div>
</div>`,

  'systems-equations': `<div class="lesson-content">
  <p class="lesson-intro">A system of equations is two or more equations with the same variables. The solution is the point where all equations are true at the same time. We'll learn two powerful methods: substitution and elimination!</p>

  <h3>What is a System of Equations?</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #1e40af;">Find values that make BOTH equations true!</p>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
      <div style="text-align: center; font-family: monospace; font-size: 1.2rem; line-height: 2.5;">
        <div style="color: #dc2626;">2x + y = 10</div>
        <div style="color: #3b82f6;">x − y = 2</div>
      </div>
    </div>

    <svg width="100%" height="300" viewBox="0 0 400 300" style="display: block; margin: 0 auto; max-width: 400px;">
      <defs>
        <marker id="arrowsys" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/>
        </marker>
      </defs>

      <line x1="30" y1="150" x2="370" y2="150" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowsys)"/>
      <line x1="200" y1="270" x2="200" y2="30" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowsys)"/>

      <line x1="60" y1="60" x2="340" y2="240" stroke="#dc2626" stroke-width="3"/>
      <text x="320" y="220" font-size="14" font-weight="bold" fill="#dc2626">2x + y = 10</text>

      <line x1="100" y1="250" x2="300" y2="70" stroke="#3b82f6" stroke-width="3"/>
      <text x="280" y="90" font-size="14" font-weight="bold" fill="#3b82f6">x − y = 2</text>

      <circle cx="240" cy="120" r="8" fill="#10b981" stroke="#065f46" stroke-width="3"/>
      <text x="255" y="115" font-size="16" font-weight="bold" fill="#10b981">(4, 2)</text>
      <text x="250" y="135" font-size="14" fill="#065f46">Solution!</text>
    </svg>

    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 8px; margin-top: 2rem; text-align: center;">
      <p style="margin: 0; font-size: 1.1rem; line-height: 1.8; color: #065f46;">The lines intersect at (4, 2), so x = 4 and y = 2 is the solution!</p>
    </div>
  </div>

  <h3>Method 1: Substitution</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">Solve one equation for one variable, then substitute that expression into the other equation.</p>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #78350f; font-size: 1.3rem;">Example: Solve by Substitution</h4>
    <div style="text-align: center; font-family: monospace; font-size: 1.15rem; line-height: 2; margin-bottom: 2rem;">
      <div>y = 3x − 1</div>
      <div>2x + y = 9</div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 1: y is already isolated! Substitute y = 3x − 1 into the second equation</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.05rem;">
        <div>2x + (3x − 1) = 9</div>
        <div>5x − 1 = 9</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 2: Solve for x</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.05rem;">
        <div>5x − 1 = 9</div>
        <div>5x = 10</div>
        <div style="font-weight: 700;">x = 2</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 3: Substitute x = 2 back into y = 3x − 1</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.05rem;">
        <div>y = 3(2) − 1</div>
        <div>y = 6 − 1</div>
        <div style="font-weight: 700;">y = 5</div>
      </div>
    </div>

    <div style="background: #fef9c3; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem; text-align: center;">
      <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #78350f;">Solution: (2, 5)</p>
    </div>
  </div>

  <h3>Method 2: Elimination</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">Add or subtract the equations to eliminate one variable. Sometimes you need to multiply first to make the coefficients match!</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Example: Solve by Elimination</h4>
    <div style="text-align: center; font-family: monospace; font-size: 1.15rem; line-height: 2; margin-bottom: 2rem;">
      <div>2x + y = 10</div>
      <div>x − y = 2</div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Add the equations (y and −y will cancel)</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2.5; font-size: 1.05rem;">
        <div>2x + y = 10</div>
        <div>+  x − y = 2</div>
        <div style="border-top: 2px solid #0284c7; padding-top: 0.5rem;">3x = 12</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Solve for x</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.05rem;">
        <div>3x = 12</div>
        <div style="font-weight: 700;">x = 4</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 3: Substitute x = 4 into either equation</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.05rem;">
        <div>x − y = 2</div>
        <div>4 − y = 2</div>
        <div style="font-weight: 700;">y = 2</div>
      </div>
    </div>

    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem; text-align: center;">
      <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #0c4a6e;">Solution: (4, 2)</p>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">Solve: x + y = 7 and x − y = 1</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. (3, 4)<br>B. (4, 3)<br>C. (5, 2)<br>D. (6, 1)</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Add the equations to eliminate y.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>x + y = 7</div>
    <div>+ x − y = 1</div>
    <div style="border-top: 2px solid #64748b; padding-top: 0.5rem; margin-top: 0.5rem;">2x = 8 → x = 4</div>
    <div>Substitute: 4 + y = 7 → y = 3</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B (4, 3)</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Use substitution when one variable is already isolated. Use elimination when you can easily add/subtract to cancel a variable. Both methods work—choose the easier one for each problem!</p>
  </div>
</div>`,

  'functions': `<div class="lesson-content">
  <p class="lesson-intro">Functions are like machines—you put a number in (input), the function does something to it, and you get a number out (output). Understanding function notation and how to evaluate functions is essential for the ACT!</p>

  <h3>What is a Function?</h3>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2.5rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <svg width="100%" height="180" viewBox="0 0 500 180" style="display: block; margin: 0 auto 2rem auto; max-width: 500px;">
      <rect x="20" y="60" width="120" height="60" rx="8" fill="rgba(255,255,255,0.2)" stroke="white" stroke-width="3"/>
      <text x="80" y="95" font-size="24" font-weight="bold" fill="white" text-anchor="middle">Input</text>

      <rect x="190" y="30" width="120" height="120" rx="8" fill="rgba(255,255,255,0.3)" stroke="white" stroke-width="3"/>
      <text x="250" y="80" font-size="20" font-weight="bold" fill="white" text-anchor="middle">FUNCTION</text>
      <text x="250" y="110" font-size="18" fill="white" text-anchor="middle">f(x) = 2x + 3</text>

      <rect x="360" y="60" width="120" height="60" rx="8" fill="rgba(255,255,255,0.2)" stroke="white" stroke-width="3"/>
      <text x="420" y="95" font-size="24" font-weight="bold" fill="white" text-anchor="middle">Output</text>

      <path d="M 140 90 L 190 90" stroke="white" stroke-width="3" marker-end="url(#arrowwhite)"/>
      <path d="M 310 90 L 360 90" stroke="white" stroke-width="3" marker-end="url(#arrowwhite)"/>

      <text x="80" y="140" font-size="20" font-weight="bold" fill="white" text-anchor="middle">x</text>
      <text x="420" y="140" font-size="20" font-weight="bold" fill="white" text-anchor="middle">f(x)</text>

      <defs>
        <marker id="arrowwhite" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="white"/>
        </marker>
      </defs>
    </svg>

    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">Example: f(x) = 2x + 3</p>
      <p style="margin: 1rem 0 0 0; font-size: 1.1rem; opacity: 0.95;">Input 5 → Output 2(5) + 3 = 13</p>
    </div>
  </div>

  <h3>Function Notation</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 2.5rem; font-weight: 700; color: #1e40af;">f(x) = 3x + 7</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
      <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #dc2626;">f</p>
        <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Function name</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">Could be g, h, or any letter</p>
      </div>
      <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #3b82f6;">x</p>
        <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Input variable</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">What you plug in</p>
      </div>
      <div style="background: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #10b981;">3x + 7</p>
        <p style="margin: 0.75rem 0 0 0; font-size: 1.1rem; font-weight: 600;">Rule</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; color: #64748b;">What the function does</p>
      </div>
    </div>
  </div>

  <h3>Evaluating Functions</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">To evaluate f(5), replace every x in the function with 5, then simplify!</p>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #78350f; font-size: 1.3rem;">Example: If f(x) = 2x² − 3x + 1, find f(4)</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 1: Replace every x with 4</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.1rem;">
        <div>f(4) = 2(4)² − 3(4) + 1</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 2: Calculate (4)²</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.1rem;">
        <div>f(4) = 2(16) − 3(4) + 1</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #78350f;">Step 3: Multiply and simplify</p>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; line-height: 2; font-size: 1.1rem;">
        <div>f(4) = 32 − 12 + 1</div>
        <div style="font-weight: 700;">f(4) = 21</div>
      </div>
    </div>
  </div>

  <h3>Function Composition</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">Function composition means plugging one function into another. f(g(x)) means: evaluate g first, then plug that result into f.</p>

  <div style="background: #ede9fe; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #7c3aed;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #5b21b6; font-size: 1.3rem;">Example: If f(x) = x + 3 and g(x) = 2x, find f(g(5))</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #5b21b6;">Step 1: Evaluate g(5) first</p>
      <div style="padding-left: 1rem; border-left: 3px solid #7c3aed; line-height: 2; font-size: 1.1rem;">
        <div>g(5) = 2(5) = 10</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #5b21b6;">Step 2: Now evaluate f(10)</p>
      <div style="padding-left: 1rem; border-left: 3px solid #7c3aed; line-height: 2; font-size: 1.1rem;">
        <div>f(10) = 10 + 3 = 13</div>
        <div style="font-weight: 700;">So f(g(5)) = 13</div>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">If f(x) = 3x − 5, what is f(7)?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 11<br>B. 16<br>C. 21<br>D. 26</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Replace x with 7 in the function.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>f(7) = 3(7) − 5</div>
    <div>f(7) = 21 − 5</div>
    <div>f(7) = 16</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Functions are just substitution! To evaluate f(a), replace every x with a and calculate. For composition f(g(x)), work from the inside out: evaluate g first, then plug that result into f.</p>
  </div>
</div>`,

  'percentages': `<div class="lesson-content">
  <p class="lesson-intro">Percentages are everywhere on the ACT! Understanding how to convert between fractions, decimals, and percentages—and how to calculate percentage increases and decreases—will help you solve these problems quickly.</p>

  <h3>What is a Percentage?</h3>

  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="margin: 0; font-size: 2rem; font-weight: 700;">Percent means "per 100"</p>
      <p style="margin: 1rem 0 0 0; font-size: 1.3rem; opacity: 0.95;">25% = 25 per 100 = 25/100</p>
    </div>

    <div style="background: rgba(255,255,255,0.2); padding: 2rem; border-radius: 12px;">
      <svg width="100%" height="120" viewBox="0 0 500 120" style="display: block; margin: 0 auto;">
        <rect x="20" y="20" width="20" height="20" fill="white"/>
        <rect x="45" y="20" width="20" height="20" fill="white"/>
        <rect x="70" y="20" width="20" height="20" fill="white"/>
        <rect x="95" y="20" width="20" height="20" fill="white"/>
        <rect x="120" y="20" width="20" height="20" fill="white"/>
        <rect x="145" y="20" width="20" height="20" fill="white"/>
        <rect x="170" y="20" width="20" height="20" fill="white"/>
        <rect x="195" y="20" width="20" height="20" fill="white"/>
        <rect x="220" y="20" width="20" height="20" fill="white"/>
        <rect x="245" y="20" width="20" height="20" fill="white"/>

        <rect x="20" y="45" width="20" height="20" fill="white"/>
        <rect x="45" y="45" width="20" height="20" fill="white"/>
        <rect x="70" y="45" width="20" height="20" fill="white"/>
        <rect x="95" y="45" width="20" height="20" fill="white"/>
        <rect x="120" y="45" width="20" height="20" fill="white"/>
        <rect x="145" y="45" width="20" height="20" fill="white"/>
        <rect x="170" y="45" width="20" height="20" fill="white"/>
        <rect x="195" y="45" width="20" height="20" fill="white"/>
        <rect x="220" y="45" width="20" height="20" fill="white"/>
        <rect x="245" y="45" width="20" height="20" fill="white"/>

        <rect x="20" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        <rect x="45" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        <rect x="70" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        <rect x="95" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        <rect x="120" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        <rect x="145" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        <rect x="170" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        <rect x="195" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        <rect x="220" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        <rect x="245" y="70" width="20" height="20" fill="rgba(255,255,255,0.3)"/>

        <text x="320" y="50" font-size="24" font-weight="bold" fill="white">25 out of 100</text>
        <text x="320" y="80" font-size="20" fill="white">= 25%</text>
      </svg>
    </div>
  </div>

  <h3>Converting Between Forms</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 1rem 0; color: #065f46;">Percent → Decimal</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Move decimal point 2 places LEFT and remove % sign</p>
      <div style="background: #f0fdf4; padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 1.05rem;">
        <div>25% = 0.25</div>
        <div>7.5% = 0.075</div>
        <div>150% = 1.50</div>
      </div>
    </div>

    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #78350f;">Decimal → Percent</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Move decimal point 2 places RIGHT and add % sign</p>
      <div style="background: #fffbeb; padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 1.05rem;">
        <div>0.45 = 45%</div>
        <div>0.08 = 8%</div>
        <div>1.2 = 120%</div>
      </div>
    </div>

    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0284c7;">
      <h4 style="margin: 0 0 1rem 0; color: #0c4a6e;">Fraction → Percent</h4>
      <p style="margin: 0 0 1rem 0; font-size: 1.05rem; line-height: 1.7;">Divide numerator by denominator, then convert to percent</p>
      <div style="background: #f0f9ff; padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 1.05rem;">
        <div>3/4 = 0.75 = 75%</div>
        <div>1/5 = 0.2 = 20%</div>
        <div>7/8 = 0.875 = 87.5%</div>
      </div>
    </div>
  </div>

  <h3>Finding Percentage Of a Number</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">To find a percentage of a number, convert the percent to a decimal and multiply!</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e; font-size: 1.3rem;">Example: What is 35% of 80?</h4>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Convert 35% to decimal</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.1rem;">
        <div>35% = 0.35</div>
      </div>
    </div>

    <div style="background: white; padding: 1.5rem; border-radius: 8px;">
      <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Multiply by the number</p>
      <div style="padding-left: 1rem; border-left: 3px solid #0284c7; line-height: 2; font-size: 1.1rem;">
        <div>0.35 × 80 = 28</div>
        <div style="font-weight: 700; margin-top: 0.5rem;">35% of 80 is 28</div>
      </div>
    </div>
  </div>

  <h3>Percent Increase and Decrease</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">Percent Increase</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.15rem; font-weight: 700;">% increase = (new − old) / old × 100%</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px; font-size: 0.95rem;">
        <p style="margin: 0;"><strong>Example:</strong> Price goes from $40 to $50</p>
        <p style="margin: 0.5rem 0 0 0;">(50 − 40) / 40 × 100% = 25% increase</p>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 12px; color: white;">
      <h4 style="margin: 0 0 1rem 0; font-size: 1.2rem;">Percent Decrease</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.15rem; font-weight: 700;">% decrease = (old − new) / old × 100%</p>
      </div>
      <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 6px; font-size: 0.95rem;">
        <p style="margin: 0;"><strong>Example:</strong> Price goes from $50 to $40</p>
        <p style="margin: 0.5rem 0 0 0;">(50 − 40) / 50 × 100% = 20% decrease</p>
      </div>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is 20% of 150?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 15<br>B. 25<br>C. 30<br>D. 40</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Convert 20% to 0.20 and multiply.</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>20% = 0.20</div>
    <div>0.20 × 150 = 30</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">To find a percent of a number: convert to decimal and multiply. For percent change: (difference / original) × 100%. Always divide by the ORIGINAL value, not the new one!</p>
  </div>
</div>`
};

async function updateLessons() {
  console.log('Starting Phase 5 enhancements...\n');

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

  console.log('\n✓ Phase 5 complete: Enhanced 4 more lessons!');
  console.log('Next: Will continue with remaining topics...');
}

updateLessons();
