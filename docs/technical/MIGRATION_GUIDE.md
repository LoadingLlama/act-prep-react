# Lesson Migration Guide

Complete guide for migrating lessons from HTML content to component-based JSON format.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Migration Process](#migration-process)
4. [Rollback Procedure](#rollback-procedure)
5. [Troubleshooting](#troubleshooting)

---

## Overview

The migration system safely converts lessons from hardcoded HTML strings to structured JSON format that can be rendered using React components.

### Benefits of Migration

- **Consistency**: All lessons use the same component-based rendering
- **Maintainability**: Easier to update styling and behavior across all lessons
- **Validation**: JSON schema ensures content integrity
- **Performance**: Components optimize rendering
- **Type Safety**: PropTypes validation catches errors early

### Safety Features

- ✅ **Automatic backups** before every migration
- ✅ **Dry-run mode** to preview changes
- ✅ **Rollback capability** to revert migrations
- ✅ **Validation** to ensure data integrity
- ✅ **Progress tracking** with detailed logs

---

## Prerequisites

### 1. Database Migration

Before migrating lessons, add the required database columns:

```bash
# View the SQL migration
node scripts/apply-migration.js migrations/add-json-migration-columns.sql --dry-run

# Apply via Supabase Dashboard:
# 1. Go to Supabase Dashboard → SQL Editor
# 2. Copy SQL from: scripts/migrations/add-json-migration-columns.sql
# 3. Run the SQL
```

### 2. Verify Database Setup

```bash
node scripts/verify-migration.js
```

Expected output:
```
✅ All migration columns exist
✅ Column types verified
📊 Migration Status: X total lessons, Y migrated, Z not migrated
✅ ALL VERIFICATION TESTS PASSED
```

---

## Migration Process

### Step 1: Preview Migration (Dry-Run)

Always start with a dry-run to preview changes:

```bash
# Preview single lesson migration
node scripts/migrate-lessons.js --lesson-id=YOUR_LESSON_ID --dry-run

# Preview all lessons migration
node scripts/migrate-lessons.js --all --dry-run
```

### Step 2: Migrate Single Lesson

Test with one lesson first:

```bash
node scripts/migrate-lessons.js --lesson-id=06685249-874d-431f-9b7f-1c711d64a9cf
```

Expected output:
```
📘 Migrating Lesson: 06685249-874d-431f-9b7f-1c711d64a9cf
📥 Step 1: Fetching lesson from database...
   ✅ Lesson fetched: "Topic 1.1 - Working Backwards Strategy"
💾 Step 2: Creating backup...
   ✅ Backup created: 06685249-874d-431f-9b7f-1c711d64a9cf_2025-10-18...
🔄 Step 3: Converting HTML to JSON...
   ✅ Conversion complete
   📦 Content blocks created: 24
✓ Step 4: Validating JSON...
   ✅ Validation passed
💾 Step 5: Updating database...
   ✅ Database updated successfully
✅ MIGRATION COMPLETE
```

### Step 3: Verify Migration

Check that the lesson renders correctly in your app:

1. Navigate to the migrated lesson
2. Verify all content displays correctly
3. Check that components render properly
4. Test any interactive elements

### Step 4: Migrate All Lessons (When Ready)

Once confident, migrate all lessons:

```bash
node scripts/migrate-lessons.js --all
```

Progress output:
```
📚 Migrating All Lessons
📥 Fetching lessons...
   ✅ Found 50 total lessons
   📝 45 lessons need migration

📘 [1/45] Topic 1.1 - Working Backwards Strategy
✅ Success!

📘 [2/45] Topic 1.2 - Substitution
✅ Success!

...

✅ BATCH MIGRATION COMPLETE
✅ Successful: 45
❌ Failed: 0
```

---

## Rollback Procedure

If a migration causes issues, you can rollback:

### Step 1: Identify the Lesson

```bash
# List available backups
ls -l backups/migrations/
```

### Step 2: Rollback

```bash
# Preview rollback (dry-run)
node scripts/migrate-lessons.js --rollback=YOUR_LESSON_ID --dry-run

# Execute rollback
node scripts/migrate-lessons.js --rollback=YOUR_LESSON_ID
```

Expected output:
```
⏮️  Rolling Back Lesson: YOUR_LESSON_ID
🔍 Step 1: Finding backup...
   ✅ Found backup: YOUR_LESSON_ID_2025-10-18...
📥 Step 2: Loading backup...
   ✅ Backup loaded
💾 Step 3: Restoring to database...
   ✅ Database restored successfully
✅ ROLLBACK COMPLETE
```

### Step 3: Verify Rollback

1. Check the lesson in your app
2. Verify HTML content is restored
3. Original formatting should be back

---

## Migration Script Details

### Command Reference

```bash
# Preview single lesson migration
node scripts/migrate-lessons.js --lesson-id=ID --dry-run

# Migrate single lesson
node scripts/migrate-lessons.js --lesson-id=ID

# Preview all lessons migration
node scripts/migrate-lessons.js --all --dry-run

# Migrate all lessons
node scripts/migrate-lessons.js --all

# Preview rollback
node scripts/migrate-lessons.js --rollback=ID --dry-run

# Execute rollback
node scripts/migrate-lessons.js --rollback=ID

# Show help
node scripts/migrate-lessons.js
```

### What Happens During Migration

1. **Fetch**: Retrieves lesson from Supabase
2. **Backup**: Creates timestamped backup in `backups/migrations/`
3. **Convert**: Transforms HTML to structured JSON
4. **Validate**: Checks JSON against schema
5. **Update**: Stores JSON in `content_json` column
6. **Track**: Sets `migrated_to_json = true` and `migration_date`

### Backup Location

Backups are stored in: `backups/migrations/`

Format: `LESSON_ID_TIMESTAMP.json`

Example: `06685249-874d-431f-9b7f-1c711d64a9cf_2025-10-18T19-06-36-401Z.json`

---

## Troubleshooting

### Issue: "Column does not exist"

**Problem**: Database migration not applied

**Solution**:
```bash
# Apply database migration
# Copy SQL from scripts/migrations/add-json-migration-columns.sql
# Run in Supabase Dashboard → SQL Editor
```

### Issue: Validation Failed

**Problem**: HTML content couldn't be converted to valid JSON

**Solution**:
1. Check the conversion logs for specific errors
2. HTML content may have unusual structure
3. May need to update converter logic in `src/utils/lessonConverter.js`
4. Original lesson is NOT modified (safe to retry)

### Issue: Migration Stuck

**Problem**: Script appears to hang

**Solution**:
1. Check network connection to Supabase
2. Verify Supabase service role key is valid
3. Check Supabase dashboard for service status
4. Try with `--dry-run` first

### Issue: Backup Not Found for Rollback

**Problem**: Can't find backup file

**Solution**:
```bash
# List all backups
ls -l backups/migrations/

# Backups are named: LESSON_ID_TIMESTAMP.json
# Find the correct lesson ID
```

### Issue: Lesson Renders Incorrectly After Migration

**Problem**: Migrated lesson doesn't display correctly

**Solution**:
1. Check browser console for errors
2. Verify LessonRenderer is being used
3. Check component PropTypes warnings
4. Rollback if needed:
   ```bash
   node scripts/migrate-lessons.js --rollback=LESSON_ID
   ```

---

## Best Practices

### ✅ DO

- Always run `--dry-run` first
- Test with one lesson before migrating all
- Verify the lesson renders correctly after migration
- Keep backups until you're confident in the migration
- Check validation output carefully

### ❌ DON'T

- Don't delete backup files immediately
- Don't skip the dry-run step
- Don't migrate all lessons without testing one first
- Don't ignore validation errors
- Don't run multiple migrations simultaneously

---

## Database Schema Changes

The migration adds these columns to the `lessons` table:

```sql
-- Structured JSON content
content_json JSONB DEFAULT NULL

-- Migration tracking
migrated_to_json BOOLEAN DEFAULT FALSE
migration_date TIMESTAMP WITH TIME ZONE DEFAULT NULL

-- Indexes
CREATE INDEX idx_lessons_migrated ON lessons(migrated_to_json);
CREATE INDEX idx_lessons_content_json ON lessons USING GIN (content_json);
```

---

## Support

If you encounter issues not covered here:

1. Check the script logs for detailed error messages
2. Review the backup files to ensure data safety
3. Use dry-run mode to diagnose without making changes
4. Check Supabase dashboard for database issues

---

## Success Criteria

Migration is successful when:

- ✅ All lessons have `migrated_to_json = true`
- ✅ All lessons render correctly in the app
- ✅ No console errors or warnings
- ✅ All components display properly
- ✅ Interactive elements work as expected
- ✅ Backups are stored safely

---

**Last Updated**: 2025-10-18
**Version**: 1.0.0
