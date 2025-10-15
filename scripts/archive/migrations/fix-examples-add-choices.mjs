/**
 * Actually add answer choices to examples (proper this time)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     ADDING ANSWER CHOICES TO EXAMPLES (FIXED)           ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const { data } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

// GEOMETRY-ANGLES
const anglesLesson = data.find(l => l.lesson_key === 'geometry-angles');
let anglesContent = anglesLesson.content;

console.log('geometry-angles:');

// Example 1 - Insert answer choices between Problem and Solution
anglesContent = anglesContent.replace(
  /(<h4[^>]*>Example 1<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>[^<]*An angle measures 35°\. What is its complement\? What is its supplement\?<\/p>)\s*(<p[^>]*>\s*<strong>Solution:<\/strong>)/,
  `$1

<p style="font-size: 0.9rem; line-height: 1.6; margin: 1rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. Complement: 55°, Supplement: 145°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. Complement: 145°, Supplement: 55°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. Complement: 45°, Supplement: 155°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. Complement: 65°, Supplement: 125°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. Complement: 35°, Supplement: 180°</span>
</p>

$2`
);

// Example 2 - Insert answer choices
anglesContent = anglesContent.replace(
  /(<h4[^>]*>Example 2<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>[^<]*Two lines intersect, creating four angles\.[^<]*<\/p>)\s*(<p[^>]*>\s*<strong>Solution:<\/strong>)/,
  `$1

<p style="font-size: 0.9rem; line-height: 1.6; margin: 1rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. 55°, 55°, 125°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. 125°, 125°, 55°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. 55°, 125°, 125°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. 125°, 55°, 55°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. 62.5°, 62.5°, 62.5°</span>
</p>

$2`
);

// Example 3 - Insert answer choices
anglesContent = anglesContent.replace(
  /(<h4[^>]*>Example 3<\/h4>\s*<p[^>]*>\s*<strong>Problem:<\/strong>[^<]*Two parallel lines are cut by a transversal\.[^<]*<\/p>)\s*(<p[^>]*>\s*<strong>Solution:<\/strong>)/,
  `$1

<p style="font-size: 0.9rem; line-height: 1.6; margin: 1rem 0 0.5rem 0;">
<span style="display: inline-block; margin: 0.3rem 0;">A. All seven angles are 65°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">B. Three angles are 65° and four are 115°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">C. Four angles are 65° and three are 115°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">D. Six angles are 65° and one is 115°</span><br>
<span style="display: inline-block; margin: 0.3rem 0;">E. All eight angles are different</span>
</p>

$2`
);

// Add Answer indicators at the end of solutions
anglesContent = anglesContent.replace(
  /(<h4[^>]*>Example 1<\/h4>[\s\S]*?<ul[^>]*>[\s\S]*?<\/ul>)/,
  `$1

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: A</strong>
</p>`
);

anglesContent = anglesContent.replace(
  /(<h4[^>]*>Example 2<\/h4>[\s\S]*?<ul[^>]*>[\s\S]*?<\/ul>)/,
  `$1

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: C</strong>
</p>`
);

anglesContent = anglesContent.replace(
  /(<h4[^>]*>Example 3<\/h4>[\s\S]*?<ul[^>]*>[\s\S]*?<\/ul>)/,
  `$1

<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">
<strong>Answer: B</strong>
</p>`
);

console.log('  ✅ Added answer choices to 3 examples');

await supabase
  .from('lessons')
  .update({
    content: anglesContent,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-angles');

console.log('  ✅ Updated geometry-angles\n');

console.log('✅ Examples now have interactive answer choices!');
