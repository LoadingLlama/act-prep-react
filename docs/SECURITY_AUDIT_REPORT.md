# Security Audit Report
**Date**: 2025-10-16
**Status**: CRITICAL ISSUES FOUND

## Critical Security Issues

### 🔴 CRITICAL: Hardcoded API Keys in Scripts
- **Issue**: 80+ script files contain hardcoded Supabase API keys
- **Risk**: High - Service role key has full database access
- **Files Affected**: All scripts in `/scripts/` and root directory
- **Impact**: Anyone with repo access can read/write/delete all database data

**Exposed Keys**:
1. Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
2. Service Role Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (ADMIN ACCESS)

### ✅ Mitigations Already in Place
- `.env` file is in `.gitignore`
- `.env` was removed from git history (commit 04d0437)
- Environment variables properly configured

## Recommended Actions

### Immediate (Priority 1)
1. **Rotate Supabase API Keys** - Generate new keys in Supabase dashboard
2. **Create shared config utility** - Single source for environment variables
3. **Replace all hardcoded keys** - Update 80+ scripts to use config utility
4. **Add pre-commit hook** - Prevent committing hardcoded secrets

### High Priority (Priority 2)
1. **Clean up script organization** - Move scripts to proper folders
2. **Remove unused scripts** - Delete obsolete migration/debug scripts
3. **Audit dependencies** - Check for vulnerable packages

### Medium Priority (Priority 3)
1. **Add rate limiting** - Protect API endpoints from abuse
2. **Implement proper error handling** - Don't expose stack traces
3. **Add input validation** - Sanitize all user inputs

## File Organization Issues

### Root Directory Clutter
- 100+ untracked files in root directory
- Mix of SQL files, HTML docs, and JS scripts
- No clear organization or naming convention

**Recommended Structure**:
```
/scripts/
  /migrations/     - Database migration scripts
  /cleanup/        - One-time cleanup scripts
  /data-import/    - Content import scripts
  /utils/          - Shared utilities
/docs/
  /lessons/        - Lesson HTML files
  /planning/       - Planning documents
```

## Next Steps
1. Create `.env.example` template
2. Create shared config utility
3. Run automated key replacement
4. Test all scripts with new config
5. Commit changes
6. Rotate API keys in Supabase
