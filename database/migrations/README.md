# Database Migrations

## Discussion Feature Migration

To enable the discussion feature, run the SQL migration:

```bash
# Using Supabase CLI
supabase db execute < create_discussion_tables.sql

# Or via Supabase Dashboard
# 1. Go to SQL Editor in your Supabase dashboard
# 2. Copy and paste the contents of create_discussion_tables.sql
# 3. Click "Run"
```

### What it creates:
- `lesson_comments` table - stores all comments and replies
- `comment_votes` table - tracks upvotes and downvotes
- Indexes for optimized query performance
- Row Level Security policies for secure access
- Triggers for automatic timestamp updates

### Features enabled:
- Users can post comments on lessons
- Nested replies (threaded discussions)
- Upvote/downvote functionality
- Sorting by Top, Trending, or Recent
- Edit and delete own comments
- User profiles with avatars and timestamps
