# Fix: Add lesson_key Column to Learning Path Items

## Problem
The learning path was trying to insert lessonStructure IDs (like "getting-started") into the `lesson_id` UUID column, causing database error:
```
invalid input syntax for type uuid: "getting-started"
```

## Solution
Add a `lesson_key` column to store lessonStructure IDs instead of using UUID `lesson_id`.

## Steps to Fix

### 1. Run SQL Migration in Supabase ⭐ REQUIRED

1. Go to: https://rabavobdklnwvwsldbix.supabase.co
2. Click: **SQL Editor**
3. Copy the contents of: `ADD_LESSON_KEY_COLUMN.sql`
4. Paste and click: **RUN**
5. Wait for: ✅ success message

This will add the `lesson_key` TEXT column to `learning_path_items` table.

### 2. Test the Learning Path

1. Refresh the app (clear cache if needed)
2. Go to Course / Learning Path
3. Click "Edit Learning Path Goals"
4. Click "Save Changes"
5. Check console - should see: "✅ Learning path regenerated!"
6. Verify lessons appear on calendar with correct titles

## What Changed

### Database Schema
- Added `lesson_key TEXT` column to `learning_path_items`
- Stores lessonStructure IDs (e.g., "getting-started", "sentence-structure")
- `lesson_id` is now null for all items (not using database lessons table)

### Code Changes

**learning-path.service.js:**
- Set `lesson_id: null` for all lesson items
- Set `lesson_key: lesson.id` to store lessonStructure ID
- Added `item_type: 'lesson'` for regular lessons

**CourseContent.jsx:**
- Removed database `lessons` table join
- Look up lessons from lessonStructure using `lesson_key`
- Use lessonStructure data for titles, categories, etc.

## Why This Works

Before:
- Tried to insert string IDs into UUID column ❌
- Database lessons table had empty content ❌

After:
- String IDs stored in TEXT column ✅
- Lessons looked up from lessonStructure data file ✅
- Same lesson source as Lessons tab ✅
