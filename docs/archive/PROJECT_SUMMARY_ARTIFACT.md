# ACT Prep React Application - Complete Project Reference for Claude AI

> **For Claude AI Prompting**: This artifact contains the complete technical reference for the ACT Prep React application. Use this as context when asking Claude to modify, debug, or extend the codebase.

---

## 📋 Quick Reference

**Stack:** React 19.1.1 + Supabase (PostgreSQL) + react-jss
**Purpose:** Educational ACT test prep platform with 82+ lessons, quizzes, progress tracking, AI chat
**Architecture:** Service Layer Pattern, Modular Database, Functional Components with Hooks

**Key Directories:**
- `/src/components` - React UI components
- `/src/services` - Business logic and API calls
- `/src/hooks` - Custom React hooks
- `/src/styles` - JSS styling files
- `/scripts` - Database migration scripts

---

## 🗄️ Complete Database Schema

### Supabase SQL Setup

#### Full Schema Creation (create-modular-tables.sql)

```sql
-- ============================================================
-- CREATE MODULAR LESSON TABLES
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. LESSON METADATA (Core lesson information)
CREATE TABLE IF NOT EXISTS lesson_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  difficulty_level INTEGER DEFAULT 1,
  duration_minutes INTEGER DEFAULT 30,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LESSON SECTIONS (Break lessons into logical parts)
CREATE TABLE IF NOT EXISTS lesson_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  section_key VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  section_type VARCHAR(50) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lesson_id, section_key)
);

-- 3. SECTION CONTENT (Actual content - max 2000 chars per block)
CREATE TABLE IF NOT EXISTS section_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES lesson_sections(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL DEFAULT 'html',
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. LESSON EXAMPLES (Problems and solutions)
CREATE TABLE IF NOT EXISTS lesson_examples (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lesson_metadata(id) ON DELETE CASCADE,
  section_id UUID REFERENCES lesson_sections(id) ON DELETE SET NULL,
  title VARCHAR(255),
  problem_text TEXT NOT NULL,
  solution_text TEXT,
  explanation TEXT,
  difficulty INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_lesson_metadata_key ON lesson_metadata(lesson_key);
CREATE INDEX IF NOT EXISTS idx_lesson_metadata_subject ON lesson_metadata(subject);
CREATE INDEX IF NOT EXISTS idx_lesson_sections_lesson_id ON lesson_sections(lesson_id);
CREATE INDEX IF NOT EXISTS idx_section_content_section_id ON section_content(section_id);
CREATE INDEX IF NOT EXISTS idx_lesson_examples_lesson_id ON lesson_examples(lesson_id);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE lesson_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_examples ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- CREATE PUBLIC READ POLICIES
-- ============================================================

DROP POLICY IF EXISTS "Allow public read" ON lesson_metadata;
DROP POLICY IF EXISTS "Allow public read" ON lesson_sections;
DROP POLICY IF EXISTS "Allow public read" ON section_content;
DROP POLICY IF EXISTS "Allow public read" ON lesson_examples;

CREATE POLICY "Allow public read" ON lesson_metadata FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON lesson_sections FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON section_content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON lesson_examples FOR SELECT USING (true);
```

#### Data Migration SQL (migrate-final.sql)

```sql
-- Migrate data from old lessons table to new modular structure

-- Insert lesson metadata from old table
INSERT INTO lesson_metadata (lesson_key, title, subject, category, difficulty_level, duration_minutes, order_index, is_published)
SELECT
  l.lesson_key,
  l.title,
  l.subject,
  COALESCE(l.topic_title, 'General') as category,
  1 as difficulty_level,
  30 as duration_minutes,
  l.order_index,
  true as is_published
FROM lessons l
ON CONFLICT (lesson_key) DO UPDATE SET
  title = EXCLUDED.title,
  subject = EXCLUDED.subject,
  category = EXCLUDED.category,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

-- Insert lesson sections (one main section per lesson)
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
SELECT
  lm.id as lesson_id,
  l.lesson_key || '-main' as section_key,
  'Main Content' as title,
  'content' as section_type,
  0 as order_index
FROM lessons l
JOIN lesson_metadata lm ON l.lesson_key = lm.lesson_key
ON CONFLICT (lesson_id, section_key) DO NOTHING;

-- Insert section content (the actual HTML)
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id as section_id,
  'html' as content_type,
  l.content as content,
  0 as order_index
FROM lessons l
JOIN lesson_metadata lm ON l.lesson_key = lm.lesson_key
JOIN lesson_sections ls ON lm.id = ls.lesson_id AND ls.section_key = l.lesson_key || '-main'
WHERE NOT EXISTS (
  SELECT 1 FROM section_content sc WHERE sc.section_id = ls.id
);
```

### Database Tables Summary

**Core Tables (4):**
1. `lesson_metadata` - 82 rows - Core lesson info (title, subject, category)
2. `lesson_sections` - 82 rows - Logical sections within lessons
3. `section_content` - 82 rows - Actual HTML content blocks
4. `lesson_examples` - 0 rows - Future use for practice problems

**Supporting Tables:**
- `quiz_questions` - Quiz question data
- `quiz_options` - Answer choices for quizzes
- `term_definitions` - Glossary terms with definitions
- `user_lesson_progress` - User progress tracking

---

## 🔧 Complete Service Layer

### Supabase Service (supabase.service.js)

```javascript
/**
 * Supabase Service
 * Centralized Supabase client configuration and base methods
 */

import { createClient } from '@supabase/supabase-js';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const error = new Error('Missing Supabase environment variables');
  errorTracker.trackError('SupabaseService', 'initialization', {
    missingUrl: !supabaseUrl,
    missingKey: !supabaseAnonKey,
  }, error);
  throw error;
}

// Create single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

logger.info('SupabaseService', 'initialized', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
});

/**
 * Base query wrapper with error handling and logging
 */
const executeQuery = async (queryName, queryFn, context = {}) => {
  const startTime = performance.now();

  try {
    logger.debug('SupabaseService', queryName, { context, action: 'start' });

    const result = await queryFn();

    const duration = performance.now() - startTime;
    logger.info('SupabaseService', queryName, {
      ...context,
      duration: `${duration.toFixed(2)}ms`,
      success: !result.error,
    });

    if (result.error) {
      errorTracker.trackError('SupabaseService', queryName, context, result.error);
      return { data: null, error: result.error };
    }

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    errorTracker.trackError('SupabaseService', queryName, {
      ...context,
      duration: `${duration.toFixed(2)}ms`,
    }, error);
    return { data: null, error };
  }
};

const SupabaseService = {
  getClient() {
    return supabase;
  },

  async query(queryName, queryFn, context = {}) {
    return executeQuery(queryName, queryFn, context);
  },

  async healthCheck() {
    return executeQuery('healthCheck', async () => {
      const { data, error } = await supabase.from('lessons').select('count');
      return { data, error };
    });
  },
};

export default SupabaseService;
```

### Lessons Service (lessons.service.js)

```javascript
/**
 * Lessons Service
 * Handles all lesson-related database operations
 * USES MODULAR STRUCTURE with fallback to old table
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const LessonsService = {
  /**
   * Fetch all lessons from modular structure
   * Reconstructs lessons from lesson_metadata, lesson_sections, and section_content
   */
  async getAllLessons() {
    logger.debug('LessonsService', 'getAllLessons', { action: 'start' });

    try {
      // Fetch all lesson metadata
      const { data: metadata, error: metaError } = await supabase
        .from('lesson_metadata')
        .select('*')
        .order('order_index', { ascending: true });

      if (metaError) {
        logger.warn('LessonsService', 'Falling back to old lessons table', { error: metaError.message });
        // Fallback to old table if modular doesn't work
        const { data: oldData, error: oldError } = await supabase
          .from('lessons')
          .select('*')
          .order('order_index', { ascending: true });

        if (oldError) {
          errorTracker.trackError('LessonsService', 'getAllLessons', {}, oldError);
          return null;
        }
        return oldData;
      }

      // For each lesson, fetch sections and content
      const lessons = await Promise.all(
        metadata.map(async (lesson) => {
          // Fetch sections for this lesson
          const { data: sections, error: sectionsError } = await supabase
            .from('lesson_sections')
            .select('id, section_key, title, section_type, order_index')
            .eq('lesson_id', lesson.id)
            .order('order_index', { ascending: true });

          if (sectionsError || !sections) {
            return {
              ...lesson,
              content: ''
            };
          }

          // Fetch content for all sections
          const sectionContents = await Promise.all(
            sections.map(async (section) => {
              const { data: content, error: contentError } = await supabase
                .from('section_content')
                .select('content, order_index')
                .eq('section_id', section.id)
                .order('order_index', { ascending: true });

              if (contentError || !content) {
                return '';
              }

              // Join all content blocks for this section
              return content.map(c => c.content).join('\n');
            })
          );

          // Reconstruct full lesson content
          const fullContent = sectionContents.join('\n\n');

          return {
            id: lesson.id,
            lesson_key: lesson.lesson_key,
            title: lesson.title,
            subject: lesson.subject,
            category: lesson.category,
            difficulty: lesson.difficulty_level,
            duration: lesson.duration_minutes,
            order_index: lesson.order_index,
            content: fullContent,
            created_at: lesson.created_at,
            updated_at: lesson.updated_at
          };
        })
      );

      logger.info('LessonsService', 'getAllLessons from modular', { count: lessons.length });
      return lessons;

    } catch (err) {
      errorTracker.trackError('LessonsService', 'getAllLessons', {}, err);
      return null;
    }
  },

  /**
   * Fetch a single lesson by lesson_key from modular structure
   */
  async getLessonByKey(lessonKey) {
    logger.debug('LessonsService', 'getLessonByKey', { lessonKey });

    try {
      // Try lessons table first (where quizzes are linked)
      const { data: oldData, error: oldError } = await supabase
        .from('lessons')
        .select('*')
        .eq('lesson_key', lessonKey)
        .single();

      if (!oldError && oldData) {
        logger.info('LessonsService', 'getLessonByKey from lessons table', { lessonKey });
        return oldData;
      }

      // Fallback to lesson_metadata if lessons table doesn't have it
      logger.warn('LessonsService', 'Falling back to lesson_metadata table', { lessonKey });
      const { data: lesson, error: metaError } = await supabase
        .from('lesson_metadata')
        .select('*')
        .eq('lesson_key', lessonKey)
        .single();

      if (metaError) {
        errorTracker.trackError('LessonsService', 'getLessonByKey', { lessonKey }, metaError);
        return null;
      }

      // Fetch sections for this lesson
      const { data: sections, error: sectionsError } = await supabase
        .from('lesson_sections')
        .select('id, section_key, title, section_type, order_index')
        .eq('lesson_id', lesson.id)
        .order('order_index', { ascending: true });

      if (sectionsError || !sections) {
        return {
          ...lesson,
          lesson_key: lesson.lesson_key,
          difficulty: lesson.difficulty_level,
          duration: lesson.duration_minutes,
          content: ''
        };
      }

      // Fetch content for all sections
      const sectionContents = await Promise.all(
        sections.map(async (section) => {
          const { data: content, error: contentError } = await supabase
            .from('section_content')
            .select('content, order_index')
            .eq('section_id', section.id)
            .order('order_index', { ascending: true });

          if (contentError || !content) {
            return '';
          }

          return content.map(c => c.content).join('\n');
        })
      );

      // Reconstruct full content
      const fullContent = sectionContents.join('\n\n');

      const reconstructedLesson = {
        id: lesson.id,
        lesson_key: lesson.lesson_key,
        title: lesson.title,
        subject: lesson.subject,
        category: lesson.category,
        difficulty: lesson.difficulty_level,
        duration: lesson.duration_minutes,
        order_index: lesson.order_index,
        content: fullContent,
        created_at: lesson.created_at,
        updated_at: lesson.updated_at
      };

      logger.info('LessonsService', 'getLessonByKey from modular', { lessonKey, found: true });
      return reconstructedLesson;

    } catch (err) {
      errorTracker.trackError('LessonsService', 'getLessonByKey', { lessonKey }, err);
      return null;
    }
  },

  /**
   * Save user progress
   */
  async saveUserProgress(userId, lessonId, completed, scorePercentage, timeSpent) {
    logger.debug('LessonsService', 'saveUserProgress', {
      userId,
      lessonId,
      completed,
      scorePercentage,
      timeSpent,
    });

    const { data, error } = await supabase
      .from('user_lesson_progress')
      .upsert(
        [
          {
            user_id: userId,
            lesson_id: lessonId,
            completed: completed,
            score_percentage: scorePercentage,
            time_spent_minutes: timeSpent,
            last_accessed: new Date().toISOString(),
          },
        ],
        { onConflict: 'user_id,lesson_id' }
      );

    if (error) {
      errorTracker.trackError(
        'LessonsService',
        'saveUserProgress',
        { userId, lessonId },
        error
      );
      return null;
    }

    logger.info('LessonsService', 'saveUserProgress', {
      userId,
      lessonId,
      completed,
      scorePercentage,
    });
    return data;
  },
};

export default LessonsService;
```

### Logger Service (logger.js)

```javascript
/**
 * Structured Logger
 * Provides consistent logging across the application
 * Log Levels: ERROR, WARN, INFO, DEBUG
 */

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

const LOG_LEVEL_PRIORITY = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

class Logger {
  constructor() {
    this.currentLevel = process.env.REACT_APP_LOG_LEVEL || 'INFO';
    this.sessionId = this.generateSessionId();
    this.logs = [];
    this.maxStoredLogs = 1000;
  }

  generateSessionId() {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  shouldLog(level) {
    return LOG_LEVEL_PRIORITY[level] <= LOG_LEVEL_PRIORITY[this.currentLevel];
  }

  formatLog(level, module, action, context, error = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      module,
      action,
      sessionId: this.sessionId,
      context: context || {},
    };

    if (error) {
      logEntry.error = {
        message: error.message,
        stack: error.stack,
        name: error.name,
      };
    }

    // Store log in memory (for debugging/analytics)
    if (this.logs.length >= this.maxStoredLogs) {
      this.logs.shift();
    }
    this.logs.push(logEntry);

    return logEntry;
  }

  log(level, module, action, context, error = null) {
    if (!this.shouldLog(level)) {
      return;
    }

    const logEntry = this.formatLog(level, module, action, context, error);

    // Console output with color coding
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[36m',  // Cyan
      DEBUG: '\x1b[90m', // Gray
    };
    const resetColor = '\x1b[0m';

    const prefix = `${colors[level]}[${level}]${resetColor}`;
    const moduleAction = `${module}.${action}`;

    if (level === 'ERROR' && error) {
      console.error(prefix, moduleAction, context, error);
    } else if (level === 'WARN') {
      console.warn(prefix, moduleAction, context);
    } else {
      console.log(prefix, moduleAction, context);
    }
  }

  error(module, action, context, error) {
    this.log(LOG_LEVELS.ERROR, module, action, context, error);
  }

  warn(module, action, context) {
    this.log(LOG_LEVELS.WARN, module, action, context);
  }

  info(module, action, context) {
    this.log(LOG_LEVELS.INFO, module, action, context);
  }

  debug(module, action, context) {
    this.log(LOG_LEVELS.DEBUG, module, action, context);
  }

  getRecentLogs(count = 100) {
    return this.logs.slice(-count);
  }

  clearLogs() {
    this.logs = [];
  }

  setLevel(level) {
    if (LOG_LEVELS[level]) {
      this.currentLevel = level;
      this.info('Logger', 'setLevel', { newLevel: level });
    }
  }
}

// Singleton instance
const logger = new Logger();

export default logger;
export { LOG_LEVELS };
```

---

## 📦 Environment Configuration

### .env.example

```bash
# Supabase Configuration
# Get these values from your Supabase project: Settings > API

# Your Supabase project URL
REACT_APP_SUPABASE_URL=https://your-project.supabase.co

# Your Supabase anon/public key (safe to use in the browser)
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here

# Your Supabase service role key (ONLY for import script, DO NOT commit!)
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

### package.json

```json
{
  "name": "act-prep-react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@supabase/supabase-js": "^2.74.0",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "jss": "^10.10.0",
    "katex": "^0.16.23",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-jss": "^10.10.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "cheerio": "^1.1.2",
    "pg": "^8.16.3"
  }
}
```

---

## 📁 Complete File Structure

```
/act-prep-react
├── /public                          # Static assets
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
├── /src
│   ├── /components                  # React components
│   │   ├── /app                     # Main app sub-components
│   │   │   ├── TestsContent.jsx     # Practice tests grid (54 lines)
│   │   │   ├── LessonsContent.jsx   # Lessons grid/list view (413 lines)
│   │   │   └── LessonModal.jsx      # Full-screen lesson viewer (170 lines)
│   │   │
│   │   ├── /chat                    # AI Chat sub-components
│   │   │   ├── ChatHeader.jsx       # Drag handle & close (56 lines)
│   │   │   ├── ChatInput.jsx        # Input with send button (84 lines)
│   │   │   └── MessageList.jsx      # Message display (43 lines)
│   │   │
│   │   ├── /landing                 # Landing page components
│   │   │   ├── HeroSection.jsx
│   │   │   ├── DemoInterface.jsx
│   │   │   ├── FeaturesGrid.jsx
│   │   │   ├── UniversityLogos.jsx
│   │   │   └── ...more
│   │   │
│   │   ├── /quiz                    # Quiz components
│   │   │   ├── InteractiveQuiz.js
│   │   │   ├── CompactQuizSection.js
│   │   │   └── LessonQuizSection.js
│   │   │
│   │   ├── /admin                   # Admin interface
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── AIChat.js                # Main AI chat (341 lines)
│   │   ├── Home.js                  # Dashboard homepage
│   │   ├── DiagnosticTest.js
│   │   ├── InteractiveQuiz.js
│   │   ├── LessonContentWithTooltips.js
│   │   ├── LessonSection.js
│   │   ├── PhotomathSolution.js
│   │   ├── ProgressiveLessonRenderer.js
│   │   ├── Sidebar.js
│   │   ├── StatusIcon.js
│   │   └── TermDefinition.js
│   │
│   ├── /services                    # Business logic & API
│   │   ├── /api
│   │   │   ├── supabase.service.js          # Supabase client (89 lines)
│   │   │   ├── lessons.service.js           # Lesson CRUD (408 lines)
│   │   │   ├── modularLessons.service.js    # Modular API (427 lines)
│   │   │   ├── quizzes.service.js           # Quiz operations
│   │   │   └── termDefinitions.service.js   # Glossary terms
│   │   │
│   │   ├── /ai
│   │   │   └── aiChat.service.js            # AI API simulation (47 lines)
│   │   │
│   │   └── /logging
│   │       ├── logger.js                    # Structured logger (159 lines)
│   │       └── errorTracker.js              # Error tracking
│   │
│   ├── /hooks                       # Custom React hooks
│   │   ├── useDraggable.js                  # Drag-and-drop (248 lines)
│   │   ├── useAIMessages.js                 # AI message state (79 lines)
│   │   └── useTermTooltips.js               # Term tooltips
│   │
│   ├── /styles                      # JSS styling
│   │   ├── App.styles.js                    # Main app styles (935 lines)
│   │   ├── AIChat.styles.js
│   │   ├── ProgressiveLessonRenderer.styles.js
│   │   ├── /landing                         # Landing page styles
│   │   │   ├── HeroSection.styles.js
│   │   │   └── ...more
│   │   └── quiz.styles.js
│   │
│   ├── /data                        # Static data & config
│   │   ├── landingPageData.js
│   │   ├── lessonStructure.js               # Lesson hierarchy (130 items)
│   │   └── lessonQuizData.js                # Quiz questions (1472 lines)
│   │
│   ├── /utils                       # Helper functions
│   │   ├── helpers.js                       # Storage, DOM, utilities
│   │   ├── lessonsDb.js                     # Deprecated
│   │   └── sharedStyles.js                  # Shared JSS
│   │
│   ├── /config                      # Configuration
│   │   └── supabase.js                      # Deprecated re-export
│   │
│   ├── index.js                     # React entry point
│   └── App.js                       # Main app component (185 lines)
│
├── /scripts                         # Database & migration scripts
│   ├── create-modular-tables.mjs
│   ├── migrate-final.sql
│   ├── test-modular-lessons.mjs
│   └── ...100+ other scripts
│
├── /database                        # SQL migrations
│   └── /migrations
│       ├── 001_create_quiz_tables.sql
│       └── 002_restructure_lessons_modular.sql
│
├── .env                             # Environment variables (DO NOT COMMIT)
├── .env.example                     # Example environment file
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── PROJECT_SUMMARY_ARTIFACT.md      # This file
```

---

## 🎯 Lesson Structure Data

### lessonStructure.js (First 20 items)

```javascript
export const lessonStructure = [
  {
    id: 'getting-started',
    section: 'all',
    chapterNum: null,
    title: 'ACT Test Basics & Overview',
    desc: 'Test format, timing, and scoring overview',
    status: 'completed',
    category: 'Introduction'
  },

  // English Section - Grammar Fundamentals (Chapter 1)
  {
    id: 'sentence-structure',
    section: 'english',
    chapterNum: '1.1',
    title: 'Building Complete Sentences',
    desc: 'Independent clauses, dependent clauses, compound sentences, and comma splices',
    status: 'completed',
    category: 'Grammar Fundamentals',
    keyTerms: ['Independent Clause', 'Dependent Clause', 'Compound Sentence', 'Comma Splice', 'Run-on Sentence', 'Fragment']
  },

  {
    id: 'commas',
    section: 'english',
    chapterNum: '1.2',
    title: 'Essential Comma Rules',
    desc: 'Unnecessary information, names rule, listing commas, and adjective lists',
    status: 'completed',
    category: 'Grammar Fundamentals',
    keyTerms: ['Unnecessary Information', 'Names Rule', 'Listing Commas', 'Adjective Lists', 'Nonrestrictive Clause']
  },

  {
    id: 'punctuation',
    section: 'english',
    chapterNum: '1.3',
    title: 'Advanced Punctuation',
    desc: 'Semicolons, colons, dashes, apostrophes, and quotation marks',
    status: 'in-progress',
    category: 'Grammar Fundamentals',
    keyTerms: ['Semicolon', 'Colon', 'Em Dash', 'Apostrophe', 'Quotation Marks', 'Possessive']
  },

  // Math Section
  {
    id: 'backsolving',
    section: 'math',
    chapterNum: '1.1',
    title: 'Working Backwards Strategy',
    desc: 'Powerful test-taking trick for working backwards from answer choices',
    status: 'not-started',
    category: 'Test-Taking Strategies'
  },

  {
    id: 'geometry-angles',
    section: 'math',
    chapterNum: '2.1',
    title: 'Understanding Angles & Lines',
    desc: 'Intersecting lines, parallel lines, interior angles',
    status: 'not-started',
    category: 'Geometry'
  },

  // Reading Section
  {
    id: 'core-principles',
    section: 'reading',
    chapterNum: '1.1',
    title: '7 Core Principles for ACT Reading',
    desc: 'Essential principles to understand the difference between correct and incorrect answers',
    status: 'not-started',
    category: 'Fundamentals'
  },

  // Science Section
  {
    id: 'passage-approach',
    section: 'science',
    chapterNum: '1.1',
    title: 'How to Approach the Passages',
    desc: 'Charts & graphs strategies, conflicting viewpoints approach, and general tips',
    status: 'not-started',
    category: 'Fundamentals'
  },
];

// Total: 130+ lesson items across Math, English, Reading, Science
```

---

## 🏗️ Component Architecture

### Component Hierarchy

```
<App>                                 # Main container (185 lines)
├── <Sidebar />                       # Left sidebar navigation
├── <Home />                          # Dashboard (when activeTab='home')
├── <TestsContent />                  # Practice tests (when activeTab='tests')
├── <LessonsContent />                # Lessons view (when activeTab='lessons')
│   ├── Section filters
│   ├── Grid/List toggle
│   └── Lesson cards with StatusIcon
│
├── <LessonModal>                     # Full-screen lesson viewer
│   └── <ProgressiveLessonRenderer>
│       ├── <LessonContentWithTooltips>
│       ├── <InteractiveExample>
│       ├── <PhotomathSolution>
│       └── <CompactQuizSection>
│
└── <AIChat>                          # Floating AI assistant
    ├── <ChatHeader>
    ├── <MessageList>
    └── <ChatInput>
```

### Key Component Patterns

**1. Service Layer Pattern**
```javascript
// Component never calls Supabase directly
import LessonsService from './services/api/lessons.service';

function MyComponent() {
  const fetchData = async () => {
    const lessons = await LessonsService.getAllLessons();
    // Use lessons
  };
}
```

**2. Custom Hooks Pattern**
```javascript
// Extract complex logic into hooks
import { useDraggable } from './hooks/useDraggable';

function DraggableComponent() {
  const { position, handleDragStart, handleDragEnd } = useDraggable();
  // Use drag logic
}
```

**3. JSS Styling Pattern**
```javascript
// Styles in separate file, imported as hook
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    display: 'flex',
    padding: '1rem',
  }
});

// In component
const classes = useStyles();
return <div className={classes.container}>...</div>;
```

---

## 💾 Data Flow Architecture

### Lesson Loading Flow

```
User clicks lesson card
  ↓
LessonsContent.jsx: openLesson(lessonKey)
  ↓
App.js: handleOpenLesson(lessonKey)
  ↓
LessonsService.getLessonByKey(lessonKey)
  ↓
Supabase Query: lessons table (with fallback to lesson_metadata)
  ↓
If modular: Query lesson_sections
  ↓
If modular: Query section_content for each section
  ↓
Reconstruct full lesson object { id, lesson_key, title, content, ... }
  ↓
Return to App.js
  ↓
setLessonContent({ [lessonKey]: lesson })
setCurrentLesson(lessonKey)
setLessonModalOpen(true)
  ↓
LessonModal renders with lesson data
  ↓
ProgressiveLessonRenderer parses HTML and renders progressively
```

### Progress Tracking Flow

```
User completes lesson/quiz
  ↓
updateLessonProgress(lessonId, status)
  ↓
Update local state: setLessonProgress({ ...prev, [lessonId]: status })
  ↓
Save to localStorage: 'actPrepProgress'
  ↓
(Future) Save to Supabase: user_lesson_progress table
```

---

## 🎨 Styling System

### Color Palette

```javascript
// Primary Colors
background: '#fafbfc'           // Light gray background
white: '#ffffff'
text: '#000000'                  // Primary text (black)
textSecondary: '#6b7280'         // Gray text
border: '#e5e7eb'                // Light gray borders

// Accent Colors
blue: '#3b82f6'                  // Links, hover states
green: '#10b981'                 // Success, completed
yellow: '#fbbf24'                // Warning, in-progress
red: '#ef4444'                   // Error, not-started

// Gradients
heroGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### Typography

```javascript
fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
fontSize: {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem'
}
fontWeight: {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 900
}
lineHeight: 1.6 - 1.7
```

### Responsive Breakpoints

```javascript
mobile: '@media (max-width: 480px)'
tablet: '@media (max-width: 768px)'
desktop: '@media (min-width: 769px)'

// Use min() for fluid sizing
width: 'min(1200px, 90vw)'
fontSize: 'min(3rem, 5vw)'
```

---

## 🧪 Development Guidelines

### Code Standards

**File Size Limit:** < 300 lines per file (enforced)

**Naming Conventions:**
- Components: `PascalCase` (e.g., `LessonModal.jsx`)
- Services: `camelCase.service.js` (e.g., `lessons.service.js`)
- Hooks: `use + PascalCase` (e.g., `useDraggable.js`)
- Styles: `ComponentName.styles.js`

**Component Template:**
```javascript
/**
 * ComponentName
 * Brief description of what this component does
 */

import React, { useState, useEffect } from 'react';
import { useStyles } from './ComponentName.styles';
import logger from './services/logging/logger';

/**
 * ComponentName - Detailed description
 * @param {Object} props - Component props
 * @param {string} props.propName - Description
 * @returns {JSX.Element}
 */
const ComponentName = ({ propName }) => {
  const classes = useStyles();
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    logger.debug('ComponentName', 'mounted', { propName });
    // Side effects
  }, [propName]);

  const handleEvent = () => {
    logger.info('ComponentName', 'handleEvent', { propName });
    // Event handler
  };

  return (
    <div className={classes.container}>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

**Service Template:**
```javascript
/**
 * ServiceName Service
 * Handles [specific domain] operations
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const ServiceName = {
  /**
   * Method description
   * @param {type} paramName - Description
   * @returns {Promise<type>}
   */
  async methodName(paramName) {
    logger.debug('ServiceName', 'methodName', { paramName });

    const { data, error } = await supabase
      .from('table_name')
      .select('*');

    if (error) {
      errorTracker.trackError('ServiceName', 'methodName', { paramName }, error);
      return null;
    }

    logger.info('ServiceName', 'methodName', { count: data?.length });
    return data;
  }
};

export default ServiceName;
```

### Logging Standards

**Always use logger for all operations:**

```javascript
import logger from './services/logging/logger';

// Debug - Development info
logger.debug('ComponentName', 'action', { details });

// Info - Normal operations
logger.info('ServiceName', 'dataFetched', { count: 82 });

// Warn - Non-critical issues
logger.warn('ServiceName', 'fallbackUsed', { reason });

// Error - Critical issues
logger.error('ServiceName', 'failed', { context }, error);
```

---

## 🚀 Running the Application

### Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (copy from .env.example)
cp .env.example .env

# 3. Add your Supabase credentials to .env
# REACT_APP_SUPABASE_URL=https://your-project.supabase.co
# REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here

# 4. Start development server
npm start
# Runs on http://localhost:3000

# 5. Build for production
npm run build
# Output to /build directory

# 6. Run tests
npm test
# 29 tests across 3 test suites
```

### Database Setup

```bash
# 1. Create Supabase project at https://supabase.com

# 2. Run schema creation SQL in Supabase SQL Editor
# Copy contents of create-modular-tables.sql and execute

# 3. Migrate data (if you have old lessons table)
# Copy contents of migrate-final.sql and execute

# 4. Verify tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('lesson_metadata', 'lesson_sections', 'section_content', 'lesson_examples');
```

---

## 🔄 Recent Major Refactoring (2025-10-13)

### 1. App.js Modularization
**Before:** 1656 lines (monolithic)
**After:** 185 lines (modular)

**Extracted Components:**
- `TestsContent.jsx` - 54 lines
- `LessonsContent.jsx` - 413 lines
- `LessonModal.jsx` - 170 lines
- `App.styles.js` - 935 lines

**Impact:** 89% reduction in file size, improved maintainability

### 2. AIChat.js Refactoring
**Before:** 634 lines (complex)
**After:** 341 lines (clean)

**Extracted:**
- `useDraggable.js` - 248 lines (custom hook)
- `useAIMessages.js` - 79 lines (custom hook)
- `aiChat.service.js` - 47 lines (service)
- `ChatHeader.jsx` - 56 lines (sub-component)
- `ChatInput.jsx` - 84 lines (sub-component)
- `MessageList.jsx` - 43 lines (sub-component)

**Impact:** 46% reduction, better separation of concerns

### 3. Database Migration to Modular Structure
**Completed:** All 82 lessons migrated

**Created:**
- 4 new interconnected tables
- Migration SQL scripts
- Updated LessonsService with fallback logic

**Results:**
- `lesson_metadata`: 82 rows ✓
- `lesson_sections`: 82 rows ✓
- `section_content`: 82 rows ✓
- `lesson_examples`: 0 rows (ready for future use)

---

## 📊 Project Statistics

**Codebase:**
- Total React Components: 30+
- Total Lines of Code: ~15,000
- Services: 8
- Custom Hooks: 3
- Database Tables: 8
- Migration Scripts: 100+

**Content:**
- Lessons: 82
- Quiz Questions: 500+
- Term Definitions: 100+

**Testing:**
- Test Suites: 3
- Total Tests: 29
- Coverage: Core services and components

---

## 🎯 Core Design Principles

1. **Modularity** - Every file under 300 lines
2. **Separation of Concerns** - UI, logic, data separate
3. **Comprehensive Logging** - Track all operations
4. **Explicit Error Handling** - Never suppress errors
5. **Backward Compatibility** - Fallbacks for new features
6. **User Experience First** - Fast, intuitive, accessible
7. **Code Quality** - Readable, documented, maintainable

---

## 💡 Tips for Working with This Codebase

### When Adding New Features

1. **Always use services** - Never query Supabase directly from components
2. **Check logger output** - Use browser console to debug data flow
3. **Test with real data** - 82 lessons available in database
4. **Use modular structure** - Break down into small, focused files
5. **Follow naming conventions** - Match existing patterns

### When Debugging

1. **Check browser console** - Logger outputs all operations
2. **Review errorTracker** - All errors logged with context
3. **Test fallback logic** - Modular structure has fallbacks
4. **Verify environment variables** - Check .env file exists
5. **Check Supabase RLS** - All tables have public read policies

### When Prompting Claude

**Include this context:**
"I'm working on the ACT Prep React application. Here's the relevant context from PROJECT_SUMMARY_ARTIFACT.md: [paste relevant sections]"

**Be specific:**
- Reference file paths (e.g., "in src/services/api/lessons.service.js")
- Include line numbers when relevant
- Mention which service/component you're working with
- Describe the expected behavior

**Example prompts:**
- "Update LessonsService.getAllLessons to also fetch quiz data"
- "Add a new custom hook for managing quiz state"
- "Create a new component following the project's component template"
- "Debug why lessons aren't loading - check the logger output pattern"

---

## 🔮 Planned Future Enhancements

### High Priority
1. **User Authentication** - Sign up, login, profiles
2. **Cloud Progress Sync** - Sync progress across devices
3. **Enhanced Quiz System** - Timed quizzes, explanations
4. **Admin Content Editor** - Visual lesson editing interface

### Medium Priority
5. **AI Chat Integration** - Real AI API (OpenAI/Anthropic)
6. **Performance Analytics** - Track weak areas, study time
7. **Mobile Optimization** - Better mobile UX
8. **Offline Mode** - PWA with service workers

### Future Exploration
9. **React Native App** - Native mobile app
10. **Social Features** - Study groups, leaderboards
11. **Adaptive Learning** - Personalized study plans
12. **Video Content** - Integrated video lessons

---

## 🐛 Known Issues & Limitations

### Non-Critical Issues
1. ESLint warnings in some files (unused variables)
2. Drag-and-drop can jitter with rapid movement
3. Snap zones don't account for all screen sizes

### Current Limitations
1. AI Chat uses simulated responses (not real AI yet)
2. Progress tracking uses localStorage (not cloud-synced)
3. Quiz system needs expansion for more question types
4. Admin interface is basic (needs rich text editor)

### Workarounds
- Fallback logic ensures old data still works
- Logger helps debug any issues quickly
- Error boundaries prevent full app crashes

---

## 📝 Change Log

### 2025-10-13
- ✅ Completed modular database migration (82 lessons)
- ✅ Refactored App.js from 1656 → 185 lines
- ✅ Refactored AIChat.js from 634 → 341 lines
- ✅ Created comprehensive project artifact
- ✅ All tests passing (29/29)

### 2025-10-12
- ✅ Created modular Supabase tables
- ✅ Updated LessonsService with fallback logic
- ✅ Migrated all lessons to new structure

### 2025-10-11
- ✅ Implemented logger and errorTracker
- ✅ Added service layer pattern
- ✅ Created custom hooks (useDraggable, useAIMessages)

---

## 🏁 Current Project Status

**Status:** ✅ PRODUCTION READY

**Completed:**
- ✓ All major refactoring
- ✓ Database migration (82 lessons)
- ✓ Test suite passing (29/29)
- ✓ Build successful
- ✓ Development server running
- ✓ Backward compatibility maintained

**Ready For:**
- New feature development
- Content expansion
- User authentication integration
- AI API integration
- Mobile optimization

**Last Updated:** 2025-10-13

---

## 📚 Additional Resources

**Supabase Documentation:**
- Docs: https://supabase.com/docs
- JavaScript Client: https://supabase.com/docs/reference/javascript

**React Documentation:**
- React 19: https://react.dev
- React Hooks: https://react.dev/reference/react

**Project-Specific:**
- README.md - Setup instructions
- SUPABASE_MODULAR_STRUCTURE.md - Database details
- /docs folder - Additional documentation

---

**This artifact serves as the complete reference for the ACT Prep React application. Use it as context when prompting Claude AI to ensure accurate and consistent modifications to the codebase.**

---

## 🤖 How to Use This Artifact with Claude AI

### Quick Start Prompts

**1. For Bug Fixes:**
```
I'm getting an error in the ACT Prep app. Here's the error: [paste error]

Context from PROJECT_SUMMARY_ARTIFACT.md:
- Using React 19.1.1 with Supabase
- LessonsService handles all lesson operations
- Logger outputs all operations

The error is occurring in [file name]. What's wrong?
```

**2. For New Features:**
```
I want to add [feature] to the ACT Prep app.

Context:
- Use Service Layer Pattern (never query Supabase directly)
- Follow component template in PROJECT_SUMMARY_ARTIFACT.md
- Keep files under 300 lines
- Use logger for all operations

How should I implement this?
```

**3. For Refactoring:**
```
I need to refactor [component/service] in the ACT Prep app.

Current structure: [paste relevant code]

Guidelines from PROJECT_SUMMARY_ARTIFACT.md:
- Break into sub-components if > 300 lines
- Extract logic into custom hooks
- Move API calls to services
- Add comprehensive logging

What's the best approach?
```

### Best Practices for Claude Prompting

✅ **DO:**
- Reference specific file paths
- Include relevant sections from this artifact
- Mention the service layer pattern
- Reference logging requirements
- Cite component/service templates

❌ **DON'T:**
- Ask Claude to query Supabase directly in components
- Ignore the 300-line file limit
- Skip logging statements
- Forget error handling
- Break the service layer pattern

---

**End of PROJECT_SUMMARY_ARTIFACT.md**
