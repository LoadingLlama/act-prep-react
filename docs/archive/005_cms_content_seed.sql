-- ============================================
-- CMS CONTENT SEED DATA
-- ============================================
-- Purpose: Populate CMS tables with current hardcoded content
-- Source: Extracted from CompleteLandingPage.jsx and App.js
-- ============================================

-- ============================================
-- SECTION 1: Hero Content
-- ============================================

INSERT INTO cms_site_content (content_key, section, content_type, content_value, display_order) VALUES
('hero_badge_text', 'hero', 'text', '"Unlock Your Full Academic Potential"', 1),
('hero_dynamic_texts', 'hero', 'array', '["Elite Preparation", "Expert Personal Tutors", "Science-Based Methods", "Full-Tailored Courses", "Precision Analytics", "Diagnostic Test", "AI-Powered Learning"]', 2),
('hero_title_html', 'hero', 'html', '"The <span class=\"highlight\">Future</span> of<br/>ACT Preparation"', 3),
('hero_subtitle', 'hero', 'text', '"Transform your test scores with AI-powered learning, expert guidance, and proven strategies that adapt to your unique learning style."', 4),
('hero_cta_primary', 'hero', 'text', '"Start Your Free Trial"', 5),
('hero_cta_secondary', 'hero', 'text', '"Watch Demo"', 6);

-- ============================================
-- SECTION 2: Social Proof Signups
-- ============================================

INSERT INTO cms_social_proof (signup_text, display_order) VALUES
('Sarah from California just joined', 1),
('Michael from New York just joined', 2),
('Emma from Texas just joined', 3),
('David from Florida just joined', 4),
('Ashley from Illinois just joined', 5),
('Jordan from Pennsylvania just joined', 6),
('Madison from Ohio just joined', 7),
('Tyler from Georgia just joined', 8);

-- ============================================
-- SECTION 3: Performance Chart Data
-- ============================================

INSERT INTO analytics_chart_data (chart_key, data_point_label, data_values, tooltip_text, display_order) VALUES
('performance_comparison', 'Week 1', '{"traditional": 45, "launchPrep": 35}', 'Traditional: 45% vs Launch Prep: 35%', 1),
('performance_comparison', 'Week 2', '{"traditional": 60, "launchPrep": 40}', 'Traditional: 60% vs Launch Prep: 40%', 2),
('performance_comparison', 'Week 3', '{"traditional": 70, "launchPrep": 45}', 'Traditional: 70% vs Launch Prep: 45%', 3),
('performance_comparison', 'Week 4', '{"traditional": 75, "launchPrep": 50}', 'Traditional: 75% vs Launch Prep: 50%', 4),
('performance_comparison', 'Week 5', '{"traditional": 78, "launchPrep": 65}', 'Traditional: 78% vs Launch Prep: 65%', 5),
('performance_comparison', 'Week 6', '{"traditional": 80, "launchPrep": 78}', 'Traditional: 80% vs Launch Prep: 78%', 6),
('performance_comparison', 'Week 7', '{"traditional": 81, "launchPrep": 88}', 'Traditional: 81% vs Launch Prep: 88%', 7),
('performance_comparison', 'Week 8', '{"traditional": 82, "launchPrep": 95}', 'Traditional: 82% vs Launch Prep: 95%', 8),
('performance_comparison', 'Week 9', '{"traditional": 82, "launchPrep": 100}', 'Traditional: 82% vs Launch Prep: 100%', 9);

-- ============================================
-- SECTION 4: Features
-- ============================================

INSERT INTO cms_features (title, description, icon, highlight_color, display_order) VALUES
('AI-Powered Learning', 'Personalized study plans that adapt to your learning style and pace', '🧠', '#007aff', 1),
('Expert Tutors', '1-on-1 guidance from top ACT scorers available 24/7', '👨‍🎓', '#34c759', 2),
('Diagnostic Testing', 'Pinpoint your strengths and weaknesses with advanced analytics', '📊', '#ff9500', 3),
('Interactive Lessons', 'Engaging multimedia content that makes learning enjoyable', '🎯', '#5856d6', 4),
('Progress Tracking', 'Real-time insights into your improvement and areas to focus', '📈', '#ff2d55', 5),
('Practice Tests', 'Unlimited full-length practice tests that mirror the real ACT', '✍️', '#00c7be', 6);

-- ============================================
-- SECTION 5: Testimonials
-- ============================================

INSERT INTO cms_testimonials (student_name, student_location, score_before, score_after, testimonial_text, testimonial_title, is_featured, display_order) VALUES
('Sarah Johnson', 'California', 24, 34, 'Launch Prep transformed my ACT journey. The AI tutor identified exactly where I was struggling and created a personalized plan that boosted my score by 10 points!', 'Amazing Results!', true, 1),
('Michael Chen', 'New York', 28, 35, 'I went from average to exceptional! The expert tutors were always available when I needed help, and the practice tests were incredibly accurate.', 'From Average to Exceptional', true, 2),
('Emma Rodriguez', 'Texas', 26, 33, 'The diagnostic testing feature was a game-changer. It showed me exactly what to focus on, and I improved 7 points in just 6 weeks!', 'Game-Changer!', true, 3),
('David Park', 'Illinois', 25, 32, 'Best investment I made for college prep. The interactive lessons made studying actually fun, and the results speak for themselves.', 'Best Investment', false, 4);

-- ============================================
-- SECTION 6: Pricing Tiers
-- ============================================

INSERT INTO cms_pricing_tiers (tier_name, tier_subtitle, price_monthly, price_yearly, features, is_popular, badge_text, display_order) VALUES
('Basic', 'Perfect for Getting Started', 19.99, 199.00, '["Access to all lessons", "Basic progress tracking", "Email support", "5 practice tests per month"]', false, null, 1),
('Pro', 'Most Popular Choice', 49.99, 479.00, '["Everything in Basic", "AI-powered study plans", "24/7 expert tutor access", "Unlimited practice tests", "Advanced analytics", "Priority support"]', true, 'MOST POPULAR', 2),
('Elite', 'Maximum Results', 99.99, 959.00, '["Everything in Pro", "1-on-1 private tutoring sessions", "Personalized score guarantee", "College application guidance", "VIP support", "Score improvement tracking"]', false, 'BEST VALUE', 3);

-- ============================================
-- SECTION 7: FAQ Items
-- ============================================

INSERT INTO cms_faq_items (question, answer, category, display_order) VALUES
('How does the AI tutoring work?', 'Our AI analyzes your performance across all practice questions and lessons to identify your strengths and weaknesses. It then creates a personalized study plan that adapts in real-time based on your progress, focusing on areas where you need the most improvement.', 'general', 1),
('What makes Launch Prep different from other ACT prep services?', 'Launch Prep combines cutting-edge AI technology with expert human tutors. Our adaptive learning system ensures you''re always working on the most impactful areas, while our 24/7 tutor access means you never get stuck. Plus, our students see an average score improvement of 8 points.', 'general', 2),
('Can I try Launch Prep before committing?', 'Absolutely! We offer a 7-day free trial with full access to all features. No credit card required. Try our AI tutor, take practice tests, and see the difference for yourself.', 'pricing', 3),
('How long does it take to see results?', 'Most students see measurable improvement within 2-3 weeks of consistent use. On average, our students achieve their target score improvement in 6-8 weeks, but results vary based on individual effort and starting score.', 'general', 4),
('Do you offer a money-back guarantee?', 'Yes! If you don''t see at least a 3-point improvement after 60 days of active use (defined as 10+ hours per week), we''ll refund your subscription. Your success is our priority.', 'pricing', 5),
('Can I access Launch Prep on mobile devices?', 'Yes! Launch Prep works seamlessly on desktop, tablet, and mobile devices. Your progress syncs automatically across all devices so you can study anywhere, anytime.', 'technical', 6),
('How often is content updated?', 'We update our question bank monthly to reflect the latest ACT trends. Our AI algorithms are continuously improved based on student performance data, ensuring you always have access to the most effective prep materials.', 'general', 7),
('What if I need help outside of the app?', 'Pro and Elite members have 24/7 access to expert tutors via chat. All members can email support@launchprep.com and we respond within 24 hours. Elite members also get scheduled 1-on-1 tutoring sessions.', 'support', 8);

-- ============================================
-- SECTION 8: Lesson Catalog (from App.js lessonStructure)
-- ============================================

-- Getting Started
INSERT INTO lesson_catalog (lesson_key, section, chapter_number, title, description, display_order, difficulty_level) VALUES
('getting-started', 'all', 0, 'ACT Test Basics & Overview', 'Test format, timing, and scoring overview', 1, 'beginner');

-- ENGLISH SECTION
INSERT INTO lesson_catalog (lesson_key, section, chapter_number, title, description, display_order, difficulty_level) VALUES
('sentence-structure', 'english', 1, 'Chapter 1: Building Complete Sentences', 'Independent clauses, dependent clauses, compound sentences, and comma splices', 2, 'beginner'),
('commas', 'english', 2, 'Chapter 2: Essential Comma Rules', 'Unnecessary information, names rule, listing commas, and adjective lists', 3, 'beginner'),
('semicolons-colons', 'english', 3, 'Chapter 3: Semicolons, Colons & Dashes', 'FANBOYS test, semicolon usage, colons, and dash applications', 4, 'intermediate'),
('pronouns', 'english', 4, 'Chapter 4: Pronoun Agreement', 'Singular/plural agreement, gender agreement, and unclear antecedents', 5, 'intermediate'),
('verbs', 'english', 5, 'Chapter 5: Verb Tenses & Forms', 'Present, past, and future tenses with proper consistency', 6, 'intermediate'),
('modifiers', 'english', 6, 'Chapter 6: Modifiers & Word Choice', 'Adjectives vs. adverbs, comparatives, superlatives, and word precision', 7, 'intermediate'),
('parallelism', 'english', 7, 'Chapter 7: Parallel Structure', 'Maintaining consistency in lists, comparisons, and correlative conjunctions', 8, 'advanced'),
('transitions', 'english', 8, 'Chapter 8: Transitions & Flow', 'Logical connectors, sentence relationships, and paragraph coherence', 9, 'intermediate'),
('concision', 'english', 9, 'Chapter 9: Concision & Redundancy', 'Eliminating wordiness, removing redundancies, and being direct', 10, 'intermediate'),
('rhetorical-skills', 'english', 10, 'Chapter 10: Rhetorical Skills', 'Purpose, audience, tone, and effective writing strategies', 11, 'advanced');

-- MATH SECTION
INSERT INTO lesson_catalog (lesson_key, section, chapter_number, title, description, display_order, difficulty_level) VALUES
('pre-algebra-basics', 'math', 1, 'Chapter 1: Pre-Algebra Foundations', 'Number operations, factors, multiples, fractions, and decimals', 12, 'beginner'),
('elementary-algebra', 'math', 2, 'Chapter 2: Elementary Algebra', 'Variables, expressions, linear equations, and inequalities', 13, 'beginner'),
('intermediate-algebra', 'math', 3, 'Chapter 3: Intermediate Algebra', 'Quadratic equations, polynomials, rational expressions, and systems', 14, 'intermediate'),
('coordinate-geometry', 'math', 4, 'Chapter 4: Coordinate Geometry', 'Graphing lines, slopes, distance, midpoint, and conic sections', 15, 'intermediate'),
('plane-geometry', 'math', 5, 'Chapter 5: Plane Geometry', 'Angles, triangles, quadrilaterals, circles, and area/perimeter', 16, 'intermediate'),
('trigonometry', 'math', 6, 'Chapter 6: Trigonometry Basics', 'Right triangles, trig ratios (SOH CAH TOA), unit circle, and identities', 17, 'advanced'),
('functions', 'math', 7, 'Chapter 7: Functions & Graphs', 'Function notation, domain/range, transformations, and composition', 18, 'advanced'),
('sequences-patterns', 'math', 8, 'Chapter 8: Sequences & Patterns', 'Arithmetic and geometric sequences, series, and pattern recognition', 19, 'advanced'),
('word-problems', 'math', 9, 'Chapter 9: Word Problems & Applications', 'Translating words to equations, rate problems, and mixture problems', 20, 'intermediate'),
('math-strategies', 'math', 10, 'Chapter 10: Problem-Solving Strategies', 'Plugging in answers, estimation, eliminating choices, and time management', 21, 'intermediate');

-- READING SECTION
INSERT INTO lesson_catalog (lesson_key, section, chapter_number, title, description, display_order, difficulty_level) VALUES
('reading-intro', 'reading', 1, 'Chapter 1: ACT Reading Overview', 'Passage types, question formats, timing strategies, and scoring', 22, 'beginner'),
('main-ideas', 'reading', 2, 'Chapter 2: Main Ideas & Themes', 'Identifying central themes, author''s purpose, and passage structure', 23, 'beginner'),
('details-evidence', 'reading', 3, 'Chapter 3: Supporting Details', 'Finding textual evidence, explicit vs. implicit information, and citations', 24, 'intermediate'),
('inferences', 'reading', 4, 'Chapter 4: Making Inferences', 'Drawing conclusions, reading between the lines, and implied meanings', 25, 'intermediate'),
('vocabulary-context', 'reading', 5, 'Chapter 5: Vocabulary in Context', 'Determining word meaning from context clues and connotation', 26, 'intermediate'),
('author-craft', 'reading', 6, 'Chapter 6: Author''s Craft & Style', 'Rhetorical devices, tone, mood, and stylistic choices', 27, 'advanced'),
('comparative-passages', 'reading', 7, 'Chapter 7: Comparing Passages', 'Dual passage strategies, finding connections, and contrasting viewpoints', 28, 'advanced'),
('prose-fiction', 'reading', 8, 'Chapter 8: Prose Fiction Strategies', 'Character analysis, plot development, and narrative techniques', 29, 'intermediate'),
('natural-science', 'reading', 9, 'Chapter 9: Natural Science Passages', 'Scientific concepts, data interpretation, and technical vocabulary', 30, 'intermediate'),
('reading-efficiency', 'reading', 10, 'Chapter 10: Reading Efficiency', 'Skimming, scanning, time management, and annotation techniques', 31, 'intermediate');

-- SCIENCE SECTION
INSERT INTO lesson_catalog (lesson_key, section, chapter_number, title, description, display_order, difficulty_level) VALUES
('science-intro', 'science', 1, 'Chapter 1: Science Test Overview', 'Format, passage types, data representation, and research summaries', 32, 'beginner'),
('data-representation', 'science', 2, 'Chapter 2: Interpreting Graphs & Tables', 'Reading charts, graphs, tables, and identifying trends', 33, 'beginner'),
('research-summaries', 'science', 3, 'Chapter 3: Research Summaries', 'Understanding experiments, variables, controls, and hypotheses', 34, 'intermediate'),
('conflicting-viewpoints', 'science', 4, 'Chapter 4: Conflicting Viewpoints', 'Comparing theories, analyzing arguments, and finding evidence', 35, 'advanced'),
('scientific-method', 'science', 5, 'Chapter 5: The Scientific Method', 'Hypothesis, experimentation, analysis, and conclusions', 36, 'intermediate'),
('chemistry-concepts', 'science', 6, 'Chapter 6: Essential Chemistry', 'Atoms, molecules, reactions, pH, and chemical equations', 37, 'intermediate'),
('physics-basics', 'science', 7, 'Chapter 7: Physics Fundamentals', 'Motion, forces, energy, waves, and basic physics principles', 38, 'intermediate'),
('biology-essentials', 'science', 8, 'Chapter 8: Biology Basics', 'Cells, genetics, ecology, and biological systems', 39, 'intermediate'),
('earth-science', 'science', 9, 'Chapter 9: Earth & Space Science', 'Geology, meteorology, astronomy, and environmental science', 40, 'intermediate'),
('science-reasoning', 'science', 10, 'Chapter 10: Scientific Reasoning', 'Critical thinking, pattern recognition, and eliminating answers', 41, 'advanced');

-- ============================================
-- SECTION 9: AI Chat Responses
-- ============================================

INSERT INTO ai_chat_responses (response_key, response_type, response_text, trigger_keywords, display_order) VALUES
('greeting_1', 'greeting', 'Hi! I''m your AI tutor. What would you like to study today?', '["hi", "hello", "hey"]', 1),
('greeting_2', 'greeting', 'Hello! Ready to ace the ACT? Let''s get started!', '["hi", "hello", "hey"]', 2),
('fallback_1', 'fallback', 'Could you provide more details about what you''re struggling with?', '[]', 1),
('fallback_2', 'fallback', 'I''m here to help with ACT prep! Could you rephrase your question?', '[]', 2),
('help_general', 'help', 'I can help you with English, Math, Reading, and Science prep. I can explain concepts, provide practice questions, or review your answers. What subject would you like to work on?', '["help", "assist"]', 1),
('error_generic', 'error', 'I''m having trouble understanding. Let me connect you with a human tutor who can better assist you.', '[]', 1),
('clarification_1', 'clarification', 'Just to make sure I understand: are you asking about [topic]?', '[]', 1);

-- ============================================
-- SECTION 10: App Configuration
-- ============================================

INSERT INTO config_app_settings (setting_key, setting_group, setting_value, value_type, description, is_public) VALUES
('signup_count_initial', 'ui', '7567', 'number', 'Initial signup count displayed on landing page', true),
('enable_ai_chat', 'features', 'true', 'boolean', 'Enable/disable AI chat feature', true),
('max_practice_tests_basic', 'limits', '5', 'number', 'Max practice tests per month for Basic tier', false),
('max_practice_tests_pro', 'limits', '-1', 'number', 'Max practice tests for Pro tier (-1 = unlimited)', false),
('typewriter_speed_ms', 'ui', '30', 'number', 'Typewriter effect speed in milliseconds', true),
('enable_diagnostic_test', 'features', 'true', 'boolean', 'Enable diagnostic test feature', true),
('support_email', 'contact', '"support@launchprep.com"', 'string', 'Support email address', true),
('trial_duration_days', 'features', '7', 'number', 'Free trial duration in days', true);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

DO $$
DECLARE
  content_count INTEGER;
  social_count INTEGER;
  chart_count INTEGER;
  features_count INTEGER;
  testimonials_count INTEGER;
  pricing_count INTEGER;
  faq_count INTEGER;
  lessons_count INTEGER;
  ai_count INTEGER;
  config_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO content_count FROM cms_site_content;
  SELECT COUNT(*) INTO social_count FROM cms_social_proof;
  SELECT COUNT(*) INTO chart_count FROM analytics_chart_data;
  SELECT COUNT(*) INTO features_count FROM cms_features;
  SELECT COUNT(*) INTO testimonials_count FROM cms_testimonials;
  SELECT COUNT(*) INTO pricing_count FROM cms_pricing_tiers;
  SELECT COUNT(*) INTO faq_count FROM cms_faq_items;
  SELECT COUNT(*) INTO lessons_count FROM lesson_catalog;
  SELECT COUNT(*) INTO ai_count FROM ai_chat_responses;
  SELECT COUNT(*) INTO config_count FROM config_app_settings;

  RAISE NOTICE '';
  RAISE NOTICE '================================================';
  RAISE NOTICE '  CMS CONTENT SEED DATA LOADED';
  RAISE NOTICE '================================================';
  RAISE NOTICE '  Hero content:           % rows', content_count;
  RAISE NOTICE '  Social proof:           % rows', social_count;
  RAISE NOTICE '  Chart data:             % rows', chart_count;
  RAISE NOTICE '  Features:               % rows', features_count;
  RAISE NOTICE '  Testimonials:           % rows', testimonials_count;
  RAISE NOTICE '  Pricing tiers:          % rows', pricing_count;
  RAISE NOTICE '  FAQ items:              % rows', faq_count;
  RAISE NOTICE '  Lesson catalog:         % rows', lessons_count;
  RAISE NOTICE '  AI responses:           % rows', ai_count;
  RAISE NOTICE '  App config:             % rows', config_count;
  RAISE NOTICE '================================================';
  RAISE NOTICE '';
END $$;
