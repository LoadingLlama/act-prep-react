#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicKey) {
  console.error('❌ Missing ANTHROPIC_API_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const anthropic = new Anthropic({ apiKey: anthropicKey });

// Read golden template
const goldenTemplate = fs.readFileSync(
  path.join(__dirname, '../docs/MATH_1_1_TEMPLATE.html'),
  'utf8'
);

const RESTRUCTURING_PROMPT = `You are an expert at restructuring educational content. Your task is to transform the given ACT prep lesson to match the structure, style, and flow of the golden template.

# Golden Template Analysis

The golden template (Backsolving lesson) has this structure:

1. **Opening Paragraph** (3-4 sentences)
   - Hook with practical benefit
   - Highlight 3-5 key terms with this HTML: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">term</strong>
   - Set clear expectations

2. **Section 1: "What Is [Topic]?"**
   - Clear definition paragraph
   - Bullet points with key advantages/characteristics
   - Nested bullets for details
   - When to use (bullets)

3. **Section 2: "The [Topic] Process"**
   - Step-by-step breakdown
   - H4 for each step: <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 1: [Name]</h4>
   - Short paragraph + bullets for each step

4. **Section 3: Examples**
   - Red-bordered H4: <h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: [Title]</h4>
   - Problem statement
   - Solution as bullet points
   - Clear answer

5. **Section 4: "When NOT to [Use Topic]"** or "Common Mistakes"
   - Clear limitations/pitfalls
   - Bullet points

6. **Key Takeaways**
   - <h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>
   - <ul style="list-style: none; padding: 0; margin: 0;">
   - Each <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
   - Checkmark: <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>

# Key Styling Rules

**Paragraphs**: <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">

**H3 Sections**: <h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Section Title</h3>

**H4 Subsections**: <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Subsection Title</h4>

**Lists**: <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
**List Items**: <li style="margin: 0.15rem 0;">

**Nested Lists**: <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">

# Your Task

Transform the current lesson to match this structure:

1. **Condense opening** to 3-4 sentences with key terms highlighted
2. **Convert long paragraphs to bullet points** - be aggressive! The template is highly scannable
3. **Extract examples** and format as red-bordered boxes
4. **Create clear step-by-step processes** with H4 headers
5. **Add numbered sections** (1., 2., 3., 4.)
6. **Ensure "When to Use" / "When NOT to Use" section**
7. **Format Key Takeaways** with green styling and checkmarks
8. **Preserve all important information** - don't lose content, just restructure it

# Content Guidelines

- **Short paragraphs**: 2-3 sentences max before bullets
- **Heavy use of bullets**: Not paragraph-heavy like current lessons
- **Concrete examples**: Actual problems with solutions
- **Clear processes**: Step 1, Step 2, etc.
- **Scannable**: Should be easy to skim and find information
- **Practical tone**: Conversational, helpful, not academic

Return ONLY the restructured HTML content (no explanations, no markdown, just the HTML).`;

async function restructureLessonWithAI(lessonId, lessonKey, title) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🤖 AI Restructuring: ${title}`);
  console.log(`   Lesson Key: ${lessonKey}`);
  console.log('='.repeat(70));

  // Get current content
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id, title')
    .eq('lesson_id', lessonId)
    .limit(1);

  if (!sections || sections.length === 0) {
    console.log('⏭️  No sections found');
    return null;
  }

  const { data: content } = await supabase
    .from('lesson_section_content')
    .select('id, content')
    .eq('section_id', sections[0].id)
    .limit(1);

  if (!content || content.length === 0) {
    console.log('⏭️  No content found');
    return null;
  }

  const currentHTML = content[0].content;
  const currentLength = currentHTML.length;

  console.log(`Original: ${currentLength} chars`);
  console.log('Sending to Claude for intelligent restructuring...');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: `${RESTRUCTURING_PROMPT}

# Current Lesson Content

${currentHTML}

# Lesson Info

Title: ${title}
Lesson Key: ${lessonKey}

Please restructure this lesson to match the golden template structure and style.`
        }
      ]
    });

    const restructuredHTML = message.content[0].text;
    const newLength = restructuredHTML.length;
    const percentChange = ((newLength / currentLength - 1) * 100).toFixed(1);

    console.log(`✅ Restructured: ${newLength} chars (${percentChange}% change)`);

    // Save restructured version
    const outputDir = path.join(__dirname, '../samples/ai-restructured');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${lessonKey}.html`);
    fs.writeFileSync(outputPath, restructuredHTML);
    console.log(`💾 Saved to: samples/ai-restructured/${lessonKey}.html`);

    // Also save comparison
    const comparisonPath = path.join(outputDir, `${lessonKey}-COMPARISON.md`);
    const comparison = `# ${title}

## Original Length
${currentLength} characters

## New Length
${newLength} characters (${percentChange}% change)

## Original Content (first 500 chars)
\`\`\`html
${currentHTML.substring(0, 500)}...
\`\`\`

## Restructured Content (first 500 chars)
\`\`\`html
${restructuredHTML.substring(0, 500)}...
\`\`\`
`;
    fs.writeFileSync(comparisonPath, comparison);

    return {
      lessonId,
      lessonKey,
      title,
      contentId: content[0].id,
      originalLength: currentLength,
      newLength,
      percentChange: parseFloat(percentChange),
      restructuredHTML
    };

  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║  AI-Powered Lesson Restructuring (Phase 2)       ║');
  console.log('║  Intelligent Content Transformation               ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  const lessonKey = process.argv[2];

  if (!lessonKey) {
    console.log('Usage: node ai-restructure-lesson.mjs <lesson_key>');
    console.log('\nExample: node ai-restructure-lesson.mjs science-introduction');
    console.log('\nThis will restructure a single lesson using AI.\n');
    process.exit(0);
  }

  // Get lesson
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title, subject')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.error(`❌ Lesson not found: ${lessonKey}`);
    process.exit(1);
  }

  const result = await restructureLessonWithAI(lesson.id, lesson.lesson_key, lesson.title);

  if (result) {
    console.log('\n✅ SUCCESS! Review the restructured content in samples/ai-restructured/');
    console.log('\n📋 Next steps:');
    console.log('   1. Review the restructured HTML');
    console.log('   2. If satisfied, update database');
    console.log('   3. Process more lessons\n');
  }
}

main();
