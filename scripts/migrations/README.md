# Database Migrations

SQL migrations for the ACT prep lesson system.

## Available Migrations

### add-json-migration-columns.sql

Adds columns to support component-based lesson system:

- `content_json` (JSONB) - Structured lesson content
- `migrated_to_json` (BOOLEAN) - Migration tracking flag
- `migration_date` (TIMESTAMP) - When migration occurred

**Status**: Required for lesson migration system

**How to Apply**:

1. Open Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the SQL from `add-json-migration-columns.sql`
4. Click "Run"
5. Verify with: `node scripts/verify-migration.js`

## Migration Workflow

```bash
# 1. View migration SQL
node scripts/apply-migration.js migrations/add-json-migration-columns.sql --dry-run

# 2. Apply manually in Supabase Dashboard (copy SQL from file)

# 3. Verify migration
node scripts/verify-migration.js

# 4. Start migrating lessons
node scripts/migrate-lessons.js --all --dry-run
```

## Creating New Migrations

1. Create `.sql` file in this directory
2. Use descriptive filename: `YYYY-MM-DD-description.sql`
3. Include comments explaining what the migration does
4. Add rollback instructions if applicable
5. Update this README

## Notes

- Always test migrations in development first
- Keep migrations idempotent (use `IF NOT EXISTS`, etc.)
- Never delete migration files after applying
- Document any manual steps required

---

**Last Updated**: 2025-10-18
