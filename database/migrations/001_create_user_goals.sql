-- Create user_goals table
-- Run this SQL in Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS public.user_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Goal setting
  target_exam_date DATE,
  current_score INTEGER,
  target_score INTEGER,
  score_improvement_needed INTEGER,

  -- Availability
  daily_study_minutes INTEGER,
  study_days_per_week INTEGER,
  preferred_study_time TEXT,

  -- Focus areas
  focus_sections JSONB,
  weak_areas JSONB,

  -- Preferences
  learning_pace TEXT DEFAULT 'moderate' CHECK (learning_pace IN ('slow', 'moderate', 'fast')),
  reminder_frequency TEXT DEFAULT 'daily' CHECK (reminder_frequency IN ('daily', 'twice_daily', 'weekly', 'none')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id)
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_user_goals_user ON public.user_goals(user_id);

-- Enable RLS
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own goals"
  ON public.user_goals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON public.user_goals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON public.user_goals
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
  ON public.user_goals
  FOR DELETE
  USING (auth.uid() = user_id);
