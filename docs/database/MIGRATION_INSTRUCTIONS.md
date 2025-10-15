# Database Migration Instructions

## Adaptive Learning System - Phase 1 Migration

This migration adds adaptive testing and personalized learning capabilities to the ACT Prep platform.

---

## ⚠️ CRITICAL: Pre-Migration Steps

### 1. Create Backup

**Via Supabase Dashboard:**
1. Go to https://app.supabase.com
2. Select your project
3. Navigate to Database → Backups
4. Click "Create Backup" or ensure automatic backups are enabled
5. Wait for confirmation

**Alternative: Export via SQL**
```bash
# If you have direct database access
pg_dump -h [your-db-host] -U postgres -d [your-db-name] > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Test in Staging (Recommended)

If you have a staging environment:
1. Run the entire migration in staging first
2. Verify all tests pass
3. Test the application functionality
4. Only then proceed to production

---

## 📋 Migration Files Overview

| File | Purpose | Safe to Rerun? |
|------|---------|---------------|
| `001_adaptive_learning_schema.sql` | Creates new tables and columns | ✅ Yes (uses IF NOT EXISTS) |
| `002_skill_taxonomy.sql` | Populates skill taxonomy | ⚠️ Partially (check for duplicates) |
| `003_question_skill_mapping.sql` | Maps questions to skills | ⚠️ Partially (ON CONFLICT DO NOTHING) |
| `004_initialize_irt_parameters.sql` | Sets IRT parameters | ⚠️ No (overwrites existing) |
| `verify_migration.sql` | Tests data integrity | ✅ Yes (read-only) |
| `001_rollback.sql` | Reverses migration | ❌ DESTRUCTIVE |

---

## 🚀 Migration Execution

### Method 1: Supabase SQL Editor (Recommended)

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project
   - Navigate to SQL Editor

2. **Run Schema Migration**
   - Click "New Query"
   - Copy contents of `migrations/001_adaptive_learning_schema.sql`
   - Paste and click "Run"
   - Verify you see "MIGRATION 001 COMPLETED SUCCESSFULLY"

3. **Seed Skill Taxonomy**
   - New Query
   - Copy contents of `seeds/002_skill_taxonomy.sql`
   - Run and verify skill count (should show 60+ skills)

4. **Map Questions to Skills**
   - New Query
   - Copy contents of `seeds/003_question_skill_mapping.sql`
   - Run and check mapping statistics

5. **Initialize IRT Parameters**
   - New Query
   - Copy contents of `seeds/004_initialize_irt_parameters.sql`
   - Run and verify distribution

6. **Verify Migration**
   - New Query
   - Copy contents of `tests/verify_migration.sql`
   - Run and ensure all 13 tests pass

### Method 2: Command Line (If you have psql access)

```bash
# Set your connection string
export DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"

# Run migrations in order
psql $DATABASE_URL -f database/migrations/001_adaptive_learning_schema.sql
psql $DATABASE_URL -f database/seeds/002_skill_taxonomy.sql
psql $DATABASE_URL -f database/seeds/003_question_skill_mapping.sql
psql $DATABASE_URL -f database/seeds/004_initialize_irt_parameters.sql

# Verify
psql $DATABASE_URL -f database/tests/verify_migration.sql
```

---

## ✅ Post-Migration Verification

### 1. Check Logs

Look for these success messages:
- ✓ "MIGRATION 001 COMPLETED SUCCESSFULLY"
- ✓ "SKILL TAXONOMY SEEDED" (60+ skills)
- ✓ "QUESTION-SKILL MAPPING COMPLETE"
- ✓ "IRT PARAMETERS INITIALIZED"
- ✓ "All Tests Passed ✓"

### 2. Manual Verification Queries

Run these in SQL Editor to verify:

```sql
-- Check table counts
SELECT
    'skills' as table_name,
    COUNT(*) as row_count
FROM skills
UNION ALL
SELECT 'question_skills', COUNT(*) FROM question_skills
UNION ALL
SELECT 'diagnostic_test_questions', COUNT(*) FROM diagnostic_test_questions;

-- Verify IRT parameters
SELECT
    section,
    COUNT(*) as questions,
    ROUND(AVG(difficulty), 2) as avg_difficulty,
    ROUND(AVG(discrimination), 2) as avg_discrimination
FROM diagnostic_test_questions
GROUP BY section;

-- Check question-skill mappings
SELECT
    section,
    COUNT(DISTINCT q.id) as questions_mapped,
    COUNT(*) as total_mappings
FROM diagnostic_test_questions q
JOIN question_skills qs ON q.id = qs.question_id
GROUP BY section;
```

### 3. Application Testing

1. Restart your application
2. Test existing functionality (lessons, tests)
3. Verify no errors in console
4. Check that original data is intact

---

## 🔄 Rollback Procedure (If Needed)

**Only use if migration fails or critical issues arise**

### Via Supabase SQL Editor:

```sql
-- WARNING: This deletes all adaptive learning data
-- Run the rollback script
```

Copy contents of `migrations/001_rollback.sql` and execute.

### Via Command Line:

```bash
psql $DATABASE_URL -f database/migrations/001_rollback.sql
```

**After rollback:**
1. Restore from backup if data was lost
2. Investigate the issue
3. Fix the migration scripts
4. Try again in staging first

---

## 📊 Expected Results

After successful migration:

### Tables Created: 9
- skills
- question_skills
- user_profiles
- assessment_sessions
- user_responses
- user_skill_assessments
- learning_paths
- learning_path_items
- daily_progress_snapshots

### Columns Added to diagnostic_test_questions: 8
- difficulty
- discrimination
- guessing
- exposure_rate
- last_calibrated
- is_adaptive
- time_limit_seconds
- explanation
- updated_at

### Data Populated:
- **Skills**: 60-80 skills across all sections
- **Question Mappings**: 100% of questions mapped to at least 1 skill
- **IRT Parameters**: All questions have difficulty, discrimination, guessing values

### Security:
- Row Level Security enabled on all user tables
- 15+ RLS policies created
- Proper foreign key constraints

---

## 🛠️ Troubleshooting

### Issue: "relation 'skills' already exists"

**Solution:** Safe to ignore if rerunning. The script uses `IF NOT EXISTS`.

### Issue: "duplicate key value violates unique constraint"

**Solution:** Some data already exists. Check which step failed and skip completed steps.

### Issue: "column 'difficulty' already exists"

**Solution:** Safe to ignore. Use `IF NOT EXISTS` checks.

### Issue: Questions not mapping to skills

**Solution:**
1. Check lesson_title values: `SELECT DISTINCT lesson_title FROM diagnostic_test_questions`
2. Manually add mappings if needed
3. Update the mapping function in `003_question_skill_mapping.sql`

### Issue: Tests failing

**Solution:**
1. Read the specific test failure message
2. Run individual verification queries to diagnose
3. Check Supabase logs for errors
4. Consider rollback if critical

---

## 📞 Support

If you encounter issues:

1. **Check Logs**: Supabase Dashboard → Logs
2. **Review Test Output**: Run `verify_migration.sql` for diagnostics
3. **Backup Status**: Ensure backup completed before rollback
4. **Document Error**: Copy full error message and context

---

## 🎯 Next Steps After Migration

Once Phase 1 is complete:

1. ✅ Update application code to use new schema
2. ✅ Implement IRT calculation engine
3. ✅ Build adaptive assessment UI
4. ✅ Create skill analysis dashboard
5. ✅ Generate personalized learning paths

See `ADAPTIVE_LEARNING_DESIGN.md` for full implementation plan.

---

## 📝 Migration Checklist

- [ ] Create database backup
- [ ] Test in staging (if available)
- [ ] Run `001_adaptive_learning_schema.sql`
- [ ] Run `002_skill_taxonomy.sql`
- [ ] Run `003_question_skill_mapping.sql`
- [ ] Run `004_initialize_irt_parameters.sql`
- [ ] Run `verify_migration.sql` - all tests pass
- [ ] Manual verification queries
- [ ] Application smoke test
- [ ] Document any issues
- [ ] Update application code

---

**Migration Version**: 1.0
**Last Updated**: 2025-10-06
**Estimated Duration**: 5-10 minutes
**Downtime Required**: None (additive changes only)
