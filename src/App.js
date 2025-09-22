import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Button from './components/Button';
import StatusIcon from './components/StatusIcon';
import ProgressiveLessonRenderer from './components/ProgressiveLessonRenderer';
import AIChat from './components/AIChat';
import { gradients, spacing, borderRadius, buttonStyles } from './utils/sharedStyles';
import { storage, scriptLoader, statusUtils, lessonUtils, domUtils } from './utils/helpers';
import { interactiveLessons } from './data/interactiveLessons';
import { allLessons } from './data/allLessons';

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
    flexDirection: 'column',
    background: '#fafbfc'
  },
  header: {
    background: '#f8f9fa',
    borderBottom: '2px solid #e9ecef',
    padding: '0.75rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '1rem'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#1a1a1a',
    textDecoration: 'none',
    margin: 0,
    '&:hover': {
      color: '#333'
    }
  },
  subtitle: {
    color: '#666',
    fontSize: '0.85rem',
    fontWeight: 400,
    margin: 0,
    flex: 1,
    textAlign: 'center'
  },
  navContainer: {
    padding: '0',
    marginBottom: '1.5rem',
    background: 'transparent'
  },
  navTabs: {
    display: 'flex',
    borderBottom: '1px solid #e5e5e5',
    justifyContent: 'center',
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
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
    transition: 'all 0.3s ease',
    borderRadius: '1px'
  },
  content: {
    flex: 1,
    padding: '0 2rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  tabContent: {
    display: 'none',
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
    margin: '0'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#1a1a1a',
    marginBottom: '1rem',
    textAlign: 'left'
  },
  testGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '0'
  },
  card: {
    background: gradients.card,
    border: '1px solid #dee2e6',
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    marginBottom: spacing.xl,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    '&:hover': {
      background: gradients.cardHover,
      borderColor: '#adb5bd',
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
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
    ...buttonStyles.base,
    ...buttonStyles.sizes.md,
    background: gradients.neutral,
    color: '#666',
    '&:hover': {
      background: gradients.neutralHover,
      borderColor: '#adb5bd',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#333'
    }
  },
  sectionFilters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  sectionFilter: {
    background: gradients.neutral,
    border: '1px solid #dee2e6',
    color: '#666',
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.pill,
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    '&:hover': {
      background: gradients.neutralHover,
      borderColor: '#adb5bd',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#333'
    },
    '&.active': {
      background: '#1a1a1a',
      color: 'white',
      borderColor: '#1a1a1a',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    }
  },
  lessonsGrid: {
    display: 'grid',
    gap: '0.75rem',
    marginTop: '0'
  },
  lessonItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    cursor: 'pointer',
    marginBottom: '0.5rem',
    position: 'relative',
    borderLeft: '4px solid #e5e7eb',
    '&:hover': {
      background: '#f8f9fa',
      borderColor: '#d1d5db',
      transform: 'translateX(4px)'
    },
    '&.completed': {
      background: '#f0fdf4',
      borderLeftColor: '#16a34a',
      opacity: 0.8,
      '& h4': {
        textDecoration: 'line-through',
        color: '#666'
      },
      '& p': {
        color: '#999'
      }
    },
    '&.in-progress': {
      borderLeftColor: '#ffc107',
      background: '#fffbf0'
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
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      color: '#065f46',
      border: '1px solid #10b981'
    },
    '&.in-progress': {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      color: '#92400e',
      border: '1px solid #f59e0b'
    }
  },
  sectionHeader: {
    gridColumn: '1 / -1',
    margin: '1rem 0 0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #e5e5e5',
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
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 1000,
    overflow: 'auto',
    '&.active': {
      display: 'flex'
    }
  },
  lessonContent: {
    background: 'white',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    lineHeight: '1.6',
    fontSize: '15px',
    color: '#2d3748'
  },
  lessonSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderRight: '1px solid #e2e8f0',
    padding: '2rem 1.5rem',
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  lessonMain: {
    flex: 1,
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0'
  },
  lessonHeader: {
    padding: '2rem 3rem 1.5rem',
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    textAlign: 'left'
  },
  lessonTitle: {
    fontSize: '2.2rem',
    fontWeight: 300,
    color: '#1a1a1a',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.01em'
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
    padding: '0 3rem 6rem',
    lineHeight: 1.65,
    fontSize: '15px',
    maxWidth: '700px',
    '& h1, & h2, & h3, & h4': {
      color: '#1a202c',
      fontWeight: '600',
      marginTop: '2rem',
      marginBottom: '0.75rem',
      lineHeight: '1.3'
    },
    '& h1': {
      fontSize: '1.75rem',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '0.5rem'
    },
    '& h2': {
      fontSize: '1.5rem',
      color: '#2d3748'
    },
    '& h3': {
      fontSize: '1.25rem',
      color: '#4a5568'
    },
    '& p': {
      marginBottom: '1rem',
      lineHeight: '1.65'
    },
    '& ul, & ol': {
      margin: '1rem 0',
      paddingLeft: '1.5rem'
    },
    '& li': {
      marginBottom: '0.5rem',
      lineHeight: '1.6'
    },
    '& blockquote': {
      borderLeft: '3px solid #cbd5e0',
      paddingLeft: '1rem',
      margin: '1.25rem 0',
      fontStyle: 'italic',
      color: '#4a5568',
      background: '#f7fafc',
      padding: '0.75rem 1rem',
      borderRadius: '0 6px 6px 0'
    },
    '& code': {
      backgroundColor: '#edf2f7',
      padding: '2px 4px',
      borderRadius: '3px',
      fontSize: '0.9em',
      fontFamily: 'Monaco, Consolas, monospace'
    },
    '& .lesson-intro': {
      fontSize: '1rem',
      color: '#718096',
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
  floatingControls: {
    position: 'fixed',
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    minWidth: '160px'
  },
  sidebarSection: {
    '& h4': {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  },
  keyTerms: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '& .term': {
      padding: '0.5rem 0.75rem',
      background: 'white',
      borderRadius: '6px',
      fontSize: '0.85rem',
      color: '#2d3748',
      border: '1px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        background: '#f7fafc',
        borderColor: '#cbd5e0'
      }
    }
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
    '& .fill': {
      height: '100%',
      background: 'linear-gradient(90deg, #48bb78, #38a169)',
      borderRadius: '3px',
      transition: 'width 0.3s ease'
    }
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
  { id: 'introduction-to-act-math', section: 'math', title: 'Introduction to ACT Math', desc: 'Test format, timing, strategies, and essential tips for success', status: 'not-started' },
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
  const [lessonProgress, setLessonProgress] = useState(() => {
    return storage.get('actPrepProgress', {});
  });

  useEffect(() => {
    const sources = [
      '/english-lessons.js',
      '/math-lessons.js',
      '/reading-lessons.js',
      '/science-lessons.js'
    ];

    // Load all lesson scripts using utility
    Promise.all(sources.map(src => scriptLoader.load(src)))
      .then(() => {
        // Combine all lesson content from different files
        const combinedContent = {
          ...window.englishLessons,
          ...window.mathLessons,
          ...window.readingLessons,
          ...window.scienceLessons
        };
        setLessonContent(combinedContent);
      })
      .catch(err => {
        console.error('Error loading lesson scripts:', err);
        setLessonContent({});
      });

    // Cleanup function
    return () => {
      scriptLoader.cleanup(sources);
    };
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
    domUtils.preventBodyScroll();
  };

  const updateLessonProgress = (lessonId, status) => {
    const newProgress = { ...lessonProgress, [lessonId]: status };
    setLessonProgress(newProgress);
    storage.set('actPrepProgress', newProgress);
  };


  const getLessonStatus = (lessonId) => {
    return lessonProgress[lessonId] || 'not-started';
  };

  const closeLessonModal = () => {
    setLessonModalOpen(false);
    setCurrentLesson(null);
    domUtils.restoreBodyScroll();
  };

  const TestsContent = () => (
    <div className={`${classes.tabContent} ${activeTab === 'tests' ? 'active' : ''}`}>
      <div className={classes.contentSection}>
        <h2 className={classes.sectionTitle}>Practice Tests</h2>
        <div className={classes.testGrid}>
          <div className={classes.card}>
            <h3>Diagnostic Test</h3>
            <p>Take this first to understand your current level and identify areas for improvement.</p>
            <Button href="/diagnostic-test.html">Start Diagnostic</Button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 1</h3>
            <p>Complete 4-section ACT practice test with detailed explanations and scoring.</p>
            <Button>Start Test</Button>
          </div>
          <div className={classes.card}>
            <h3>English Section Practice</h3>
            <p>Focus on grammar, punctuation, and rhetorical skills with targeted questions.</p>
            <Button>Start Practice</Button>
          </div>
          <div className={classes.card}>
            <h3>Math Section Practice</h3>
            <p>Algebra, geometry, and trigonometry problems with step-by-step solutions.</p>
            <Button>Start Practice</Button>
          </div>
          <div className={classes.card}>
            <h3>Reading Section Practice</h3>
            <p>Improve comprehension and analysis skills with timed reading passages.</p>
            <Button>Start Practice</Button>
          </div>
          <div className={classes.card}>
            <h3>Science Section Practice</h3>
            <p>Data interpretation and scientific reasoning practice questions.</p>
            <Button>Start Practice</Button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 2</h3>
            <p>Additional complete practice test to track your improvement over time.</p>
            <Button>Start Test</Button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 3</h3>
            <p>Continue building test-taking stamina and refining your strategies.</p>
            <Button>Start Test</Button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 4</h3>
            <p>Final practice test to ensure you're ready for test day.</p>
            <Button>Start Test</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const LessonsContent = () => {
    const filteredLessons = activeSection === 'all' ? lessonStructure : lessonStructure.filter(lesson => lesson.section === activeSection);

    // Keep original lesson order - no sorting by status
    const sortedLessons = filteredLessons;

    // Group lessons by section for headers
    const groupedLessons = [];
    let currentSection = '';

    sortedLessons.forEach(lesson => {
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
                  <div key={item.id} className={`${classes.lessonItem} ${getLessonStatus(item.id)}`} onClick={() => openLesson(item.id)}>
                    <div className={classes.lessonInfo}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h4 style={{ margin: 0 }}>{item.title}</h4>
                        {allLessons[item.id] && allLessons[item.id].duration && (
                          <span style={{
                            color: '#9ca3af',
                            fontSize: '0.75rem',
                            fontWeight: '400',
                            whiteSpace: 'nowrap',
                            opacity: '0.7'
                          }}>
                            {allLessons[item.id].duration}m
                          </span>
                        )}
                      </div>
                      <p style={{ margin: 0 }}>{item.desc}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 3, position: 'relative' }}>
                      <StatusIcon status={getLessonStatus(item.id)} />
                      <span className={`${classes.lessonStatus} ${getLessonStatus(item.id) === 'completed' ? 'completed' : getLessonStatus(item.id) === 'in-progress' ? 'in-progress' : ''}`}>
                        {statusUtils.getDisplayText(getLessonStatus(item.id))}
                      </span>
                    </div>
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
    const currentLessonData = lessonStructure.find(item => item.id === currentLesson);

    const keyTerms = lessonUtils.extractKeyTerms(lesson?.content);
    const progress = lessonUtils.calculateProgress(lessonStructure, lessonProgress);

    return (
      <div className={`${classes.lessonModal} ${lessonModalOpen ? 'active' : ''}`}>
        <div className={classes.lessonContent}>
          {/* Sidebar */}
          <div className={classes.lessonSidebar}>
            <div className={classes.sidebarSection}>
              <h4>Progress</h4>
              <div style={{ fontSize: '0.85rem', color: '#718096', marginBottom: '0.5rem' }}>
                {progress.completed} of {progress.total} lessons completed
              </div>
              <div className={classes.progressBar}>
                <div className="fill" style={{ width: `${progress.percentage}%` }}></div>
              </div>
            </div>

            {keyTerms.length > 0 && (
              <div className={classes.sidebarSection}>
                <h4>Key Terms</h4>
                <div className={classes.keyTerms}>
                  {keyTerms.map((term, index) => (
                    <div key={index} className="term">{term}</div>
                  ))}
                </div>
              </div>
            )}

            <div className={classes.sidebarSection}>
              <h4>Lesson Info</h4>
              <div style={{ fontSize: '0.85rem', color: '#718096', lineHeight: '1.5' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Section:</strong> {currentLessonData?.section || 'General'}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  background: 'white',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getLessonStatus(currentLesson) === 'completed' ? '#48bb78' :
                               getLessonStatus(currentLesson) === 'in-progress' ? '#ed8936' : '#cbd5e0'
                  }}></span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                    {getLessonStatus(currentLesson) === 'completed' ? 'Completed' :
                     getLessonStatus(currentLesson) === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={classes.lessonMain}>
            <div className={classes.lessonHeader}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h1 className={classes.lessonTitle} style={{ fontSize: '1.75rem', margin: 0 }}>
                      {lesson ? lesson.title : 'Lesson Coming Soon'}
                    </h1>
                    {lesson && lesson.duration && (
                      <span style={{
                        color: '#9ca3af',
                        fontSize: '0.8rem',
                        fontWeight: '400',
                        whiteSpace: 'nowrap',
                        opacity: '0.7'
                      }}>
                        • {lesson.duration} min
                      </span>
                    )}
                  </div>
                  {currentLessonData && (
                    <p style={{
                      color: '#718096',
                      fontSize: '0.95rem',
                      margin: 0,
                      fontWeight: '400'
                    }}>
                      {currentLessonData.desc}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeLessonModal}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: '#a0aec0',
                    cursor: 'pointer',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#f7fafc'}
                  onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className={classes.lessonBody}>
              {lesson ? (
                <ProgressiveLessonRenderer
                  content={lesson.content}
                  interactiveData={interactiveLessons[currentLesson]}
                />
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  color: '#a0aec0',
                  fontSize: '1rem'
                }}>
                  <p>This lesson content is being prepared. Check back soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Controls */}
        <div className={classes.floatingControls}>
          <button
            onClick={closeLessonModal}
            style={{
              background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '0.5rem',
              color: '#4a5568',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            ← Back
          </button>
          <button
            onClick={() => updateLessonProgress(currentLesson, 'not-started')}
            style={{
              background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '0.5rem',
              color: '#718096',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Reset
          </button>
          <button
            onClick={() => updateLessonProgress(currentLesson, 'in-progress')}
            style={{
              background: 'linear-gradient(135deg, #fffaf0 0%, #fef5e7 100%)',
              border: '1px solid #ed8936',
              borderRadius: '6px',
              padding: '0.5rem',
              color: '#c05621',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            In Progress
          </button>
          <button
            onClick={() => updateLessonProgress(currentLesson, 'completed')}
            style={{
              background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
              border: '1px solid #48bb78',
              borderRadius: '6px',
              padding: '0.5rem',
              color: '#276749',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Complete ✓
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <h1 className={classes.logo}>actclass.org</h1>
          <div style={{ color: '#666', fontSize: '0.8rem', fontWeight: '400' }}>
            Diagnostic Test & Lessons
          </div>
        </div>
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
          <div
            className={classes.tabIndicator}
            style={{
              left: activeTab === 'tests' ? '0%' : '50%',
              width: '50%'
            }}
          />
        </div>
      </div>

      <div className={classes.content}>
        <TestsContent />
        <LessonsContent />
      </div>

      <LessonModal />

      {/* AI Chat Component */}
      <AIChat
        currentLesson={currentLesson}
        lessonContent={lessonContent[currentLesson]}
      />
    </div>
  );
}

export default App;