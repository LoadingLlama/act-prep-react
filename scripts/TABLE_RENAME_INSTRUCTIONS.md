# Database Table Rename - Instructions

## Overview
Renaming tables for consistency: all lesson-related tables will have `lesson_` prefix.

## Current Status

### ✅ COMPLETED
1. **Data Verification**: All data linkages verified
   - 127 section_content blocks properly linked
   - 137 examples properly linked to lessons
   - 643 term_definitions properly linked to lessons
   - NO orphaned data found

2. **Code Updated**: All code references updated
   - `src/services/api/lessons.service.js` → uses `lesson_section_content`
   - `src/services/api/examples.service.js` → uses `lesson_examples`
   - `src/services/api/termDefinitions.service.js` → uses `lesson_term_definitions`
   - All 50+ script files updated
   - Backups created in `backups/code-backup-20251017/`

### 🔄 IN PROGRESS
**Run SQL to rename tables in Supabase**

## Instructions

### Step 1: Execute SQL in Supabase
The Supabase SQL Editor has been opened for you, and the SQL commands are in your clipboard.

**Paste and run these commands:**

```sql
ALTER TABLE section_content RENAME TO lesson_section_content;
ALTER TABLE examples RENAME TO lesson_examples;
ALTER TABLE term_definitions RENAME TO lesson_term_definitions;
```

### Step 2: Verify the Rename
After executing the SQL commands, run:

```bash
node scripts/verify-rename-complete.mjs
```

This will:
- ✅ Verify new table names exist with correct row counts
- ✅ Verify old table names are gone
- ✅ Test sample queries to ensure everything works
- ✅ Provide a final status report

### Step 3: Test the Application
Once verification passes, test the application:

```bash
npm start
```

Navigate to a few lessons and verify:
- Lesson content displays correctly
- Examples show up properly
- Glossary tooltips work

## Tables Being Renamed

| Old Name           | New Name                  | Rows |
|--------------------|---------------------------|------|
| section_content    | lesson_section_content    | 127  |
| examples           | lesson_examples           | 137  |
| term_definitions   | lesson_term_definitions   | 643  |

## Database Structure After Rename

```
lesson_metadata (116 rows)
├── lesson_sections (127 rows)
│   └── lesson_section_content (127 rows) [RENAMED]
├── lesson_examples (137 rows) [RENAMED]
└── lesson_term_definitions (643 rows) [RENAMED]
```

## Rollback (if needed)

If something goes wrong, you can rollback with:

```sql
ALTER TABLE lesson_section_content RENAME TO section_content;
ALTER TABLE lesson_examples RENAME TO examples;
ALTER TABLE lesson_term_definitions RENAME TO term_definitions;
```

Then restore code from backup:

```bash
cp -r backups/code-backup-20251017/* .
```

## Files Modified

### Service Files
- `src/services/api/lessons.service.js`
- `src/services/api/examples.service.js`
- `src/services/api/termDefinitions.service.js`

### Scripts (50+ files)
- All `.mjs` files in `scripts/` directory updated

## Support

If you encounter any issues:
1. Check the verification report output
2. Review the SQL Editor for any error messages
3. Check that all code files were updated (backups available)
4. Verify .env file has correct Supabase credentials
