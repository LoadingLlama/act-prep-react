# Regenerating ACT Test Explanations

This guide explains how to regenerate all 215 diagnostic test explanations in the clean new format.

## Prerequisites

1. Python 3 with `anthropic` and `supabase` packages installed
2. Your Anthropic API key

## Setup

1. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
pip install anthropic supabase
```

## Running the Script

Export your Anthropic API key and run the script:

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
source venv/bin/activate
python3 generate_explanations.py
```

The script will:
- Process all 215 diagnostic test questions (test_number = 1)
- Generate explanations in the new format for each question
- Update the Supabase database automatically
- Show progress as it runs (e.g., "English: 25/75 complete")

## Time Estimate

- ~1 second per question (rate limiting)
- Total time: approximately 3-4 minutes for all 215 questions

## New Format

The explanations follow this structure:

```html
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
[Direct explanation of why the correct answer is right, without stating the letter]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> [Why wrong]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> [Why wrong]</div>
<div><strong>Choice D:</strong> [Why wrong]</div>
</div>
</div>
```

## Files

- `generate_explanations.py` - Main script that generates and uploads explanations
- `diagnostic_questions.json` - All 215 questions (for reference)
- `check_structure.js` - Utility to view database structure

## Troubleshooting

If you see "Could not resolve authentication method", make sure:
1. Your API key is exported: `echo $ANTHROPIC_API_KEY`
2. You're running from the activated virtual environment
3. The API key is valid

## Database Tables

- `practice_test_english_questions` - 75 questions
- `practice_test_math_questions` - 60 questions
- `practice_test_reading_questions` - 40 questions
- `practice_test_science_questions` - 40 questions

Total: 215 diagnostic test questions
