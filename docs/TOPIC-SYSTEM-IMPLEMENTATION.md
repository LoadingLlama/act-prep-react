# Topic System Implementation Guide

## Overview
This guide explains how to implement the topic-based lesson structure like Lumisource, with cumulative practice checkpoints after each topic.

## Step 1: Run SQL Migration in Supabase

1. Go to your Supabase project: https://supabase.com/dashboard/project/rabavobdklnwvwsldbix
2. Navigate to **SQL Editor**
3. Run the SQL migration from `scripts/supabase-topic-migration.sql`

This will:
- Add topic-related columns to the `lessons` table
- Update the existing sentence-structure lesson to "Topic 1.1"
- Create indexes for performance

## Step 2: Verify Database Update

After running the migration, verify it worked:

```bash
node scripts/migrate-to-topics.mjs
```

This will show you the updated lesson with topic information.

## Step 3: UI Updates (Already Completed)

✅ The following UI updates have been made:

1. **Header Display**: Now shows "ACT® English | Topic 1" (like Lumisource shows "AP World History: Modern - Unit 1")

2. **Lesson Title**: Now displays "Topic 1.1 - Sentence Structure" format

3. **Responsive Design**: Topic badge adapts to screen size

## Topic Structure

### Topic 1: Sentence Structure & Grammar Fundamentals
- Topic 1.1: Sentence Structure ✅ (migrated)
- Topic 1.2: Subject-Verb Agreement (to be created)
- Topic 1.3: Verb Tenses & Consistency (to be created)
- Topic 1.4: Pronoun Agreement & Reference (to be created)
- **→ Cumulative Practice Checkpoint**

### Topic 2: Punctuation & Mechanics
- Topic 2.1: Commas
- Topic 2.2: Semicolons, Colons & Dashes
- Topic 2.3: Apostrophes & Possessives
- Topic 2.4: End Punctuation & Quotation Marks
- **→ Cumulative Practice Checkpoint**

### Topic 3: Style, Word Choice & Precision
- Topic 3.1: Conciseness & Redundancy
- Topic 3.2: Word Choice & Precision
- Topic 3.3: Tone & Style Consistency
- Topic 3.4: Comparative & Superlative Forms
- **→ Cumulative Practice Checkpoint**

### Topic 4: Organization & Rhetorical Skills
- Topic 4.1: Logical Sequence & Transitions
- Topic 4.2: Paragraph Unity & Coherence
- Topic 4.3: Introduction & Conclusion Strategies
- Topic 4.4: Adding, Revising & Deleting Content
- **→ Cumulative Practice Checkpoint**

## Next Steps

### 1. Create Additional Lessons

For each topic lesson, insert into Supabase with this structure:

```sql
INSERT INTO lessons (
  lesson_key,
  title,
  section,
  chapter,
  topic_number,
  topic_lesson_number,
  topic_title,
  full_topic_code,
  content
) VALUES (
  'subject-verb-agreement',
  'Subject-Verb Agreement',
  'english',
  1,
  1,
  2,
  'Sentence Structure & Grammar Fundamentals',
  '1.2',
  '<lesson content here>'
);
```

### 2. Create Cumulative Practice Checkpoints

After completing all lessons in a topic, create practice sessions:

```sql
INSERT INTO lessons (
  lesson_key,
  title,
  section,
  chapter,
  topic_number,
  topic_title,
  is_cumulative_practice,
  content
) VALUES (
  'topic-1-cumulative-practice',
  'Topic 1 Cumulative Practice',
  'english',
  1,
  1,
  'Sentence Structure & Grammar Fundamentals',
  true,
  '<practice content here>'
);
```

### 3. Update Sidebar (Future Enhancement)

The sidebar can be enhanced to show topics with collapsible sections:

```
▼ Topic 1: Sentence Structure & Grammar
  □ 1.1 Sentence Structure
  □ 1.2 Subject-Verb Agreement
  □ 1.3 Verb Tenses & Consistency
  □ 1.4 Pronoun Agreement
  ★ Topic 1 Practice

▼ Topic 2: Punctuation & Mechanics
  □ 2.1 Commas
  □ 2.2 Semicolons, Colons & Dashes
  ...
```

## Benefits

1. **Clear Organization**: Students can see exactly where they are in the curriculum
2. **Progress Tracking**: Topics provide natural milestones
3. **Cumulative Practice**: Reinforces learning at key checkpoints
4. **Similar to AP Format**: Familiar structure for students using Lumisource
5. **Scalable**: Easy to add new topics and lessons

## Testing

After migration:
1. Open the app
2. Navigate to English → Sentence Structure
3. Verify you see "ACT® English | Topic 1" in the header
4. Verify the lesson title shows "Topic 1.1 - Sentence Structure"
