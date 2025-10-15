# Setup Term Definitions in Supabase

## Step 1: Create the Table

Go to your Supabase Dashboard → SQL Editor and run this SQL:

```sql
CREATE TABLE IF NOT EXISTS term_definitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  context TEXT,
  related_terms TEXT[],
  lesson_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_term_definitions_term ON term_definitions(term);
CREATE INDEX IF NOT EXISTS idx_term_definitions_lesson_key ON term_definitions(lesson_key);

ALTER TABLE term_definitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON term_definitions
  FOR SELECT USING (true);
```

## Step 2: Insert the Definitions

After creating the table, run:

```bash
node create-term-definitions-table.mjs
```

This will insert all 9 term definitions for the geometry-angles lesson.

## Step 3: Verify

Check in Supabase Dashboard → Table Editor → term_definitions

You should see 9 rows with terms like "Acute Angles", "Right Angles", etc.

## Done!

The React app will now fetch definitions from Supabase automatically.
