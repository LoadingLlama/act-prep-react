# Component-Based Lessons - Quick Start Guide 🚀

## What is This?

A **super easy** system to create and manage lessons using React components instead of hardcoded HTML.

**Before**: Messy HTML strings
**After**: Clean JSON + Beautiful React components

---

## For Non-Technical Users

### Creating a New Lesson (3 Easy Steps)

**Step 1**: Copy the template
```bash
cp docs/LESSON_TEMPLATE.txt docs/my-new-lesson.txt
```

**Step 2**: Edit the file in any text editor
- Use `##` for section headings
- Use `-` for bullet points
- Use `{term}` for key terms (they'll be blue and clickable)
- Follow the examples in the template

**Step 3**: Upload it
```bash
node scripts/upload-lesson.js docs/my-new-lesson.txt
```

That's it! Your lesson is uploaded and ready.

---

## For Developers

### Testing the System

```bash
# Test everything
node scripts/test-lesson-system.js

# Test with specific lesson
node scripts/test-lesson-system.js --lesson-id=LESSON_ID
```

### Migrating Existing HTML Lessons

**Automated Migration** (Recommended):
```bash
# Preview migration
node scripts/migrate-lessons.js --lesson-id=LESSON_ID --dry-run

# Migrate single lesson
node scripts/migrate-lessons.js --lesson-id=LESSON_ID

# Migrate all lessons
node scripts/migrate-lessons.js --all
```

**Manual Conversion**:
```javascript
const { convertHtmlToJson } = require('./src/utils/lessonConverter');
const jsonContent = convertHtmlToJson(htmlString, lessonId);
```

See `docs/technical/MIGRATION_GUIDE.md` for complete migration instructions.

### Using the Lesson Renderer

```jsx
import { LessonRenderer } from './components/lesson/LessonRenderer';

<LessonRenderer data={lessonData} />
```

### Adding New Component Types

1. Create component in `src/components/lesson/elements/YourComponent.jsx`
2. Import it in `LessonRenderer.jsx`
3. Add case in the switch statement
4. Update schema in `src/schemas/lessonContent.schema.js`

See: `src/components/lesson/README.md` for full details

---

## File Structure

```
src/
├── components/lesson/
│   ├── LessonRenderer.jsx         # Main renderer
│   ├── elements/                  # Individual components
│   │   ├── LessonParagraph.jsx
│   │   ├── LessonHeading.jsx
│   │   ├── LessonList.jsx
│   │   ├── LessonExample.jsx
│   │   ├── MultipleChoice.jsx
│   │   ├── CollapsibleSolution.jsx
│   │   ├── SolutionStep.jsx
│   │   └── KeyTakeaways.jsx
│   └── styles/
│       └── lessonComponents.styles.js
├── schemas/
│   └── lessonContent.schema.js
└── utils/
    └── lessonConverter.js

scripts/
├── upload-lesson.js           # Upload new lessons
├── test-lesson-system.js      # Test everything
├── migrate-lessons.js         # Migrate HTML → JSON
├── verify-migration.js        # Verify DB setup
└── migrations/
    └── add-json-migration-columns.sql

docs/
├── guides/
│   └── QUICK_START_GUIDE.md   # This file
├── technical/
│   ├── MIGRATION_GUIDE.md     # Migration instructions
│   ├── COMPONENT_SYSTEM_SUMMARY.md
│   └── COMPONENT_BASED_LESSONS_ROADMAP.md
├── templates/
│   └── LESSON_TEMPLATE.txt    # Template for new lessons
└── TEST_CONVERTED_LESSON.json # Test output
```

---

## Lesson JSON Format

```json
{
  "version": "1.0.0",
  "lessonId": "uuid-here",
  "content": [
    {
      "type": "paragraph",
      "text": "Use {key terms} like this.",
      "keyTerms": ["key terms"]
    },
    {
      "type": "heading",
      "level": 3,
      "text": "Section Title"
    },
    {
      "type": "list",
      "items": [
        "Simple item",
        {
          "text": "Item with nested list",
          "nested": ["Nested 1", "Nested 2"]
        }
      ]
    },
    {
      "type": "example",
      "title": "Example 1: Title",
      "problem": "Problem text",
      "choices": [
        { "letter": "A", "value": "Choice A" },
        { "letter": "B", "value": "Choice B" }
      ],
      "solution": {
        "steps": [
          {
            "attempt": "Try A",
            "work": ["Step 1", "Step 2"],
            "result": "incorrect"
          }
        ],
        "answer": "B"
      }
    },
    {
      "type": "key_takeaways",
      "items": ["Takeaway 1", "Takeaway 2"]
    }
  ]
}
```

---

## Common Tasks

### Upload a lesson from text file
```bash
node scripts/upload-lesson.js docs/templates/my-lesson.txt
```

### Test the system
```bash
node scripts/test-lesson-system.js
```

### Migrate existing lessons
```bash
# Preview migration
node scripts/migrate-lessons.js --all --dry-run

# Migrate all lessons
node scripts/migrate-lessons.js --all

# Rollback if needed
node scripts/migrate-lessons.js --rollback=LESSON_ID
```

### Convert HTML to JSON (manual)
```javascript
const { convertHtmlToJson } = require('./src/utils/lessonConverter');
const json = convertHtmlToJson(htmlString, lessonId);
```

### Validate lesson JSON
```javascript
const { validateLessonContent } = require('./src/schemas/lessonContent.schema');
const { valid, errors } = validateLessonContent(lessonData);
```

---

## Troubleshooting

### "Module not found" error
```bash
npm install
```

### "Invalid lesson data" error
- Check the JSON structure matches the schema
- Run validation: `validateLessonContent(data)`
- Look at `docs/TEST_CONVERTED_LESSON.json` for reference

### Components not rendering
- Check browser console for error messages
- Verify JSON structure with schema
- Ensure all required props are present

### Upload fails
- Check database connection
- Verify `.env` file has correct credentials
- Try dry-run first: `node scripts/test-lesson-system.js`

---

## Best Practices

1. **Always test first**: Run `node scripts/test-lesson-system.js`
2. **Use the template**: Copy `docs/LESSON_TEMPLATE.txt`
3. **Validate early**: Check JSON before uploading
4. **Keep components small**: Each lesson block = one component
5. **Log everything**: All components log their render

---

## Need Help?

1. **Quick Start**: This file (`docs/guides/QUICK_START_GUIDE.md`)
2. **Migration**: `docs/technical/MIGRATION_GUIDE.md`
3. **Component System**: `docs/technical/COMPONENT_SYSTEM_SUMMARY.md`
4. **Roadmap**: `docs/technical/COMPONENT_BASED_LESSONS_ROADMAP.md`
5. **Test Output**: `docs/TEST_CONVERTED_LESSON.json`
6. **Component Details**: `/src/components/lesson/README.md`
7. All components have detailed JSDoc comments

---

## What's Next?

The system is **fully tested and ready**! You can:

1. Start creating new lessons using the template
2. Convert existing HTML lessons to JSON
3. Customize component styles in `lessonComponents.styles.js`
4. Add new component types as needed

**Everything is logged, tested, and documented for future developers!** 🎉
