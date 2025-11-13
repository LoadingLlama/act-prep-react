# ACT Prep Platform - Implementation Roadmap

## Vision: Adaptive Learning System

```
┌─────────────────────────────────────────────────────────────┐
│              ACT DIAGNOSTIC → PERSONALIZED LEARNING           │
│                      → DAILY GOALS → SUCCESS                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Current State (What Works Today)

```
✓ TESTS
  ├─ Diagnostic Test (fully functional)
  ├─ Practice Tests (all 4 sections)
  └─ Question database (extensive)

✓ LESSONS  
  ├─ ~50+ lessons in database
  ├─ Organized by subject
  └─ Progress tracking (DB + localStorage)

✓ USER DATA COLLECTION
  ├─ Onboarding survey (6 questions)
  ├─ Test results storage
  └─ Lesson progress tracking

⭐ GAMIFICATION
  ├─ 5-star mastery system
  └─ Score tracking

⚠ UI/UX (PLACEHOLDER)
  ├─ Hardcoded Week 1-4 timeline
  ├─ Hardcoded "What to Do Next" tasks
  └─ No personalization
```

---

## What's Missing (The Gap)

```
✗ PERSONALIZATION ENGINE
  ├─ No analysis of diagnostic results
  ├─ No skill gap identification
  └─ No strength/weakness breakdown

✗ RECOMMENDATION ALGORITHM
  ├─ No "next lesson" logic
  ├─ No priority system
  └─ No time-based scheduling

✗ ADAPTIVE PATHS
  ├─ No learning path generation
  ├─ No goal-based planning
  └─ No deadline calculation

✗ DAILY INTELLIGENCE
  ├─ No daily task generation
  ├─ No adaptive difficulty
  └─ No performance-based adjustments

✗ DATA PERSISTENCE
  ├─ Onboarding data: localStorage only
  ├─ Mastery ratings: localStorage only
  └─ No historical trends
```

---

## Building the Bridge

### STEP 1: Enable Data Persistence (1 Week)

#### 1.1 Move Onboarding to Database
```sql
CREATE TABLE user_onboarding (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  test_date DATE,
  grade VARCHAR(2),
  target_score VARCHAR(10),
  study_time_per_week VARCHAR(10),
  concerned_sections TEXT[],
  study_experience VARCHAR(20),
  created_at TIMESTAMP
);
```

**Implementation:**
- Update `OnboardingQuestionnaire.jsx` to save to database after localStorage
- Create `onboarding.service.js` with save/get/update methods
- Add RLS policies for user access

#### 1.2 Move Mastery Ratings to Database
```sql
CREATE TABLE user_mastery_ratings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  lesson_id VARCHAR(100),
  rating DECIMAL(3,2),  -- 0.0 to 5.0
  score_percentage INTEGER,
  completions INTEGER,
  last_updated TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);
```

**Implementation:**
- Update `PracticeSession.jsx` to save to this table
- Create migration to backfill from localStorage
- Sync localStorage with database on save

---

### STEP 2: Create Skill Infrastructure (1 Week)

#### 2.1 Define Skill Taxonomy
```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY,
  skill_code VARCHAR(50) UNIQUE,
  skill_name VARCHAR(200),
  section VARCHAR(20), -- english, math, reading, science
  difficulty_level INTEGER,
  description TEXT
);
```

**Skills to Define (~50 total):**
- English: Grammar, Punctuation, Rhetorical, Organization
- Math: Algebra, Numbers, Geometry, Problem-Solving
- Reading: Comprehension, Inference, Detail, Comparison
- Science: Interpretation, Analysis, Reasoning, Data

#### 2.2 Map Questions to Skills
```sql
CREATE TABLE question_skills (
  id UUID PRIMARY KEY,
  question_id UUID,
  skill_id UUID,
  importance DECIMAL(2,1),  -- how central to this skill
  UNIQUE(question_id, skill_id)
);
```

**Implementation:**
- Analyze existing diagnostic/practice questions
- Assign 1-3 skills per question
- Document mapping in spreadsheet first

---

### STEP 3: Analyze Diagnostic Results (1 Week)

#### 3.1 Create Result Analysis Service

```javascript
// src/services/api/diagnosticAnalysis.service.js

async function analyzeDiagnosticResults(userId, sessionId) {
  // Get user's test results
  const results = await getDiagnosticResults(userId, sessionId);
  
  // Calculate by skill
  const skillAnalysis = calculateSkillPerformance(results);
  
  // Identify gaps (< 70% accuracy)
  const gaps = skillAnalysis.filter(s => s.accuracy < 70);
  
  // Identify strengths (> 85% accuracy)
  const strengths = skillAnalysis.filter(s => s.accuracy > 85);
  
  // Save analysis
  await saveSkillAssessment(userId, skillAnalysis);
  
  return {
    gaps,
    strengths,
    overallAccuracy: calculateOverall(results),
    estimatedScore: estimateACTScore(skillAnalysis)
  };
}
```

#### 3.2 Create Skill Assessment Table
```sql
CREATE TABLE user_skill_assessments (
  id UUID PRIMARY KEY,
  user_id UUID,
  skill_id UUID,
  mastery_level VARCHAR(20),  -- beginner, developing, proficient, advanced
  accuracy_percentage INTEGER,
  questions_attempted INTEGER,
  questions_correct INTEGER,
  updated_at TIMESTAMP,
  UNIQUE(user_id, skill_id)
);
```

**Implementation:**
- Run after every diagnostic test
- Update mastery levels based on accuracy
- Track historical changes

---

### STEP 4: Generate Personalized Learning Paths (1.5 Weeks)

#### 4.1 Create Learning Path Tables
```sql
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY,
  user_id UUID,
  path_name VARCHAR(200),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  target_improvement_areas JSONB,  -- [{skill_id, priority}, ...]
  estimated_completion_hours INTEGER,
  is_active BOOLEAN,
  completion_percentage INTEGER
);

CREATE TABLE learning_path_items (
  id UUID PRIMARY KEY,
  path_id UUID,
  lesson_key VARCHAR(100),
  skill_id UUID,
  sequence_order INTEGER,
  priority VARCHAR(20),  -- critical, high, medium, low
  status VARCHAR(20),    -- not_started, in_progress, completed
  due_date DATE,
  estimated_minutes INTEGER
);
```

#### 4.2 Create Path Generation Algorithm

```javascript
// src/services/api/pathGenerator.service.js

async function generateLearningPath(userId) {
  // Get user preferences from onboarding
  const preferences = await getUserOnboarding(userId);
  
  // Get diagnostic results
  const analysis = await getDiagnosticAnalysis(userId);
  
  // Get skill assessments
  const skillAssessments = await getUserSkillAssessments(userId);
  
  // Calculate priority scores for each skill
  const skillPriorities = calculatePriorities(
    analysis,           // from diagnostic
    preferences,        // weak areas selected
    skillAssessments    // current mastery
  );
  
  // Build lesson sequence
  const lessons = buildLessonSequence(skillPriorities);
  
  // Calculate schedule
  const schedule = calculateSchedule(
    lessons,
    preferences.testDate,
    preferences.studyTimePerWeek
  );
  
  // Save path to database
  const pathId = await saveLearningPath(userId, {
    lessons,
    schedule,
    skillPriorities
  });
  
  return pathId;
}

function calculatePriorities(diagnostic, preferences, current) {
  // Each skill gets a score 0-100
  // Factors:
  // - Diagnostic weakness (50% weight)
  // - User concern (30% weight) 
  // - Low mastery (20% weight)
  
  const skills = {};
  for (const skill of getAllSkills()) {
    const weakness = diagnostic.gaps.includes(skill) ? 50 : 0;
    const concern = preferences.concernedSections.includes(skill.section) ? 30 : 0;
    const lowMastery = (current[skill.id]?.mastery_level === 'beginner') ? 20 : 0;
    
    skills[skill.id] = {
      priority: weakness + concern + lowMastery,
      skill: skill
    };
  }
  
  return Object.values(skills).sort((a, b) => b.priority - a.priority);
}

function calculateSchedule(lessons, testDate, studyHours) {
  // Work backwards from test date
  // Distribute lessons based on study hours per week
  // Higher priority lessons earlier
  // Buffer time before test
  
  const schedule = [];
  const weeksAvailable = getWeeksBetween(today(), testDate) - 1;
  const hoursPerLesson = estimateHours(lesson);
  const totalHours = lessons.reduce((sum, l) => sum + hoursPerHours(l), 0);
  const hoursPerWeek = Math.min(studyHours, totalHours / weeksAvailable);
  
  let currentDate = new Date();
  let weekHours = 0;
  
  for (const lesson of lessons) {
    const duration = hoursPerLesson(lesson);
    
    // Move to next week if needed
    if (weekHours + duration > hoursPerWeek) {
      currentDate = addWeek(currentDate);
      weekHours = 0;
    }
    
    schedule.push({
      lesson,
      dueDate: currentDate,
      estimatedHours: duration
    });
    
    weekHours += duration;
  }
  
  return schedule;
}
```

#### 4.3 Update CourseContent Component
```javascript
// Replace hardcoded Week 1-4 with:
const CourseContent = () => {
  const [learningPath, setLearningPath] = useState(null);
  
  useEffect(() => {
    const loadPath = async () => {
      const path = await pathGenerator.getUserLearningPath(userId);
      setLearningPath(path);
    };
    loadPath();
  }, [userId]);
  
  if (!learningPath) return <Loading />;
  
  return (
    <div>
      {learningPath.items.map((item, week) => (
        <WeekSection
          key={item.id}
          week={week + 1}
          items={item.lessonIds.map(id => ({
            ...lessons[id],
            dueDate: item.dueDates[id],
            priority: item.priorities[id],
            status: lessonProgress[id]
          }))}
        />
      ))}
    </div>
  );
};
```

---

### STEP 5: Daily Recommendations Engine (1 Week)

#### 5.1 Create Daily Task Generation

```javascript
// src/services/api/dailyRecommendations.service.js

async function generateDailyTasks(userId, date = today()) {
  // Get user's active learning path
  const path = await getUserLearningPath(userId);
  
  // Get items due today or overdue
  const dueTodayOrLate = path.items.filter(
    item => isSameDay(item.dueDate, date) || 
             isBefore(item.dueDate, date)
  );
  
  // Get items due soon (within 3 days)
  const dueSoon = path.items.filter(
    item => isBetween(item.dueDate, date, addDays(date, 3))
  );
  
  // Check if user is behind on study goals
  const weekStats = await getWeeklyProgress(userId);
  const isBehind = weekStats.hoursStudied < weekStats.targetHours * 0.8;
  
  // Generate recommendations with priority
  const tasks = [];
  
  // HIGH PRIORITY: Overdue + user is behind
  if (isBehind) {
    tasks.push(...dueTodayOrLate.map(item => ({
      ...item,
      priority: 'critical',
      urgency: 'finish today'
    })));
  }
  
  // MEDIUM PRIORITY: Due today
  tasks.push(...dueTodayOrLate.map(item => ({
    ...item,
    priority: 'high',
    urgency: 'due today'
  })));
  
  // LOW PRIORITY: Due soon
  tasks.push(...dueSoon.slice(0, 2).map(item => ({
    ...item,
    priority: 'medium',
    urgency: `due in ${daysUntil(item.dueDate)} days`
  })));
  
  // If no due items, suggest next item in path
  if (tasks.length === 0) {
    const nextItem = path.items.find(i => i.status === 'not_started');
    if (nextItem) {
      tasks.push({
        ...nextItem,
        priority: 'low',
        urgency: 'good time to get started'
      });
    }
  }
  
  return tasks;
}
```

#### 5.2 Update Home Dashboard

```javascript
// Replace hardcoded Home.js with:
const Home = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const load = async () => {
      const tasks = await dailyRecommendations.generateDailyTasks(userId);
      const stats = await getProgressStats(userId);
      setDailyTasks(tasks);
      setStats(stats);
    };
    load();
  }, [userId]);
  
  return (
    <div>
      <h1>What to Do Next</h1>
      
      {dailyTasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onClick={() => openLesson(task.lesson_key)}
          isPriority={task.priority === 'critical'}
        />
      ))}
      
      <ProgressWidget stats={stats} />
    </div>
  );
};
```

---

### STEP 6: Adaptive Test Delivery (1.5 Weeks)

#### 6.1 Implement Ability Estimation

```javascript
// src/services/ai/abilityEstimation.js

// Use Item Response Theory (IRT) to estimate ability
// after each question

function estimateAbility(previousEstimate, questionDifficulty, isCorrect) {
  // Simple logistic model
  // ability is measured on theta scale
  // difficulty is on same scale
  
  const logit = (ability - questionDifficulty);
  const probability = 1 / (1 + Math.exp(-logit));
  
  // Update using Bayesian approach
  const likelihood = isCorrect ? probability : (1 - probability);
  
  // New estimate moves toward correct/incorrect
  const adjustment = isCorrect 
    ? (1 - probability) * 0.2
    : -probability * 0.2;
  
  return previousEstimate + adjustment;
}
```

#### 6.2 Select Next Question Adaptively

```javascript
// In DiagnosticTest or PracticeTestPage

async function selectNextQuestion(ability, usedQuestionIds) {
  // Get available questions
  const available = await getAvailableQuestions(usedQuestionIds);
  
  // Score each question by how well it would help estimate ability
  // Target difficulty close to current ability
  // Prefer unused questions
  
  const scored = available.map(q => {
    const difficultyMatch = Math.abs(q.difficulty - ability);
    const information = 1 - (difficultyMatch / 3); // 0-1 score
    
    return {
      question: q,
      score: information
    };
  });
  
  // Select top question (most informative)
  return scored.sort((a, b) => b.score - a.score)[0].question;
}
```

---

## Implementation Timeline

### Week 1-2: Database Foundation
- Move onboarding data to database
- Move mastery ratings to database
- Create user_onboarding & user_mastery_ratings tables
- Create services to read/write this data

### Week 3: Skill Infrastructure
- Create skills taxonomy
- Map questions to skills
- Create question_skills table
- Populate skill data

### Week 4: Diagnostic Analysis
- Analyze existing diagnostic results
- Create user_skill_assessments table
- Build diagnosticAnalysis.service.js
- Update diagnostic test flow to trigger analysis

### Week 5-6: Learning Paths
- Create learning_paths tables
- Build pathGenerator.service.js
- Generate paths after diagnostic
- Update CourseContent component

### Week 7: Daily Recommendations  
- Build dailyRecommendations.service.js
- Update Home dashboard
- Add task prioritization logic
- Test with real data

### Week 8: Adaptive Testing
- Implement ability estimation
- Build adaptive question selection
- Update test components
- Test algorithm effectiveness

---

## Success Metrics

After implementation, the system should:

1. **Personalization**
   - Each user gets unique learning path based on diagnostic + preferences
   - Path changes as mastery improves

2. **Engagement**
   - Daily tasks tell user exactly what to study
   - Tasks adapt based on progress
   - Clear why each task is recommended

3. **Effectiveness**
   - Users focus on weak areas first
   - Study time allocated efficiently
   - Progress toward goal score tracked

4. **Analytics**
   - Know estimated improvement timeline
   - Track mastery trends per skill
   - Identify stuck points and provide help

---

## Database Quick Reference

### Tables to Create
- user_onboarding
- user_mastery_ratings
- skills
- question_skills
- user_skill_assessments
- learning_paths
- learning_path_items

### Tables to Modify
- diagnostic_test_questions (add difficulty fields if using IRT)
- practice_test_*_questions (same)

### Existing Tables (Don't Modify)
- lesson_progress ✓
- profiles ✓
- diagnostic_test_results ✓
- practice_test_results ✓

---

## Code Organization

```
src/services/api/
├── pathGenerator.service.js (NEW)
├── dailyRecommendations.service.js (NEW)
├── diagnosticAnalysis.service.js (NEW)
├── onboarding.service.js (NEW)
├── userMastery.service.js (NEW)
├── diagnostic.service.js (UPDATED)
└── practiceTests.service.js (UPDATED)

src/services/ai/
├── abilityEstimation.js (NEW)
└── adaptiveAlgorithms.js (NEW)

src/components/auth/
├── OnboardingQuestionnaire.jsx (UPDATED)
└── onboarding.styles.js

src/components/app/
├── CourseContent.jsx (UPDATED)
├── Home.js (UPDATED)
├── DiagnosticAnalysis.jsx (NEW)
└── LearningPathView.jsx (NEW)
```

---

## References in Codebase

- Archived schema: `/docs/database/migrations/001_adaptive_learning_schema.sql`
- Current diagnostic: `/src/components/DiagnosticTest.jsx`
- Current mastery: `/src/components/app/PracticeSession.jsx`
- Current onboarding: `/src/components/auth/OnboardingQuestionnaire.jsx`
- Current timeline: `/src/components/app/CourseContent.jsx`
