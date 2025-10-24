-- Update question_stem to include full context with underlined portion marked
-- We'll use **text** for markdown bold or <u>text</u> for HTML underline

-- Example format:
-- "There are thousands of new animal species identified each year, **the vast majority are** small or geographically isolated."
-- OR
-- "There are thousands of new animal species identified each year, <u>the vast majority are</u> small or geographically isolated."

-- No schema changes needed - just update how we populate question_stem field
-- The question_stem will now contain full context with marked underlined portion

-- We'll keep underlined_text, context_before, context_after for programmatic access
-- But question_stem will be the human-readable version with highlighting
