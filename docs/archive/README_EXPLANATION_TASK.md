# Diagnostic Test Explanation Writing Task

## Summary
Need to write HIGHLY SPECIFIC explanations for all 215 diagnostic test questions.

## Current Status
- ✅ Fetched all 215 questions with full data
- ✅ Created explanation framework and templates
- ⏳ 12 / 215 explanations written (5.6% complete)
  - English: 5 / 75 (6.7%)
  - Math: 3 / 60 (5.0%)
  - Reading: 1 / 40 (2.5%)
  - Science: 3 / 40 (7.5%)

## Requirements

### Each explanation MUST:
1. Reference ACTUAL question content (numbers, terms, specifics)
2. Explain WHY the correct answer works for THIS SPECIFIC question
3. Explain why EACH wrong answer is wrong for THIS SPECIFIC question
4. Use actual data from the question, not generic statements

### Format Required:
```html
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
[SPECIFIC explanation referencing actual question content]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice X:</strong> [SPECIFIC reason]</div>
...
</div>
</div>
```

## Files Created

### Data Files
- `diagnostic_questions_full.json` - All 215 questions with passages
- `export_math_questions.json` - Math questions (60)
- `export_english_questions.json` - English questions (75)
- `export_reading_questions.json` - Reading questions (40)
- `export_science_questions.json` - Science questions (40)

### Script Files
- `COMPLETE_SPECIFIC_EXPLANATIONS.js` - Main explanation storage and upload script
- `generate_all_215_explanations.js` - Template generator
- `batch_explanation_writer.js` - Batch processing utilities

## Next Steps

### Option 1: Manual Writing (Most Specific)
1. Edit `COMPLETE_SPECIFIC_EXPLANATIONS.js`
2. Add each explanation to the `ALL_EXPLANATIONS` object
3. Use the `makeExplanation(correct, wrong)` helper
4. Run `node COMPLETE_SPECIFIC_EXPLANATIONS.js upload`

### Option 2: Batch Approach
Given the volume (215 questions), you could:
1. Use the exported JSON files to review questions systematically
2. Write explanations in batches by subject
3. Test upload small batches to verify formatting
4. Continue until all 215 are complete

## Example of Good vs. Bad Explanations

### ❌ BAD (Too Generic)
```
Correct: "This choice correctly structures the sentence."
Wrong A: "Creates a grammar error."
Wrong B: "Incorrect structure."
```

### ✅ GOOD (Highly Specific)
```
Correct: "Substitute x = 3 and y = 2 into f(x,y) = 3x² − 4y:
f(3,2) = 3(9) − 8 = 27 − 8 = 19."

Wrong A (0): "Getting 0 would require 3(3)² − 4(2) to equal zero,
but 27 − 8 = 19, not 0."

Wrong B (10): "Getting 10 might result from errors like calculating
3(3) − 4(2) = 9 − 8 = 1, then making additional mistakes."
```

## Database Schema
Tables to update:
- `practice_test_english_questions` (75 questions)
- `practice_test_math_questions` (60 questions)
- `practice_test_reading_questions` (40 questions)
- `practice_test_science_questions` (40 questions)

Field to update: `explanation` (text field)

## Testing
After writing explanations, verify by:
1. Run count: `node COMPLETE_SPECIFIC_EXPLANATIONS.js count`
2. Test upload: `node COMPLETE_SPECIFIC_EXPLANATIONS.js upload`
3. Check database to verify HTML formatting is correct
4. Review a few samples in the actual application

## Time Estimate
- Per explanation: ~3-5 minutes (analysis + writing)
- Total: 215 × 4 min avg = 860 minutes = ~14-15 hours of focused work

## Recommendation
Given the volume and specificity requirements, this is best approached as:
1. Start with Math (most straightforward - 60 questions)
2. Then Science (40 questions with data interpretation)
3. Then Reading (40 questions with passage reference)
4. Finally English (75 questions with grammar nuances)

Work in batches of 10-15 questions, test upload, verify, continue.
