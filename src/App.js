import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      lineHeight: 1.6,
      overflowX: 'hidden'
    }
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '2rem 2rem 0',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  logo: {
    fontSize: '2.5rem',
    fontWeight: 300,
    letterSpacing: '-0.02em',
    color: '#1a1a1a',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
    fontWeight: 300
  },
  navContainer: {
    padding: '0 2rem',
    marginBottom: '3rem'
  },
  navTabs: {
    display: 'flex',
    borderBottom: '1px solid #e5e5e5',
    justifyContent: 'center',
    position: 'relative'
  },
  tab: {
    background: 'none',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    fontWeight: 400,
    '&:hover': {
      color: '#1a1a1a'
    },
    '&.active': {
      color: '#1a1a1a',
      fontWeight: 500
    }
  },
  tabIndicator: {
    position: 'absolute',
    bottom: '-1px',
    height: '2px',
    backgroundColor: '#1a1a1a',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '1px'
  },
  content: {
    flex: 1,
    padding: '0 2rem 2rem'
  },
  tabContent: {
    display: 'none',
    animation: '$fadeIn 0.4s ease-in-out',
    '&.active': {
      display: 'block'
    }
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(10px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  contentSection: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 300,
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#1a1a1a'
  },
  testGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  card: {
    background: '#ffffff',
    border: '1px solid #f0f0f0',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '1.5rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    '&:hover': {
      borderColor: '#e0e0e0',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      transform: 'translateY(-1px)'
    },
    '& h3': {
      fontSize: '1.3rem',
      fontWeight: 500,
      marginBottom: '0.75rem',
      color: '#1a1a1a'
    },
    '& p': {
      color: '#666',
      marginBottom: '1rem',
      fontSize: '1rem'
    }
  },
  btn: {
    background: '#1a1a1a',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    display: 'inline-block',
    '&:hover': {
      background: '#333',
      transform: 'translateY(-1px)'
    }
  },
  sectionFilters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  sectionFilter: {
    background: 'transparent',
    border: '1px solid #e0e0e0',
    color: '#666',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#d0d0d0',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#1a1a1a',
      color: 'white',
      borderColor: '#1a1a1a'
    }
  },
  lessonsGrid: {
    display: 'grid',
    gap: '1rem',
    marginTop: '2rem'
  },
  lessonItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    border: '1px solid #f0f0f0',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    background: '#ffffff',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#e0e0e0',
      background: '#fafafa'
    },
    '&.hidden': {
      display: 'none'
    }
  },
  lessonInfo: {
    '& h4': {
      fontSize: '1.1rem',
      fontWeight: 500,
      marginBottom: '0.25rem',
      color: '#1a1a1a'
    },
    '& p': {
      color: '#666',
      fontSize: '0.9rem'
    }
  },
  lessonStatus: {
    fontSize: '0.85rem',
    color: '#666',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    background: '#f5f5f5',
    '&.completed': {
      background: '#e8f5e8',
      color: '#2d5a2d'
    },
    '&.in-progress': {
      background: '#fff3cd',
      color: '#856404'
    }
  },
  sectionHeader: {
    gridColumn: '1 / -1',
    margin: '2rem 0 1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #f0f0f0',
    '&.hidden': {
      display: 'none'
    },
    '& h3': {
      fontSize: '1.2rem',
      fontWeight: 500,
      color: '#1a1a1a',
      margin: 0
    }
  },
  // Lesson Modal Styles
  lessonModal: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    padding: '2rem',
    overflowY: 'auto',
    '&.active': {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center'
    }
  },
  lessonContent: {
    background: 'white',
    borderRadius: '8px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    margin: '2rem auto'
  },
  lessonHeader: {
    padding: '2rem 2rem 1rem',
    borderBottom: '1px solid #e0e0e0',
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 10
  },
  lessonTitle: {
    fontSize: '1.5rem',
    fontWeight: 500,
    marginBottom: '0.5rem'
  },
  lessonClose: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#666',
    padding: '0.5rem',
    '&:hover': {
      color: '#1a1a1a'
    }
  },
  lessonBody: {
    padding: '2rem',
    lineHeight: 1.7,
    '& h3': {
      margin: '2rem 0 1rem',
      color: '#1a1a1a',
      fontSize: '1.3rem'
    },
    '& p': {
      marginBottom: '1rem'
    },
    '& ul, & ol': {
      margin: '1rem 0 1rem 2rem'
    },
    '& li': {
      marginBottom: '0.5rem'
    },
    // Enhanced lesson content styling
    '& .lesson-intro': {
      fontSize: '1.1rem',
      color: '#666',
      fontStyle: 'italic',
      marginBottom: '2rem',
      padding: '1rem',
      background: '#f8f9fa',
      borderLeft: '4px solid #1a1a1a',
      borderRadius: '0 4px 4px 0'
    },
    '& .concept-box': {
      background: '#f8f9fa',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '1rem',
        fontSize: '1.1rem'
      }
    },
    '& .tip-box': {
      background: '#fff3cd',
      border: '1px solid #ffc107',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      '& h4': {
        color: '#856404',
        marginBottom: '1rem',
        fontSize: '1.1rem'
      }
    },
    '& .example-box': {
      background: '#e8f5e8',
      border: '1px solid #28a745',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '1.5rem 0'
    },
    '& .rules-box': {
      background: '#fff',
      border: '2px solid #1a1a1a',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '1rem',
        fontSize: '1.2rem'
      }
    }
  },
  lessonFooter: {
    padding: '1rem 2rem 2rem',
    textAlign: 'center',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

// Complete lesson structure from original HTML
const lessonStructure = [
  { id: 'getting-started', section: 'all', title: 'Getting Started with the ACT', desc: 'Test format, timing, and scoring overview', status: 'completed' },

  // English Section
  { id: 'sentence-structure', section: 'english', title: 'Chapter 1: Sentence Structure', desc: 'Independent clauses, dependent clauses, compound sentences, and comma splices', status: 'completed' },
  { id: 'commas', section: 'english', title: 'Chapter 2: Commas - 4 Types', desc: 'Unnecessary information, names rule, listing commas, and adjective lists', status: 'completed' },
  { id: 'punctuation', section: 'english', title: 'Chapter 3: Other Punctuation', desc: 'Semicolons, colons, dashes, apostrophes, and quotation marks', status: 'in-progress' },
  { id: 'verbs', section: 'english', title: 'Chapter 4: Verbs', desc: 'Subject-verb agreement, verb tense, and irregular verbs', status: 'not-started' },
  { id: 'pronouns', section: 'english', title: 'Chapter 5: Pronouns', desc: 'Pronoun case, who vs. whom, pronoun agreement, and ambiguous pronouns', status: 'not-started' },
  { id: 'modifiers', section: 'english', title: 'Chapter 6: Misplaced Modifiers', desc: 'Identifying and correcting misplaced modifiers in sentences', status: 'not-started' },
  { id: 'parallel-structure', section: 'english', title: 'Chapter 7: Parallel Structure', desc: 'Parallel structure in lists and comparisons', status: 'not-started' },
  { id: 'misc-topics', section: 'english', title: 'Chapter 8: Miscellaneous Topics', desc: 'Commonly confused words, active vs. passive voice, and prepositional idioms', status: 'not-started' },
  { id: 'grammar-review', section: 'english', title: 'Chapter 9: Grammar Review', desc: 'Comprehensive review of all grammar concepts', status: 'not-started' },
  { id: 'redundancy', section: 'english', title: 'Chapter 10: Redundancy & Wordiness', desc: 'Identifying and eliminating redundant and wordy expressions', status: 'not-started' },
  { id: 'word-choice', section: 'english', title: 'Chapter 11: Word Choice', desc: 'Selecting the clearest and most precise words in context', status: 'not-started' },
  { id: 'transitions', section: 'english', title: 'Chapter 12: Transitions', desc: 'Choosing logical transitions between sentences and paragraphs', status: 'not-started' },
  { id: 'which-choice', section: 'english', title: 'Chapter 13: Which Choice Questions', desc: 'Answering specific "which choice" questions about content', status: 'not-started' },
  { id: 'adding-deleting', section: 'english', title: 'Chapter 14: Adding or Deleting Information', desc: 'Determining when to add or delete information from passages', status: 'not-started' },
  { id: 'logical-placement', section: 'english', title: 'Chapter 15: Logical Placement', desc: 'Placing sentences in the most logical order within paragraphs', status: 'not-started' },

  // Math Section - Most Common Topics
  { id: 'backsolving', section: 'math', title: 'Chapter 1: Backsolving', desc: 'Powerful test-taking trick for working backwards from answer choices', status: 'not-started' },
  { id: 'substitution', section: 'math', title: 'Chapter 2: Substitution', desc: 'Test-taking strategy for plugging in values', status: 'not-started' },
  { id: 'geometry-angles', section: 'math', title: 'Chapter 3: Geometry Part 1 - Angles', desc: 'Intersecting lines, parallel lines, interior angles', status: 'not-started' },
  { id: 'geometry-shapes', section: 'math', title: 'Chapter 4: Geometry Part 2 - Shapes', desc: 'Area, volume, right triangles, special triangles', status: 'not-started' },
  { id: 'lines', section: 'math', title: 'Chapter 5: Lines', desc: 'Slope, equations of lines, midpoint, distance formulas', status: 'not-started' },
  { id: 'fractions', section: 'math', title: 'Chapter 6: Fractions', desc: 'Operations with fractions and calculator techniques', status: 'not-started' },
  { id: 'algebra-skills', section: 'math', title: 'Chapter 7: Algebra Skills', desc: 'PEMDAS, negative numbers, combining terms', status: 'not-started' },
  { id: 'number-theory', section: 'math', title: 'Chapter 8: Number Theory', desc: 'Types of numbers, GCD, LCM, solution types', status: 'not-started' },
  { id: 'percentages', section: 'math', title: 'Chapter 9: Percentages', desc: 'Percentage calculations, increase/decrease', status: 'not-started' },
  { id: 'ratios-proportions', section: 'math', title: 'Chapter 10: Ratios and Proportions', desc: 'Ratio problems, proportions, direct/indirect variation', status: 'not-started' },
  { id: 'functions', section: 'math', title: 'Chapter 11: Functions', desc: 'Function notation, composition, domain, range', status: 'not-started' },
  { id: 'statistics-basics', section: 'math', title: 'Chapter 12: Mean, Median, Mode, and Range', desc: 'Basic statistics and weighted averages', status: 'not-started' },
  { id: 'exponents-roots', section: 'math', title: 'Chapter 13: Exponents and Roots', desc: 'Exponent rules and simplifying radicals', status: 'not-started' },

  // Math Section - Common Topics
  { id: 'logarithms', section: 'math', title: 'Chapter 14: Logarithms', desc: 'Logarithm basics and change of base rule', status: 'not-started' },
  { id: 'systems-equations', section: 'math', title: 'Chapter 15: Systems of Equations', desc: 'Elimination, substitution, word problems', status: 'not-started' },
  { id: 'quadratics', section: 'math', title: 'Chapter 16: Quadratics', desc: 'Factoring, quadratic formula, vertex form', status: 'not-started' },
  { id: 'trigonometry', section: 'math', title: 'Chapter 17: Trigonometry', desc: 'SOH-CAH-TOA, unit circle, trig functions', status: 'not-started' },

  // Math Section - Sometimes Tested
  { id: 'absolute-value', section: 'math', title: 'Chapter 18: Absolute Value', desc: 'Absolute value equations and inequalities', status: 'not-started' },
  { id: 'matrices', section: 'math', title: 'Chapter 19: Matrices', desc: 'Matrix operations and determinants', status: 'not-started' },
  { id: 'repeating-patterns', section: 'math', title: 'Chapter 20: Repeating Patterns', desc: 'Patterns in decimals and powers', status: 'not-started' },
  { id: 'circles-ellipses', section: 'math', title: 'Chapter 21: Circles, Ellipses, and Hyperbolas', desc: 'Conic sections and their equations', status: 'not-started' },
  { id: 'probability', section: 'math', title: 'Chapter 22: Probability', desc: 'Basic probability rules and calculations', status: 'not-started' },
  { id: 'permutations-combinations', section: 'math', title: 'Chapter 23: Permutations, Combinations, and Organized Counting', desc: 'Counting principles and arrangements', status: 'not-started' },
  { id: 'sequences', section: 'math', title: 'Chapter 24: Sequences', desc: 'Arithmetic and geometric sequences', status: 'not-started' },
  { id: 'complex-numbers', section: 'math', title: 'Chapter 25: Complex Numbers', desc: 'Operations with imaginary numbers', status: 'not-started' },
  { id: 'word-problems', section: 'math', title: 'Chapter 26: Word Problems', desc: 'Strategies for solving word problems', status: 'not-started' },
  { id: 'inequalities', section: 'math', title: 'Chapter 27: Inequalities', desc: 'Solving and graphing inequalities', status: 'not-started' },
  { id: 'exponential-growth', section: 'math', title: 'Chapter 28: Exponential Growth and Decay', desc: 'Exponential functions and applications', status: 'not-started' },

  // Math Section - Rarely Tested
  { id: 'unit-conversion', section: 'math', title: 'Chapter 29: Unit Conversion', desc: 'Converting units and dimensional analysis', status: 'not-started' },
  { id: 'scientific-notation', section: 'math', title: 'Chapter 30: Scientific Notation', desc: 'Working with very large and small numbers', status: 'not-started' },
  { id: 'arcs-sectors', section: 'math', title: 'Chapter 31: Arcs and Sectors', desc: 'Circle arc lengths and sector areas', status: 'not-started' },
  { id: 'vectors', section: 'math', title: 'Chapter 32: Vectors', desc: 'Vector operations and components', status: 'not-started' },
  { id: 'transforming-functions', section: 'math', title: 'Chapter 33: Shifting and Transforming Functions', desc: 'Function transformations and translations', status: 'not-started' },
  { id: 'statistics-advanced', section: 'math', title: 'Chapter 34: Statistics', desc: 'Standard deviation, distributions, data analysis', status: 'not-started' },
  { id: 'miscellaneous-topics', section: 'math', title: 'Chapter 35: Miscellaneous Topics', desc: 'Venn diagrams, logic, patterns, advanced topics', status: 'not-started' },

  // Reading Section
  { id: 'reading-intro', section: 'reading', title: 'Introduction to the Reading Test', desc: 'What is on the ACT Reading Test and what you\'ll learn in this course', status: 'not-started' },
  { id: 'core-principles', section: 'reading', title: 'Chapter 1: 7 Core Principles for ACT Reading', desc: 'Essential principles to understand the difference between correct and incorrect answers', status: 'not-started' },
  { id: 'finding-correct-answer', section: 'reading', title: 'Chapter 2: 3 Strategies for Finding the Correct Answer', desc: 'Put your finger on evidence, read like a lawyer, and eliminate incorrect choices', status: 'not-started' },
  { id: 'reading-approaches', section: 'reading', title: 'Chapter 3: How to Approach the Reading Test', desc: 'Finding the right approach for you: 6 different methods to tackle ACT Reading', status: 'not-started' },
  { id: 'pacing-time-management', section: 'reading', title: 'Chapter 4: Pacing and 10 Time Management Skills', desc: 'Master timing and learn essential skills to finish all 4 passages', status: 'not-started' },
  { id: 'question-types', section: 'reading', title: 'Chapter 5: How to Spot and Approach the 7 Most Common Types of Questions', desc: 'Broad passage, clear evidence, inference, purpose, main idea, words in context, and comparing passages', status: 'not-started' },
  { id: 'breaking-down-questions', section: 'reading', title: 'Chapter 6: Breaking Down Questions', desc: 'How to identify exactly what the ACT is asking you', status: 'not-started' },
  { id: 'answer-choices', section: 'reading', title: 'Chapter 7: How to Approach the Answer Choices', desc: 'When to read answer choices and how to use them effectively', status: 'not-started' },
  { id: 'correct-vs-incorrect', section: 'reading', title: 'Chapter 8: Correct vs. Incorrect Answer Choices', desc: '5 common types of incorrect answers and how to effectively find the correct answer', status: 'not-started' },
  { id: 'words-in-context', section: 'reading', title: 'Chapter 9: Words in Context Questions', desc: 'How to approach vocabulary questions and determine meaning from context', status: 'not-started' },
  { id: 'comparing-passages', section: 'reading', title: 'Chapter 10: Tips for Comparing Passages Questions', desc: 'Strategies for dual text passages and comparing passage questions', status: 'not-started' },
  { id: 'working-backwards', section: 'reading', title: 'Chapter 11: Working Backwards', desc: 'Advanced strategy for going straight to questions without reading the passage first', status: 'not-started' },
  { id: 'maximizing-score', section: 'reading', title: 'Chapter 12: 7 Tips to Maximize Your Reading Score', desc: 'Essential tips including time management, answer patterns, and practice strategies', status: 'not-started' },
  { id: 'practice-passages', section: 'reading', title: 'Chapter 13: Practice Passages', desc: '8 full practice passages with detailed explanations to apply your skills', status: 'not-started' },

  // Science Section
  { id: 'science-introduction', section: 'science', title: 'Introduction to Science Test', desc: 'Test format, timing, and question types overview', status: 'not-started' },
  { id: 'passage-approach', section: 'science', title: 'Chapter 1: How to Approach the Passages', desc: 'Charts & graphs strategies, conflicting viewpoints approach, and general tips', status: 'not-started' },
  { id: 'question-diagnosis', section: 'science', title: 'Question Diagnosis', desc: 'Where to look for information in science passages', status: 'not-started' },
  { id: 'specific-data-point', section: 'science', title: 'Specific Data Point Questions', desc: 'Finding exact values from charts, graphs, and tables', status: 'not-started' },
  { id: 'trends', section: 'science', title: 'Trends Questions', desc: 'Identifying patterns and trends in charts, graphs, and tables', status: 'not-started' },
  { id: 'approximation', section: 'science', title: 'Approximation Questions', desc: 'Estimating values between or outside given data points', status: 'not-started' },
  { id: 'multiple-figures', section: 'science', title: 'Multiple Figures Questions', desc: 'Using information from multiple charts, graphs, or tables', status: 'not-started' },
  { id: 'figures-text', section: 'science', title: 'Figures + Text Questions', desc: 'Combining information from figures and experimental descriptions', status: 'not-started' },
  { id: 'two-part-answers', section: 'science', title: '2-Part Answers', desc: 'Questions with claims and supporting evidence in answer choices', status: 'not-started' },
  { id: 'cannot-be-determined', section: 'science', title: 'Cannot Be Determined', desc: 'Recognizing when information is not provided in the passage', status: 'not-started' },
  { id: 'equations-as-answers', section: 'science', title: 'Equations as Answers', desc: 'Identifying which equation correctly models experimental data', status: 'not-started' },
  { id: 'mixing', section: 'science', title: 'Mixing', desc: 'Predicting results when combining solutions or substances', status: 'not-started' },
  { id: 'scatter-plots', section: 'science', title: 'Scatter Plots', desc: 'Reading scatter plot graphs and frequency of data collection', status: 'not-started' },
  { id: 'inverse-trends-multiple-axes', section: 'science', title: 'Inverse Trends and Graphs with Multiple Axes', desc: 'Complex graphs with multiple y-axes and reverse trend analysis', status: 'not-started' },
  { id: 'math-on-science', section: 'science', title: 'Math on the Science Test', desc: 'Basic calculations and estimation without a calculator', status: 'not-started' },
  { id: 'water-knowledge', section: 'science', title: 'Water Knowledge', desc: 'Boiling point, freezing point, evaporation, and condensation', status: 'not-started' },
  { id: 'experimental-setup', section: 'science', title: 'Experimental Setup', desc: 'Understanding why certain experimental procedures are used', status: 'not-started' },
  { id: 'other-outside-knowledge', section: 'science', title: 'Other Outside Knowledge', desc: 'Genetics, biology, chemistry, and physics concepts for the ACT', status: 'not-started' },
  { id: 'conflicting-viewpoints-practice', section: 'science', title: 'Conflicting Viewpoints Practice Passage', desc: 'Practice with the unique conflicting viewpoints passage type', status: 'not-started' }
];

function App() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('tests');
  const [activeSection, setActiveSection] = useState('all');
  const [lessonContent, setLessonContent] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);

  useEffect(() => {
    // Load lesson content from script files
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Load all lesson scripts
    Promise.all([
      loadScript('/english-lessons.js'),
      loadScript('/math-lessons.js'),
      loadScript('/reading-lessons.js'),
      loadScript('/science-lessons.js')
    ]).then(() => {
      // Combine all lesson content from different files
      const combinedContent = {
        ...window.englishLessons,
        ...window.mathLessons,
        ...window.readingLessons,
        ...window.scienceLessons
      };
      setLessonContent(combinedContent);
    }).catch(err => {
      console.error('Error loading lesson scripts:', err);
    });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSectionFilter = (section) => {
    setActiveSection(section);
  };

  const openLesson = (lessonId) => {
    setCurrentLesson(lessonId);
    setLessonModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLessonModal = () => {
    setLessonModalOpen(false);
    setCurrentLesson(null);
    document.body.style.overflow = '';
  };

  const TestsContent = () => (
    <div className={`${classes.tabContent} ${activeTab === 'tests' ? 'active' : ''}`}>
      <div className={classes.contentSection}>
        <h2 className={classes.sectionTitle}>Practice Tests</h2>
        <div className={classes.testGrid}>
          <div className={classes.card}>
            <h3>Diagnostic Test</h3>
            <p>Take this first to understand your current level and identify areas for improvement.</p>
            <a href="/diagnostic-test.html" className={classes.btn}>Start Diagnostic</a>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 1</h3>
            <p>Complete 4-section ACT practice test with detailed explanations and scoring.</p>
            <button className={classes.btn}>Start Test</button>
          </div>
          <div className={classes.card}>
            <h3>English Section Practice</h3>
            <p>Focus on grammar, punctuation, and rhetorical skills with targeted questions.</p>
            <button className={classes.btn}>Start Practice</button>
          </div>
          <div className={classes.card}>
            <h3>Math Section Practice</h3>
            <p>Algebra, geometry, and trigonometry problems with step-by-step solutions.</p>
            <button className={classes.btn}>Start Practice</button>
          </div>
          <div className={classes.card}>
            <h3>Reading Section Practice</h3>
            <p>Improve comprehension and analysis skills with timed reading passages.</p>
            <button className={classes.btn}>Start Practice</button>
          </div>
          <div className={classes.card}>
            <h3>Science Section Practice</h3>
            <p>Data interpretation and scientific reasoning practice questions.</p>
            <button className={classes.btn}>Start Practice</button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 2</h3>
            <p>Additional complete practice test to track your improvement over time.</p>
            <button className={classes.btn}>Start Test</button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 3</h3>
            <p>Continue building test-taking stamina and refining your strategies.</p>
            <button className={classes.btn}>Start Test</button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 4</h3>
            <p>Final practice test to ensure you're ready for test day.</p>
            <button className={classes.btn}>Start Test</button>
          </div>
        </div>
      </div>
    </div>
  );

  const LessonsContent = () => {
    const filteredLessons = activeSection === 'all' ? lessonStructure : lessonStructure.filter(lesson => lesson.section === activeSection);

    // Group lessons by section for headers
    const groupedLessons = [];
    let currentSection = '';

    filteredLessons.forEach(lesson => {
      if (lesson.section !== 'all' && lesson.section !== currentSection) {
        currentSection = lesson.section;
        const sectionTitle =
          lesson.section === 'english' ? 'English Section' :
          lesson.section === 'math' ? 'Math Section' :
          lesson.section === 'reading' ? 'Reading Section' :
          lesson.section === 'science' ? 'Science Section' : '';

        if (sectionTitle && activeSection === 'all') {
          groupedLessons.push({ type: 'header', title: sectionTitle, section: lesson.section });
        }
      }
      groupedLessons.push({ type: 'lesson', ...lesson });
    });

    return (
      <div className={`${classes.tabContent} ${activeTab === 'lessons' ? 'active' : ''}`}>
        <div className={classes.contentSection}>
          <h2 className={classes.sectionTitle}>Study Lessons</h2>

          <div className={classes.sectionFilters}>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'all' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('all')}
            >
              All Sections
            </button>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'english' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('english')}
            >
              English
            </button>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'math' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('math')}
            >
              Math
            </button>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'reading' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('reading')}
            >
              Reading
            </button>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'science' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('science')}
            >
              Science
            </button>
          </div>

          <div className={classes.lessonsGrid}>
            {groupedLessons.map((item, index) => {
              if (item.type === 'header') {
                return (
                  <div key={`header-${index}`} className={classes.sectionHeader}>
                    <h3>{item.title}</h3>
                  </div>
                );
              } else {
                return (
                  <div key={item.id} className={classes.lessonItem} onClick={() => openLesson(item.id)}>
                    <div className={classes.lessonInfo}>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                    <span className={`${classes.lessonStatus} ${item.status === 'completed' ? 'completed' : item.status === 'in-progress' ? 'in-progress' : ''}`}>
                      {item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                    </span>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  };

  const LessonModal = () => {
    const lesson = lessonContent[currentLesson];

    return (
      <div className={`${classes.lessonModal} ${lessonModalOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && closeLessonModal()}>
        <div className={classes.lessonContent}>
          <div className={classes.lessonHeader}>
            <h2 className={classes.lessonTitle}>
              {lesson ? lesson.title : 'Lesson Coming Soon'}
            </h2>
            <button className={classes.lessonClose} onClick={closeLessonModal}>
              &times;
            </button>
          </div>
          <div className={classes.lessonBody}>
            {lesson ? (
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            ) : (
              <p>This lesson content is being prepared. Check back soon!</p>
            )}
          </div>
          <div className={classes.lessonFooter}>
            <button className={classes.btn} onClick={closeLessonModal}>
              ← Back to Lessons
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.logo}>ACT Prep</h1>
        <p className={classes.subtitle}>Master the ACT with focused practice and lessons</p>
      </header>

      <div className={classes.navContainer}>
        <div className={classes.navTabs}>
          <button
            className={`${classes.tab} ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => handleTabClick('tests')}
          >
            Tests
          </button>
          <button
            className={`${classes.tab} ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => handleTabClick('lessons')}
          >
            Lessons
          </button>
        </div>
      </div>

      <div className={classes.content}>
        <TestsContent />
        <LessonsContent />
      </div>

      <LessonModal />
    </div>
  );
}

export default App;