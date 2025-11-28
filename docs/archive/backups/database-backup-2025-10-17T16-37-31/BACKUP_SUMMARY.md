# Database Backup Summary

**Date:** 2025-10-17T16:37:32.496Z
**Total Rows Backed Up:** 1778

## Tables Backed Up:

- **lesson_metadata**: 116 rows
- **lesson_sections**: 127 rows
- **section_content**: 127 rows
- **lesson_examples**: 0 rows
- **examples**: 137 rows
- **term_definitions**: 643 rows
- **quiz_questions**: 566 rows
- **quizzes**: 62 rows

## Files:

- `backup-manifest.json` - Complete backup with all tables
- `lesson_metadata.json` - Individual table backup
- `lesson_sections.json` - Individual table backup
- `section_content.json` - Individual table backup
- `lesson_examples.json` - Individual table backup
- `examples.json` - Individual table backup
- `term_definitions.json` - Individual table backup
- `quiz_questions.json` - Individual table backup
- `quizzes.json` - Individual table backup

## Restoration:

To restore from this backup, use the restore script:

```bash
node scripts/restore-from-backup.mjs /Users/cadenchiang/Desktop/act-prep-react/backups/database-backup-2025-10-17T16-37-31
```
