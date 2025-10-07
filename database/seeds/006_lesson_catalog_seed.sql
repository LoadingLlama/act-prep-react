/**
 * Lesson Catalog Seed Data
 *
 * Source: App.js - lessonStructure array (Line 619)
 * Purpose: Migrate the large hardcoded lesson structure to database
 *
 * Total: 41 lessons across all ACT sections
 */

-- ============================================================================
-- LESSON CATALOG DATA
-- Extracted from hardcoded lessonStructure array in App.js
-- ============================================================================

INSERT INTO lesson_catalog (lesson_key, section, chapter_number, title, description, display_order, difficulty_level, tags) VALUES

-- ALL SECTION (Getting Started)
('getting-started', 'all', 0, 'ACT Test Basics & Overview', 'Understanding the ACT format, timing, and scoring', 1, 'beginner', '["introduction", "overview"]'),

-- ENGLISH SECTION
('sentence-structure', 'english', 1, 'Chapter 1: Building Complete Sentences', 'Independent clauses, dependent clauses, and compound sentences', 2, 'beginner', '["grammar", "sentences"]'),
('commas', 'english', 2, 'Chapter 2: Mastering Comma Usage', 'Essential comma rules for the ACT', 3, 'beginner', '["grammar", "punctuation"]'),
('subject-verb-agreement', 'english', 3, 'Chapter 3: Subject-Verb Agreement', 'Making subjects and verbs agree in number', 4, 'beginner', '["grammar"]'),
('pronoun-usage', 'english', 4, 'Chapter 4: Pronouns and Antecedents', 'Correct pronoun usage and agreement', 5, 'intermediate', '["grammar"]'),
('modifiers', 'english', 5, 'Chapter 5: Modifier Placement', 'Avoiding misplaced and dangling modifiers', 6, 'intermediate', '["grammar"]'),
('verb-tense', 'english', 6, 'Chapter 6: Verb Tenses', 'Consistency and clarity in verb usage', 7, 'intermediate', '["grammar"]'),
('parallelism', 'english', 7, 'Chapter 7: Parallel Structure', 'Maintaining parallel construction', 8, 'intermediate', '["grammar", "style"]'),
('wordiness', 'english', 8, 'Chapter 8: Concision and Wordiness', 'Eliminating redundancy and unnecessary words', 9, 'intermediate', '["style", "writing"]'),
('transitions', 'english', 9, 'Chapter 9: Transitional Phrases', 'Using transitions effectively', 10, 'intermediate', '["style", "writing"]'),
('organization', 'english', 10, 'Chapter 10: Organization and Strategy', 'Logical organization and rhetorical skills', 11, 'advanced', '["writing", "strategy"]'),

-- MATH SECTION
('pre-algebra-basics', 'math', 1, 'Chapter 1: Pre-Algebra Fundamentals', 'Basic operations, fractions, decimals, and percentages', 12, 'beginner', '["algebra", "arithmetic"]'),
('elementary-algebra', 'math', 2, 'Chapter 2: Elementary Algebra', 'Variables, expressions, and basic equations', 13, 'beginner', '["algebra"]'),
('intermediate-algebra', 'math', 3, 'Chapter 3: Intermediate Algebra', 'Quadratic equations and inequalities', 14, 'intermediate', '["algebra"]'),
('coordinate-geometry', 'math', 4, 'Chapter 4: Coordinate Geometry', 'Graphing lines, slopes, and distance', 15, 'intermediate', '["geometry"]'),
('plane-geometry', 'math', 5, 'Chapter 5: Plane Geometry', 'Angles, triangles, circles, and polygons', 16, 'intermediate', '["geometry"]'),
('trigonometry', 'math', 6, 'Chapter 6: Trigonometry', 'Basic trig functions and identities', 17, 'advanced', '["trigonometry"]'),
('functions', 'math', 7, 'Chapter 7: Functions', 'Understanding and graphing functions', 18, 'intermediate', '["algebra", "functions"]'),
('statistics-probability', 'math', 8, 'Chapter 8: Statistics and Probability', 'Data analysis, mean, median, mode, and probability', 19, 'intermediate', '["statistics"]'),
('word-problems', 'math', 9, 'Chapter 9: Word Problems', 'Translating words into mathematical equations', 20, 'intermediate', '["problem-solving"]'),
('advanced-topics', 'math', 10, 'Chapter 10: Advanced Math Topics', 'Matrices, logarithms, and complex numbers', 21, 'advanced', '["advanced-math"]'),

-- READING SECTION
('reading-strategies', 'reading', 1, 'Chapter 1: Reading Strategies', 'Active reading and time management', 22, 'beginner', '["strategy"]'),
('main-idea', 'reading', 2, 'Chapter 2: Main Ideas and Themes', 'Identifying central ideas and themes', 23, 'beginner', '["comprehension"]'),
('supporting-details', 'reading', 3, 'Chapter 3: Supporting Details', 'Finding evidence and key details', 24, 'beginner', '["comprehension"]'),
('inference', 'reading', 4, 'Chapter 4: Making Inferences', 'Drawing conclusions from text', 25, 'intermediate', '["critical-thinking"]'),
('authors-purpose', 'reading', 5, 'Chapter 5: Author\'s Purpose and Tone', 'Understanding intent and attitude', 26, 'intermediate', '["analysis"]'),
('vocabulary-context', 'reading', 6, 'Chapter 6: Vocabulary in Context', 'Using context clues for word meaning', 27, 'intermediate', '["vocabulary"]'),
('comparative-reading', 'reading', 7, 'Chapter 7: Comparative Reading', 'Analyzing paired passages', 28, 'advanced', '["comparison"]'),
('prose-fiction', 'reading', 8, 'Chapter 8: Prose Fiction Passages', 'Strategies for literary narratives', 29, 'intermediate', '["literature"]'),
('social-science', 'reading', 9, 'Chapter 9: Social Science Passages', 'Analyzing social studies texts', 30, 'intermediate', '["analysis"]'),
('natural-science', 'reading', 10, 'Chapter 10: Natural Science Passages', 'Reading scientific texts', 31, 'intermediate', '["science"]'),

-- SCIENCE SECTION
('science-reasoning', 'science', 1, 'Chapter 1: Scientific Reasoning', 'Understanding the ACT Science format', 32, 'beginner', '["introduction"]'),
('data-representation', 'science', 2, 'Chapter 2: Data Representation', 'Reading graphs, tables, and charts', 33, 'beginner', '["data-analysis"]'),
('research-summaries', 'science', 3, 'Chapter 3: Research Summaries', 'Understanding experiments and studies', 34, 'intermediate', '["experiments"]'),
('conflicting-viewpoints', 'science', 4, 'Chapter 4: Conflicting Viewpoints', 'Comparing scientific theories', 35, 'advanced', '["critical-thinking"]'),
('biology', 'science', 5, 'Chapter 5: Biology Concepts', 'Key biology topics for ACT Science', 36, 'intermediate', '["biology"]'),
('chemistry', 'science', 6, 'Chapter 6: Chemistry Concepts', 'Essential chemistry knowledge', 37, 'intermediate', '["chemistry"]'),
('physics', 'science', 7, 'Chapter 7: Physics Concepts', 'Basic physics principles', 38, 'intermediate', '["physics"]'),
('earth-science', 'science', 8, 'Chapter 8: Earth Science', 'Geology, meteorology, and astronomy', 39, 'intermediate', '["earth-science"]'),
('scientific-method', 'science', 9, 'Chapter 9: Scientific Method', 'Experimental design and hypothesis testing', 40, 'intermediate', '["methodology"]'),
('science-time-management', 'science', 10, 'Chapter 10: Science Time Management', 'Strategies for efficient problem-solving', 41, 'beginner', '["strategy"]');

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Show lesson count by section
SELECT
  section,
  COUNT(*) as lesson_count
FROM lesson_catalog
GROUP BY section
ORDER BY section;

-- Expected results:
-- all: 1 lesson
-- english: 10 lessons
-- math: 10 lessons
-- reading: 10 lessons
-- science: 10 lessons
-- TOTAL: 41 lessons
