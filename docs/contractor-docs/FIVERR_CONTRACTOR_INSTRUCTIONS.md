# ACT Test Content Entry Instructions for Contractor

## Overview
You will extract content from ACT practice test PDFs and enter it into our Supabase database. This includes passages, questions, answers, and images.

---

## 🔐 Access Setup

### 1. Get Supabase Access
I will provide you with:
- Supabase Dashboard URL: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix
- Login credentials

### 2. What You'll Use
- **Table Editor** - For entering text content (passages, questions, answers)
- **Storage** - For uploading images (diagrams, complex charts)
- **The PDF** - Source material

---

## 📊 Database Tables You'll Work With

### For English Tests:
- `practice_test_english_passages` - The reading passages
- `practice_test_english_questions` - Questions and answer choices

### For Math Tests:
- `practice_test_math_questions` - Questions, answers, and diagrams

### For Reading Tests:
- `practice_test_reading_passages` - The reading passages
- `practice_test_reading_questions` - Questions and answer choices

### For Science Tests:
- `practice_test_science_passages` - Experiment descriptions and data
- `practice_test_science_questions` - Questions and answer choices

---

## 🎯 CRITICAL DECISION: When to Screenshot vs When to Type

### ✅ SCREENSHOT These (Upload as Images):

1. **Math Diagrams**
   - Geometric shapes (triangles, circles, angles)
   - Coordinate graphs with plotted points
   - Complex mathematical figures
   - Number lines with markings

2. **Science Diagrams**
   - Experiment apparatus drawings
   - Scientific illustrations (cell diagrams, circuits)
   - Complex molecular structures
   - Phase diagrams

3. **Charts That Are Too Complex to Recreate**
   - Scatter plots with many data points
   - Line graphs with multiple lines and shading
   - Bar charts with intricate labeling

### ⌨️ TYPE These (Enter as Text):

1. **Simple Tables**
   - Data tables with rows and columns
   - Science experiment results tables
   - Any table that can be clearly represented in text

2. **All Question Text**
   - The actual question being asked
   - All answer choices (A, B, C, D, etc.)

3. **All Passage Text**
   - English reading passages
   - Science experiment descriptions
   - Instructions and context

**Example of typing a table:**
```
Table 1
Temperature (°C) | Trial 1 | Trial 2 | Trial 3
20               | 2.5     | 2.4     | 2.6
40               | 5.1     | 5.0     | 5.2
60               | 7.8     | 7.9     | 7.7
```

---

## 📝 Text Formatting Rules

When entering text into the database, use HTML tags for formatting:

### Bold Text
- **When**: Vocabulary terms, important words, headers
- **How**: `<strong>important word</strong>`
- **Example**: `The <strong>mitochondria</strong> is the powerhouse of the cell.`

### Italic Text
- **When**: Book titles, emphasis, foreign words, variable names
- **How**: `<em>emphasized word</em>`
- **Example**: `In the passage from <em>Pride and Prejudice</em>, the author...`

### Underlined Text
- **When**: Text is underlined in the PDF (usually for English section questions)
- **How**: `<u>underlined text</u>`
- **Example**: `The phrase <u>"running quickly"</u> should be replaced with:`

### Line Breaks
- **When**: Separating paragraphs or stanzas in poems
- **How**: Use two line breaks (press Enter twice)
- **Example**:
```
First paragraph here.

Second paragraph here.
```

### Special Symbols
- Use actual symbols: ≤, ≥, ≠, π, °, ², ³, √
- For fractions, use: `¹⁄₂` or write as "1/2"
- For subscripts (like H₂O), try to use: H₂O or write as H2O

---

## 📋 Step-by-Step Process

### PART 1: English Section

#### Step 1: Enter Passages
1. Go to Table Editor → `practice_test_english_passages`
2. Click "+ Insert" → "Insert row"
3. Fill in:
   - `test_number`: Which test (1, 2, 3, etc.)
   - `passage_number`: Which passage in this test (1, 2, 3, etc.)
   - `passage_title`: The title at the top (e.g., "The History of Jazz")
   - `passage_text`: Copy the entire passage
     - **Format**: Use two line breaks between paragraphs
     - **Keep**: Bold, italic, underline using HTML tags
     - **Include**: Any text that appears in brackets like [15]
4. Click "Save"

**Example Entry:**
```
test_number: 1
passage_number: 1
passage_title: A Childhood Memory
passage_text:

It was a warm summer day when I <u>first learned</u> to ride a bicycle. My father stood beside me, his hand steady on the seat.

The feeling of freedom was <em>intoxicating</em>. I pedaled faster and faster, until finally, he let go.
```

#### Step 2: Enter Questions
1. Go to Table Editor → `practice_test_english_questions`
2. Click "+ Insert" → "Insert row"
3. Fill in:
   - `test_number`: Same as passage
   - `passage_id`: The ID from the passage you just created (see the `id` column)
   - `question_number`: 1, 2, 3, etc.
   - `question_text`: The question or the sentence with underline
   - `choices`: **JSON format** (see example below)
   - `correct_answer`: A, B, C, or D
   - `explanation`: Leave empty for now

**Choices Format (VERY IMPORTANT):**
```json
{
  "A": "NO CHANGE",
  "B": "running, quickly",
  "C": "running quickly",
  "D": "quickly running"
}
```

**Rules for Choices:**
- Use double quotes `"` not single quotes `'`
- Each choice is `"Letter": "Text"`
- Separate with commas
- Last choice has NO comma after it

---

### PART 2: Math Section

#### Step 1: Enter Questions (No separate passages table)
1. Go to Table Editor → `practice_test_math_questions`
2. Click "+ Insert" → "Insert row"
3. Fill in:
   - `test_number`: Which test
   - `question_number`: 1, 2, 3, etc.
   - `question_text`: The word problem or question
   - `choices`: JSON format with answer choices
   - `correct_answer`: A, B, C, D, or E
   - `image_url`: Leave empty for now (we'll add diagrams after)

#### Step 2: Upload Math Diagrams
**For questions with diagrams:**

1. **Screenshot the diagram:**
   - Use your computer's screenshot tool
   - Crop tightly around just the diagram (no extra white space)
   - Save as PNG or JPG with a clear name: `test1-math-q15.png`

2. **Upload to Supabase Storage:**
   - Go to Storage → `test-images` bucket
   - Create folder: `math-questions/test1/`
   - Upload your screenshot
   - Click on the uploaded image → Copy the URL

3. **Add URL to database:**
   - Go back to Table Editor → `practice_test_math_questions`
   - Find the question row you just created
   - Paste the URL into the `image_url` column
   - Save

---

### PART 3: Reading Section

#### Step 1: Enter Passages
1. Go to Table Editor → `practice_test_reading_passages`
2. Same process as English passages
3. Fill in:
   - `test_number`: Which test
   - `passage_number`: 1, 2, 3, or 4 (Reading has 4 passages)
   - `passage_title`: The title and genre (e.g., "NATURAL SCIENCE: Volcanoes")
   - `passage_text`: The full passage

#### Step 2: Enter Questions
1. Go to Table Editor → `practice_test_reading_questions`
2. Link to passage using `passage_id`
3. Enter question_text and choices in JSON format

---

### PART 4: Science Section

#### Step 1: Enter Passages (Experiments/Studies)
1. Go to Table Editor → `practice_test_science_passages`
2. Fill in:
   - `test_number`: Which test
   - `passage_number`: 1-7 (Science has 7 passages)
   - `passage_title`: Brief title (e.g., "Study 1" or "Experiment 2")
   - `passage_text`: The description + any tables/data

**For Simple Tables in Science - TYPE THEM:**
```
Table 1: Effect of Temperature on Reaction Rate

Temperature (°C) | Rate (mol/s)
20               | 0.5
40               | 1.2
60               | 2.8
80               | 5.1
```

**For Complex Graphs - SCREENSHOT THEM:**
- If the graph has multiple lines, shading, or is hard to describe in text
- Upload to Storage → `science-passages/test1/` (for passage images) or `science-questions/test1/` (for question images)
- You can add the image URL to the passage's `image_url` column (it will display with the passage)
- Or attach to a specific question using the question's `image_url` column

#### Step 2: Enter Questions
1. Go to Table Editor → `practice_test_science_questions`
2. Link to passage using `passage_id`
3. Enter question and choices

---

## 🎨 Image Upload Checklist

For EVERY image you upload:

- [ ] Screenshot is clear and readable
- [ ] Cropped tightly (no extra whitespace)
- [ ] Saved with descriptive name: `test1-math-q5.png`
- [ ] Uploaded to correct folder:
  - Math: `math-questions/test1/`
  - Science: `science-questions/test1/`
- [ ] Public URL copied
- [ ] URL pasted into `image_url` column
- [ ] Saved in database

---

## ✅ Quality Checklist (Check Each Entry)

### For Every Passage:
- [ ] Correct test_number
- [ ] Correct passage_number (1, 2, 3...)
- [ ] Title matches PDF exactly
- [ ] Full text entered with no typos
- [ ] Paragraphs separated with double line breaks
- [ ] Bold/italic/underline preserved with HTML tags
- [ ] No PDF artifacts (weird symbols, page numbers)

### For Every Question:
- [ ] Correct test_number
- [ ] Correct question_number
- [ ] Linked to correct passage_id (if applicable)
- [ ] Question text is complete
- [ ] Choices in proper JSON format
- [ ] All answer choices A-D (or A-E for math) present
- [ ] Correct answer letter entered
- [ ] If question has diagram, image_url is filled in

### For Every Image:
- [ ] Image is clear and readable
- [ ] Cropped properly
- [ ] Uploaded to correct folder:
  - Math questions: `math-questions/test1/`
  - Science questions: `science-questions/test1/`
  - Science passages: `science-passages/test1/`
- [ ] URL works (click it to test)
- [ ] Linked to correct question or passage

---

## 🚨 Common Mistakes to AVOID

1. **Wrong JSON Format**
   - ❌ `{'A': 'answer'}` - WRONG (single quotes)
   - ✅ `{"A": "answer"}` - CORRECT (double quotes)

2. **Missing Paragraph Breaks**
   - ❌ All text in one giant block
   - ✅ Paragraphs separated with double line breaks

3. **Forgetting Formatting**
   - ❌ Plain text when PDF has bold/italic
   - ✅ Using `<strong>`, `<em>`, `<u>` tags

4. **Wrong passage_id Links**
   - ❌ Linking question to wrong passage
   - ✅ Double-check the passage_id matches

5. **Uploading Everything as Images**
   - ❌ Screenshotting simple tables that could be typed
   - ✅ Only screenshot complex diagrams/graphs

6. **Not Cropping Images**
   - ❌ Screenshot includes toolbars, extra space
   - ✅ Tightly cropped around just the diagram

---

## 📞 What to Do If You're Unsure

**If you're not sure whether to screenshot or type something:**
- **Default**: Try to type it as text first
- **Screenshot only if**: It's genuinely too complex or would lose clarity as text

**If formatting seems weird:**
- Take a screenshot of the PDF section
- Send it to me with a note asking how to handle it
- I'll clarify quickly

**If you find errors in the PDF:**
- Enter it exactly as shown in the PDF
- Make a note in a separate document
- We'll review together

---

## 📝 Test Entry Template (Copy This)

When starting a new test, create a checklist:

```
TEST #: _____

ENGLISH:
[ ] Passage 1 - Entered (ID: ___)
  [ ] Questions 1-15 entered
[ ] Passage 2 - Entered (ID: ___)
  [ ] Questions 16-30 entered
[Continue for all 5 passages...]

MATH:
[ ] Questions 1-60 entered
[ ] Diagrams uploaded:
  - Q5: ___
  - Q12: ___
  - Q23: ___
  [List all questions with diagrams]

READING:
[ ] Passage 1 - Entered (ID: ___)
  [ ] Questions 1-10 entered
[Continue for all 4 passages...]

SCIENCE:
[ ] Passage 1 - Entered (ID: ___)
  [ ] Questions entered
[Continue for all 7 passages...]
```

---

## 🎯 Success Criteria

Your work is complete when:
1. All passages are in the database with proper formatting
2. All questions are in the database with correct JSON choices
3. All diagrams are uploaded and linked to questions
4. You've verified 5 random questions load correctly on the website
5. Your test checklist is 100% checked off

---

## ⏱️ Estimated Time Per Test

- **English**: ~2-3 hours (5 passages + 75 questions)
- **Math**: ~2-3 hours (60 questions + ~15 diagrams)
- **Reading**: ~2 hours (4 passages + 40 questions)
- **Science**: ~2-3 hours (7 passages + 40 questions)

**Total per complete test**: ~8-11 hours

---

## 🎓 Training Process

Before you start on the actual tests:

1. **Day 1**: I'll show you a video walkthrough of entering 1 passage + 3 questions
2. **Day 2**: You'll complete 1 full English passage as practice
3. **Day 3**: I'll review your practice work and give feedback
4. **Day 4+**: You proceed with full tests

---

## 💰 Payment Terms

- Payment per complete test (all 4 sections)
- Bonus for zero errors found in quality review
- I will verify entries before final payment
- Rush jobs available for higher rate

---

## 📧 Communication

- **Daily Updates**: Send end-of-day progress report
- **Questions**: Ask immediately, don't guess
- **Blockers**: Let me know ASAP if stuck
- **Screenshots**: Send examples when unsure

---

## 🔗 Quick Reference Links

- Supabase Dashboard: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix
- Table Editor: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/editor
- Storage: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix/storage/buckets
- Full Instructions: [This document]

---

## Examples

### Example 1: English Question Entry

**From PDF:**
```
15. The author's use of the phrase "dancing shadows"
     A. NO CHANGE
     B. "dancing, shadows"
     C. "dancing shadows"
     D. "shadows that danced"
```

**Database Entry:**
```
test_number: 1
passage_id: 123
question_number: 15
question_text: The author's use of the phrase "dancing shadows"
choices: {"A": "NO CHANGE", "B": "\"dancing, shadows\"", "C": "\"dancing shadows\"", "D": "\"shadows that danced\""}
correct_answer: A
```

### Example 2: Math Question with Diagram

**From PDF:**
```
25. In the figure below, triangle ABC has sides of length 5, 12, and 13.
    What is the area?
    [DIAGRAM OF RIGHT TRIANGLE]
    A. 25
    B. 30
    C. 60
    D. 65
    E. 130
```

**Steps:**
1. Screenshot the triangle diagram → Save as `test1-math-q25.png`
2. Upload to Storage → `math-questions/test1/test1-math-q25.png`
3. Copy URL: `https://rabavobdklnwvwsldbix.supabase.co/storage/v1/object/public/test-images/math-questions/test1/test1-math-q25.png`
4. Database entry:
```
test_number: 1
question_number: 25
question_text: In the figure below, triangle ABC has sides of length 5, 12, and 13. What is the area?
choices: {"A": "25", "B": "30", "C": "60", "D": "65", "E": "130"}
correct_answer: B
image_url: https://rabavobdklnwvwsldbix.supabase.co/storage/v1/object/public/test-images/math-questions/test1/test1-math-q25.png
```

### Example 3: Science Passage with Table

**From PDF:**
```
Study 1
Scientists measured the pH of 4 different solutions. The results are shown in Table 1.

Table 1
Solution | pH
A        | 3.2
B        | 7.0
C        | 9.5
D        | 12.1
```

**Database Entry:**
```
test_number: 1
passage_number: 1
passage_title: Study 1
passage_text: Scientists measured the pH of 4 different solutions. The results are shown in Table 1.

Table 1
Solution | pH
A        | 3.2
B        | 7.0
C        | 9.5
D        | 12.1
```

---

## You're Ready! 🚀

If you've read this far, you're ready to start. Remember:
- **Accuracy over speed**
- **Ask questions immediately**
- **Check your work twice**
- **Take breaks to stay sharp**

Good luck!
