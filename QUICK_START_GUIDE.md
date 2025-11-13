# Quick Start: Understanding the ACT Prep Codebase

## 30-Second Summary

Your app is a **90% built** ACT test prep platform. You have:
- Fully functional diagnostic & practice tests ✓
- ~50+ lessons in database ✓
- User progress tracking ✓
- 5-star mastery rating system ✓
- Onboarding survey to collect preferences ✓

But the **core AI piece is missing**: diagnostic results don't drive learning paths, and daily recommendations are hardcoded placeholders instead of personalized.

---

## Files to Know First

### The Three Most Important Files

1. **`/src/components/DiagnosticTest.jsx`** (221 lines)
   - How diagnostic tests work
   - Pattern to follow for test components
   - Shows: loading state → start screen → iframe test → completion

2. **`/src/components/app/PracticeSession.jsx`** (400+ lines)
   - How 5-star mastery system works
   - Shows: practice questions → scoring → star calculation
   - Stores data in localStorage (needs DB sync)

3. **`/src/services/api/diagnostic.service.js`** (274 lines)
   - Pattern for database services
   - Methods: getDiagnosticQuestions, saveDiagnosticAnswer, completeDiagnosticSession
   - Shows error handling & logging

### UI Components Needing Updates

1. **`/src/components/app/CourseContent.jsx`**
   - Currently shows hardcoded Week 1-4 timeline
   - Should show personalized path from database

2. **`/src/components/Home.js`**
   - Currently shows hardcoded "Grammar Fundamentals" task
   - Should show daily recommended tasks

3. **`/src/components/auth/OnboardingQuestionnaire.jsx`**
   - Collects 6 questions about user
   - Data stored in localStorage only
   - Should also save to database

---

## Current Data Flow (What Works)

```
User takes Diagnostic Test
  ↓ DiagnosticTest.jsx loads questions
  ↓ DiagnosticService.getDiagnosticQuestions()
  ↓ Results saved to diagnostic_test_results table
  ↓ (But results are never analyzed!)

User takes Practice Test  
  ↓ PracticeTestPage.jsx loads test
  ↓ PracticeTestsService.getPracticeTestSection()
  ↓ Answers saved to practice_test_results table

User completes lesson
  ↓ PracticeSession.jsx handles practice questions
  ↓ 5-star rating calculated
  ↓ progressService.updateProgress() saves to lesson_progress table
  ↓ Stars saved to localStorage (never synced to DB!)
```

---

## Missing Data Flow (What Needs Building)

```
Diagnostic Results → Analysis → Skill Gaps Identified
  ↓ diagnosticAnalysis.service.js (NEEDS TO BE BUILT)
  ↓ Results saved to user_skill_assessments table (TABLE DOESN'T EXIST)

Onboarding Data + Skill Gaps → Generate Learning Path
  ↓ pathGenerator.service.js (NEEDS TO BE BUILT)
  ↓ Path saved to learning_paths & learning_path_items tables (TABLES DON'T EXIST)

Learning Path → Daily Recommendations
  ↓ dailyRecommendations.service.js (NEEDS TO BE BUILT)
  ↓ Home.js updated to use real data instead of hardcoded

Lesson Completion → Update Mastery → Adjust Path
  ↓ PracticeSession.jsx updated to save to user_mastery_ratings table
  ↓ Algorithm to regenerate path (NEEDS TO BE BUILT)
```

---

## Database Schema: What Exists vs. Missing

### Working Tables (Don't Modify)
```
lesson_progress          - Lesson completion status (✓ synced)
lesson_metadata          - Lesson info (✓ used)
practice_test_results    - Test answers (✓ stored)
diagnostic_test_results  - Diagnostic answers (✓ stored but not analyzed)
profiles                 - User profiles (✓ used)
lesson_examples          - Practice questions (✓ used)
```

### Missing Tables (Need to Create)
```
user_onboarding          - Onboarding survey answers
user_mastery_ratings     - 5-star ratings per lesson
skills                   - Skill taxonomy (~50 skills)
question_skills          - Links questions to skills
user_skill_assessments   - Per-skill mastery level
learning_paths           - User's personalized study plan
learning_path_items      - Lessons in study plan with deadlines
```

---

## The Three Algorithms You Need to Build

### 1. Skill Gap Analysis
```
Input: Diagnostic test results (questions answered, correct/incorrect)
Output: User's strength/weakness by skill
Method: Analyze results grouped by skill, identify < 70% as gaps

Location: src/services/api/diagnosticAnalysis.service.js
Triggered: When user finishes diagnostic test
Stores in: user_skill_assessments table
```

### 2. Learning Path Generation
```
Input: Onboarding data (test date, study hours, weak areas)
       + Skill gaps (from diagnostic)
       + Current mastery (from practice)
Output: Ordered list of lessons with deadlines
Method: 
  - Score skills by priority (50% diagnostic weakness, 30% user concern, 20% low mastery)
  - Find lessons matching high-priority skills
  - Schedule lessons based on test date + available hours
  - Assign due dates

Location: src/services/api/pathGenerator.service.js
Triggered: When user completes diagnostic test (or manually requested)
Stores in: learning_paths & learning_path_items tables
```

### 3. Daily Recommendations
```
Input: User's learning path + today's date
       + Student's progress this week
Output: List of tasks in priority order
Method:
  - Show overdue items first (if student is behind)
  - Show items due today second
  - Show items due this week third
  - If nothing due, suggest next item in path

Location: src/services/api/dailyRecommendations.service.js
Triggered: When user visits home page
Stores in: (no new table, just queries existing data)
```

---

## Key Code Patterns in This Project

### How to Write a Service
```javascript
// src/services/api/myservice.service.js

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const MyService = {
  async getData(param) {
    logger.debug('MyService', 'getData', { param });
    
    const { data, error } = await supabase
      .from('my_table')
      .select('*')
      .eq('id', param);
    
    if (error) {
      errorTracker.trackError('MyService', 'getData', { param }, error);
      return null;
    }
    
    logger.info('MyService', 'getData', { success: true });
    return data;
  }
};

export default MyService;
```

### How to Use a Service in a Component
```javascript
import MyService from '../../services/api/myservice.service';

const MyComponent = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const load = async () => {
      const result = await MyService.getData(id);
      setData(result);
    };
    load();
  }, [id]);
  
  return <div>{data ? 'Loaded' : 'Loading...'}</div>;
};
```

### How to Save User Data
```javascript
// Always use upsert for user-specific data to avoid conflicts
const { error } = await supabase
  .from('user_table')
  .upsert({
    user_id: userId,
    field_1: value1,
    field_2: value2
  }, {
    onConflict: 'user_id,lesson_id'  // Define what makes it unique
  });
```

---

## 5-Minute Setup to Start Building

### 1. Understand the Problem
- You have diagnostic results but never analyze them
- Learning path is hardcoded, not personalized
- Daily tasks are hardcoded, not generated

### 2. Create the Tables
Use the SQL from `IMPLEMENTATION_ROADMAP.md` Section: "Creating Learning Path Tables"
```sql
CREATE TABLE user_onboarding (...)
CREATE TABLE user_mastery_ratings (...)
CREATE TABLE skills (...)
CREATE TABLE question_skills (...)
CREATE TABLE user_skill_assessments (...)
CREATE TABLE learning_paths (...)
CREATE TABLE learning_path_items (...)
```

### 3. Build Three Services (in order)
1. `diagnosticAnalysis.service.js` - Analyze test results
2. `pathGenerator.service.js` - Create personalized path
3. `dailyRecommendations.service.js` - Generate daily tasks

### 4. Update Two Components (in order)
1. `CourseContent.jsx` - Replace hardcoded timeline
2. `Home.js` - Replace hardcoded "What to Do Next"

### 5. Update Two More Components
1. `OnboardingQuestionnaire.jsx` - Save answers to database
2. `PracticeSession.jsx` - Save mastery to database

---

## Debugging Tips

### See What's in Database
```bash
# Open Supabase dashboard and run this SQL
SELECT * FROM lesson_progress WHERE user_id = 'YOUR_USER_ID';
SELECT * FROM diagnostic_test_results WHERE user_id = 'YOUR_USER_ID';
SELECT * FROM practice_test_results WHERE user_id = 'YOUR_USER_ID';
```

### See Console Logs
The code uses structured logging:
```javascript
logger.info('Component', 'method', { data });
logger.debug('Component', 'method', { data });
errorTracker.trackError('Component', 'method', { data }, error);
```
Open browser dev tools (F12) → Console to see these logs.

### Test a Service Directly
```javascript
// In browser console
const DiagnosticService = (await import('./src/services/api/diagnostic.service.js')).default;
const results = await DiagnosticService.getDiagnosticQuestions();
console.log(results);
```

---

## File Locations Quick Reference

```
DATABASE SCHEMA
├── database/migrations/003_create_lesson_progress.sql (current)
├── docs/database/migrations/001_adaptive_learning_schema.sql (full design)
└── [NEW MIGRATIONS WILL GO HERE]

COMPONENTS TO UPDATE
├── src/components/app/CourseContent.jsx
├── src/components/Home.js
├── src/components/app/PracticeSession.jsx
└── src/components/auth/OnboardingQuestionnaire.jsx

SERVICES TO BUILD
├── src/services/api/diagnosticAnalysis.service.js (NEW)
├── src/services/api/pathGenerator.service.js (NEW)
├── src/services/api/dailyRecommendations.service.js (NEW)
└── src/services/api/onboarding.service.js (NEW)

REFERENCE PATTERNS
├── src/services/api/diagnostic.service.js (read pattern)
├── src/services/api/practiceTests.service.js (read pattern)
├── src/services/progressService.js (read/write pattern)
└── src/services/logging/logger.js (logging pattern)
```

---

## Next Steps

1. Read `CODEBASE_ANALYSIS.md` for detailed breakdown of what exists
2. Read `IMPLEMENTATION_ROADMAP.md` for step-by-step build plan
3. Start with Week 1: Move onboarding & mastery data to database
4. Then Week 2-3: Build skill infrastructure
5. Then Week 4-6: Build the three core services
6. Then Week 7-8: Update UI components and adaptive testing

Good luck! You have a solid foundation to build on.
