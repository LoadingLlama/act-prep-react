# Gold Standard Lesson Format

This document defines the standard format for all ACT prep lessons, based on the **Math 2.1 - Understanding Angles & Lines** lesson.

## Overview

The gold standard lesson has been fully implemented with:
- ✅ 10 blue underlined key terms with definitions in Supabase
- ✅ 3 interactive examples embedded in content HTML
- ✅ 7-question practice quiz with explanations
- ✅ Clean, minimalist solution display (Photomath-style)

## 1. Lesson Content Structure

### HTML Structure

Lessons use HTML content stored in the `lessons` table `content` field. The content is parsed and rendered progressively.

### Main Sections (h3)

```html
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
  1. Section Title
</h3>
```

**Spacing:**
- `margin-top: 5rem` - Large space before each major section
- `margin-bottom: 0.75rem` - Small space after heading

### Subsections (h4)

```html
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
  <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">
    Subsection Title
  </strong>
</h4>
```

**Styling:**
- Blue color (`#2563eb`)
- Bold (600 weight)
- Underlined
- Font weight 400 on h4, 600 on strong

### Paragraphs

```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
  Paragraph text here.
</p>
```

**Styling:**
- Font size: 16px
- Line height: 1.7
- Margin: 0.5rem top, 1rem bottom

### Bullet Lists

```html
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Main point
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Nested point 1</li>
      <li>Nested point 2</li>
    </ul>
  </li>
</ul>
```

**Styling:**
- Tight margins (0.3rem top, 0.5rem bottom)
- Padding left: 1.5rem
- Line height: 1.5
- List items: 0.15rem vertical margin

## 2. Blue Underlined Key Terms

### In Content HTML

```html
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">
  term name
</strong>
```

**Must have:**
- Blue color: `#2563eb`
- Font weight: 600
- Text decoration: underline

### In Supabase `term_definitions` Table

Each blue underlined term MUST have a corresponding entry:

```javascript
{
  term: 'angle',
  definition: 'Formed when two rays share a common endpoint called the vertex',
  lesson_key: 'geometry-angles'
}
```

**Fields:**
- `term` - Exact match with content (case-sensitive)
- `definition` - Clear, concise explanation
- `lesson_key` - Links to lesson

**Tooltip behavior:**
- Hover shows definition
- Blue underline indicates term has definition

## 3. Interactive Examples

### Example Structure in Content HTML

Examples are **embedded directly in the lesson content**, not stored separately. They are detected and extracted by the `splitIntoTextSections` utility.

```html
<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">
  Example 1
</h4>

<p style="margin: 1rem 0 1rem 0; font-size: 19px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; font-weight: 500; color: #111827;">
  Problem text here. What is the answer?
</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span>A. Option 1</span><br>
<span>B. Option 2</span><br>
<span>C. Option 3</span><br>
<span>D. Option 4</span><br>
<span>E. Option 5</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li>Step 1: Explanation</li>
  <li>Step 2: Calculation</li>
  <li>Step 3: Result</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: C
</p>
```

### Example Header

```html
<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">
  Example 1
</h4>
```

**Styling:**
- Red left border: 4px solid `#b91c1c`
- Padding left: 0.75rem
- Black text color
- Bold (weight 700)
- Must include "Example" and number

### Problem Text

```html
<p style="margin: 1rem 0 1rem 0; font-size: 19px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; font-weight: 500; color: #111827;">
  Problem statement goes here.
</p>
```

**Styling:**
- Font size: **19px** (larger for emphasis)
- Font weight: 500 (medium)
- Color: #111827 (dark gray)
- Modern sans-serif font stack

### Answer Choices

```html
<p style="margin: 0.3rem 0 0.5rem 0;">
<span>A. First option</span><br>
<span>B. Second option</span><br>
<span>C. Third option</span><br>
<span>D. Fourth option</span><br>
<span>E. Fifth option</span>
</p>
```

**Format:**
- Each choice in a `<span>` tag
- Separated by `<br>` tags
- Letter followed by period and space
- All in single paragraph

### Solution Section

```html
<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li>Step 1 explanation</li>
  <li>Step 2 calculation</li>
  <li>Step 3 result</li>
</ul>
```

**Format:**
- Header: `<strong>Solution:</strong>`
- Steps in bullet list
- Compact spacing
- Clear, step-by-step breakdown

### Answer Display

```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: C
</p>
```

**Format:**
- Plain text paragraph
- "Answer: X" format
- Letter only (A-E)

## 4. PhotomathSolution Component

The `PhotomathSolution` component renders solutions with:

### Features
- ✅ Answer displayed at top in **bold red** (fontSize: 1.1rem, color: #dc2626)
- ✅ "SOLUTION" header in gray uppercase
- ✅ All steps visible at once (no step-by-step)
- ✅ Compact spacing (gap: 0.75rem between steps, 0.15rem for substeps)
- ✅ Consistent black text (17px, -apple-system font)
- ✅ Each line stays together (no unnecessary breaks)

### Typography
```javascript
stepMainText: {
  fontSize: '17px',
  lineHeight: '1.4',
  color: '#1f2937',
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontWeight: '400'
}
```

## 5. Interactive Quiz

### Quiz Structure

Quizzes use a **three-table structure** in Supabase:

1. **`quizzes` table** - Main quiz entry
2. **`quiz_questions` table** - Individual questions
3. **`quiz_options` table** - Answer choices for each question

### Creating a Quiz

```javascript
// 1. Create quiz
const quiz = {
  lesson_id: '<lesson-uuid>',
  title: 'Topic Practice',
  intro: 'Test your understanding.',
  quiz_type: 'practice', // or 'final'
  position: 999, // Position in lesson (999 = end)
  is_required: false
};

// 2. Create questions
const questions = [
  {
    quiz_id: '<quiz-uuid>',
    question_text: 'Question text here?',
    question_order: 0
  }
];

// 3. Create options
const options = [
  {
    question_id: '<question-uuid>',
    option_text: 'Option A text',
    option_order: 0,
    is_correct: true,
    explanation: 'Why this is correct'
  }
];
```

### Quiz Requirements

- **5-7 questions** per quiz
- Cover all key concepts from lesson
- Each question has **5 options** (A-E for consistency with ACT)
- Only **one correct answer** per question
- Explanation provided for correct answer
- Mix of difficulty levels

### Question Types

1. **Direct calculation** - "What is the complement of 42°?"
2. **Concept application** - "Which of these is an obtuse angle?"
3. **Multi-step problems** - "Two angles on a line are x° and (2x + 15)°..."
4. **Real-world application** - Problems with context

## 6. Key Takeaways Section

### Structure

```html
<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
  Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>
    Key point 1
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>
    Key point 2
  </li>
</ul>
```

**Styling:**
- Green heading: `#2e7d32`
- Green checkmarks: `✓` in `#4caf50`
- No bullet points (list-style: none)
- Summarize 4-6 main concepts

## 7. Complete Checklist for New Lessons

When creating or revamping a lesson:

### Content

- [ ] Opening paragraph introduces topic clearly
- [ ] 3-5 main sections (h3) with logical flow
- [ ] Multiple subsections (h4) breaking down concepts
- [ ] Bullet points for explanations (not paragraphs)
- [ ] 10-15 blue underlined key terms
- [ ] 3 interactive examples embedded in content
- [ ] Key Takeaways section at end

### Supabase Data

- [ ] All blue underlined terms have definitions in `term_definitions` table
- [ ] Quiz created in `quizzes` table
- [ ] 5-7 questions created in `quiz_questions` table
- [ ] All options created in `quiz_options` table (5 per question)
- [ ] Quiz positioned at end (position: 999)

### Quality Standards

- [ ] All examples have proper structure (h4, problem, choices, solution, answer)
- [ ] Solutions are step-by-step and clear
- [ ] Answer is always shown at end: "Answer: X"
- [ ] Quiz covers all major concepts
- [ ] Explanations provided for correct answers
- [ ] Typography and spacing match gold standard

## 8. Tools and Scripts

### Adding Term Definitions

```bash
node scripts/add-[lesson]-definitions.mjs
```

### Adding Quiz

```bash
node scripts/add-[lesson]-quiz.mjs
```

### Listing All Lessons

```bash
node scripts/list-all-lessons.mjs
```

### Fetching Gold Standard

```bash
node scripts/fetch-gold-standard.mjs
```

## 9. Important Notes

### Examples Are NOT in a Separate Table

- Examples are **embedded in lesson content HTML**
- They are detected by checking for `<h4>Example X</h4>` followed by `Solution:`
- The `splitIntoTextSections` utility extracts them automatically
- DO NOT create an `examples` table or field

### Term Tooltip System

- Terms must be styled with exact CSS in content: `color: #2563eb; font-weight: 600; text-decoration: underline`
- Term text must **exactly match** the `term` field in `term_definitions` table
- The `useTermTooltips` hook attaches tooltips to styled terms
- Case-sensitive matching

### Quiz Rendering

- Quizzes are fetched with nested select: `quiz_questions (*, quiz_options (*))`
- Position determines where quiz appears (999 = end of lesson)
- `quiz_type: 'practice'` for practice quizzes
- `is_required: false` for optional quizzes

### Solution Display

- PhotomathSolution component handles all solution rendering
- NO manual line separation needed
- Answer shown in bold red at top automatically
- Keep solutions as simple bullet lists in HTML

## 10. Common Mistakes to Avoid

❌ **DON'T:**
- Add `examples` field to lessons table
- Use `is_final` field in quizzes table (doesn't exist)
- Use `subject` field in term_definitions table (doesn't exist)
- Try to store questions array directly in quizzes table
- Break up solution lines manually (component handles it)
- Use ANON key for admin operations (use SERVICE_ROLE_KEY)

✅ **DO:**
- Embed examples in content HTML
- Use three-table structure for quizzes
- Use service role key for scripts
- Match term text exactly in definitions
- Keep solution HTML simple (bullets)
- Test lesson end-to-end in browser

---

**Gold Standard Reference:** `Math 2.1 - Understanding Angles & Lines`
**Lesson Key:** `geometry-angles`
**Lesson ID:** `32cbf6f8-bf7e-4dd8-955e-449814417fff`
