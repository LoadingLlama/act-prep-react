# ACT Explanation Generation Project

## Overview
This project generates comprehensive explanations for 140 ACT diagnostic test questions.

## Task Breakdown
- **Math Questions**: 60 explanations
- **Reading Questions**: 40 explanations
- **Science Questions**: 40 explanations
- **Total**: 140 explanations

## Explanation Format
Each explanation follows this HTML structure:

```html
<div style="margin-bottom: 0.75rem;">
<strong style="color: #10b981; font-size: 0.875rem;">Correct Answer: [LETTER]</strong>
<div style="margin-top: 0.25rem; line-height: 1.6;">[Detailed explanation]</div>
</div>

<div>
<strong style="font-size: 0.875rem;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6;">
<div style="margin-bottom: 0.375rem;"><strong>Choice [A]:</strong> [Reason]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice [B]:</strong> [Reason]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice [C]:</strong> [Reason]</div>
<div><strong>Choice [D]:</strong> [Reason]</div>
</div>
</div>
```

## Status
Given the scope (140 detailed, subject-specific explanations), this requires either:
1. A systematic AI-powered generation process
2. Manual creation by subject matter experts
3. A hybrid approach

## Files
- `data/math-questions.json` - All 60 math questions
- `data/reading-questions.json` - All 40 reading questions
- `data/science-questions.json` - All 40 science questions
- `data/reading-passages.json` - 4 reading passages
- `data/science-passages.json` - 6 science passages

## Next Steps
The practical path forward is to use an AI system to generate high-quality explanations systematically, with review and refinement as needed.
