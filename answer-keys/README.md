# Answer Keys for Practice ACT Tests

This folder contains answer keys in JSON format for automated test extraction.

## 📝 Creating an Answer Key File

1. **Find the answer key** for your ACT practice test:
   - Check the end of the OCR PDF (usually last pages)
   - Look for separate answer key documents
   - Official ACT practice tests always include answer keys

2. **Create a JSON file** named `test{N}-answers.json`:
   ```
   test2-answers.json
   test3-answers.json
   etc.
   ```

3. **Use this format**:
   ```json
   {
     "english": {
       "1": "C",
       "2": "B",
       ...
       "75": "D"
     },
     "math": {
       "1": "E",
       "2": "G",
       ...
       "60": "K"
     },
     "reading": {
       "1": "B",
       "2": "C",
       ...
       "40": "A"
     },
     "science": {
       "1": "D",
       "2": "F",
       ...
       "40": "C"
     }
   }
   ```

## ⚠️ Important Notes

- **English answers:** Must be A-J (75 questions)
- **Math answers:** Must be A-K or F-K depending on question (60 questions)
- **Reading answers:** Must be A-D (40 questions)
- **Science answers:** Must be A-D or F-J depending on question (40 questions)

- Question numbers are **strings** in JSON (e.g., "1", "2", not 1, 2)
- All sections must be present
- Total: 215 answers required

## 📂 Template

See `TEMPLATE-answer-key.json` for a complete example structure.

## 🔍 Where to Find Answer Keys

### Official ACT Practice Tests
- Answer keys are typically on the last 1-2 pages of the test PDF
- Usually formatted as a simple grid: Question # | Answer
- Example:
  ```
  ENGLISH
  1. C
  2. B
  3. A
  ...
  ```

### If You Can't Find the Answer Key
The diagnostic sheet files in your practice acts folder do **NOT** contain the answer keys - they only contain question types. You must locate the official answer key document.
