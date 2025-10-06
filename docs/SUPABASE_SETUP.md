# Supabase Setup Guide for ACT Prep React

This guide will help you set up Supabase for your ACT Prep application and migrate all lesson content to the cloud.

## Prerequisites

- Supabase account (free tier is fine)
- Node.js installed
- All lesson files in the project root

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Create a new project
4. Note your project URL (already added): `https://rabavodbdklnwvwsldbix.supabase.co`

## Step 2: Get Your API Keys

1. Go to your Supabase project dashboard
2. Click on "Project Settings" (gear icon)
3. Navigate to "API" section
4. Copy your `anon` (public) key
5. Update `.env` file with your key:

```env
REACT_APP_SUPABASE_URL=https://rabavodbdklnwvwsldbix.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Step 3: Create Database Schema

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy and paste the contents of `database-schema.sql`
4. Click "Run" to execute the SQL

This will create:
- `lessons` table with all necessary columns
- Indexes for faster queries
- Row Level Security policies

## Step 4: Upload Lesson Content

Once you have your API key configured:

```bash
# Install dotenv if not already installed
npm install dotenv

# Run the upload script
node upload-lessons.js
```

This script will:
- Read all lesson files (math, english, reading, science)
- Parse the lesson content
- Upload to Supabase in batches
- Display a summary of uploaded lessons

Expected output:
```
Preparing to upload X lessons...
Cleared existing lessons
Uploaded batch 1: 100 lessons
✅ Successfully uploaded all lessons!

Total lessons in database: X

Lessons by subject:
  math: XX lessons
  english: XX lessons
  reading: XX lessons
  science: XX lessons
```

## Step 5: Update Your React App

The app has been configured with:

### Supabase Client (`src/supabaseClient.js`)
- Initializes Supabase with environment variables
- Exports configured client for use throughout the app

### Lesson Service (`src/utils/lessonService.js`)
- `fetchLessonsBySubject(subject)` - Get all lessons for a subject
- `fetchLesson(subject, lessonKey)` - Get a specific lesson
- `fetchAllLessons()` - Get all lessons from all subjects
- `fetchLessonList(subject)` - Get lesson titles and keys for navigation

### Usage Example

```javascript
import { fetchLessonsBySubject, fetchLesson } from './utils/lessonService';

// In a component
async function loadMathLessons() {
    try {
        const lessons = await fetchLessonsBySubject('math');
        // lessons is an object: { 'backsolving': { title: '...', content: '...' }, ... }
        setLessons(lessons);
    } catch (error) {
        console.error('Failed to load lessons:', error);
    }
}

// Load a specific lesson
async function loadSpecificLesson() {
    try {
        const lesson = await fetchLesson('math', 'backsolving');
        // lesson is: { title: '...', content: '...' }
        setCurrentLesson(lesson);
    } catch (error) {
        console.error('Failed to load lesson:', error);
    }
}
```

## Step 6: Migrate Components

To use Supabase in your existing components:

1. **Replace static imports** with API calls:
   ```javascript
   // OLD
   import { lessonContent } from './data/allLessons';

   // NEW
   import { fetchLessonsBySubject } from './utils/lessonService';
   ```

2. **Use React state and useEffect**:
   ```javascript
   const [lessons, setLessons] = useState({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
       async function loadLessons() {
           try {
               const data = await fetchLessonsBySubject('math');
               setLessons(data);
           } catch (error) {
               console.error('Error loading lessons:', error);
           } finally {
               setLoading(false);
           }
       }
       loadLessons();
   }, []);
   ```

## Troubleshooting

### Upload fails with "cannot read properties"
- Ensure all lesson files are in the correct format
- Check that `.env` file has the correct API key

### "relation lessons does not exist"
- Make sure you ran the SQL schema in Supabase SQL Editor
- Check that the table was created successfully

### CORS errors
- Verify your Supabase URL is correct
- Check that Row Level Security policies are set up

### No data returned
- Verify lessons were uploaded successfully
- Check browser console for errors
- Ensure `.env` variables are loaded (restart dev server)

## Files Created

- ✅ `.env` - Environment variables
- ✅ `src/supabaseClient.js` - Supabase client configuration
- ✅ `database-schema.sql` - Database schema
- ✅ `upload-lessons.js` - Migration script
- ✅ `src/utils/lessonService.js` - API service functions
- ✅ `SUPABASE_SETUP.md` - This guide

## Next Steps

1. Get your Supabase anon key and update `.env`
2. Run the SQL schema in Supabase dashboard
3. Run `node upload-lessons.js` to upload lessons
4. Update your React components to use the lesson service
5. Test the application

## Benefits

- ✅ Centralized lesson management
- ✅ Easy updates without redeploying
- ✅ Potential for user progress tracking
- ✅ Future admin panel for content management
- ✅ Reduced bundle size (lessons loaded on demand)
