# GOLDEN TEMPLATE FOR ACT SCIENCE LESSONS v1.0

## CRITICAL SCIENCE-SPECIFIC FEATURES

**PRACTICE EXAMPLES:**
- Science lessons SHOULD include practice examples when teaching question types
- Examples help students understand how to apply strategies to real data
- Include sample questions with explanations when appropriate
- NOT every lesson needs examples - use judgment based on content type

**TABLES AND DATA:**
- Use HTML tables to display data tables, experimental results, or comparison charts
- Tables should be clean, well-formatted, and easy to read
- See table styling guidelines below

**CONTENT TYPES:**
- Strategy lessons (how to approach passages): NO examples needed
- Question type lessons (specific data point, trends, etc.): INCLUDE practice examples
- Diagnostic lessons (where to look): May include brief examples to illustrate
- Practice passages: These are separate, NOT formatted as lessons

---

## TEMPLATE STRUCTURE

### Opening Paragraph (EXACTLY 2 sentences)
- First sentence: Introduce the main concept/skill
- Second sentence: Explain why it matters or how it helps

### Main Content (4-6 numbered H3 sections)
- Each H3 should teach a specific concept, strategy, or question type
- Use H4 subsections as needed for additional organization
- Include bullet points with nested details
- Blue glossary terms for key vocabulary: `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">`
- Include tables where appropriate (see styling below)
- Include practice examples for question type lessons

### Key Takeaways Section (EXACTLY 4 green bullet points)
- Summarize the most important concepts
- Each takeaway should be comprehensive and actionable
- Green checkmarks with specific styling (see template below)

---

## HTML STRUCTURE TEMPLATE

```html
<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: [X.X]
Topic: [Topic Name]
Lesson Key: [lesson-key-here]
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[EXACTLY 2 sentences that introduce the topic and explain its importance]
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. [First Main Section Title]
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">[Main point]
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">[Detail 1]</li>
      <li style="margin: 0.2rem 0;">[Detail 2]</li>
      <li style="margin: 0.2rem 0;">[Detail 3]</li>
    </ul>
  </li>
</ul>

<!-- H4 subsections as needed -->
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
[Subsection Title]
</h4>

<!-- Blue glossary terms for key vocabulary -->
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">key term</strong>

<!-- TABLE EXAMPLE (use when displaying data, experimental results, or comparisons) -->
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 15px;">
  <thead>
    <tr style="background-color: #f3f4f6; border-bottom: 2px solid #d1d5db;">
      <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151;">Column 1</th>
      <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151;">Column 2</th>
      <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151;">Column 3</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 0.75rem; color: #1f2937;">Data 1</td>
      <td style="padding: 0.75rem; color: #1f2937;">Data 2</td>
      <td style="padding: 0.75rem; color: #1f2937;">Data 3</td>
    </tr>
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 0.75rem; color: #1f2937;">Data 1</td>
      <td style="padding: 0.75rem; color: #1f2937;">Data 2</td>
      <td style="padding: 0.75rem; color: #1f2937;">Data 3</td>
    </tr>
  </tbody>
</table>

<!-- PRACTICE EXAMPLE (use for question type lessons) -->
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Practice Example
</h4>

<p style="font-size: 15px; line-height: 1.6; margin: 1rem 0; padding: 1rem; background-color: #f9fafb; border-left: 4px solid: #2563eb;">
<strong>Example Question:</strong> [Question text here]<br><br>
A. [Option A]<br>
B. [Option B]<br>
C. [Option C]<br>
D. [Option D]
</p>

<p style="font-size: 15px; line-height: 1.6; margin: 1rem 0;">
<strong>Answer: [Correct Option]</strong><br>
<strong>Explanation:</strong> [Detailed explanation of why this is correct and how to find it]
</p>

<!-- HIDDEN SEPARATOR before Key Takeaways -->
<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<!-- KEY TAKEAWAYS (EXACTLY 4 green bullet points) -->
<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Comprehensive takeaway 1 that summarizes key concept]
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Comprehensive takeaway 2 that summarizes key concept]
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Comprehensive takeaway 3 that summarizes key concept]
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Comprehensive takeaway 4 that summarizes key concept]
  </li>
</ul>
```

---

## UPLOAD SCRIPT TEMPLATE

```javascript
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadScienceChapterX() {
  const lessonContent = fs.readFileSync('restructured-science-X.X-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'lesson-key-here');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }

  console.log('✓ Lesson content uploaded for lesson-key-here');

  // IF the lesson has practice examples, you would upload them here
  // For most Science lessons, examples are embedded in the content
  // Only upload to lesson_examples table if there are standalone practice problems

  console.log('\n✓ Chapter X.X upload complete!');
}

uploadScienceChapterX();
```

---

## WHEN TO INCLUDE EXAMPLES

**INCLUDE Practice Examples:**
- Question type lessons (Specific Data Point, Trends, Approximation, etc.)
- Any lesson teaching how to answer a specific type of question
- Lessons where seeing an example significantly aids understanding

**DO NOT Include Examples:**
- Strategy/approach lessons (how to approach passages)
- General introduction lessons
- Conceptual lessons without specific question types

**TABLES:**
- Use tables when displaying experimental data, comparison charts, or data sets
- Keep tables simple and focused on the learning objective
- Always include clear headers

---

## IMPORTANT REMINDERS

1. **Opening:** EXACTLY 2 sentences
2. **Sections:** 4-6 numbered H3 sections
3. **Key Takeaways:** EXACTLY 4 green bullet points
4. **NO old HTML wrapper:** Do NOT include `<html><head></head><body>` tags
5. **Tables:** Use clean, well-styled HTML tables for data
6. **Examples:** Include practice examples for question type lessons
7. **Upload:** Use SERVICE_ROLE_KEY (not ANON_KEY)
8. **Database fields:** Set content_json: null, migrated_to_json: false

---

## SCIENCE-SPECIFIC LESSON KEYS (Reference)

Based on ACT Science Guide structure:
- introduction-to-science
- approaching-passages
- question-diagnosis
- specific-data-point
- trends-patterns
- approximation
- multiple-figures
- advanced-questions
- science-knowledge
- conflicting-viewpoints
- practice-passages

