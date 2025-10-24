# DATABASE SCHEMA
**ACT Question Bank - Complete Database Design**

**📖 Navigation**: [← Back to Index](./00-MASTER-INDEX.md) | [Next: Phase 1 Setup →](./02-PHASE-1-SETUP.md)

---

## OVERVIEW

Supabase (PostgreSQL) database with **10 core tables** + lesson tagging tables:
- 7 original tables for question bank
- 3 new tables from gap analysis (QA, versioning, student history)
- 3 lesson tagging tables (from integration document)

**Total**: 10 tables, 25+ indexes, full referential integrity

---

## TABLE 1: `act_passages`
**Purpose**: Store all reading passages (English, Reading, Science sections)

**Est. Rows**: ~75 passages (35 English + 28 Reading + ~12-15 Science)

```sql
CREATE TABLE act_passages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL, -- 1-7
  section VARCHAR(20) NOT NULL, -- 'english', 'reading', 'science'
  passage_number INTEGER NOT NULL, -- 1-5 for English, 1-4 for Reading, etc.

  -- Content
  title VARCHAR(500),
  topic_category VARCHAR(100), -- 'Marine Biology', 'History', 'Physics'
  full_text TEXT NOT NULL,
  summary TEXT,

  -- Metadata
  word_count INTEGER,
  reading_level DECIMAL(3,1), -- Flesch-Kincaid grade level
  writing_style VARCHAR(100), -- 'Narrative', 'Expository', 'Persuasive'
  themes TEXT[],

  -- For Science passages
  passage_type VARCHAR(50), -- 'data_representation', 'research_summary', 'conflicting_viewpoints'
  figure_count INTEGER,
  table_count INTEGER,
  graph_types TEXT[], -- ['line_graph', 'bar_chart']

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(test_number, section, passage_number)
);

CREATE INDEX idx_passages_section ON act_passages(section);
CREATE INDEX idx_passages_test ON act_passages(test_number);
CREATE INDEX idx_passages_topic ON act_passages(topic_category);
```

---

## TABLE 2: `act_questions`
**Purpose**: Every question from all 7 tests + explanations

**Est. Rows**: ~1,680 questions (7 tests × 215 Q + ~175 generated)

```sql
CREATE TABLE act_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Location
  test_number INTEGER NOT NULL,
  section VARCHAR(20) NOT NULL, -- 'english', 'math', 'reading', 'science'
  question_number INTEGER NOT NULL,
  passage_id UUID REFERENCES act_passages(id),

  -- Question content
  question_stem TEXT NOT NULL,
  underlined_portion TEXT, -- English only
  context_before TEXT,
  context_after TEXT,

  -- Answer choices
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  choice_e TEXT, -- Math has 5 choices
  correct_answer CHAR(1) NOT NULL, -- 'A'-'E'

  -- 🆕 GAP 2: Answer Explanations
  correct_answer_explanation TEXT, -- Why correct answer is right
  key_concept VARCHAR(100), -- Main concept tested
  solution_walkthrough JSONB, -- Structured step-by-step (Math)

  -- Classification
  question_type VARCHAR(100) NOT NULL,
  content_area VARCHAR(100),
  skill_tested VARCHAR(100),

  -- Difficulty
  difficulty_level VARCHAR(20), -- 'easy', 'medium', 'hard'
  difficulty_score DECIMAL(3,2),
  estimated_time_seconds INTEGER,

  -- Math-specific
  requires_calculator BOOLEAN DEFAULT false,
  diagram_description TEXT,
  diagram_url TEXT, -- 🆕 GAP 1: Supabase Storage URL
  solution_steps TEXT[],
  formulas_required TEXT[],

  -- Science-specific
  figure_reference VARCHAR(50), -- 'Figure 1', 'Table 2'
  data_interpretation_type VARCHAR(50),

  -- 🆕 GAP 3: Duplicate Detection
  is_duplicate BOOLEAN DEFAULT false,
  original_question_id UUID REFERENCES act_questions(id),
  similarity_score DECIMAL(3,2),

  -- 🆕 LESSON TAGGING
  primary_lesson_id UUID, -- References lesson_metadata
  primary_lesson_key VARCHAR(100), -- 'commas', 'quadratics'
  related_lesson_ids UUID[],
  lesson_tags TEXT[],

  -- Statistics
  times_answered INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(test_number, section, question_number)
);

-- Performance indexes
CREATE INDEX idx_questions_section ON act_questions(section);
CREATE INDEX idx_questions_test ON act_questions(test_number);
CREATE INDEX idx_questions_type ON act_questions(question_type);
CREATE INDEX idx_questions_difficulty ON act_questions(difficulty_level);
CREATE INDEX idx_questions_passage ON act_questions(passage_id);
CREATE INDEX idx_questions_primary_lesson ON act_questions(primary_lesson_key);
CREATE INDEX idx_questions_lesson_tags ON act_questions USING GIN(lesson_tags);

-- 🆕 GAP 10: Advanced composite index
CREATE INDEX idx_questions_composite ON act_questions(section, difficulty_level, is_duplicate)
  WHERE is_duplicate = false;

-- 🆕 GAP 10: Full-text search
CREATE INDEX idx_questions_search ON act_questions
  USING gin(to_tsvector('english', question_stem || ' ' || choice_a || ' ' || choice_b || ' ' || choice_c || ' ' || choice_d));
```

---

## TABLE 3: `act_distractors`
**Purpose**: Analysis of WHY each wrong answer exists

**Est. Rows**: ~6,000 (avg 3-4 wrong answers per question)

```sql
CREATE TABLE act_distractors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES act_questions(id) ON DELETE CASCADE,

  -- Which wrong answer
  choice_letter CHAR(1) NOT NULL,
  choice_text TEXT NOT NULL,

  -- Distractor analysis
  distractor_type VARCHAR(100) NOT NULL,
  why_wrong TEXT NOT NULL,
  common_misconception TEXT,
  pattern_tags TEXT[],

  -- Statistics
  student_selection_rate DECIMAL(5,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(question_id, choice_letter)
);

CREATE INDEX idx_distractors_question ON act_distractors(question_id);
CREATE INDEX idx_distractors_type ON act_distractors(distractor_type);
```

---

## TABLE 4: `act_question_patterns`
**Purpose**: Templates for generating new questions

**Est. Rows**: ~100-150 patterns

```sql
CREATE TABLE act_question_patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Pattern identification
  pattern_name VARCHAR(200) NOT NULL,
  section VARCHAR(20) NOT NULL,
  question_type VARCHAR(100) NOT NULL,

  -- Template structure
  stem_template TEXT NOT NULL, -- With {placeholders}
  example_variables JSONB,

  -- Answer generation
  correct_answer_formula TEXT,
  distractor_rules JSONB,

  -- Constraints
  difficulty_range VARCHAR(50),
  required_context TEXT[],
  example_question_ids UUID[],

  -- Statistics
  frequency_in_tests DECIMAL(5,2),
  average_difficulty DECIMAL(3,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(pattern_name, section)
);

CREATE INDEX idx_patterns_section ON act_question_patterns(section);
CREATE INDEX idx_patterns_type ON act_question_patterns(question_type);
```

---

## TABLE 5: `generated_questions`
**Purpose**: AI-generated questions for validation

**Est. Rows**: Unlimited (as system generates)

```sql
CREATE TABLE generated_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Generation metadata
  pattern_id UUID REFERENCES act_question_patterns(id),
  generation_method VARCHAR(50), -- 'template', 'ai_assisted', 'hybrid'
  ai_model VARCHAR(100),

  -- Question structure
  section VARCHAR(20) NOT NULL,
  question_stem TEXT NOT NULL,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  choice_e TEXT,
  correct_answer CHAR(1) NOT NULL,

  -- Classification
  question_type VARCHAR(100),
  difficulty_level VARCHAR(20),

  -- 🆕 LESSON TAGGING (inherited from pattern)
  primary_lesson_key VARCHAR(100),

  -- Validation
  similarity_score DECIMAL(3,2),
  human_validated BOOLEAN DEFAULT false,
  validation_notes TEXT,
  approved_for_use BOOLEAN DEFAULT false,

  -- Performance
  times_used INTEGER DEFAULT 0,
  student_success_rate DECIMAL(5,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_generated_section ON generated_questions(section);
CREATE INDEX idx_generated_pattern ON generated_questions(pattern_id);
CREATE INDEX idx_generated_approved ON generated_questions(approved_for_use);
```

---

## TABLE 6: `extraction_progress`
**Purpose**: Track extraction/validation progress

**Est. Rows**: 28 (7 tests × 4 sections)

```sql
CREATE TABLE extraction_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL,
  section VARCHAR(20) NOT NULL,

  -- Progress
  total_questions INTEGER NOT NULL,
  extracted_count INTEGER DEFAULT 0,
  validated_count INTEGER DEFAULT 0,

  -- Status
  extraction_status VARCHAR(20) DEFAULT 'pending',
  validation_status VARCHAR(20) DEFAULT 'pending',

  -- Assignee
  extracted_by VARCHAR(100),
  validated_by VARCHAR(100),

  -- Notes
  extraction_notes TEXT,
  issues_found TEXT[],

  -- Timestamps
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(test_number, section)
);

CREATE INDEX idx_progress_status ON extraction_progress(extraction_status);
```

---

## TABLE 7: `act_test_statistics`
**Purpose**: Statistical analysis per test for validation

**Est. Rows**: 7 (one per test)

```sql
CREATE TABLE act_test_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_number INTEGER NOT NULL UNIQUE,

  -- Section stats
  english_stats JSONB,
  math_stats JSONB,
  reading_stats JSONB,
  science_stats JSONB,

  -- Overall metrics
  total_questions INTEGER,
  average_difficulty DECIMAL(3,2),
  difficulty_distribution JSONB,
  topic_frequencies JSONB,
  passage_statistics JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🆕 TABLE 8: `qa_reviews` (GAP 4)
**Purpose**: Track quality assurance reviews

**Est. Rows**: ~170 (10% sample × 1,680 questions)

```sql
CREATE TABLE qa_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES act_questions(id),
  reviewer VARCHAR(100) NOT NULL,
  review_date TIMESTAMPTZ DEFAULT NOW(),

  -- Results
  passed BOOLEAN NOT NULL,
  issues_found TEXT[],
  notes TEXT,

  -- Checklist
  text_matches_source BOOLEAN,
  choices_correct BOOLEAN,
  answer_validated BOOLEAN,
  no_typos BOOLEAN,
  passage_linked BOOLEAN,
  figures_referenced BOOLEAN,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_qa_question ON qa_reviews(question_id);
CREATE INDEX idx_qa_reviewer ON qa_reviews(reviewer);
CREATE INDEX idx_qa_passed ON qa_reviews(passed);
```

---

## 🆕 TABLE 9: `question_version_history` (GAP 8)
**Purpose**: Track changes to questions over time

**Est. Rows**: Variable (tracks every edit)

```sql
CREATE TABLE question_version_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES act_questions(id),
  version_number INTEGER NOT NULL,

  -- Change tracking
  changed_fields JSONB, -- {"question_stem": "old value", ...}
  changed_by VARCHAR(100),
  change_reason TEXT,

  changed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_version_question ON question_version_history(question_id);
CREATE INDEX idx_version_date ON question_version_history(changed_at);
```

---

## 🆕 TABLE 10: `student_question_history` (GAP 5)
**Purpose**: Track which questions students have seen

**Est. Rows**: Millions (as students practice)

```sql
CREATE TABLE student_question_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL, -- References users table
  question_id UUID REFERENCES act_questions(id),

  -- Interaction
  seen_at TIMESTAMPTZ DEFAULT NOW(),
  answered_correctly BOOLEAN,
  time_spent_seconds INTEGER,
  answer_selected CHAR(1),

  UNIQUE(user_id, question_id)
);

CREATE INDEX idx_history_user ON student_question_history(user_id);
CREATE INDEX idx_history_question ON student_question_history(question_id);
CREATE INDEX idx_history_user_seen ON student_question_history(user_id, seen_at);
```

---

## LESSON TAGGING TABLES

See [LESSON_TAGGING_INTEGRATION.md](../LESSON_TAGGING_INTEGRATION.md) for:
- `question_lesson_mapping`
- `question_type_to_lesson_reference`
- Integration with `lesson_metadata` table

---

## DATA VALIDATION CONSTRAINTS

```sql
-- Valid sections
ALTER TABLE act_questions
ADD CONSTRAINT valid_section
CHECK (section IN ('english', 'math', 'reading', 'science'));

-- Valid answer letters
ALTER TABLE act_questions
ADD CONSTRAINT valid_answer
CHECK (correct_answer IN ('A', 'B', 'C', 'D', 'E'));

-- Valid difficulty
ALTER TABLE act_questions
ADD CONSTRAINT valid_difficulty
CHECK (difficulty_level IN ('easy', 'medium', 'hard'));

-- Valid extraction status
ALTER TABLE extraction_progress
ADD CONSTRAINT valid_extraction_status
CHECK (extraction_status IN ('pending', 'in_progress', 'completed'));
```

---

## 🆕 GAP 10: PERFORMANCE OPTIMIZATIONS

### Materialized View for Stats
```sql
CREATE MATERIALIZED VIEW question_statistics AS
SELECT
  section,
  question_type,
  difficulty_level,
  COUNT(*) as question_count,
  AVG(success_rate) as avg_success_rate,
  AVG(difficulty_score) as avg_difficulty
FROM act_questions
WHERE is_duplicate = false
GROUP BY section, question_type, difficulty_level;

CREATE INDEX idx_qstats_section ON question_statistics(section);
CREATE INDEX idx_qstats_type ON question_statistics(question_type);

-- Refresh daily or after bulk updates
REFRESH MATERIALIZED VIEW question_statistics;
```

### Common Queries Optimized
```sql
-- Get random practice questions (optimized)
SELECT * FROM act_questions
WHERE section = 'math'
  AND difficulty_level = 'medium'
  AND primary_lesson_key = 'quadratics'
  AND is_duplicate = false
  AND id NOT IN (
    SELECT question_id
    FROM student_question_history
    WHERE user_id = $1
  )
ORDER BY RANDOM()
LIMIT 10;

-- Get question with full context (single query)
SELECT
  q.*,
  p.* as passage_data,
  json_agg(d.*) as distractors
FROM act_questions q
LEFT JOIN act_passages p ON p.id = q.passage_id
LEFT JOIN act_distractors d ON d.question_id = q.id
WHERE q.id = $1
GROUP BY q.id, p.id;
```

---

## STORAGE ESTIMATES

| Table | Est. Rows | Avg Row Size | Total Size |
|-------|-----------|--------------|------------|
| act_passages | 75 | 5 KB | ~375 KB |
| act_questions | 1,680 | 2 KB | ~3.3 MB |
| act_distractors | 6,000 | 500 bytes | ~3 MB |
| act_question_patterns | 150 | 1 KB | ~150 KB |
| generated_questions | 1,000+ | 1.5 KB | ~1.5 MB |
| extraction_progress | 28 | 500 bytes | ~14 KB |
| qa_reviews | 170 | 300 bytes | ~51 KB |
| question_version_history | 500 | 400 bytes | ~200 KB |
| student_question_history | 100K+ | 100 bytes | ~10 MB |
| **TOTAL** | - | - | **~20 MB** |

**Note**: Supabase free tier includes 500 MB database storage - more than enough!

---

## BACKUP STRATEGY (GAP 6)

```bash
# Daily automated backup
pg_dump $DATABASE_URL > backups/act-db-$(date +%Y%m%d).sql

# Keep last 30 days
find backups/ -name "*.sql" -mtime +30 -delete
```

---

## ROW LEVEL SECURITY (RLS)

```sql
-- Enable RLS
ALTER TABLE act_questions ENABLE ROW LEVEL SECURITY;

-- Public read access to questions
CREATE POLICY "Questions are publicly readable"
ON act_questions FOR SELECT
USING (true);

-- Only authenticated users can insert
CREATE POLICY "Only authenticated can insert"
ON act_questions FOR INSERT
WITH CHECK (auth.role() = 'authenticated');
```

---

## NEXT STEPS

✅ Schema designed
✅ Gaps integrated
✅ Performance optimized

**Ready to implement?** → **[Phase 1: Database Setup →](./02-PHASE-1-SETUP.md)**

---

**📖 Navigation**: [← Back to Index](./00-MASTER-INDEX.md) | [Next: Phase 1 Setup →](./02-PHASE-1-SETUP.md)
