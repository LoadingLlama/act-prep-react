# How to Restore Large SQL Files to Supabase

Your `RESTORE_FULL_CONTENT.sql` file is **1.1MB** - too large for Supabase's web SQL editor. Here are **3 proven solutions** to restore your data:

---

## ✅ **Recommended: Solution 1 - Split SQL File (Easiest)**

The SQL file has been automatically split into 3 smaller chunks that work with Supabase's web editor.

### Steps:

1. **Locate the split files** in `database/migrations/chunks/`:
   - `RESTORE_FULL_CONTENT_part_01.sql` (500KB, 38 lessons)
   - `RESTORE_FULL_CONTENT_part_02.sql` (500KB, 34 lessons)
   - `RESTORE_FULL_CONTENT_part_03.sql` (100KB, 12 lessons)

2. **Open Supabase Dashboard**:
   - Go to your project at https://supabase.com/dashboard
   - Navigate to "SQL Editor" in the left sidebar

3. **Run each file in order**:
   ```
   Step 1: Copy contents of part_01.sql → Paste in SQL Editor → Click "Run"
   Step 2: Wait for success message
   Step 3: Copy contents of part_02.sql → Paste in SQL Editor → Click "Run"
   Step 4: Wait for success message
   Step 5: Copy contents of part_03.sql → Paste in SQL Editor → Click "Run"
   Step 6: Done! ✅
   ```

4. **Verify restoration**:
   - Run this query to check: `SELECT COUNT(*) FROM lessons;`
   - Expected result: 84 lessons

**Pros**: Simple, no additional setup, works in browser
**Cons**: Manual process, need to run 3 separate files

---

## 🚀 **Solution 2 - Node.js Script (Fastest)**

Use the Supabase JavaScript client to restore data programmatically.

### Setup:

1. **Ensure you have the required credentials**:
   - Add to your `.env` file (in project root):
     ```env
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_SERVICE_KEY=your-service-role-key
     ```
   - Get your service role key from: Supabase Dashboard → Settings → API

2. **Run the restoration script**:
   ```bash
   cd database/migrations
   node restore_via_client.js
   ```

3. **Monitor progress**:
   - The script will show batch-by-batch progress
   - Takes ~1-2 minutes to restore all 84 lessons

**Pros**: Automated, handles large files, detailed logging
**Cons**: Requires Node.js and environment setup

---

## 🔧 **Solution 3 - Direct Database Connection (Most Powerful)**

Connect directly to your Supabase PostgreSQL database using `psql`.

### Steps:

1. **Get your database connection string**:
   - Go to: Supabase Dashboard → Settings → Database
   - Copy the "Connection string" (Direct connection)
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`

2. **Install psql** (if not already installed):
   ```bash
   # macOS
   brew install postgresql

   # Linux (Ubuntu/Debian)
   sudo apt-get install postgresql-client

   # Windows
   # Download from: https://www.postgresql.org/download/windows/
   ```

3. **Run the SQL file directly**:
   ```bash
   cd /Users/cadenchiang/Desktop/act-prep-react/database/migrations

   psql "postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres" \
     -f RESTORE_FULL_CONTENT.sql
   ```

   Replace `[PASSWORD]` with your actual database password.

4. **Alternative: Use Supabase CLI**:
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Link to your project
   supabase link --project-ref your-project-ref

   # Run the SQL file
   supabase db push --file ./RESTORE_FULL_CONTENT.sql
   ```

**Pros**: Can handle files of any size, direct database access
**Cons**: Requires CLI tools, more technical setup

---

## 📊 **Comparison Table**

| Solution | Difficulty | Speed | File Size Limit | Setup Time |
|----------|-----------|-------|-----------------|------------|
| **1. Split Files** | ⭐ Easy | ⭐⭐ Medium | 500KB per chunk | 0 min |
| **2. Node.js Script** | ⭐⭐ Medium | ⭐⭐⭐ Fast | Unlimited | 2 min |
| **3. Direct psql** | ⭐⭐⭐ Advanced | ⭐⭐⭐ Fast | Unlimited | 5-10 min |

---

## ⚠️ **Troubleshooting**

### "Payload too large" error in Supabase web editor
→ Use Solution 1 (split files) or Solution 2/3

### "duplicate key value violates unique constraint"
→ This is normal! The SQL uses `ON CONFLICT DO UPDATE`, so existing lessons will be updated

### Node.js script fails with "Invalid API key"
→ Make sure you're using `SUPABASE_SERVICE_KEY` (not the anon key) in your .env file

### psql: "connection refused"
→ Check your database connection string and ensure your IP is allowed in Supabase Dashboard → Settings → Database → Connection pooling

---

## 🎯 **Quick Decision Guide**

- **Want it done in 5 minutes?** → Use **Solution 1** (Split Files)
- **Comfortable with Node.js?** → Use **Solution 2** (Node Script)
- **Need maximum control?** → Use **Solution 3** (Direct psql)
- **First time doing this?** → Start with **Solution 1**

---

## 📝 **What Gets Restored**

This restoration will update the following in your `lessons` table:
- ✅ 84 lesson records
- ✅ Full HTML content for each lesson
- ✅ Section, title, description metadata
- ✅ Difficulty levels and estimated times
- ✅ Proper ordering via `order_index`

The restoration uses `UPSERT` logic (INSERT ... ON CONFLICT DO UPDATE), so:
- New lessons will be inserted
- Existing lessons will be updated with the backup content
- No data will be lost

---

## 🆘 **Need Help?**

If you encounter issues:
1. Check that your database connection is working
2. Verify you have write permissions on the `lessons` table
3. Look for error messages in the console output
4. Ensure the SQL file hasn't been corrupted

---

**Generated**: 2025-11-07
**File Size**: 1.1 MB (17,886 lines)
**Total Records**: 84 lessons, 231 examples
