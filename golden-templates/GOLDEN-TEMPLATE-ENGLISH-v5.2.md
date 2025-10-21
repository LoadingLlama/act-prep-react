# GOLDEN TEMPLATE v5.2 - ENGLISH

**CRITICAL DIFFERENCES FROM MATH:**
- Examples have **4 answer choices (A, B, C, D)** instead of 5
- Examples MUST have **`<u>underlined portions</u>`** showing what's being tested
- **4 examples per lesson** (one per H3 section - NEVER two in a row!)
- Everything else is IDENTICAL to Math template

---

## LESSON HTML STRUCTURE

### 1. HTML Comments (REQUIRED at top)
```html
<!--
LESSON TEMPLATE v4.0
Subject: English
Topic Number: X.X
Topic: [Topic Title]
Lesson Key: [lesson-key-slug]
-->

<!-- ========================================
     SECTION 1: OPENING (2 SENTENCES MAX)
     CRITICAL: Must have:
     - MAXIMUM 2 sentences
     - ACT context (# of questions or %)
     - NO blue underlined terms here
     ======================================== -->
```

### 2. Opening Paragraph (EXACTLY 2 SENTENCES MAX)
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[First sentence with ACT context.] [Second sentence about what you'll learn - NO BLUE TERMS!]
</p>
```

**✓ CORRECT Example:**
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Sentence structure questions make up 15-20% of the ACT English Test—that's 11-15 questions per test! To master these questions, you must understand how to identify and properly combine clauses, fix fragments, and avoid comma splices.
</p>
```

**✗ WRONG:**
- More than 2 sentences
- Blue underlined terms in opening
- No ACT context

---

### 3. Main Content (4-6 H3 SECTIONS)

```html
<!-- ========================================
     SECTION 2: CONTENT (4-6 H3 SECTIONS)
     Each H3 = Major Concept
     Use BULLET POINTS with indents, NOT paragraphs
     ======================================== -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. First Major Concept
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Main point with <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">blue glossary term</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sub-point detail</li>
      <li style="margin: 0.2rem 0;">Another sub-point</li>
      <li style="margin: 0.2rem 0;">More details
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Third-level detail if needed</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Subsection Title
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Subsection content
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Detail point</li>
    </ul>
  </li>
</ul>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], shown AFTER teaching concept -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Second Major Concept
</h3>

[... content ...]

<!-- Example 2 will be inserted here by ExampleCard component -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Third Major Concept
</h3>

[... content ...]

<!-- Example 3 will be inserted here by ExampleCard component -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Fourth Major Concept
</h3>

[... content ...]

<!-- Example 4 will be inserted here by ExampleCard component -->

<!-- If needed, add H3 sections 5 and 6 with examples 5 and 6 -->
```

**CRITICAL RULES:**
- ✓ 4-6 H3 sections (match the natural topic structure)
- ✓ Use BULLET POINTS, not paragraphs
- ✓ Proper margin hierarchy:
  - Level 1 `<li>`: `margin: 0.3rem 0`
  - Level 2 `<li>`: `margin: 0.2rem 0`
  - Level 3 `<li>`: `margin: 0.15rem 0`
- ✓ H4 subsections use: `margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;`
- ✓ Blue glossary terms: `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">term</strong>`
- ✓ ONE example per H3 section (NEVER two in a row!)

---

### 4. Hidden Separator (REQUIRED before Key Takeaways)

```html
<!-- ========================================
     SECTION 3: HIDDEN SEPARATOR
     CRITICAL: Parser needs this!
     ======================================== -->

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>
```

---

### 5. Key Takeaways (EXACTLY 4, GREEN STYLING)

```html
<!-- ========================================
     SECTION 4: KEY TAKEAWAYS
     EXACTLY 4 BULLET POINTS - NO MORE, NO LESS
     ======================================== -->

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>First key takeaway with comprehensive summary of main concept
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Second key takeaway
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Third key takeaway
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Fourth key takeaway
  </li>
</ul>

<!-- MASTERY QUIZ: Stored in database, NOT in HTML -->
<!-- Create separately using quiz creation script -->
```

**CRITICAL:**
- Green color: `#2e7d32` (main text)
- Checkmark color: `#4caf50`
- EXACTLY 4 takeaways - no more, no less
- `list-style: none` removes default bullets

---

## EXAMPLES IN DATABASE (lesson_examples table)

### ENGLISH EXAMPLE STRUCTURE - 4 CHOICES + UNDERLINES

```javascript
{
  lesson_id: lessonData.id,
  position: 1, // 1-4 only (one per H3 section)
  title: 'Descriptive Title of What Concept Is Tested',
  problem_text: 'The sentence with the <u>underlined portion</u> showing what is being tested.',
  choices: [
    { letter: 'A', text: 'NO CHANGE' },
    { letter: 'B', text: 'Second choice' },
    { letter: 'C', text: 'Third choice' },
    { letter: 'D', text: 'Fourth choice' }
    // NO LETTER E - English has 4 choices only
  ],
  correct_answer: 'D',
  solution_steps: [], // Empty array for English
  answer_explanation: `Detailed multi-step explanation.

**Step 1: Identify the problem**
Explain what's wrong with the original.

**Step 2: Analyze the structure**
Break down the sentence components.

**Step 3: Test each choice**
- **A (NO CHANGE):** Why it's wrong
- **B:** Why it's wrong
- **C:** Why it's wrong
- **D:** Why it's correct

**Why D is correct:**
Final explanation of why the answer works.

The answer is **D**.`,
  is_worked_example: false
}
```

### CRITICAL EXAMPLE RULES:

1. **UNDERLINED PORTIONS ARE MANDATORY**
   - Use `<u>underlined portion</u>` in problem_text
   - Shows exactly what's being tested
   - Example: `'The dog <u>was running</u> across the field.'`

2. **4 ANSWER CHOICES ONLY (A-D)**
   - NO letter E
   - First choice is almost always "NO CHANGE"

3. **4-6 EXAMPLES PER LESSON**
   - Match the number of H3 sections (one example per H3)
   - Position 1-6 (depending on how many H3 sections you have)
   - NEVER put two examples in a row
   - Distribute across all major concepts

4. **ANSWER EXPLANATIONS FORMAT**
   - Use template literals (backticks) for multi-line
   - Include **bold headers** for steps
   - Test ALL answer choices
   - End with "The answer is **X**."

---

## COMMON MISTAKES TO AVOID

❌ **WRONG:**
1. More than 2 sentences in opening
2. Blue terms in opening paragraph
3. Not exactly 4 H3 sections
4. Using paragraphs instead of bullet points
5. Missing hidden separator before Key Takeaways
6. Not exactly 4 green key takeaways
7. 5 answer choices (that's MATH, not English!)
8. Missing `<u>underlines</u>` in problem_text
9. Two examples in a row (put one per H3)
10. Wrong green colors (#16a34a instead of #2e7d32)
11. **CRITICAL:** Forgetting to set `content_json: null` and `migrated_to_json: false` when uploading
12. **CRITICAL:** Using ANON_KEY instead of SERVICE_ROLE_KEY (updates will silently fail!)

✅ **CORRECT:**
1. Exactly 2 sentences in opening
2. No blue terms in opening (save for main content)
3. Exactly 4 H3 sections
4. Nested bullet points with proper margins
5. Hidden separator present
6. Exactly 4 green key takeaways with checkmarks
7. 4 answer choices (A-D) for English
8. `<u>Underlined portions</u>` in every problem_text
9. One example after each H3 section
10. Correct green: `#2e7d32` (text) and `#4caf50` (checkmark)
11. **ALWAYS** set `content_json: null` and `migrated_to_json: false` in upload script
12. **ALWAYS** use SERVICE_ROLE_KEY for Supabase client (not anon key)

---

## UPLOAD SCRIPT TEMPLATE

```javascript
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// CRITICAL: Must use SERVICE_ROLE_KEY not ANON_KEY for updates to work!
// The anon key has permission restrictions that prevent content updates
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// 1. Upload lesson HTML content
const htmlContent = fs.readFileSync('restructured-english-X.X-v1.html', 'utf-8');

// CRITICAL: Must clear content_json and set migrated_to_json = false
// Otherwise app will read old content from content_json instead of content!
const { error: lessonError } = await supabase
  .from('lessons')
  .update({
    content: htmlContent,
    content_json: null,
    migrated_to_json: false
  })
  .eq('lesson_key', 'lesson-key-here');

if (lessonError) {
  console.error('Error updating lesson:', lessonError);
  process.exit(1);
}

console.log('✓ Lesson content uploaded and content_json cleared');

// 2. Upload examples (4 total)
const { data: lessonData } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'lesson-key-here')
  .single();

const examples = [
  {
    lesson_id: lessonData.id,
    position: 1,
    title: 'Example 1 Title',
    problem_text: 'Text with <u>underline</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Choice B' },
      { letter: 'C', text: 'Choice C' },
      { letter: 'D', text: 'Choice D' }
    ],
    correct_answer: 'A',
    solution_steps: [],
    answer_explanation: `Explanation here...`,
    is_worked_example: false
  }
  // ... 3 more examples (positions 2, 3, 4)
];

for (const example of examples) {
  await supabase.from('lesson_examples').insert(example);
}
```

---

## VERSION HISTORY

**v5.2** (Current - October 2025)
- Added MANDATORY underlined portions for English examples
- Specified 4 examples per lesson (not 5)
- Added "NEVER two examples in a row" rule
- Updated to exact math template formatting structure
- Fixed Key Takeaways green colors (#2e7d32, #4caf50)
- Added hidden separator requirement
- Exact 2-sentence opening requirement
- 4 H3 sections (not 5 or 6)
- **CRITICAL FIX:** Upload script must set `content_json: null` and `migrated_to_json: false` to prevent app from reading old cached JSON content
