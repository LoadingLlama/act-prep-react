# GOLDEN TEMPLATE FOR ACT SCIENCE LESSONS v2.0

## CRITICAL: This template MUST match English/Math format exactly

### KEY REQUIREMENTS
1. **Opening**: EXACTLY 2 sentences (not paragraphs - 2 total sentences)
2. **Structure**: Flexible H3 sections (usually 3-5), each with H4 subsections
3. **NO embedded examples**: Examples go in `lesson_examples` database table
4. **Bullet points**: Use nested bullets, NOT paragraphs
5. **Blue terms**: Use for key vocabulary/concepts
6. **NO old HTML**: NO `<html><head></head><body>` wrapper tags

---

## TEMPLATE STRUCTURE

```html
<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: [X.X]
Topic: [Topic Name]
Lesson Key: [lesson-key-from-database]
-->

<!-- ========================================
     SECTION 1: OPENING (EXACTLY 2 SENTENCES)
     CRITICAL: Must have:
     - EXACTLY 2 sentences total
     - ACT context (# of questions or % when relevant)
     - NO blue underlined terms here
     ======================================== -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[Sentence 1: Introduce the main concept/skill]. [Sentence 2: Explain why it matters or how it helps].
</p>

<!-- ========================================
     SECTION 2: CONTENT (FLEXIBLE H3 SECTIONS)
     Each H3 = Major Concept
     Use BULLET POINTS with indents, NOT paragraphs
     ======================================== -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. [First Main Section Title]
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">[Main point with <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">blue term</strong> if needed]
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">[Detail 1]</li>
      <li style="margin: 0.2rem 0;">[Detail 2]</li>
      <li style="margin: 0.2rem 0;">[Detail 3]</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
[Subsection Title]
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">[Point]
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">[Detail]</li>
    </ul>
  </li>
</ul>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], shown AFTER teaching concept -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. [Second Main Section Title]
</h3>

[Continue pattern...]

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. [Third Main Section Title]
</h3>

[Continue pattern...]

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. [Fourth Main Section Title (if needed)]
</h3>

[Continue pattern...]

<!-- ========================================
     SECTION 3: KEY TAKEAWAYS (EXACTLY 4)
     Green checkmarks, comprehensive summaries
     ======================================== -->

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Comprehensive takeaway 1]
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Comprehensive takeaway 2]
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Comprehensive takeaway 3]
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Comprehensive takeaway 4]
  </li>
</ul>
```

---

## LESSON_KEYS FOR SCIENCE (From Database)

**Unit 1 - Fundamentals:**
- `passage-approach` - Topic 1.1: How to Approach the Passages
- `question-diagnosis` - Topic 1.2: Question Diagnosis

**Unit 2 - Data Interpretation:**
- `specific-data-point` - Topic 2.1: Specific Data Point Questions
- `trends` - Topic 2.2: Trends Questions
- `approximation` - Topic 2.3: Approximation Questions
- `multiple-figures` - Topic 2.4: Multiple Figures Questions
- `figures-text` - Topic 2.5: Figures + Text Questions
- `scatter-plots` - Topic 2.6: Scatter Plots
- `inverse-trends-multiple-axes` - Topic 2.7: Inverse Trends and Graphs with Multiple Axes

**Unit 3 - Advanced Question Types:**
- `two-part-answers` - Topic 3.1: 2-Part Answers
- `cannot-be-determined` - Topic 3.2: Cannot Be Determined
- `equations-as-answers` - Topic 3.3: Equations as Answers
- `mixing` - Topic 3.4: Mixing
- `math-on-science` - Topic 3.5: Math on the Science Test

**Unit 4 - Background Knowledge:**
- `water-knowledge` - Topic 4.1: Water Knowledge
- `experimental-setup` - Topic 4.2: Experimental Setup
- (Need to verify 4.3 and 4.4 lesson_keys)

---

## UPLOAD SCRIPT TEMPLATE

```javascript
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadScienceLesson() {
  const lessonContent = fs.readFileSync('science-[X.X]-v2.html', 'utf8');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', '[lesson-key-here]');

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log('✓ Uploaded [lesson-key-here]');
}

uploadScienceLesson();
```

---

## IMPORTANT REMINDERS

1. **NO `<html>` wrapper**: Start directly with HTML comment, then opening `<p>` tag
2. **Exactly 2 sentences** in opening
3. **Use bullet points**, not paragraph blocks
4. **Blue underlined terms** for key vocabulary
5. **Examples in database**, not embedded in HTML
6. **Exactly 4 Key Takeaways**
7. **Capitalize properly**: Check all sentences, no lowercase where uppercase expected
8. **Match English/Math format** exactly
