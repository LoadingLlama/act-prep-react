# How to Regenerate All 215 Explanations

## Current Status
All 215 diagnostic test questions already have explanations, but they're MISSING the first part that explains WHY the correct answer is RIGHT. They only show why wrong answers are wrong.

## What You Need to Do

Run the Python script with your Anthropic API key to regenerate all explanations in the correct format.

### Step 1: Get Your API Key
Get your Anthropic API key from: https://console.anthropic.com/settings/keys

### Step 2: Run the Script

```bash
cd /Users/cadenchiang/Desktop/act-prep-react

# Activate the virtual environment (already created)
source venv/bin/activate

# Set your API key (replace with your actual key)
export ANTHROPIC_API_KEY="sk-ant-..."

# Run the script
python3 generate_explanations.py
```

### Step 3: Monitor Progress

The script will show progress like:
```
=== Processing English (practice_test_english_questions) ===
Found 75 diagnostic test questions
Processing question 1...
English: 1/75 complete
Processing question 2...
English: 2/75 complete
...
```

### Expected Output

Each explanation will be regenerated in this format:

```html
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
This choice correctly uses a subordinating phrase to connect the two clauses,
avoiding the comma splice error present in the other options.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Creates a comma splice.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Also creates a comma splice...</div>
<div><strong>Choice D:</strong> Creates a comma splice as well.</div>
</div>
</div>
```

### Time Estimate
- ~1-2 seconds per question (with API rate limiting)
- Total time: approximately 4-5 minutes for all 215 questions

### Verify Results

After completion, run:
```bash
node verify_explanations.js
```

This will show you how many questions have been updated and display sample explanations.

### Question Breakdown
- English: 75 questions
- Math: 60 questions
- Reading: 40 questions
- Science: 40 questions
- **Total: 215 questions**

## Files Created

All necessary files are ready:
- ✅ `generate_explanations.py` - Main script (ready to run)
- ✅ `diagnostic_questions.json` - All 215 questions
- ✅ `verify_explanations.js` - Verification script
- ✅ `venv/` - Python virtual environment with packages installed

## Troubleshooting

If you get "authentication method" error:
1. Make sure you exported the API key: `echo $ANTHROPIC_API_KEY`
2. Make sure it starts with `sk-ant-`
3. Make sure the virtual environment is activated (you should see `(venv)` in your prompt)

## What Happens

The script will:
1. Connect to your Supabase database
2. Fetch each diagnostic test question
3. Use Claude (via Anthropic API) to generate a complete explanation
4. Update the database with the new explanation
5. Show progress for each question
6. Print a summary at the end

All changes are saved directly to your Supabase database automatically.
