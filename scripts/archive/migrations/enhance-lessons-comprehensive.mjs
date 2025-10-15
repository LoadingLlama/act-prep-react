import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Starting with geometry-angles - needs interactive angle demonstration
const enhancedLessons = {
  'geometry-angles': `<div class="lesson-content">
  <p class="lesson-intro">Angles are everywhere in geometry! In this lesson, you'll learn how angles work when lines intersect and cross. We'll start with the basics and build up to more complex situations. By the end, you'll be able to find any angle in a diagram!</p>

  <h3>What is an Angle?</h3>
  
  <p>An angle is formed when two lines or rays meet at a point. We measure angles in degrees (°). Here are the basic types:</p>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: #f0f9ff; padding: 1.25rem; border-radius: 8px; border: 2px solid #3b82f6;">
      <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">Acute Angle</h4>
      <svg width="120" height="80" style="display: block; margin: 1rem auto;">
        <line x1="10" y1="70" x2="110" y2="70" stroke="#1e40af" stroke-width="2"/>
        <line x1="10" y1="70" x2="90" y2="20" stroke="#1e40af" stroke-width="2"/>
        <path d="M 30 70 A 20 20 0 0 1 24 55" fill="none" stroke="#3b82f6" stroke-width="2"/>
        <text x="35" y="60" fill="#1e40af" font-size="14">45°</text>
      </svg>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; text-align: center;">Less than 90°</p>
    </div>

    <div style="background: #fef3c7; padding: 1.25rem; border-radius: 8px; border: 2px solid #f59e0b;">
      <h4 style="margin: 0 0 0.5rem 0; color: #b45309;">Right Angle</h4>
      <svg width="120" height="80" style="display: block; margin: 1rem auto;">
        <line x1="10" y1="70" x2="110" y2="70" stroke="#b45309" stroke-width="2"/>
        <line x1="10" y1="70" x2="10" y2="10" stroke="#b45309" stroke-width="2"/>
        <rect x="10" y="60" width="10" height="10" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="20" y="50" fill="#b45309" font-size="14">90°</text>
      </svg>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; text-align: center;">Exactly 90°</p>
    </div>

    <div style="background: #fce7f3; padding: 1.25rem; border-radius: 8px; border: 2px solid #ec4899;">
      <h4 style="margin: 0 0 0.5rem 0; color: #be185d;">Obtuse Angle</h4>
      <svg width="120" height="80" style="display: block; margin: 1rem auto;">
        <line x1="10" y1="70" x2="110" y2="70" stroke="#be185d" stroke-width="2"/>
        <line x1="10" y1="70" x2="30" y2="15" stroke="#be185d" stroke-width="2"/>
        <path d="M 30 70 A 20 20 0 0 1 16 50" fill="none" stroke="#ec4899" stroke-width="2"/>
        <text x="35" y="55" fill="#be185d" font-size="14">120°</text>
      </svg>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; text-align: center;">Greater than 90°</p>
    </div>

    <div style="background: #f3e8ff; padding: 1.25rem; border-radius: 8px; border: 2px solid #a855f7;">
      <h4 style="margin: 0 0 0.5rem 0; color: #7e22ce;">Straight Angle</h4>
      <svg width="120" height="80" style="display: block; margin: 1rem auto;">
        <line x1="10" y1="40" x2="110" y2="40" stroke="#7e22ce" stroke-width="2"/>
        <text x="45" y="30" fill="#7e22ce" font-size="14">180°</text>
        <circle cx="60" cy="40" r="3" fill="#7e22ce"/>
      </svg>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; text-align: center;">Exactly 180°</p>
    </div>
  </div>

  <h3>When Two Lines Intersect</h3>

  <p>When two straight lines cross each other, they create 4 angles at the intersection point. Let's explore what we know about these angles:</p>

  <div style="background: #f8fafc; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #cbd5e1;">
    <svg width="100%" height="300" viewBox="0 0 400 300" style="max-width: 400px; margin: 0 auto; display: block;">
      <!-- Intersecting lines -->
      <line x1="50" y1="250" x2="350" y2="50" stroke="#475569" stroke-width="3"/>
      <line x1="50" y1="50" x2="350" y2="250" stroke="#475569" stroke-width="3"/>
      
      <!-- Angle labels -->
      <text x="220" y="100" font-size="24" font-weight="bold" fill="#3b82f6">a°</text>
      <text x="260" y="155" font-size="24" font-weight="bold" fill="#ef4444">b°</text>
      <text x="180" y="200" font-size="24" font-weight="bold" fill="#3b82f6">a°</text>
      <text x="140" y="155" font-size="24" font-weight="bold" fill="#ef4444">b°</text>
      
      <!-- Center point -->
      <circle cx="200" cy="150" r="4" fill="#1e293b"/>
    </svg>

    <div style="margin-top: 1.5rem;">
      <div style="background: #dbeafe; padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #3b82f6;">
        <p style="margin: 0; font-size: 1.05rem;"><strong>✓ Vertical Angles are Equal</strong></p>
        <p style="margin: 0.5rem 0 0 0;">Angles across from each other are always equal. So the two blue angles (a°) are equal, and the two red angles (b°) are equal.</p>
      </div>

      <div style="background: #fef3c7; padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; font-size: 1.05rem;"><strong>✓ Adjacent Angles Add to 180°</strong></p>
        <p style="margin: 0.5rem 0 0 0;">Angles next to each other add up to 180°. So a° + b° = 180°.</p>
      </div>
    </div>
  </div>

  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #10b981;">
    <h4 style="margin: 0 0 1rem 0; color: #047857;">💡 Try It Yourself!</h4>
    <p style="margin: 0 0 0.5rem 0;">If one angle is 70°, what are the other three angles?</p>
    <div style="background: white; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
      <p style="margin: 0.25rem 0;"><strong>Step 1:</strong> The vertical angle is also 70° (vertical angles are equal)</p>
      <p style="margin: 0.25rem 0;"><strong>Step 2:</strong> The adjacent angle is 180° − 70° = 110° (adjacent angles add to 180°)</p>
      <p style="margin: 0.25rem 0;"><strong>Step 3:</strong> The other adjacent angle is also 110° (vertical to the first one)</p>
      <p style="margin: 0.75rem 0 0 0; font-weight: 600; color: #047857;">Answer: 70°, 110°, 70°, 110°</p>
    </div>
  </div>

  <h3>Parallel Lines Cut by a Transversal</h3>

  <p>This is the most important angle concept on the ACT! When two parallel lines are crossed by another line (called a transversal), special angle relationships are created. Here's the simple way to remember it:</p>

  <div style="background: #fef2f2; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #fca5a5;">
    <h4 style="color: #dc2626; margin: 0 0 1rem 0; text-align: center;">🎯 The Big Secret: Only TWO Different Angles!</h4>
    <p style="text-align: center; font-size: 1.1rem; margin: 0;">All 8 angles are either <span style="color: #dc2626; font-weight: 700;">acute</span> or <span style="color: #7c3aed; font-weight: 700;">obtuse</span>. That's it!</p>
  </div>

  <img src="/images/parallel-lines-simple.svg" alt="Parallel lines with transversal" style="max-width: 500px; width: 100%; height: auto; display: block; margin: 2rem auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

  <p style="font-size: 1.05rem; margin: 1.5rem 0;">When a transversal crosses two parallel lines, it creates 8 angles. But here's the amazing part: these 8 angles form only TWO groups of equal angles!</p>

  <img src="/images/parallel-lines-set1.svg" alt="Set 1: Acute angles" style="max-width: 500px; width: 100%; height: auto; display: block; margin: 2rem auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

  <div style="background: #fee2e2; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 600; color: #dc2626;">Set 1: The Four Acute Angles</p>
    <p style="margin: 0;">These four angles are all EQUAL. If you know one is 60°, then all four are 60°!</p>
  </div>

  <img src="/images/parallel-lines-set2.svg" alt="Set 2: Obtuse angles" style="max-width: 500px; width: 100%; height: auto; display: block; margin: 2rem auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

  <div style="background: #ede9fe; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 600; color: #7c3aed;">Set 2: The Four Obtuse Angles</p>
    <p style="margin: 0;">These four angles are all EQUAL. If you know one is 120°, then all four are 120°!</p>
  </div>

  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <h4 style="margin: 0 0 1rem 0; color: #1e40af;">🔑 The Key Relationship</h4>
    <p style="margin: 0 0 0.5rem 0; font-size: 1.05rem;">Any angle from Set 1 + Any angle from Set 2 = 180°</p>
    <p style="margin: 0; color: #64748b;">So if Set 1 angles are 60°, then Set 2 angles must be 120° (because 60° + 120° = 180°)</p>
  </div>

  <h3>Practice Problem</h3>

  <div style="background: #f8f9fa; padding: 2rem; border-radius: 8px; margin: 2rem 0; border: 1px solid #dee2e6;">
    <h4 style="margin: 0 0 1rem 0; color: #2c3e50;">Example: Finding All Angles</h4>
    
    <div style="background: #e8f5e9; padding: 1.5rem; border-radius: 6px; margin: 1rem 0; border-left: 4px solid #4CAF50;">
      <p style="margin: 0; font-weight: 600;">Problem:</p>
      <p style="margin: 0.5rem 0 0 0;">In the diagram below, lines L₁ and L₂ are parallel. If angle 1 measures 65°, what is the measure of angle 6?</p>
    </div>

    <div style="background: #fff3e0; padding: 1.5rem; border-radius: 6px; margin: 1rem 0; border-left: 4px solid #FF9800;">
      <p style="margin: 0; font-weight: 600;">Solution (Step-by-Step):</p>
      <p style="margin: 0.75rem 0 0.25rem 0;"><strong>Step 1:</strong> Angle 1 is 65°, so it's an acute angle. This means angle 1 is in "Set 1" (the acute angles).</p>
      <p style="margin: 0.25rem 0;"><strong>Step 2:</strong> All four angles in Set 1 are equal, so angles 1, 4, 5, and 8 are all 65°.</p>
      <p style="margin: 0.25rem 0;"><strong>Step 3:</strong> Angle 6 is in "Set 2" (the obtuse angles). We know Set 1 + Set 2 = 180°.</p>
      <p style="margin: 0.25rem 0;"><strong>Step 4:</strong> So angle 6 = 180° − 65° = 115°</p>
      <p style="margin: 1rem 0 0 0; padding-top: 1rem; border-top: 2px solid #FF9800; font-weight: 700; color: #E65100;">Answer: 115°</p>
    </div>
  </div>

  <div style="margin: 4rem 0 2rem 0; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
    <p style="margin: 0 0 1rem 0; font-weight: 700; font-size: 1.2rem;">💡 Master Strategy for Parallel Lines</p>
    <ol style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
      <li>Find ONE angle (usually given in the problem)</li>
      <li>Decide if it's acute or obtuse</li>
      <li>All angles in that group are EQUAL to it</li>
      <li>All angles in the other group are 180° minus that angle</li>
    </ol>
    <p style="margin: 1rem 0 0 0; opacity: 0.9;">That's all you need! No fancy terminology like "alternate interior" or "corresponding" – just two sets of equal angles!</p>
  </div>
</div>`,

  'trigonometry': `<div class="lesson-content">
  <p class="lesson-intro">Trigonometry might sound scary, but it's actually simple! It's just about the relationships between angles and sides in right triangles. Once you memorize SOH-CAH-TOA, you can solve almost any trig problem on the ACT.</p>

  <h3>What is Trigonometry?</h3>

  <p>Trigonometry helps us find missing sides or angles in right triangles. A right triangle has one 90° angle (marked with a square corner). The other two angles add up to 90°.</p>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #3b82f6;">
    <h4 style="margin: 0 0 1.5rem 0; text-align: center; color: #1e40af; font-size: 1.3rem;">Parts of a Right Triangle</h4>
    
    <svg width="100%" height="300" viewBox="0 0 500 300" style="max-width: 500px; margin: 0 auto; display: block;">
      <!-- Triangle -->
      <polygon points="100,250 100,50 400,250" fill="#dbeafe" stroke="#1e40af" stroke-width="3"/>
      
      <!-- Right angle marker -->
      <rect x="100" y="230" width="20" height="20" fill="none" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Labels -->
      <text x="50" y="160" font-size="20" font-weight="bold" fill="#dc2626">Opposite</text>
      <text x="230" y="280" font-size="20" font-weight="bold" fill="#10b981">Adjacent</text>
      <text x="260" y="130" font-size="20" font-weight="bold" fill="#7c3aed">Hypotenuse</text>
      
      <!-- Angle marker -->
      <path d="M 140 250 A 40 40 0 0 0 100 210" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <text x="150" y="235" font-size="24" font-weight="bold" fill="#f59e0b">θ</text>
      
      <!-- Side arrows -->
      <line x1="85" y1="150" x2="85" y2="150" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowred)"/>
      <line x1="250" y1="265" x2="250" y2="265" stroke="#10b981" stroke-width="2"/>
      <line x1="270" y1="150" x2="270" y2="150" stroke="#7c3aed" stroke-width="2"/>
    </svg>

    <div style="background: white; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
      <p style="margin: 0.5rem 0;"><strong style="color: #7c3aed;">Hypotenuse:</strong> The longest side, always opposite the right angle</p>
      <p style="margin: 0.5rem 0;"><strong style="color: #dc2626;">Opposite:</strong> The side across from the angle we're looking at (θ)</p>
      <p style="margin: 0.5rem 0;"><strong style="color: #10b981;">Adjacent:</strong> The side next to the angle we're looking at (θ)</p>
    </div>
  </div>

  <h3>The Magic Formula: SOH-CAH-TOA</h3>

  <p style="font-size: 1.1rem; margin: 1.5rem 0;">This simple phrase is THE KEY to all trig problems. Let's break it down:</p>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; color: white; box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);">
      <h4 style="margin: 0 0 1rem 0; font-size: 2rem; text-align: center;">SOH</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">sin(θ) = O/H</p>
      </div>
      <p style="margin: 1rem 0 0 0; text-align: center; opacity: 0.95;">Sine = Opposite / Hypotenuse</p>
    </div>

    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 12px; color: white; box-shadow: 0 8px 16px rgba(245, 87, 108, 0.4);">
      <h4 style="margin: 0 0 1rem 0; font-size: 2rem; text-align: center;">CAH</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">cos(θ) = A/H</p>
      </div>
      <p style="margin: 1rem 0 0 0; text-align: center; opacity: 0.95;">Cosine = Adjacent / Hypotenuse</p>
    </div>

    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 12px; color: white; box-shadow: 0 8px 16px rgba(79, 172, 254, 0.4);">
      <h4 style="margin: 0 0 1rem 0; font-size: 2rem; text-align: center;">TOA</h4>
      <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">tan(θ) = O/A</p>
      </div>
      <p style="margin: 1rem 0 0 0; text-align: center; opacity: 0.95;">Tangent = Opposite / Adjacent</p>
    </div>
  </div>

  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #f59e0b;">
    <h4 style="margin: 0 0 1rem 0; color: #92400e;">🎯 How to Remember SOH-CAH-TOA</h4>
    <p style="margin: 0 0 0.5rem 0;"><strong>"Some Old Hippie Caught Another Hippie Tripping On Acid"</strong></p>
    <p style="margin: 0; color: #78350f;">Silly? Yes. Memorable? Absolutely! Use whatever helps you remember it.</p>
  </div>

  <h3>Step-by-Step: How to Solve ANY Trig Problem</h3>

  <div style="background: #f8f9fa; padding: 2rem; border-radius: 8px; margin: 2rem 0; border: 2px solid #dee2e6;">
    <ol style="margin: 0; padding-left: 1.5rem; line-height: 2; font-size: 1.05rem;">
      <li><strong>Draw and label the triangle</strong> (if one isn't provided)</li>
      <li><strong>Mark the angle</strong> you're working with</li>
      <li><strong>Label the sides:</strong> Opposite, Adjacent, Hypotenuse</li>
      <li><strong>Pick the right formula</strong> from SOH-CAH-TOA based on which sides you have</li>
      <li><strong>Plug in and solve!</strong></li>
    </ol>
  </div>

  <h3>Let's Practice!</h3>

  <div style="background: #f1f5f9; padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #cbd5e1;">
    <h4 style="margin: 0 0 1.5rem 0; color: #1e293b;">Example 1: Finding a Side Length</h4>

    <div style="background: #e8f5e9; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
      <p style="margin: 0; font-weight: 600; color: #2c3e50;">Problem:</p>
      <p style="margin: 0.5rem 0 0 0;">In a right triangle, the angle θ = 30°, and the hypotenuse = 10. What is the length of the opposite side?</p>
    </div>

    <svg width="100%" height="200" viewBox="0 0 400 200" style="max-width: 400px; margin: 1.5rem auto; display: block;">
      <polygon points="50,180 50,50 300,180" fill="#e8f5e9" stroke="#4CAF50" stroke-width="2"/>
      <rect x="50" y="160" width="20" height="20" fill="none" stroke="#4CAF50" stroke-width="2"/>
      <text x="175" y="100" font-size="18" fill="#1e293b">10</text>
      <text x="20" y="120" font-size="18" fill="#dc2626">?</text>
      <path d="M 90 180 A 40 40 0 0 0 50 140" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <text x="100" y="170" font-size="16" fill="#f59e0b">30°</text>
    </svg>

    <div style="background: #fff3e0; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #FF9800; margin-top: 1rem;">
      <p style="margin: 0; font-weight: 600; color: #2c3e50;">Solution:</p>
      
      <div style="background: white; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
        <p style="margin: 0.5rem 0;"><strong>Step 1:</strong> Label what we have</p>
        <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
          <li>Angle θ = 30°</li>
          <li>Hypotenuse (H) = 10</li>
          <li>Opposite (O) = ?</li>
        </ul>
      </div>

      <div style="background: white; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
        <p style="margin: 0.5rem 0;"><strong>Step 2:</strong> Pick the right formula</p>
        <p style="margin: 0.5rem 0;">We have H, we need O, so we use <strong style="color: #7c3aed;">SOH</strong></p>
        <p style="margin: 0.5rem 0; font-size: 1.1rem; text-align: center; background: #f3e8ff; padding: 0.75rem; border-radius: 6px;">
          <strong>sin(θ) = O / H</strong>
        </p>
      </div>

      <div style="background: white; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
        <p style="margin: 0.5rem 0;"><strong>Step 3:</strong> Plug in the values</p>
        <div style="text-align: center; line-height: 2; font-size: 1.1rem;">
          <div>sin(30°) = O / 10</div>
          <div>0.5 = O / 10</div>
          <div>O = 10 × 0.5</div>
          <div style="font-weight: 700; color: #047857; font-size: 1.2rem; margin-top: 0.5rem;">O = 5</div>
        </div>
      </div>

      <p style="margin: 1.5rem 0 0 0; padding: 1.5rem; background: #ecfdf5; border-radius: 6px; font-weight: 600; text-align: center; color: #047857; font-size: 1.1rem;">
        The opposite side is 5 units long!
      </p>
    </div>
  </div>

  <div style="background: #fef2f2; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #ef4444;">
    <h4 style="margin: 0 0 1rem 0; color: #991b1b;">⚠️ Common Mistakes to Avoid</h4>
    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
      <li>Make sure your calculator is in <strong>DEGREE mode</strong>, not radian mode!</li>
      <li>Don't mix up opposite and adjacent - always label them based on YOUR angle</li>
      <li>The hypotenuse is ALWAYS the longest side and opposite the right angle</li>
    </ul>
  </div>

  <div style="margin: 4rem 0 2rem 0; padding: 2rem; background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%); border-radius: 12px; color: white;">
    <p style="margin: 0 0 1rem 0; font-weight: 700; font-size: 1.3rem; text-align: center;">🎯 The Trigonometry Master Formula</p>
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; text-align: center; font-size: 1.5rem; font-weight: 700; margin: 1rem 0;">
      SOH-CAH-TOA
    </div>
    <p style="margin: 1rem 0 0 0; text-align: center; opacity: 0.9;">Memorize this and you can solve ANY right triangle problem on the ACT!</p>
  </div>
</div>`
};

async function updateLessons() {
  for (const [key, content] of Object.entries(enhancedLessons)) {
    const { error } = await supabase
      .from('lessons')
      .update({ content })
      .eq('lesson_key', key);

    if (error) {
      console.error(`Error updating ${key}:`, error);
    } else {
      console.log(`✓ Enhanced ${key} with comprehensive teaching content!`);
    }
  }
  console.log('\n✓ Phase 1 complete: Enhanced 2 key visual lessons');
  console.log('Next: Will enhance remaining lessons...');
}

updateLessons();
