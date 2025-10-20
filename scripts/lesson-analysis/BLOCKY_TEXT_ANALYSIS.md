# Blocky Text Analysis - Reading & Science Lessons

## Critical Issue: Massive Paragraph Blocks

Reading and Science lessons have HUGE paragraph blocks (150-250 words) that should be converted to bullet lists for better readability and comprehension.

## Comparison: Math vs. Reading/Science

### GOOD EXAMPLE: Math Lesson 1.1 (backsolving)

**Structure:**
```
H3: 1. What Is Backsolving?
  Paragraph (brief intro - 2-3 sentences)
  Bullet list:
    - Key advantages:
      - Nested bullet
      - Nested bullet
      - Nested bullet
    - When to Backsolve:
      - Nested bullet
      - Nested bullet
      - Nested bullet

H3: 2. The Backsolving Process
  Paragraph (brief intro)

  H4: Step 1: Strategic Starting
    Bullet list:
      - Main point with nested bullets:
        - Sub-point 1
        - Sub-point 2
        - Sub-point 3

  H4: Step 2: Test the Choice
    Bullet list:
      - Main point with nested bullets:
        - Sub-question 1
        - Sub-question 2
        - Sub-question 3
```

**Key Features:**
- Brief paragraphs (2-4 sentences max)
- Extensive use of bullet lists
- Nested bullets for sub-points
- Sequential information in bullet format
- Easy to scan and digest

### BAD EXAMPLE: Reading Lesson (core-principles)

**Current Structure:**
```
H3: 1. Principle 1: Every Answer Must Be Supported by the Passage
  HUGE PARAGRAPH (100+ words) ❌

  H4: Why This Principle Matters
    MASSIVE PARAGRAPH (250+ words) ❌
    - No bullet points
    - Dense wall of text
    - Hard to scan

  H4: How to Apply Evidence-Based Reasoning
    MASSIVE PARAGRAPH (200+ words) ❌
    - All procedural steps in paragraph form
    - Should be bullets

  H4: Avoiding Outside Knowledge Traps
    HUGE PARAGRAPH (180+ words) ❌
```

### BAD EXAMPLE: Science Lesson (passage-approach)

**Current Structure:**
```
H3: 1. The Optimal Passage Reading Sequence
  Paragraph (okay)

  H4: Step 1: Read the Introduction Quickly
    MASSIVE PARAGRAPH (250+ words) ❌
    - Sequential steps hidden in prose
    - Should be bullet list

  H4: Step 2: Examine All Figures and Tables First
    MASSIVE PARAGRAPH (250+ words) ❌
    - Multiple points that should be bullets
    - Numbered items (1), (2), (3), (4) in paragraph form ❌
```

## Specific Patterns That Need Fixing

### Pattern 1: Hidden Numbered/Bulleted Lists in Paragraphs

**BEFORE (Reading lesson):**
```html
<p>For each figure, identify: (1) what variables are being shown,
(2) what units are used, (3) what general trends are visible,
and (4) what different lines represent.</p>
```

**SHOULD BE:**
```html
<p>For each figure, identify:</p>
<ul>
  <li>What variables are being shown (read axis labels)</li>
  <li>What units are used (meters, grams, etc.)</li>
  <li>What general trends are visible</li>
  <li>What different lines, symbols, or categories represent</li>
</ul>
```

### Pattern 2: Multiple Concepts Crammed into One Paragraph

**BEFORE:**
```html
<p>Understanding that answers must be passage-based rather than
knowledge-based changes how you approach every question. Even if
you possess extensive background knowledge about a topic, you must
resist the temptation to answer based on what you know to be true.
The ACT only cares about what the passage says. This means that if
a Natural Science passage claims something factually incorrect, you
must answer based on the passage's claims. This principle levels
the playing field—students don't need prior knowledge.</p>
```

**SHOULD BE:**
```html
<p>Understanding that answers must be passage-based rather than
knowledge-based changes your approach:</p>
<ul>
  <li>Never rely on outside knowledge—only use what the passage states</li>
  <li>If the passage contains factual errors, answer based on the passage, not reality</li>
  <li>This levels the playing field—no prior knowledge required</li>
  <li>Everything you need is provided in the passage</li>
</ul>
```

### Pattern 3: Sequential Steps in Paragraph Form

**BEFORE:**
```html
<p>When you're uncertain between two answer choices, the best strategy
is to return to the passage and identify precisely where the relevant
information appears. Read that section carefully—often within a window
of 3-5 lines around the line reference—and compare the passage's exact
wording to each answer choice. The correct answer will closely align
with the passage's language.</p>
```

**SHOULD BE:**
```html
<p>When uncertain between two answer choices:</p>
<ul>
  <li>Return to the passage and locate the relevant information</li>
  <li>Read a 3-5 line window around the reference</li>
  <li>Compare the passage's exact wording to each answer choice</li>
  <li>The correct answer will closely align with the passage's language</li>
</ul>
```

### Pattern 4: Lists of Types/Categories in Paragraph Form

**BEFORE (Reading lesson):**
```html
<p>The six most common wrong answer types are: Too Extreme (uses
absolute language like "always," "never"), Distortion (takes information
but twists it), Out of Scope (discusses topics not mentioned), Opposite
(states the reverse), Partially Correct (contains some accurate info
but has errors), and Wrong Section (from different paragraph).</p>
```

**SHOULD BE:**
```html
<p>The six most common wrong answer types are:</p>
<ul>
  <li><strong>Too Extreme:</strong> Uses absolute language like "always," "never," "impossible"</li>
  <li><strong>Distortion:</strong> Takes passage information but twists or exaggerates it</li>
  <li><strong>Out of Scope:</strong> Discusses topics not mentioned in the passage</li>
  <li><strong>Opposite:</strong> States the reverse of what the passage says</li>
  <li><strong>Partially Correct:</strong> Contains accurate info but includes critical errors</li>
  <li><strong>Wrong Section:</strong> Accurate but from a different paragraph than asked</li>
</ul>
```

## Rules for Converting Paragraphs to Bullets

### KEEP AS PARAGRAPHS:
1. Opening introductory paragraphs (1-2 sentences setting context)
2. Brief conceptual explanations (2-4 sentences)
3. Narrative examples or scenarios
4. Concluding summary statements

### CONVERT TO BULLETS:
1. Any paragraph with numbered items (1), (2), (3) or lettered items
2. Paragraphs listing types, categories, or classifications
3. Sequential steps or procedures ("first... then... next...")
4. Multiple distinct points or concepts in one paragraph
5. Advantages/disadvantages lists
6. Comparison lists (this vs. that)
7. Paragraphs with multiple semicolons separating distinct points
8. "When to..." or "How to..." procedural paragraphs

### USE NESTED BULLETS FOR:
1. Sub-points under main points
2. Examples under concepts
3. Details under categories
4. Steps within larger procedures

## Example Transformation: Reading Lesson Section

### BEFORE (Blocky):
```html
<h4>Principle 4: Use Aggressive Process of Elimination</h4>
<p>Process of elimination (POE) is often more effective than searching
for the correct answer directly. For each answer choice, ask: "What's
wrong with this answer? How does it contradict, distort, or go beyond
the passage?" Physically cross out wrong answers in your test booklet
as you eliminate them. Even if you can only eliminate one or two choices,
you've significantly improved your odds. Many students find it easier to
spot what's wrong than to identify what's right—this is because wrong
answers often contain obvious flaws once you look for them. Train yourself
to be skeptical of every answer choice and actively search for reasons to
eliminate it.</p>
```

### AFTER (Bullet-Based):
```html
<h4>Principle 4: Use Aggressive Process of Elimination</h4>
<p>Process of elimination (POE) is often more effective than searching
for the correct answer directly.</p>
<ul>
  <li>For each answer choice, ask:
    <ul>
      <li>What's wrong with this answer?</li>
      <li>How does it contradict or distort the passage?</li>
      <li>Does it go beyond what the passage states?</li>
    </ul>
  </li>
  <li>Physically cross out wrong answers as you eliminate them</li>
  <li>Even eliminating 1-2 choices significantly improves your odds</li>
  <li>Wrong answers often contain obvious flaws once you look for them</li>
  <li>Train yourself to actively search for reasons to eliminate each choice</li>
</ul>
```

## Target: Math-Style Structure for ALL Lessons

Every lesson should follow the backsolving lesson's structure:
- Brief introductory paragraphs
- Extensive use of bullet lists with nested sub-points
- Easy-to-scan formatting
- Sequential information in bullet format
- Maximum readability

## Impact on Reading & Science

**Before:** Dense walls of text, hard to scan, overwhelming
**After:** Scannable bullet points, easy to review, clear hierarchy
