#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function prepareLessonsForRestructuring() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║  Preparing Lessons for AI Restructuring          ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // Get all lessons
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title, subject')
    .order('subject, lesson_key');

  console.log(`Found ${lessons.length} lessons\n`);

  // Create work directory
  const workDir = path.join(__dirname, '../restructuring-work');
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir, { recursive: true });
  }

  // Save golden template for reference
  const templatePath = path.join(__dirname, '../docs/MATH_1_1_TEMPLATE.html');
  const goldenTemplate = fs.readFileSync(templatePath, 'utf8');
  fs.writeFileSync(path.join(workDir, 'GOLDEN_TEMPLATE.html'), goldenTemplate);

  // Create restructuring instructions
  const instructions = `# Lesson Restructuring Instructions

## Task
Transform ACT prep lessons to match the structure and style of GOLDEN_TEMPLATE.html (the Backsolving lesson).

## Golden Template Structure

1. **Opening Paragraph** (3-4 sentences)
   - Practical hook
   - 3-5 key terms: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">term</strong>

2. **Section 1: "What Is [Topic]?"**
   - Definition paragraph
   - Bullet points with advantages
   - Nested bullets

3. **Section 2: "The [Topic] Process"**
   - H4 for each step
   - Short paragraph + bullets per step

4. **Section 3: Examples**
   - Red-bordered H4: <h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Title</h4>
   - Problem + solution (bullets)

5. **Section 4: "When NOT to..."**
   - Limitations
   - Bullet points

6. **Key Takeaways**
   - Green header with checkmarks

## Key Changes Needed

- ✅ Shorten opening to 3-4 sentences
- ✅ Convert long paragraphs → bullet points
- ✅ Extract examples → red-bordered boxes
- ✅ Create step-by-step processes (H4)
- ✅ Add numbered sections (1., 2., 3.)
- ✅ Ensure "When to Use" / "When NOT to" section
- ✅ Format Key Takeaways with checkmarks
- ✅ Make content scannable, not paragraph-heavy

## Styling

\`\`\`html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Title</h3>
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Subtitle</h4>
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
<li style="margin: 0.15rem 0;">
\`\`\`

## Process Each Lesson

1. Read current lesson HTML
2. Read GOLDEN_TEMPLATE.html for structure reference
3. Restructure to match template
4. Save as: restructured/[lesson_key].html
5. Create comparison file
`;

  fs.writeFileSync(path.join(workDir, 'INSTRUCTIONS.md'), instructions);

  // Group lessons by subject
  const bySubject = {};
  for (const lesson of lessons) {
    if (!bySubject[lesson.subject]) {
      bySubject[lesson.subject] = [];
    }
    bySubject[lesson.subject].push(lesson);
  }

  // Create batch files for each subject
  for (const [subject, subjectLessons] of Object.entries(bySubject)) {
    const subjectDir = path.join(workDir, subject);
    if (!fs.existsSync(subjectDir)) {
      fs.mkdirSync(subjectDir, { recursive: true });
    }

    // Save lesson list
    const lessonList = subjectLessons.map(l => `- ${l.lesson_key}: ${l.title}`).join('\n');
    fs.writeFileSync(path.join(subjectDir, 'lessons.txt'), lessonList);

    console.log(`${subject}: ${subjectLessons.length} lessons`);

    // Save each lesson's current content
    for (const lesson of subjectLessons) {
      const { data: sections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lesson.id)
        .limit(1);

      if (sections && sections.length > 0) {
        const { data: content } = await supabase
          .from('lesson_section_content')
          .select('content')
          .eq('section_id', sections[0].id)
          .limit(1);

        if (content && content.length > 0) {
          const lessonPath = path.join(subjectDir, `${lesson.lesson_key}.html`);
          fs.writeFileSync(lessonPath, content[0].content);
        }
      }
    }
  }

  console.log(`\n✅ Prepared ${lessons.length} lessons in: restructuring-work/`);
  console.log('\n📋 Structure:');
  console.log('   restructuring-work/');
  console.log('   ├── GOLDEN_TEMPLATE.html');
  console.log('   ├── INSTRUCTIONS.md');
  console.log('   ├── math/ (69 lessons)');
  console.log('   ├── science/ (17 lessons)');
  console.log('   ├── english/ (16 lessons)');
  console.log('   └── reading/ (14 lessons)');
  console.log('\n💡 Now you can use Claude Code to restructure lessons by subject!');
  console.log('   Or run the batch-apply script to process all at once.\n');

  // Create a manifest
  const manifest = {
    totalLessons: lessons.length,
    bySubject,
    prepared: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(workDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

prepareLessonsForRestructuring();
