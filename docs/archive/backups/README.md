# Database Backup - 10/21/2025

## Backup Statistics
- **Created:** 2025-10-21T19:02:46.014Z
- **Source:** rabavobdklnwvwsldbix.supabase.co
- **Total Lessons:** 84
- **Total Examples:** 231

### Breakdown by Subject
- **english:** 16 lessons
- **math:** 35 lessons
- **reading:** 14 lessons
- **science:** 19 lessons

## Backup Layers

### 1. Complete JSON Database (`database-backup-2025-10-21.json`)
Full database export including all lessons, examples, and metadata.
Size: 1.62 MB

### 2. Individual HTML Lessons (`html-lessons/`)
Each lesson's HTML content saved as individual files, organized by subject:
- english/ (16 files)
- math/ (35 files)
- reading/ (14 files)
- science/ (19 files)

### 3. Examples by Lesson (`examples-by-lesson/`)
JSON files containing examples for each lesson (64 files)

### 4. Restore Script (`restore-from-backup.mjs`)
Automated script to restore backup to any Supabase instance.

Usage:
```bash
node restore-from-backup.mjs <SUPABASE_URL> <SERVICE_KEY>
```

## How to Use This Backup

### Quick Recovery (Individual Files)
Browse `html-lessons/` to view any lesson's HTML content directly.

### Full Database Restore
1. Create new Supabase project or have target credentials ready
2. Run: `node restore-from-backup.mjs <URL> <KEY>`
3. Examples will need to be re-uploaded using lesson-specific scripts

### Git Version Control
This backup is committed to git for additional redundancy on GitHub.

## Backup Verification
- ✓ All 84 lessons exported
- ✓ All 231 examples saved
- ✓ HTML files created
- ✓ Restore script generated
- ✓ Multi-layer redundancy established
