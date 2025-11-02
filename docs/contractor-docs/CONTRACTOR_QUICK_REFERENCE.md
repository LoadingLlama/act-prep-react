# Quick Reference Card - Keep This Open While Working

## JSON Format (MOST IMPORTANT!)

```json
{"A": "first answer", "B": "second answer", "C": "third answer", "D": "fourth answer"}
```

✅ DO:
- Use **double quotes** `"` around everything
- Separate choices with commas
- No comma after last choice

❌ DON'T:
- Use single quotes `'`
- Forget commas between choices
- Add comma after last choice

---

## HTML Formatting Tags

| PDF Shows | You Type |
|-----------|----------|
| **Bold text** | `<strong>Bold text</strong>` |
| *Italic text* | `<em>Italic text</em>` |
| <u>Underlined</u> | `<u>Underlined</u>` |

---

## When to Screenshot vs Type

### 📸 SCREENSHOT:
- Geometric diagrams
- Complex graphs
- Math coordinate planes
- Science apparatus drawings

### ⌨️ TYPE AS TEXT:
- Simple data tables
- All questions
- All answer choices
- Passages

---

## Table Format (Type It)

```
Table 1: Temperature Data

Temp (°C) | Rate (mol/s)
20        | 0.5
40        | 1.2
60        | 2.8
```

---

## Database Tables Quick Guide

### English
- **Passages**: `practice_test_english_passages`
- **Questions**: `practice_test_english_questions`

### Math
- **Questions only**: `practice_test_math_questions`
  - Add `image_url` for diagrams

### Reading
- **Passages**: `practice_test_reading_passages`
- **Questions**: `practice_test_reading_questions`

### Science
- **Passages**: `practice_test_science_passages`
- **Questions**: `practice_test_science_questions`

---

## Required Fields Checklist

### Every Passage:
- [ ] `test_number`
- [ ] `passage_number`
- [ ] `passage_title`
- [ ] `passage_text`

### Every Question:
- [ ] `test_number`
- [ ] `question_number`
- [ ] `passage_id` (if applicable)
- [ ] `question_text`
- [ ] `choices` (in JSON format)
- [ ] `correct_answer`

---

## Image Upload Steps

1. Screenshot diagram → Save as `test1-math-q5.png`
2. Storage → `test-images` → `math-questions/test1/`
3. Upload → Click image → Copy URL
4. Paste URL in `image_url` column
5. Test: Click URL to verify it works

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| `{'A': 'answer'}` | `{"A": "answer"}` |
| Passage all one block | Add double line breaks |
| Screenshotting tables | Type them as text |
| Forgetting bold/italic | Add `<strong>` and `<em>` tags |
| Wrong passage_id | Check the `id` column |

---

## Expected Times

- 1 English passage + 15 questions = **30-40 min**
- 1 Math question with diagram = **3-5 min**
- 1 Reading passage + 10 questions = **25-35 min**
- 1 Science passage + 5-7 questions = **20-30 min**

**If you're much faster:** Slow down, check accuracy
**If you're much slower:** Ask for help

---

## Quality Checklist (Before Submitting)

Quick self-check:
- [ ] All question numbers sequential (no skips)
- [ ] JSON uses double quotes
- [ ] All images load when you click URLs
- [ ] Paragraphs have breaks
- [ ] No obvious typos
- [ ] Formatting preserved (bold/italic/underline)

---

## Help Commands

**Test your JSON:**
https://jsonlint.com
Paste your choices → Click "Validate JSON"

**View your work:**
Ask me to show you how it looks on localhost

**When stuck:**
Take screenshot → Send to me → Ask specific question

---

## Today's Goal Tracker

Test #: _____

English:
- [ ] Passage 1 ➜ Questions 1-15
- [ ] Passage 2 ➜ Questions 16-30
- [ ] Passage 3 ➜ Questions 31-45
- [ ] Passage 4 ➜ Questions 46-60
- [ ] Passage 5 ➜ Questions 61-75

Math:
- [ ] Questions 1-15
- [ ] Questions 16-30
- [ ] Questions 31-45
- [ ] Questions 46-60

Reading:
- [ ] Passage 1 ➜ Questions 1-10
- [ ] Passage 2 ➜ Questions 11-20
- [ ] Passage 3 ➜ Questions 21-30
- [ ] Passage 4 ➜ Questions 31-40

Science:
- [ ] Passage 1 ➜ Questions
- [ ] Passage 2 ➜ Questions
- [ ] Passage 3 ➜ Questions
- [ ] Passage 4 ➜ Questions
- [ ] Passage 5 ➜ Questions
- [ ] Passage 6 ➜ Questions
- [ ] Passage 7 ➜ Questions

---

## End of Day Report Template

Copy/paste this in your daily update:

```
Date: _______

Completed Today:
- English: Passages ___-___, Questions ___-___
- Math: Questions ___-___
- Reading: Passages ___-___, Questions ___-___
- Science: Passages ___-___, Questions ___-___

Images Uploaded: ___ total

Issues/Questions:
- [Any problems you encountered]

Tomorrow's Plan:
- [What you'll work on next]

ETA for Test Completion: _______
```
