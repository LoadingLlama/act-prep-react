# ACT Diagnostic Test - Explanation Generation Guide

## Overview

This guide explains how to generate highly specific explanations for all 215 diagnostic test questions.

## Files Created

1. **all_diagnostic_questions.json** - All 215 questions from the database
2. **all_passages.json** - All 15 passages referenced by questions
3. **generate_all_explanations_complete.js** - Main generation script
4. **SAMPLE_EXPLANATIONS.md** - Examples of high-quality explanations

## Requirements

- Node.js with @anthropic-ai/sdk and @supabase/supabase-js
- Anthropic API key
- Supabase credentials (already in script)

## Running the Generator

### Step 1: Set your API key
```bash
export ANTHROPIC_API_KEY="your-key-here"
```

### Step 2: Navigate to project directory
```bash
cd /Users/cadenchiang/Desktop/act-prep-react
```

### Step 3: Run the script
```bash
node generate_all_explanations_complete.js
```

## What the Script Does

1. Loads all 215 questions and 15 passages
2. For each question:
   - Generates a highly specific explanation using Claude API
   - Formats explanation in required HTML format
   - Updates the database
   - Reports progress
3. Reports every 25 questions
4. Saves sample explanations for verification

## Expected Output

```
================================================================================
ACT DIAGNOSTIC TEST - EXPLANATION GENERATOR
================================================================================

Loading questions and passages...
Loaded: 215 questions, 15 passages

Breakdown:
  english   : 75 questions
  math      : 60 questions
  reading   : 40 questions
  science   : 40 questions

================================================================================
STARTING GENERATION...
================================================================================

### ENGLISH (75 questions) ###

  [1/75] Q#1... OK
  [2/75] Q#2... OK
  ...

--- PROGRESS: 25/215 (25 OK, 0 failed) ---

...

================================================================================
COMPLETED: 215/215 successful, 0 failed
================================================================================
```

## Quality Standards

Each explanation MUST have:

### Section 1: Why the Correct Answer is Right
- **SPECIFIC** - Reference actual text, numbers, or content
- **DETAILED** - Explain the grammatical concept, mathematical reasoning, or textual evidence
- **CONCRETE** - Avoid generic phrases like "most grammatically sound"

### Section 2: Why Each Wrong Answer is Wrong
- Address **EVERY** incorrect choice by letter
- Explain the **SPECIFIC** error in each
- Reference the exact issue (comma splice, wrong calculation, etc.)

## HTML Format

```html
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
[Specific explanation of why correct answer works]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> [Specific reason]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> [Specific reason]</div>
<div><strong>Choice D:</strong> [Specific reason]</div>
</div>
</div>
```

## Estimated Time

- **Per question**: ~5-10 seconds (API call + database update)
- **Total time**: ~20-35 minutes for all 215 questions

## Cost Estimate

- Model: claude-sonnet-4-5-20250929
- Avg tokens per explanation: ~1,500 tokens
- Total: ~322,500 tokens
- Estimated cost: ~$5-6 USD

## Troubleshooting

### "API key not set"
```bash
export ANTHROPIC_API_KEY="your-key-here"
node generate_all_explanations_complete.js
```

### "Cannot find module"
```bash
npm install
```

### Database connection errors
- Check Supabase URL and key in script
- Verify network connection

## Verification

After completion:
1. Check `sample_explanations.json` for quality
2. Verify count in database matches 215
3. Spot-check random questions for specificity

## Manual Alternative

If you prefer to generate explanations manually or in batches:

1. Questions are organized in `./batches/` directory (22 batches of 10 questions each)
2. Process one batch at a time
3. Use the prompt template from the script
4. Update database manually or use the update function

