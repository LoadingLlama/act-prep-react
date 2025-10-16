import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

const cleanContent = `
<div class="lesson-content">
  <h2>Geometry Part 1 — Angles</h2>

  <p class="lesson-intro">In this lesson, we will cover all the rules you need to know for angles questions on the ACT. For angles questions, put your pencil to work by finding and labeling unknown angles. The more angles you label, the easier it will be to find the angle you need to know to answer the question.</p>

  <h3>Intersecting Lines</h3>

  <p>If two lines intersect, what do we know about the relationships between the angles?</p>

  <ul style="margin: 1rem 0; padding-left: 2rem;">
    <li><strong>Vertical angles are equal</strong></li>
    <li><strong>Adjacent angles are supplementary</strong> (<em>x</em> and <em>y</em> add to 180°)</li>
  </ul>

  <h3>Parallel Lines</h3>

  <p>When two parallel lines are intersected by another line (called a transversal), several angle relationships are created:</p>

  <div class="diagram-box" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background-color: #f8faff;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Angles_with_parallel_lines.png" alt="Parallel lines with transversal" style="max-width: 400px; height: auto;">
    <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
      <em>When a transversal crosses parallel lines, it creates several angle relationships</em>
    </p>
  </div>

  <p><strong>Given two parallel lines, we know the following are true:</strong></p>

  <ul style="margin: 1rem 0; padding-left: 2rem;">
    <li>Vertical angles are equal (ex: ∠1 = ∠4)</li>
    <li>Alternate interior angles are equal (ex: ∠3 = ∠6)</li>
    <li>Opposite interior angles are supplementary (ex: ∠3 + ∠5 = 180° and ∠4 + ∠6 = 180°)</li>
    <li>Corresponding angles are equal (ex: ∠2 = ∠6)</li>
  </ul>

  <p>All those rules and fancy terms are nice, but all you really need to know is that <strong>whenever two parallel lines are intersected by another line, there are two sets of identical angles</strong>.</p>

  <div style="background: #f0f0f0; padding: 1rem; margin: 1rem 0; border-radius: 4px;">
    <p style="margin: 0.25rem 0;"><strong>Set 1:</strong> ∠1 = ∠4 = ∠5 = ∠8</p>
    <p style="margin: 0.25rem 0;"><strong>Set 2:</strong> ∠2 = ∠3 = ∠6 = ∠7</p>
  </div>

  <p>Any of the angles from the first list will be supplementary with any of the angles from the second list. For example, ∠1 + ∠6 = 180° and ∠4 + ∠7 = 180°. As long as you memorize which angles are identical, you will be able to handle parallel lines questions.</p>

  <h3>Example Problems</h3>

  <div class="example-box" style="margin: 2rem 0; padding: 0; background: #f8f9fa; border-left: 4px solid #4CAF50; border-radius: 4px; overflow: hidden;">
    <div style="background: #e8f5e9; padding: 1rem 1.5rem; border-bottom: 2px solid #4CAF50;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">Example 1</h4>
      <p style="margin: 0;"><strong>Problem:</strong> In the figure, AB is parallel with CD. What is the value of <em>x</em>?</p>
      <ul style="list-style: none; padding-left: 0; margin: 0.5rem 0 0 0;">
        <li>A. 34</li>
        <li>B. 40</li>
        <li>C. 48</li>
        <li>D. 56</li>
      </ul>
    </div>
    <div style="background: #fff3e0; padding: 1rem 1.5rem;">
      <p style="margin: 0 0 0.5rem 0;"><strong>Solution:</strong></p>
      <p style="margin: 0.5rem 0;">We know that all angles in a triangle add up to 180°, so we can find the unknown third angle in the triangle.</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">Third angle = 180° − 34° − 90° = 56°</p>
      </div>
      <p style="margin: 0.5rem 0;">The third angle we just found and <em>x</em>° are alternate interior angles, so they must be equal.</p>
      <p style="margin: 0.5rem 0 0 0;"><strong>Answer: D (56)</strong></p>
    </div>
  </div>

  <div class="tip-box" style="margin: 2rem 0; padding: 1.5rem; background: #fff8e1; border-left: 4px solid #FFC107; border-radius: 4px;">
    <h4 style="margin: 0 0 0.5rem 0; color: #F57C00;">💡 TIP — Extend Parallel Lines</h4>
    <p style="margin: 0;">Sometimes questions with parallel lines will not always look like the parallel lines in the figure. If the lines just hit and stop (ex: the corner of a parallelogram), take your pencil and extend the lines yourself to make the question look like the figure above. Then, it will be much easier to tell which angles are identical.</p>
  </div>

  <h3>Complementary and Supplementary Angles</h3>

  <div style="display: flex; gap: 2rem; margin: 1.5rem 0; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 250px;">
      <div class="diagram-box" style="text-align: center; padding: 1rem; background-color: #f8faff;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Complement_angle.svg" alt="Complementary angles diagram" style="max-width: 200px; height: auto;">
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          <em>Complementary: add to 90°</em>
        </p>
      </div>
    </div>
    <div style="flex: 1; min-width: 250px;">
      <div class="diagram-box" style="text-align: center; padding: 1rem; background-color: #f8faff;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Angle_supplementary1.svg" alt="Supplementary angles diagram" style="max-width: 200px; height: auto;">
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          <em>Supplementary: add to 180°</em>
        </p>
      </div>
    </div>
  </div>

  <h3>Interior Angles in Polygons</h3>

  <p>You need to know the sum of the interior angles of various polygons. Here's the formula and some common examples:</p>

  <div style="background: #f0f0f0; padding: 1.5rem; margin: 1rem 0; border-radius: 4px;">
    <p style="margin: 0 0 1rem 0;"><strong>Formula:</strong> Sum of Interior Angles = 180°(<em>n</em> − 2)</p>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.95rem;"><em>where n is the number of sides</em></p>

    <table style="width: 100%; margin-top: 1rem; border-collapse: collapse;">
      <tr style="background: #fff; border-bottom: 2px solid #ddd;">
        <th style="padding: 0.75rem; text-align: left;">Shape</th>
        <th style="padding: 0.75rem; text-align: left;">Sides</th>
        <th style="padding: 0.75rem; text-align: left;">Sum of Interior Angles</th>
      </tr>
      <tr style="background: #fff;">
        <td style="padding: 0.5rem;">Triangle</td>
        <td style="padding: 0.5rem;">3</td>
        <td style="padding: 0.5rem;">180°</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 0.5rem;">Quadrilateral</td>
        <td style="padding: 0.5rem;">4</td>
        <td style="padding: 0.5rem;">360°</td>
      </tr>
      <tr style="background: #fff;">
        <td style="padding: 0.5rem;">Pentagon</td>
        <td style="padding: 0.5rem;">5</td>
        <td style="padding: 0.5rem;">540°</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 0.5rem;">Hexagon</td>
        <td style="padding: 0.5rem;">6</td>
        <td style="padding: 0.5rem;">720°</td>
      </tr>
    </table>
  </div>

  <p>It does not matter what the shape looks like. All that matters for the sum of the interior angles is the number of sides.</p>

  <div class="example-box" style="margin: 2rem 0; padding: 0; background: #f8f9fa; border-left: 4px solid #4CAF50; border-radius: 4px; overflow: hidden;">
    <div style="background: #e8f5e9; padding: 1rem 1.5rem; border-bottom: 2px solid #4CAF50;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">Example 2</h4>
      <p style="margin: 0;"><strong>Problem:</strong> In triangle ABC, ∠ABD is 68°, ∠ACD is 40°, and AD is a bisector of ∠CAB. What is the measure of ∠ADC?</p>
      <ul style="list-style: none; padding-left: 0; margin: 0.5rem 0 0 0;">
        <li>A. 68</li>
        <li>B. 72</li>
        <li>C. 104</li>
        <li>D. 108</li>
      </ul>
    </div>
    <div style="background: #fff3e0; padding: 1rem 1.5rem;">
      <p style="margin: 0 0 0.5rem 0;"><strong>Solution:</strong></p>
      <p style="margin: 0.5rem 0;">We know that all angles in a triangle add to 180°, so we can use △ABC to find ∠CAB.</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">∠CAB + ∠ABD + ∠ACD = 180°</p>
        <p style="margin: 0.25rem 0;">∠CAB + 68° + 40° = 180°</p>
        <p style="margin: 0.25rem 0;">∠CAB = 72°</p>
      </div>
      <p style="margin: 0.5rem 0;">The question tells us that AD is a bisector of ∠CAB. A bisector cuts an angle in half, so:</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">∠CAD = ∠BAD = 72° ÷ 2 = 36°</p>
      </div>
      <p style="margin: 0.5rem 0;">Now we can use △ADC to find ∠ADC:</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;">∠ADC + ∠ACD + ∠CAD = 180°</p>
        <p style="margin: 0.25rem 0;">∠ADC + 40° + 36° = 180°</p>
        <p style="margin: 0.25rem 0;">∠ADC = 104°</p>
      </div>
      <p style="margin: 0.5rem 0 0 0;"><strong>Answer: C (104)</strong></p>
    </div>
  </div>

  <div class="example-box" style="margin: 2rem 0; padding: 0; background: #f8f9fa; border-left: 4px solid #4CAF50; border-radius: 4px; overflow: hidden;">
    <div style="background: #e8f5e9; padding: 1rem 1.5rem; border-bottom: 2px solid #4CAF50;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.1rem;">Example 3</h4>
      <p style="margin: 0;"><strong>Problem:</strong> A pentagon has interior angles of <em>x</em>°, 1.3<em>x</em>°, 1.4<em>x</em>°, 1.2<em>x</em>°, and 1.1<em>x</em>°. What is the value of <em>x</em>?</p>
      <ul style="list-style: none; padding-left: 0; margin: 0.5rem 0 0 0;">
        <li>A. 60</li>
        <li>B. 72</li>
        <li>C. 80</li>
        <li>D. 90</li>
      </ul>
    </div>
    <div style="background: #fff3e0; padding: 1rem 1.5rem;">
      <p style="margin: 0 0 0.5rem 0;"><strong>Solution:</strong></p>
      <p style="margin: 0.5rem 0;">The figure has 5 sides, so the total interior angles are equal to 180°(5 − 2) = 540°.</p>
      <div style="background: white; padding: 1rem; margin: 0.75rem 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 0.25rem 0;"><em>x</em>° + 1.3<em>x</em>° + 1.4<em>x</em>° + 1.2<em>x</em>° + 1.1<em>x</em>° = 540°</p>
        <p style="margin: 0.25rem 0;">6<em>x</em>° = 540°</p>
        <p style="margin: 0.25rem 0;"><em>x</em> = 90</p>
      </div>
      <p style="margin: 0.5rem 0 0 0;"><strong>Answer: D (90)</strong></p>
    </div>
  </div>

  <div class="tip-box" style="margin: 2rem 0; padding: 1.5rem; background: #fff8e1; border-left: 4px solid #FFC107; border-radius: 4px;">
    <h4 style="margin: 0 0 0.5rem 0; color: #F57C00;">💡 TIP — All Figures Are Drawn to Scale</h4>
    <p style="margin: 0 0 0.5rem 0;">All figures on the ACT are drawn to scale! You can trust the angles and side lengths in the figure.</p>
    <p style="margin: 0;">If you are given a figure and do not know how to solve the question, look at the answer choices to see if you can make an educated guess on which answer looks correct. Quite often, you can rule out certain answer choices that clearly do not match the figure. The only exception is if you see, "Note: Figure not drawn to scale." This rarely occurs on the ACT, but in case you do see it, do not trust the figure.</p>
  </div>

  <div class="tip-box" style="margin: 2rem 0; padding: 1.5rem; background: #e3f2fd; border-left: 4px solid #2196F3; border-radius: 4px;">
    <h4 style="margin: 0 0 0.5rem 0; color: #1976d2;">Key Takeaway</h4>
    <p style="margin: 0;">Master angle relationships with intersecting lines, parallel lines, and polygons. Remember to label unknown angles as you work through problems, and trust that ACT figures are drawn to scale (unless noted otherwise)!</p>
  </div>
</div>
`.trim();

async function updateGeometryAnglesLesson() {
  console.log('Updating Geometry Part 1 — Angles lesson with clean formatting...\\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ content: cleanContent })
    .eq('lesson_key', 'geometry-angles')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
  } else {
    console.log('✅ Successfully updated Geometry Part 1 — Angles lesson!');
    console.log(`   Lesson ID: ${data[0].id}`);
    console.log(`   New content length: ${cleanContent.length} characters`);
    console.log('');
    console.log('Changes made:');
    console.log('  ✓ Removed duplicate "Lesson:" text');
    console.log('  ✓ Organized content into clear sections with proper h3 headings');
    console.log('  ✓ Integrated diagrams at relevant positions in content');
    console.log('  ✓ Created clean table for interior angles of polygons');
    console.log('  ✓ Fixed all 3 examples with proper structure and complete problem statements');
    console.log('  ✓ Added two-tone example boxes (green Problem, orange Solution)');
    console.log('  ✓ Added solution boxes with clean formatting');
    console.log('  ✓ Added TIP boxes with helpful strategies');
    console.log('  ✓ Added "Key Takeaway" tip box');
    console.log('  ✓ Removed all broken HTML and formatting issues');
    console.log('  ✓ Clean headings (1 h2, 5 h3 tags only)');
  }
}

updateGeometryAnglesLesson();
