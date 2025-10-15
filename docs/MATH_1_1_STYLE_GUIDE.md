# Math 1.1 Style Guide - Complete Template for English Lessons

**Based on:** Topic 1.1 - Working Backwards Strategy (backsolving)
**Purpose:** Template for rewriting all English lessons with consistent, polished formatting

---

## 1. OVERALL STRUCTURE PATTERN

### Opening (Required)
- **1 paragraph** introducing the concept
- Explains WHAT it is and WHY it matters for the ACT
- Uses bold + underline + blue color for key terms
- Sets up the value proposition immediately

**Math 1.1 Example:**
```
The working backwards strategy, also known as backsolving, is one of the most powerful time-saving techniques on the ACT Math section. Instead of solving a problem algebraically from scratch, you test the answer choices to see which one works. This strategy is especially useful when the algebra looks complicated, but answer choice testing makes solving easy.
```

**Pattern to Follow:**
- Start with "The [concept name]..."
- Describe what it is in simple terms
- Explain why it's valuable ("one of the most powerful...")
- Give context for when/how to use it
- Length: 3-4 sentences

### Body Sections (Numbered H3 Headers)
- **Section 1:** Definition/Explanation ("What Is X?")
- **Section 2:** Process/How-To ("The X Process")
- **Section 3:** Examples ("Classic X Problems")
- **Section 4:** When NOT to use / Common mistakes

### Closing (Required)
- **Key Takeaways** section in green
- 4-6 bullet points
- Short, actionable reminders
- Green checkmarks and color scheme

---

## 2. WRITING STYLE RULES

### Tone & Voice
- **Professional but accessible** - not overly academic
- **Direct and clear** - no unnecessary words
- **Instructional** - teaches step-by-step
- **Confident** - uses definitive language ("is", "will", "must")

### Sentence Patterns

**Opening sentences:**
```
✓ "The [concept] is one of the most [powerful/important/essential] [tools/techniques/rules] for the ACT."
✓ "[Concept] means [simple definition]."
✓ "Understanding [concept] is crucial for [outcome]."
```

**Explanatory sentences:**
```
✓ "Instead of [old way], you [new way]."
✓ "This strategy works because [reason]."
✓ "Key advantages: [list]"
```

**Instructional sentences:**
```
✓ "Follow these [number] steps to [outcome]:"
✓ "Step 1: [Action verb] [object]"
✓ "To identify [X], look for [Y]."
```

### Sentence Length
- **Average:** 15-20 words
- **Opening paragraph:** 20-25 words per sentence
- **Explanations:** 12-18 words
- **Lists:** 8-12 words per bullet

### Paragraph Length
- **Maximum:** 3-4 sentences
- **Average:** 2-3 sentences
- **Never more than 5 sentences**

### Transitions
- Between sections: Use numbered headers (no transition sentences needed)
- Within sections: "Follow these steps...", "Here's how...", "Key advantages include..."
- To examples: No transition - just start with example header

---

## 3. HTML/CSS FORMATTING

### Main Section Headers (H3)
```html
<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. What Is Sentence Structure?</h3>
```

**Rules:**
- Always numbered: "1.", "2.", "3.", etc.
- Sentence case (not title case)
- 5rem top margin for visual separation
- Bold (700 weight)

### Subsection Headers (H4 - Light)
```html
<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 1: Strategic Starting</h4>
```

**Rules:**
- Font-weight: 400 (NOT bold)
- 2rem top margin
- Used for steps, sub-concepts
- Sentence case

### Example Problem Headers (H4 - Red Border)
```html
<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Basic Backsolving</h4>
```

**Rules:**
- Red left border (#b91c1c)
- Bold (700 weight)
- Black text (#000000)
- Format: "Example [number]: [Description]"

### Paragraphs
```html
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Text goes here.</p>
```

**Rules:**
- 16px font size
- 1.7 line height for readability
- 0.5rem top, 1rem bottom margin

### Key Terms (Bold + Underline + Blue)
```html
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">backsolving</strong>
```

**Rules:**
- Blue color: #2563eb
- Bold: 600 weight
- Always underlined
- Use for: main concepts, new terminology, important terms

### Lists (Bulleted)
```html
<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Item text
    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">
      <li>Nested item</li>
    </ul>
  </li>
</ul>
```

**Rules:**
- Tight margins (0.3rem/0.5rem)
- 1.5rem left padding
- Can nest up to 2 levels deep
- Each li has 0.15rem margin

### Answer Choices
```html
<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. Option text</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. Option text</span><br>
...
</p>
```

**Rules:**
- Times New Roman font (matches ACT)
- Each choice on new line with `<br>`
- Wrapped in single `<p>` tag

### Solution Headers
```html
<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>
```

**Rules:**
- 1.5rem top margin (visual separation)
- 0.75rem bottom margin
- Bold "Solution:" label

### Key Takeaways Section
```html
<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Point text here
  </li>
</ul>
```

**Rules:**
- Green color scheme: #2e7d32 (dark green), #4caf50 (light green)
- List has no default bullets
- Each item has green checkmark (✓)
- 0.8rem margin between items
- 3rem top margin for visual separation from content

---

## 4. CONTENT ORGANIZATION

### Section 1: Definition/What Is X?

**Purpose:** Define the concept clearly

**Structure:**
1. One-sentence definition
2. Explanation paragraph (2-3 sentences)
3. Bullet list of key characteristics OR when to use

**Example from Math 1.1:**
```
<h3>1. What Is Backsolving?</h3>

<p>Backsolving means plugging in the answer choices to solve the problem. Instead of setting up equations and solving for x, you test each choice until you find the one that satisfies the conditions in the problem.</p>

<ul>
  <li>Key advantages:
    <ul>
      <li>Faster than traditional algebra on many problems</li>
      <li>Less chance of making algebraic mistakes</li>
      <li>Works great when answer choices are concrete numbers</li>
    </ul>
  </li>
  <li>When to Backsolve:
    <ul>
      <li>The problem asks for a specific value</li>
      <li>Answer choices are numbers (not expressions)</li>
      <li>The algebra looks messy or time-consuming</li>
    </ul>
  </li>
</ul>
```

### Section 2: Process/How-To

**Purpose:** Step-by-step instructions

**Structure:**
1. Intro sentence: "Follow these [X] steps to [outcome]:"
2. H4 subsection for each step
3. Bullet points explaining each step
4. Use nested bullets for details

**Example from Math 1.1:**
```
<h3>2. The Backsolving Process</h3>

<p>Follow these five steps to backsolve efficiently:</p>

<h4>Step 1: Strategic Starting</h4>
<ul>
  <li>On the ACT, answer choices are always listed in ascending order...
    <ul>
      <li>Start with B or C (the middle value)</li>
      <li>If C is too big, you know D and E are also too big</li>
    </ul>
  </li>
</ul>
```

### Section 3: Examples

**Purpose:** Show concept in action

**Structure:**
1. Red-bordered H4 header: "Example [#]: [Description]"
2. Problem statement paragraph
3. Answer choices (A-E format)
4. Solution header
5. Solution steps in bullet points
6. Answer line: "Answer: [Letter]"

**Example from Math 1.1:**
```
<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c;">Example 1: Basic Backsolving</h4>

<p>If √x + 10 − 2√x − 2 = 0, what is the value of x?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 2</span><br>
...
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul>
  <li>Start with C (14): √14 + 10 − 2√14 − 2 = √24 − 2√12 ≈ 4.9 − 6.9 ≠ 0 (doesn't work)</li>
  <li>Try B (6): √6 + 10 − 2√6 − 2 = √16 − 2√4 = 4 − 4 = 0 ✓</li>
</ul>

<p>Answer: B</p>
```

### Section 4: When NOT to Use / Common Mistakes

**Purpose:** Help students avoid pitfalls

**Structure:**
1. Opening sentence with key term bolded
2. Bullet list of situations/mistakes
3. Keep items concise (1 sentence each)

**Example from Math 1.1:**
```
<h3>4. When NOT to Backsolve</h3>

<p>Backsolving isn't always the best strategy. Avoid it when:</p>

<ul>
  <li>Answer choices are algebraic expressions (not numbers)</li>
  <li>The traditional algebra is very simple</li>
  <li>Testing answer choices would be more work than solving directly</li>
</ul>
```

---

## 5. KEY TERMS TO HIGHLIGHT

For English lessons, highlight these grammar terms in blue (same formatting as Math 1.1):

- independent clause, dependent clause, phrase
- subject, verb, subordinating conjunction
- FANBOYS, comma splice, sentence fragment
- compound sentence, complex sentence
- semicolon, colon, dash, apostrophe
- subject-verb agreement, verb tense
- pronoun, antecedent, pronoun case
- misplaced modifier, dangling modifier
- parallel structure, parallelism
- redundancy, wordiness, conciseness
- transition, transition word
- active voice, passive voice

**Format:**
```html
<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">independent clause</strong>
```

---

## 6. LENGTH GUIDELINES

- **Total lesson:** 2,000-3,000 words
- **Opening paragraph:** 60-80 words
- **Each main section:** 300-500 words
- **Key Takeaways:** 4-6 bullet points (15-20 words each)
- **Examples:** 2-3 per lesson minimum

---

## 7. CONTENT BLOCKS FOR DATABASE

Break content into section_content blocks of ~1,500-2,000 characters each:

**Block 1:** Opening + Section 1
**Block 2:** Section 2
**Block 3:** Section 3 (Examples)
**Block 4:** Section 4 + Key Takeaways

---

## 8. QUALITY CHECKLIST

Before finalizing each lesson, verify:

- [ ] Opening paragraph explains value for ACT
- [ ] All key terms are bold + underline + blue
- [ ] Sections are numbered (1., 2., 3., 4.)
- [ ] Steps use H4 headers (font-weight: 400)
- [ ] Examples have red left border
- [ ] Answer choices use Times New Roman font
- [ ] Key Takeaways section included (green)
- [ ] All HTML tags properly closed
- [ ] Consistent margin/padding throughout
- [ ] 2,000-3,000 words total
- [ ] No messy formatting from original source
- [ ] Logical flow from concept → process → examples

---

## 9. WRITING VOICE EXAMPLES

### Good (Matches Math 1.1):
```
✓ "The comma splice is one of the most common grammar errors on the ACT English Test."
✓ "Understanding independent clauses is crucial for identifying sentence structure errors."
✓ "Follow these three steps to spot comma splices quickly:"
✓ "This rule works because independent clauses express complete thoughts."
```

### Bad (Too casual or too academic):
```
✗ "Comma splices are like, super important to know about."
✗ "The utilization of appropriate punctuation facilitates comprehension."
✗ "You'll definitely want to remember this!"
✗ "Let's dive into the fascinating world of clauses..."
```

---

**This style guide is the complete template for rewriting all English lessons to match Math 1.1's polished, professional structure.**
