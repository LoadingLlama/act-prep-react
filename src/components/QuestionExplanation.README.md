# QuestionExplanation Component

A reusable React component for displaying question answer status and explanations with clean, professional styling.

## Overview

The `QuestionExplanation` component provides a consistent, well-designed interface for showing:
- Answer status (correct, incorrect, or not answered)
- Main explanation text
- "Why Other Answers Are Wrong" breakdown
- Clean typography and visual hierarchy

## Current Integration Status

### ✅ Completed
- **Component Created**: `QuestionExplanation.js` with full JSS styling
- **CSS Styling Updated**: `practice-test.html` has matching CSS for diagnostic test review
- **Example Created**: `QuestionExplanation.example.jsx` demonstrates usage

### 📝 Note on Diagnostic Test Review
The diagnostic test review currently uses `practice-test.html` loaded in an iframe. Since this is a standalone HTML file (not part of the React app), it cannot directly use React components. However, the CSS styling in `practice-test.html` has been updated to match the QuestionExplanation component design.

## Usage

```jsx
import QuestionExplanation from './components/QuestionExplanation';

<QuestionExplanation
  userAnswer="B"           // User's selected answer (A, B, C, etc.) or null if not answered
  correctAnswer="A"        // The correct answer letter
  explanation={htmlString} // HTML explanation string from database
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `userAnswer` | `string \| null` | Yes | The user's selected answer (e.g., "A", "B") or null if not answered |
| `correctAnswer` | `string` | Yes | The correct answer letter |
| `explanation` | `string` | Yes | HTML explanation string from database |

## Explanation Format

The component expects explanations in this HTML format:

```html
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
Main explanation text goes here.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Reason why A is wrong.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Reason why B is wrong.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice C:</strong> Reason why C is wrong.</div>
</div>
</div>
```

## Styling Features

- **Clean Typography**: Uses system fonts with optimized line-height and spacing
- **Status Indicators**: Color-coded status badges (green for correct, red for incorrect, yellow for not answered)
- **Responsive Design**: Adapts to different screen sizes
- **Accessible**: Clear visual hierarchy and semantic HTML

## Future Integration Opportunities

This component can be integrated into:
1. Any React-based question/quiz interfaces
2. Practice session results screens
3. Custom diagnostic test implementations
4. Interactive lesson examples

If you want to migrate the diagnostic test review from iframe-based HTML to a full React implementation, this component is ready to use.

## Related Files

- `QuestionExplanation.js` - Main component
- `QuestionExplanation.example.jsx` - Usage examples
- `public/tests/practice-test.html` - Diagnostic test with matching CSS styling
- `DiagnosticTestReview.jsx` - Loads diagnostic test in iframe

## Design Decisions

### Why JSS?
The component uses `react-jss` for styling to:
- Keep styles scoped and maintainable
- Enable dynamic styling based on status
- Match existing project styling patterns

### Status Colors
- **Correct**: Green (#10b981) - Positive reinforcement
- **Incorrect**: Red (#ef4444) - Clear error indication
- **Not Answered**: Yellow/Orange (#f59e0b) - Neutral warning

### Typography
- Main text: 0.9375rem (15px) for comfortable reading
- Header: 0.6875rem (11px) uppercase for clear labeling
- Line height: 1.6 for readability
