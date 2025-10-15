import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const enhancedLessons = {
  'geometry-shapes': `<div class="lesson-content">
  <p class="lesson-intro">Every shape has specific formulas for area and perimeter. In this lesson, we'll learn the formulas for all the common shapes you'll see on the ACT. Don't worry about memorizing them all at once—we'll break them down one by one with clear visuals!</p>

  <h3>Understanding Area vs. Perimeter</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 12px; border: 3px solid #3b82f6;">
      <h4 style="margin: 0 0 1rem 0; color: #1e40af; font-size: 1.2rem;">📏 Perimeter</h4>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">The <strong>distance around</strong> the outside of a shape. Add up all the side lengths!</p>
      <p style="margin: 1rem 0 0 0; padding: 1rem; background: white; border-radius: 8px; font-style: italic;">Think: walking around the edge of a fence</p>
    </div>
    <div style="background: #fef3c7; padding: 1.5rem; border-radius: 12px; border: 3px solid #f59e0b;">
      <h4 style="margin: 0 0 1rem 0; color: #92400e; font-size: 1.2rem;">📐 Area</h4>
      <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;">The <strong>space inside</strong> a shape. How much surface it covers.</p>
      <p style="margin: 1rem 0 0 0; padding: 1rem; background: white; border-radius: 8px; font-style: italic;">Think: painting inside the fence</p>
    </div>
  </div>

  <h3>Rectangles and Squares</h3>

  <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
      <div>
        <h4 style="margin: 0 0 1.5rem 0; color: #1e40af;">Rectangle</h4>
        <svg width="100%" height="180" viewBox="0 0 300 180" style="display: block; margin-bottom: 1.5rem;">
          <rect x="40" y="40" width="220" height="100" fill="#dbeafe" stroke="#1e40af" stroke-width="3"/>
          <line x1="40" y1="20" x2="260" y2="20" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowred)"/>
          <line x1="260" y1="20" x2="40" y2="20" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowred)"/>
          <text x="150" y="15" fill="#dc2626" font-size="18" font-weight="bold" text-anchor="middle">length (l)</text>
          <line x1="280" y1="40" x2="280" y2="140" stroke="#10b981" stroke-width="2" marker-end="url(#arrowgreen)"/>
          <line x1="280" y1="140" x2="280" y2="40" stroke="#10b981" stroke-width="2" marker-end="url(#arrowgreen)"/>
          <text x="285" y="95" fill="#10b981" font-size="18" font-weight="bold">w</text>
          <defs>
            <marker id="arrowred" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#dc2626"/>
            </marker>
            <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#10b981"/>
            </marker>
          </defs>
        </svg>
        <div style="background: white; padding: 1.25rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <p style="margin: 0 0 0.75rem 0; font-size: 1.1rem;"><strong>Perimeter:</strong> P = 2l + 2w</p>
          <p style="margin: 0; font-size: 1.1rem;"><strong>Area:</strong> A = l × w</p>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 1.5rem 0; color: #7c3aed;">Square (special rectangle)</h4>
        <svg width="100%" height="180" viewBox="0 0 300 180" style="display: block; margin-bottom: 1.5rem;">
          <rect x="75" y="40" width="150" height="150" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/>
          <line x1="75" y1="20" x2="225" y2="20" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowred2)"/>
          <line x1="225" y1="20" x2="75" y2="20" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowred2)"/>
          <text x="150" y="15" fill="#dc2626" font-size="18" font-weight="bold" text-anchor="middle">side (s)</text>
          <defs>
            <marker id="arrowred2" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#dc2626"/>
            </marker>
          </defs>
        </svg>
        <div style="background: white; padding: 1.25rem; border-radius: 8px; border-left: 4px solid #7c3aed;">
          <p style="margin: 0 0 0.75rem 0; font-size: 1.1rem;"><strong>Perimeter:</strong> P = 4s</p>
          <p style="margin: 0; font-size: 1.1rem;"><strong>Area:</strong> A = s²</p>
        </div>
      </div>
    </div>
  </div>

  <h3>Triangles</h3>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <svg width="100%" height="220" viewBox="0 0 400 220" style="display: block; margin: 0 auto 1.5rem auto; max-width: 400px;">
      <polygon points="200,30 350,190 50,190" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
      <line x1="50" y1="190" x2="350" y2="190" stroke="#dc2626" stroke-width="3"/>
      <line x1="200" y1="30" x2="200" y2="190" stroke="#10b981" stroke-width="3" stroke-dasharray="5,5"/>
      <text x="200" y="215" fill="#dc2626" font-size="20" font-weight="bold" text-anchor="middle">base (b)</text>
      <text x="175" y="110" fill="#10b981" font-size="20" font-weight="bold">h</text>
      <circle cx="200" cy="190" r="4" fill="#10b981"/>
    </svg>
    <div style="background: white; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b; text-align: center;">
      <p style="margin: 0 0 1rem 0; font-size: 1.2rem;"><strong>Area:</strong> A = ½ × base × height</p>
      <p style="margin: 0; font-size: 1.05rem; color: #92400e;">The height must be perpendicular (90°) to the base!</p>
    </div>
  </div>

  <h3>Circles</h3>

  <div style="background: #f0fdf4; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <svg width="100%" height="240" viewBox="0 0 400 240" style="display: block; margin: 0 auto 1.5rem auto; max-width: 400px;">
      <circle cx="200" cy="120" r="90" fill="#dcfce7" stroke="#10b981" stroke-width="3"/>
      <circle cx="200" cy="120" r="4" fill="#dc2626"/>
      <line x1="200" y1="120" x2="290" y2="120" stroke="#dc2626" stroke-width="3"/>
      <text x="245" y="115" fill="#dc2626" font-size="20" font-weight="bold">r</text>
      <text x="200" y="100" fill="#dc2626" font-size="16" font-weight="bold" text-anchor="middle">center</text>
    </svg>
    <div style="background: white; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
      <p style="margin: 0 0 0.75rem 0; font-size: 1.1rem;"><strong>Circumference (perimeter):</strong> C = 2πr</p>
      <p style="margin: 0; font-size: 1.1rem;"><strong>Area:</strong> A = πr²</p>
      <p style="margin: 1rem 0 0 0; padding: 1rem; background: #f0fdf4; border-radius: 6px; font-size: 0.95rem;">💡 <strong>Remember:</strong> r is the radius (center to edge), and π ≈ 3.14</p>
    </div>
  </div>

  <h3>Trapezoids</h3>

  <div style="background: #fce7f3; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <svg width="100%" height="200" viewBox="0 0 400 200" style="display: block; margin: 0 auto 1.5rem auto; max-width: 400px;">
      <polygon points="100,150 80,50 320,50 300,150" fill="#fce7f3" stroke="#ec4899" stroke-width="3"/>
      <line x1="80" y1="50" x2="320" y2="50" stroke="#dc2626" stroke-width="2"/>
      <line x1="100" y1="150" x2="300" y2="150" stroke="#3b82f6" stroke-width="2"/>
      <line x1="350" y1="50" x2="350" y2="150" stroke="#10b981" stroke-width="3" stroke-dasharray="5,5"/>
      <text x="200" y="40" fill="#dc2626" font-size="18" font-weight="bold" text-anchor="middle">b₁</text>
      <text x="200" y="175" fill="#3b82f6" font-size="18" font-weight="bold" text-anchor="middle">b₂</text>
      <text x="365" y="100" fill="#10b981" font-size="18" font-weight="bold">h</text>
    </svg>
    <div style="background: white; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ec4899; text-align: center;">
      <p style="margin: 0 0 1rem 0; font-size: 1.2rem;"><strong>Area:</strong> A = ½ × h × (b₁ + b₂)</p>
      <p style="margin: 0; font-size: 1.05rem; color: #831843;">Average the two bases, then multiply by height!</p>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A rectangle has length 12 cm and width 5 cm. What is its area?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 17 cm²<br>B. 34 cm²<br>C. 60 cm²<br>D. 120 cm²</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use the rectangle area formula: A = l × w</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0;">
    <div>A = l × w</div>
    <div>A = 12 × 5</div>
    <div>A = 60 cm²</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: C</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Write down the formula first, then plug in the values. For area, you're always multiplying dimensions. For perimeter, you're adding them up!</p>
  </div>
</div>`,

  'lines': `<div class="lesson-content">
  <p class="lesson-intro">Lines are the foundation of coordinate geometry. In this lesson, you'll learn everything about slope, equations of lines, and how to work with them on the coordinate plane. We'll start from scratch and build up your understanding step by step!</p>

  <h3>The Coordinate Plane</h3>

  <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <svg width="100%" height="300" viewBox="0 0 400 300" style="display: block; margin: 0 auto; max-width: 400px;">
      <defs>
        <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#3b82f6"/>
        </marker>
      </defs>
      <line x1="20" y1="150" x2="380" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowblue)"/>
      <line x1="200" y1="280" x2="200" y2="20" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowblue)"/>

      <text x="365" y="170" fill="#3b82f6" font-size="18" font-weight="bold">x</text>
      <text x="215" y="35" fill="#3b82f6" font-size="18" font-weight="bold">y</text>

      <circle cx="280" cy="90" r="5" fill="#dc2626"/>
      <line x1="280" y1="90" x2="280" y2="150" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3"/>
      <line x1="200" y1="90" x2="280" y2="90" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,3"/>

      <text x="290" y="95" fill="#dc2626" font-size="16" font-weight="bold">(4, 3)</text>
      <text x="235" y="125" fill="#f59e0b" font-size="14" font-weight="bold">x = 4</text>
      <text x="255" y="75" fill="#10b981" font-size="14" font-weight="bold">y = 3</text>

      <text x="205" y="170" fill="#64748b" font-size="14">(0, 0)</text>
    </svg>
    <p style="margin: 1.5rem 0 0 0; text-align: center; font-size: 1.05rem; line-height: 1.7;">Every point is written as <strong>(x, y)</strong>. The x-value tells you how far left/right, and the y-value tells you how far up/down from the origin (0, 0).</p>
  </div>

  <h3>What is Slope?</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">Slope measures how <strong>steep</strong> a line is. It tells you how much the line goes up or down as you move from left to right.</p>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; font-size: 1.4rem;">Slope Formula</h4>
    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">m = (y₂ − y₁) / (x₂ − x₁)</p>
    </div>
    <p style="margin: 1.5rem 0 0 0; text-align: center; font-size: 1.05rem; opacity: 0.95;">m = rise / run = "change in y" / "change in x"</p>
  </div>

  <h3>Understanding Slope Visually</h3>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #dcfce7; padding: 1.25rem; border-radius: 8px; border: 2px solid #10b981;">
      <svg width="100%" height="100" viewBox="0 0 100 100">
        <line x1="10" y1="90" x2="90" y2="10" stroke="#10b981" stroke-width="3"/>
        <text x="50" y="55" fill="#10b981" font-size="16" font-weight="bold" text-anchor="middle">↗</text>
      </svg>
      <p style="margin: 0.5rem 0 0 0; text-align: center; font-weight: 600;">Positive Slope</p>
      <p style="margin: 0.25rem 0 0 0; text-align: center; font-size: 0.9rem;">Line goes up</p>
    </div>

    <div style="background: #fee2e2; padding: 1.25rem; border-radius: 8px; border: 2px solid #dc2626;">
      <svg width="100%" height="100" viewBox="0 0 100 100">
        <line x1="10" y1="10" x2="90" y2="90" stroke="#dc2626" stroke-width="3"/>
        <text x="50" y="55" fill="#dc2626" font-size="16" font-weight="bold" text-anchor="middle">↘</text>
      </svg>
      <p style="margin: 0.5rem 0 0 0; text-align: center; font-weight: 600;">Negative Slope</p>
      <p style="margin: 0.25rem 0 0 0; text-align: center; font-size: 0.9rem;">Line goes down</p>
    </div>

    <div style="background: #dbeafe; padding: 1.25rem; border-radius: 8px; border: 2px solid #3b82f6;">
      <svg width="100%" height="100" viewBox="0 0 100 100">
        <line x1="10" y1="50" x2="90" y2="50" stroke="#3b82f6" stroke-width="3"/>
        <text x="50" y="70" fill="#3b82f6" font-size="16" font-weight="bold" text-anchor="middle">→</text>
      </svg>
      <p style="margin: 0.5rem 0 0 0; text-align: center; font-weight: 600;">Zero Slope</p>
      <p style="margin: 0.25rem 0 0 0; text-align: center; font-size: 0.9rem;">Horizontal line</p>
    </div>

    <div style="background: #fef3c7; padding: 1.25rem; border-radius: 8px; border: 2px solid #f59e0b;">
      <svg width="100%" height="100" viewBox="0 0 100 100">
        <line x1="50" y1="10" x2="50" y2="90" stroke="#f59e0b" stroke-width="3"/>
        <text x="70" y="55" fill="#f59e0b" font-size="16" font-weight="bold" text-anchor="middle">↕</text>
      </svg>
      <p style="margin: 0.5rem 0 0 0; text-align: center; font-weight: 600;">Undefined Slope</p>
      <p style="margin: 0.25rem 0 0 0; text-align: center; font-size: 0.9rem;">Vertical line</p>
    </div>
  </div>

  <h3>Equations of Lines</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
    <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0284c7;">
      <h4 style="margin: 0 0 1rem 0; color: #0c4a6e;">Slope-Intercept Form</h4>
      <div style="background: white; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #0284c7;">y = mx + b</p>
      </div>
      <p style="margin: 0.5rem 0; font-size: 1.05rem;"><strong>m</strong> = slope</p>
      <p style="margin: 0.5rem 0; font-size: 1.05rem;"><strong>b</strong> = y-intercept (where line crosses y-axis)</p>
      <p style="margin: 1rem 0 0 0; padding: 1rem; background: #f0f9ff; border-radius: 6px; font-size: 0.95rem;">📍 Most common form on the ACT!</p>
    </div>

    <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #db2777;">
      <h4 style="margin: 0 0 1rem 0; color: #831843;">Point-Slope Form</h4>
      <div style="background: white; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #db2777;">y − y₁ = m(x − x₁)</p>
      </div>
      <p style="margin: 0.5rem 0; font-size: 1.05rem;"><strong>m</strong> = slope</p>
      <p style="margin: 0.5rem 0; font-size: 1.05rem;"><strong>(x₁, y₁)</strong> = a point on the line</p>
      <p style="margin: 1rem 0 0 0; padding: 1rem; background: #fdf2f8; border-radius: 6px; font-size: 0.95rem;">📍 Useful when you know a point and slope!</p>
    </div>
  </div>

  <h3>Step-by-Step Example</h3>

  <h4>Example 1: Finding Slope</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is the slope of the line passing through points (2, 3) and (6, 11)?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 1/2<br>B. 2<br>C. 4<br>D. 8</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Use the slope formula with (x₁, y₁) = (2, 3) and (x₂, y₂) = (6, 11)</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>m = (y₂ − y₁) / (x₂ − x₁)</div>
    <div>m = (11 − 3) / (6 − 2)</div>
    <div>m = 8 / 4</div>
    <div>m = 2</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Always label your points clearly (which is x₁, y₁, x₂, y₂) before plugging into the slope formula. And remember: positive slope goes up, negative slope goes down!</p>
  </div>
</div>`,

  'circles-ellipses': `<div class="lesson-content">
  <p class="lesson-intro">Circles and ellipses on the coordinate plane have specific equation forms. Once you understand the pattern, you can find centers, radii, and sketch these curves easily. Let's build your understanding from the ground up!</p>

  <h3>Circle Basics</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">A circle is all points that are the same distance (radius) from a center point. On the coordinate plane, we can write this as an equation!</p>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; font-size: 1.4rem;">Standard Circle Equation</h4>
    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">(x − h)² + (y − k)² = r²</p>
    </div>
    <div style="margin: 1.5rem 0 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">(h, k)</p>
        <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Center</p>
      </div>
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">r</p>
        <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Radius</p>
      </div>
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">r²</p>
        <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Radius squared</p>
      </div>
    </div>
  </div>

  <h3>Visualizing a Circle</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #0c4a6e;">Circle: (x − 2)² + (y − 1)² = 16</h4>
    <svg width="100%" height="300" viewBox="0 0 400 300" style="display: block; margin: 0 auto; max-width: 400px;">
      <defs>
        <marker id="arrowgray" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/>
        </marker>
      </defs>

      <line x1="20" y1="150" x2="380" y2="150" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowgray)"/>
      <line x1="200" y1="280" x2="200" y2="20" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowgray)"/>

      <g transform="translate(40, 0)">
        <circle cx="200" cy="130" r="80" fill="#dbeafe" stroke="#3b82f6" stroke-width="3"/>

        <circle cx="200" cy="130" r="5" fill="#dc2626"/>
        <text x="210" y="125" fill="#dc2626" font-size="16" font-weight="bold">(2, 1)</text>
        <text x="210" y="142" fill="#64748b" font-size="14">center</text>

        <line x1="200" y1="130" x2="280" y2="130" stroke="#10b981" stroke-width="3"/>
        <text x="235" y="120" fill="#10b981" font-size="18" font-weight="bold">r = 4</text>
      </g>

      <text x="365" y="170" fill="#94a3b8" font-size="14">x</text>
      <text x="210" y="35" fill="#94a3b8" font-size="14">y</text>
    </svg>
    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-size: 1.05rem;"><strong>Center:</strong> (h, k) = (2, 1)</p>
      <p style="margin: 0 0 0.75rem 0; font-size: 1.05rem;"><strong>Radius squared:</strong> r² = 16</p>
      <p style="margin: 0; font-size: 1.05rem;"><strong>Radius:</strong> r = √16 = 4</p>
    </div>
  </div>

  <div style="background: #fff3e0; padding: 1.5rem; margin: 2rem 0; border-radius: 6px; border-left: 4px solid #ff9800;">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.7;"><strong>⚠️ Watch the Signs!</strong> The equation is (x − h)² + (y − k)². If you see (x − 2)², the center x-coordinate is <strong>+2</strong>, not −2. If you see (x + 3)², write it as (x − (−3))², so h = −3.</p>
  </div>

  <h3>Ellipses</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">An ellipse is like a stretched circle. It has two radii: one horizontal (a) and one vertical (b).</p>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 12px; margin: 2rem 0; color: white;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; font-size: 1.4rem;">Standard Ellipse Equation</h4>
    <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 1.5rem; font-weight: 700;">(x − h)² / a² + (y − k)² / b² = 1</p>
    </div>
    <div style="margin: 1.5rem 0 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">(h, k)</p>
        <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Center</p>
      </div>
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">a</p>
        <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Horizontal radius</p>
      </div>
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">b</p>
        <p style="margin: 0.25rem 0 0 0; opacity: 0.9;">Vertical radius</p>
      </div>
    </div>
  </div>

  <h3>Visualizing an Ellipse</h3>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #78350f;">Ellipse: (x − 1)² / 9 + (y − 2)² / 4 = 1</h4>
    <svg width="100%" height="280" viewBox="0 0 400 280" style="display: block; margin: 0 auto; max-width: 400px;">
      <defs>
        <marker id="arrowgray2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/>
        </marker>
      </defs>

      <line x1="20" y1="140" x2="380" y2="140" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowgray2)"/>
      <line x1="200" y1="260" x2="200" y2="20" stroke="#cbd5e1" stroke-width="1" marker-end="url(#arrowgray2)"/>

      <ellipse cx="220" cy="120" rx="90" ry="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>

      <circle cx="220" cy="120" r="5" fill="#dc2626"/>
      <text x="230" y="115" fill="#dc2626" font-size="16" font-weight="bold">(1, 2)</text>

      <line x1="220" y1="120" x2="310" y2="120" stroke="#3b82f6" stroke-width="2"/>
      <text x="260" y="110" fill="#3b82f6" font-size="16" font-weight="bold">a = 3</text>

      <line x1="220" y1="120" x2="220" y2="180" stroke="#10b981" stroke-width="2"/>
      <text x="230" y="155" fill="#10b981" font-size="16" font-weight="bold">b = 2</text>

      <text x="365" y="160" fill="#94a3b8" font-size="14">x</text>
      <text x="210" y="35" fill="#94a3b8" font-size="14">y</text>
    </svg>
    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem;">
      <p style="margin: 0 0 0.75rem 0; font-size: 1.05rem;"><strong>Center:</strong> (h, k) = (1, 2)</p>
      <p style="margin: 0 0 0.75rem 0; font-size: 1.05rem;"><strong>Horizontal radius:</strong> a² = 9 → a = 3</p>
      <p style="margin: 0; font-size: 1.05rem;"><strong>Vertical radius:</strong> b² = 4 → b = 2</p>
    </div>
  </div>

  <h3>Example Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">What is the center of the circle (x + 3)² + (y − 5)² = 25?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. (3, −5)<br>B. (−3, 5)<br>C. (3, 5)<br>D. (−3, −5)</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">Rewrite (x + 3)² as (x − (−3))² to match the standard form (x − h)² + (y − k)² = r²</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>(x + 3)² + (y − 5)² = 25</div>
    <div>(x − (−3))² + (y − 5)² = 25</div>
    <div>h = −3, k = 5</div>
    <div>Center: (−3, 5)</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: B</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">The signs in the equation are opposite of the center coordinates! (x − h) means the center x-value is +h. (x + 3) means (x − (−3)), so h = −3. Always rewrite to match the standard form!</p>
  </div>
</div>`,

  'arcs-sectors': `<div class="lesson-content">
  <p class="lesson-intro">Arcs and sectors are parts of circles. An arc is a piece of the circle's edge, and a sector is a "slice" of the circle (like a pizza slice!). Once you understand the relationship between angles and full circles, these become easy!</p>

  <h3>Understanding Circle Parts</h3>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <svg width="100%" height="320" viewBox="0 0 600 320" style="display: block; margin: 0 auto; max-width: 600px;">
      <g transform="translate(50, 10)">
        <text x="100" y="20" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">Arc</text>
        <circle cx="100" cy="160" r="80" fill="none" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M 100 80 A 80 80 0 0 1 180 160" fill="none" stroke="#3b82f6" stroke-width="5"/>
        <circle cx="100" cy="160" r="3" fill="#dc2626"/>
        <line x1="100" y1="160" x2="100" y2="80" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="100" y1="160" x2="180" y2="160" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
        <path d="M 100 140 A 20 20 0 0 1 120 160" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="125" y="150" fill="#f59e0b" font-size="14" font-weight="bold">θ</text>
        <text x="140" y="110" fill="#3b82f6" font-size="16" font-weight="bold">Arc length</text>
      </g>

      <g transform="translate(300, 10)">
        <text x="100" y="20" font-size="18" font-weight="bold" fill="#7c3aed" text-anchor="middle">Sector</text>
        <path d="M 100 160 L 100 80 A 80 80 0 0 1 180 160 Z" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/>
        <circle cx="100" cy="160" r="80" fill="none" stroke="#cbd5e1" stroke-width="1"/>
        <circle cx="100" cy="160" r="3" fill="#dc2626"/>
        <path d="M 100 140 A 20 20 0 0 1 120 160" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="125" y="150" fill="#f59e0b" font-size="14" font-weight="bold">θ</text>
        <text x="125" y="120" fill="#7c3aed" font-size="16" font-weight="bold">Sector area</text>
      </g>
    </svg>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
      <div style="background: white; padding: 1.25rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <p style="margin: 0; font-size: 1.05rem; font-weight: 600; color: #1e40af;">Arc</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem;">Part of the circle's circumference</p>
      </div>
      <div style="background: white; padding: 1.25rem; border-radius: 8px; border-left: 4px solid #7c3aed;">
        <p style="margin: 0; font-size: 1.05rem; font-weight: 600; color: #5b21b6;">Sector</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem;">Part of the circle's area (like a pizza slice)</p>
      </div>
    </div>
  </div>

  <h3>The Key Idea: Fractions of a Circle</h3>

  <p style="font-size: 1.05rem; line-height: 1.8; margin: 1rem 0;">A full circle has 360°. If your angle is θ degrees, then you have <strong>θ/360</strong> of the whole circle!</p>

  <div style="background: #fef3c7; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #f59e0b;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #78350f; font-size: 1.3rem;">Master Formula</h4>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div style="background: white; padding: 1.5rem; border-radius: 8px;">
        <p style="margin: 0 0 0.75rem 0; text-align: center; font-weight: 600; color: #3b82f6;">Arc Length</p>
        <p style="margin: 0; text-align: center; font-size: 1.3rem; font-weight: 700; color: #1e40af;">Arc = (θ/360) × 2πr</p>
        <p style="margin: 1rem 0 0 0; text-align: center; font-size: 0.95rem; color: #64748b;">Fraction of circumference</p>
      </div>
      <div style="background: white; padding: 1.5rem; border-radius: 8px;">
        <p style="margin: 0 0 0.75rem 0; text-align: center; font-weight: 600; color: #7c3aed;">Sector Area</p>
        <p style="margin: 0; text-align: center; font-size: 1.3rem; font-weight: 700; color: #5b21b6;">Area = (θ/360) × πr²</p>
        <p style="margin: 1rem 0 0 0; text-align: center; font-size: 0.95rem; color: #64748b;">Fraction of total area</p>
      </div>
    </div>
  </div>

  <h3>Step-by-Step Example</h3>

  <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
    <h4 style="margin: 0 0 1rem 0; color: #1f2937;">Example Setup</h4>
    <p style="margin: 0 0 1.5rem 0; font-size: 1.05rem;">A circle has radius 6 cm and a sector with a 60° angle. Let's find the arc length and sector area!</p>

    <svg width="100%" height="250" viewBox="0 0 400 250" style="display: block; margin: 1.5rem auto; max-width: 400px;">
      <path d="M 200 125 L 200 45 A 80 80 0 0 1 269.28 165 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
      <circle cx="200" cy="125" r="80" fill="none" stroke="#cbd5e1" stroke-width="2"/>
      <circle cx="200" cy="125" r="4" fill="#dc2626"/>
      <line x1="200" y1="125" x2="200" y2="45" stroke="#10b981" stroke-width="2"/>
      <text x="175" y="80" fill="#10b981" font-size="16" font-weight="bold">r = 6</text>
      <path d="M 200 105 A 20 20 0 0 1 217.32 115" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <text x="225" y="110" fill="#f59e0b" font-size="18" font-weight="bold">60°</text>
    </svg>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem;">
      <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #0c4a6e;">Step 1: Find the fraction</p>
      <p style="margin: 0 0 1.5rem 0; padding-left: 1rem; border-left: 2px solid #0284c7;">60° / 360° = 1/6 of the circle</p>

      <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #0c4a6e;">Step 2: Arc length</p>
      <p style="margin: 0 0 0.25rem 0; padding-left: 1rem; border-left: 2px solid #0284c7;">Arc = (1/6) × 2πr</p>
      <p style="margin: 0 0 0.25rem 0; padding-left: 1rem; border-left: 2px solid #0284c7;">Arc = (1/6) × 2π(6)</p>
      <p style="margin: 0 0 1.5rem 0; padding-left: 1rem; border-left: 2px solid #0284c7; font-weight: 600;">Arc = 2π cm ≈ 6.28 cm</p>

      <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #0c4a6e;">Step 3: Sector area</p>
      <p style="margin: 0 0 0.25rem 0; padding-left: 1rem; border-left: 2px solid #0284c7;">Area = (1/6) × πr²</p>
      <p style="margin: 0 0 0.25rem 0; padding-left: 1rem; border-left: 2px solid #0284c7;">Area = (1/6) × π(6)²</p>
      <p style="margin: 0 0 0 0; padding-left: 1rem; border-left: 2px solid #0284c7; font-weight: 600;">Area = 6π cm² ≈ 18.85 cm²</p>
    </div>
  </div>

  <h3>Practice Problem</h3>

  <h4>Example 1</h4>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #4CAF50;"><strong>Problem:</strong></p>
  <p style="margin: 0 0 0.5rem 0; padding-left: 1rem; font-size: 1.05rem;">A circle has radius 10. What is the length of an arc with a 90° central angle?</p>
  <p style="margin: 0 0 2rem 0; padding-left: 1rem; line-height: 1.8; font-size: 1.05rem;">A. 5π<br>B. 10π<br>C. 15π<br>D. 20π</p>

  <p style="margin: 1.5rem 0 0.5rem 0; padding-left: 1rem; border-left: 3px solid #FF9800;"><strong>Solution:</strong></p>
  <p style="margin: 0 0 1rem 0; padding-left: 1rem; font-size: 1.05rem; line-height: 1.75;">90° is 1/4 of a full circle (90/360 = 1/4)</p>

  <div style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; font-size: 1.15rem; line-height: 2.5; margin: 1.5rem 0; padding: 1.5rem 0; background: #f8f9fa; border-radius: 8px;">
    <div>Arc = (θ/360) × 2πr</div>
    <div>Arc = (90/360) × 2π(10)</div>
    <div>Arc = (1/4) × 20π</div>
    <div>Arc = 5π</div>
  </div>

  <p style="margin: 1.5rem 0 0 0; padding-left: 1rem; font-weight: 600; font-size: 1.05rem;">Answer: A</p>

  <div style="margin: 4rem 0 2rem 0; padding: 1.5rem; padding-left: 1.5rem; background: #f0f9ff !important; border-left: 4px solid #2196F3; border-radius: 4px;">
    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1565c0; font-size: 1.05rem;">💡 Key Takeaway</p>
    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">Always start by finding what fraction of the circle you have (θ/360). Then multiply by the full circumference for arc length, or the full area for sector area. Think in fractions!</p>
  </div>
</div>`
};

async function updateLessons() {
  console.log('Starting Phase 2 enhancements...\n');

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

  console.log('\n✓ Phase 2 complete: Enhanced 4 geometry lessons with detailed visuals!');
  console.log('Next: Will enhance algebra and other topics...');
}

updateLessons();
