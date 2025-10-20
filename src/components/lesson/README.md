# Lesson Component System 📚

## Overview

This directory contains the **Component-Based Lesson System** - a structured approach to rendering lesson content using React components instead of hardcoded HTML.

## 🎯 Why Components?

**Before**: Lessons stored as HTML strings, hard to maintain
```html
"<p>The <strong style='color:#2563eb'>backsolving</strong> strategy...</p>"
```

**After**: Lessons stored as JSON, rendered by components
```json
{
  "type": "paragraph",
  "text": "The {backsolving} strategy...",
  "keyTerms": ["backsolving"]
}
```

## 📁 Directory Structure

```
lesson/
├── README.md                           # This file
├── LessonRenderer.jsx                  # Main component that renders JSON
├── elements/                           # Individual lesson element components
│   ├── LessonParagraph.jsx            # Text paragraphs
│   ├── LessonHeading.jsx              # H3/H4 headings
│   ├── LessonList.jsx                 # Bullet lists
│   ├── LessonExample.jsx              # Example problems
│   ├── MultipleChoice.jsx             # A-E answer choices
│   ├── CollapsibleSolution.jsx        # Expandable solutions
│   ├── SolutionStep.jsx               # Individual solution steps
│   ├── KeyTakeaways.jsx               # Summary section
│   └── KeyTerm.jsx                    # Blue underlined terms
└── styles/
    └── lessonComponents.styles.js     # Shared JSS styles
```

## 🚀 Quick Start

### Using the Lesson Renderer

```jsx
import { LessonRenderer } from './components/lesson/LessonRenderer';

// Your lesson data (from Supabase)
const lessonData = {
  version: "1.0.0",
  content: [
    {
      type: "paragraph",
      text: "The {backsolving} strategy is powerful.",
      keyTerms: ["backsolving"]
    },
    {
      type: "heading",
      level: 3,
      text: "1. What Is Backsolving?"
    }
  ]
};

// Render it
<LessonRenderer data={lessonData} />
```

## 📦 Available Components

### 1. LessonParagraph
**Purpose**: Renders text paragraphs with optional key terms

**Props**:
```typescript
{
  text: string;           // The paragraph text
  keyTerms?: string[];    // Terms to highlight (optional)
}
```

**Example**:
```jsx
<LessonParagraph
  text="The {backsolving} strategy..."
  keyTerms={["backsolving"]}
/>
```

---

### 2. LessonHeading
**Purpose**: Renders section headings (H3 or H4)

**Props**:
```typescript
{
  level: 3 | 4;     // Heading level
  text: string;     // Heading text
}
```

**Example**:
```jsx
<LessonHeading level={3} text="1. What Is Backsolving?" />
```

---

### 3. LessonList
**Purpose**: Renders bullet point lists (supports nesting)

**Props**:
```typescript
{
  items: Array<{
    text: string;
    nested?: Array<string>;
  }>;
}
```

**Example**:
```jsx
<LessonList items={[
  {
    text: "Key advantages:",
    nested: ["Faster than algebra", "Less mistakes"]
  }
]} />
```

---

### 4. LessonExample
**Purpose**: Renders a complete example problem

**Props**:
```typescript
{
  title: string;
  problem: string;
  choices: Array<{ letter: string; value: string }>;
  solution: {
    steps: Array<{
      attempt: string;
      work: string[];
      result: "correct" | "incorrect";
    }>;
    answer: string;
  };
}
```

**Example**:
```jsx
<LessonExample
  title="Example 1: Basic Backsolving"
  problem="If √x + 10 − 2√x − 2 = 0, what is x?"
  choices={[
    { letter: "A", value: "2" },
    { letter: "B", value: "6" }
  ]}
  solution={{
    steps: [...],
    answer: "B"
  }}
/>
```

---

### 5. CollapsibleSolution
**Purpose**: Expandable solution section

**Props**:
```typescript
{
  steps: Array<{
    attempt: string;
    work: string[];
    result: "correct" | "incorrect";
  }>;
  answer: string;
}
```

---

### 6. KeyTakeaways
**Purpose**: Summary section with checkmarks

**Props**:
```typescript
{
  items: string[];
}
```

**Example**:
```jsx
<KeyTakeaways items={[
  "Backsolving tests answer choices",
  "Start with B or C"
]} />
```

## 🔧 Adding New Component Types

### Step 1: Create Component File

Create `elements/YourNewComponent.jsx`:

```jsx
/**
 * YourNewComponent - Brief description
 *
 * Purpose: What this component does
 *
 * Props:
 * - prop1 (type): Description
 * - prop2 (type): Description
 *
 * Example:
 * <YourNewComponent prop1="value" prop2="value" />
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    // Your styles here
  }
});

export const YourNewComponent = ({ prop1, prop2 }) => {
  const classes = useStyles();

  console.log('🎨 Rendering YourNewComponent:', { prop1, prop2 });

  return (
    <div className={classes.root}>
      {/* Your JSX */}
    </div>
  );
};

YourNewComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.string
};

YourNewComponent.defaultProps = {
  prop2: 'default value'
};
```

### Step 2: Add to LessonRenderer

In `LessonRenderer.jsx`, add your component case:

```jsx
import { YourNewComponent } from './elements/YourNewComponent';

// In the switch statement:
case 'your_new_component':
  console.log('📘 Rendering your_new_component block:', block);
  return <YourNewComponent key={index} {...block} />;
```

### Step 3: Update JSON Schema

In `schemas/lessonContent.schema.js`:

```javascript
{
  type: 'your_new_component',
  required: ['prop1'],
  properties: {
    prop1: { type: 'string' },
    prop2: { type: 'string' }
  }
}
```

### Step 4: Test It

```jsx
const testData = {
  version: "1.0.0",
  content: [
    {
      type: 'your_new_component',
      prop1: 'test value',
      prop2: 'another value'
    }
  ]
};

<LessonRenderer data={testData} />
```

## 🐛 Debugging

### Enable Detailed Logging

All components log their render with emoji prefixes:
- 📘 LessonRenderer
- 📝 LessonParagraph
- 🎯 LessonExample
- ✅ KeyTakeaways
- etc.

Check browser console for detailed logs:
```
📘 Rendering lesson content with 15 blocks
📝 Rendering paragraph with 2 key terms
🎯 Rendering example: Example 1: Basic Backsolving
```

### Common Issues

**Issue**: Component not rendering
- ✓ Check `type` matches exactly in switch statement
- ✓ Verify JSON structure matches propTypes
- ✓ Look for console errors

**Issue**: Styles not applying
- ✓ Import `makeStyles` from `@mui/styles`
- ✓ Call `useStyles()` hook in component
- ✓ Apply className to elements

## 📊 Migration from HTML

See: `/migrations/convertLessonsToComponents.js`

This script converts existing HTML lessons to JSON format.

## 🎨 Styling Guidelines

1. **Use JSS** (makeStyles) for all styling
2. **No inline styles** except dynamic values
3. **Consistent spacing**: Use rem units
4. **Colors**: Reference theme colors
5. **Responsive**: Mobile-first approach

## 🧪 Testing

```bash
# Test converter
node migrations/convertLessonsToComponents.js --dry-run --lesson-id=LESSON_ID

# Test renderer
npm test -- LessonRenderer.test.js
```

## 📚 Resources

- [JSS Documentation](https://cssinjs.org/)
- [PropTypes Guide](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [Component Best Practices](https://react.dev/learn/thinking-in-react)

## 💡 Tips for Future Development

1. **Always add console.log** at component start
2. **Validate props** with PropTypes
3. **Document examples** in component comments
4. **Test with real data** before deploying
5. **Keep components small** (<150 lines)
6. **One component per file**
7. **Export named** (not default)

---

**Last Updated**: 2025-10-18
**Maintainer**: ACT Prep Team
**Questions?**: See /docs/COMPONENT_BASED_LESSONS_ROADMAP.md
