# ACT Diagnostic Test Explanation Regeneration - Complete Setup

## Overview

All 215 diagnostic test questions need their explanations regenerated in a cleaner format that includes:
1. **WHY the correct answer is right** (currently missing!)
2. **Why each wrong answer is wrong** (already exists, but needs better formatting)

## Current Status

✅ All 215 questions fetched from Supabase
✅ Python script created and tested
✅ Virtual environment set up with required packages
✅ Database structure verified
✅ All helper scripts created

⏳ **Ready to run** - just need your Anthropic API key!

## Question Breakdown

- **English**: 75 questions (practice_test_english_questions)
- **Math**: 60 questions (practice_test_math_questions)
- **Reading**: 40 questions (practice_test_reading_questions)
- **Science**: 40 questions (practice_test_science_questions)
- **Total**: 215 diagnostic test questions (test_number = 1)

## New Format Example

### Before (Current):
```html
<div>
<strong style="font-size: 0.875rem;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Creates a comma splice.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Also creates a comma splice...</div>
<div><strong>Choice D:</strong> Creates a comma splice as well.</div>
</div>
</div>
```

### After (New Format):
```html
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
This choice correctly uses a subordinating phrase "Of the thousands" to create a
dependent clause that connects properly to the main clause, avoiding the comma
splice error that occurs when two independent clauses are joined with only a comma.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Creates a comma splice by connecting two independent clauses with only a comma.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Also creates a comma splice - "Scientists say thousands..." is still an independent clause joined improperly.</div>
<div><strong>Choice D:</strong> Creates a comma splice as "Thousands of new animal species are..." is a complete independent clause.</div>
</div>
</div>
```

## How to Run

### Quick Method (Recommended):
```bash
cd /Users/cadenchiang/Desktop/act-prep-react
export ANTHROPIC_API_KEY='your-api-key-here'
./run_regenerate.sh
```

### Manual Method:
```bash
cd /Users/cadenchiang/Desktop/act-prep-react
source venv/bin/activate
export ANTHROPIC_API_KEY='your-api-key-here'
python3 generate_explanations.py
```

### Verify Results:
```bash
node verify_explanations.js
```

## Files Created

### Main Files:
- **`generate_explanations.py`** - Main regeneration script (processes all 215 questions)
- **`run_regenerate.sh`** - Quick start script (recommended way to run)
- **`diagnostic_questions.json`** - All 215 questions exported from database

### Helper Files:
- **`verify_explanations.js`** - Check how many explanations are complete
- **`view_explanation.js`** - View a single explanation in detail
- **`check_structure.js`** - Examine database structure
- **`regenerate_batch.js`** - Original Node.js attempt (use Python instead)

### Documentation:
- **`RUN_THIS.md`** - Detailed step-by-step instructions
- **`README_REGENERATE.md`** - Technical documentation
- **`EXPLANATION_REGENERATION_SUMMARY.md`** - This file!

### Environment:
- **`venv/`** - Python virtual environment with `anthropic` and `supabase` installed

## What the Script Does

1. **Connects** to Supabase using provided credentials
2. **Fetches** all 215 diagnostic test questions (test_number = 1)
3. For each question:
   - Extracts question text, choices, and correct answer
   - Generates a comprehensive explanation using Claude API
   - Formats it with proper HTML/inline styles
   - Updates the database immediately
4. **Shows progress** after each question (e.g., "English: 25/75 complete")
5. **Prints summary** when complete

## Time Estimate

- ~1-2 seconds per question (with API rate limiting built in)
- **Total time: 4-5 minutes for all 215 questions**

## Key Features

✅ **Automatic database updates** - No manual upload needed
✅ **Progress tracking** - See real-time progress
✅ **Error handling** - Continues even if some questions fail
✅ **Rate limiting** - Respects API limits (1 second between requests)
✅ **Subject-specific** - Tailors explanations to English/Math/Reading/Science
✅ **Format compliance** - Matches exact HTML format requirement

## Supabase Credentials (Already Configured)

```
URL: https://rabavobdklnwvwsldbix.supabase.co
Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

These are already in the script - no need to change anything!

## Next Steps

1. Get your Anthropic API key from https://console.anthropic.com/settings/keys
2. Run the script using one of the methods above
3. Wait 4-5 minutes while it processes all 215 questions
4. Verify the results with `node verify_explanations.js`
5. Test in your UI to see the new format

## Troubleshooting

### "Could not resolve authentication method"
→ Make sure you exported ANTHROPIC_API_KEY before running

### "Module not found"
→ Make sure you activated the virtual environment: `source venv/bin/activate`

### "Connection error"
→ Check your internet connection and Supabase credentials

### Script stops mid-way
→ Just run it again - it will skip already-completed questions (though it will regenerate them)

## Contact

If you have any issues, the script provides detailed error messages for each failed question while continuing to process the rest.

---

**Ready to run!** Just export your API key and execute `./run_regenerate.sh`
