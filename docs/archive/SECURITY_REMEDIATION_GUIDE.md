# 🔒 CRITICAL SECURITY REMEDIATION GUIDE

**Status**: URGENT - API Keys Exposed in Git History
**Created**: 2025-11-01
**Priority**: CRITICAL

---

## 🚨 Security Issues Found

### CRITICAL: API Keys in Git History
- **File**: `.env` committed to git on October 6, 2025
- **Removed from tracking**: October 8, 2025
- **Problem**: Keys still visible in git history commits
- **Exposed**: Supabase service role key, anon key, URL

### HIGH: Dependency Vulnerabilities
- **pdfjs-dist** ≤4.1.392: Arbitrary JavaScript execution (High)
- **webpack-dev-server** ≤5.2.0: Source code theft (Moderate)

---

## ✅ STEP 1: Rotate Supabase API Keys

### 1.1 Access Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project: `rabavobdklnwvwsldbix`

### 1.2 Generate New Service Role Key
1. Navigate to **Settings** → **API**
2. Under "Service Role Key" section
3. Click **Generate new key** or **Rotate key**
4. Copy the new service role key (starts with `eyJhbGc...`)
5. ⚠️ **SAVE THIS KEY** - you won't see it again

### 1.3 Generate New Anon Key
1. In the same **Settings** → **API** page
2. Under "Anon/Public Key" section
3. Click **Generate new key** or **Rotate key**
4. Copy the new anon key (starts with `eyJhbGc...`)

### 1.4 Update Local .env File
Once you have both new keys, I'll update your `.env` file with:
```
REACT_APP_SUPABASE_URL=https://rabavobdklnwvwsldbix.supabase.co
REACT_APP_SUPABASE_ANON_KEY=[NEW_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[NEW_SERVICE_ROLE_KEY]
```

---

## ✅ STEP 2: Clean Git History

### 2.1 Create Backup (Safety First!)
```bash
# Create a complete backup of current repo
cd /Users/cadenchiang/Desktop
cp -r act-prep-react act-prep-react-BACKUP-$(date +%Y%m%d)
```

### 2.2 Remove .env from ALL Git History
```bash
cd /Users/cadenchiang/Desktop/act-prep-react

# Remove .env from entire git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

### 2.3 Clean Up Reflogs and Garbage
```bash
# Remove all references to old commits
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### 2.4 Verify .env is Removed
```bash
# Search entire git history for .env file
git log --all --full-history -- .env

# Should return nothing if successfully removed
```

### 2.5 Force Push to Remote (⚠️ DESTRUCTIVE)
```bash
# ⚠️ WARNING: This rewrites remote history
# Make sure backup exists before running this!

git push origin --force --all
git push origin --force --tags
```

---

## ✅ STEP 3: Fix Dependency Vulnerabilities

### 3.1 Run npm audit fix
```bash
cd /Users/cadenchiang/Desktop/act-prep-react
npm audit fix
```

### 3.2 If Automatic Fix Fails
```bash
# Try forcing fixes
npm audit fix --force

# Or manually update packages
npm install pdfjs-dist@latest
npm install webpack-dev-server@latest --save-dev
```

---

## ✅ STEP 4: Verify Security

### 4.1 Test Application with New Keys
```bash
npm start
```
- Navigate to http://localhost:3000
- Test login functionality
- Verify lessons load correctly
- Check examples work properly

### 4.2 Verify Git History is Clean
```bash
# Should return empty (no results)
git log --all --full-history -- .env
git log --all --oneline | grep -i "env\|secret\|key"
```

### 4.3 Verify .env is Ignored
```bash
# Check .gitignore contains .env
cat .gitignore | grep "^\.env$"

# Verify .env is not tracked
git status --ignored
```

---

## 📋 Security Checklist

- [ ] **New Supabase service role key generated**
- [ ] **New Supabase anon key generated**
- [ ] **Local .env file updated with new keys**
- [ ] **Backup of repository created**
- [ ] **.env removed from git history**
- [ ] **Git reflogs cleaned**
- [ ] **Force push to remote completed**
- [ ] **Verified .env not in git history**
- [ ] **npm audit vulnerabilities fixed**
- [ ] **Application tested with new keys**
- [ ] **All functionality verified working**

---

## 🛡️ Additional Security Recommendations

### Already Secure ✅
- `.env` in `.gitignore`
- Service role key not used client-side
- Proper Supabase authentication
- Client write access limited to test results

### Future Enhancements (Optional)
1. **Add DOMPurify** for HTML sanitization
   ```bash
   npm install dompurify
   ```

2. **Add Content Security Policy** in `public/index.html`:
   ```html
   <meta http-equiv="Content-Security-Policy"
         content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
   ```

3. **Verify RLS Policies** in Supabase dashboard:
   - Check Row Level Security enabled on all tables
   - Verify users can only access their own data

---

## 🚀 Next Steps

1. **Rotate keys in Supabase dashboard** (Step 1)
2. **Provide me with the new keys** so I can update `.env`
3. **I'll execute git history cleanup** (Step 2)
4. **I'll fix npm vulnerabilities** (Step 3)
5. **We'll verify everything works** (Step 4)

---

## ⚠️ IMPORTANT NOTES

- **DO NOT commit the updated .env file**
- **Keep your backup until fully verified**
- **Old keys will stop working after rotation**
- **Force push is destructive - cannot be undone**
- **Anyone who cloned the repo needs to re-clone after force push**

---

**Ready to proceed?** Start with Step 1 (rotating keys in Supabase dashboard).
