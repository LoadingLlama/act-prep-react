export const lessonStructure = [
  { id: 'getting-started', section: 'all', chapterNum: null, title: 'ACT Test Basics & Overview', desc: 'Test format, timing, and scoring overview', status: 'completed', category: 'Introduction' },

  // English Section - Grammar Fundamentals (Chapter 1)
  { id: 'sentence-structure', section: 'english', chapterNum: '1.1', title: 'Building Complete Sentences', desc: 'Independent clauses, dependent clauses, compound sentences, and comma splices', status: 'completed', category: 'Grammar Fundamentals', keyTerms: ['Independent Clause', 'Dependent Clause', 'Compound Sentence', 'Comma Splice', 'Run-on Sentence', 'Fragment'] },
  { id: 'commas', section: 'english', chapterNum: '1.2', title: 'Essential Comma Rules', desc: 'Unnecessary information, names rule, listing commas, and adjective lists', status: 'completed', category: 'Grammar Fundamentals', keyTerms: ['Unnecessary Information', 'Names Rule', 'Listing Commas', 'Adjective Lists', 'Nonrestrictive Clause'] },
  { id: 'punctuation', section: 'english', chapterNum: '1.3', title: 'Advanced Punctuation', desc: 'Semicolons, colons, dashes, apostrophes, and quotation marks', status: 'in-progress', category: 'Grammar Fundamentals', keyTerms: ['Semicolon', 'Colon', 'Em Dash', 'Apostrophe', 'Quotation Marks', 'Possessive'] },
  { id: 'verbs', section: 'english', chapterNum: '1.4', title: 'Verb Agreement & Tenses', desc: 'Subject-verb agreement, verb tense, and irregular verbs', status: 'not-started', category: 'Grammar Fundamentals', keyTerms: ['Subject-Verb Agreement', 'Verb Tense', 'Tense Consistency', 'Irregular Verbs', 'Present Perfect', 'Past Perfect'] },
  { id: 'pronouns', section: 'english', chapterNum: '1.5', title: 'Pronoun Usage & Agreement', desc: 'Pronoun case, who vs. whom, pronoun agreement, and ambiguous pronouns', status: 'not-started', category: 'Grammar Fundamentals', keyTerms: ['Pronoun Case', 'Who vs Whom', 'Pronoun Agreement', 'Ambiguous Pronouns', 'Antecedent Agreement', 'Clear Reference'] },
  { id: 'modifiers', section: 'english', chapterNum: '1.6', title: 'Modifier Placement', desc: 'Identifying and correcting misplaced modifiers in sentences', status: 'not-started', category: 'Grammar Fundamentals', keyTerms: ['Misplaced Modifier', 'Dangling Modifier', 'Introductory Phrase', 'Modifier Placement', 'Opening Modifier'] },
  { id: 'parallel-structure', section: 'english', chapterNum: '1.7', title: 'Mastering Parallel Structure', desc: 'Parallel structure in lists and comparisons', status: 'not-started', category: 'Grammar Fundamentals', keyTerms: ['Parallel Structure', 'Parallelism', 'Correlative Conjunctions', 'List Consistency', 'Comparison Parallelism'] },
  { id: 'misc-topics', section: 'english', chapterNum: '1.8', title: 'Grammar Essentials & Common Errors', desc: 'Commonly confused words, active vs. passive voice, and prepositional idioms', status: 'not-started', category: 'Grammar Fundamentals', keyTerms: ['Confused Words', 'Active Voice', 'Passive Voice', 'Prepositional Idioms', 'Their/There/They\'re', 'Its/It\'s'] },
  { id: 'grammar-review', section: 'english', chapterNum: '1.9', title: 'Complete Grammar Review', desc: 'Comprehensive review of all grammar concepts', status: 'not-started', category: 'Grammar Fundamentals', keyTerms: ['Sentence Structure', 'Punctuation', 'Verbs', 'Pronouns', 'Modifiers', 'Parallelism'] },

  // English Section - Rhetorical Skills (Chapter 2)
  { id: 'redundancy', section: 'english', chapterNum: '2.1', title: 'Eliminating Redundancy & Wordiness', desc: 'Identifying and eliminating redundant and wordy expressions', status: 'not-started', category: 'Rhetorical Skills', keyTerms: ['Redundancy', 'Wordiness', 'Concise Writing', 'Redundant Pairs', 'DELETE Option', 'Brevity'] },
  { id: 'word-choice', section: 'english', chapterNum: '2.2', title: 'Precise Word Choice', desc: 'Selecting the clearest and most precise words in context', status: 'not-started', category: 'Rhetorical Skills', keyTerms: ['Precise Language', 'Word Choice', 'Diction', 'Formal vs Informal', 'Context Clues', 'Tone'] },
  { id: 'transitions', section: 'english', chapterNum: '2.3', title: 'Logical Transitions', desc: 'Choosing logical transitions between sentences and paragraphs', status: 'not-started', category: 'Rhetorical Skills', keyTerms: ['Transition Words', 'Logical Flow', 'Contrast', 'Addition', 'Cause and Effect', 'Sequence'] },
  { id: 'which-choice', section: 'english', chapterNum: '2.4', title: 'Answering Which Choice Questions', desc: 'Answering specific "which choice" questions about content', status: 'not-started', category: 'Rhetorical Skills', keyTerms: ['Specific Purpose', 'Best Accomplishes', 'Content Questions', 'Rhetorical Purpose', 'Main Idea', 'Supporting Details'] },
  { id: 'adding-deleting', section: 'english', chapterNum: '2.5', title: 'Adding & Deleting Information', desc: 'Determining when to add or delete information from passages', status: 'not-started', category: 'Rhetorical Skills', keyTerms: ['Relevant Information', 'Supporting Evidence', 'Stay on Topic', 'DELETE Option', 'Main Idea Support', 'Relevance'] },
  { id: 'logical-placement', section: 'english', chapterNum: '2.6', title: 'Sentence & Paragraph Placement', desc: 'Placing sentences in the most logical order within paragraphs', status: 'not-started', category: 'Rhetorical Skills', keyTerms: ['Sentence Placement', 'Paragraph Organization', 'Logical Order', 'Topic Sentences', 'Chronological Order', 'Coherence'] },

  // Math Section - Test-Taking Strategies (Chapter 1)
  { id: 'introduction-to-act-math', section: 'math', chapterNum: null, title: 'Math Section Overview & Strategy', desc: 'Test format, timing, strategies, and essential tips for success', status: 'not-started', category: 'Introduction' },
  { id: 'backsolving', section: 'math', chapterNum: '1.1', title: 'Working Backwards Strategy', desc: 'Powerful test-taking trick for working backwards from answer choices', status: 'not-started', category: 'Test-Taking Strategies' },
  { id: 'substitution', section: 'math', chapterNum: '1.2', title: 'Number Substitution Technique', desc: 'Test-taking strategy for plugging in values', status: 'not-started', category: 'Test-Taking Strategies' },

  // Math Section - Geometry (Chapter 2)
  { id: 'geometry-angles', section: 'math', chapterNum: '2.1', title: 'Understanding Angles & Lines', desc: 'Intersecting lines, parallel lines, interior angles', status: 'not-started', category: 'Geometry' },
  { id: '2.2', section: 'math', chapterNum: '2.2', title: 'Areas, Volumes & Triangles', desc: 'Area, volume, right triangles, special triangles', status: 'not-started', category: 'Geometry' },
  { id: '2.3', section: 'math', chapterNum: '2.3', title: 'Lines', desc: 'Slope, equations of lines, midpoint, distance formulas', status: 'not-started', category: 'Geometry' },
  { id: '2.4', section: 'math', chapterNum: '2.4', title: 'Arcs and Sectors', desc: 'Circle arc lengths and sector areas', status: 'not-started', category: 'Geometry' },
  { id: '2.5', section: 'math', chapterNum: '2.5', title: 'Circles, Ellipses, and Hyperbolas', desc: 'Conic sections and their equations', status: 'not-started', category: 'Geometry' },

  // Math Section - Algebra Fundamentals (Chapter 3)
  { id: '3.1', section: 'math', chapterNum: '3.1', title: 'Algebra Skills', desc: 'PEMDAS, negative numbers, combining terms', status: 'not-started', category: 'Algebra Fundamentals' },
  { id: '3.2', section: 'math', chapterNum: '3.2', title: 'Fractions', desc: 'Operations with fractions and calculator techniques', status: 'not-started', category: 'Algebra Fundamentals' },
  { id: '3.3', section: 'math', chapterNum: '3.3', title: 'Exponents and Roots', desc: 'Exponent rules and simplifying radicals', status: 'not-started', category: 'Algebra Fundamentals' },
  { id: '3.4', section: 'math', chapterNum: '3.4', title: 'Logarithms', desc: 'Logarithm basics and change of base rule', status: 'not-started', category: 'Algebra Fundamentals' },
  { id: '3.5', section: 'math', chapterNum: '3.5', title: 'Inequalities', desc: 'Solving and graphing inequalities', status: 'not-started', category: 'Algebra Fundamentals' },
  { id: '3.6', section: 'math', chapterNum: '3.6', title: 'Absolute Value', desc: 'Absolute value equations and inequalities', status: 'not-started', category: 'Algebra Fundamentals' },

  // Math Section - Advanced Algebra (Chapter 4)
  { id: 'systems-equations', section: 'math', chapterNum: '4.1', title: 'Systems of Equations', desc: 'Elimination, substitution, word problems', status: 'not-started', category: 'Advanced Algebra' },
  { id: 'quadratics', section: 'math', chapterNum: '4.2', title: 'Quadratics', desc: 'Factoring, quadratic formula, vertex form', status: 'not-started', category: 'Advanced Algebra' },
  { id: 'functions', section: 'math', chapterNum: '4.3', title: 'Functions', desc: 'Function notation, composition, domain, range', status: 'not-started', category: 'Advanced Algebra' },
  { id: 'transforming-functions', section: 'math', chapterNum: '4.4', title: 'Shifting and Transforming Functions', desc: 'Function transformations and translations', status: 'not-started', category: 'Advanced Algebra' },
  { id: 'exponential-growth', section: 'math', chapterNum: '4.5', title: 'Exponential Growth and Decay', desc: 'Exponential functions and applications', status: 'not-started', category: 'Advanced Algebra' },
  { id: 'sequences', section: 'math', chapterNum: '4.6', title: 'Sequences', desc: 'Arithmetic and geometric sequences', status: 'not-started', category: 'Advanced Algebra' },

  // Math Section - Numbers & Operations (Chapter 5)
  { id: '5.1', section: 'math', chapterNum: '5.1', title: 'Number Theory', desc: 'Types of numbers, GCD, LCM, solution types', status: 'not-started', category: 'Numbers & Operations' },
  { id: '5.2', section: 'math', chapterNum: '5.2', title: 'Percentages', desc: 'Percentage calculations, increase/decrease', status: 'not-started', category: 'Numbers & Operations' },
  { id: '5.3', section: 'math', chapterNum: '5.3', title: 'Ratios and Proportions', desc: 'Ratio problems, proportions, direct/indirect variation', status: 'not-started', category: 'Numbers & Operations' },
  { id: '5.4', section: 'math', chapterNum: '5.4', title: 'Unit Conversion', desc: 'Converting units and dimensional analysis', status: 'not-started', category: 'Numbers & Operations' },
  { id: '5.5', section: 'math', chapterNum: '5.5', title: 'Scientific Notation', desc: 'Working with very large and small numbers', status: 'not-started', category: 'Numbers & Operations' },
  { id: '5.6', section: 'math', chapterNum: '5.6', title: 'Repeating Patterns', desc: 'Patterns in decimals and powers', status: 'not-started', category: 'Numbers & Operations' },

  // Math Section - Statistics, Probability & Counting (Chapter 6)
  { id: '6.1', section: 'math', chapterNum: '6.1', title: 'Mean, Median, Mode, and Range', desc: 'Basic statistics and weighted averages', status: 'not-started', category: 'Statistics & Probability' },
  { id: '6.2', section: 'math', chapterNum: '6.2', title: 'Statistics', desc: 'Standard deviation, distributions, data analysis', status: 'not-started', category: 'Statistics & Probability' },
  { id: '6.3', section: 'math', chapterNum: '6.3', title: 'Probability', desc: 'Basic probability rules and calculations', status: 'not-started', category: 'Statistics & Probability' },
  { id: '6.4', section: 'math', chapterNum: '6.4', title: 'Permutations, Combinations, and Organized Counting', desc: 'Counting principles and arrangements', status: 'not-started', category: 'Statistics & Probability' },

  // Math Section - Advanced Topics (Chapter 7)
  { id: 'trigonometry', section: 'math', chapterNum: '7.1', title: 'Trigonometry', desc: 'SOH-CAH-TOA, unit circle, trig functions', status: 'not-started', category: 'Advanced Topics' },
  { id: 'complex-numbers', section: 'math', chapterNum: '7.2', title: 'Complex Numbers', desc: 'Operations with imaginary numbers', status: 'not-started', category: 'Advanced Topics' },
  { id: 'matrices', section: 'math', chapterNum: '7.3', title: 'Matrices', desc: 'Matrix operations and determinants', status: 'not-started', category: 'Advanced Topics' },
  { id: 'vectors', section: 'math', chapterNum: '7.4', title: 'Vectors', desc: 'Vector operations and components', status: 'not-started', category: 'Advanced Topics' },
  { id: 'word-problems', section: 'math', chapterNum: '7.5', title: 'Word Problems', desc: 'Strategies for solving word problems', status: 'not-started', category: 'Advanced Topics' },
  { id: 'miscellaneous-topics', section: 'math', chapterNum: '7.6', title: 'Miscellaneous Topics', desc: 'Venn diagrams, logic, patterns, advanced topics', status: 'not-started', category: 'Advanced Topics' },

  // Reading Section - Fundamentals (Chapter 1)
  { id: 'reading-intro', section: 'reading', chapterNum: null, title: 'Reading Section Fundamentals', desc: 'What is on the ACT Reading Test and what you\'ll learn in this course', status: 'not-started', category: 'Introduction' },
  { id: 'core-principles', section: 'reading', chapterNum: '1.1', title: '7 Core Principles for ACT Reading', desc: 'Essential principles to understand the difference between correct and incorrect answers', status: 'not-started', category: 'Fundamentals' },
  { id: 'finding-correct-answer', section: 'reading', chapterNum: '1.2', title: '3 Strategies for Finding the Correct Answer', desc: 'Put your finger on evidence, read like a lawyer, and eliminate incorrect choices', status: 'not-started', category: 'Fundamentals' },
  { id: 'reading-approaches', section: 'reading', chapterNum: '1.3', title: 'How to Approach the Reading Test', desc: 'Finding the right approach for you: 6 different methods to tackle ACT Reading', status: 'not-started', category: 'Fundamentals' },
  { id: 'pacing-time-management', section: 'reading', chapterNum: '1.4', title: 'Pacing and 10 Time Management Skills', desc: 'Master timing and learn essential skills to finish all 4 passages', status: 'not-started', category: 'Fundamentals' },

  // Reading Section - Question Types (Chapter 2)
  { id: 'question-types', section: 'reading', chapterNum: '2.1', title: 'How to Spot and Approach the 7 Most Common Types of Questions', desc: 'Broad passage, clear evidence, inference, purpose, main idea, words in context, and comparing passages', status: 'not-started', category: 'Question Types' },
  { id: 'breaking-down-questions', section: 'reading', chapterNum: '2.2', title: 'Breaking Down Questions', desc: 'How to identify exactly what the ACT is asking you', status: 'not-started', category: 'Question Types' },
  { id: 'answer-choices', section: 'reading', chapterNum: '2.3', title: 'How to Approach the Answer Choices', desc: 'When to read answer choices and how to use them effectively', status: 'not-started', category: 'Question Types' },
  { id: 'correct-vs-incorrect', section: 'reading', chapterNum: '2.4', title: 'Correct vs. Incorrect Answer Choices', desc: '5 common types of incorrect answers and how to effectively find the correct answer', status: 'not-started', category: 'Question Types' },
  { id: 'words-in-context', section: 'reading', chapterNum: '2.5', title: 'Words in Context Questions', desc: 'How to approach vocabulary questions and determine meaning from context', status: 'not-started', category: 'Question Types' },
  { id: 'comparing-passages', section: 'reading', chapterNum: '2.6', title: 'Tips for Comparing Passages Questions', desc: 'Strategies for dual text passages and comparing passage questions', status: 'not-started', category: 'Question Types' },

  // Reading Section - Advanced Strategies (Chapter 3)
  { id: 'working-backwards', section: 'reading', chapterNum: '3.1', title: 'Working Backwards', desc: 'Advanced strategy for going straight to questions without reading the passage first', status: 'not-started', category: 'Advanced Strategies' },
  { id: 'maximizing-score', section: 'reading', chapterNum: '3.2', title: '7 Tips to Maximize Your Reading Score', desc: 'Essential tips including time management, answer patterns, and practice strategies', status: 'not-started', category: 'Advanced Strategies' },
  { id: 'practice-passages', section: 'reading', chapterNum: '3.3', title: 'Practice Passages', desc: '8 full practice passages with detailed explanations to apply your skills', status: 'not-started', category: 'Advanced Strategies' },

  // Science Section - Introduction
  { id: 'science-introduction', section: 'science', chapterNum: null, title: 'Science Section Basics', desc: 'Test format, timing, and question types overview', status: 'not-started', category: 'Introduction' },

  // Science Section - Fundamentals (Chapter 1)
  { id: 'passage-approach', section: 'science', chapterNum: '1.1', title: 'How to Approach the Passages', desc: 'Charts & graphs strategies, conflicting viewpoints approach, and general tips', status: 'not-started', category: 'Fundamentals' },
  { id: 'question-diagnosis', section: 'science', chapterNum: '1.2', title: 'Question Diagnosis', desc: 'Where to look for information in science passages', status: 'not-started', category: 'Fundamentals' },

  // Science Section - Data Interpretation (Chapter 2)
  { id: 'specific-data-point', section: 'science', chapterNum: '2.1', title: 'Specific Data Point Questions', desc: 'Finding exact values from charts, graphs, and tables', status: 'not-started', category: 'Data Interpretation' },
  { id: 'trends', section: 'science', chapterNum: '2.2', title: 'Trends Questions', desc: 'Identifying patterns and trends in charts, graphs, and tables', status: 'not-started', category: 'Data Interpretation' },
  { id: 'approximation', section: 'science', chapterNum: '2.3', title: 'Approximation Questions', desc: 'Estimating values between or outside given data points', status: 'not-started', category: 'Data Interpretation' },
  { id: 'multiple-figures', section: 'science', chapterNum: '2.4', title: 'Multiple Figures Questions', desc: 'Using information from multiple charts, graphs, or tables', status: 'not-started', category: 'Data Interpretation' },
  { id: 'figures-text', section: 'science', chapterNum: '2.5', title: 'Figures + Text Questions', desc: 'Combining information from figures and experimental descriptions', status: 'not-started', category: 'Data Interpretation' },
  { id: 'scatter-plots', section: 'science', chapterNum: '2.6', title: 'Scatter Plots', desc: 'Reading scatter plot graphs and frequency of data collection', status: 'not-started', category: 'Data Interpretation' },
  { id: 'inverse-trends-multiple-axes', section: 'science', chapterNum: '2.7', title: 'Inverse Trends and Graphs with Multiple Axes', desc: 'Complex graphs with multiple y-axes and reverse trend analysis', status: 'not-started', category: 'Data Interpretation' },

  // Science Section - Advanced Question Types (Chapter 3)
  { id: 'two-part-answers', section: 'science', chapterNum: '3.1', title: '2-Part Answers', desc: 'Questions with claims and supporting evidence in answer choices', status: 'not-started', category: 'Advanced Question Types' },
  { id: 'cannot-be-determined', section: 'science', chapterNum: '3.2', title: 'Cannot Be Determined', desc: 'Recognizing when information is not provided in the passage', status: 'not-started', category: 'Advanced Question Types' },
  { id: 'equations-as-answers', section: 'science', chapterNum: '3.3', title: 'Equations as Answers', desc: 'Identifying which equation correctly models experimental data', status: 'not-started', category: 'Advanced Question Types' },
  { id: 'mixing', section: 'science', chapterNum: '3.4', title: 'Mixing', desc: 'Predicting results when combining solutions or substances', status: 'not-started', category: 'Advanced Question Types' },
  { id: 'math-on-science', section: 'science', chapterNum: '3.5', title: 'Math on the Science Test', desc: 'Basic calculations and estimation without a calculator', status: 'not-started', category: 'Advanced Question Types' },

  // Science Section - Background Knowledge (Chapter 4)
  { id: 'water-knowledge', section: 'science', chapterNum: '4.1', title: 'Water Knowledge', desc: 'Boiling point, freezing point, evaporation, and condensation', status: 'not-started', category: 'Background Knowledge' },
  { id: 'experimental-setup', section: 'science', chapterNum: '4.2', title: 'Experimental Setup', desc: 'Understanding why certain experimental procedures are used', status: 'not-started', category: 'Background Knowledge' },
  { id: 'other-outside-knowledge', section: 'science', chapterNum: '4.3', title: 'Other Outside Knowledge', desc: 'Genetics, biology, chemistry, and physics concepts for the ACT', status: 'not-started', category: 'Background Knowledge' },
  { id: 'conflicting-viewpoints-practice', section: 'science', chapterNum: '4.4', title: 'Conflicting Viewpoints Practice Passage', desc: 'Practice with the unique conflicting viewpoints passage type', status: 'not-started', category: 'Background Knowledge' },

  // Practice Tests (separate category)
  { id: 'sentence-structure-practice', section: 'english', chapterNum: null, title: 'Practice: Building Complete Sentences', desc: 'Authentic ACT questions testing sentence structure concepts', status: 'not-started', category: 'Practice Test' },
  { id: 'commas-practice', section: 'english', chapterNum: null, title: 'Practice: Essential Comma Rules', desc: 'ACT-style questions on comma usage and punctuation', status: 'not-started', category: 'Practice Test' },
  { id: 'punctuation-practice', section: 'english', chapterNum: null, title: 'Practice: Advanced Punctuation', desc: 'Semicolons, colons, dashes and apostrophes on the ACT', status: 'not-started', category: 'Practice Test' },
  { id: 'backsolving-practice', section: 'math', chapterNum: null, title: 'Practice: Working Backwards Strategy', desc: 'ACT math problems perfect for backsolving technique', status: 'not-started', category: 'Practice Test' },
  { id: 'substitution-practice', section: 'math', chapterNum: null, title: 'Practice: Number Substitution Technique', desc: 'Variable problems using substitution method', status: 'not-started', category: 'Practice Test' },
  { id: 'geometry-angles-practice', section: 'math', chapterNum: null, title: 'Practice: Understanding Angles & Lines', desc: 'Parallel lines, intersecting lines, and polygon angles', status: 'not-started', category: 'Practice Test' },
  { id: 'geometry-shapes-practice', section: 'math', chapterNum: null, title: 'Practice: Areas, Volumes & Triangles', desc: 'Area, volume, and triangle problems from real ACTs', status: 'not-started', category: 'Practice Test' }
];
