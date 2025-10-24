# PHASE 1: DATABASE SETUP
**Duration**: 3-5 days | **Deliverable**: Fully functional Supabase database

**📖 Navigation**: [← Database Schema](./01-DATABASE-SCHEMA.md) | [Index](./00-MASTER-INDEX.md) | [Next: Phase 2 Extraction →](./03-PHASE-2-EXTRACTION.md)

---

## OVERVIEW

Set up Supabase project, create all database tables, initialize progress tracking, and prepare for data extraction.

**Goal**: By end of Phase 1, you can insert test data and query it successfully.

---

## TASK 1.1: SUPABASE PROJECT SETUP

**Duration**: 1-2 hours

### Steps

#### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in / Create account
3. Click "New Project"
4. Fill in:
   - **Project name**: `act-question-bank`
   - **Database password**: (generate strong password, save in password manager)
   - **Region**: Choose closest to you
   - **Plan**: Free tier (500 MB database, plenty for this project)

#### 2. Get Connection Credentials
1. In Supabase dashboard → Settings → API
2. Copy:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: For frontend
   - **service_role key**: For backend scripts (keep secret!)

#### 3. Save to Environment Variables
Create `.env` file:
```bash
# .env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc... # Keep secret!
DATABASE_URL=postgresql://postgres:[password]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

**⚠️ IMPORTANT**: Add `.env` to `.gitignore`!

#### 4. Install Dependencies
```bash
npm install @supabase/supabase-js dotenv
# or
pnpm add @supabase/supabase-js dotenv
```

#### 5. Test Connection
Create `scripts/database/test-connection.mjs`:
```javascript
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Test query
const { data, error } = await supabase
  .from('_sql')
  .select('version()');

if (error) {
  console.error('❌ Connection failed:', error);
} else {
  console.log('✅ Connected to Supabase!');
  console.log('PostgreSQL version:', data);
}
```

Run: `node scripts/database/test-connection.mjs`

**Expected output**: `✅ Connected to Supabase!`

---

## TASK 1.2: CREATE DATABASE SCHEMA

**Duration**: 2-3 hours

### Step 1: Create SQL Schema File

Create `database/schemas/act_question_bank_schema.sql` with all tables from [Database Schema](./01-DATABASE-SCHEMA.md).

**Full SQL file includes**:
- All 10 tables
- All indexes
- All constraints
- Materialized views
- RLS policies

See [01-DATABASE-SCHEMA.md](./01-DATABASE-SCHEMA.md) for complete SQL.

### Step 2: Execute Schema

**Option A: Supabase SQL Editor** (Recommended for first-time)
1. Supabase Dashboard → SQL Editor
2. Copy/paste schema SQL
3. Click "Run"
4. Verify: Tables → Should see all 10 tables

**Option B: Command Line** (For automation)
```bash
psql $DATABASE_URL < database/schemas/act_question_bank_schema.sql
```

### Step 3: Verify Tables Created
```javascript
// scripts/database/verify-schema.mjs
const { data } = await supabase
  .from('act_questions')
  .select('count');

console.log('✅ act_questions table exists');
```

### Checklist
- [ ] All 10 tables created
- [ ] All indexes created
- [ ] All foreign key constraints working
- [ ] Test insert/delete on each table
- [ ] RLS policies enabled

---

## TASK 1.3: CREATE DATABASE UTILITIES

**Duration**: 3-4 hours

### 1. Connection Helper (`scripts/database/db-utils.mjs`)

```javascript
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: { persistSession: false }
  }
);

// Bulk insert with error handling
export async function bulkInsert(table, records, chunkSize = 100) {
  const chunks = [];
  for (let i = 0; i < records.length; i += chunkSize) {
    chunks.push(records.slice(i, i + chunkSize));
  }

  let totalInserted = 0;
  for (const chunk of chunks) {
    const { data, error } = await supabase
      .from(table)
      .insert(chunk)
      .select();

    if (error) {
      console.error(`Error inserting chunk:`, error);
      throw error;
    }

    totalInserted += data.length;
    console.log(`Inserted ${totalInserted}/${records.length}`);
  }

  return totalInserted;
}

// Safe update with validation
export async function safeUpdate(table, id, updates) {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get with retries
export async function getWithRetry(query, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### 2. Data Validators (`scripts/database/validators.mjs`)

```javascript
export function validateQuestion(question) {
  const errors = [];

  // Required fields
  if (!question.question_stem) errors.push('Missing question_stem');
  if (!question.correct_answer) errors.push('Missing correct_answer');
  if (!question.choice_a || !question.choice_b || !question.choice_c || !question.choice_d) {
    errors.push('Missing answer choices');
  }

  // Valid section
  if (!['english', 'math', 'reading', 'science'].includes(question.section)) {
    errors.push(`Invalid section: ${question.section}`);
  }

  // Valid answer letter
  const validAnswers = question.section === 'math' ? ['A','B','C','D','E'] : ['A','B','C','D'];
  if (!validAnswers.includes(question.correct_answer)) {
    errors.push(`Invalid answer: ${question.correct_answer}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validatePassage(passage) {
  const errors = [];

  if (!passage.full_text) errors.push('Missing passage text');
  if (!passage.section) errors.push('Missing section');
  if (passage.section === 'science' && !passage.passage_type) {
    errors.push('Science passage missing type');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
```

### 3. Backup Utilities (`scripts/database/backup-restore.mjs`)

```javascript
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export async function createBackup(filename) {
  const timestamp = new Date().toISOString().split('T')[0];
  const backupFile = `backups/act-db-${timestamp}.sql`;

  await fs.mkdir('backups', { recursive: true });

  await execAsync(`pg_dump ${process.env.DATABASE_URL} > ${backupFile}`);

  console.log(`✅ Backup created: ${backupFile}`);
  return backupFile;
}

export async function restoreBackup(backupFile) {
  await execAsync(`psql ${process.env.DATABASE_URL} < ${backupFile}`);
  console.log(`✅ Restored from: ${backupFile}`);
}

// Keep last N backups
export async function cleanOldBackups(keepDays = 30) {
  const files = await fs.readdir('backups');
  const now = Date.now();

  for (const file of files) {
    const stats = await fs.stat(`backups/${file}`);
    const ageInDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

    if (ageInDays > keepDays) {
      await fs.unlink(`backups/${file}`);
      console.log(`🗑️  Deleted old backup: ${file}`);
    }
  }
}
```

---

## TASK 1.4: INITIALIZE PROGRESS TRACKING

**Duration**: 1 hour

### Create Progress Tracker

```javascript
// scripts/database/init-progress-tracking.mjs
import { supabase } from './db-utils.mjs';

const progressRows = [];

// 7 tests × 4 sections = 28 rows
for (let testNum = 1; testNum <= 7; testNum++) {
  const sections = [
    { section: 'english', total: 75 },
    { section: 'math', total: 60 },
    { section: 'reading', total: 40 },
    { section: 'science', total: 40 }
  ];

  for (const { section, total } of sections) {
    progressRows.push({
      test_number: testNum,
      section,
      total_questions: total,
      extracted_count: 0,
      validated_count: 0,
      extraction_status: 'pending',
      validation_status: 'pending'
    });
  }
}

// Insert all 28 rows
const { data, error } = await supabase
  .from('extraction_progress')
  .insert(progressRows)
  .select();

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log(`✅ Initialized progress tracking for ${data.length} test sections`);
}
```

Run: `node scripts/database/init-progress-tracking.mjs`

### View Progress Dashboard

```javascript
// scripts/database/view-progress.mjs
const { data } = await supabase
  .from('extraction_progress')
  .select('*')
  .order('test_number', { ascending: true })
  .order('section', { ascending: true });

console.table(data);
```

---

## TASK 1.5: TESTING & VALIDATION

**Duration**: 2-3 hours

### Test Suite (`scripts/database/test-schema.mjs`)

```javascript
import { supabase } from './db-utils.mjs';

async function testSchema() {
  console.log('🧪 Running schema tests...\n');

  // Test 1: Insert passage
  const { data: passage } = await supabase
    .from('act_passages')
    .insert({
      test_number: 1,
      section: 'english',
      passage_number: 1,
      title: 'Test Passage',
      full_text: 'This is a test passage for validation.',
      word_count: 8
    })
    .select()
    .single();

  console.log('✅ Test 1: Can insert passage');

  // Test 2: Insert question with passage reference
  const { data: question } = await supabase
    .from('act_questions')
    .insert({
      test_number: 1,
      section: 'english',
      question_number: 1,
      passage_id: passage.id,
      question_stem: 'Which choice is correct?',
      choice_a: 'NO CHANGE',
      choice_b: 'Answer B',
      choice_c: 'Answer C',
      choice_d: 'Answer D',
      correct_answer: 'A',
      question_type: 'test_question'
    })
    .select()
    .single();

  console.log('✅ Test 2: Can insert question with FK');

  // Test 3: Insert distractor
  const { data: distractor } = await supabase
    .from('act_distractors')
    .insert({
      question_id: question.id,
      choice_letter: 'B',
      choice_text: 'Answer B',
      distractor_type: 'test_type',
      why_wrong: 'This is incorrect because...'
    })
    .select()
    .single();

  console.log('✅ Test 3: Can insert distractor');

  // Test 4: Query with joins
  const { data: fullQuestion } = await supabase
    .from('act_questions')
    .select(`
      *,
      passage:act_passages(*),
      distractors:act_distractors(*)
    `)
    .eq('id', question.id)
    .single();

  console.log('✅ Test 4: Can query with joins');

  // Test 5: Delete cascade
  await supabase.from('act_passages').delete().eq('id', passage.id);

  const { data: deletedQ } = await supabase
    .from('act_questions')
    .select('*')
    .eq('id', question.id);

  if (deletedQ.length === 0) {
    console.log('✅ Test 5: Cascade delete works');
  }

  console.log('\n🎉 All tests passed!');
}

testSchema().catch(console.error);
```

Run: `node scripts/database/test-schema.mjs`

**Expected**: All 5 tests pass ✅

---

## PHASE 1 CHECKLIST

Before moving to Phase 2, verify:

- [ ] Supabase project created
- [ ] Connection working (test script passes)
- [ ] All 10 tables created
- [ ] All indexes created
- [ ] All constraints working
- [ ] Progress tracking initialized (28 rows)
- [ ] Utility functions created
- [ ] Backup script tested
- [ ] Schema test suite passes
- [ ] Can insert/query/delete test data

---

## TROUBLESHOOTING

### Connection Issues
**Problem**: `Connection refused` or `ECONNREFUSED`
**Solution**: Check DATABASE_URL is correct, Supabase project is running

### Table Creation Fails
**Problem**: `relation already exists`
**Solution**: Drop existing tables first:
```sql
DROP TABLE IF EXISTS act_distractors CASCADE;
DROP TABLE IF EXISTS act_questions CASCADE;
DROP TABLE IF EXISTS act_passages CASCADE;
-- ... repeat for all tables
```

### Foreign Key Errors
**Problem**: `violates foreign key constraint`
**Solution**: Create tables in correct order (passages before questions)

---

## DELIVERABLES

✅ Supabase project running
✅ Complete database schema deployed
✅ Utility scripts ready
✅ Progress tracking initialized
✅ Test suite passing

**Time Spent**: 3-5 days
**Lines of Code**: ~500-700

---

## NEXT PHASE

**Ready for extraction?** → **[Phase 2: Data Extraction →](./03-PHASE-2-EXTRACTION.md)**

Phase 2 includes:
- All 4 CRITICAL GAPS integrated
- Figure digitization strategy
- Answer explanation generation
- Duplicate detection
- 3-tier QA process

---

**📖 Navigation**: [← Database Schema](./01-DATABASE-SCHEMA.md) | [Index](./00-MASTER-INDEX.md) | [Next: Phase 2 Extraction →](./03-PHASE-2-EXTRACTION.md)
