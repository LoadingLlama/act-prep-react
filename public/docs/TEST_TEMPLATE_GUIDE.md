# Test Template Integration Guide

This diagnostic test system is designed for **incredibly easy** question database integration. You can add new tests by simply uploading JSON files and copying template files.

## 🚀 Quick Start - Adding a New Test

### Step 1: Create Your Question Database
Create a JSON file in `/public/questions/` with this structure:

```json
{
  "testInfo": {
    "subject": "Science",
    "totalQuestions": 40,
    "timeLimit": 40,
    "answerChoices": ["A", "B", "C", "D"]
  },
  "questions": [
    {
      "id": 1,
      "text": "What is the chemical symbol for water?",
      "choices": [
        "H2O",
        "CO2",
        "NaCl",
        "CH4"
      ],
      "correctAnswer": "A"
    }
    // ... add more questions
  ]
}
```

### Step 2: Copy and Modify Template
1. Copy `math-test.html` to your new test name (e.g., `science-test.html`)
2. Update these lines:
   - Line 6: Change title to your test name
   - Line 845: Change JSON path to your question file
   - Line 597: Update question counter (e.g., "Question 1 of 40")
   - Line 599: Update timer (e.g., "40:00")

### Step 3: Update Navigation Flow
Update these JavaScript functions to point to the next test:
- `endSection()` function: Change redirect URL
- Final question "Next" button: Change redirect URL

**That's it!** 🎉 Your new test is ready with automatic:
- Question loading and display
- Navigation between questions
- Timer functionality
- Answer tracking
- Question flagging
- Responsive design

## 📁 File Structure

```
/public/
├── questions/
│   ├── math-questions.json        # Math test database
│   ├── science-questions.json     # Science test database
│   ├── reading-questions.json     # Reading test database
│   └── english-questions.json     # English test database
├── math-test.html                 # Math test template
├── science-test.html              # Science test template
├── reading-test.html              # Reading test template
└── english-test.html              # English test template
```

## 🔧 JSON Database Format

### Required Fields
- `testInfo.subject`: Test name (e.g., "Math", "Science")
- `testInfo.totalQuestions`: Number of questions
- `testInfo.timeLimit`: Time in minutes
- `testInfo.answerChoices`: Array of choice labels (e.g., ["A","B","C","D","E"])

### Question Object
- `id`: Unique question number (1, 2, 3...)
- `text`: Question text/prompt
- `choices`: Array of answer options (no letters needed)
- `correctAnswer`: Correct choice letter (e.g., "A", "B", "C")

## 🎯 Answer Choice Patterns

**Math**: `["A", "B", "C", "D", "E"]` (5 choices)
**Science**: `["A", "B", "C", "D"]` (4 choices)
**Reading**: `["A", "B", "C", "D"]` (4 choices)
**English**: `["A", "B", "C", "D"]` (4 choices)

## ⚡ Features Included Automatically

- ✅ **Responsive Design**: Works on all devices
- ✅ **Question Navigation**: Previous/Next buttons
- ✅ **Question Index**: Modal with question grid
- ✅ **Answer Tracking**: Saves all user selections
- ✅ **Question Flagging**: Mark questions for review
- ✅ **Timer**: Automatic countdown with alerts
- ✅ **Progress Tracking**: Visual progress indicators
- ✅ **Keyboard Shortcuts**: Arrow keys, F for flag, Q for index

## 🔄 Integration Examples

### Adding a Science Test
1. Create: `questions/science-questions.json`
2. Copy: `math-test.html` → `science-test.html`
3. Update: Title, JSON path, question count, timer
4. Done! ✨

### Adding a Reading Test
1. Create: `questions/reading-questions.json`
2. Copy: `math-test.html` → `reading-test.html`
3. Update: Title, JSON path, question count, timer
4. Done! ✨

## 🏗️ Advanced Customization

### Custom Styling
- Modify CSS classes in the `<style>` section
- All styling is contained in each test file
- Consistent design system across all tests

### Custom Instructions
- Update the passage/instruction section content
- Modify `passage-title` and `passage-text` content
- Add test-specific instructions

### Different Question Types
- The JSON format supports any text-based questions
- Choices array can be any length (update answerChoices accordingly)
- Math symbols, formulas, and special characters supported

## 📊 Database Size Limits

- ✅ **Unlimited Questions**: System handles any number of questions
- ✅ **Large Databases**: Efficient loading and display
- ✅ **Fast Navigation**: Optimized for hundreds of questions
- ✅ **Memory Efficient**: Only loads what's needed

## 🚨 Error Handling

The system includes automatic error handling for:
- Missing JSON files
- Malformed JSON data
- Network connection issues
- Invalid question formats

Users see friendly error messages and loading states.

---

## 💡 Pro Tips

1. **Test Locally**: Always test your JSON file before deployment
2. **Validate JSON**: Use a JSON validator to check syntax
3. **Consistent Naming**: Use clear, descriptive file names
4. **Backup Data**: Keep copies of your question databases
5. **Version Control**: Track changes to question databases

**Need help?** The system is designed to be self-explanatory, but check the browser console for any loading errors.