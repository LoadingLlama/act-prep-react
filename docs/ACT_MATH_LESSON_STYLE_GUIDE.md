# ACT Math Lessons - Comprehensive Style Guide
**Based on Topic 1.1 - Working Backwards Strategy**
**Version 1.0 - Complete Formatting Reference**

---

## TABLE OF CONTENTS
1. [Database Structure](#database-structure)
2. [Lesson Metadata Standards](#lesson-metadata-standards)
3. [HTML/CSS Formatting Standards](#htmlcss-formatting-standards)
4. [Content Structure](#content-structure)
5. [Typography & Text Styling](#typography--text-styling)
6. [Mathematical Notation](#mathematical-notation)
7. [Examples Format](#examples-format)
8. [Mastery Check Quiz Structure](#mastery-check-quiz-structure)
9. [ACT Relevance Standards](#act-relevance-standards)
10. [Complete Template](#complete-template)

---

## DATABASE STRUCTURE

### Tables Used:
1. **lesson_metadata** - Main lesson information
2. **lesson_sections** - Sections within a lesson
3. **section_content** - Content blocks within sections

### Relationships:
```
lesson_metadata (1) → (many) lesson_sections → (many) section_content
```

---

## LESSON METADATA STANDARDS

### Required Fields:
```javascript
{
  lesson_key: "backsolving",           // Unique identifier (kebab-case)
  title: "Topic 1.1 - Working Backwards Strategy",  // Display title with topic number
  subject: "math",                      // Always "math" for this project
  category: "Test-Taking Strategies",   // See category list below
  difficulty_level: 1,                  // 1-5 scale
  duration_minutes: 30,                 // Est. completion time (20-40 min)
  order_index: 10,                      // For sorting (10, 12, 21, 22, etc.)
  is_published: true                    // true/false
}
```

### Categories (7 Units):
- "Test-Taking Strategies" (Unit 1)
- "Geometry" (Unit 2)
- "Algebra Fundamentals" (Unit 3)
- "Advanced Algebra" (Unit 4)
- "Numbers & Operations" (Unit 5)
- "Statistics & Probability" (Unit 6)
- "Advanced Topics" (Unit 7)

### Order Index Convention:
- Unit 1: 10, 12
- Unit 2: 21, 22, 23, 24, 25
- Unit 3: 31, 32, 33, 34, 35, 36
- Unit 4: 41, 42, 43, 44, 45, 46
- Unit 5: 51, 52, 53, 54, 55, 56
- Unit 6: 61, 62, 63, 64
- Unit 7: 71, 72, 73, 74, 75, 76

---

## HTML/CSS FORMATTING STANDARDS

### 1. Paragraphs (Standard Body Text)
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
  Your text here...
</p>
```

**Key Attributes:**
- Font size: 16px
- Line height: 1.7
- Margin: 0.5rem top/bottom, 0 left/right, 1rem after

### 2. Main Section Headers (H3)
```html
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
  1. Section Title Here
</h3>
```

**Key Attributes:**
- Large top margin (5rem) for spacing
- Bottom margin: 0.75rem
- Font weight: 700 (bold)
- **Always numbered** (1., 2., 3., etc.)

### 3. Subsection Headers (H4 - Lightweight Style)
```html
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
  Step 1: Strategic Starting
</h4>
```

**Key Attributes:**
- Top margin: 2rem
- Bottom margin: 0.3rem
- Font weight: 400 (normal/light) - **NOT bold**
- Used for steps, sub-concepts

### 4. Example Headers (H4 - Bold with Left Border)
```html
<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">
  Example 1: Basic Backsolving
</h4>
```

**Key Attributes:**
- Red left border (#b91c1c, 4px)
- Padding left: 0.75rem
- Font weight: 700 (bold)
- Color: black (#000000)
- Always numbered (Example 1, Example 2, etc.)

### 5. Bulleted Lists
```html
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">List item text
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Nested item 1</li>
      <li>Nested item 2</li>
    </ul>
  </li>
</ul>
```

**Key Attributes:**
- Tight margins (0.3rem, 0.5rem)
- Padding left: 1.5rem
- Line height: 1.5
- Nested lists have reduced margins

### 6. Answer Choices (Times New Roman Font)
```html
<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 2</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 6</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 14</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 18</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 22</span>
</p>
```

**Key Attributes:**
- Times New Roman font family
- Each choice on separate line with `<br>`
- Use A/B/C/D/E for questions 1-30 on ACT
- Use F/G/H/J/K for questions 31-60 on ACT

### 7. Key Takeaways Section
```html
<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
  Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>
    First key takeaway point
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>
    Second key takeaway point
  </li>
</ul>
```

**Key Attributes:**
- Green color scheme (#2e7d32 for text, #4caf50 for checkmarks)
- List style: none (custom checkmarks)
- Font size: 16px
- 5-7 key takeaway points

### 8. Hidden Separator (for spacing)
```html
<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>
```

**Purpose:** Creates visual separation before Key Takeaways section

---

## TYPOGRAPHY & TEXT STYLING

### 1. Key Terms/Important Concepts
```html
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">
  term to highlight
</strong>
```

**When to Use:**
- First mention of important terms
- ACT-specific concepts
- Strategic insights

**Attributes:**
- Blue color: #2563eb
- Font weight: 600 (semi-bold)
- Text decoration: underline

### 2. Bold Text (Regular Emphasis)
```html
<strong>Regular bold text</strong>
```

**When to Use:**
- General emphasis
- Solution labels ("Solution:", "Answer:")
- Non-key-term highlights

### 3. Inline Mathematical Variables
```html
<em>x</em>, <em>y</em>, <em>n</em>
```

**Use `<em>` for:**
- Single variables
- Function names (f, g, h)

---

## MATHEMATICAL NOTATION

### 1. Superscripts (Exponents)
```html
x<sup>2</sup>
2<sup>n</sup>
(x + 1)<sup>3</sup>
```

### 2. Subscripts
```html
a<sub>1</sub>
x<sub>n</sub>
log<sub>b</sub>(x)
```

### 3. Fractions (Inline)
```html
<sup>3</sup>⁄<sub>4</sub>
```

Or use Unicode: ¼ ½ ¾

### 4. Square Roots
```html
√x
√(x + 10)
2√(x − 2)
```

**Use:** √ (Unicode character U+221A)

### 5. Common Math Symbols
- ≤ ≥ ≠ ≈
- ± × ÷
- π θ Δ Σ
- ° (degree symbol)
- ∞ (infinity)

### 6. Equations (Display Format)
For standalone equations, use paragraph with special spacing:

```html
<p style="font-size: 18px; line-height: 2; margin: 1rem 0; text-align: center;">
  √<em>x</em> + 10 − 2√<em>x</em> − 2 = 0
</p>
```

---

## EXAMPLES FORMAT

### Complete Example Structure:
```html
<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">
  Example 1: Descriptive Title
</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
  [Problem statement - ACT-style wording]
</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. [answer]</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. [answer]</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. [answer]</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. [answer]</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. [answer]</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Step 1 explanation...</li>
  <li style="margin: 0.15rem 0;">Step 2 explanation...</li>
  <li style="margin: 0.15rem 0;">Step 3 explanation... ✓</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
  <strong>Answer: B</strong>
</p>
```

### Example Requirements:
- **Title:** Numbered + descriptive
- **Problem:** ACT-realistic question
- **Choices:** Use appropriate letter set (A-E or F-K)
- **Solution:** Step-by-step in bullet list
- **Answer:** Clearly stated at end

---

## MASTERY CHECK QUIZ STRUCTURE

**NOTE:** Lesson 1.1 currently does NOT have a quiz in the database. The following is the REQUIRED structure for ALL new lessons based on user requirements.

### Quiz Section Layout:
```html
<div class="mastery-check">
  <h3 class="mastery-check-title">Mastery Check</h3>
  <p class="mastery-check-intro">
    Test your understanding with these 10 ACT-style practice questions.
    Questions progress from easy to challenging.
  </p>

  <!-- Questions 1-10 go here -->

  <button class="submit-quiz-btn">Submit Quiz</button>

  <div class="quiz-results" style="display: none;">
    <h4>Your Score: <span class="score">0</span>/<span class="total">10</span></h4>
    <p class="results-message"></p>
  </div>
</div>
```

### Individual Question Structure:
```html
<div class="quiz-question" data-question="1" data-answer="C">
  <p class="question-text">
    <strong>1.</strong> [ACT-style problem statement]
  </p>

  <div class="answer-choices">
    <label class="answer-choice">
      <input type="radio" name="q1" value="A">
      <span class="choice-letter">A.</span>
      <span class="choice-text">[Answer option]</span>
    </label>
    <label class="answer-choice">
      <input type="radio" name="q1" value="B">
      <span class="choice-letter">B.</span>
      <span class="choice-text">[Answer option]</span>
    </label>
    <label class="answer-choice">
      <input type="radio" name="q1" value="C">
      <span class="choice-letter">C.</span>
      <span class="choice-text">[CORRECT ANSWER]</span>
    </label>
    <label class="answer-choice">
      <input type="radio" name="q1" value="D">
      <span class="choice-letter">D.</span>
      <span class="choice-text">[Answer option]</span>
    </label>
  </div>

  <div class="answer-feedback" style="display: none;">
    <p class="explanation">
      <strong>Answer: C</strong><br><br>
      <strong>Solution:</strong><br>
      [Step 1: ...]<br>
      [Step 2: ...]<br>
      [Step 3: ...]<br><br>
      [Brief explanation of why this is correct and common mistakes]
    </p>
  </div>
</div>
```

### Quiz Difficulty Progression:
- **Questions 1-3:** Easy (direct formula application, one step)
- **Questions 4-7:** Medium (multi-step, concept application)
- **Questions 8-10:** Hard (complex, multiple concepts, ACT challenge level)

### Quiz Question Requirements:
1. **100% ACT-Authentic:** Indistinguishable from real ACT questions
2. **Realistic Numbers:** Not overly simple or complex
3. **Plausible Distractors:** Include common mistakes as wrong answers
4. **Complete Solutions:** Step-by-step explanation for every question
5. **Appropriate Choices:**
   - Questions 1-30: Use A/B/C/D (4 choices) or A/B/C/D/E (5 choices)
   - Questions 31-60: Use F/G/H/J/K (5 choices)
6. **Difficulty Calibration:** Match actual ACT question difficulty
7. **Timing:** Solvable in ~60 seconds each

---

## CONTENT STRUCTURE

### Standard Lesson Flow:

#### 1. Introduction (1-2 paragraphs)
- State ACT relevance
- Explain importance
- Preview what student will learn

#### 2. Main Teaching Sections (3-5 sections)
Each section includes:
- **H3 header:** Numbered (1., 2., 3.)
- **Concept explanation:** Clear, beginner-friendly
- **Bulleted lists:** Key points, advantages, when to use
- **One worked example** per major concept

#### 3. Examples (3-5 total)
- Progressive difficulty
- Complete solutions
- ACT-style formatting

#### 4. ACT Strategies (if applicable)
- Test-specific tips
- Common traps
- Time-saving techniques

#### 5. Key Takeaways
- Green checkmark list
- 5-7 essential points
- Summary of formulas/concepts

#### 6. Mastery Check Quiz (REQUIRED)
- 10 questions total
- 3 easy, 4 medium, 3 hard
- Complete solutions

---

## ACT RELEVANCE STANDARDS

### Every Lesson Must:
✓ Only include content that appears on the ACT Math test
✓ Use ACT-style wording in all examples and quiz questions
✓ Reference ACT timing and strategy throughout
✓ Include ACT-specific shortcuts and tricks
✓ Mention calculator usage where appropriate
✓ Note common ACT traps and distractors

### ACT Question Characteristics:
✓ Realistic numbers (avoid 0, 1, simple integers when not ACT-typical)
✓ Natural-sounding word problems
✓ Plausible incorrect answer choices
✓ Appropriate computational complexity
✓ Matches ACT's typical problem types

### What to AVOID:
✗ Content not tested on ACT
✗ Textbook-style problems
✗ Overly academic terminology
✗ Non-ACT problem formats
✗ Advanced concepts beyond ACT scope

---

## SECTION_CONTENT BLOCK SIZE

### Database Storage Guidelines:
- Each `section_content` block: **~1500-2000 characters max**
- Break long lessons into multiple content blocks
- Maintain logical breakpoints (after sections, before examples)

### Example Breakdown:
```javascript
Section 1: "backsolving-main"
  Content Block 0: Introduction + Section 1-2 (~1800 chars)
  Content Block 1: Section 3 + Examples (~1900 chars)
  Content Block 2: Section 4 + Key Takeaways (~1600 chars)

Section 2: "backsolving-quiz"
  Content Block 0: Quiz intro + Questions 1-5 (~2000 chars)
  Content Block 1: Questions 6-10 + submit button (~2000 chars)
```

---

## COMPLETE TEMPLATE

### Database Insert Structure:
```sql
-- 1. Insert lesson metadata
INSERT INTO lesson_metadata (lesson_key, title, subject, category, difficulty_level, duration_minutes, order_index, is_published)
VALUES ('example-key', 'Topic X.X - Title', 'math', 'Category Name', 2, 30, XX, true);

-- 2. Insert lesson section(s)
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES
  ('[lesson_id]', 'example-key-main', 'Main Content', 'content', 0),
  ('[lesson_id]', 'example-key-quiz', 'Mastery Check', 'quiz', 1);

-- 3. Insert content blocks
INSERT INTO section_content (section_id, content_type, content, order_index)
VALUES
  ('[section_id]', 'html', '[HTML content block 1]', 0),
  ('[section_id]', 'html', '[HTML content block 2]', 1);
```

---

## LESSON LENGTH GUIDELINES

### Target Word Count:
- **Teaching Content:** 2000-3000 words
- **Examples:** 3-5 worked examples (300-500 words total)
- **Quiz:** 10 questions with solutions (1500-2000 words)
- **Total:** 4000-6000 words per complete lesson

### Character Count (for database):
- **Main content section:** 6000-10000 characters total
- **Quiz section:** 5000-8000 characters total
- **Break into 2-4 content blocks** per section

---

## QUALITY CHECKLIST

Before finalizing any lesson, verify:

✓ **Metadata:** Correct lesson_key, title, category, order_index
✓ **Formatting:** All HTML styles match this guide exactly
✓ **Blue Terms:** 5-10 key terms highlighted in blue underline
✓ **Examples:** 3-5 examples with complete solutions
✓ **Numbered Sections:** All H3 headers numbered (1., 2., 3.)
✓ **Answer Choices:** Times New Roman font, correct letter set
✓ **Key Takeaways:** 5-7 points with green checkmarks
✓ **Quiz:** Exactly 10 questions, 3 easy / 4 medium / 3 hard
✓ **ACT Authentic:** Every question indistinguishable from real ACT
✓ **Solutions:** Complete step-by-step solutions for all quiz questions
✓ **Content Blocks:** Each block ~1500-2000 characters
✓ **ACT Relevance:** 100% ACT-specific content, no non-ACT topics

---

## VERSION HISTORY

- **v1.0 (2025-10-15):** Initial comprehensive style guide based on Topic 1.1 analysis

---

**End of Style Guide**
