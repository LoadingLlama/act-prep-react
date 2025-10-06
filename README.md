# ACT Prep React Application

A comprehensive React-based ACT test preparation platform with interactive lessons, quizzes, and progress tracking. **All lesson content is stored in and fetched from Supabase** - no hardcoded data.

## Project Structure

```
.
├── src/                          # Main application source code
│   ├── components/              # React components
│   │   ├── AIChat.js           # AI chat interface
│   │   ├── InteractiveQuiz.js  # Quiz component
│   │   ├── LessonQuizSection.js
│   │   ├── ProgressiveLessonRenderer.js
│   │   └── ...
│   ├── utils/                   # Utility functions
│   │   ├── helpers.js
│   │   ├── lessonService.js    # Supabase API calls for lessons
│   │   └── sharedStyles.js
│   ├── styles/                  # Style configurations
│   │   └── AppStyles.js
│   ├── supabaseClient.js       # Supabase database connection
│   ├── App.js                  # Main application component
│   └── index.js                # Application entry point
│
├── scripts/                     # Utility scripts
│   └── utils/                  # Development utilities
│       ├── check-supabase-lessons.js
│       └── [debug scripts...]
│
├── docs/                        # Documentation
│   ├── database-schema.sql     # Database schema
│   ├── SUPABASE_SETUP.md      # Supabase setup guide
│   ├── OPTIMIZATION_GUIDE.md   # Performance optimization
│   └── supabase-migration.sql  # Migration scripts
│
├── public/                      # Static assets
│   └── questions/              # Question data
│
├── archive/                     # Archived installers
│
├── .env                        # Environment variables (Supabase config)
├── package.json                # NPM dependencies and scripts
└── README.md                   # This file
```

## Architecture

### Data Flow
1. **App loads** → Fetches all lessons from Supabase via `lessonService.js`
2. **No fallback data** → All content comes from database
3. **Progress tracking** → Stored locally in browser localStorage
4. **Error handling** → Shows error UI if Supabase connection fails

### Key Design Decisions
- ✅ **Single source of truth**: All lesson content in Supabase
- ✅ **No hardcoded lessons**: Removed all static lesson files
- ✅ **API-first**: Clean separation between data and presentation
- ✅ **Organized structure**: Scripts and docs in dedicated folders

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account with configured project

### Installation

```bash
# Install dependencies
npm install

# Create .env file with your Supabase credentials
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
```

## Features

- **Dynamic Lesson Loading**: All lessons fetched from Supabase database
- **Interactive Quizzes**: React-based quiz system with instant feedback
- **Progress Tracking**: Track completion and scores
- **AI Chat Assistant**: Get help with lessons
- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Graceful loading and error handling

## Database

The application uses Supabase PostgreSQL database with the following schema:

### `lessons` table
- `id` (uuid, primary key)
- `subject` (text) - 'math', 'english', 'reading', or 'science'
- `lesson_key` (text) - Unique identifier for the lesson
- `title` (text) - Lesson title
- `content` (text) - Full lesson content in HTML
- `order_index` (integer) - Display order
- `chapter_number` (integer, optional) - Chapter number
- `duration` (integer, optional) - Estimated duration in minutes
- `created_at` (timestamp)
- `updated_at` (timestamp)

See `docs/database-schema.sql` for full schema.

### Lesson Service API

Located in `src/utils/lessonService.js`:

```javascript
// Fetch all lessons organized by subject
await fetchAllLessons()

// Fetch lessons for specific subject
await fetchLessonsBySubject('math')

// Fetch single lesson
await fetchLesson('math', 'backsolving')

// Get lesson list (for navigation)
await fetchLessonList('math')
```

## Development Tools

### Check Supabase Data
```bash
node scripts/utils/check-supabase-lessons.js
```

### Debug Scripts
Located in `scripts/utils/`:
- Various debugging and testing utilities

## Deployment

1. Build the production app:
```bash
npm run build
```

2. Deploy the `build/` folder to your hosting service

3. Ensure environment variables are set in your hosting platform

## Contributing

1. Keep the organized structure
2. All new lesson content goes in Supabase
3. Update documentation when adding features
4. Follow existing code style

## License

Private - For Caden Chiang (DO NOT SHARE)
