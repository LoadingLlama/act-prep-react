/**
 * Simple direct replacement to add answer choices
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Adding answer choices to examples...\n');

const { data } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = data.content;

// Example 1
const ex1Problem = `<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> An angle measures 35°. What is its complement? What is its supplement?
</p>`;

const ex1WithChoices = `<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> An angle measures 35°. What is its complement? What is its supplement?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 1rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. Complement: 55°, Supplement: 145°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. Complement: 145°, Supplement: 55°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. Complement: 45°, Supplement: 155°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. Complement: 65°, Supplement: 125°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. Complement: 35°, Supplement: 180°</span>
</p>`;

content = content.replace(ex1Problem, ex1WithChoices);
console.log('✅ Added choices to Example 1');

// Example 2
const ex2Problem = `<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> Two lines intersect, creating four angles. One of the angles measures 125°. What are the measures of the other three angles?
</p>`;

const ex2WithChoices = `<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> Two lines intersect, creating four angles. One of the angles measures 125°. What are the measures of the other three angles?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 1rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. 55°, 55°, 125°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. 125°, 125°, 55°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. 55°, 125°, 125°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. 125°, 55°, 55°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. 62.5°, 62.5°, 62.5°</span>
</p>`;

content = content.replace(ex2Problem, ex2WithChoices);
console.log('✅ Added choices to Example 2');

// Example 3
const ex3Problem = `<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> Two parallel lines are cut by a transversal. One of the angles formed measures 65°. What are the possible measures of the other seven angles?
</p>`;

const ex3WithChoices = `<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Problem:</strong> Two parallel lines are cut by a transversal. One of the angles formed measures 65°. What are the possible measures of the other seven angles?
</p>

<p style="font-size: 0.9rem; line-height: 1.6; margin: 1rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. All seven angles are 65°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. Three angles are 65° and four are 115°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. Four angles are 65° and three are 115°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. Six angles are 65° and one is 115°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. All eight angles are different</span>
</p>`;

content = content.replace(ex3Problem, ex3WithChoices);
console.log('✅ Added choices to Example 3');

// Update database
await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-angles');

console.log('\n✅ Updated database with answer choices!');
