# Quick Start: Execute Migration in Supabase

## Step-by-Step Guide (10 minutes)

### Before You Start

1. **Go to Supabase Dashboard**: https://app.supabase.com
2. **Select your ACT Prep project**
3. **Create a backup**:
   - Navigate to: Database → Backups
   - Click "Create Backup"
   - Wait for confirmation ✓

---

## Execution Steps

### Step 1: Run Schema Migration (2-3 min)

1. In Supabase Dashboard, go to: **SQL Editor**
2. Click **"New Query"**
3. Open file: `database/migrations/001_adaptive_learning_schema.sql`
4. **Copy entire contents** and paste into SQL Editor
5. Click **"Run"** (or press Cmd/Ctrl + Enter)
6. ✅ Look for: **"MIGRATION 001 COMPLETED SUCCESSFULLY"**

---

### Step 2: Seed Skill Taxonomy (1 min)

1. Click **"New Query"**
2. Open file: `database/seeds/002_skill_taxonomy.sql`
3. **Copy and paste** into SQL Editor
4. Click **"Run"**
5. ✅ Look for: **"Total skills created: 60+"**

---

### Step 3: Map Questions to Skills (1-2 min)

1. Click **"New Query"**
2. Open file: `database/seeds/003_question_skill_mapping.sql`
3. **Copy and paste**
4. Click **"Run"**
5. ✅ Look for: **"QUESTION-SKILL MAPPING COMPLETE"**
6. Check that mapped questions > 0

---

### Step 4: Initialize IRT Parameters (1 min)

1. Click **"New Query"**
2. Open file: `database/seeds/004_initialize_irt_parameters.sql`
3. **Copy and paste**
4. Click **"Run"**
5. ✅ Look for: **"IRT PARAMETERS INITIALIZED"**
6. Check difficulty range is reasonable

---

### Step 5: Verify Everything (2 min)

1. Click **"New Query"**
2. Open file: `database/tests/verify_migration.sql`
3. **Copy and paste**
4. Click **"Run"**
5. ✅ Look for: **"All Tests Passed ✓"**

**If all 13 tests pass, you're done! 🎉**

---

## Quick Verification

Run this in SQL Editor to see a summary:

```sql
-- Quick health check
SELECT 'Skills' as entity, COUNT(*) as count FROM skills
UNION ALL
SELECT 'Questions', COUNT(*) FROM diagnostic_test_questions
UNION ALL
SELECT 'Question→Skill Mappings', COUNT(*) FROM question_skills
UNION ALL
SELECT 'Questions with IRT params', COUNT(*)
  FROM diagnostic_test_questions
  WHERE difficulty IS NOT NULL;
```

**Expected Output:**
- Skills: 60-80
- Questions: ~160+ (your current count)
- Mappings: ~160+
- Questions with IRT: ~160+ (should match total questions)

---

## What Was Added?

### New Tables (9)
✅ skills
✅ question_skills
✅ user_profiles
✅ assessment_sessions
✅ user_responses
✅ user_skill_assessments
✅ learning_paths
✅ learning_path_items
✅ daily_progress_snapshots

### New Columns on diagnostic_test_questions (8)
✅ difficulty (IRT parameter)
✅ discrimination (IRT parameter)
✅ guessing (IRT parameter)
✅ exposure_rate
✅ last_calibrated
✅ is_adaptive
✅ time_limit_seconds
✅ explanation

### Security
✅ Row Level Security enabled
✅ 15+ RLS policies created
✅ All user data isolated by auth.uid()

---

## If Something Goes Wrong

### Option 1: Check Logs
Supabase Dashboard → Logs → Look for errors

### Option 2: Rollback
1. **New Query** in SQL Editor
2. Open `database/migrations/001_rollback.sql`
3. Copy and paste
4. Run (this removes all new tables and columns)
5. Restore from backup if needed

---

## Troubleshooting

**Error: "relation already exists"**
→ Safe to ignore, means it's already created

**Error: "duplicate key value"**
→ Some data exists, skip to next step

**Error: "permission denied"**
→ Make sure you're using the service_role key or postgres user

**Tests fail**
→ Read the specific failure message
→ Run individual verification queries
→ Check if it's a warning vs error

---

## Next: Update Application Code

After migration succeeds:

1. ✅ Update Supabase client to use new tables
2. ✅ Implement IRT engine (Phase 2)
3. ✅ Build adaptive assessment UI (Phase 2)
4. ✅ Create learning path generator (Phase 2)

See `ADAPTIVE_LEARNING_DESIGN.md` for full roadmap.

---

## Common Questions

**Q: Will this break my existing app?**
A: No - all changes are additive. Existing tables/columns untouched.

**Q: Can I run this multiple times?**
A: Most scripts use `IF NOT EXISTS` so they're safe to rerun. IRT parameter initialization will overwrite though.

**Q: How long does it take?**
A: 5-10 minutes total for all steps.

**Q: Do I need downtime?**
A: No - migration is non-blocking.

**Q: What if I need to rollback?**
A: Use `001_rollback.sql` - it cleanly removes everything.

---

**Ready to execute? Start with Step 1 above! ☝️**
