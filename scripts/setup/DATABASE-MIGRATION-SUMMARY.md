# Database Migration Summary: Separated Tables

## Overview
Successfully migrated Practice Test data from a single monolithic table to a separated, section-specific structure for better organization and efficiency.

## What Changed

### Old Structure (Single Table)
- **practice_test_questions** - All 215 questions in one table with a `section` column

### New Structure (Separated Tables)

#### English Section
- **practice_test_english_passages** (5 passages per test)
  - Stores full passage text, passage type, word count
  - Types: literary_narrative, social_studies, natural_science, humanities, personal_essay

- **practice_test_english_questions** (75 questions per test)
  - Links to passages via `passage_id`
  - Includes question_text, choices, correct_answer, explanation
  - Additional fields: question_type, difficulty

#### Math Section
- **practice_test_math_questions** (60 questions per test)
  - NO passages table (math questions are standalone)
  - Includes optional `question_image_url` for diagrams
  - 5 answer choices (A-E)

#### Reading Section
- **practice_test_reading_passages** (4 passages per test)
  - Types: literary_narrative, social_science, humanities, natural_science
  - ~800 words each

- **practice_test_reading_questions** (40 questions per test)
  - Links to passages via `passage_id`
  - Includes optional `line_reference` field

#### Science Section
- **practice_test_science_passages** (6-7 passages per test)
  - Types: data_representation, research_summary, conflicting_viewpoints
  - Includes `passage_data` JSONB field for tables/graphs

- **practice_test_science_questions** (40 questions per test)
  - Links to passages via `passage_id`

## Migration Results

### Practice Test 1 Migration
- ✅ 75 English questions → 5 passages + 75 questions
- ✅ 60 Math questions → 60 questions (no passages)
- ✅ 40 Reading questions → 4 passages + 40 questions
- ✅ 40 Science questions → 27 passages + 40 questions

**Note**: Science has 27 passages because many questions were generated with individual passages. This will be optimized in future test generations.

## Benefits of New Structure

### 1. Better Organization
- Each section has its own dedicated tables
- Easier to understand and maintain
- Clearer data relationships

### 2. Improved Performance
- Targeted indexes per section
- Faster queries (no need to filter by section)
- Better query optimization by PostgreSQL

### 3. Section-Specific Features
- Math can have `question_image_url` without affecting other sections
- Science can store structured data in `passage_data` JSONB
- Reading can have `line_reference` for specific line questions
- English can track passage types separately

### 4. Scalability
- Easy to add section-specific fields without affecting other sections
- Simpler to add new test numbers
- Clearer foreign key relationships

### 5. Data Integrity
- Cascade deletes ensure passages and questions stay in sync
- Unique constraints per section prevent duplicates
- Type-safe passage associations

## Updated Code

### Service Layer (`practiceTests.service.js`)
- ✅ New `_getTableNames()` method maps sections to table names
- ✅ `getPracticeTestSection()` fetches questions and merges passages
- ✅ `getPracticeTestQuestions()` combines all sections
- ✅ `getPassages()` retrieves passages for specific sections
- ✅ All methods updated to use separated tables

### UI Layer (`PracticeTestPage.jsx`)
- ✅ No changes needed! Service abstraction worked perfectly
- ✅ Component continues to work without modifications

## Testing

All sections tested and verified:
- ✅ English questions with passages load correctly
- ✅ Math questions load without passages
- ✅ Reading questions with passages load correctly
- ✅ Science questions with passages load correctly
- ✅ Passage data properly merged into questions
- ✅ All 215 questions accessible

## Database Indexes

Optimized indexes for fast queries:
```sql
-- English
CREATE INDEX idx_english_passages_test ON practice_test_english_passages(test_number);
CREATE INDEX idx_english_questions_test ON practice_test_english_questions(test_number);
CREATE INDEX idx_english_questions_passage ON practice_test_english_questions(passage_id);

-- Math
CREATE INDEX idx_math_questions_test ON practice_test_math_questions(test_number);

-- Reading
CREATE INDEX idx_reading_passages_test ON practice_test_reading_passages(test_number);
CREATE INDEX idx_reading_questions_test ON practice_test_reading_questions(test_number);
CREATE INDEX idx_reading_questions_passage ON practice_test_reading_questions(passage_id);

-- Science
CREATE INDEX idx_science_passages_test ON practice_test_science_passages(test_number);
CREATE INDEX idx_science_questions_test ON practice_test_science_questions(test_number);
CREATE INDEX idx_science_questions_passage ON practice_test_science_questions(passage_id);
```

## Row Level Security (RLS)

All tables have public read access enabled:
```sql
CREATE POLICY "Enable read access for all users" ON practice_test_english_passages FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON practice_test_english_questions FOR SELECT TO public USING (true);
-- ... (similar policies for all tables)
```

## Files Created/Modified

### Created
1. `scripts/setup/create-practice-test-tables-separated.sql` - Table creation SQL
2. `scripts/setup/migrate-to-separated-tables.mjs` - Migration script
3. `scripts/setup/DATABASE-MIGRATION-SUMMARY.md` - This document

### Modified
1. `src/services/api/practiceTests.service.js` - Updated to use separated tables

### Unchanged
1. `src/pages/PracticeTestPage.jsx` - Works without changes!
2. `src/components/SequentialTest.js` - No changes needed
3. `src/App.js` - No changes needed

## Next Steps

### For Future Tests (Practice Test 2, 3, 4...)
Use the separated structure from the start:
1. Generate passages first
2. Insert passages into appropriate passage tables
3. Get passage IDs from inserts
4. Generate questions with passage_id references
5. Insert questions into appropriate question tables

### Optimization Opportunities
1. **Science passages**: Consolidate questions under fewer passages (currently 27 passages for 40 questions)
2. **Passage reuse**: Consider if some passages can be reused across test numbers
3. **Question types**: Add more granular question_type categorization
4. **Difficulty tags**: Implement more accurate difficulty assessments

### Old Table Cleanup
Once you've verified everything works:
```sql
-- Optional: Drop the old table after confirming new structure works
-- DROP TABLE practice_test_questions;
```

## Verification Commands

Check table counts:
```sql
-- English
SELECT COUNT(*) FROM practice_test_english_passages WHERE test_number = 1; -- Should be 5
SELECT COUNT(*) FROM practice_test_english_questions WHERE test_number = 1; -- Should be 75

-- Math
SELECT COUNT(*) FROM practice_test_math_questions WHERE test_number = 1; -- Should be 60

-- Reading
SELECT COUNT(*) FROM practice_test_reading_passages WHERE test_number = 1; -- Should be 4
SELECT COUNT(*) FROM practice_test_reading_questions WHERE test_number = 1; -- Should be 40

-- Science
SELECT COUNT(*) FROM practice_test_science_passages WHERE test_number = 1; -- Should be 27
SELECT COUNT(*) FROM practice_test_science_questions WHERE test_number = 1; -- Should be 40
```

## Summary

The migration to separated tables was **100% successful**:
- ✅ All 215 questions migrated
- ✅ All passages properly separated
- ✅ Service layer updated and tested
- ✅ UI continues to work without changes
- ✅ Better performance and organization
- ✅ Scalable for future tests

The new structure provides a solid foundation for adding Practice Tests 2, 3, 4, and beyond!
