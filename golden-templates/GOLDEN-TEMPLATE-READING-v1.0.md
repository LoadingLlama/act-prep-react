# GOLDEN TEMPLATE v1.0 - READING

**CRITICAL DIFFERENCES FROM ENGLISH:**
- **NO EXAMPLES REQUIRED** - Reading lessons teach strategies, not individual problems
- Examples are stored separately in lesson_examples table ONLY if the lesson actually uses them (very rare)
- Focus on comprehensive strategy explanations using bullet points
- Everything else follows the same structure as English template

---

## LESSON HTML STRUCTURE

### 1. HTML Comments (REQUIRED at top)
```html
<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: X.X
Topic: [Topic Title]
Lesson Key: [lesson-key-slug]
-->

<!-- ========================================
     SECTION 1: OPENING (2 SENTENCES MAX)
     CRITICAL: Must have:
     - MAXIMUM 2 sentences
     - ACT context (timing, passage types, or question counts)
     - NO blue underlined terms here
     ======================================== -->
```

### 2. Opening Paragraph (EXACTLY 2 SENTENCES MAX)
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[First sentence with ACT Reading context.] [Second sentence about what strategies you'll learn - NO BLUE TERMS!]
</p>
```

**✓ CORRECT Example:**
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
The ACT Reading Test gives you 40 minutes to read four passages and answer 36 questions—that's about 10 minutes per passage! This lesson teaches you six different approaches to help you find the strategy that works best for your reading speed and comprehension style.
</p>
```

**✗ WRONG:**
- More than 2 sentences
- Blue underlined terms in opening
- No ACT context (timing, passage info, etc.)

---

### 3. Main Content (4-6 H3 SECTIONS)

```html
<!-- ========================================
     SECTION 2: CONTENT (4-6 H3 SECTIONS)
     Each H3 = Major Strategy or Concept
     Use BULLET POINTS with indents, NOT paragraphs
     NO EXAMPLES NEEDED - Focus on strategy explanation
     ======================================== -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. First Major Strategy or Concept
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Main strategy point with <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">blue glossary term</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sub-point explaining the strategy</li>
      <li style="margin: 0.2rem 0;">Another detail about when to use it</li>
      <li style="margin: 0.2rem 0;">Tips for implementation
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Third-level detail if needed</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Subsection Title (When to Use This Strategy)
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Subsection content explaining application
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Specific scenario or tip</li>
      <li style="margin: 0.2rem 0;">Another scenario</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Second Major Strategy or Concept
</h3>

[... content ...]

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Third Major Strategy or Concept
</h3>

[... content ...]

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Fourth Major Strategy or Concept
</h3>

[... content ...]

<!-- If needed, add H3 sections 5 and 6 -->
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
- ✓ NO EXAMPLES in HTML (Reading teaches strategies, not individual problems)

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
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>First key takeaway summarizing main strategy with timing or application details
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Second key takeaway about when or how to apply the approach
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Third key takeaway covering critical tips or common mistakes
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Fourth key takeaway about test day application or final strategy reminder
  </li>
</ul>
```

**CRITICAL:**
- Green color: `#2e7d32` (main text)
- Checkmark color: `#4caf50`
- EXACTLY 4 takeaways - no more, no less
- `list-style: none` removes default bullets

---

## EXAMPLES IN DATABASE (OPTIONAL - RARELY USED)

**For Reading, examples are RARELY needed.** Most lessons teach strategies without individual practice problems.

IF a specific lesson needs examples (e.g., "Words in Context Questions"), they would be stored in the `lesson_examples` table with this structure:

```javascript
{
  lesson_id: lessonData.id,
  position: 1, // Only if examples exist
  title: 'Descriptive Title',
  problem_text: 'Passage excerpt and question text',
  choices: [
    { letter: 'A', text: 'First choice' },
    { letter: 'B', text: 'Second choice' },
    { letter: 'C', text: 'Third choice' },
    { letter: 'D', text: 'Fourth choice' }
  ],
  correct_answer: 'B',
  solution_steps: [], // Empty array
  answer_explanation: `Explanation of why B is correct...`,
  is_worked_example: false
}
```

**Default: NO EXAMPLES** unless the lesson content explicitly requires them.

---

## COMMON MISTAKES TO AVOID

❌ **WRONG:**
1. More than 2 sentences in opening
2. Blue terms in opening paragraph
3. Not 4-6 H3 sections
4. Using paragraphs instead of bullet points
5. Missing hidden separator before Key Takeaways
6. Not exactly 4 green key takeaways
7. Forcing examples when they're not needed (Reading teaches strategies!)
8. Wrong green colors (#16a34a instead of #2e7d32)
9. **CRITICAL:** Forgetting to set `content_json: null` and `migrated_to_json: false` when uploading
10. **CRITICAL:** Using ANON_KEY instead of SERVICE_ROLE_KEY (updates will silently fail!)

✅ **CORRECT:**
1. Exactly 2 sentences in opening with ACT Reading context (timing, passages, etc.)
2. No blue terms in opening (save for main content)
3. 4-6 H3 sections teaching strategies
4. Nested bullet points with proper margins
5. Hidden separator present
6. Exactly 4 green key takeaways with checkmarks
7. NO EXAMPLES in most lessons (only add if content requires it)
8. Correct green: `#2e7d32` (text) and `#4caf50` (checkmark)
9. **ALWAYS** set `content_json: null` and `migrated_to_json: false` in upload script
10. **ALWAYS** use SERVICE_ROLE_KEY for Supabase client (not anon key)

---

## UPLOAD SCRIPT TEMPLATE (NO EXAMPLES)

```javascript
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// CRITICAL: Must use SERVICE_ROLE_KEY not ANON_KEY for updates to work!
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadReadingLesson() {
  const lessonContent = fs.readFileSync('restructured-reading-X.X-v1.html', 'utf8');

  // CRITICAL: Must clear content_json and set migrated_to_json = false
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
  console.log('✓ No examples needed for this Reading lesson');
}

uploadReadingLesson();
```

**NOTE:** Most Reading lessons do NOT need examples. Only create examples if the lesson specifically requires practice problems (like "Words in Context Questions").

---

## READING-SPECIFIC CONTENT GUIDANCE

### Opening Sentence Context Options:
- Passage timing: "The ACT Reading Test gives you 40 minutes for 4 passages..."
- Question distribution: "Each Reading passage has 9 questions..."
- Passage types: "You'll encounter Literary Narrative, Social Science, Humanities, and Natural Science passages..."
- Strategy context: "Most students struggle with timing on ACT Reading..."

### H3 Section Topics (Common Patterns):
1. Understanding the Strategy/Approach
2. When to Use This Strategy
3. Step-by-Step Process
4. Common Mistakes to Avoid
5. Tips for Success
6. Timing and Pacing Considerations

### Blue Glossary Terms (Reading-Specific):
- Reading strategies: "working backwards," "big read," "speed reading"
- Question types: "inference questions," "main idea questions," "detail questions"
- Passage elements: "topic sentences," "transitions," "supporting evidence"
- Timing concepts: "passage pacing," "question selection"

---

## VERSION HISTORY

**v1.0** (Current - October 2025)
- Created Reading-specific template based on English v5.2
- **NO EXAMPLES REQUIRED** - Reading teaches strategies, not individual problems
- Same HTML structure as English (2-sentence opening, 4-6 H3 sections, 4 key takeaways)
- Focuses on strategy explanation through comprehensive bullet points
- Examples only added if lesson specifically requires them (rare)
- Must use SERVICE_ROLE_KEY and set content_json: null, migrated_to_json: false
