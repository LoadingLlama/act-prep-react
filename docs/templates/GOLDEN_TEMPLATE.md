# ACT Prep - GOLDEN TEMPLATE & CODE ARTIFACT
## The Single Source of Truth for ALL Lesson Formatting

**PURPOSE:** This document is the COMPLETE reference for creating consistent ACT lessons. Every lesson (English and Math) MUST follow these exact standards. No variations allowed.

---

## TABLE OF CONTENTS
1. [Core Principles](#core-principles)
2. [Complete HTML Structure](#complete-html-structure)
3. [Component Styling Standards](#component-styling-standards)
4. [Database Architecture](#database-architecture)
5. [Examples System](#examples-system)
6. [Quiz System](#quiz-system)
7. [Workflow & Scripts](#workflow--scripts)
8. [Quality Checklist](#quality-checklist)

---

## CORE PRINCIPLES

### The Three Immutable Rules

1. **DATABASE FIRST** - All structured data (examples, quizzes, metadata) lives in Supabase, NEVER in HTML
2. **CONSISTENCY ÜBER ALLES** - Same fonts, same spacing, same structure for EVERY lesson (English AND Math)
3. **NO SPECIAL BOXES** - No tip boxes, warning boxes, gradient boxes except where explicitly specified

### What Goes Where

| Component | Storage Location | Rendered By |
|-----------|-----------------|-------------|
| Lesson metadata (title, order) | Supabase `lesson_metadata` table | `lessonStructure.js` |
| Lesson HTML content | Supabase `section_content` table | `ProgressiveLessonRenderer` |
| Examples | Supabase `examples` table | `ExampleCard` component |
| Mastery Quizzes | Supabase `quizzes` table | `InteractiveQuiz` component |
| Bold term definitions | Supabase `glossary_terms` table | `useTermTooltips` hook |

---

## COMPLETE HTML STRUCTURE

### EXACT Template (Copy-Paste This!)

```html
<!--
LESSON TEMPLATE v3.0
Subject: [Math/English]
Topic: [Specific Topic Name]
Lesson Key: [e.g., 5.2]
-->

<!-- ========================================
     SECTION 1: OPENING PARAGRAPH
     CRITICAL: This loads FIRST. Must have:
     - 60-100 words
     - 3-6 styled bold terms
     - ACT context (# of questions)
     ======================================== -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Understanding <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">concept one</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">concept two</strong>, and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">concept three</strong> is essential for ACT [Subject] success. These concepts appear in 5-8 questions per test—that's [X]% of all [subject] questions! This lesson will teach you everything you need to know, from basic definitions to advanced strategies, helping you answer these questions quickly and accurately.
</p>

<!-- ========================================
     SECTION 2: CONTENT (EXACTLY 4 H3 SECTIONS)
     Each H3 = Major Concept
     ======================================== -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. First Major Concept
</h3>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Opening paragraph introducing this concept. Use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">styled bold terms</strong> for all key vocabulary. Explain why this matters for the ACT and what students will learn.
</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
First Subsection Title
</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Detailed explanation paragraph (40+ words). Include examples, formulas, or rules. Use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">bold terms</strong> for emphasis.
</p>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
Second Subsection Title
</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Another detailed explanation...
</p>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID] -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Second Major Concept
</h3>

<!-- Repeat structure for H3 sections 2, 3, 4 -->

<!-- Example 2 after H3 #2 -->
<!-- Example 3 after H3 #3 -->
<!-- Example 4 after H3 #4 -->

<!-- ========================================
     SECTION 3: HIDDEN SEPARATOR
     CRITICAL: Parser needs this!
     ======================================== -->

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<!-- ========================================
     SECTION 4: KEY TAKEAWAYS
     SIMPLE GREEN LIST - NO GRADIENT BOXES
     ======================================== -->

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>First key takeaway with explanation
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
  <!-- 4-6 total -->
</ul>

<!-- MASTERY QUIZ: Stored in database, NOT in HTML -->
<!-- Create separately using quiz creation script -->
```

---

## COMPONENT STYLING STANDARDS

### Typography

**ALL text in lessons MUST use:**
```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
font-size: 16px; /* Body text */
font-size: 17px; /* Questions and answer choices */
line-height: 1.7; /* Body text */
line-height: 1.6; /* Questions */
color: #1f2937; /* Primary text */
```

**Headers:**
```html
<!-- H2: Lesson Title (auto-generated, not in HTML) -->
<h2 style="font-size: 1.875rem; font-weight: 700; color: #111827;">

<!-- H3: Major Sections -->
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">

<!-- H4: Subsections -->
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400; font-size: 16px;">
```

**Bold Terms (Key Vocabulary):**
```html
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">term</strong>
```

### Spacing

```css
/* Section margins */
margin-top: 5rem;      /* Between H3 sections */
margin-top: 2rem;      /* Between H4 subsections */
margin: 0.5rem 0 1rem 0; /* Paragraphs */

/* Example boxes */
margin: 3rem 0;        /* Around entire ExampleCard */
padding: 1.5rem;       /* Inside example box */
border-radius: 8px;    /* Example box corners */
```

### Colors

```css
/* Primary Blue (for bold terms) */
#2563eb

/* Text Colors */
#111827  /* Headers (darkest) */
#1f2937  /* Body text (dark) */
#6b7280  /* Muted text */

/* Key Takeaways Green */
#2e7d32  /* Text */
#4caf50  /* Checkmarks */

/* Quiz/Example Red */
#dc2626  /* Answer text */
#b91c1c  /* Example border */

/* Success/Error */
#48bb78  /* Correct answer */
#f56565  /* Incorrect answer */
```

---

## DATABASE ARCHITECTURE

### Table Structure

```sql
-- 1. LESSON METADATA (Core info)
CREATE TABLE lesson_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_key TEXT UNIQUE NOT NULL,  -- e.g., '5.2' (MUST match lessonStructure.js)
  title TEXT NOT NULL,
  subject TEXT CHECK (subject IN ('math', 'english', 'reading', 'science')),
  category TEXT,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. LESSON SECTIONS (Chapter/section divisions)
CREATE TABLE lesson_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,  -- e.g., 'percentages-main'
  title TEXT,
  section_type TEXT DEFAULT 'content',
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SECTION CONTENT (Actual HTML)
CREATE TABLE section_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
  content TEXT NOT NULL,  -- The HTML content
  content_type TEXT DEFAULT 'html',
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXAMPLES (Structured example data)
CREATE TABLE examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,  -- 1, 2, 3, 4
  title TEXT NOT NULL,
  problem_text TEXT NOT NULL,
  choices JSONB,  -- [{"letter": "A", "text": "..."}, ...]
  correct_answer TEXT,
  solution_steps JSONB NOT NULL,  -- [{"step": 1, "text": "..."}, ...]
  answer_explanation TEXT,
  diagram_svg TEXT,
  is_worked_example BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lesson_id, position)
);

-- 5. QUIZZES (Mastery checks)
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  position INTEGER NOT NULL,  -- Usually 11 (end of lesson)
  is_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. QUIZ QUESTIONS & OPTIONS
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  explanation TEXT,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GLOSSARY TERMS (Tooltip definitions)
CREATE TABLE glossary_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT UNIQUE NOT NULL,
  definition TEXT NOT NULL,
  lesson_key TEXT,  -- Optional: which lesson introduces this term
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Service Methods (Use These!)

```javascript
// LessonsService
import LessonsService from '../services/api/lessons.service';

await LessonsService.getAllLessons();           // Get all lesson metadata
await LessonsService.getLessonByKey('5.2');     // Get specific lesson with content

// ExamplesService
import ExamplesService from '../services/api/examples.service';

await ExamplesService.getExamplesByLessonId(lessonUUID);  // Get all examples for a lesson
await ExamplesService.getExampleById(exampleUUID);        // Get single example

// QuizzesService
import QuizzesService from '../services/api/quizzes.service';

await QuizzesService.getQuizzesByLessonId(lessonUUID);    // Get all quizzes for a lesson
```

---

## EXAMPLES SYSTEM

### Example Component: ExampleCard.jsx

**ALL examples are rendered by this component. It provides:**
- Circular letter indicators (A, B, C, D, E)
- Interactive answer selection
- Green highlight for correct, red for incorrect
- Bold red "Answer: X" display
- Gray "SOLUTION" header
- Bullet list for solution steps
- Subtle gray box (#fafafa) with rounded corners
- Red left border on header

**The component matches InteractiveQuiz styling EXACTLY.**

### Creating Examples

**Step 1: Write Example HTML (for preview only)**

```html
<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">
Example 1: Descriptive Title
</h4>

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin: 1rem 0 2rem 0; border: 2px solid #f59e0b;">
  <p style="font-size: 16px; margin: 0 0 1rem 0; font-weight: 500;">
    A circular garden has a diameter of 10 feet. What is the area?
  </p>

  <p style="font-family: 'Times New Roman', Times, serif; font-size: 15px; margin: 0.75rem 0 0.5rem 0; color: #000000;">
    <strong>A)</strong> 10π
  </p>
  <p style="font-family: 'Times New Roman', Times, serif; font-size: 15px; margin: 0.5rem 0; color: #000000;">
    <strong>B)</strong> 25π
  </p>
  <p style="font-family: 'Times New Roman', Times, serif; font-size: 15px; margin: 0.5rem 0; color: #000000;">
    <strong>C)</strong> 50π
  </p>
  <p style="font-family: 'Times New Roman', Times, serif; font-size: 15px; margin: 0.5rem 0; color: #000000;">
    <strong>D)</strong> 100π
  </p>
  <p style="font-family: 'Times New Roman', Times, serif; font-size: 15px; margin: 0.5rem 0; color: #000000;">
    <strong>E)</strong> 200π
  </p>

  <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 2px solid #f59e0b;">
    <p style="font-size: 15px; margin: 0 0 0.75rem 0; font-weight: 600; color: #92400e;">
      Solution:
    </p>
    <p style="font-size: 15px; line-height: 1.6; margin: 0.5rem 0; color: #000000;">
      <strong>Step 1:</strong> The problem gives diameter (10 ft), but the formula uses radius!
    </p>
    <p style="font-size: 15px; line-height: 1.6; margin: 0.5rem 0; color: #000000;">
      <strong>Step 2:</strong> Radius = diameter ÷ 2 = 10 ÷ 2 = 5 feet
    </p>
    <p style="font-size: 15px; line-height: 1.6; margin: 0.5rem 0; color: #000000;">
      <strong>Step 3:</strong> Area = πr² = π(5)² = 25π square feet
    </p>
    <p style="font-size: 15px; line-height: 1.6; margin: 0.75rem 0 0 0; color: #000000;">
      <strong style="color: #15803d;">Answer: B</strong> — Keep π in the answer; ACT often doesn't want decimals.
    </p>
  </div>
</div>
```

**Step 2: Run Migration Script**

```bash
node scripts/migrate-examples-to-db.mjs
```

This extracts all examples from HTML files and uploads to the `examples` table in Supabase.

**Step 3: Verify in Database**

Check Supabase dashboard → `examples` table → confirm 4 examples exist for your lesson.

### Example Positioning

Examples use the `position` field (1, 2, 3, 4) to determine placement:
- `position: 1` → Appears after H3 section #1
- `position: 2` → Appears after H3 section #2
- `position: 3` → Appears after H3 section #3
- `position: 4` → Appears after H3 section #4

**The ProgressiveLessonRenderer automatically places examples correctly based on H3 count.**

---

## QUIZ SYSTEM

### Quiz Component: InteractiveQuiz.js

**ALL mastery quizzes are rendered by this component. It provides:**
- Red header bar with "🔒 Mastery Quiz" title
- Question number display (1/7, 2/7, etc.)
- Circular letter indicators
- Interactive answer selection
- Explanation display after selection
- Previous/Next navigation
- Final score and mastery level assessment

### Creating Quizzes

**Step 1: Create Quiz Script**

Create `/scripts/create-quiz-[lesson-key].mjs`:

```javascript
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createQuiz() {
  // 1. Get lesson UUID
  const { data: lesson, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', '5.2')  // Change to your lesson key
    .single();

  if (lessonError || !lesson) {
    console.error('Lesson not found');
    return;
  }

  // 2. Create quiz
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .insert({
      lesson_id: lesson.id,
      title: '🔒 Mastery Quiz: Percentages',
      position: 11,
      is_required: true
    })
    .select()
    .single();

  if (quizError) {
    console.error('Quiz creation failed:', quizError);
    return;
  }

  // 3. Create questions
  const questions = [
    {
      text: 'What percent is equivalent to 3/4?',
      options: [
        { text: '34%', isCorrect: false },
        { text: '43%', isCorrect: false },
        { text: '75%', isCorrect: true, explanation: '3÷4 = 0.75 = 75%' },
        { text: '80%', isCorrect: false },
        { text: '85%', isCorrect: false }
      ]
    },
    // ... 4-7 more questions
  ];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    const { data: question, error: qError } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: quiz.id,
        text: q.text,
        order_index: i
      })
      .select()
      .single();

    if (qError) {
      console.error(`Question ${i+1} failed:`, qError);
      continue;
    }

    for (let j = 0; j < q.options.length; j++) {
      const opt = q.options[j];
      await supabase.from('quiz_options').insert({
        question_id: question.id,
        text: opt.text,
        is_correct: opt.isCorrect,
        explanation: opt.explanation || null,
        order_index: j
      });
    }
  }

  console.log('✅ Quiz created successfully!');
}

createQuiz();
```

**Step 2: Run Script**

```bash
node scripts/create-quiz-5.2.mjs
```

**Step 3: Verify**

- Check Supabase → `quizzes` table → verify quiz exists
- Check `quiz_questions` and `quiz_options` tables
- Test in UI by navigating to lesson

---

## WORKFLOW & SCRIPTS

### Full Lesson Creation Workflow

```bash
# 1. Create HTML file in /docs
touch docs/LESSON_5_2_PERCENTAGES.html

# 2. Write lesson content following template above
# ... edit LESSON_5_2_PERCENTAGES.html ...

# 3. Create upload script
touch scripts/upload-lesson-5.2.mjs

# 4. Configure upload script with lesson metadata
# ... edit upload-lesson-5.2.mjs ...

# 5. Upload to Supabase
node scripts/upload-lesson-5.2.mjs

# 6. Extract and upload examples
node scripts/migrate-examples-to-db.mjs

# 7. Create mastery quiz
node scripts/create-quiz-5.2.mjs

# 8. Update lessonStructure.js
# Add entry: { id: '5.2', ... }

# 9. Test in browser
npm start
# Navigate to lesson, verify everything displays correctly
```

### Critical Script: migrate-examples-to-db.mjs

This script:
1. Reads all `LESSON_*.html` files from `/docs`
2. Extracts examples using regex patterns
3. Parses problem text, choices, solution steps, answers
4. Uploads to Supabase `examples` table
5. Links to lessons via `lesson_id`

**Supports TWO HTML formats:**
- **Old format**: Plain paragraphs with `<span>` choices
- **New format**: Yellow gradient boxes with `<p>` choices

**Always run after creating/updating lessons with examples!**

---

## QUALITY CHECKLIST

### Before Marking a Lesson Complete

**HTML Content:**
- [ ] Opening paragraph: 60-100 words with 3-6 styled bold terms
- [ ] ACT context mentioned (e.g., "5-8 questions per test")
- [ ] Exactly 4 H3 sections with numbered titles
- [ ] Each H3 has 2-4 H4 subsections
- [ ] All bold terms use full CSS: `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">`
- [ ] Hidden H3 separator before Key Takeaways
- [ ] Key Takeaways: Simple green list (#2e7d32) with checkmarks (#4caf50)
- [ ] 4-6 key takeaways total
- [ ] NO tip boxes, warning boxes, or custom gradient boxes (except examples)

**Examples:**
- [ ] Exactly 4 examples in HTML (for preview)
- [ ] Each example has clear title
- [ ] Problem text is ACT-realistic
- [ ] Answer choices alternate A-E / F-K pattern
- [ ] 3-4 solution steps with `<strong>Step X:</strong>` labels
- [ ] Green answer explanation at end
- [ ] Migration script executed: `node scripts/migrate-examples-to-db.mjs`
- [ ] Examples verified in Supabase `examples` table
- [ ] Examples display correctly in UI (with ExampleCard styling)

**Mastery Quiz:**
- [ ] Quiz script created in `/scripts/create-quiz-[key].mjs`
- [ ] 5-8 questions covering all major concepts
- [ ] Mix of easy, medium, hard questions
- [ ] Each question has 5 answer choices (A-E)
- [ ] Correct answer has detailed explanation
- [ ] Quiz uploaded to Supabase: `node scripts/create-quiz-[key].mjs`
- [ ] Quiz verified in database (position: 11)
- [ ] Quiz displays at end of lesson in UI

**Database & Structure:**
- [ ] Upload script created and executed
- [ ] Lesson appears in `lesson_metadata` table
- [ ] Content appears in `section_content` table
- [ ] `lesson_key` in database matches `id` in `lessonStructure.js` (e.g., both '5.2')
- [ ] Updated `lessonStructure.js` with new lesson entry
- [ ] Lesson loads correctly in UI (no fallback text)
- [ ] All examples appear after correct H3 sections
- [ ] Mastery quiz appears at end

**Consistency:**
- [ ] Same font family as all other lessons (SF Pro Display, etc.)
- [ ] Same font sizes (16px body, 17px questions)
- [ ] Same colors for headers, bold terms, takeaways
- [ ] Same spacing and margins
- [ ] Examples use ExampleCard component (not hardcoded HTML)
- [ ] No unique/custom formatting

---

## COMMON MISTAKES & FIXES

### ❌ MISTAKE: Examples not showing
**FIX:** Run `node scripts/migrate-examples-to-db.mjs` to extract from HTML

### ❌ MISTAKE: Empty example boxes
**FIX:** Check `problem_text` field in database - likely migration regex didn't match. Update migration script regex patterns.

### ❌ MISTAKE: Lesson shows "Comprehensive ACT-relevant content for..."
**FIX:** `lesson_key` in database doesn't match `id` in `lessonStructure.js`. Make them identical.

### ❌ MISTAKE: Examples appear in wrong order
**FIX:** Examples positioned by H3 count. Ensure HTML has exactly 4 H3 sections and examples have positions 1-4.

### ❌ MISTAKE: Quiz not appearing
**FIX:** Check quiz `position` field - should be 11. Check `is_required: true`.

### ❌ MISTAKE: Different fonts in English vs Math lessons
**FIX:** Both MUST use `-apple-system, BlinkMacSystemFont, "SF Pro Display"...` - update all HTML.

### ❌ MISTAKE: Tip boxes/warning boxes from old lessons
**FIX:** Remove ALL custom boxes. Only use: standard paragraphs, Key Takeaways green list, examples (in database).

---

## FINAL NOTES

This template represents the COMPLETE and FINAL standard for all ACT lessons. Any deviation from this standard must be explicitly approved and documented.

**When in doubt, refer to this document. This is the source of truth.**

Last Updated: 2025-10-16
Version: 3.0 (Database-First Architecture)
