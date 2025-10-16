# 📚 ACT MATH LESSON TEMPLATE - COMPREHENSIVE GUIDE

## ✅ GOLDEN RULE
**ONE ACT-STYLE EXAMPLE PER MAJOR SECTION (H3), NOT PER SUBSECTION (H4)**

---

## 📋 COMPLETE LESSON STRUCTURE

### 1️⃣ OPENING (Required)

**Intro Paragraph**
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Understanding <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">[key term 1]</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">[key term 2]</strong>, and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">[key term 3]</strong> is essential for ACT Math success. These concepts appear in X-Y questions per test—that's nearly Z% of all math questions! [One sentence about why this matters or what makes it tricky].
</p>
```

**KEY REQUIREMENTS:**
- 2-3 sentences ONLY
- Include 2-4 blue underlined key terms
- Mention ACT frequency ("X-Y questions per test")
- Provide percentage context when possible
- End with practical insight or trap warning

---

### 2️⃣ MAJOR SECTIONS (H3) - 3 to 5 sections

**Section Header Format (NUMBERED)**
```html
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. [Section Title]
</h3>
```

**Opening Paragraph for Each Section**
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[Define the main concept with blue underlined term]. [Explain what it means practically]. [Mention how ACT tests this concept].
</p>
```

**KEY REQUIREMENTS:**
- Number sections: 1., 2., 3., 4.
- Large top margin (5rem) to separate sections
- Each section covers ONE major topic
- Opening paragraph defines concept with blue underlined terms

---

### 3️⃣ SUBSECTIONS (H4) - 2 to 4 per H3 section

**Subsection Header Format (NOT NUMBERED)**
```html
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
[Descriptive Title]
</h4>
```

**Common H4 Subsection Types:**

**A. Formula/Rule List**
```html
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
Key Formulas You'll Use
</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">[Shape/Concept]</strong> Formula with brief explanation</li>
  <li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">[Shape/Concept]</strong> Formula with brief explanation</li>
</ul>
```

**B. Strategy Tips**
```html
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
ACT Strategy Tip
</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[Practical advice for approaching problems, common traps, or memory techniques]
</p>
```

**C. Pattern Recognition**
```html
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
Pattern Recognition
</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[Explain underlying patterns that help students understand WHY formulas work]
</p>
```

**D. Common Mistakes**
```html
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
Common Mistakes to Avoid
</h4>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">❌ [Mistake description]</li>
  <li style="margin: 0.15rem 0;">✓ [Correct approach]</li>
</ul>
```

**KEY REQUIREMENTS:**
- NO numbers on H4 subsections
- Smaller top margin (2rem)
- Lighter font-weight (400)
- Use for: formulas, strategies, patterns, definitions
- NO examples at this level!

---

### 4️⃣ ONE ACT-STYLE EXAMPLE PER H3 SECTION

**Example Header (Red Border)**
```html
<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example [Number]: [Descriptive Title]</h4>
```

**⚠️ FORMATTING BEST PRACTICE:**
- Keep Example title text on the SAME LINE as the opening `<h4>` tag for readability
- ✅ RECOMMENDED: `<h4 ...>Example 3: Title</h4>` (all one line)
- ✅ ALSO WORKS: Multi-line (parser now handles newlines correctly after bug fix)
- **Note**: A 2025-10-16 bug fix added `\s*` to the regex pattern in `splitIntoTextSections.js` to properly handle whitespace/newlines between the h4 tag and "Example" text. Prior versions would incorrectly render H4 subsections inside the example box if newlines were present.

**Question Text**
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[ACT-style question with context, numbers, and clear question]
</p>
```

**Answer Choices (Times New Roman Font)**
```html
<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. [answer]</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. [answer]</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. [answer]</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. [answer]</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. [answer]</span>
</p>
```

**Solution Section**
```html
<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;"><strong>[Trap/Key insight]:</strong> [What students miss]</li>
  <li style="margin: 0.15rem 0;">[Step 1 with calculation]</li>
  <li style="margin: 0.15rem 0;">[Step 2 with calculation]</li>
  <li style="margin: 0.15rem 0;"><strong>[Why/Strategy note]:</strong> [Explain the approach]</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: [Letter]
</p>
```

**KEY REQUIREMENTS:**
- **ONLY ONE EXAMPLE PER H3 SECTION** (not per subsection!)
- Example number continues across entire lesson (Example 1, Example 2, Example 3, Example 4)
- Red left border on example header
- Always 5 answer choices (A-E)
- Use Times New Roman font for answer choices
- Solution as bulleted list with:
  - Common trap highlighted first
  - Step-by-step work
  - Strategy/reasoning notes in bold
- End with "Answer: B" format

**EXAMPLE PLACEMENT:**
- Place example AFTER all H4 subsections in that H3 section
- Example tests multiple concepts from that section
- Example should be realistic ACT difficulty

---

### 5️⃣ KEY TAKEAWAYS (Required Final Section)

**Section Header**
```html
<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>
```

**Takeaway List (Green Checkmarks)**
```html
<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Key point]
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>[Key point]
  </li>
  <!-- 4-6 total takeaways -->
</ul>
```

**KEY REQUIREMENTS:**
- Green color scheme (#2e7d32, #4caf50)
- 4-6 bullet points
- Each starts with green checkmark (✓)
- Focus on: formulas, common traps, key strategies
- NO "list-style: disc" - use "list-style: none" with custom checkmarks

---

## 📊 IDEAL LESSON METRICS

**Content Balance:**
- **Total length:** 13,000-16,000 characters
- **H3 sections:** 3-5 major sections
- **H4 subsections:** 2-4 per H3 section
- **Examples:** 3-5 total (ONE per H3 section)
- **Key Takeaways:** 4-6 bullets

**Example Ratio:**
- ✅ **CORRECT:** 4 H3 sections = 4 examples
- ❌ **WRONG:** 4 H3 sections with 12 H4 subsections = 12 examples

---

## 🎨 STYLING STANDARDS

### Blue Underlined Terms
```html
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">
[term]
</strong>
```
- Use for: key vocabulary, formulas, theorems
- Must have definition in term_definitions table

### Paragraphs
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
[content]
</p>
```

### Bulleted Lists
```html
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">[content]</li>
</ul>
```

### H3 (Major Sections)
```html
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
[Numbered]. [Title]
</h3>
```

### H4 (Subsections)
```html
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">
[Title - NO numbers]
</h4>
```

### H4 (Example Headers)
```html
<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">
Example [Number]: [Descriptive Title]
</h4>
```

---

## ✅ QUALITY CHECKLIST

**Before Finalizing Lesson:**
- [ ] Intro paragraph mentions ACT frequency
- [ ] 2-4 blue underlined terms in intro
- [ ] H3 sections are numbered (1. 2. 3.)
- [ ] H4 subsections are NOT numbered
- [ ] **ONE example per H3 section (not per H4!)**
- [ ] Examples numbered consecutively (1, 2, 3, 4)
- [ ] Examples have red left border
- [ ] Answer choices in Times New Roman font
- [ ] 5 answer choices (A-E) for each example
- [ ] Solutions are bulleted lists
- [ ] Solutions mention common traps
- [ ] Key Takeaways section at end
- [ ] Key Takeaways use green checkmarks
- [ ] 4-6 takeaway bullets
- [ ] All blue underlined terms have definitions

---

## 🚫 COMMON MISTAKES TO AVOID

**❌ DON'T:**
- Add examples to every H4 subsection
- Create 8+ examples in a single lesson
- Number H4 subsections
- Use yellow/blue tip boxes (💡/⚠️ boxes)
- Add "Practice Problems" section
- Use regular bullets in Key Takeaways
- Make intro paragraph longer than 3 sentences
- Forget Times New Roman font on answer choices
- Skip the "Solution:" header
- Write solution as paragraph (use bullets!)

**✅ DO:**
- ONE example per H3 section only
- Keep to 3-5 examples total
- Use descriptive H4 titles
- Let content flow naturally without boxes
- End with Key Takeaways
- Use green checkmarks (✓) in takeaways
- Keep intro concise
- Always format answers consistently
- Start solutions with common trap
- Make solution steps clear and bulleted

---

## 📏 LESSON LENGTH GUIDE

**By Topic Complexity:**
- **Simple topic (1 concept):** 13,000-14,000 chars, 3 H3 sections, 3 examples
- **Medium topic (2-3 concepts):** 14,000-15,500 chars, 4 H3 sections, 4 examples
- **Complex topic (4+ concepts):** 15,500-17,000 chars, 5 H3 sections, 5 examples

**Never exceed 17,000 characters** - lessons should be focused and digestible.

---

## 🎯 EXAMPLE PLACEMENT VISUAL

```
H3: 1. First Major Topic
  ├─ Opening paragraph
  ├─ H4: Key Formulas
  ├─ H4: Strategy Tips
  └─ Example 1 ⭐ (ONE example for entire H3 section)

H3: 2. Second Major Topic
  ├─ Opening paragraph
  ├─ H4: Common Mistakes
  ├─ H4: Pattern Recognition
  ├─ H4: Another Subsection
  └─ Example 2 ⭐ (ONE example for entire H3 section)

H3: 3. Third Major Topic
  ├─ Opening paragraph
  ├─ H4: Advanced Concepts
  └─ Example 3 ⭐ (ONE example for entire H3 section)

H3: Key Takeaways
  └─ Green checkmark list
```

---

## 💾 FILE NAMING CONVENTION

```
LESSON_[CHAPTER]_[NUMBER]_[TOPIC_UPPERCASE].html

Examples:
- LESSON_3_4_LOGARITHMS.html
- LESSON_3_5_INEQUALITIES.html
- LESSON_2_2_AREAS_VOLUMES_TRIANGLES.html
```

---

## 🔄 COMPARISON: CORRECT VS INCORRECT

### ❌ WRONG APPROACH (Too Many Examples)
```
H3: 1. Logarithm Basics
  H4: Definition
    Example 1
  H4: Converting Forms
    Example 2
  H4: Special Values
    Example 3

[This creates 3 examples in ONE H3 section - TOO MANY!]
```

### ✅ CORRECT APPROACH
```
H3: 1. Logarithm Basics
  Opening paragraph
  H4: Definition
  H4: Converting Forms
  H4: Special Values
  Example 1 (tests all three concepts)

[This creates 1 example for the entire H3 section - PERFECT!]
```

---

## 📚 REFERENCE: LESSON 2.2 STRUCTURE

**Perfect Example to Follow:**
- Intro: 1 paragraph, 3 blue terms, ACT frequency
- H3: 4 numbered sections
  - 1. Area of Common Shapes
  - 2. Volume of Three-Dimensional Shapes
  - 3. The Pythagorean Theorem
  - 4. Special Right Triangles
- H4: 12 subsections total (2-4 per H3)
- Examples: 4 total (1 per H3 section)
- Key Takeaways: 5 green checkmark bullets
- Length: 15,524 characters
- **Mastery Check:** 5-question quiz stored in database

**This is the GOLD STANDARD.**

---

## 🎯 MASTERY CHECK QUIZZES

**Every lesson MUST have a mastery check quiz!**

**Database Schema (IMPORTANT):**

**quizzes table:**
- `id` (UUID, primary key)
- `lesson_id` (UUID, FK to lesson_metadata - NOT lesson_key!)
- `title` (text) - Format: "🔒 Mastery Quiz: [Topic Name]"
- `intro`, `quiz_type`, `position`, `is_required` (optional fields)

**quiz_questions table:**
- `id` (UUID, primary key)
- `quiz_id` (UUID, FK to quizzes)
- `question_text` (text) - The ACT-style question
- `question_order` (integer) - 0-4 for questions 1-5
- NO correct_answer or explanation columns here!

**quiz_options table:**
- `id` (UUID, primary key)
- `question_id` (UUID, FK to quiz_questions)
- `option_text` (text) - The answer choice text (just the text, no letter prefix)
- `is_correct` (boolean) - true for correct answer, false for others
- `explanation` (text) - Stored on the CORRECT option only
- `option_order` (integer) - 0-4 for options A-E
- NO option_letter column - order determines letter (0=A, 1=B, 2=C, 3=D, 4=E)

**Quiz Requirements:**
- 5 questions per quiz
- 5 options per question (A-E)
- Questions cover all major H3 sections from the lesson
- Questions are authentic ACT-style
- Wrong answers include common traps
- Explanation stored on the correct option with clear, step-by-step reasoning

**Creating Quizzes:**
Use a script to:
1. Get lesson_id from lesson_metadata using lesson_key
2. Insert quiz with lesson_id (NOT lesson_key)
3. Insert questions with question_order (NOT order_index)
4. Insert options with is_correct boolean and option_order (NOT option_letter or order_index)

---

## ✨ FINAL NOTES

1. **Quality over quantity** - One excellent example per section beats three mediocre ones
2. **ACT authenticity** - Examples should feel like real ACT questions
3. **Strategic teaching** - Highlight traps and shortcuts
4. **Visual consistency** - Follow styling exactly
5. **Student-focused** - Explain the "why" not just the "what"
6. **Mastery checks required** - Every lesson needs a 5-question quiz

**When in doubt, reference Lesson 2.2!**
