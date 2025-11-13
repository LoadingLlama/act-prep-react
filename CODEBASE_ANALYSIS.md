# ACT Prep Application - Architecture & Implementation Analysis

## Executive Summary

This is a comprehensive React-based ACT test prep platform with significant infrastructure already in place. The application has:

- **Diagnostic & Practice Test System**: Fully functional with database integration
- **Lesson Infrastructure**: Complete lesson management with ~50+ lessons across 4 sections
- **User Progress Tracking**: Basic lesson progress with localStorage and Supabase sync
- **Mastery Rating System**: 5-star gamified rating system (stored in localStorage)
- **Onboarding Flow**: 6-question questionnaire to collect user preferences
- **Learning Path UI**: Hardcoded placeholder timeline (Week 1-4 with lessons)

However, there are **critical gaps** between the UI/UX vision (personalized adaptive learning) and actual implementation.

---

## PART 1: WHAT EXISTS (Implemented Features)

### 1. Database Schema

**Created Tables:**
- `lesson_progress` - User lesson completion status (not-started, in-progress, completed)
- `lesson_metadata` - Lesson information (title, subject, difficulty)
- `lesson_sections` - Lesson content sections
- `section_content` - Actual lesson HTML content
- `lesson_examples` - Practice problems/examples linked to lessons
- `practice_test_sessions` - User practice test attempts
- `practice_test_results` - Individual question answers
- `practice_test_*_questions` - Questions for each section (English, Math, Reading, Science)
- `practice_test_*_passages` - Passages for reading/science
- `diagnostic_test_questions` - Diagnostic test questions
- `diagnostic_test_sessions` - Diagnostic test attempts
- `diagnostic_test_results` - Diagnostic test answers
- `lesson_comments` - Discussion/Q&A system
- `profiles` - User profile information
- `quizzes` - Quiz metadata
- `lesson_term_definitions` - Vocabulary terms

**Archived (Not Active) Tables:**
See `/docs/database/migrations/001_adaptive_learning_schema.sql`:
- `skills` - Skill taxonomy (never created)
- `question_skills` - Question-skill mapping (never created)
- `user_profiles` (different from current `profiles`) - Extended profile (never created)
- `assessment_sessions` - Session tracking (never created)
- `user_responses` - Detailed response analysis (never created)
- `user_skill_assessments` - Per-skill mastery (never created)
- `learning_paths` - Personalized paths (never created)
- `learning_path_items` - Path lesson items (never created)
- `daily_progress_snapshots` - Daily analytics (never created)

### 2. Diagnostic Test System

**Component:** `/src/components/DiagnosticTest.jsx` (221 lines)
**Status:** FULLY FUNCTIONAL

**Features:**
- Loads all diagnostic questions from database
- Professional start screen with test info
- Session storage for data passing to iframe
- Integration with practice-test.html for test taking
- Message handling for completion
- Loading and error states

**Service:** `/src/services/api/diagnostic.service.js`
- `getDiagnosticQuestions()` - Fetch all questions
- `getDiagnosticQuestionsByLesson()` - Fetch by lesson
- `saveDiagnosticAnswer()` - Record answers
- `createDiagnosticSession()` - Start session
- `completeDiagnosticSession()` - Finish session
- `getUserDiagnosticHistory()` - Get past attempts
- `getUserPerformanceBySection()` - Analytics by section

**Data Flow:**
```
DiagnosticTest.jsx → DiagnosticService → Supabase
                  → sessionStorage → practice-test.html iframe
                  → Message event → completion tracking
```

### 3. Practice Test System

**Components:**
- `PracticeTestPage.jsx` - Full test interface
- `PracticeSession.jsx` - Lesson practice with 5-star rating
- `QuickPractice.js` - Quick practice mode
- `PracticeSection.js` - Section selection

**Status:** FULLY FUNCTIONAL

**Service:** `/src/services/api/practiceTests.service.js`
- `getPracticeTestSection()` - Load section with passages
- `getPracticeTestQuestions()` - Load all test questions
- `getTestStructure()` - Get question counts
- `savePracticeTestAnswer()` - Record answers
- `createPracticeTestSession()` - Start session
- `completePracticeTestSession()` - Finish session
- `getUserPracticeTestHistory()` - Past attempts
- `getUserPerformanceBySection()` - Section analytics
- `getAvailablePracticeTestsCount()` - Count available tests

**Features:**
- Multi-section support (English, Math, Reading, Science)
- Passage/question association
- Image support
- Scoring and statistics

### 4. Lesson Management

**Service:** `/src/services/api/lessons.service.js`
- `getAllLessons()` - Fetch all lessons
- `getLessonByKey()` - Fetch specific lesson
- `getLessonsBySubject()` - Fetch by subject
- `getLessonContent()` - Get lesson HTML
- `getLessonStructure()` - Navigation structure

**Features:**
- ~50+ lessons across 4 sections
- Modular structure with metadata/sections/content
- Cached in memory
- Organized by subject

### 5. Progress Tracking

**Service:** `/src/services/progressService.js`
- `getAllProgress()` - Fetch user's all lesson progress
- `updateProgress()` - Update lesson status
- `getLessonProgress()` - Check single lesson status
- `getProgressStats()` - Get completion statistics
- `migrateLocalStorageProgress()` - Sync localStorage to DB

**Data Storage:**
- Database: `lesson_progress` table (synced)
- localStorage: `actPrepProgress` (local cache)

**Status Values:**
- "not-started"
- "in-progress"
- "completed"

### 6. Mastery/Star Rating System

**Location:** `/src/components/app/PracticeSession.jsx`

**How It Works:**
```javascript
// Stored in localStorage as lesson_mastery_{lessonId}
{
  rating: 0-5 (stars),
  date: ISO timestamp,
  score: percentage correct,
  completions: number of times completed
}
```

**Star Award Logic:**
- 90%+ accuracy = +1.0 star
- 80-89% = +0.75 stars
- 70-79% = +0.5 stars
- 60-69% = +0.25 stars
- 50-59% = -0.25 stars (penalty)
- <50% = -0.5 stars (bigger penalty)

**Current Issues:**
- Stored in localStorage, not database
- No sync mechanism to Supabase
- Not used for recommendations or adaptive logic
- Appears to be for UI display only

### 7. Onboarding System

**Component:** `/src/components/auth/OnboardingQuestionnaire.jsx`

**Questions Collected:**
1. **testDate** - When is your ACT test? (or "not-scheduled")
2. **grade** - What grade are you in? (9-12)
3. **targetScore** - Target ACT score (20-24, 25-29, 30-33, 34-36)
4. **studyTimePerWeek** - Study hours/week (2-4, 5-7, 8-10, 10+)
5. **concernedSections** - Weak sections (multi-select: English, Math, Reading, Science)
6. **studyExperience** - Prior ACT experience (never, some, extensive)

**Storage:**
- localStorage key: `onboardingAnswers`
- Via `onboardingUtils` in `/src/utils/helpers.js`

**Current Status:**
- Data collected ✓
- Data stored in localStorage ✓
- NOT stored in database ✗
- NOT used for recommendations ✗
- NOT used for adaptive logic ✗

### 8. Learning Path UI

**Component:** `/src/components/app/CourseContent.jsx`

**Current Implementation:**
- Shows Week 1-4 hardcoded timeline
- Week 1: "ACT Test Basics" + "Diagnostic Test"
- Week 2-4: Sample lessons with durations
- Displays due dates calculated from today
- Shows skill categories and icons
- Has lesson status tracking

**Issues:**
- Completely hardcoded weeks/lessons
- No personalization based on test date or goals
- No use of onboarding data
- No use of diagnostic results
- Not linked to actual user data

### 9. Home Dashboard

**Component:** `/src/components/Home.js`

**Features:**
- Shows "What to Do Next" section
- Timeline view of upcoming tasks
- Today's tasks
- Progress stats (completed, in-progress, not-started)
- Calendar component

**Issues:**
- Hardcoded tasks ("Grammar Fundamentals")
- Not personalized
- Not based on diagnostic or onboarding data

### 10. Examples Service

**Service:** `/src/services/api/examples.service.js`

**Capabilities:**
- `getExamplesByLessonId()` - Fetch practice questions
- `getExamplesBySubject()` - Fetch by subject
- Examples stored as structured data with:
  - problem_text
  - choices (JSON array)
  - solution_steps (JSON array)
  - answer_explanation
  - Optional: diagram_svg

**Status:** Working for lesson practice questions

---

## PART 2: WHAT'S MISSING (Not Implemented)

### 1. Adaptive Learning Logic

**Missing:**
- No algorithm to select questions based on ability
- No difficulty adjustment based on performance
- No IRT (Item Response Theory) implementation
- No ability estimation

**From Archived Schema:**
- `skills` table (taxonomy) - never created
- `question_skills` mapping - never created
- IRT columns in questions (difficulty, discrimination) - never created
- `user_skill_assessments` (per-skill mastery) - never created
- `user_responses` (detailed analytics) - never created

### 2. Personalized Learning Paths

**Missing:**
- No algorithm to generate paths
- No skill gap analysis
- No recommendation engine

**Required Tables:**
- `learning_paths` - never created
- `learning_path_items` - never created
- `skills` - never created

**Current UI:** CourseContent shows hardcoded Week 1-4

### 3. Daily Recommendations

**Missing:**
- No daily task generation
- No "What to Do Next" logic
- No scheduling algorithm
- No calendar integration for task assignment

**Required:**
- Daily task generation based on:
  - User's test date
  - Study hours/week preference
  - Weak areas (from diagnostic/onboarding)
  - Current mastery levels
  - Estimated completion time

**Current UI:** Home.js shows hardcoded "Grammar Fundamentals" for today

### 4. Diagnostic Result Analysis

**Missing:**
- No analysis of diagnostic test results
- No skill gap identification
- No strength/weakness breakdown
- No performance by question type

**Database:**
- Results ARE saved to `diagnostic_test_results` ✓
- Sessions ARE saved to `diagnostic_test_sessions` ✓
- BUT: No processing or analysis

**Service Method Available:**
- `getUserPerformanceBySection()` - exists but returns raw data

### 5. Adaptive Test Delivery

**Missing:**
- Questions not selected based on difficulty
- No branching logic
- No early stopping (when confidence high)
- No ability estimation during test

**Currently:**
- All questions shown in fixed order
- No adaptation within test

### 6. Performance Analytics

**Missing:**
- No trend analysis over time
- No skill mastery visualization
- No estimated ACT score
- No progress projections

**Required Table:**
- `daily_progress_snapshots` - never created

### 7. Study Plan Generation

**Missing:**
- No algorithm to create personalized study plan
- No time-based scheduling
- No priority calculation

**Inputs Should Come From:**
- Diagnostic test results
- Onboarding answers (test date, study hours, weak areas, target score)
- Current mastery levels

**Should Generate:**
- Lesson sequence
- Dates/deadlines
- Time allocations
- Priority levels

### 8. Database for Onboarding Data

**Missing:**
- Onboarding answers stored ONLY in localStorage
- NOT synced to database
- NO table to store user preferences

**Should Have:**
- Table to store onboarding responses
- Link to user profile
- Timestamps

### 9. Database for Mastery Ratings

**Missing:**
- Star ratings stored ONLY in localStorage
- NOT synced to database
- Used for display, not logic

**Should Have:**
- Supabase table: `user_mastery_ratings`
- Historical tracking
- Trends over time

### 10. Recommendation API

**Missing:**
- No service to recommend next lesson
- No recommendation algorithm
- No content ranking

**Should Return:**
- Next recommended lesson
- Why it's recommended
- Alternative options
- Estimated time

---

## PART 3: DATA FLOW COMPARISON

### What's Implemented Today

```
User Registration
  ↓
Home Dashboard (hardcoded)
  ↓
Can take Diagnostic Test → Results saved to DB
  ↓
Can take Practice Tests → Results saved to DB
  ↓
Can complete lessons → Progress saved to DB
  ↓
Can do practice in lesson → Stars saved to localStorage
```

### What Should Exist

```
User Registration
  ↓
Onboarding Survey (save to DB)
  ↓
Suggested: Take Diagnostic Test
  ↓
Diagnostic Test → Results analyzed for skill gaps
  ↓
Learning Path Generated (based on gaps + preferences)
  ↓
Daily Recommended Tasks (generated from path)
  ↓
User completes task → Mastery updated
  ↓
Algorithm: Adjust path based on updated mastery
  ↓
Daily: Refresh recommendations
```

---

## PART 4: Technical Architecture

### Current Stack
- **Frontend:** React 18+
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **State Management:** React Context + Hooks
- **Styling:** React-JSS
- **Testing:** Jest/React Testing Library

### Service Layer Structure
```
src/services/api/
├── supabase.service.js (connection)
├── diagnostic.service.js ✓
├── practiceTests.service.js ✓
├── lessons.service.js ✓
├── examples.service.js ✓
├── profile.service.js
├── comments.service.js
└── termDefinitions.service.js

src/services/logging/
├── logger.js
└── errorTracker.js
```

### Component Structure
```
src/components/
├── DiagnosticTest.jsx ✓
├── app/
│   ├── PracticeSession.jsx ✓ (5-star system)
│   ├── CourseContent.jsx (hardcoded timeline)
│   ├── LessonModal.jsx
│   └── Home.jsx (hardcoded tasks)
├── auth/
│   └── OnboardingQuestionnaire.jsx ✓ (data collected but not used)
└── ... (68 total components)
```

---

## PART 5: Implementation Priority

### Phase 1: Foundation (Weeks 1-2)
1. Create adaptive learning database tables
   - skills, question_skills, user_skill_assessments
   - learning_paths, learning_path_items
2. Store onboarding data in database
3. Analyze diagnostic test results

### Phase 2: Recommendation Engine (Weeks 3-4)
1. Build skill gap analyzer
2. Create learning path generator
3. Implement daily task recommendation

### Phase 3: UI Integration (Weeks 5-6)
1. Update CourseContent with dynamic paths
2. Update Home with dynamic daily tasks
3. Add performance analytics dashboard

### Phase 4: Adaptive Testing (Weeks 7-8)
1. Implement adaptive question selection
2. Add ability estimation
3. Create early stopping logic

---

## Key Files to Reference

### Database Migrations
- `/database/migrations/003_create_lesson_progress.sql` - Current progress table
- `/docs/database/migrations/001_adaptive_learning_schema.sql` - Full design (not implemented)

### Components
- `/src/components/DiagnosticTest.jsx` - Reference for test flow
- `/src/components/app/PracticeSession.jsx` - Reference for mastery system
- `/src/components/auth/OnboardingQuestionnaire.jsx` - Reference for data collection

### Services
- `/src/services/api/diagnostic.service.js` - Reference for database queries
- `/src/services/api/practiceTests.service.js` - Reference for service pattern
- `/src/services/progressService.js` - Reference for progress tracking

### Documentation
- `DIAGNOSTIC-TEST-FORMAT-ALIGNED.md` - Recent implementation notes
- `SECURITY-FIXES-COMPLETED.md` - Security implementation details

---

## Summary Tables

### Feature Implementation Status

| Feature | Status | Location | Notes |
|---------|--------|----------|-------|
| Diagnostic Test | ✓ Complete | DiagnosticTest.jsx | Fully functional, data saved |
| Practice Tests | ✓ Complete | PracticeTestPage.jsx | All 4 sections, scoring works |
| Lesson Management | ✓ Complete | lessons.service.js | ~50 lessons loaded from DB |
| Lesson Progress | ✓ Complete | lesson_progress table | DB + localStorage sync |
| Onboarding Survey | ✓ Partial | OnboardingQuestionnaire.jsx | Collects data, stored in localStorage only |
| 5-Star Mastery | ✓ Partial | PracticeSession.jsx | Works but stored in localStorage only |
| Skill Taxonomy | ✗ Missing | (archived schema) | Design exists, never implemented |
| Skill Assessment | ✗ Missing | - | Would track per-skill mastery |
| Learning Path Generation | ✗ Missing | - | UI shows hardcoded; algorithm missing |
| Daily Recommendations | ✗ Missing | - | UI shows hardcoded; algorithm missing |
| Adaptive Testing | ✗ Missing | - | No difficulty adjustment mid-test |
| Performance Analytics | ✗ Missing | - | No trend analysis or projections |

### Database Table Status

| Table | Exists | Used | Notes |
|-------|--------|------|-------|
| lesson_progress | ✓ | ✓ | Active, synced to Supabase |
| lesson_metadata | ✓ | ✓ | Active, lesson info |
| practice_test_results | ✓ | ✓ | Active, saves answers |
| diagnostic_test_results | ✓ | ✓ | Active, saves answers |
| profiles | ✓ | ✓ | Active, user info |
| lesson_examples | ✓ | ✓ | Active, practice questions |
| skills | ✗ | ✗ | Designed but never created |
| question_skills | ✗ | ✗ | Designed but never created |
| user_skill_assessments | ✗ | ✗ | Designed but never created |
| learning_paths | ✗ | ✗ | Designed but never created |
| learning_path_items | ✗ | ✗ | Designed but never created |
| daily_progress_snapshots | ✗ | ✗ | Designed but never created |

