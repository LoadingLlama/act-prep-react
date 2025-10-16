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

// Complete teaching content for Lesson 1.2
const teachingContentBlock1 = `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">number substitution technique</strong>, also called <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">plugging in numbers</strong>, is a powerful ACT strategy that transforms abstract algebra into simple arithmetic. Instead of manipulating variables and expressions, you <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">substitute actual numbers</strong> for variables to test which answer choice works. This technique is especially effective when answer choices contain variables or when the algebra looks overwhelming.</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. What Is Number Substitution?</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Number substitution</strong> means picking your own numbers to replace variables in the problem. You calculate a target answer using your chosen numbers, then test each answer choice with those same numbers to see which one matches your target.</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Key advantages:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Converts complex algebra into simple arithmetic</li>
      <li>Reduces chance of algebraic manipulation errors</li>
      <li>Works excellently when answer choices contain variables</li>
      <li>Often faster than traditional algebra</li>
    </ul>
  </li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">When to Use Substitution</strong>:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Answer choices contain variables (like <em>x</em>, <em>n</em>, <em>a</em> + <em>b</em>)</li>
      <li>The problem says "in terms of" another variable</li>
      <li>The algebra involves multiple variables or complex expressions</li>
      <li>You can easily pick numbers that satisfy the problem's conditions</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. The Substitution Process</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Follow these four steps to substitute numbers effectively:</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 1: Choose Smart Numbers</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Pick numbers that make calculations easy but avoid common traps:
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>✓ Use simple numbers like 2, 3, 4, 5, 10</li>
      <li>✗ Avoid 0 (causes division by zero, special cases)</li>
      <li>✗ Avoid 1 (neutral for multiplication, masks patterns)</li>
      <li>✗ Avoid -1 (can create confusing results)</li>
      <li>✓ If problem involves fractions, pick numbers that simplify easily</li>
      <li>✓ If problem involves percent, consider using 100</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 2: Calculate Your Target</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Use your chosen numbers to work through the problem
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Calculate what the answer should be with your numbers</li>
      <li>This becomes your <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">target value</strong></li>
      <li>Write it down clearly</li>
    </ul>
  </li>
</ul>`;

const teachingContentBlock2 = `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 3: Test Each Answer Choice</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Plug your chosen numbers into each answer choice
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Substitute carefully - one variable at a time</li>
      <li>Calculate the result for each choice</li>
      <li>Compare with your target value</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 4: Verify Your Answer</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">The choice that matches your target is correct
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>If multiple choices match, pick different numbers and test again</li>
      <li>This rarely happens with well-chosen numbers</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Classic Substitution Problems</h3>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Variables in Answer Choices</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If <em>x</em> + <em>y</em> = 10 and <em>x</em> − <em>y</em> = 4, what is <em>x</em><sup>2</sup> − <em>y</em><sup>2</sup>?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 6</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 14</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 40</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 100</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 116</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">From <em>x</em> + <em>y</em> = 10 and <em>x</em> − <em>y</em> = 4, solve: <em>x</em> = 7, <em>y</em> = 3</li>
  <li style="margin: 0.15rem 0;">Calculate target: <em>x</em><sup>2</sup> − <em>y</em><sup>2</sup> = 7<sup>2</sup> − 3<sup>2</sup> = 49 − 9 = 40 ✓</li>
  <li style="margin: 0.15rem 0;">Notice this also equals (<em>x</em> + <em>y</em>)(<em>x</em> − <em>y</em>) = 10 × 4 = 40</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Answer: C</strong></p>

<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Percent Problem with Substitution</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">A store increases all prices by <em>p</em>% then decreases the new prices by <em>p</em>%. What is the net percent change?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">F. 0%</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">G. −<em>p</em>%</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">H. −<em>p</em><sup>2</sup>/100%</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">J. <em>p</em><sup>2</sup>%</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">K. −2<em>p</em>%</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Pick <em>p</em> = 10 and original price = $100</li>
  <li style="margin: 0.15rem 0;">After 10% increase: $100 × 1.10 = $110</li>
  <li style="margin: 0.15rem 0;">After 10% decrease: $110 × 0.90 = $99</li>
  <li style="margin: 0.15rem 0;">Net change: $99 − $100 = −$1, which is −1%</li>
  <li style="margin: 0.15rem 0;">Test H: −(10)<sup>2</sup>/100 = −100/100 = −1% ✓</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"><strong>Answer: H</strong></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. ACT Strategy Tips</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Master these ACT-specific insights for substitution:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>Calculator Advantage:</strong> Substitution lets you use your calculator even on algebra problems</li>
  <li style="margin: 0.15rem 0;"><strong>Avoid Special Numbers:</strong> Never use 0, 1, or -1 as they have special properties that can make wrong answers appear correct</li>
  <li style="margin: 0.15rem 0;"><strong>If Two Match:</strong> Rare, but if two answer choices give the same result, pick different numbers and test only those two</li>
  <li style="margin: 0.15rem 0;"><strong>Don't Overthink:</strong> Simple numbers work best—use 2, 3, 5, or 10</li>
</ul>

<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Number substitution converts abstract algebra into concrete arithmetic
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use substitution when answer choices contain variables or expressions
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Choose simple numbers like 2, 3, 5, or 10—avoid 0, 1, and -1
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Calculate your target value first, then test each answer choice
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The answer choice that matches your target is correct
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Substitution often saves time and reduces algebraic errors on the ACT
  </li>
</ul>`;

async function fixLesson12() {
  console.log('Fixing Lesson 1.2 - Adding Teaching Content...\n');

  // Get lesson metadata
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'substitution')
    .single();

  if (!lesson) {
    console.error('Lesson 1.2 not found!');
    return;
  }

  const lessonId = lesson.id;
  console.log(`Lesson ID: ${lessonId}`);

  // Get or create main content section
  let { data: mainSection } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lessonId)
    .eq('section_key', 'substitution-main')
    .single();

  if (!mainSection) {
    console.log('Creating main content section...');
    const { data: newSection } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: 'substitution-main',
        title: 'Main Content',
        section_type: 'content',
        order_index: 0
      })
      .select()
      .single();

    mainSection = newSection;
  }

  console.log(`Main Section ID: ${mainSection.id}`);

  // Check existing content blocks
  const { data: existingContent } = await supabase
    .from('section_content')
    .select('*')
    .eq('section_id', mainSection.id)
    .order('order_index');

  console.log(`Found ${existingContent?.length || 0} existing content blocks`);

  // Delete existing placeholder content if it exists
  if (existingContent && existingContent.length > 0) {
    console.log('Deleting existing placeholder content...');
    await supabase
      .from('section_content')
      .delete()
      .eq('section_id', mainSection.id);
  }

  // Insert new teaching content (2 blocks)
  console.log('Inserting teaching content block 1...');
  const { error: error1 } = await supabase
    .from('section_content')
    .insert({
      section_id: mainSection.id,
      content_type: 'html',
      content: teachingContentBlock1,
      order_index: 0
    });

  if (error1) {
    console.error('Error inserting block 1:', error1);
    return;
  }

  console.log('Inserting teaching content block 2...');
  const { error: error2 } = await supabase
    .from('section_content')
    .insert({
      section_id: mainSection.id,
      content_type: 'html',
      content: teachingContentBlock2,
      order_index: 1
    });

  if (error2) {
    console.error('Error inserting block 2:', error2);
    return;
  }

  console.log('\n✅ SUCCESS! Lesson 1.2 teaching content added.');
  console.log('Teaching content: 2 blocks, ~4100 characters total');
  console.log('\nRefresh your browser to see the complete lesson!');
}

fixLesson12().catch(console.error);
