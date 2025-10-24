# PHASE 7: TECHNICAL DETAILS & APPENDICES

**Part of**: [ACT Question Bank Master Plan v2.0](./00-MASTER-INDEX.md)
**Duration**: Reference document (consulted throughout all phases)
**Purpose**: Complete technical specifications, risk mitigation, deployment, and reference materials

---

## TABLE OF CONTENTS

1. [Complete Tech Stack](#complete-tech-stack)
2. [Directory Structure](#directory-structure)
3. [Risk Mitigation Strategies](#risk-mitigation-strategies)
4. [Deployment Guide](#deployment-guide)
5. [Appendix A: Sample Queries](#appendix-a-sample-queries)
6. [Appendix B: Milestones & Metrics](#appendix-b-milestones--metrics)
7. [Appendix C: Testing Strategy](#appendix-c-testing-strategy)
8. [Appendix D: Troubleshooting Guide](#appendix-d-troubleshooting-guide)

---

## COMPLETE TECH STACK

### Core Technologies

```json
{
  "runtime": {
    "node": ">=18.0.0",
    "typescript": "^5.3.0"
  },
  "database": {
    "platform": "Supabase",
    "engine": "PostgreSQL 15+",
    "storage": "Supabase Storage",
    "realtime": "Supabase Realtime (optional)"
  },
  "ai": {
    "provider": "Anthropic",
    "model": "claude-3-5-sonnet-20241022",
    "sdk": "@anthropic-ai/sdk ^0.9.0"
  },
  "frontend": {
    "framework": "React 18+",
    "ui": "Tailwind CSS + shadcn/ui",
    "state": "React Context / Zustand (optional)",
    "router": "React Router v6"
  }
}
```

### Key Dependencies

**Database & Backend**:
```bash
npm install @supabase/supabase-js dotenv uuid
```

**AI & Embeddings**:
```bash
npm install @anthropic-ai/sdk openai  # OpenAI for embeddings API
```

**Utilities**:
```bash
npm install zod           # Schema validation
npm install cheerio       # HTML parsing (if extracting from web)
npm install pdf-parse     # PDF parsing (if extracting from PDFs)
```

**Development**:
```bash
npm install -D vitest @vitest/ui      # Testing
npm install -D tsx                    # TypeScript execution
npm install -D eslint prettier        # Linting & formatting
```

### Environment Variables

Create `.env` file:
```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI (for embeddings only)
OPENAI_API_KEY=sk-...

# Configuration
NODE_ENV=development
LOG_LEVEL=info
```

---

## DIRECTORY STRUCTURE

### Complete Project Layout

```
act-prep-react/
│
├── docs/                                    # All documentation
│   ├── master-plan/
│   │   ├── 00-MASTER-INDEX.md              # Navigation hub
│   │   ├── 01-DATABASE-SCHEMA.md           # Database design
│   │   ├── 02-PHASE-1-SETUP.md             # Database setup
│   │   ├── 03-PHASE-2-EXTRACTION.md        # Data extraction
│   │   ├── 04-PHASE-3-ANALYSIS.md          # Pattern analysis
│   │   ├── 05-PHASE-4-GENERATION.md        # Question generation
│   │   ├── 06-PHASE-5-VALIDATION.md        # Testing & validation
│   │   ├── 07-TECHNICAL-DETAILS.md         # This document
│   │   ├── README.md                        # Quick start
│   │   └── STATUS.md                        # Current status
│   ├── LESSON_TAGGING_INTEGRATION.md        # Question-to-lesson mapping
│   └── MASTER_PLAN_GAP_ANALYSIS.md          # Gap analysis (15 gaps)
│
├── scripts/                                 # All automation scripts
│   ├── setup/
│   │   ├── 01-test-connection.mjs          # Test Supabase connection
│   │   ├── 02-create-tables.mjs            # Create all 10 tables
│   │   ├── 03-create-indexes.mjs           # Create all indexes
│   │   └── 04-seed-test-data.mjs           # Insert test data
│   │
│   ├── extraction/
│   │   ├── extract-test.mjs                # Main extraction script
│   │   ├── extract-english.mjs             # English section
│   │   ├── extract-math.mjs                # Math section
│   │   ├── extract-reading.mjs             # Reading section
│   │   ├── extract-science.mjs             # Science section
│   │   ├── upload-figures.mjs              # Upload figures to storage
│   │   ├── generate-explanations.mjs       # AI explanation generation
│   │   ├── detect-duplicates.mjs           # Duplicate detection
│   │   └── tag-lessons.mjs                 # Lesson tagging
│   │
│   ├── analysis/
│   │   ├── classify-questions.mjs          # Question type classification
│   │   ├── analyze-distractors.mjs         # Distractor analysis
│   │   ├── extract-patterns.mjs            # Pattern extraction
│   │   └── generate-templates.mjs          # Template generation
│   │
│   ├── generation/
│   │   ├── template-generator.mjs          # Template-based generation
│   │   ├── ai-generator.mjs                # AI-based generation
│   │   ├── hybrid-generator.mjs            # Hybrid approach
│   │   └── batch-generate.mjs              # Batch generation
│   │
│   ├── validation/
│   │   ├── automated-qa.mjs                # Tier 1: Automated checks
│   │   ├── random-sample-qa.mjs            # Tier 2: Random sampling
│   │   ├── targeted-qa.mjs                 # Tier 3: Targeted review
│   │   └── export-review-list.mjs          # Export questions for review
│   │
│   ├── utils/
│   │   ├── supabase-client.mjs             # Supabase client singleton
│   │   ├── anthropic-client.mjs            # Claude client singleton
│   │   ├── embeddings.mjs                  # Embedding utilities
│   │   ├── similarity.mjs                  # Cosine similarity
│   │   ├── logger.mjs                      # Structured logging
│   │   └── validators.mjs                  # Zod schemas
│   │
│   └── maintenance/
│       ├── daily-backup.mjs                # Daily database backup
│       ├── restore-backup.mjs              # Restore from backup
│       ├── refresh-materialized-views.mjs  # Refresh cached views
│       └── cleanup-duplicates.mjs          # Remove duplicate questions
│
├── database/
│   ├── schema/
│   │   ├── 00-tables.sql                   # Table definitions
│   │   ├── 01-indexes.sql                  # Index definitions
│   │   ├── 02-functions.sql                # Stored procedures
│   │   └── 03-views.sql                    # Materialized views
│   │
│   ├── migrations/
│   │   ├── 20250101_initial.sql            # Initial schema
│   │   ├── 20250102_add_explanations.sql   # Gap 2: Explanations
│   │   ├── 20250103_add_duplicates.sql     # Gap 3: Duplicates
│   │   └── 20250104_add_versioning.sql     # Gap 8: Versioning
│   │
│   └── seeds/
│       ├── test-data.sql                   # Test data for development
│       └── lesson-mappings.sql             # Question type → lesson mappings
│
├── src/                                     # Frontend application
│   ├── components/
│   │   ├── QuestionCard.tsx                # Display individual question
│   │   ├── AnswerChoices.tsx               # Answer choice buttons
│   │   ├── Explanation.tsx                 # Show explanation after answer
│   │   └── LessonFilter.tsx                # Filter by lesson
│   │
│   ├── hooks/
│   │   ├── useQuestions.ts                 # Fetch questions from API
│   │   ├── useStudentProgress.ts           # Track student progress
│   │   └── useWeakAreas.ts                 # Identify weak areas
│   │
│   ├── lib/
│   │   ├── supabase.ts                     # Supabase client (frontend)
│   │   └── api.ts                          # API layer
│   │
│   └── pages/
│       ├── Dashboard.tsx                   # Student dashboard
│       ├── Practice.tsx                    # Practice questions
│       └── Review.tsx                      # Review weak areas
│
├── supabase/
│   └── functions/                          # Edge Functions (Gap 7)
│       ├── get-next-questions/
│       │   └── index.ts                    # Get personalized questions
│       ├── record-answer/
│       │   └── index.ts                    # Record student answer
│       └── analyze-progress/
│           └── index.ts                    # Analyze student progress
│
├── backups/                                # Database backups (Gap 6)
│   ├── daily/                              # Daily automated backups
│   ├── checkpoints/                        # Extraction checkpoints
│   └── pre-generation/                     # Before generation phase
│
├── data/                                   # Source data
│   ├── official-tests/                     # 7 official ACT practice tests
│   │   ├── test-1.pdf
│   │   ├── test-2.pdf
│   │   └── ...
│   │
│   └── figures/                            # Extracted figures (Gap 1)
│       ├── test-1/
│       │   ├── math/
│       │   ├── reading/
│       │   └── science/
│       └── ...
│
├── tests/                                  # Test suites
│   ├── unit/                               # Unit tests
│   ├── integration/                        # Integration tests
│   └── e2e/                                # End-to-end tests
│
├── .env                                    # Environment variables
├── .env.example                            # Example env file
├── package.json                            # Dependencies
├── tsconfig.json                           # TypeScript config
├── vitest.config.ts                        # Test config
└── README.md                               # Project README
```

---

## RISK MITIGATION STRATEGIES

### Risk 1: Copyright/Legal Issues

**Risk Level**: HIGH
**Probability**: Medium
**Impact**: Severe (could halt entire project)

**Mitigation**:
1. **Use Fair Use Justification** (Gap 9):
   - Extract patterns, not verbatim questions
   - Generate NEW questions based on patterns
   - Educational, non-commercial use
   - Transformative purpose

2. **Documentation**:
   ```markdown
   # Fair Use Justification

   This project analyzes ACT practice tests for EDUCATIONAL purposes:
   - We extract PATTERNS from official tests
   - We generate NEW questions (not copying)
   - Non-commercial student test prep
   - Transformative use (analysis → generation)

   We do NOT redistribute official ACT questions verbatim.
   ```

3. **Legal Review**:
   - Consult education law attorney before launch
   - Review ACT Inc. terms of service
   - Consider licensing official content if needed

**Contingency Plan**:
- If challenged, immediately remove all original questions
- Retain only AI-generated questions based on patterns
- Pivot to 100% synthetic question generation

---

### Risk 2: AI Generation Quality

**Risk Level**: MEDIUM
**Probability**: High
**Impact**: Medium (poor questions hurt learning)

**Mitigation**:
1. **3-Tier QA Process** (Gap 4):
   - Tier 1: Automated checks (100% coverage)
   - Tier 2: Random sampling (10% manual review)
   - Tier 3: Targeted review (<5% error rate threshold)

2. **Quality Metrics**:
   ```javascript
   const qualityChecks = {
     accurateAnswer: true,          // Correct answer is actually correct
     plausibleDistractors: true,    // Wrong answers seem reasonable
     appropriateDifficulty: true,   // Matches ACT difficulty
     noAmbiguity: true,             // Only one correct answer
     properGrammar: true,           // No grammar errors
     naturalLanguage: true          // Sounds like real ACT question
   };
   ```

3. **Human Review**:
   - Subject matter expert reviews all generated questions
   - Student beta testers provide feedback
   - Iterative improvement based on feedback

**Contingency Plan**:
- Start with template-based generation (higher quality, lower variability)
- Only use AI enhancement after templates proven
- Maintain quality dashboard with real-time metrics

---

### Risk 3: Data Extraction Errors

**Risk Level**: MEDIUM
**Probability**: Medium
**Impact**: High (garbage in = garbage out)

**Mitigation**:
1. **Automated Validation** (Phase 2):
   ```javascript
   const extractionChecks = [
     { name: 'Question count', expected: 215, actual: data.questions.length },
     { name: 'All have answers', check: () => data.questions.every(q => q.correct_answer) },
     { name: 'No duplicates', check: () => new Set(ids).size === ids.length },
     { name: 'Valid sections', check: () => sections.every(s => ['E','M','R','S'].includes(s)) }
   ];
   ```

2. **Checkpointing** (Gap 6):
   - Save progress after each test extraction
   - Enable rollback if errors discovered
   - Incremental verification

3. **Duplicate Detection** (Gap 3):
   - Embedding-based similarity (>95% = duplicate)
   - Flag duplicates, don't delete
   - Manual review of flagged questions

**Contingency Plan**:
- If >10% error rate, re-extract that test
- Use backup checkpoint before bad extraction
- Manual verification for critical questions

---

### Risk 4: Database Performance Issues

**Risk Level**: LOW
**Probability**: Medium (as database grows)
**Impact**: Medium (slow queries hurt UX)

**Mitigation**:
1. **Advanced Indexing** (Gap 10):
   ```sql
   -- Composite indexes for common queries
   CREATE INDEX idx_questions_section_lesson
     ON act_questions(section, primary_lesson_key)
     WHERE is_duplicate = false;

   -- Partial indexes for filtered queries
   CREATE INDEX idx_questions_available
     ON act_questions(id, section, difficulty_level)
     WHERE is_duplicate = false AND generation_method IS NOT NULL;
   ```

2. **Materialized Views**:
   ```sql
   CREATE MATERIALIZED VIEW question_statistics AS
   SELECT
     section,
     primary_lesson_key,
     COUNT(*) as total_questions,
     AVG(CASE WHEN generation_method IS NOT NULL THEN 1 ELSE 0 END) as pct_generated
   FROM act_questions
   WHERE is_duplicate = false
   GROUP BY section, primary_lesson_key;

   -- Refresh nightly
   REFRESH MATERIALIZED VIEW CONCURRENTLY question_statistics;
   ```

3. **Caching**:
   ```javascript
   // Cache frequently accessed data
   const cache = new Map();
   const CACHE_TTL = 60 * 60 * 1000; // 1 hour

   export async function getCachedQuestions(key, fetcher) {
     if (cache.has(key)) {
       const { data, timestamp } = cache.get(key);
       if (Date.now() - timestamp < CACHE_TTL) {
         return data;
       }
     }

     const data = await fetcher();
     cache.set(key, { data, timestamp: Date.now() });
     return data;
   }
   ```

**Monitoring**:
```sql
-- Identify slow queries
SELECT
  query,
  mean_exec_time,
  calls
FROM pg_stat_statements
WHERE mean_exec_time > 1000  -- Queries taking >1 second
ORDER BY mean_exec_time DESC
LIMIT 20;
```

**Contingency Plan**:
- Enable Supabase connection pooling
- Upgrade to larger database instance if needed
- Implement query result caching layer

---

### Risk 5: API Cost Overruns

**Risk Level**: MEDIUM
**Probability**: Medium
**Impact**: Medium (budget constraints)

**Budget Estimate**:
- **Explanations**: ~$50-100 (one-time, 1,680 questions)
- **Generation**: ~$100-300 (ongoing, 5,000-10,000 questions)
- **Embeddings**: ~$5-15 (one-time, 1,680 questions)
- **Total**: $155-415

**Mitigation**:
1. **Rate Limiting**:
   ```javascript
   import pLimit from 'p-limit';

   const limit = pLimit(5); // Max 5 concurrent API calls

   const promises = questions.map(q =>
     limit(() => generateExplanation(q))
   );

   await Promise.all(promises);
   ```

2. **Batch Processing**:
   ```javascript
   // Process in chunks to avoid timeout
   async function batchGenerate(questions, batchSize = 10) {
     for (let i = 0; i < questions.length; i += batchSize) {
       const batch = questions.slice(i, i + batchSize);
       await Promise.all(batch.map(q => generateQuestion(q)));

       // Log progress
       console.log(`Processed ${i + batch.length}/${questions.length}`);
     }
   }
   ```

3. **Cost Monitoring**:
   ```javascript
   let totalTokens = 0;
   const COST_PER_1M_TOKENS = 3.00; // Claude Sonnet pricing

   function trackCost(response) {
     const tokens = response.usage.input_tokens + response.usage.output_tokens;
     totalTokens += tokens;

     const estimatedCost = (totalTokens / 1_000_000) * COST_PER_1M_TOKENS;
     console.log(`Total cost so far: $${estimatedCost.toFixed(2)}`);

     if (estimatedCost > 500) {
       throw new Error('Budget limit exceeded! Stop processing.');
     }
   }
   ```

**Contingency Plan**:
- If costs exceed budget, pause AI generation
- Use more template-based generation (free)
- Consider cheaper models for simple tasks (Claude Haiku)

---

## DEPLOYMENT GUIDE

### Phase 1: Development Setup

**Week 1: Local Environment**

1. **Clone & Install**:
   ```bash
   cd /Users/cadenchiang/Desktop/act-prep-react
   npm install
   ```

2. **Configure Supabase**:
   - Create account at supabase.com
   - Create new project: "act-question-bank"
   - Copy URL and keys to `.env`

3. **Run Setup Scripts**:
   ```bash
   npm run setup:test-connection
   npm run setup:create-tables
   npm run setup:create-indexes
   npm run setup:seed-test-data
   ```

4. **Verify**:
   ```bash
   npm run test:setup
   ```

---

### Phase 2: Extraction Pipeline

**Weeks 2-5: Extract All 7 Tests**

1. **Prepare Source Data**:
   - Place 7 ACT PDFs in `data/official-tests/`
   - Create `data/figures/` directory structure

2. **Extract First Test** (manual verification):
   ```bash
   npm run extract -- --test 1 --section all
   npm run qa:automated -- --test 1
   ```

3. **Review & Fix**:
   - Check extraction quality
   - Fix any parsing errors
   - Update extraction scripts if needed

4. **Extract Remaining Tests** (automated):
   ```bash
   for i in {2..7}; do
     npm run extract -- --test $i --section all
     npm run qa:automated -- --test $i
   done
   ```

5. **Post-Extraction**:
   ```bash
   npm run detect-duplicates
   npm run tag-lessons
   npm run generate-explanations
   ```

---

### Phase 3: Analysis & Templates

**Weeks 6-7: Pattern Extraction**

1. **Classify Questions**:
   ```bash
   npm run classify:all
   ```

2. **Analyze Distractors**:
   ```bash
   npm run analyze:distractors
   ```

3. **Generate Templates**:
   ```bash
   npm run analyze:extract-patterns
   npm run analyze:generate-templates
   ```

4. **Verify**:
   ```bash
   npm run test:analysis
   ```

---

### Phase 4: Question Generation

**Weeks 8-10: Generate New Questions**

1. **Start with Templates**:
   ```bash
   npm run generate:template -- --pattern quadratic_equations --count 10
   ```

2. **Test AI Generation**:
   ```bash
   npm run generate:ai -- --pattern subject_verb_agreement --count 5
   ```

3. **Batch Generation**:
   ```bash
   npm run generate:batch -- --method hybrid --count 100
   ```

4. **QA Each Batch**:
   ```bash
   npm run qa:generated -- --batch 1
   ```

---

### Phase 5: Production Deployment

**Week 11: Deploy to Production**

1. **Deploy Edge Functions**:
   ```bash
   cd supabase/functions
   supabase functions deploy get-next-questions
   supabase functions deploy record-answer
   supabase functions deploy analyze-progress
   ```

2. **Deploy Frontend**:
   ```bash
   npm run build
   # Deploy to Vercel/Netlify/etc.
   ```

3. **Enable Backups**:
   ```bash
   # Set up daily backup cron job
   crontab -e
   # Add: 0 2 * * * /path/to/scripts/maintenance/daily-backup.mjs
   ```

4. **Monitoring**:
   - Set up Supabase monitoring dashboard
   - Configure error alerts
   - Track API costs daily

---

### Maintenance Schedule

**Daily**:
- Automated database backup (2 AM)
- Cost monitoring check

**Weekly**:
- Review error logs
- Check student feedback
- Review newly generated questions

**Monthly**:
- Refresh materialized views
- Cleanup old backups
- Review duplicate detection results

---

## APPENDIX A: SAMPLE QUERIES

### Query 1: Get Unseen Questions for Student

```javascript
/**
 * Get 10 random unseen questions for a student filtered by section/lesson
 */
export async function getNextQuestions(userId, filters = {}) {
  // Step 1: Get seen question IDs
  const { data: seen } = await supabase
    .from('student_question_history')
    .select('question_id')
    .eq('user_id', userId);

  const seenIds = seen.map(s => s.question_id);

  // Step 2: Build query
  let query = supabase
    .from('act_questions')
    .select(`
      *,
      primary_lesson:lessons!act_questions_primary_lesson_id_fkey(
        lesson_key,
        title,
        subject
      )
    `)
    .eq('is_duplicate', false);

  // Exclude seen questions
  if (seenIds.length > 0) {
    query = query.not('id', 'in', `(${seenIds.join(',')})`);
  }

  // Apply filters
  if (filters.section) {
    query = query.eq('section', filters.section);
  }

  if (filters.lessonKey) {
    query = query.eq('primary_lesson_key', filters.lessonKey);
  }

  if (filters.difficultyLevel) {
    query = query.eq('difficulty_level', filters.difficultyLevel);
  }

  // Random order, limit 10
  const { data, error } = await query
    .order('RANDOM()')
    .limit(10);

  if (error) throw error;
  return data;
}
```

---

### Query 2: Analyze Student Weak Areas

```javascript
/**
 * Identify lessons where student has <70% accuracy
 */
export async function getWeakAreas(userId) {
  const { data, error } = await supabase.rpc('analyze_weak_areas', {
    p_user_id: userId
  });

  if (error) throw error;
  return data;
}
```

**Stored Procedure**:
```sql
CREATE OR REPLACE FUNCTION analyze_weak_areas(p_user_id UUID)
RETURNS TABLE (
  lesson_key VARCHAR(100),
  lesson_title TEXT,
  total_attempted INTEGER,
  correct_count INTEGER,
  success_rate DECIMAL(5,2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    q.primary_lesson_key,
    l.title,
    COUNT(*)::INTEGER as total_attempted,
    SUM(CASE WHEN h.is_correct THEN 1 ELSE 0 END)::INTEGER as correct_count,
    ROUND(
      100.0 * SUM(CASE WHEN h.is_correct THEN 1 ELSE 0 END) / COUNT(*),
      2
    ) as success_rate
  FROM student_question_history h
  JOIN act_questions q ON h.question_id = q.id
  JOIN lessons l ON q.primary_lesson_id = l.id
  WHERE h.user_id = p_user_id
  GROUP BY q.primary_lesson_key, l.title
  HAVING ROUND(
    100.0 * SUM(CASE WHEN h.is_correct THEN 1 ELSE 0 END) / COUNT(*),
    2
  ) < 70.0
  ORDER BY success_rate ASC, total_attempted DESC;
END;
$$ LANGUAGE plpgsql;
```

---

### Query 3: Get Question with Full Details

```javascript
/**
 * Get a single question with all related data
 */
export async function getQuestionDetails(questionId) {
  const { data, error } = await supabase
    .from('act_questions')
    .select(`
      *,
      primary_lesson:lessons!act_questions_primary_lesson_id_fkey(
        lesson_key,
        title,
        subject,
        description
      ),
      distractors:act_distractors(
        choice_letter,
        distractor_type,
        why_wrong,
        common_misconception
      ),
      patterns:question_patterns(
        pattern_id,
        pattern:pattern_templates(
          pattern_name,
          description,
          frequency
        )
      ),
      version_history:question_version_history(
        version_number,
        changed_fields,
        changed_at,
        change_reason
      )
    `)
    .eq('id', questionId)
    .single();

  if (error) throw error;
  return data;
}
```

---

### Query 4: Search Questions by Text

```javascript
/**
 * Full-text search across question stems and choices
 */
export async function searchQuestions(searchTerm, filters = {}) {
  let query = supabase
    .from('act_questions')
    .select('*')
    .or(`
      question_stem.ilike.%${searchTerm}%,
      choice_a.ilike.%${searchTerm}%,
      choice_b.ilike.%${searchTerm}%,
      choice_c.ilike.%${searchTerm}%,
      choice_d.ilike.%${searchTerm}%
    `)
    .eq('is_duplicate', false);

  if (filters.section) {
    query = query.eq('section', filters.section);
  }

  const { data, error } = await query.limit(50);

  if (error) throw error;
  return data;
}
```

---

### Query 5: Get Statistics Dashboard

```javascript
/**
 * Get overall statistics for admin dashboard
 */
export async function getDashboardStats() {
  // Use materialized view for performance
  const { data: stats, error } = await supabase
    .from('question_statistics')
    .select('*');

  if (error) throw error;

  // Aggregate by section
  const bySection = stats.reduce((acc, row) => {
    if (!acc[row.section]) {
      acc[row.section] = {
        section: row.section,
        totalQuestions: 0,
        totalGenerated: 0,
        lessonsCovered: new Set()
      };
    }

    acc[row.section].totalQuestions += row.total_questions;
    acc[row.section].totalGenerated += row.total_generated;
    acc[row.section].lessonsCovered.add(row.primary_lesson_key);

    return acc;
  }, {});

  // Convert Sets to counts
  return Object.values(bySection).map(section => ({
    ...section,
    lessonsCovered: section.lessonsCovered.size
  }));
}
```

---

### Query 6: Batch Insert Generated Questions

```javascript
/**
 * Efficiently insert 100+ generated questions
 */
export async function insertGeneratedQuestions(questions) {
  // Validate with Zod first
  const validQuestions = questions.map(q => questionSchema.parse(q));

  // Batch insert (Supabase handles up to 1,000 rows)
  const { data, error } = await supabase
    .from('act_questions')
    .insert(validQuestions)
    .select();

  if (error) {
    console.error('Batch insert failed:', error);

    // Fallback: Insert one at a time
    const results = [];
    for (const q of validQuestions) {
      try {
        const { data } = await supabase.from('act_questions').insert(q).select().single();
        results.push(data);
      } catch (err) {
        console.error(`Failed to insert question:`, err);
      }
    }

    return results;
  }

  return data;
}
```

---

## APPENDIX B: MILESTONES & METRICS

### Phase 1: Database Setup (3-5 Days)

**Milestones**:
- ✅ Supabase project created
- ✅ All 10 tables created successfully
- ✅ All 25+ indexes created
- ✅ Test data inserted and queried
- ✅ Connection script works

**Metrics**:
- Database response time: <100ms for simple queries
- All tables visible in Supabase dashboard
- Zero errors in setup logs

---

### Phase 2: Data Extraction (3-4 Weeks)

**Milestones**:
- ✅ Test 1 extracted (215 questions)
- ✅ All 7 tests extracted (1,680 total)
- ✅ All figures uploaded (~420 images)
- ✅ All questions tagged to lessons
- ✅ All explanations generated
- ✅ Duplicates detected and flagged

**Metrics**:
| Metric | Target | Critical? |
|--------|--------|-----------|
| Questions extracted | 1,680 | ✅ Yes |
| Extraction accuracy | >95% | ✅ Yes |
| Figures uploaded | ~420 | ✅ Yes |
| Questions with explanations | 100% | ✅ Yes |
| Questions with lesson tags | 100% | ✅ Yes |
| Duplicate rate | <5% | ⚠️ Warning if >10% |
| QA error rate | <5% | ✅ Yes |

---

### Phase 3: Pattern Analysis (2-3 Weeks)

**Milestones**:
- ✅ All questions classified by type
- ✅ All distractors analyzed
- ✅ Templates extracted for each pattern
- ✅ Distractor taxonomy created

**Metrics**:
| Metric | Target |
|--------|--------|
| Question types identified | 100+ |
| Questions classified | 1,680 (100%) |
| Distractors analyzed | ~5,040 (3 per Q) |
| Templates created | 50-100 |
| Patterns with ≥10 examples | ≥30 |

---

### Phase 4: Question Generation (2-3 Weeks)

**Milestones**:
- ✅ Template generator tested
- ✅ AI generator tested
- ✅ Hybrid generator tested
- ✅ First 100 questions generated
- ✅ Target 5,000-10,000 questions generated

**Metrics**:
| Metric | Target | Method |
|--------|--------|--------|
| Questions generated | 5,000-10,000 | Hybrid |
| Generation success rate | >90% | Automated QA |
| Human review pass rate | >95% | Manual review |
| Average generation time | <30s per Q | Monitoring |
| API cost per question | <$0.05 | Cost tracking |

---

### Phase 5: Validation (1-2 Weeks)

**Milestones**:
- ✅ All generated questions pass Tier 1 QA
- ✅ 10% sample passes Tier 2 QA
- ✅ <5% error rate overall
- ✅ Student data integration tested
- ✅ Backup system operational

**Metrics**:
| Metric | Target |
|--------|--------|
| Tier 1 automated pass rate | 100% |
| Tier 2 random sample size | 10% of generated |
| Tier 2 pass rate | >95% |
| Overall error rate | <5% |
| Questions requiring revision | <10% |

---

### Success Criteria (End-to-End)

**Database**:
- ✅ 1,680 official questions extracted
- ✅ 5,000-10,000 generated questions
- ✅ All questions tagged to 81 lessons
- ✅ <5% duplicate rate
- ✅ <5% error rate

**Quality**:
- ✅ >95% of generated questions indistinguishable from real ACT
- ✅ All questions have explanations
- ✅ All distractors are plausible and educational

**Performance**:
- ✅ Query response time <200ms (p95)
- ✅ Dashboard loads in <2 seconds
- ✅ API uptime >99.5%

**Cost**:
- ✅ Total project cost <$500
- ✅ Ongoing monthly cost <$50

---

## APPENDIX C: TESTING STRATEGY

### Unit Tests

**Test Coverage**: ≥80% of all functions

```javascript
// Example: tests/unit/similarity.test.js
import { describe, it, expect } from 'vitest';
import { cosineSimilarity } from '../../scripts/utils/similarity.mjs';

describe('cosineSimilarity', () => {
  it('should return 1.0 for identical vectors', () => {
    const vec1 = [1, 2, 3, 4, 5];
    const vec2 = [1, 2, 3, 4, 5];

    const similarity = cosineSimilarity(vec1, vec2);
    expect(similarity).toBeCloseTo(1.0, 2);
  });

  it('should return 0.0 for orthogonal vectors', () => {
    const vec1 = [1, 0];
    const vec2 = [0, 1];

    const similarity = cosineSimilarity(vec1, vec2);
    expect(similarity).toBeCloseTo(0.0, 2);
  });

  it('should handle normalized vs unnormalized', () => {
    const vec1 = [3, 4];  // Length 5
    const vec2 = [6, 8];  // Length 10 (same direction)

    const similarity = cosineSimilarity(vec1, vec2);
    expect(similarity).toBeCloseTo(1.0, 2);
  });
});
```

**Run Tests**:
```bash
npm run test:unit
npm run test:unit -- --coverage
```

---

### Integration Tests

**Test Coverage**: All major workflows

```javascript
// Example: tests/integration/extraction.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { extractTest } from '../../scripts/extraction/extract-test.mjs';
import { supabase } from '../../scripts/utils/supabase-client.mjs';

describe('Test Extraction Workflow', () => {
  beforeAll(async () => {
    // Clean test database
    await supabase.from('act_questions').delete().eq('test_number', 999);
  });

  afterAll(async () => {
    // Cleanup
    await supabase.from('act_questions').delete().eq('test_number', 999);
  });

  it('should extract all 215 questions from test', async () => {
    const result = await extractTest({
      testNumber: 999,
      sourcePath: './data/official-tests/test-1.pdf'
    });

    expect(result.totalQuestions).toBe(215);
    expect(result.sections).toEqual(['E', 'M', 'R', 'S']);
    expect(result.errors).toHaveLength(0);
  });

  it('should tag all questions to lessons', async () => {
    const { data } = await supabase
      .from('act_questions')
      .select('primary_lesson_key')
      .eq('test_number', 999);

    const untagged = data.filter(q => !q.primary_lesson_key);
    expect(untagged).toHaveLength(0);
  });
});
```

**Run Tests**:
```bash
npm run test:integration
```

---

### End-to-End Tests

**Test Coverage**: Critical user flows

```javascript
// Example: tests/e2e/student-workflow.test.js
import { test, expect } from '@playwright/test';

test.describe('Student Practice Workflow', () => {
  test('should get personalized questions and track progress', async ({ page }) => {
    // 1. Login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');

    // 2. Navigate to practice
    await page.click('text=Practice');

    // 3. Select lesson
    await page.selectOption('select[name="lesson"]', 'quadratics');
    await page.click('button:has-text("Start Practice")');

    // 4. Answer question
    await expect(page.locator('.question-stem')).toBeVisible();
    await page.click('.answer-choice:first-child');
    await page.click('button:has-text("Submit")');

    // 5. Verify explanation shown
    await expect(page.locator('.explanation')).toBeVisible();

    // 6. Check progress updated
    await page.click('text=Dashboard');
    const progressText = await page.locator('.progress-stats').textContent();
    expect(progressText).toContain('1 question answered');
  });
});
```

**Run Tests**:
```bash
npm run test:e2e
```

---

### Manual QA Checklist

**Phase 2 - After Each Test Extraction**:
- [ ] Question count correct (75 English, 60 Math, 40 Reading, 40 Science)
- [ ] All questions have correct answers
- [ ] No obvious parsing errors (garbled text)
- [ ] Figures uploaded and linked correctly
- [ ] Lesson tags populated (not all NULL)
- [ ] No duplicate questions within same test

**Phase 4 - After Each Generation Batch**:
- [ ] Generated questions grammatically correct
- [ ] Correct answer is actually correct
- [ ] Distractors are plausible (not obviously wrong)
- [ ] Difficulty appropriate for ACT
- [ ] No factual errors in STEM questions
- [ ] Matches ACT question style

**Phase 5 - Before Production Launch**:
- [ ] All database tables populated
- [ ] All indexes created
- [ ] Edge Functions deployed and tested
- [ ] Frontend connected to database
- [ ] Student progress tracking works
- [ ] Backup system operational
- [ ] Error monitoring configured

---

## APPENDIX D: TROUBLESHOOTING GUIDE

### Problem 1: Extraction Fails with Parsing Error

**Symptoms**:
```
Error: Failed to parse question 42
TypeError: Cannot read property 'text' of undefined
```

**Cause**: PDF structure different than expected

**Solution**:
1. Check PDF visually - is question 42 formatted differently?
2. Log the raw parsed data:
   ```javascript
   console.log('Raw data:', JSON.stringify(rawData, null, 2));
   ```
3. Update parser to handle edge case:
   ```javascript
   const text = element?.text ?? '';  // Safe access
   ```
4. If persistent, manually extract that question and continue

---

### Problem 2: Duplicate Detection Not Working

**Symptoms**:
- 0 duplicates found when you know there should be some
- OR too many false positives (>10%)

**Cause**: Embedding model or threshold issues

**Solution**:

**If 0 duplicates found**:
1. Check embeddings are actually being generated:
   ```javascript
   const { data } = await supabase
     .from('act_questions')
     .select('embedding')
     .not('embedding', 'is', null)
     .limit(10);

   console.log('Embeddings found:', data.length);
   ```

2. Lower similarity threshold temporarily:
   ```javascript
   const SIMILARITY_THRESHOLD = 0.90;  // Was 0.95
   ```

3. Test with known duplicate:
   ```javascript
   const q1 = "What is the slope of the line...";
   const q2 = "What is the slope of the line...";  // Exact duplicate
   const similarity = await compareQuestions(q1, q2);
   console.log('Similarity:', similarity);  // Should be ~1.0
   ```

**If too many false positives**:
1. Increase threshold:
   ```javascript
   const SIMILARITY_THRESHOLD = 0.98;
   ```

2. Check if embedding only the stem (not choices):
   ```javascript
   const text = question.question_stem;  // Don't include choices
   ```

---

### Problem 3: AI Generation Producing Low-Quality Questions

**Symptoms**:
- Generated questions don't sound like ACT
- Distractors are obviously wrong
- Grammatical errors

**Cause**: Prompt engineering or model issues

**Solution**:

1. **Improve prompt** with more examples:
   ```javascript
   const prompt = `Generate an ACT ${section} question following this pattern...

   Here are 5 REAL ACT questions for reference:
   ${realExamples.map(ex => formatExample(ex)).join('\n\n')}

   Now generate a NEW question that is indistinguishable from a real ACT question.`;
   ```

2. **Use template-based generation** for that pattern instead:
   ```javascript
   // AI struggling with this pattern? Use template instead
   if (pattern.id === 'problematic_pattern') {
     return await templateGenerator.generateQuestion(pattern.id);
   }
   ```

3. **Increase temperature** if questions too formulaic:
   ```javascript
   const response = await anthropic.messages.create({
     temperature: 0.8,  // Was 0.7
     // ...
   });
   ```

4. **Manual review** and iterate:
   - Generate 10 questions
   - Manually review quality
   - Identify specific issues
   - Update prompt to address
   - Repeat

---

### Problem 4: Database Queries Slow (>1 Second)

**Symptoms**:
```
Query took 2,453ms
```

**Cause**: Missing indexes or inefficient query

**Solution**:

1. **Identify slow query**:
   ```sql
   SELECT
     query,
     mean_exec_time,
     calls
   FROM pg_stat_statements
   WHERE mean_exec_time > 1000
   ORDER BY mean_exec_time DESC;
   ```

2. **Analyze query plan**:
   ```sql
   EXPLAIN ANALYZE
   SELECT * FROM act_questions
   WHERE section = 'M' AND primary_lesson_key = 'quadratics';
   ```

3. **Add missing index**:
   ```sql
   -- If you see "Seq Scan" in EXPLAIN, add index
   CREATE INDEX idx_questions_section_lesson
     ON act_questions(section, primary_lesson_key);
   ```

4. **Optimize query**:
   ```javascript
   // Before: Fetching all columns
   const { data } = await supabase
     .from('act_questions')
     .select('*');

   // After: Only fetch needed columns
   const { data } = await supabase
     .from('act_questions')
     .select('id, question_stem, correct_answer');
   ```

---

### Problem 5: Supabase Storage Upload Fails

**Symptoms**:
```
Error: Failed to upload figure
StorageError: The resource already exists
```

**Cause**: File already exists and `upsert: false`

**Solution**:

1. **Enable upsert**:
   ```javascript
   const { data, error } = await supabase.storage
     .from('act-figures')
     .upload(fileName, fileBuffer, {
       contentType: 'image/png',
       upsert: true  // Overwrite if exists
     });
   ```

2. **Check if file exists first**:
   ```javascript
   const { data: files } = await supabase.storage
     .from('act-figures')
     .list('test-1/math');

   const exists = files.some(f => f.name === fileName);

   if (exists) {
     console.log(`Skipping ${fileName} (already exists)`);
   } else {
     await uploadFigure(filePath);
   }
   ```

3. **Verify storage bucket configured correctly**:
   - Go to Supabase Dashboard → Storage
   - Check "act-figures" bucket exists
   - Verify public/private settings

---

### Problem 6: Lesson Tagging Not Working

**Symptoms**:
- `primary_lesson_key` is NULL for many questions
- Questions tagged to wrong lessons

**Cause**: Question type not recognized or mapping incorrect

**Solution**:

1. **Check which types are untagged**:
   ```javascript
   const { data } = await supabase
     .from('act_questions')
     .select('question_type')
     .is('primary_lesson_key', null)
     .limit(100);

   const untypedCounts = data.reduce((acc, q) => {
     acc[q.question_type] = (acc[q.question_type] || 0) + 1;
     return acc;
   }, {});

   console.log('Untagged types:', untypedCounts);
   ```

2. **Add missing mappings**:
   ```javascript
   // In lesson-tagging-mappings.json
   {
     "math": {
       "missing_type_here": "appropriate-lesson-key"
     }
   }
   ```

3. **Re-run tagging**:
   ```bash
   npm run tag-lessons -- --section M --force
   ```

4. **Manual review** of complex questions:
   - Export questions where `primary_lesson_key IS NULL`
   - Manually review and tag
   - Bulk update database

---

### Problem 7: API Cost Exceeds Budget

**Symptoms**:
```
Total cost so far: $523.45
ERROR: Budget limit exceeded!
```

**Cause**: Generated more questions than planned or inefficient prompts

**Solution**:

1. **Review what consumed tokens**:
   ```javascript
   // Log token usage per operation
   const operations = [
     { name: 'Explanations', tokens: 2_500_000, cost: 7.50 },
     { name: 'Generation', tokens: 15_000_000, cost: 45.00 },
     // ...
   ];
   ```

2. **Optimize prompts** (reduce output tokens):
   ```javascript
   // Before: Verbose output
   "Provide a detailed explanation with examples..."

   // After: Concise output
   "Provide a 2-3 sentence explanation..."
   ```

3. **Use cheaper model** for simple tasks:
   ```javascript
   // Use Haiku for explanations (1/10th cost)
   const response = await anthropic.messages.create({
     model: 'claude-3-5-haiku-20241022',  // Cheaper
     // ...
   });
   ```

4. **Pause and re-evaluate**:
   - Do you need 10,000 generated questions or is 5,000 enough?
   - Can you use more template-based generation (free)?

---

### Problem 8: Version Conflict After Team Merge

**Symptoms**:
- Someone else updated a question you were editing
- Database shows different data than expected

**Cause**: Multiple people editing same question (Gap 8: Versioning)

**Solution**:

1. **Check version history**:
   ```javascript
   const { data } = await supabase
     .from('question_version_history')
     .select('*')
     .eq('question_id', questionId)
     .order('version_number', { ascending: false });

   console.log('Recent changes:', data);
   ```

2. **Rollback if needed**:
   ```javascript
   const previousVersion = data[1];  // Get version before latest

   await supabase.from('act_questions')
     .update(previousVersion.question_data)
     .eq('id', questionId);
   ```

3. **Communicate with team**:
   - Use version history `changed_by` field to see who made change
   - Discuss conflict resolution
   - Merge changes manually if needed

---

### Getting Help

**If this guide doesn't solve your issue**:

1. **Check logs**:
   ```bash
   tail -f logs/extraction.log
   tail -f logs/generation.log
   ```

2. **Enable debug mode**:
   ```bash
   LOG_LEVEL=debug npm run extract -- --test 1
   ```

3. **Consult documentation**:
   - Supabase docs: https://supabase.com/docs
   - Claude API docs: https://docs.anthropic.com
   - Project master plan: `docs/master-plan/00-MASTER-INDEX.md`

4. **Ask for help**:
   - Create GitHub issue with error logs
   - Include relevant code snippets
   - Describe what you've tried

---

## FINAL NOTES

**This document completes the 8-part modular master plan.**

### All Documents

1. ✅ [00-MASTER-INDEX.md](./00-MASTER-INDEX.md) - Navigation hub
2. ✅ [01-DATABASE-SCHEMA.md](./01-DATABASE-SCHEMA.md) - 10 tables, indexes, constraints
3. ✅ [02-PHASE-1-SETUP.md](./02-PHASE-1-SETUP.md) - Database setup
4. ✅ [03-PHASE-2-EXTRACTION.md](./03-PHASE-2-EXTRACTION.md) - Extraction with figures & explanations
5. ✅ [04-PHASE-3-ANALYSIS.md](./04-PHASE-3-ANALYSIS.md) - Pattern analysis
6. ✅ [05-PHASE-4-GENERATION.md](./05-PHASE-4-GENERATION.md) - AI generation system
7. ✅ [06-PHASE-5-VALIDATION.md](./06-PHASE-5-VALIDATION.md) - Testing, student integration & production
8. ✅ **07-TECHNICAL-DETAILS.md** - This document

### Complete Feature Coverage

**Phase 2 - Data Extraction**:
- ✅ Figure digitization (~420 images)
- ✅ AI-generated answer explanations
- ✅ Duplicate detection (embedding-based)
- ✅ 3-tier QA process

**Phase 5 - Production Deployment**:
- ✅ Student data integration & progress tracking
- ✅ Backup & recovery system
- ✅ Production API layer design
- ✅ Question versioning
- ✅ Legal/copyright documentation
- ✅ Performance optimization

**Future Enhancements**:
- Adaptive difficulty
- Multi-language support
- Accessibility features
- Mobile app
- Advanced analytics

---

**Ready to build the most comprehensive ACT question bank!**

**Next Steps**: Start with [02-PHASE-1-SETUP.md](./02-PHASE-1-SETUP.md) to begin implementation.

---

**Version**: 2.0 Modular
**Last Updated**: 2025-10-22
**Status**: COMPLETE - All 8 documents ready for execution
