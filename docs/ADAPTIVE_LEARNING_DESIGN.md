# Adaptive Learning & Personalized Assessment Design Document

## Executive Summary

This document outlines the architecture for implementing an adaptive diagnostic assessment system with personalized lesson plans based on individual student strengths and weaknesses. This system will provide a significant competitive advantage through intelligent question selection and customized learning paths.

---

## 1. Core Objectives

### Primary Goals
1. **Adaptive Diagnostic Assessment**: Questions adapt in real-time based on student performance
2. **Skill Gap Analysis**: Identify specific weaknesses across ACT topics
3. **Personalized Learning Paths**: Generate custom lesson sequences targeting weak areas
4. **Continuous Progress Tracking**: Monitor skill mastery over time
5. **Data-Driven Insights**: Provide actionable feedback to students

### Competitive Advantages
- **Efficiency**: Students spend less time on known material
- **Precision**: Pinpoint exact skill gaps with fewer questions
- **Engagement**: Dynamic difficulty maintains optimal challenge level
- **Results**: Faster improvement through targeted practice

---

## 2. Database Architecture Decision

### Option Analysis

#### Option A: Full Migration to Vector Database (Pinecone, Weaviate, etc.)
**Pros:**
- Semantic question similarity
- Content-based recommendations
- Fast similarity searches

**Cons:**
- Major migration effort
- Loss of relational capabilities
- Overkill for current needs
- Higher costs
- Risk of data corruption during migration

#### Option B: Enhanced PostgreSQL (Supabase) with pgvector extension
**Pros:**
- Keeps existing infrastructure
- Supports both relational and vector operations
- No data migration risk
- Can add vector capabilities incrementally
- Better for transactional data
- Built-in authentication and row-level security

**Cons:**
- Slightly slower vector operations than specialized DBs
- May need optimization at scale

### **RECOMMENDATION: Option B - Enhanced Supabase/PostgreSQL**

**Rationale:**
1. Adaptive testing relies primarily on structured data (IRT parameters, skill mappings)
2. Can add pgvector extension for semantic features later if needed
3. Zero migration risk - purely additive changes
4. Maintains existing lesson and question data
5. PostgreSQL excels at complex queries needed for adaptive algorithms

---

## 3. Database Schema Design

### 3.1 Enhanced Schema (Additions to Existing)

```sql
-- ============================================
-- SKILL TAXONOMY
-- ============================================

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_code VARCHAR(50) UNIQUE NOT NULL,  -- e.g., "ENG_SENT_STRUCT"
  skill_name VARCHAR(200) NOT NULL,         -- e.g., "Sentence Structure"
  section VARCHAR(20) NOT NULL,              -- english, math, reading, science
  parent_skill_id UUID REFERENCES skills(id), -- for hierarchical skills
  description TEXT,
  difficulty_level INTEGER,                   -- 1-5 scale
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_skills_section ON skills(section);
CREATE INDEX idx_skills_parent ON skills(parent_skill_id);

-- ============================================
-- ENHANCED QUESTION BANK
-- ============================================

ALTER TABLE diagnostic_test_questions ADD COLUMN IF NOT EXISTS
  difficulty DECIMAL(3,2),              -- IRT difficulty parameter (-3 to +3)
  discrimination DECIMAL(3,2),          -- IRT discrimination (0 to 2+)
  guessing DECIMAL(3,2),                -- IRT guessing parameter (0 to 0.5)
  exposure_rate INTEGER DEFAULT 0,      -- times question has been shown
  last_calibrated TIMESTAMP,
  is_adaptive BOOLEAN DEFAULT true,
  time_limit_seconds INTEGER,
  explanation TEXT;

-- Question-Skill mapping (many-to-many)
CREATE TABLE question_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES diagnostic_test_questions(id),
  skill_id UUID REFERENCES skills(id),
  importance DECIMAL(2,1) DEFAULT 1.0,  -- weight of this skill for the question
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(question_id, skill_id)
);

CREATE INDEX idx_question_skills_question ON question_skills(question_id);
CREATE INDEX idx_question_skills_skill ON question_skills(skill_id);

-- ============================================
-- USER MANAGEMENT
-- ============================================

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  target_score INTEGER,
  test_date DATE,
  grade_level VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ADAPTIVE ASSESSMENT SESSIONS
-- ============================================

CREATE TABLE assessment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  section VARCHAR(20) NOT NULL,              -- english, math, reading, science
  session_type VARCHAR(50) NOT NULL,         -- diagnostic, practice, review
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  current_ability_estimate DECIMAL(4,2),     -- theta estimate
  standard_error DECIMAL(4,2),               -- SE of theta
  questions_completed INTEGER DEFAULT 0,
  is_complete BOOLEAN DEFAULT false,
  metadata JSONB                              -- session config, flags, etc.
);

CREATE INDEX idx_sessions_user ON assessment_sessions(user_id);
CREATE INDEX idx_sessions_complete ON assessment_sessions(is_complete);

-- ============================================
-- USER RESPONSES
-- ============================================

CREATE TABLE user_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES assessment_sessions(id),
  question_id UUID REFERENCES diagnostic_test_questions(id),
  user_id UUID REFERENCES user_profiles(id),
  selected_answer VARCHAR(10),
  correct_answer VARCHAR(10),
  is_correct BOOLEAN,
  time_spent_seconds INTEGER,
  ability_before DECIMAL(4,2),               -- theta before this question
  ability_after DECIMAL(4,2),                -- theta after this question
  question_difficulty DECIMAL(3,2),          -- IRT difficulty at time of response
  answered_at TIMESTAMP DEFAULT NOW(),
  flagged BOOLEAN DEFAULT false
);

CREATE INDEX idx_responses_session ON user_responses(session_id);
CREATE INDEX idx_responses_user ON user_responses(user_id);
CREATE INDEX idx_responses_question ON user_responses(question_id);

-- ============================================
-- SKILL ASSESSMENTS
-- ============================================

CREATE TABLE user_skill_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  skill_id UUID REFERENCES skills(id),
  ability_estimate DECIMAL(4,2),             -- theta for this skill
  standard_error DECIMAL(4,2),
  mastery_level VARCHAR(20),                 -- beginner, developing, proficient, advanced
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  last_practiced TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

CREATE INDEX idx_skill_assessments_user ON user_skill_assessments(user_id);
CREATE INDEX idx_skill_assessments_skill ON user_skill_assessments(skill_id);
CREATE INDEX idx_skill_assessments_mastery ON user_skill_assessments(mastery_level);

-- ============================================
-- LEARNING PATHS
-- ============================================

CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  target_improvement_areas JSONB,            -- skill IDs and priorities
  estimated_completion_hours INTEGER,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE learning_path_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id UUID REFERENCES learning_paths(id),
  lesson_key VARCHAR(100),                   -- references lessons.lesson_key
  skill_id UUID REFERENCES skills(id),
  sequence_order INTEGER,
  priority VARCHAR(20),                      -- high, medium, low
  status VARCHAR(20) DEFAULT 'not_started',  -- not_started, in_progress, completed
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_path_items_path ON learning_path_items(path_id);
CREATE INDEX idx_path_items_status ON learning_path_items(status);

-- ============================================
-- ANALYTICS & INSIGHTS
-- ============================================

CREATE TABLE daily_progress_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  snapshot_date DATE NOT NULL,
  section VARCHAR(20),
  estimated_score INTEGER,
  questions_practiced INTEGER,
  time_spent_minutes INTEGER,
  skills_improved INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, snapshot_date, section)
);

CREATE INDEX idx_snapshots_user_date ON daily_progress_snapshots(user_id, snapshot_date);
```

---

## 4. Adaptive Testing Algorithm

### 4.1 Item Response Theory (IRT) Implementation

**Model: 3-Parameter Logistic (3PL)**

```
P(θ) = c + (1-c) / (1 + e^(-a(θ-b)))

Where:
- θ (theta): Student ability level
- b: Question difficulty
- a: Question discrimination
- c: Guessing parameter
- P(θ): Probability of correct response
```

### 4.2 Question Selection Strategy

**Algorithm Flow:**

1. **Initialize**: θ = 0 (average ability), SE = 2.0
2. **Select Question**:
   - Maximum Information Criterion: I(θ) = a²P(θ)(1-P(θ))
   - Content balancing: ensure skill coverage
   - Exposure control: avoid overusing questions
3. **Update Estimate**:
   - After each response, recalculate θ using Maximum Likelihood Estimation (MLE)
   - Update SE
4. **Stopping Rules**:
   - SE < 0.3 (sufficient precision)
   - OR minimum 15 questions, maximum 30 questions
   - OR 95% confidence interval width < 1.0

### 4.3 Skill Gap Identification

```javascript
// Pseudocode for skill analysis
function analyzeSkillGaps(userId, sessionId) {
  // 1. Get all responses from session
  responses = getUserResponses(sessionId);

  // 2. Calculate performance per skill
  skillPerformance = {};
  for (response in responses) {
    skills = getQuestionSkills(response.questionId);
    for (skill in skills) {
      if (!skillPerformance[skill.id]) {
        skillPerformance[skill.id] = {
          correct: 0,
          total: 0,
          avgDifficulty: 0
        };
      }
      skillPerformance[skill.id].total++;
      if (response.isCorrect) {
        skillPerformance[skill.id].correct++;
      }
      skillPerformance[skill.id].avgDifficulty += response.questionDifficulty;
    }
  }

  // 3. Identify gaps (< 60% accuracy or low ability estimate)
  gaps = [];
  for (skillId in skillPerformance) {
    accuracy = skillPerformance[skillId].correct / skillPerformance[skillId].total;
    if (accuracy < 0.6) {
      gaps.push({
        skillId,
        severity: 1 - accuracy,
        recommendedLessons: getLessonsForSkill(skillId)
      });
    }
  }

  return gaps.sort((a, b) => b.severity - a.severity);
}
```

---

## 5. Personalized Learning Path Generation

### 5.1 Algorithm

```javascript
function generateLearningPath(userId, assessmentResults) {
  // 1. Identify weak skills
  weakSkills = identifyWeakSkills(assessmentResults);

  // 2. Map to lessons
  recommendedLessons = [];
  for (skill in weakSkills) {
    lessons = getLessonsForSkill(skill.id);

    // Prioritize based on:
    // - Skill importance (foundational vs advanced)
    // - Severity of weakness
    // - Prerequisites (must learn X before Y)
    for (lesson in lessons) {
      recommendedLessons.push({
        lessonKey: lesson.key,
        skillId: skill.id,
        priority: calculatePriority(skill, lesson),
        prerequisites: lesson.prerequisites
      });
    }
  }

  // 3. Order lessons respecting prerequisites
  orderedPath = topologicalSort(recommendedLessons);

  // 4. Create learning path in database
  pathId = createLearningPath(userId, orderedPath);

  return pathId;
}

function calculatePriority(skill, lesson) {
  weights = {
    severity: 0.4,      // How weak is the student
    importance: 0.3,    // How critical is this skill
    difficulty: 0.2,    // Match to student level
    freshness: 0.1      // Recently struggled
  };

  score =
    skill.severity * weights.severity +
    skill.importance * weights.importance +
    (1 - abs(skill.abilityEstimate - lesson.difficulty)) * weights.difficulty +
    skill.recency * weights.freshness;

  return score;
}
```

---

## 6. Implementation Phases

### Phase 1: Database Enhancement (Week 1)
- [ ] Add new tables to Supabase
- [ ] Migrate existing question data
- [ ] Add IRT parameters to questions (initial estimates)
- [ ] Create skill taxonomy for ACT
- [ ] Map questions to skills
- [ ] **Testing**: Verify no data loss, all queries work

### Phase 2: User Authentication & Profiles (Week 1-2)
- [ ] Implement Supabase Auth
- [ ] Create user profile management
- [ ] Progress tracking system
- [ ] **Testing**: Auth flows, data isolation

### Phase 3: Adaptive Testing Engine (Week 2-3)
- [ ] Implement IRT calculation engine
- [ ] Question selection algorithm
- [ ] Real-time ability estimation
- [ ] Adaptive assessment UI
- [ ] **Testing**: Algorithm accuracy, edge cases

### Phase 4: Skill Analysis & Learning Paths (Week 3-4)
- [ ] Skill gap analysis engine
- [ ] Learning path generator
- [ ] Personalized dashboard
- [ ] Progress visualization
- [ ] **Testing**: Recommendation quality, path validity

### Phase 5: Analytics & Optimization (Week 4-5)
- [ ] Analytics dashboard
- [ ] A/B testing framework
- [ ] Question calibration system
- [ ] Performance monitoring
- [ ] **Testing**: Load testing, optimization

---

## 7. Data Migration Strategy

### 7.1 Zero-Downtime Migration Plan

```sql
-- Step 1: Create new tables (additive only)
-- Run all CREATE TABLE statements above

-- Step 2: Backfill skill taxonomy
INSERT INTO skills (skill_code, skill_name, section, difficulty_level) VALUES
  ('ENG_SENT_STRUCT', 'Sentence Structure', 'english', 2),
  ('ENG_COMMA_RULES', 'Comma Rules', 'english', 2),
  ('ENG_PUNCTUATION', 'Advanced Punctuation', 'english', 3),
  -- ... (full taxonomy in separate file)

-- Step 3: Map existing questions to skills
-- Manual or semi-automated based on lesson_title
INSERT INTO question_skills (question_id, skill_id, importance)
SELECT
  q.id,
  s.id,
  1.0
FROM diagnostic_test_questions q
JOIN skills s ON q.lesson_title ILIKE '%' || s.skill_name || '%'
WHERE q.section = s.section;

-- Step 4: Initialize IRT parameters
-- Start with neutral values, will calibrate with real data
UPDATE diagnostic_test_questions
SET
  difficulty = 0.0,          -- neutral
  discrimination = 1.0,      -- moderate
  guessing = 0.25;           -- 25% (4 choices)
```

### 7.2 Rollback Plan

```sql
-- In case of issues, drop new tables (old data untouched)
DROP TABLE IF EXISTS learning_path_items CASCADE;
DROP TABLE IF EXISTS learning_paths CASCADE;
DROP TABLE IF EXISTS user_skill_assessments CASCADE;
DROP TABLE IF EXISTS user_responses CASCADE;
DROP TABLE IF EXISTS assessment_sessions CASCADE;
DROP TABLE IF EXISTS question_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS daily_progress_snapshots CASCADE;

-- Revert column additions
ALTER TABLE diagnostic_test_questions
  DROP COLUMN IF EXISTS difficulty,
  DROP COLUMN IF EXISTS discrimination,
  DROP COLUMN IF EXISTS guessing,
  DROP COLUMN IF EXISTS exposure_rate,
  DROP COLUMN IF EXISTS last_calibrated,
  DROP COLUMN IF EXISTS is_adaptive,
  DROP COLUMN IF EXISTS time_limit_seconds,
  DROP COLUMN IF EXISTS explanation;
```

---

## 8. Module Architecture

### 8.1 Modular Structure

```
src/
├── services/
│   ├── adaptive-testing/
│   │   ├── irt-engine.js           # IRT calculations
│   │   ├── question-selector.js   # Adaptive question selection
│   │   ├── ability-estimator.js   # Theta estimation
│   │   └── stopping-rules.js      # When to stop assessment
│   ├── skill-analysis/
│   │   ├── gap-analyzer.js        # Identify weak skills
│   │   ├── skill-mapper.js        # Question-skill relationships
│   │   └── mastery-calculator.js  # Skill mastery levels
│   ├── learning-paths/
│   │   ├── path-generator.js      # Create personalized paths
│   │   ├── prerequisite-graph.js  # Skill dependencies
│   │   └── priority-ranker.js     # Lesson prioritization
│   └── analytics/
│       ├── progress-tracker.js    # Track user progress
│       ├── insights-generator.js  # Generate insights
│       └── score-predictor.js     # Predict ACT score
├── components/
│   ├── AdaptiveAssessment.js      # Adaptive test UI
│   ├── LearningPathDashboard.js   # Personalized dashboard
│   ├── SkillInsights.js           # Skill breakdown
│   └── ProgressVisualization.js   # Charts & graphs
└── utils/
    ├── supabase-client.js         # Enhanced DB client
    └── cache-manager.js           # Performance optimization
```

### 8.2 Service Interfaces

```javascript
// Adaptive Testing Service
class AdaptiveTestingService {
  async startSession(userId, section);
  async getNextQuestion(sessionId, currentAbility, se);
  async submitResponse(sessionId, questionId, answer, timeSpent);
  async calculateAbility(responses);
  async shouldStopAssessment(sessionId);
  async completeSession(sessionId);
}

// Skill Analysis Service
class SkillAnalysisService {
  async analyzeSession(sessionId);
  async identifyGaps(userId, section);
  async calculateMastery(userId, skillId);
  async updateSkillAssessments(userId, responses);
}

// Learning Path Service
class LearningPathService {
  async generatePath(userId, assessmentResults);
  async getActivePath(userId);
  async updatePathProgress(userId, lessonKey, status);
  async getNextRecommendedLesson(userId);
}
```

---

## 9. Testing Strategy

### 9.1 Data Integrity Tests

```javascript
// Test 1: Verify no data loss after migration
test('All original questions preserved', async () => {
  const before = await getQuestionCount();
  await runMigration();
  const after = await getQuestionCount();
  expect(after).toBe(before);
});

// Test 2: Verify all questions mapped to skills
test('All questions have skills', async () => {
  const unmappedQuestions = await supabase
    .from('diagnostic_test_questions')
    .select('id')
    .not('id', 'in',
      supabase.from('question_skills').select('question_id')
    );
  expect(unmappedQuestions.length).toBe(0);
});
```

### 9.2 Algorithm Tests

```javascript
// Test IRT calculation accuracy
test('IRT probability calculation', () => {
  const theta = 1.0;
  const difficulty = 0.5;
  const discrimination = 1.2;
  const guessing = 0.25;

  const prob = calculateProbability(theta, difficulty, discrimination, guessing);
  expect(prob).toBeCloseTo(0.79, 2);
});

// Test adaptive question selection
test('Selects appropriate difficulty', async () => {
  const ability = 1.5;
  const question = await selectNextQuestion(sessionId, ability);
  expect(question.difficulty).toBeCloseTo(ability, 0.5);
});
```

### 9.3 Integration Tests

```javascript
// Test full adaptive assessment flow
test('Complete adaptive assessment', async () => {
  const session = await startSession(userId, 'english');

  for (let i = 0; i < 20; i++) {
    const question = await getNextQuestion(session.id);
    await submitResponse(session.id, question.id, 'A', 30);
  }

  const result = await completeSession(session.id);
  expect(result.abilityEstimate).toBeDefined();
  expect(result.standardError).toBeLessThan(0.5);
});
```

---

## 10. Performance Considerations

### 10.1 Optimization Strategies

1. **Caching**
   - Cache skill taxonomy (rarely changes)
   - Cache question bank with IRT parameters
   - Cache user ability estimates (short TTL)

2. **Indexing**
   - All foreign keys indexed
   - Composite indexes on frequent query patterns
   - Partial indexes for filtered queries

3. **Query Optimization**
   - Use prepared statements
   - Batch operations where possible
   - Implement connection pooling

4. **Async Processing**
   - Calculate IRT parameters async
   - Generate learning paths in background
   - Update analytics in batch jobs

### 10.2 Monitoring

- Track query performance
- Monitor ability estimation accuracy
- Measure question selection latency
- Log algorithm decisions for review

---

## 11. Security & Privacy

### 11.1 Data Protection

- Row-Level Security (RLS) policies in Supabase
- Users can only access their own data
- Encrypted sensitive fields
- GDPR compliance for data deletion

### 11.2 RLS Policies

```sql
-- Users can only see their own profiles
CREATE POLICY "Users view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can only see their own responses
CREATE POLICY "Users view own responses" ON user_responses
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only see their own assessments
CREATE POLICY "Users view own assessments" ON user_skill_assessments
  FOR SELECT USING (auth.uid() = user_id);
```

---

## 12. Success Metrics

### 12.1 Key Performance Indicators

1. **Assessment Quality**
   - Standard Error < 0.3 for 90% of assessments
   - Average questions to convergence < 25
   - Student satisfaction score > 4.5/5

2. **Learning Path Effectiveness**
   - Students follow recommendations 70%+ of time
   - Average skill improvement 20%+ after completing path
   - Time to proficiency reduced 30% vs. traditional

3. **Engagement**
   - Daily active usage increase 40%
   - Assessment completion rate > 85%
   - Average session time increase 25%

4. **Business Metrics**
   - User retention increase 50%
   - Conversion rate increase 35%
   - Net Promoter Score > 50

---

## 13. Future Enhancements

### Phase 2 Features (Post-MVP)

1. **Vector Embeddings** (if needed)
   - Enable pgvector extension
   - Generate embeddings for questions and lessons
   - Semantic similarity search
   - Content-based recommendations

2. **Social Learning**
   - Study groups based on similar skill gaps
   - Peer comparison (anonymized)
   - Collaborative practice sessions

3. **Advanced Analytics**
   - Predictive score modeling
   - Learning rate analysis
   - Optimal study time recommendations
   - Burnout detection

4. **Content Generation**
   - AI-generated practice questions
   - Personalized examples
   - Adaptive explanations

---

## 14. Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Data loss during migration | Low | High | Comprehensive backups, rollback plan, staged rollout |
| Algorithm inaccuracy | Medium | Medium | Extensive testing, gradual rollout, A/B testing |
| Performance degradation | Medium | Medium | Load testing, caching, query optimization |
| User confusion | Medium | Low | Clear UI, tutorials, gradual feature introduction |
| Skill mapping errors | High | Medium | Manual review, iterative refinement, teacher input |

---

## 15. Timeline & Resources

### Estimated Timeline: 5-6 weeks

**Week 1**: Database schema + migration
**Week 2**: User auth + IRT engine
**Week 3**: Adaptive testing UI
**Week 4**: Learning paths
**Week 5**: Testing + refinement
**Week 6**: Deployment + monitoring

### Required Resources
- 1 Full-stack developer (you)
- Access to Supabase
- Testing dataset (simulate user responses)
- Subject matter experts (for skill taxonomy validation)

---

## 16. Next Steps

1. **Review & Approve** this design document
2. **Create backup** of current Supabase database
3. **Set up staging environment** for testing
4. **Begin Phase 1** - Database enhancement
5. **Establish testing protocols**
6. **Create skill taxonomy** with subject matter experts

---

## Appendix A: ACT Skill Taxonomy (Sample)

```
English Section
├── Grammar & Usage
│   ├── Sentence Structure
│   │   ├── Independent Clauses
│   │   ├── Dependent Clauses
│   │   ├── Comma Splices
│   │   └── Run-on Sentences
│   ├── Punctuation
│   │   ├── Commas
│   │   ├── Semicolons
│   │   ├── Colons
│   │   └── Apostrophes
│   ├── Agreement
│   │   ├── Subject-Verb Agreement
│   │   └── Pronoun Agreement
│   └── Verb Tense
├── Rhetorical Skills
│   ├── Organization
│   ├── Style
│   ├── Word Choice
│   └── Transitions

Math Section
├── Pre-Algebra
│   ├── Number Theory
│   ├── Fractions
│   ├── Percentages
│   └── Ratios & Proportions
├── Elementary Algebra
│   ├── Linear Equations
│   ├── Systems of Equations
│   └── Inequalities
├── Intermediate Algebra
│   ├── Quadratics
│   ├── Functions
│   └── Exponents & Roots
├── Coordinate Geometry
│   ├── Lines & Slopes
│   ├── Graphing
│   └── Distance & Midpoint
├── Plane Geometry
│   ├── Angles & Lines
│   ├── Triangles
│   ├── Circles
│   └── Area & Volume
└── Trigonometry
    ├── Basic Trig Functions
    ├── Trig Identities
    └── Unit Circle

Reading Section
├── Main Idea
├── Supporting Details
├── Inference
├── Vocabulary in Context
├── Author's Purpose
└── Passage Structure

Science Section
├── Data Representation
├── Scientific Investigation
├── Evaluation of Models
└── Interpretation of Data
```

---

## Appendix B: Sample IRT Parameters

Initial estimates for question calibration:

| Question Type | Difficulty (b) | Discrimination (a) | Guessing (c) |
|--------------|----------------|-------------------|--------------|
| Easy recall | -1.0 to -0.5 | 0.8 to 1.2 | 0.25 |
| Medium application | -0.5 to 0.5 | 1.0 to 1.5 | 0.25 |
| Hard analysis | 0.5 to 1.5 | 1.2 to 2.0 | 0.25 |
| Very hard synthesis | 1.5 to 2.5 | 1.5 to 2.5 | 0.20 |

These will be refined through actual student response data.

---

**Document Version**: 1.0
**Last Updated**: 2025-10-06
**Author**: ACT Prep Platform Team
**Status**: PENDING APPROVAL
