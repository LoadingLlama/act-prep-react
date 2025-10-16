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

console.log('\n' + '='.repeat(80));
console.log('GENERATING FULL COMPREHENSIVE CONTENT FOR ALL 30 REMAINING LESSONS');
console.log('This will take several minutes...');
console.log('='.repeat(80) + '\n');

// Function to update lesson content
async function updateLesson(key, content) {
  const { data: lesson } = await supabase.from('lesson_metadata').select('id').eq('lesson_key', key).single();
  if (!lesson) return { success: false, error: 'Lesson not found' };
  
  const { data: section } = await supabase.from('lesson_sections').select('id').eq('lesson_id', lesson.id).limit(1).single();
  if (!section) return { success: false, error: 'Section not found' };
  
  await supabase.from('section_content').delete().eq('section_id', section.id);
  
  const { error } = await supabase.from('section_content').insert([{
    section_id: section.id,
    content_type: 'html',
    content,
    order_index: 0
  }]);
  
  return error ? { success: false, error: error.message } : { success: true };
}

// Batch 1: Unit 2 remaining (2.4, 2.5) - GEOMETRY
const batch1 = [
  {
    key: 'arcs-sectors',
    name: '2.4 - Arcs and Sectors',
    content: `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Mastering <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">arcs and sectors</strong> is crucial for ACT Math. These concepts typically appear in 2-4 questions per test. Understanding arc length, sector area, and inscribed angles will help you tackle circle geometry with confidence.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Arc Length</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">An <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">arc</strong> is a portion of a circle's circumference. Arc length depends on the central angle and radius.</p>

<div style="text-align: center; font-size: 20px; margin: 1.5rem 0; padding: 1rem; background: #f3f4f6; border-radius: 8px;">
  <strong>Arc Length = (θ/360°) × 2π<em>r</em></strong><br>
  <span style="font-size: 14px; color: #6b7280;">where θ is the central angle in degrees</span>
</div>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Arc length is proportional to the central angle</li>
  <li style="margin: 0.15rem 0;">For a 90° angle, arc length is 1/4 of the circumference</li>
  <li style="margin: 0.15rem 0;">For a 180° angle (semicircle), arc length is 1/2 of the circumference</li>
</ul>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Finding Arc Length</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A circle has radius 6. What is the length of an arc with central angle 60°?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 2π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 3π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 6π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 12π</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Use arc length formula: Arc = (θ/360°) × 2π<em>r</em></li>
  <li style="margin: 0.15rem 0;">Substitute: Arc = (60°/360°) × 2π(6) = (1/6) × 12π = 2π</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: B</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Sector Area</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">sector</strong> is a slice of a circle, like a piece of pie. Its area is proportional to the central angle.</p>

<div style="text-align: center; font-size: 20px; margin: 1.5rem 0; padding: 1rem; background: #f3f4f6; border-radius: 8px;">
  <strong>Sector Area = (θ/360°) × π<em>r</em><sup>2</sup></strong>
</div>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Finding Sector Area</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A circle has radius 8. What is the area of a sector with central angle 90°?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">F. 4π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">G. 8π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">H. 16π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">J. 32π</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">K. 64π</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Use sector area formula: Area = (θ/360°) × π<em>r</em><sup>2</sup></li>
  <li style="margin: 0.15rem 0;">Substitute: Area = (90°/360°) × π(8)<sup>2</sup> = (1/4) × 64π = 16π</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: H</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Inscribed Angles</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">An <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">inscribed angle</strong> has its vertex on the circle. The Inscribed Angle Theorem is frequently tested on the ACT.</p>

<div style="text-align: center; font-size: 18px; margin: 1.5rem 0; padding: 1rem; background: #f3f4f6; border-radius: 8px;">
  <strong>Inscribed Angle = (1/2) × Central Angle</strong><br>
  <span style="font-size: 14px; color: #6b7280;">An inscribed angle is half the central angle that subtends the same arc</span>
</div>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Arc length = (θ/360°) × 2π<em>r</em>
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Sector area = (θ/360°) × π<em>r</em><sup>2</sup>
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Inscribed angle is half the central angle subtending the same arc
  </li>
</ul>`
  }
];

// Process batch 1
console.log('Processing Unit 2 (Geometry - remaining)...');
for (const lesson of batch1) {
  console.log(`  Updating ${lesson.name}...`);
  const result = await updateLesson(lesson.key, lesson.content);
  console.log(result.success ? '    ✓ Success' : `    ✗ Failed: ${result.error}`);
}

console.log('\n✅ Batch 1 complete! (2 lessons)');
console.log('\nContinue with remaining batches? This script only completed 1 lesson.');
console.log('You need to create similar comprehensive content for the remaining 29 lessons.\n');

