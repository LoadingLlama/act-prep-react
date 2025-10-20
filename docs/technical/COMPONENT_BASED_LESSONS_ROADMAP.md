# Component-Based Lessons System - Implementation Roadmap

## 🎯 Goal
Convert lessons from hardcoded HTML strings to structured JSON + React components for:
- **Consistency**: All styling in one place
- **Maintainability**: Easy to update across all lessons
- **Extensibility**: Future AIs can easily add new component types
- **Type Safety**: Validate lesson structure
- **Analytics**: Track student interactions

## 📊 Content Analysis (from Backsolving Lesson)

### Identified Content Types:
1. **Paragraph** - Text with optional key terms (blue underlined)
2. **Heading Level 3** - Major section titles (e.g., "1. What Is Backsolving?")
3. **Heading Level 4** - Subsection titles (e.g., "Step 1: Strategic Starting")
4. **Bullet List** - Nested lists
5. **Example** - Problem + Multiple Choice + Collapsible Solution
6. **Key Takeaways** - Special section with checkmarks
7. **Key Term** - Blue underlined term with hover definition

## 🏗️ Architecture

### File Structure:
```
src/
├── components/
│   └── lesson/
│       ├── README.md                    # 📘 Component usage guide
│       ├── LessonRenderer.jsx           # Main renderer
│       ├── elements/
│       │   ├── LessonParagraph.jsx      # <p> with key terms
│       │   ├── LessonHeading.jsx        # H3/H4 headings
│       │   ├── LessonList.jsx           # Bullet lists
│       │   ├── LessonExample.jsx        # Example problems
│       │   ├── MultipleChoice.jsx       # Answer choices A-E
│       │   ├── CollapsibleSolution.jsx  # Expandable solution
│       │   ├── SolutionStep.jsx         # Individual solution step
│       │   ├── KeyTakeaways.jsx         # Takeaways section
│       │   └── KeyTerm.jsx              # Blue underlined term
│       └── styles/
│           └── lessonComponents.styles.js  # JSS styles
├── schemas/
│   └── lessonContent.schema.js          # JSON schema validation
├── utils/
│   └── lessonConverter.js               # HTML → JSON converter
└── migrations/
    └── convertLessonsToComponents.js    # Migration script
```

### JSON Schema Example:
```json
{
  "version": "1.0.0",
  "lessonId": "06685249-874d-431f-9b7f-1c711d64a9cf",
  "content": [
    {
      "type": "paragraph",
      "text": "The {working backwards} strategy...",
      "keyTerms": ["working backwards", "backsolving"]
    },
    {
      "type": "heading",
      "level": 3,
      "text": "1. What Is Backsolving?"
    },
    {
      "type": "example",
      "title": "Example 1: Basic Backsolving",
      "problem": "If √x + 10 − 2√x − 2 = 0, what is the value of x?",
      "choices": [
        { "letter": "A", "value": "2" },
        { "letter": "B", "value": "6" },
        { "letter": "C", "value": "14" },
        { "letter": "D", "value": "18" },
        { "letter": "E", "value": "22" }
      ],
      "solution": {
        "steps": [
          {
            "attempt": "Start with C (14)",
            "work": ["√14 + 10 − 2√14 − 2", "= √24 − 2√12", "≈ 4.9 − 6.9", "≠ 0"],
            "result": "incorrect"
          },
          {
            "attempt": "Try B (6)",
            "work": ["√6 + 10 − 2√6 − 2", "= √16 − 2√4", "= 4 − 2(2)", "= 4 − 4", "= 0"],
            "result": "correct"
          }
        ],
        "answer": "B"
      }
    }
  ]
}
```

## ✅ Implementation Steps

### Phase 1: Component Library (Today)
- [ ] Create component directory structure
- [ ] Build all lesson components with JSS
- [ ] Add prop validation
- [ ] Document each component

### Phase 2: Schema & Validation (Today)
- [ ] Define JSON schema
- [ ] Add validation function
- [ ] Create TypeScript types

### Phase 3: Converter (Today)
- [ ] Build HTML → JSON parser
- [ ] Add validation
- [ ] Test with backsolving lesson

### Phase 4: Renderer (Today)
- [ ] Create LessonRenderer component
- [ ] Replace dangerouslySetInnerHTML
- [ ] Test rendering

### Phase 5: Testing (Today)
- [ ] Test in sandbox (new field in DB)
- [ ] Verify all components render correctly
- [ ] Check collapsible solution works
- [ ] Compare side-by-side with old HTML

### Phase 6: Migration (When approved)
- [ ] Backup database
- [ ] Run migration script with dry-run
- [ ] Apply to production
- [ ] Verify all lessons

## 🔧 For Future AIs

### Adding New Component Types:

1. **Create Component**: `src/components/lesson/elements/YourComponent.jsx`
   ```jsx
   // COMPONENT TEMPLATE - Copy this for new components
   import React from 'react';
   import { makeStyles } from '@mui/styles';

   const useStyles = makeStyles({
     // Your styles here
   });

   export const YourComponent = ({ data }) => {
     const classes = useStyles();
     return <div className={classes.root}>{/* Your JSX */}</div>;
   };
   ```

2. **Add to Schema**: `src/schemas/lessonContent.schema.js`
   ```javascript
   {
     type: 'your_component',
     properties: { /* your fields */ }
   }
   ```

3. **Add to Renderer**: `src/components/lesson/LessonRenderer.jsx`
   ```javascript
   case 'your_component':
     return <YourComponent key={index} data={block} />;
   ```

4. **Update Converter** (if migrating from HTML): Add parsing logic

## 📝 Logging Strategy

All scripts will log:
- ✓ Success messages (green)
- ℹ Info messages (blue)
- ⚠ Warning messages (yellow)
- ✗ Error messages (red)
- 📊 Progress bars for batch operations
- 💾 Backup confirmations
- 🔍 Validation results

## 🚀 Next Steps

Run: `node migrations/convertLessonsToComponents.js --dry-run`

This will show you what will change without modifying the database.
