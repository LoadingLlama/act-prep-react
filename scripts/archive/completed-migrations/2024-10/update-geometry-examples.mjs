/**
 * Update Geometry Lesson Examples
 * Extracts examples from content and converts to interactive format
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Interactive examples for geometry lesson
const examples = [
  {
    title: "Example 1: Complementary & Supplementary Angles",
    content: `
<h4>Example 1</h4>

<p style="margin: 1rem 0 1rem 0; font-size: 19px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; font-weight: 500; color: #111827;">
An angle measures 35°. What is its complement? What is its supplement?
</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span>A. Complement: 55°, Supplement: 145°</span><br>
<span>B. Complement: 145°, Supplement: 55°</span><br>
<span>C. Complement: 45°, Supplement: 155°</span><br>
<span>D. Complement: 65°, Supplement: 125°</span><br>
<span>E. Complement: 35°, Supplement: 180°</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li>Complement = 90° - 35° = 55°</li>
  <li>Supplement = 180° - 35° = 145°</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: A
</p>
    `
  },
  {
    title: "Example 2: Vertical & Adjacent Angles",
    content: `
<h4>Example 2</h4>

<p style="margin: 1rem 0 1rem 0; font-size: 19px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; font-weight: 500; color: #111827;">
Two lines intersect, creating four angles. One of the angles measures 125°. What are the measures of the other three angles?
</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span>A. 55°, 55°, 125°</span><br>
<span>B. 125°, 125°, 55°</span><br>
<span>C. 55°, 125°, 125°</span><br>
<span>D. 125°, 55°, 55°</span><br>
<span>E. 62.5°, 62.5°, 62.5°</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li>Find vertical angle: 125° (vertical angles are equal)</li>
  <li>Find adjacent angle: 180° - 125° = 55°</li>
  <li>Find fourth angle: 55° (vertical to the adjacent angle)</li>
  <li>Three angles: 55°, 125°, 125°</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: C
</p>
    `
  },
  {
    title: "Example 3: Parallel Lines & Corresponding Angles",
    content: `
<h4>Example 3</h4>

<p style="margin: 1rem 0 1rem 0; font-size: 19px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; font-weight: 500; color: #111827;">
In the figure below, lines <em>l</em> and <em>m</em> are parallel, and angle 1 measures 65°. What is the measure of angle 5?
</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span>A. 25°</span><br>
<span>B. 65°</span><br>
<span>C. 115°</span><br>
<span>D. 90°</span><br>
<span>E. 180°</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li>With parallel lines, there are only two angle values that sum to 180°</li>
  <li>Angle 1 = 65°, so the other set of angles = 180° - 65° = 115°</li>
  <li>Angle 5 is corresponding to angle 1 (same position at each intersection)</li>
  <li>Corresponding angles are equal, so angle 5 = 65°</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: B
</p>
    `
  }
];

async function updateExamples() {
  console.log('📝 Updating Geometry lesson with interactive examples...\\n');

  // Fetch the lesson
  const { data: lesson, error: fetchError } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (fetchError) {
    console.error('❌ Error fetching lesson:', fetchError);
    process.exit(1);
  }

  console.log(`✅ Found lesson: ${lesson.title}\\n`);

  // Update the lesson with examples array
  const { data, error } = await supabase
    .from('lessons')
    .update({ examples })
    .eq('lesson_key', 'geometry-angles')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully updated lesson with ${examples.length} interactive examples\\n`);

  // Display what was added
  console.log('📋 EXAMPLES ADDED:');
  console.log('─'.repeat(80));
  examples.forEach((ex, i) => {
    console.log(`  ${i + 1}. ${ex.title}`);
  });
  console.log();

  // Save updated lesson to file
  const outputPath = resolve(__dirname, '../GOLD_STANDARD_LESSON_UPDATED.json');
  fs.writeFileSync(outputPath, JSON.stringify(data[0], null, 2));
  console.log(`💾 Saved updated lesson to: ${outputPath}`);
  console.log();
}

updateExamples();
