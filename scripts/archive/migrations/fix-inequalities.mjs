import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const fixedContent = `<div class="lesson-content">
<p>Inequalities work almost exactly like equations, but with one critical rule: when you multiply or divide by a negative number, you must flip the inequality sign! Let's learn how to solve and graph inequalities step by step.</p>

<h3>Inequality Symbols</h3>

<ul>
<li><strong>&gt;</strong> : Greater than (example: x &gt; 5 means x is more than 5)</li>
<li><strong>≥</strong> : Greater than or equal (example: x ≥ 5 means x is 5 or more)</li>
<li><strong>&lt;</strong> : Less than (example: x &lt; 5 means x is less than 5)</li>
<li><strong>≤</strong> : Less than or equal (example: x ≤ 5 means x is 5 or less)</li>
</ul>

<h3>The Critical Rule</h3>

<p><strong>FLIP THE SIGN WHEN MULTIPLYING/DIVIDING BY A NEGATIVE!</strong></p>

<p><strong>Example:</strong></p>

<p>−2x &lt; 6<br>
Divide both sides by −2:<br>
x &gt; −3 (sign flipped from &lt; to &gt;!)</p>

<h3>Solving Inequalities</h3>

<p>Solve inequalities just like equations—isolate the variable using the same steps. Just remember to flip the sign if you multiply or divide by a negative!</p>

<h4>Step-by-Step Example: Solve −3x + 7 &gt; 16</h4>

<p><strong>Step 1: Isolate the term with x.</strong> Subtract 7 from both sides to get the x term alone:</p>

<p>−3x + 7 &gt; 16<br>
−3x &gt; 9</p>

<p><strong>Step 2: Divide by −3 and FLIP the sign!</strong> When dividing by a negative number, the inequality sign reverses:</p>

<p>−3x &gt; 9<br>
Divide both sides by −3:<br>
x &lt; −3 (sign flipped from &gt; to &lt;!)</p>

<h3>Graphing Inequalities on a Number Line</h3>

<h4>x &gt; 3</h4>
<p><strong>Open circle</strong> at 3 (not equal), shade right</p>

<h4>x ≥ 3</h4>
<p><strong>Filled circle</strong> at 3 (includes equal), shade right</p>

<h4>x &lt; 3</h4>
<p><strong>Open circle</strong> at 3 (not equal), shade left</p>

<h4>x ≤ 3</h4>
<p><strong>Filled circle</strong> at 3 (includes equal), shade left</p>

<h3>Example Problem</h3>

<h4>Example 1</h4>

<p><strong>Problem:</strong> Solve for x: −3x + 7 &gt; 16</p>

<p>A. x &gt; −3<br>
B. x &lt; −3<br>
C. x &gt; 3<br>
D. x &lt; 3</p>

<p><strong>Solution:</strong> Solve like an equation, but flip the sign when dividing by −3.</p>

<p>−3x + 7 &gt; 16<br>
−3x &gt; 9<br>
x &lt; −3 (sign flipped!)</p>

<p><strong>Answer: B</strong></p>

<h3>Key Takeaway</h3>

<p>The most common mistake with inequalities is forgetting to flip the sign when multiplying or dividing by a negative! Always watch for this. Everything else works exactly like equations.</p>

</div>`;

async function fixInequalities() {
  console.log('🔧 Fixing inequalities lesson...\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: fixedContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'inequalities');

  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log('✅ Inequalities lesson fixed successfully!');
  }
}

fixInequalities();
