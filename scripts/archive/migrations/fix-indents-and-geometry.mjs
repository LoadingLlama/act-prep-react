import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function removeAllIndents(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Remove ALL leading whitespace from text nodes
  $('*').each(function() {
    $(this).contents().each(function() {
      if (this.type === 'text') {
        // Remove leading spaces/tabs from each line
        this.data = this.data.replace(/^\s+/gm, '');
        // Also remove excessive spaces (more than 1)
        this.data = this.data.replace(/  +/g, ' ');
      }
    });
  });

  return $.html('.lesson-content');
}

// Create improved geometry angles lesson with correct visuals
const improvedGeometryAngles = `<div class="lesson-content">
<p class="lesson-intro">Angles are fundamental to geometry! Understanding angle types and relationships will help you solve many ACT problems. Let's master angles step-by-step, starting with the basics and building to more complex scenarios.</p>

<h3>Types of Angles</h3>

<p>An angle is formed when two lines or rays meet at a point. We measure angles in degrees (°).</p>

<svg width="600" height="180" style="display: block; margin: 1.5rem auto;">
  <!-- Acute Angle (45 degrees) -->
  <line x1="50" y1="100" x2="150" y2="100" stroke="#333" stroke-width="2"/>
  <line x1="50" y1="100" x2="120" y2="30" stroke="#333" stroke-width="2"/>
  <path d="M 80 100 A 30 30 0 0 1 73 80" fill="none" stroke="#4A90E2" stroke-width="2"/>
  <text x="85" y="85" font-size="12" fill="#4A90E2">45°</text>
  <text x="100" y="130" text-anchor="middle" font-size="14"><strong>Acute</strong></text>
  <text x="100" y="150" text-anchor="middle" font-size="12">Less than 90°</text>

  <!-- Right Angle (90 degrees) -->
  <line x1="200" y1="100" x2="300" y2="100" stroke="#333" stroke-width="2"/>
  <line x1="200" y1="100" x2="200" y2="30" stroke="#333" stroke-width="2"/>
  <rect x="200" y="90" width="10" height="10" fill="none" stroke="#4A90E2" stroke-width="2"/>
  <text x="210" y="70" font-size="12" fill="#4A90E2">90°</text>
  <text x="250" y="130" text-anchor="middle" font-size="14"><strong>Right</strong></text>
  <text x="250" y="150" text-anchor="middle" font-size="12">Exactly 90°</text>

  <!-- Obtuse Angle (135 degrees - CORRECT) -->
  <line x1="350" y1="100" x2="450" y2="100" stroke="#333" stroke-width="2"/>
  <line x1="350" y1="100" x2="380" y2="25" stroke="#333" stroke-width="2"/>
  <path d="M 380 100 A 30 30 0 0 1 365 75" fill="none" stroke="#E27D60" stroke-width="2"/>
  <text x="390" y="80" font-size="12" fill="#E27D60">135°</text>
  <text x="400" y="130" text-anchor="middle" font-size="14"><strong>Obtuse</strong></text>
  <text x="400" y="150" text-anchor="middle" font-size="12">Greater than 90°</text>

  <!-- Straight Angle (180 degrees) -->
  <line x1="520" y1="100" x2="620" y2="100" stroke="#333" stroke-width="2"/>
  <path d="M 550 95 A 30 30 0 0 1 590 95" fill="none" stroke="#4A90E2" stroke-width="2"/>
  <text x="570" y="85" text-anchor="middle" font-size="12" fill="#4A90E2">180°</text>
  <text x="570" y="130" text-anchor="middle" font-size="14"><strong>Straight</strong></text>
  <text x="570" y="150" text-anchor="middle" font-size="12">Exactly 180°</text>
</svg>

<h3>When Two Lines Intersect</h3>

<p>When two straight lines cross, they create 4 angles. Two important relationships emerge:</p>

<svg width="400" height="300" style="display: block; margin: 1.5rem auto;">
  <!-- Two intersecting lines -->
  <line x1="50" y1="200" x2="350" y2="80" stroke="#333" stroke-width="3"/>
  <line x1="100" y1="50" x2="300" y2="230" stroke="#333" stroke-width="3"/>

  <!-- Angle labels -->
  <text x="240" y="110" font-size="18" fill="#4A90E2">a°</text>
  <text x="160" y="115" font-size="18" fill="#E27D60">b°</text>
  <text x="160" y="175" font-size="18" fill="#4A90E2">a°</text>
  <text x="240" y="180" font-size="18" fill="#E27D60">b°</text>

  <!-- Labels -->
  <text x="200" y="270" text-anchor="middle" font-size="14">Vertical angles (blue) are equal: a° = a°</text>
  <text x="200" y="290" text-anchor="middle" font-size="14">Adjacent angles add to 180°: a° + b° = 180°</text>
</svg>

<p><strong>Rule 1: Vertical Angles are Equal</strong></p>
<p>Angles across from each other are always equal.</p>

<p><strong>Rule 2: Adjacent Angles Sum to 180°</strong></p>
<p>Angles next to each other add up to 180°.</p>

<h4>Example: Finding All Angles</h4>

<p><strong>Problem:</strong> If one angle is 70°, what are the other three angles?</p>

<p><strong>Step 1:</strong> The vertical angle is also 70° (vertical angles are equal)</p>

<p><strong>Step 2:</strong> The adjacent angle is 180° - 70° = 110° (adjacent angles sum to 180°)</p>

<p><strong>Step 3:</strong> The last angle is also 110° (vertical to the second one)</p>

<p><strong>Answer:</strong> 70°, 110°, 70°, 110°</p>

<h3>Parallel Lines Cut by a Transversal</h3>

<p style="background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;">
<strong>This is THE most important angle concept on the ACT!</strong> When two parallel lines are crossed by another line (transversal), only TWO different angle measurements exist.
</p>

<svg width="500" height="300" style="display: block; margin: 1.5rem auto;">
  <!-- Parallel lines -->
  <line x1="50" y1="80" x2="450" y2="80" stroke="#333" stroke-width="3"/>
  <line x1="50" y1="220" x2="450" y2="220" stroke="#333" stroke-width="3"/>

  <!-- Transversal -->
  <line x1="150" y1="30" x2="350" y2="270" stroke="#666" stroke-width="3"/>

  <!-- Acute angles (60 degrees) in blue -->
  <text x="200" y="70" font-size="16" fill="#4A90E2" font-weight="bold">60°</text>
  <text x="270" y="100" font-size="16" fill="#4A90E2" font-weight="bold">60°</text>
  <text x="230" y="210" font-size="16" fill="#4A90E2" font-weight="bold">60°</text>
  <text x="300" y="240" font-size="16" fill="#4A90E2" font-weight="bold">60°</text>

  <!-- Obtuse angles (120 degrees) in red -->
  <text x="160" y="100" font-size="16" fill="#E27D60" font-weight="bold">120°</text>
  <text x="235" y="60" font-size="16" fill="#E27D60" font-weight="bold">120°</text>
  <text x="190" y="240" font-size="16" fill="#E27D60" font-weight="bold">120°</text>
  <text x="265" y="200" font-size="16" fill="#E27D60" font-weight="bold">120°</text>

  <text x="250" y="295" text-anchor="middle" font-size="14">Blue angles all equal (60°) | Red angles all equal (120°)</text>
</svg>

<p><strong>The Key Pattern:</strong></p>
<ul>
<li><strong>Set 1 (Acute):</strong> Four angles are equal - if one is 60°, all four are 60°</li>
<li><strong>Set 2 (Obtuse):</strong> Four angles are equal - if one is 120°, all four are 120°</li>
<li><strong>Relationship:</strong> Any angle from Set 1 + any angle from Set 2 = 180°</li>
</ul>

<h3>Example Problem</h3>

<h4>ACT-Style Question</h4>

<p><strong>Problem:</strong> Lines L₁ and L₂ are parallel. If angle 1 measures 65°, what is angle 6?</p>

<svg width="400" height="250" style="display: block; margin: 1rem auto;">
  <line x1="50" y1="70" x2="350" y2="70" stroke="#333" stroke-width="2"/>
  <line x1="50" y1="180" x2="350" y2="180" stroke="#333" stroke-width="2"/>
  <line x1="120" y1="30" x2="280" y2="220" stroke="#666" stroke-width="2"/>

  <!-- Angle labels -->
  <text x="160" y="60" font-size="14">1</text>
  <text x="200" y="85" font-size="14">2</text>
  <text x="140" y="90" font-size="14">3</text>
  <text x="175" y="65" font-size="14">4</text>
  <text x="210" y="170" font-size="14">5</text>
  <text x="250" y="195" font-size="14">6</text>
  <text x="190" y="200" font-size="14">7</text>
  <text x="225" y="175" font-size="14">8</text>

  <text x="200" y="235" text-anchor="middle" font-size="12">L₁ ∥ L₂</text>
</svg>

<p><strong>Solution:</strong></p>

<p><strong>Step 1:</strong> Angle 1 is 65° (acute), so it's in Set 1</p>

<p><strong>Step 2:</strong> All Set 1 angles equal 65°: angles 1, 4, 5, and 8</p>

<p><strong>Step 3:</strong> Angle 6 is in Set 2 (obtuse angles)</p>

<p><strong>Step 4:</strong> Set 2 = 180° - 65° = 115°</p>

<p><strong>Answer: 115°</strong></p>

<h3>Key Takeaway</h3>

<p><strong>Master Strategy for Parallel Lines:</strong></p>
<ol>
<li>Find ONE angle (usually given)</li>
<li>Identify if it's acute or obtuse</li>
<li>All angles in that group are EQUAL to it</li>
<li>All angles in the other group = 180° - that angle</li>
</ol>

<p>That's it! No memorizing complex terminology—just recognize the two sets of equal angles and you'll solve any parallel lines problem on the ACT.</p>

</div>`;

async function fixIndentsAndGeometry() {
  console.log('🔧 Fixing indents and geometry visuals...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  let successCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title}`);

    try {
      let fixed;

      // Special handling for geometry-angles lesson
      if (lesson.lesson_key === 'geometry-angles') {
        fixed = improvedGeometryAngles;
      } else {
        // Remove indents from all other lessons
        fixed = removeAllIndents(lesson.content);
      }

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: fixed,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Fixed`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully fixed: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

fixIndentsAndGeometry();
