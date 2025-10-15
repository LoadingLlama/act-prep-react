-- ============================================
-- ACT SKILL TAXONOMY - SEED DATA
-- ============================================
-- Comprehensive skill mapping for all ACT sections
-- Based on official ACT structure and lesson taxonomy
-- ============================================

-- ============================================
-- ENGLISH SECTION SKILLS
-- ============================================

-- Top-level English categories
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level) VALUES
('ENG_GRAMMAR', 'Grammar & Usage', 'english', NULL, 'Core grammar and usage rules', 2),
('ENG_RHETORIC', 'Rhetorical Skills', 'english', NULL, 'Style, organization, and effectiveness', 3);

-- Grammar & Usage subcategories
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_SENT_STRUCT', 'Sentence Structure', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_GRAMMAR'),
  'Complete sentences, fragments, run-ons, and clauses', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_PUNCTUATION', 'Punctuation', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_GRAMMAR'),
  'Commas, semicolons, colons, apostrophes, and other punctuation', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_AGREEMENT', 'Agreement', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_GRAMMAR'),
  'Subject-verb agreement and pronoun agreement', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_VERBS', 'Verb Forms & Tense', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_GRAMMAR'),
  'Verb tense consistency and irregular verbs', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_PRONOUNS', 'Pronouns', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_GRAMMAR'),
  'Pronoun case, who vs. whom, and pronoun clarity', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_MODIFIERS', 'Modifiers', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_GRAMMAR'),
  'Misplaced and dangling modifiers', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_PARALLEL', 'Parallel Structure', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_GRAMMAR'),
  'Parallel structure in lists and comparisons', 3;

-- Detailed Sentence Structure skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_INDEP_CLAUSES', 'Independent Clauses', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_SENT_STRUCT'),
  'Understanding complete thoughts', 1;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_DEP_CLAUSES', 'Dependent Clauses', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_SENT_STRUCT'),
  'Incomplete thoughts and subordination', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_COMMA_SPLICE', 'Comma Splices', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_SENT_STRUCT'),
  'Fixing improperly joined clauses', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_RUN_ONS', 'Run-on Sentences', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_SENT_STRUCT'),
  'Identifying and correcting run-ons', 2;

-- Detailed Punctuation skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_COMMAS', 'Comma Rules', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_PUNCTUATION'),
  'Essential and nonessential information', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_SEMICOLONS', 'Semicolons', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_PUNCTUATION'),
  'Joining independent clauses', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_COLONS', 'Colons', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_PUNCTUATION'),
  'Lists and explanations', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_APOSTROPHES', 'Apostrophes', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_PUNCTUATION'),
  'Possessives and contractions', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_DASHES', 'Dashes & Parentheses', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_PUNCTUATION'),
  'Interrupting information', 3;

-- Rhetorical Skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_ORGANIZATION', 'Organization', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_RHETORIC'),
  'Logical flow and paragraph structure', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_STYLE', 'Style & Tone', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_RHETORIC'),
  'Word choice and appropriateness', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_REDUNDANCY', 'Redundancy & Wordiness', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_RHETORIC'),
  'Eliminating unnecessary words', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_TRANSITIONS', 'Transitions', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_RHETORIC'),
  'Logical connectors between ideas', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_ADD_DELETE', 'Adding/Deleting Information', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_RHETORIC'),
  'Determining relevance of content', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT
  'ENG_PLACEMENT', 'Sentence Placement', 'english',
  (SELECT id FROM skills WHERE skill_code = 'ENG_RHETORIC'),
  'Logical ordering of sentences', 3;

-- ============================================
-- MATH SECTION SKILLS
-- ============================================

-- Top-level Math categories
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level) VALUES
('MATH_PRE_ALG', 'Pre-Algebra', 'math', NULL, 'Basic arithmetic and number concepts', 2),
('MATH_ELEM_ALG', 'Elementary Algebra', 'math', NULL, 'Basic algebraic concepts and equations', 2),
('MATH_INT_ALG', 'Intermediate Algebra', 'math', NULL, 'Advanced algebraic concepts', 3),
('MATH_COORD_GEO', 'Coordinate Geometry', 'math', NULL, 'Graphing and coordinate plane', 3),
('MATH_PLANE_GEO', 'Plane Geometry', 'math', NULL, 'Shapes, angles, and spatial reasoning', 2),
('MATH_TRIG', 'Trigonometry', 'math', NULL, 'Trigonometric functions and identities', 4);

-- Pre-Algebra skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_NUMBER_THEORY', 'Number Theory', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_PRE_ALG'),
  'Types of numbers, divisibility, GCD, LCM', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_FRACTIONS', 'Fractions', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_PRE_ALG'),
  'Operations with fractions', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_PERCENTAGES', 'Percentages', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_PRE_ALG'),
  'Percentage calculations and applications', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_RATIOS', 'Ratios & Proportions', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_PRE_ALG'),
  'Ratio problems and proportional reasoning', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_STATISTICS', 'Basic Statistics', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_PRE_ALG'),
  'Mean, median, mode, range', 2;

-- Elementary Algebra skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_ALG_BASICS', 'Algebraic Basics', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_ELEM_ALG'),
  'PEMDAS, combining like terms, distributive property', 1;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_LINEAR_EQ', 'Linear Equations', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_ELEM_ALG'),
  'Solving one-variable linear equations', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_INEQUALITIES', 'Inequalities', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_ELEM_ALG'),
  'Solving and graphing inequalities', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_WORD_PROB', 'Word Problems', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_ELEM_ALG'),
  'Translating words to equations', 3;

-- Intermediate Algebra skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_QUADRATICS', 'Quadratic Equations', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_INT_ALG'),
  'Factoring, quadratic formula, vertex form', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_FUNCTIONS', 'Functions', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_INT_ALG'),
  'Function notation, composition, domain, range', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_SYSTEMS', 'Systems of Equations', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_INT_ALG'),
  'Substitution and elimination methods', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_EXPONENTS', 'Exponents & Radicals', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_INT_ALG'),
  'Exponent rules and simplifying radicals', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_LOGARITHMS', 'Logarithms', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_INT_ALG'),
  'Logarithm properties and equations', 4;

-- Coordinate Geometry skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_LINES', 'Lines & Slopes', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_COORD_GEO'),
  'Slope, equations of lines, parallel/perpendicular', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_DISTANCE', 'Distance & Midpoint', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_COORD_GEO'),
  'Distance formula and midpoint formula', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_GRAPHING', 'Graphing', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_COORD_GEO'),
  'Graphing equations and inequalities', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_CONICS', 'Conic Sections', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_COORD_GEO'),
  'Circles, ellipses, parabolas, hyperbolas', 4;

-- Plane Geometry skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_ANGLES', 'Angles & Lines', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_PLANE_GEO'),
  'Angle relationships, parallel lines, transversals', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_TRIANGLES', 'Triangles', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_PLANE_GEO'),
  'Triangle properties, Pythagorean theorem, special triangles', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_AREA_VOLUME', 'Area & Volume', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_PLANE_GEO'),
  'Formulas for area and volume of shapes', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_CIRCLES', 'Circles', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_PLANE_GEO'),
  'Circle properties, arcs, sectors, tangents', 3;

-- Trigonometry skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_TRIG_BASIC', 'Basic Trigonometry', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_TRIG'),
  'SOH-CAH-TOA and right triangle trig', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_UNIT_CIRCLE', 'Unit Circle', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_TRIG'),
  'Unit circle and trig values', 4;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'MATH_TRIG_IDENTITIES', 'Trig Identities', 'math',
  (SELECT id FROM skills WHERE skill_code = 'MATH_TRIG'),
  'Trigonometric identities and equations', 4;

-- Advanced/Rare Math skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level) VALUES
('MATH_MATRICES', 'Matrices', 'math', NULL, 'Matrix operations and determinants', 4),
('MATH_COMPLEX', 'Complex Numbers', 'math', NULL, 'Operations with imaginary numbers', 4),
('MATH_SEQUENCES', 'Sequences & Series', 'math', NULL, 'Arithmetic and geometric sequences', 3),
('MATH_PROBABILITY', 'Probability', 'math', NULL, 'Basic probability and counting', 3),
('MATH_VECTORS', 'Vectors', 'math', NULL, 'Vector operations and components', 4);

-- ============================================
-- READING SECTION SKILLS
-- ============================================

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level) VALUES
('READ_MAIN_IDEA', 'Main Idea & Theme', 'reading', NULL, 'Identifying central ideas and themes', 2),
('READ_DETAILS', 'Supporting Details', 'reading', NULL, 'Finding specific information in text', 1),
('READ_INFERENCE', 'Inference & Implication', 'reading', NULL, 'Drawing conclusions from text', 3),
('READ_VOCAB', 'Vocabulary in Context', 'reading', NULL, 'Determining word meaning from context', 2),
('READ_PURPOSE', 'Author Purpose & Perspective', 'reading', NULL, 'Understanding author intent and viewpoint', 3),
('READ_STRUCTURE', 'Text Structure & Organization', 'reading', NULL, 'Analyzing how text is organized', 3),
('READ_RELATIONSHIPS', 'Cause & Effect Relationships', 'reading', NULL, 'Identifying relationships between ideas', 2),
('READ_COMPARISON', 'Comparing Passages', 'reading', NULL, 'Analyzing similarities and differences', 3),
('READ_EVIDENCE', 'Textual Evidence', 'reading', NULL, 'Citing evidence to support answers', 2),
('READ_TONE', 'Tone & Mood', 'reading', NULL, 'Identifying tone and mood', 3);

-- ============================================
-- SCIENCE SECTION SKILLS
-- ============================================

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level) VALUES
('SCI_DATA_REP', 'Data Representation', 'science', NULL, 'Reading charts, graphs, and tables', 2),
('SCI_INVESTIGATION', 'Scientific Investigation', 'science', NULL, 'Understanding experimental design', 3),
('SCI_EVALUATION', 'Evaluation of Models', 'science', NULL, 'Analyzing scientific models and theories', 4),
('SCI_INTERPRETATION', 'Data Interpretation', 'science', NULL, 'Drawing conclusions from data', 3);

-- Detailed Science skills
INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'SCI_SPECIFIC_DATA', 'Specific Data Points', 'science',
  (SELECT id FROM skills WHERE skill_code = 'SCI_DATA_REP'),
  'Finding exact values from figures', 1;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'SCI_TRENDS', 'Identifying Trends', 'science',
  (SELECT id FROM skills WHERE skill_code = 'SCI_DATA_REP'),
  'Recognizing patterns in data', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'SCI_APPROX', 'Approximation & Interpolation', 'science',
  (SELECT id FROM skills WHERE skill_code = 'SCI_DATA_REP'),
  'Estimating values between data points', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'SCI_MULTI_FIG', 'Multiple Figures', 'science',
  (SELECT id FROM skills WHERE skill_code = 'SCI_DATA_REP'),
  'Using multiple charts or graphs together', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'SCI_FIG_TEXT', 'Figures + Text Integration', 'science',
  (SELECT id FROM skills WHERE skill_code = 'SCI_DATA_REP'),
  'Combining visual and textual information', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'SCI_EXP_DESIGN', 'Experimental Design', 'science',
  (SELECT id FROM skills WHERE skill_code = 'SCI_INVESTIGATION'),
  'Understanding why experiments are designed certain ways', 3;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'SCI_VARIABLES', 'Variables & Controls', 'science',
  (SELECT id FROM skills WHERE skill_code = 'SCI_INVESTIGATION'),
  'Identifying independent, dependent, and control variables', 2;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'SCI_CONFLICTING', 'Conflicting Viewpoints', 'science',
  (SELECT id FROM skills WHERE skill_code = 'SCI_EVALUATION'),
  'Comparing different scientific perspectives', 4;

INSERT INTO skills (skill_code, skill_name, section, parent_skill_id, description, difficulty_level)
SELECT 'SCI_PREDICTIONS', 'Making Predictions', 'science',
  (SELECT id FROM skills WHERE skill_code = 'SCI_INTERPRETATION'),
  'Predicting outcomes based on data', 3;

-- Verification
DO $$
DECLARE
    skill_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO skill_count FROM skills;
    RAISE NOTICE '========================================';
    RAISE NOTICE 'SKILL TAXONOMY SEEDED';
    RAISE NOTICE 'Total skills created: %', skill_count;
    RAISE NOTICE '========================================';
END $$;
