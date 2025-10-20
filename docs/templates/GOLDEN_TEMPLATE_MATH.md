# ACT Prep - MATH GOLDEN TEMPLATE v5.2
## The Single Source of Truth for ALL Math Lesson Formatting

**⚠️ CRITICAL UPDATE v5.2:** This template now includes explicit requirements for HTML structure to prevent formatting mistakes:
- **MUST include HTML comments at top** (Topic X.X and template version)
- **MUST use blue glossary terms** with exact style string for textbook definitions
- **MUST use proper nested `<ul>` structure** with specific margins
- **NEVER wrap in `<div>` containers**
- **ALWAYS reference chapter 3.4** as the formatting model when in doubt

**PURPOSE:** This document is the COMPLETE reference for creating consistent ACT **MATH** lessons. Every math lesson MUST follow these exact standards. No variations allowed.

**NOTE:** This template is specific to MATH lessons. English, Reading, and Science have separate templates with different requirements (e.g., 4 answer choices instead of 5).

---

## TABLE OF CONTENTS
1. [Core Principles](#core-principles)
2. [Complete HTML Structure](#complete-html-structure)
3. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
4. [Component Styling Standards](#component-styling-standards)
5. [Database Architecture](#database-architecture)
6. [Examples System (Math-Specific)](#examples-system-math-specific)
7. [Glossary Terms System](#glossary-terms-system)
8. [Mathematical Notation](#mathematical-notation)
9. [Workflow & Scripts](#workflow--scripts)
10. [Quality Checklist](#quality-checklist)

---

## CORE PRINCIPLES

### The Six Immutable Rules for Math Lessons

1. **DATABASE FIRST** - All structured data (examples, glossary terms) lives in Supabase, NEVER in HTML
2. **BULLET POINTS OVER PARAGRAPHS** - Use concise bullet points with 2-3 indent levels, NOT long paragraphs
3. **SPARSE GLOSSARY TERMS** - Blue underlined bold terms ONLY for textbook definitions with Supabase entries (use sparingly: 3-6 per lesson max)
4. **FLEXIBLE H3 SECTIONS** - Number of H3 sections depends on concepts covered (typically 2-5 sections, NOT a fixed number)
5. **WORKING EXAMPLES AFTER CONCEPTS** - Examples stored in Supabase, positioned AFTER teaching each concept
6. **NO MASTERY QUIZZES** - Math lessons do NOT include mastery quizzes at the end

### Math-Specific Requirements

- **Answer Choices**: Always 5 options (A, B, C, D, E) for math problems
- **Mathematical Notation**: Use proper notation for formulas, equations, fractions
- **Calculator Notes**: Specify when calculator is useful or not needed
- **Formula Display**: Use clear, readable format for mathematical expressions
- **Diagrams**: Note where diagrams would be helpful (stored separately)

### What Goes Where

| Component | Storage Location | Rendered By | Requirements |
|-----------|-----------------|-------------|--------------|
| Lesson metadata (title, topic number) | Supabase `lessons` table | `lessonStructure.js` | Must have chapter number (e.g., "1.1") |
| Lesson HTML content | Supabase `lessons.content` field | `ProgressiveLessonRenderer` | Bullet points, not paragraphs |
| Examples (Working Examples) | Supabase `examples` table | `ExampleCard` component | 5 answer choices (A-E), correlated to lesson_id |
| Glossary term definitions | Supabase `lesson_term_definitions` table | `useTermTooltips` hook | MUST exist before using blue bold styling |

---

## COMPLETE HTML STRUCTURE

### CRITICAL FORMATTING RULES

**❌ NEVER:**
- Use long intro paragraphs (sentences over 25 words)
- Use color styling or indentation in intro paragraph (use simple `<p>` only)
- Use long paragraphs anywhere in lesson (40+ words)
- Use blue underlined bold for emphasis or random words
- Fix the number of H3 sections (it depends on the lesson content)
- Include mastery quizzes in math lessons
- Add custom boxes, gradients, or special formatting
- Use fewer than EXACTLY 4 key takeaways
- **Wrap Key Takeaways in a colored div/box** ⚠️
- **Use `<ul>` with visible bullet points in Key Takeaways** ⚠️
- **Use a transparent div for the hidden separator** ⚠️

**✅ ALWAYS:**
- **Keep intro paragraph SHORT: 2-3 sentences under 25 words each** ✓
- **Use simple `<p>` styling for intro (no color, no extra margin)** ✓
- Use bullet points with 2-3 indent levels throughout
- Use blue underlined bold ONLY for terms in lesson_term_definitions table
- Use EXACTLY 4 key takeaways (no more, no less)
- Create as many H3 sections as needed for the concepts (typically 2-5)
- Position examples AFTER teaching new concepts
- Use 5 answer choices (A-E) for all math examples
- **Use hidden H3 element for separator before Key Takeaways** ✓
- **Use `list-style: none` in Key Takeaways to hide bullets** ✓
- **Put checkmarks in separate `<span>` elements** ✓

### ⚠️ CRITICAL: HTML Structure Requirements

**BEFORE YOU START - YOU MUST:**
1. **Include HTML comments at the top** (Topic number and template version)
2. **Use blue glossary terms** with the exact style string for textbook definitions
3. **Use proper nested `<ul>` structure** with specific margins (0.3rem outer, 0.2rem inner)
4. **NEVER wrap content in a `<div>` container**
5. **Follow exactly the same structure as restructured-math-3.4-v1.html** (reference chapter)

**Reference Chapter:** `/Users/cadenchiang/Desktop/act-prep-react/restructured-math-3.4-v1.html`

When in doubt about formatting, **READ THE REFERENCE CHAPTER** and match its structure exactly.

---

### EXACT Template (Copy-Paste This!)

```html
<!-- Topic X.X: [Topic Name] -->
<!-- Restructured using Golden Template v5.2 -->

<!--
LESSON TEMPLATE v5.0 - MATH
Subject: Math
Topic Number: [e.g., 1.1, 2.3, 5.2]
Topic: [Specific Topic Name]
Lesson Key: [e.g., backsolving]
-->

<!-- ========================================
     SECTION 1: OPENING (2-3 SENTENCES MAX)
     CRITICAL: Must have:
     - MAXIMUM 2-3 SHORT sentences (under 25 words each)
     - Brief context about the topic
     - NO indentation, NO color styling
     - NO blue underlined glossary terms here
     - Use simple paragraph style ONLY
     ======================================== -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[First sentence: What is this topic?] [Second sentence: Why does it matter on the ACT?] [Optional third sentence: What will this lesson cover?]
</p>

<!-- ========================================
     SECTION 2: CONTENT (FLEXIBLE H3 SECTIONS)
     Number of H3 sections depends on concepts (typically 2-5)
     Use BULLET POINTS with indents, NOT paragraphs
     ======================================== -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. First Major Concept
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Main point about this concept using <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">glossary term</strong> if term exists in database
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sub-point with more detail or example</li>
      <li style="margin: 0.2rem 0;">Another sub-point
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Third-level detail when needed (use sparingly)</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Second main point for this concept
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Supporting detail or formula</li>
      <li style="margin: 0.2rem 0;">Another supporting detail</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
When to Use Backsolving
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Key point about this subsection
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Detail, example, or formula</li>
      <li style="margin: 0.2rem 0;">Another detail</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Another key point with formula: y = mx + b</li>
</ul>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], shown AFTER teaching concept -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Second Major Concept
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Introduction to this concept
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Key point</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 1
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What to do in step 1
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Detail about step 1</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 2
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What to do in step 2
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Detail about step 2</li>
    </ul>
  </li>
</ul>

<!-- Example 2 after H3 #2 -->

<!-- Repeat for H3 sections 3, 4, 5 as needed -->
<!-- Example 3 after H3 #3 (if exists) -->
<!-- Example 4 after H3 #4 (if exists) -->
<!-- Example 5 after H3 #5 (if exists) -->

<!-- ========================================
     SECTION 3: HIDDEN SEPARATOR
     CRITICAL: Parser needs this!
     ⚠️  WARNING: Must be an H3 element, NOT a div!
     ======================================== -->

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<!-- ========================================
     SECTION 4: KEY TAKEAWAYS
     EXACTLY 4 ITEMS - NO MORE, NO LESS

     ⚠️  CRITICAL FORMATTING RULES:
     1. NO background boxes or borders (no div wrapper)
     2. H3 heading must be GREEN (#2e7d32), NOT in a box
     3. Use list-style: none (NO bullet points)
     4. Each <li> must be GREEN (#2e7d32)
     5. Checkmark (✓) in separate <span> with bright green (#4caf50)
     6. NEVER use <ul> with default bullets
     7. NEVER wrap in a colored div/box
     ======================================== -->

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>First key takeaway (concise, actionable, covers main point of lesson)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Second key takeaway (strategic advice or when to use)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Third key takeaway (common scenarios or applications)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Fourth key takeaway (when NOT to use or pitfalls to avoid)
  </li>
  <!-- EXACTLY 4 - NO MORE, NO LESS -->
</ul>

<!-- NO MASTERY QUIZ IN MATH LESSONS -->
```

---

## COMMON MISTAKES TO AVOID

### ❌ MISTAKE #0: Missing HTML Comments or Wrong Structure
**WRONG:**
```html
<!-- ❌ DON'T skip the required HTML comments -->
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Functions are important...
</p>
```

**WRONG:**
```html
<!-- ❌ DON'T wrap content in a div -->
<div class="lesson-content">
  <p>Functions are important...</p>
  <h3>1. Basic Concepts</h3>
</div>
```

**RIGHT:**
```html
<!-- ✓ Always include these two HTML comments at the very top -->
<!-- Topic 4.3: Functions -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
A function is a mathematical relationship where each input produces exactly one output...
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Function Basics and Evaluation
</h3>
```

**WHY:** The HTML comments identify the topic and template version. NO wrapper divs - content should be direct HTML elements.

### ❌ MISTAKE #0.5: Not Using Blue Glossary Terms for Textbook Definitions
**WRONG:**
```html
<!-- ❌ DON'T use regular bold for textbook definitions -->
<li>The <strong>mean</strong> is the average of all values</li>
<li>A <strong>composite function</strong> is a function inside another function</li>
```

**RIGHT:**
```html
<!-- ✓ Use blue underlined bold for glossary terms with database entries -->
<li>The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">mean</strong> is the average of all values</li>
<li>A <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">composite function</strong> is a function inside another function</li>
```

**WHY:** Glossary terms must use the exact blue style string so the tooltip system can identify and display hover definitions. Regular bold won't trigger tooltips.

### ❌ MISTAKE #0.75: Wrong Nested Bullet Structure
**WRONG:**
```html
<!-- ❌ DON'T use inconsistent or missing margins -->
<ul>
  <li>Main point
    <ul>
      <li>Sub-point</li>
    </ul>
  </li>
</ul>
```

**RIGHT:**
```html
<!-- ✓ Use exact margin values for each level -->
<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Main point
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sub-point
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Third-level detail</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

**WHY:** Consistent margins create proper visual hierarchy. Level 1: 0.3rem, Level 2: 0.2rem, Level 3: 0.15rem.

### ❌ MISTAKE #1: Intro Paragraph Too Long or Styled Wrong
**WRONG:**
```html
<!-- ❌ DON'T use long sentences, indentation, or color styling -->
<p style="margin: 1.5rem 0; line-height: 1.7; color: #374151;">
A system of equations is a set of two equations with the same unknowns that must be solved simultaneously. The ACT frequently hides systems questions in word problems about tickets, prices, or quantities. This lesson covers the two main solving methods (elimination and substitution), translating word problems into equations, and the powerful backsolve strategy for complex problems with 3+ unknowns.
</p>
```

**RIGHT:**
```html
<!-- ✓ Short sentences (under 25 words each), simple styling, no color -->
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
A system of equations is a set of two equations with the same unknowns. The ACT frequently hides systems questions in word problems about tickets, prices, or quantities. This lesson covers elimination, substitution, and the powerful backsolve strategy for complex problems.
</p>
```

**WHY:** Long sentences (40+ words) are hard to read. The intro should be SHORT and punchy—just context, no teaching yet.

### ❌ MISTAKE #2: Wrong Key Takeaways Format
**WRONG:**
```html
<!-- ❌ DON'T wrap in a colored div/box -->
<div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 1.5rem;">
  <h3>Key Takeaways</h3>
  <ul style="padding-left: 1.5rem;">
    <li>✓ First takeaway</li>
  </ul>
</div>
```

**RIGHT:**
```html
<!-- ✓ Green H3, no box, list-style: none, checkmark in span -->
<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>First takeaway
  </li>
</ul>
```

### ❌ MISTAKE #2: Wrong Hidden Separator Format
**WRONG:**
```html
<!-- ❌ DON'T use a transparent div -->
<div style="height: 1px; background: transparent; margin: 3rem 0;"></div>
```

**RIGHT:**
```html
<!-- ✓ Use hidden H3 element -->
<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>
```

### ❌ MISTAKE #3: Visible Bullet Points in Key Takeaways
**WRONG:**
```html
<!-- ❌ Default bullets will show -->
<ul style="padding-left: 1.5rem;">
  <li>✓ Takeaway with visible bullet point</li>
</ul>
```

**RIGHT:**
```html
<!-- ✓ list-style: none removes bullets -->
<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="color: #2e7d32;">
    <span style="color: #4caf50;">✓</span>Takeaway with no bullet
  </li>
</ul>
```

---

## COMPONENT STYLING STANDARDS

### Typography

**ALL text in math lessons MUST use:**
```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
font-size: 16px; /* Body text and bullet points */
font-size: 17px; /* Math problems and answer choices */
line-height: 1.7; /* Body text and bullets */
line-height: 1.6; /* Math problems */
color: #1f2937; /* Primary text */
```

**Headers:**
```html
<!-- H2: Lesson Title (auto-generated, not in HTML) -->
<h2 style="font-size: 1.875rem; font-weight: 700; color: #111827;">

<!-- H3: Major Sections (flexible number: typically 2-5, NUMBERED) -->
<!-- Example: "1. What Is Backsolving?" -->
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Major Concept Title
</h3>

<!-- H4: Subsections (0-4 per H3, BOLD but NOT numbered, NOT underlined) -->
<!-- Example: "When to Use Backsolving" or "Step 1" -->
<!-- Use for organizational headers within H3 sections -->
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600; font-size: 16px;">
Subsection Title
</h4>
```

**CRITICAL H4 Rules:**
- ✅ **Bold** (font-weight: 600)
- ❌ **NOT numbered** (no "1. Step One")
- ❌ **NOT underlined**
- ✅ **Descriptive** ("When to Use", "Step 1", "Key Advantages")
- Use for steps, categories, sub-topics within an H3 section

**Glossary Terms (ONLY FOR TEXTBOOK DEFINITIONS):**
```html
<!-- ✅ CORRECT: Term exists in lesson_term_definitions table -->
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">backsolving</strong>

<!-- ❌ WRONG: Using for emphasis without database entry -->
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">very important</strong>

<!-- ✅ CORRECT: Use regular bold for emphasis -->
This is <strong>important</strong> (regular bold, no blue/underline)
```

**Bullet Points (PRIMARY CONTENT FORMAT):**
```html
<!-- Level 1: Main point -->
<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Main point
    <!-- Level 2: Supporting detail -->
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sub-point or detail
        <!-- Level 3: Specific example (use sparingly) -->
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Specific detail or example</li>
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
margin: 0.3rem 0;      /* Level 1 bullet */
margin: 0.2rem 0;      /* Level 2 bullet */
margin: 0.15rem 0;     /* Level 3 bullet */

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

/* Example Red */
#dc2626  /* Answer text */
#b91c1c  /* Example border */

/* Success/Error (in ExampleCard) */
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
  title TEXT NOT NULL,              -- e.g., 'Topic 1.1 - Working Backwards Strategy'
  subject TEXT,                     -- Always 'math' for math lessons
  category TEXT,                    -- e.g., 'Test-Taking Strategies'
  content TEXT,                     -- The HTML content
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EXAMPLES (Working Examples - Math has 5 answer choices)
-- ⚠️ CRITICAL: Table name is 'lesson_examples', NOT 'examples'
CREATE TABLE lesson_examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,        -- 1, 2, 3, etc. (position after H3 sections)
  title TEXT NOT NULL,              -- e.g., 'Basic Backsolving with Radicals'
  problem_text TEXT NOT NULL,       -- The math problem statement
  choices JSONB,                    -- [{"letter": "A", "text": "2"}, ..., {"letter": "E", "text": "22"}] - ALWAYS 5 choices for math
  correct_answer TEXT,              -- e.g., 'B'
  solution_steps JSONB NOT NULL,    -- [{"step": 1, "text": "..."}, ...]
  answer_explanation TEXT,          -- Why this answer is correct
  diagram_svg TEXT,                 -- Optional SVG diagram
  is_worked_example BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lesson_id, position)
);

-- 3. GLOSSARY TERMS (Hover definitions - REQUIRED for blue underlined bold)
CREATE TABLE lesson_term_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL,               -- Exact text that appears in lessons (case-sensitive)
  definition TEXT NOT NULL,         -- Hover tooltip definition
  lesson_key TEXT,                  -- Which lesson introduces this term
  context TEXT,                     -- Additional context (optional)
  related_terms JSONB,              -- Array of related term names (optional)
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## EXAMPLES SYSTEM (MATH-SPECIFIC)

### Math Example Requirements

**CRITICAL DIFFERENCES FROM OTHER SUBJECTS:**
- Math examples ALWAYS have 5 answer choices (A, B, C, D, E)
- English/Reading/Science have 4 answer choices (F, G, H, J OR A, B, C, D)
- Math problems often include formulas, equations, and mathematical notation
- Solution steps should show mathematical work clearly

### ⚠️ CRITICAL: Example Relevance Rule

**Each example MUST be directly relevant to the section immediately above it.**

**Positioning Strategy:**
- **Position 1**: Example appears AFTER first major concept section (H3 #1 or #2)
  - Must demonstrate the core concept or strategy taught in that section
  - Should be the simplest, most straightforward application
- **Position 2**: Example appears AFTER second concept section
  - Must illustrate a specific use case or scenario from that section
  - Should show variation or complexity from Example 1
- **Position 3**: Example appears AFTER third concept section
  - Must demonstrate a specific problem type or application discussed above
  - Should be the most advanced or integrate multiple concepts

**Examples of Good Relevance:**

✅ **GOOD - Direct Connection:**
```
Section: "The 4-Step Substitution Process"
  - Explains: Pick numbers, write them down, solve, test choices
  ↓
Example 1: "Variable Expression with Percents"
  - Demonstrates all 4 steps using n=2, m=5
  - Shows exactly how to apply the process
```

✅ **GOOD - Specific Application:**
```
Section: "Common Question Types for Substitution"
  - Lists: Percent problems, geometry transformations, trigonometry
  ↓
Example 3: "Geometry Transformation"
  - Demonstrates substitution on rectangle area problem
  - Direct application of a type mentioned above
```

❌ **BAD - No Connection:**
```
Section: "When to Use Backsolving"
  - Discusses numerical answer choices, messy algebra
  ↓
Example: "Trigonometry Identity" ❌
  - Uses completely different strategy (not mentioned)
  - Student confused: "Why this example here?"
```

**Quality Checklist for Each Example:**
- [ ] Example topic is mentioned or discussed in section directly above
- [ ] Example demonstrates a concept, strategy, or problem type from that section
- [ ] Student can clearly see WHY this example appears at this position
- [ ] Example difficulty matches section content (easier concepts → easier examples)
- [ ] If section has multiple topics, example covers the MOST IMPORTANT one

### Example Component: ExampleCard.jsx (Modal Display)

**Examples appear in a modal popup, NOT inline:**
- Button displays in lesson: "Try an Example" (subtle, transparent style)
- Clicking opens centered modal with blurred backdrop
- Modal uses React Portal to render at document.body level
- X button in top-right corner of screen (subtle, outside modal)
- User must manually close modal (no auto-close)
- Modal stays open until user clicks X or backdrop

**Button Styling (Important - Keep Subtle):**
```javascript
// Subtle button that blends with lesson content
backgroundColor: 'transparent',
color: '#6b7280',
padding: '0.5rem 1rem',
fontSize: '0.875rem',
border: '1px solid #d1d5db',
// Hover: slight background tint, darker border
```

**Modal Positioning:**
```javascript
// X button: Fixed to top-right of viewport
position: 'fixed',
top: '2rem',
right: '2rem',
zIndex: 10000,
backgroundColor: 'rgba(255, 255, 255, 0.9)',
color: '#9ca3af'  // Subtle gray

// Modal content: Centered with flexbox
position: 'fixed',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
zIndex: 9999
```

**ExampleCard Rendering (Inside Modal):**
- 5 circular letter indicators (A, B, C, D, E)
- Interactive answer selection
- Green highlight for correct, red for incorrect
- Bold red "Answer: X" display
- Gray "SOLUTION" header
- Solution steps OR answer explanation (supports both formats)
- **NO gray box** - clean, minimal styling
- Red left border on title for visual separation

**Solution Formatting (Enhanced Readability):**
- **Bold numbers**: All numeric values are bold (2, 5, 10, 0.7, etc.)
- **Bold answer choices**: A., B., C., D., E. are bold when followed by period
- **Bold key terms**: "Total:", "Step 1:", "Note:", "Therefore:", "Result:" are bold
- **Extra spacing**: 1.5rem between paragraphs, 0.75rem between lines
- **Line height**: 1.8 for better readability
- **Indented calculations**: Math equations with = × ÷ + - are indented 1rem
- **Larger calc text**: Calculations are 1.05rem (slightly larger than body)
- **Color coding**: Feedback lines with ✓✗ are gray (#6b7280)

**Example Solution Text Auto-Formatting:**
```javascript
// Input:
"Let's say Jeremy has 2 boxes (n = 2) and each box contains 5 bars (m = 5).
Total candy bars: 2 × 5 = 10 bars.
A. 0.7(m + n) = 0.7(5 + 2) = 0.7(7) = 4.9 ✗"

// Rendered with formatting:
"Let's say Jeremy has **2** boxes (n = **2**) and each box contains **5** bars (m = **5**).
**Total:** candy bars: **2** × **5** = **10** bars.
**A.** **0.7**(m + n) = **0.7**(**5** + **2**) = **0.7**(**7**) = **4.9** ✗"
```

### ⚠️ CRITICAL: Common Issues & Solutions

**Issue 1: Modal Not Appearing in Center of Screen**
- ❌ **Problem**: Modal renders within section container, appears near button
- ✅ **Solution**: Use `ReactDOM.createPortal(modalContent, document.body)` to render at body level
- **Why**: Portal breaks modal out of parent container constraints

**Issue 2: Modal Auto-Closes After Showing Solution**
- ❌ **Problem**: `useEffect` calls `onComplete()` automatically when solution appears
- ✅ **Solution**: Remove auto-complete logic from ExampleCard, only close on user action
- **Code to Remove**:
```javascript
// DON'T DO THIS:
useEffect(() => {
  if (showSolution && onComplete) {
    setTimeout(() => onComplete(), 100);  // ❌ Causes glitching
  }
}, [showSolution, onComplete]);
```

**Issue 3: Solution Text Hard to Follow**
- ❌ **Problem**: Plain text, no formatting, hard to scan
- ✅ **Solution**: Use `formatSolutionText()` function to auto-format with bold numbers, spacing
- **Implementation**: See ExampleCard.jsx lines 15-60

**Issue 4: Button Too Bold/Prominent**
- ❌ **Problem**: Solid background colors distract from lesson content
- ✅ **Solution**: Use transparent background, subtle borders, minimal styling
- **Colors**: Gray text (#6b7280), light border (#d1d5db), no background

**Issue 5: Glossary Terms Not Working**
- ❌ **Problem**: Terms in HTML don't match database (missing terms, wrong case)
- ✅ **Solution**:
  1. Use case-insensitive matching (already implemented)
  2. Create ALL terms used in lesson HTML
  3. Run verification script to check mismatches
- **Script**: `scripts/check-[lesson]-terms.mjs`

**Issue 6: Examples Not Showing for All Positions**
- ❌ **Problem**: Button only shows for `index === currentSection`
- ✅ **Solution**: Use `index <= currentSection` to show for current AND past sections
- **Allows**: Users to review completed examples

### Creating Math Examples in Supabase

**Step 1: Create Example Script**

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'YOUR_SERVICE_ROLE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createMathExamples() {
  // 1. Get lesson UUID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'backsolving')
    .single();

  // 2. Create examples - MATH ALWAYS HAS 5 CHOICES (A-E)
  const examples = [
    {
      lesson_id: lesson.id,
      position: 1,
      title: 'Basic Backsolving with Radicals',
      problem_text: 'If √(x + 10) − 2√(x − 2) = 0, what is the value of x?',
      choices: [
        { letter: 'A', text: '2' },
        { letter: 'B', text: '6' },
        { letter: 'C', text: '14' },
        { letter: 'D', text: '18' },
        { letter: 'E', text: '22' }  // ALWAYS 5 choices for math
      ],
      correct_answer: 'B',
      solution_steps: [
        { step: 1, text: 'Start with middle value C (14): √24 − 2√12 ≈ 4.9 − 6.9 ≠ 0 (too negative, need smaller x)' },
        { step: 2, text: 'Try B (6): √16 − 2√4 = 4 − 2(2) = 4 − 4 = 0 ✓' },
        { step: 3, text: 'B satisfies the equation, so x = 6' }
      ],
      answer_explanation: 'Starting with the middle value lets us eliminate multiple choices. When B works, we\'re done—no need to test other values.',
      is_worked_example: true
    }
    // Add more examples for positions 2, 3, 4, etc.
  ];

  for (const example of examples) {
    // ⚠️ CRITICAL: Table name is 'lesson_examples', NOT 'examples'
    const { error } = await supabase
      .from('lesson_examples')
      .insert(example);

    if (error) {
      console.error(`Failed: ${example.title}:`, error);
    } else {
      console.log(`✅ Created: ${example.title}`);
    }
  }
}

createMathExamples();
```

### Example Positioning Rules

**Examples appear AFTER teaching the concept:**
- `position: 1` → After H3 #1
- `position: 2` → After H3 #2
- `position: 3` → After H3 #3
- `position: 4` → After H3 #4
- etc.

**The ProgressiveLessonRenderer automatically places examples based on H3 count.**

---

## GLOSSARY TERMS SYSTEM

### Creating Glossary Terms for Math

**Step 1: Create Glossary Script**

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'YOUR_SERVICE_ROLE_KEY'
);

async function createGlossaryTerms() {
  const terms = [
    {
      term: 'backsolving',
      definition: 'A problem-solving strategy where you test answer choices by plugging them into the problem conditions instead of solving algebraically.',
      lesson_key: 'backsolving'
    },
    {
      term: 'quadratic formula',
      definition: 'The formula x = (−b ± √(b² − 4ac)) / 2a used to solve quadratic equations of the form ax² + bx + c = 0.',
      lesson_key: 'quadratics'
    }
  ];

  for (const term of terms) {
    // Check if exists
    const { data: existing } = await supabase
      .from('lesson_term_definitions')
      .select('*')
      .eq('term', term.term)
      .single();

    if (existing) {
      console.log(`⏭️  Already exists: ${term.term}`);
      continue;
    }

    // Insert new term
    const { error } = await supabase
      .from('lesson_term_definitions')
      .insert(term);

    if (error) {
      console.error(`❌ Failed: ${term.term}:`, error);
    } else {
      console.log(`✅ Created: ${term.term}`);
    }
  }
}

createGlossaryTerms();
```

### Glossary Term Usage Rules & Filter

**THE FILTER: What Gets Blue Underlined Bold?**

Use this checklist to determine if a term should be a glossary term:

1. **Can you define it with a textbook definition?** (Not just describe it)
2. **Is it a specific mathematical concept, strategy, or problem type?**
3. **Would a student benefit from a hover definition?**
4. **Does it appear in the lesson and have educational value?**

If you answer YES to all 4 questions, create a glossary term and use blue underlined bold.

---

**✅ ALWAYS USE for:**

**Math Problem Types:**
- radical equations, quadratic equations, linear equations
- systems of equations
- word problems
- absolute value problems
- exponential equations

**Math Strategies & Methods:**
- backsolving, substitution method, elimination method
- factoring, completing the square
- working backwards
- FOIL method, distributive property

**Mathematical Concepts:**
- slope-intercept form, point-slope form
- quadratic formula, distance formula
- coefficient, variable, constant
- domain, range
- perpendicular, parallel

**Test-Taking Terms:**
- answer choices (ACT-specific)
- middle value strategy
- systematic elimination

---

**❌ NEVER USE for:**

**Common Math Words:**
- equation, number, solve, calculate
- add, subtract, multiply, divide
- formula (unless specific like "quadratic formula")
- graph, plot, draw

**Emphasis Words:**
- important, critical, essential
- always, never, must
- remember, note, careful

**Descriptive Phrases:**
- key strategy, main idea
- best approach, useful technique
- important concept

**Generic Terms:**
- problem, question, test
- step, process, method (generic)
- answer, solution, result

---

**QUANTITY GUIDELINE:**
- **Minimum:** 5-8 glossary terms per lesson (was 3-6, now increased)
- **Maximum:** 12-15 glossary terms per lesson
- **Sweet Spot:** 8-10 glossary terms

**WHY MORE TERMS?**
- Students benefit from hover definitions
- Helps reinforce mathematical vocabulary
- Creates consistency across lessons
- Makes content more educational

---

### ⚠️ CRITICAL: Case Sensitivity & Capitalization Rules

**Database Terms: ALWAYS LOWERCASE**
- Store all glossary terms in lowercase in the database
- Examples: `"backsolving"`, `"radical equations"`, `"answer choices"`
- **Never**: `"Backsolving"`, `"Radical Equations"`, `"Answer Choices"`

**HTML Usage: Follow Grammar Rules**
- ✅ **Capitalize at sentence start**: `<strong>Backsolving</strong> means...`
- ✅ **Capitalize at list item start**: `<li><strong>Answer choices</strong> are...`
- ✅ **Lowercase mid-sentence**: `Use <strong>backsolving</strong> when...`
- ✅ **Lowercase after colon**: `Perfect for: <strong>radical equations</strong>`

**Why This Works:**
The tooltip system uses **case-insensitive matching**, so:
- Database: `"backsolving"` (lowercase)
- HTML: `"Backsolving"` OR `"backsolving"` (either works!)
- Tooltip: ✅ Shows correctly for both

**Examples of Proper Usage:**

```html
<!-- ✅ CORRECT: Sentence start = Capitalize -->
<li><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Backsolving</strong> means plugging answer choices into the problem.</li>

<!-- ✅ CORRECT: Mid-sentence = Lowercase -->
<li>Use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">backsolving</strong> when algebra is complex.</li>

<!-- ✅ CORRECT: After colon = Lowercase -->
<li>Perfect scenarios: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">radical equations</strong></li>

<!-- ❌ WRONG: Lowercase at sentence start -->
<li><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">backsolving</strong> means plugging answer choices...</li>

<!-- ❌ WRONG: Capitalized mid-sentence (unless proper noun) -->
<li>Use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Backsolving</strong> when algebra is complex.</li>
```

**Quick Capitalization Checklist:**
- [ ] All database terms are lowercase (`lesson_term_definitions` table)
- [ ] HTML terms at sentence/list start are capitalized
- [ ] HTML terms mid-sentence are lowercase
- [ ] Grammar rules are followed (not just "always lowercase")

---

**EXAMPLES FROM MATH 1.1 (Backsolving):**

✅ **USE these terms:**
- backsolving (strategy name)
- working backwards (strategy name)
- middle value strategy (test-taking strategy)
- radical equations (problem type)
- systems of equations (problem type)
- word problems (problem type)
- algebraic expressions (mathematical concept)
- answer choices (ACT-specific term)
- systematic elimination (problem-solving method)

❌ **DON'T USE these:**
- "important" (emphasis word)
- "equation" by itself (too common)
- "solve" (common verb)
- "strategy" (too generic)
- "problem" (too generic)

---

## MATHEMATICAL NOTATION

### Formula Formatting

**For inline formulas:**
```html
<li>Use the quadratic formula: x = (−b ± √(b² − 4ac)) / 2a</li>
<li>The slope formula is m = (y₂ − y₁) / (x₂ − x₁)</li>
```

**For emphasized formulas:**
```html
<li style="margin: 0.3rem 0;"><strong>Formula: A = πr²</strong>
  <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
    <li style="margin: 0.2rem 0;">A = area</li>
    <li style="margin: 0.2rem 0;">r = radius</li>
  </ul>
</li>
```

### Special Characters

Use Unicode for mathematical symbols:
- √ (square root): `√x`
- π (pi): `π`
- ² (squared): `x²`
- ³ (cubed): `x³`
- ± (plus-minus): `±`
- ≈ (approximately): `≈`
- ≠ (not equal): `≠`
- ≤ (less than or equal): `≤`
- ≥ (greater than or equal): `≥`
- ∞ (infinity): `∞`
- ° (degree): `45°`

### Calculator Notes

**When to mention calculator:**
```html
<li style="margin: 0.3rem 0;">Calculator tip: Use parentheses when entering fractions
  <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
    <li style="margin: 0.2rem 0;">Enter (3/4) + (2/5) not 3/4+2/5</li>
  </ul>
</li>
```

**When calculator isn't needed:**
```html
<li style="margin: 0.3rem 0;">No calculator needed—recognize the pattern
  <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
    <li style="margin: 0.2rem 0;">2⁴ = 16 and 4² = 16, so they're equal</li>
  </ul>
</li>
```

---

## WORKFLOW & SCRIPTS

### ⚠️ CRITICAL: Database Upload Authentication

**ALWAYS use SERVICE_ROLE_KEY for uploads, NEVER use ANON_KEY!**

The anon key does NOT have UPDATE permissions due to Row Level Security (RLS) policies. Using the anon key will result in silent failures where the upload appears to succeed but the database content is NOT updated.

**Correct Supabase Client Setup for Uploads:**

```javascript
import { createClient } from '@supabase/supabase-js';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// ❌ WRONG - Anon key will fail silently on UPDATE
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);
```

**How to Verify Upload Success:**

Always check the returned data to confirm the update worked:

```javascript
const { data, error } = await supabase
  .from('lessons')
  .update({ content: content, updated_at: new Date().toISOString() })
  .eq('lesson_key', '3.2')
  .select();  // ← IMPORTANT: Add .select() to get returned data

if (error) {
  console.error('ERROR:', error);
} else if (!data || data.length === 0) {
  console.error('⚠️ WARNING: Update returned 0 rows - RLS policy may be blocking!');
  console.error('Make sure you are using SERVICE_ROLE_KEY, not ANON_KEY!');
} else {
  console.log('✓ Successfully updated', data.length, 'row(s)');
  console.log('✓ New content length:', data[0].content.length);
}
```

### Full Math Lesson Creation Workflow

```bash
# 1. Create glossary terms FIRST (3-6 terms max)
touch scripts/create-glossary-1.1.mjs
node scripts/create-glossary-1.1.mjs

# 2. Create lesson HTML file with bullet points
touch docs/LESSON_1_1_BACKSOLVING.html
# ... write content following template ...
# ... use as many H3 sections as needed (typically 2-5) ...
# ... NO mastery quiz section ...

# 3. Create upload script (MUST USE SERVICE_ROLE_KEY!)
touch scripts/upload-lesson-1.1.mjs
# ⚠️ CRITICAL: Verify script uses SERVICE_ROLE_KEY, not ANON_KEY
node scripts/upload-lesson-1.1.mjs

# 4. Create working examples (with 5 answer choices A-E)
touch scripts/create-examples-1.1.mjs
node scripts/create-examples-1.1.mjs

# 5. Update lessonStructure.js
# Add entry with chapterNum: '1.1'

# 6. Verify upload in database
# Run a check script to confirm content was actually updated
# Check that content length matches what you uploaded

# 7. Test in browser
npm start
# Navigate to lesson, verify everything displays correctly
# If you see raw/corrupted text, the upload failed (check SERVICE_ROLE_KEY)
```

---

## QUALITY CHECKLIST

### Before Marking a Math Lesson Complete

**HTML Content:**
- [ ] Opening: EXACTLY 2 sentences with ACT context
- [ ] Flexible H3 sections based on concepts (typically 2-5, NOT fixed at 4)
- [ ] Each H3 uses bullet points with 2-3 indent levels (NO paragraphs except intro)
- [ ] Each H3 has 0-4 H4 subsections (only when needed)
- [ ] ALL blue underlined bold terms exist in `lesson_term_definitions` table
- [ ] Only 3-6 glossary terms used total (sparse usage)
- [ ] NO blue underlined bold for emphasis or common words
- [ ] Hidden H3 separator before Key Takeaways
- [ ] Key Takeaways: EXACTLY 4 bullet points
- [ ] NO mastery quiz section (math lessons don't have them)

**Math-Specific:**
- [ ] Formulas are clearly formatted with proper notation
- [ ] Calculator tips included where relevant
- [ ] Mathematical symbols use Unicode characters
- [ ] All examples have 5 answer choices (A-E)
- [ ] Examples show mathematical work in solution steps

**Glossary Terms:**
- [ ] All glossary terms created in Supabase BEFORE writing lesson
- [ ] Each term has clear textbook definition
- [ ] Terms used sparingly (3-6 max per lesson)
- [ ] Hover tooltips work in UI
- [ ] No blue underlined bold without database entry

**Examples:**
- [ ] Examples in Supabase `examples` table for this lesson
- [ ] Each example has 5 choices (A-E) - Math requirement
- [ ] Each example has clear title
- [ ] Problem text uses proper mathematical notation
- [ ] 3-4 solution steps showing work
- [ ] Answer explanation provided
- [ ] Examples display correctly with ExampleCard component
- [ ] Examples positioned AFTER teaching concepts

**Database & Structure:**
- [ ] Lesson has proper title with topic number (e.g., "Topic 1.1 - ...")
- [ ] Lesson `lesson_key` matches `id` in `lessonStructure.js`
- [ ] `lessonStructure.js` has `chapterNum: '1.1'` entry
- [ ] Upload script uses SERVICE_ROLE_KEY (not ANON_KEY)
- [ ] Upload script uses `.select()` to verify update succeeded
- [ ] Database content length matches HTML file length
- [ ] Lesson loads correctly in UI (not showing raw/corrupted text)
- [ ] All examples appear after correct H3 sections
- [ ] All glossary terms show hover tooltips

---

## COMMON MISTAKES & FIXES

### ❌ MISTAKE: Using ANON_KEY instead of SERVICE_ROLE_KEY for uploads
**SYMPTOMS:** Upload script says "success" but database content doesn't change. Students see raw/corrupted text.
**FIX:** ALWAYS use SERVICE_ROLE_KEY in upload scripts. Add `.select()` to verify update worked (should return 1 row, not 0).

### ❌ MISTAKE: Fixing H3 sections at exactly 4
**FIX:** Use as many H3 sections as needed for the concepts (typically 2-5). Don't force content into 4 sections.

### ❌ MISTAKE: Including mastery quiz
**FIX:** Math lessons do NOT have mastery quizzes. Remove any quiz sections from the HTML.

### ❌ MISTAKE: Using 4 answer choices like English/Reading
**FIX:** Math examples ALWAYS have 5 answer choices (A, B, C, D, E). English/Reading/Science use 4.

### ❌ MISTAKE: Too many glossary terms (10+ blue underlined words)
**FIX:** Use sparingly (3-6 max). Only textbook definitions should be glossary terms.

### ❌ MISTAKE: Long paragraphs instead of bullet points
**FIX:** Convert ALL content (except 2-sentence intro) to bullet points with 2-3 indent levels.

### ❌ MISTAKE: Wrong number of key takeaways (3, 5, or 6)
**FIX:** Must be EXACTLY 4. Add or remove to meet requirement.

### ❌ MISTAKE: Poor mathematical notation
**FIX:** Use Unicode symbols (√, π, ², etc.) and clear formula formatting.

---

## FINAL NOTES

This template represents the COMPLETE standard for all ACT **MATH** lessons specifically. English, Reading, and Science lessons have different requirements.

**Key Features of Math Template v5.0:**
- Flexible H3 sections (not fixed at 4)
- No mastery quizzes
- 5 answer choices (A-E) for examples
- Bullet points throughout (except 2-sentence intro)
- Sparse glossary term usage (3-6 max)
- EXACTLY 4 key takeaways
- Mathematical notation standards
- Calculator tips when relevant

**When in doubt, refer to this document. This is the source of truth for MATH lessons.**

**Reference Chapter for Formatting:** Always check `/Users/cadenchiang/Desktop/act-prep-react/restructured-math-3.4-v1.html` when unsure about structure. This is the gold standard example.

Last Updated: 2025-10-20
Version: 5.2 (Added explicit HTML structure requirements: HTML comments, blue glossary terms, proper nested bullets, no wrapper divs, reference chapter 3.4)
