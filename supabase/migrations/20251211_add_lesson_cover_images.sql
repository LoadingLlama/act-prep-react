-- Add cover_image_url column to lessons table
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

-- Add comment
COMMENT ON COLUMN lessons.cover_image_url IS 'URL to the lesson card cover image (academic/university style)';
