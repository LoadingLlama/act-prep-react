-- Examples Table Schema
-- Stores all lesson examples separately from HTML content

CREATE TABLE IF NOT EXISTS examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lesson_metadata(id) ON DELETE CASCADE,

  -- Position and metadata
  position INTEGER NOT NULL, -- Order within the lesson (1, 2, 3, 4)
  title TEXT NOT NULL, -- e.g., "Finding a Percentage", "Percent Decrease"

  -- Problem data
  problem_text TEXT NOT NULL, -- The question/problem statement

  -- Answer choices (JSON array for flexibility)
  choices JSONB, -- [{"letter": "A", "text": "15%"}, {"letter": "B", "text": "20%"}, ...]
  correct_answer TEXT, -- e.g., "C"

  -- Solution data
  solution_steps JSONB NOT NULL, -- [{"step": 1, "text": "Find the amount..."}, ...]
  answer_explanation TEXT, -- Brief explanation after the answer

  -- Optional fields
  diagram_svg TEXT, -- For geometry examples with diagrams
  is_worked_example BOOLEAN DEFAULT FALSE, -- True if no multiple choice (just walkthrough)

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  UNIQUE(lesson_id, position)
);

-- Index for fast lookup by lesson
CREATE INDEX IF NOT EXISTS idx_examples_lesson_id ON examples(lesson_id);

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_examples_lesson_position ON examples(lesson_id, position);

-- Comments
COMMENT ON TABLE examples IS 'Stores all lesson examples as structured data instead of HTML';
COMMENT ON COLUMN examples.choices IS 'JSON array of answer choices: [{"letter": "A", "text": "answer text"}, ...]';
COMMENT ON COLUMN examples.solution_steps IS 'JSON array of solution steps: [{"step": 1, "text": "Step text with <strong> formatting"}, ...]';
COMMENT ON COLUMN examples.is_worked_example IS 'True for examples without multiple choice answers (pure walkthroughs)';
