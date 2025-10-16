import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function generateLesson22() {
  console.log('Generating Lesson 2.2: Areas, Volumes & Triangles...\n');

  const lessonContent = `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Mastering <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">area and volume formulas</strong> along with <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">triangle properties</strong> is essential for ACT Math success. These concepts appear in approximately 8-12 questions on every ACT test, making them one of the highest-yield topics to master. Whether calculating the area of a shaded region, finding the volume of a composite solid, or applying the Pythagorean theorem, a solid understanding of these formulas and properties will significantly boost your score.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Area Formulas</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT expects you to know area formulas for common shapes. These formulas are NOT provided on the test, so you must memorize them.</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Rectangle:</strong> Area = length × width = <em>lw</em></li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Triangle:</strong> Area = ½ × base × height = ½<em>bh</em>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>The height must be perpendicular to the base</li>
      <li>Any side can be the base—just use the corresponding height</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Circle:</strong> Area = π<em>r</em><sup>2</sup> (where <em>r</em> is the radius)
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Remember: radius is half the diameter</li>
      <li>If given diameter <em>d</em>, then <em>r</em> = <em>d</em>/2</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Trapezoid:</strong> Area = ½(<em>b</em><sub>1</sub> + <em>b</em><sub>2</sub>)<em>h</em>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li><em>b</em><sub>1</sub> and <em>b</em><sub>2</sub> are the two parallel bases</li>
      <li><em>h</em> is the perpendicular height between the bases</li>
    </ul>
  </li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Finding Area of a Triangle</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A triangle has a base of 12 inches and a height of 8 inches. What is the area, in square inches?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 20</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 40</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 48</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 96</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 192</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Use the triangle area formula: Area = ½<em>bh</em></li>
  <li style="margin: 0.15rem 0;">Substitute: Area = ½(12)(8) = ½(96) = 48 square inches</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: C</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Volume Formulas</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Volume questions appear frequently on the ACT. Like area formulas, these are NOT provided, so memorization is critical.</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Rectangular Prism (Box):</strong> Volume = length × width × height = <em>lwh</em></li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Cube:</strong> Volume = <em>s</em><sup>3</sup> (where <em>s</em> is the side length)</li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Cylinder:</strong> Volume = π<em>r</em><sup>2</sup><em>h</em>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Think: (area of circular base) × height</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Sphere:</strong> Volume = (4/3)π<em>r</em><sup>3</sup></li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Cone:</strong> Volume = (1/3)π<em>r</em><sup>2</sup><em>h</em>
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Notice it's 1/3 of a cylinder with the same base and height</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Pyramid:</strong> Volume = (1/3) × (base area) × height = (1/3)<em>Bh</em></li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Finding Volume of a Cylinder</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A cylindrical water tank has a radius of 5 feet and a height of 12 feet. What is the volume, in cubic feet?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">F. 60π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">G. 120π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">H. 300π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">J. 600π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">K. 1200π</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Use the cylinder volume formula: Volume = π<em>r</em><sup>2</sup><em>h</em></li>
  <li style="margin: 0.15rem 0;">Substitute: Volume = π(5)<sup>2</sup>(12) = π(25)(12) = 300π cubic feet</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: H</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Right Triangles and Pythagorean Theorem</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Pythagorean theorem</strong> is one of the most tested concepts on the ACT Math section. It relates the sides of a right triangle.</p>

<div style="text-align: center; font-size: 20px; margin: 1.5rem 0; padding: 1rem; background: #f3f4f6; border-radius: 8px;">
  <strong><em>a</em><sup>2</sup> + <em>b</em><sup>2</sup> = <em>c</em><sup>2</sup></strong><br>
  <span style="font-size: 14px; color: #6b7280;">where <em>c</em> is the hypotenuse (longest side, opposite the right angle)</span>
</div>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Key Concept:</strong> The Pythagorean theorem ONLY works for right triangles (triangles with a 90° angle)</li>
  <li style="margin: 0.15rem 0;"><strong>Hypotenuse:</strong> Always the longest side, always opposite the right angle</li>
  <li style="margin: 0.15rem 0;"><strong>Legs:</strong> The two shorter sides that form the right angle</li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Using Pythagorean Theorem</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 10</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 12</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 14</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. √100</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 100</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Use Pythagorean theorem: <em>a</em><sup>2</sup> + <em>b</em><sup>2</sup> = <em>c</em><sup>2</sup></li>
  <li style="margin: 0.15rem 0;">Substitute: 6<sup>2</sup> + 8<sup>2</sup> = <em>c</em><sup>2</sup></li>
  <li style="margin: 0.15rem 0;">Simplify: 36 + 64 = <em>c</em><sup>2</sup>, so 100 = <em>c</em><sup>2</sup></li>
  <li style="margin: 0.15rem 0;">Take square root: <em>c</em> = 10</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: A</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. Special Right Triangles</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT loves testing <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">special right triangles</strong>. Memorizing these patterns saves massive amounts of time.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">45-45-90 Triangle</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Angles: 45°, 45°, 90°</li>
  <li style="margin: 0.15rem 0;">Side ratio: <strong>1 : 1 : √2</strong></li>
  <li style="margin: 0.15rem 0;">If legs have length <em>x</em>, hypotenuse has length <em>x</em>√2</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">30-60-90 Triangle</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Angles: 30°, 60°, 90°</li>
  <li style="margin: 0.15rem 0;">Side ratio: <strong>1 : √3 : 2</strong></li>
  <li style="margin: 0.15rem 0;">If shortest leg (opposite 30°) = <em>x</em>, then longer leg (opposite 60°) = <em>x</em>√3, and hypotenuse = 2<em>x</em></li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 4: 45-45-90 Triangle</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In a 45-45-90 triangle, each leg has length 7. What is the length of the hypotenuse?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">F. 7</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">G. 7√2</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">H. 14</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">J. 7√3</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">K. 14√2</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Recognize this as a 45-45-90 triangle with legs of length 7</li>
  <li style="margin: 0.15rem 0;">Use the ratio 1 : 1 : √2</li>
  <li style="margin: 0.15rem 0;">Hypotenuse = leg × √2 = 7√2</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: G</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">5. Triangle Properties</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Understanding triangle properties helps you solve ACT problems quickly.</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Similar Triangles</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Similar triangles</strong> have the same angles and proportional sides</li>
  <li style="margin: 0.15rem 0;">If triangle ABC ~ triangle DEF, then AB/DE = BC/EF = AC/DF</li>
  <li style="margin: 0.15rem 0;">Use proportions to find missing sides</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Isosceles and Equilateral Triangles</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Isosceles triangles</strong> have two equal sides and two equal angles
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>The angles opposite the equal sides are equal</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Equilateral triangles</strong> have three equal sides and three 60° angles</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Triangle Inequality Theorem</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">The sum of any two sides must be greater than the third side</li>
  <li style="margin: 0.15rem 0;">Example: If two sides are 5 and 8, the third side must be greater than 3 (8 - 5) and less than 13 (8 + 5)</li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 5: Similar Triangles</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Two similar triangles have corresponding sides in the ratio 2:5. If the smaller triangle has a side of length 6, what is the length of the corresponding side in the larger triangle?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 12</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 15</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 18</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 20</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 30</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Set up proportion: 2/5 = 6/<em>x</em></li>
  <li style="margin: 0.15rem 0;">Cross multiply: 2<em>x</em> = 30</li>
  <li style="margin: 0.15rem 0;">Solve: <em>x</em> = 15</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: B</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">6. ACT Strategy Tips</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Master these ACT-specific strategies for area, volume, and triangle problems:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Common Pythagorean Triples:</strong> Memorize 3-4-5, 5-12-13, 8-15-17, and their multiples (6-8-10, 9-12-15, etc.)</li>
  <li style="margin: 0.15rem 0;"><strong>Leave π in the Answer:</strong> ACT answer choices often have π in them—don't multiply it out</li>
  <li style="margin: 0.15rem 0;"><strong>Watch Your Units:</strong> Area is in square units (ft², in²), volume is in cubic units (ft³, in³)</li>
  <li style="margin: 0.15rem 0;"><strong>Draw It Out:</strong> If no diagram is provided, sketch one—it helps visualize the problem</li>
  <li style="margin: 0.15rem 0;"><strong>Special Triangles Save Time:</strong> Recognize 45-45-90 and 30-60-90 patterns instantly instead of using Pythagorean theorem</li>
</ul>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Triangle area = ½<em>bh</em>, Circle area = π<em>r</em><sup>2</sup>, Trapezoid area = ½(<em>b</em><sub>1</sub> + <em>b</em><sub>2</sub>)<em>h</em>
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Cylinder volume = π<em>r</em><sup>2</sup><em>h</em>, Sphere volume = (4/3)π<em>r</em><sup>3</sup>, Cone volume = (1/3)π<em>r</em><sup>2</sup><em>h</em>
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Pythagorean theorem: <em>a</em><sup>2</sup> + <em>b</em><sup>2</sup> = <em>c</em><sup>2</sup> (only for right triangles)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Special triangles: 45-45-90 has ratio 1:1:√2, and 30-60-90 has ratio 1:√3:2
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Memorize common Pythagorean triples (3-4-5, 5-12-13, 8-15-17) and their multiples
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Similar triangles have proportional corresponding sides
  </li>
</ul>`;

  // Insert lesson metadata
  const { data: lessonMeta, error: metaError } = await supabase
    .from('lesson_metadata')
    .insert([
      {
        lesson_key: 'areas-volumes-triangles',
        title: 'Topic 2.2 - Areas, Volumes & Triangles',
        subject: 'math',
        category: 'Geometry',
        difficulty_level: 2,
        duration_minutes: 30,
        order_index: 22,
        is_published: true
      }
    ])
    .select()
    .single();

  if (metaError) {
    console.error('Error inserting lesson metadata:', metaError);
    return;
  }

  console.log('✓ Inserted lesson metadata');

  // Insert main section
  const { data: section, error: sectionError } = await supabase
    .from('lesson_sections')
    .insert([
      {
        lesson_id: lessonMeta.id,
        section_key: 'areas-volumes-triangles-main',
        title: 'Main Content',
        section_type: 'content',
        order_index: 0
      }
    ])
    .select()
    .single();

  if (sectionError) {
    console.error('Error inserting section:', sectionError);
    return;
  }

  console.log('✓ Inserted main section');

  // Insert content
  const { error: contentError } = await supabase
    .from('section_content')
    .insert([
      {
        section_id: section.id,
        content_type: 'html',
        content: lessonContent,
        order_index: 0
      }
    ]);

  if (contentError) {
    console.error('Error inserting content:', contentError);
    return;
  }

  console.log('✓ Inserted content');
  console.log('\n✅ Lesson 2.2 generated successfully!');
}

generateLesson22().catch(console.error);
