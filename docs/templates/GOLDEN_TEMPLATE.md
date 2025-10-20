# ACT Prep - GOLDEN TEMPLATE v4.0
## The Single Source of Truth for ALL Lesson Formatting

**PURPOSE:** This document is the COMPLETE reference for creating consistent ACT lessons. Every lesson (English and Math) MUST follow these exact standards. No variations allowed.

---

## TABLE OF CONTENTS
1. [Core Principles](#core-principles)
2. [Complete HTML Structure](#complete-html-structure)
3. [Component Styling Standards](#component-styling-standards)
4. [Database Architecture](#database-architecture)
5. [Examples System](#examples-system)
6. [Glossary Terms System](#glossary-terms-system)
7. [Quiz System](#quiz-system)
8. [Workflow & Scripts](#workflow--scripts)
9. [Quality Checklist](#quality-checklist)

---

## CORE PRINCIPLES

### The Five Immutable Rules

1. **DATABASE FIRST** - All structured data (examples, quizzes, glossary terms) lives in Supabase, NEVER in HTML
2. **BULLET POINTS OVER PARAGRAPHS** - Use concise bullet points with multiple indent levels, NOT long paragraphs
3. **SPARSE BOLD TERMS** - Blue underlined bold terms ONLY for textbook definitions with Supabase glossary entries
4. **CONSISTENCY ÜBER ALLES** - Same fonts, same spacing, same structure for EVERY lesson
5. **WORKING EXAMPLES** - Examples stored in Supabase, positioned after new concepts are taught

### What Goes Where

| Component | Storage Location | Rendered By | Requirements |
|-----------|-----------------|-------------|--------------|
| Lesson metadata (title, topic number) | Supabase `lessons` table | `lessonStructure.js` | Must have topic_number field (e.g., "1.1") |
| Lesson HTML content | Supabase `lessons.content` field | `ProgressiveLessonRenderer` | Bullet points, not paragraphs |
| Examples (Working Examples) | Supabase `examples` table | `ExampleCard` component | Correlated to lesson_id, positioned after concepts |
| Mastery Quizzes | Supabase `quizzes` table | `InteractiveQuiz` component | Position 11, end of lesson |
| Bold term definitions | Supabase `glossary_terms` table | `useTermTooltips` hook | MUST exist before using bold styling |

---

## COMPLETE HTML STRUCTURE

### CRITICAL FORMATTING RULES

**❌ NEVER:**
- Use long paragraphs (40+ words)
- Use blue underlined bold for emphasis or random words
- Use more or less than EXACTLY 4 key takeaways
- Add custom boxes, gradients, or special formatting

**✅ ALWAYS:**
- Use bullet points with 2-3 indent levels
- Use blue underlined bold ONLY for terms in glossary_terms table
- Use EXACTLY 4 key takeaways (no more, no less)
- Position examples after teaching new concepts

### EXACT Template (Copy-Paste This!)

```html
<!--
LESSON TEMPLATE v4.0
Subject: [Math/English/Reading/Science]
Topic Number: [e.g., 1.1, 2.3, 5.2]
Topic: [Specific Topic Name]
Lesson Key: [e.g., backsolving]
-->

<!-- ========================================
     SECTION 1: OPENING (2 SENTENCES MAX)
     CRITICAL: Must have:
     - MAXIMUM 2 sentences
     - ACT context (# of questions or %)
     - NO blue underlined terms here
     ======================================== -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[First sentence introducing the strategy/concept and its importance on the ACT.] [Second sentence stating how many questions this appears on, what students will learn, or why it matters—that's it, stop here!]
</p>

<!-- ========================================
     SECTION 2: CONTENT (EXACTLY 4 H3 SECTIONS)
     Each H3 = Major Concept
     Use BULLET POINTS with indents, NOT paragraphs
     ======================================== -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. First Major Concept
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Main point about this concept using <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">glossary term</strong> (only if term exists in database)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sub-point with more detail</li>
      <li style="margin: 0.2rem 0;">Another sub-point
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Third-level detail when needed</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Second main point for this concept
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Supporting detail</li>
      <li style="margin: 0.2rem 0;">Another supporting detail</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
First Subsection Title
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Key point about this subsection
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Detail or example</li>
      <li style="margin: 0.2rem 0;">Another detail</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Another key point</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
Second Subsection Title
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Key point
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Supporting detail</li>
    </ul>
  </li>
</ul>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], shown AFTER teaching concept -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Second Major Concept
</h3>

<!-- Repeat bullet point structure for H3 sections 2, 3, 4 -->
<!-- Place examples AFTER teaching each concept -->

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
     EXACTLY 4 BULLET POINTS - NO MORE, NO LESS
     ======================================== -->

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>First key takeaway (concise, actionable)
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
  <!-- EXACTLY 4 - NO MORE, NO LESS -->
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
font-size: 16px; /* Body text and bullet points */
font-size: 17px; /* Questions and answer choices */
line-height: 1.7; /* Body text and bullets */
line-height: 1.6; /* Questions */
color: #1f2937; /* Primary text */
```

**Headers:**
```html
<!-- H2: Lesson Title (auto-generated, not in HTML) -->
<h2 style="font-size: 1.875rem; font-weight: 700; color: #111827;">

<!-- H3: Major Sections (exactly 4) -->
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">

<!-- H4: Subsections (2-4 per H3) -->
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400; font-size: 16px;">
```

**Bold Terms (ONLY FOR GLOSSARY TERMS):**
```html
<!-- ✅ CORRECT: Term exists in glossary_terms table -->
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">backsolving</strong>

<!-- ❌ WRONG: Using for emphasis without glossary entry -->
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">very important</strong>

<!-- ✅ CORRECT: Use regular text for emphasis -->
This is <strong>important</strong> (regular bold, no blue/underline)
```

**Bullet Points:**
```html
<!-- Main list -->
<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Main point
    <!-- Nested list (level 2) -->
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sub-point
        <!-- Nested list (level 3) -->
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Detail</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

### Spacing

```css
/* Section margins */
margin-top: 5rem;      /* Between H3 sections */
margin-top: 2rem;      /* Between H4 subsections */
margin: 0.5rem 0 1rem 0; /* Bullet lists */

/* List item margins */
margin: 0.3rem 0;      /* Top-level bullet */
margin: 0.2rem 0;      /* Second-level bullet */
margin: 0.15rem 0;     /* Third-level bullet */

/* Example boxes */
margin: 3rem 0;        /* Around entire ExampleCard */
padding: 1.5rem;       /* Inside example box */
border-radius: 8px;    /* Example box corners */
```

### Colors

```css
/* Primary Blue (ONLY for glossary terms) */
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
-- 1. LESSONS (Main lesson table)
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_key TEXT UNIQUE NOT NULL,  -- e.g., 'backsolving'
  topic_number TEXT,                -- e.g., '1.1', '2.3', '5.2' (REQUIRED for display)
  title TEXT NOT NULL,
  subject TEXT CHECK (subject IN ('math', 'english', 'reading', 'science')),
  category TEXT,
  content TEXT,                     -- The HTML content
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EXAMPLES (Working Examples)
CREATE TABLE examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  topic_number TEXT,                -- Links to lesson topic_number (e.g., '1.1')
  position INTEGER NOT NULL,        -- 1, 2, 3, 4 (position after H3 sections)
  title TEXT NOT NULL,
  problem_text TEXT NOT NULL,
  choices JSONB,                    -- [{"letter": "A", "text": "..."}, ...]
  correct_answer TEXT,
  solution_steps JSONB NOT NULL,    -- [{"step": 1, "text": "..."}, ...]
  answer_explanation TEXT,
  diagram_svg TEXT,
  is_worked_example BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lesson_id, position)
);

-- 3. GLOSSARY TERMS (Hover definitions - REQUIRED for blue underlined bold)
CREATE TABLE glossary_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT UNIQUE NOT NULL,        -- Exact text that appears in lessons
  definition TEXT NOT NULL,         -- Hover tooltip definition
  lesson_key TEXT,                  -- Which lesson introduces this term
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. QUIZZES (Mastery checks)
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  position INTEGER NOT NULL,        -- Usually 11 (end of lesson)
  is_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. QUIZ QUESTIONS & OPTIONS
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
```

### Service Methods (Use These!)

```javascript
// LessonsService
import LessonsService from '../services/api/lessons.service';

await LessonsService.getAllLessons();           // Get all lessons
await LessonsService.getLessonByKey('backsolving'); // Get specific lesson

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

### Creating Examples in Supabase

**Step 1: Create Example Script**

Create `/scripts/create-examples-[topic-number].mjs`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'YOUR_SERVICE_ROLE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createExamples() {
  // 1. Get lesson UUID
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'backsolving')
    .single();

  if (lessonError || !lesson) {
    console.error('Lesson not found');
    return;
  }

  // 2. Create examples
  const examples = [
    {
      lesson_id: lesson.id,
      topic_number: '1.1',
      position: 1,
      title: 'Basic Backsolving with Radicals',
      problem_text: 'If √(x + 10) − 2√(x − 2) = 0, what is the value of x?',
      choices: [
        { letter: 'A', text: '2' },
        { letter: 'B', text: '6' },
        { letter: 'C', text: '14' },
        { letter: 'D', text: '18' },
        { letter: 'E', text: '22' }
      ],
      correct_answer: 'B',
      solution_steps: [
        { step: 1, text: 'Start with C (14): √(14 + 10) − 2√(14 − 2) = √24 − 2√12 ≈ 4.9 − 6.9 ≠ 0' },
        { step: 2, text: 'Try B (6): √(6 + 10) − 2√(6 − 2) = √16 − 2√4 = 4 − 2(2) = 0 ✓' },
        { step: 3, text: 'Since B works, it\'s the answer!' }
      ],
      answer_explanation: 'Starting with the middle value (C) lets us eliminate multiple choices quickly. When we test B, all conditions are satisfied.',
      is_worked_example: true
    },
    // Add 3 more examples for positions 2, 3, 4
  ];

  for (const example of examples) {
    const { data, error } = await supabase
      .from('examples')
      .insert(example)
      .select();

    if (error) {
      console.error(`Failed to create example ${example.position}:`, error);
    } else {
      console.log(`✅ Created example ${example.position}: ${example.title}`);
    }
  }
}

createExamples();
```

**Step 2: Run Script**

```bash
node scripts/create-examples-1.1.mjs
```

**Step 3: Verify**

Check Supabase → `examples` table → confirm 4 examples exist with correct `topic_number` and `position` fields.

### Example Positioning Rules

**CRITICAL:** Examples appear AFTER teaching the concept, not before!

- `position: 1` → After H3 #1 (after teaching first major concept)
- `position: 2` → After H3 #2 (after teaching second major concept)
- `position: 3` → After H3 #3 (after teaching third major concept)
- `position: 4` → After H3 #4 (after teaching fourth major concept)

**The ProgressiveLessonRenderer automatically places examples correctly based on H3 count.**

---

## GLOSSARY TERMS SYSTEM

### ⚠️ CRITICAL: Blue Underlined Bold Terms MUST Have Glossary Entries

**Before using blue underlined bold styling, you MUST create a glossary entry in Supabase!**

### Creating Glossary Terms

**Step 1: Create Glossary Script**

Create `/scripts/create-glossary-[topic-number].mjs`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'YOUR_SERVICE_ROLE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createGlossaryTerms() {
  const terms = [
    {
      term: 'backsolving',
      definition: 'A problem-solving strategy where you test answer choices by plugging them into the problem conditions instead of solving algebraically.',
      lesson_key: 'backsolving'
    },
    {
      term: 'working backwards',
      definition: 'Another name for backsolving; starting with the answer choices and testing which one satisfies all problem conditions.',
      lesson_key: 'backsolving'
    },
    {
      term: 'answer choice testing',
      definition: 'The process of systematically testing each answer choice to determine which one is correct.',
      lesson_key: 'backsolving'
    }
  ];

  for (const term of terms) {
    const { data, error } = await supabase
      .from('glossary_terms')
      .insert(term)
      .select();

    if (error) {
      console.error(`Failed to create term "${term.term}":`, error);
    } else {
      console.log(`✅ Created glossary term: ${term.term}`);
    }
  }
}

createGlossaryTerms();
```

**Step 2: Run Script**

```bash
node scripts/create-glossary-1.1.mjs
```

**Step 3: Verify**

Check Supabase → `glossary_terms` table → confirm all terms exist.

### Glossary Term Usage Rules

**✅ DO use blue underlined bold for:**
- Textbook definition terms (e.g., "backsolving", "subject-verb agreement")
- Technical vocabulary (e.g., "independent clause", "quadratic formula")
- Strategy names (e.g., "working backwards", "elimination method")

**❌ DON'T use blue underlined bold for:**
- Emphasis words (e.g., "very important", "always remember")
- Common words (e.g., "question", "answer", "test")
- Phrases without specific definitions (e.g., "key point", "main idea")
- Random words for styling purposes

**RULE:** If you can't write a clear textbook definition for it, DON'T use blue underlined bold!

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

**Follow the same pattern as before - create a quiz script with 5-8 questions testing all major concepts from the lesson.**

---

## WORKFLOW & SCRIPTS

### Full Lesson Creation Workflow

```bash
# 1. Create glossary terms FIRST (before writing lesson)
touch scripts/create-glossary-1.1.mjs
# ... define terms with clear definitions ...
node scripts/create-glossary-1.1.mjs

# 2. Create lesson HTML file
touch docs/LESSON_1_1_BACKSOLVING.html
# ... write lesson content with bullet points ...
# ... use blue underlined bold ONLY for glossary terms ...

# 3. Create upload script
touch scripts/upload-lesson-1.1.mjs
# ... configure with lesson metadata including topic_number ...

# 4. Upload lesson to Supabase
node scripts/upload-lesson-1.1.mjs

# 5. Create working examples
touch scripts/create-examples-1.1.mjs
# ... define 4 examples at positions 1-4 ...
node scripts/create-examples-1.1.mjs

# 6. Create mastery quiz
touch scripts/create-quiz-1.1.mjs
# ... define 5-8 questions ...
node scripts/create-quiz-1.1.mjs

# 7. Update lessonStructure.js
# Add entry with chapterNum: '1.1'

# 8. Test in browser
npm start
# Navigate to lesson, verify everything displays correctly
```

---

## QUALITY CHECKLIST

### Before Marking a Lesson Complete

**HTML Content:**
- [ ] Opening: EXACTLY 2 sentences (no more!)
- [ ] ACT context mentioned (e.g., "appears on 5-8 questions" or "13-20% of test")
- [ ] Exactly 4 H3 sections with numbered titles
- [ ] Each H3 uses bullet points with 2-3 indent levels (NO long paragraphs)
- [ ] Each H3 has 2-4 H4 subsections
- [ ] ALL blue underlined bold terms exist in `glossary_terms` table (verify in Supabase!)
- [ ] NO blue underlined bold used for emphasis or random words
- [ ] Hidden H3 separator before Key Takeaways
- [ ] Key Takeaways: EXACTLY 4 bullet points (no more, no less)
- [ ] NO tip boxes, warning boxes, or custom gradient boxes

**Glossary Terms:**
- [ ] All glossary terms created in Supabase BEFORE writing lesson
- [ ] Each term has clear, concise textbook definition
- [ ] Terms are used sparingly (3-6 per lesson max)
- [ ] Hover tooltips work in UI (test this!)
- [ ] No blue underlined bold without glossary entry

**Examples:**
- [ ] Exactly 4 examples in Supabase `examples` table
- [ ] Each example has `topic_number` field matching lesson (e.g., '1.1')
- [ ] Each example has clear title
- [ ] Problem text is ACT-realistic
- [ ] Answer choices A-E
- [ ] 3-4 solution steps
- [ ] Answer explanation provided
- [ ] Examples display correctly in UI (with ExampleCard styling)
- [ ] Examples positioned AFTER teaching concepts

**Database & Structure:**
- [ ] Lesson has `topic_number` field (e.g., '1.1')
- [ ] Lesson `lesson_key` matches `id` in `lessonStructure.js`
- [ ] `lessonStructure.js` has `chapterNum: '1.1'` entry
- [ ] Topic number displays in lessons tab/navigator
- [ ] Lesson loads correctly in UI
- [ ] All examples appear after correct H3 sections
- [ ] All glossary terms show hover tooltips
- [ ] Mastery quiz appears at end

**Consistency:**
- [ ] Same font family as all other lessons
- [ ] Same font sizes (16px bullets, 17px questions)
- [ ] Same colors for headers, bold terms, takeaways
- [ ] Same spacing and margins
- [ ] Bullet points, not paragraphs
- [ ] No unique/custom formatting

---

## COMMON MISTAKES & FIXES

### ❌ MISTAKE: Blue underlined bold tooltips not working
**FIX:** Check `glossary_terms` table - term must exist EXACTLY as written (case-sensitive). Verify `useTermTooltips` hook is active.

### ❌ MISTAKE: Using blue underlined bold for emphasis
**FIX:** Remove blue underlined styling from non-definition words. Use regular `<strong>` for emphasis.

### ❌ MISTAKE: Long paragraphs instead of bullet points
**FIX:** Convert ALL paragraphs (except 2-sentence intro) to bullet points with indent levels.

### ❌ MISTAKE: More than 2 sentences in opening
**FIX:** Reduce to EXACTLY 2 sentences. No exceptions.

### ❌ MISTAKE: Wrong number of key takeaways (3, 5, or 6)
**FIX:** Must be EXACTLY 4. Add or remove to meet requirement.

### ❌ MISTAKE: Examples not showing
**FIX:** Check `examples` table in Supabase. Verify `lesson_id` and `position` fields are correct.

### ❌ MISTAKE: Examples appear before teaching concept
**FIX:** Ensure examples are positioned AFTER their corresponding H3 sections teach the concept.

### ❌ MISTAKE: Topic number not showing in lessons tab
**FIX:** Add `topic_number` field to lesson in database (e.g., '1.1'). Update `lessonStructure.js` with `chapterNum: '1.1'`.

---

## FINAL NOTES

This template represents the COMPLETE and FINAL standard for all ACT lessons. Any deviation from this standard must be explicitly approved and documented.

**Key Changes in v4.0:**
- Bullet points replace paragraphs throughout content
- Opening reduced to 2 sentences maximum
- Blue underlined bold ONLY for glossary terms (verified in database)
- Key takeaways EXACTLY 4 (no more, no less)
- Topic numbers required in database and UI
- Examples positioned after teaching concepts

**When in doubt, refer to this document. This is the source of truth.**

Last Updated: 2025-10-19
Version: 4.0 (Bullet Points, Sparse Terms, Working Examples)
