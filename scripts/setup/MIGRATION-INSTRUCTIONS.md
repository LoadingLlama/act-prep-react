# Migration Instructions - Split Tables by Section

## Step 1: Create New Tables

Go to your Supabase Dashboard → SQL Editor and run the file:
```
scripts/setup/split-tables-migration.sql
```

This will create:
- `english_questions` (75 questions)
- `math_questions` (60 questions)
- `reading_questions` (40 questions)
- `science_questions` (40 questions)
- `act_passages` (4 Reading + 7 Science passages)

## Step 2: Run Migration Script

After tables are created, run:
```bash
node scripts/setup/migrate-and-split-data.mjs
```

This will:
1. Copy all data from `act_questions` to the new section-specific tables
2. Create passage records in `act_passages`
3. Link questions to their passages

## Step 3: Extract Passage Text

Run the passage extraction script (coming next) to populate full passage text.

## Step 4: Verify

Check that all data was migrated correctly:
- English: 75 questions
- Math: 60 questions
- Reading: 40 questions + 4 passages
- Science: 40 questions + 7 passages

## Why Split Tables?

Benefits:
1. **Better organization** - Each section has section-specific fields
2. **Performance** - Queries are faster with smaller, focused tables
3. **Type safety** - English has underlined_text, Math has 5 choices, etc.
4. **Flexibility** - Can add section-specific features without affecting others
5. **Passages** - Reading and Science questions properly linked to their passages
