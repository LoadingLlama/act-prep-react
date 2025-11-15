-- Add missing columns to user_goals table
-- Run this in Supabase SQL Editor

ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS study_hours_per_week INTEGER DEFAULT 6;

ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS grade TEXT;

ALTER TABLE user_goals
ADD COLUMN IF NOT EXISTS study_experience TEXT DEFAULT 'never';
