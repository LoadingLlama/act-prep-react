import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Button from './components/Button';
import StatusIcon from './components/StatusIcon';
import ProgressiveLessonRenderer from './components/ProgressiveLessonRenderer';
import AIChat from './components/AIChat';
import DiagnosticTest from './components/DiagnosticTest';
import { spacing, borderRadius, buttonStyles } from './utils/sharedStyles';
import { storage, scriptLoader, statusUtils, lessonUtils, domUtils } from './utils/helpers';
import { getAllLessons } from './utils/lessonsDb';

const useStyles = createUseStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    'html': {
      scrollBehavior: 'smooth'
    },
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      backgroundColor: '#fafbfc',
      color: '#1a1a1a',
      lineHeight: 1.6,
      overflowX: 'hidden',
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
      backgroundAttachment: 'fixed'
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
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.5rem 1.5rem',
    position: 'sticky',
    top: 0,
    zIndex: 30
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    gap: '1rem'
  },
  logo: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1a1a1a',
    textDecoration: 'none',
    margin: 0
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: '0.7rem',
    fontWeight: 400,
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  navContainer: {
    padding: '0',
    marginBottom: '0',
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb'
  },
  navTabs: {
    display: 'flex',
    borderBottom: 'none',
    justifyContent: 'flex-start',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  tab: {
    background: 'transparent',
    border: 'none',
    padding: '0.6rem 1.25rem',
    fontSize: '0.9rem',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    fontWeight: 500,
    borderBottom: '2px solid transparent',
    '&:hover': {
      color: '#1a1a1a',
      background: '#f9fafb'
    },
    '&.active': {
      color: '#1a1a1a',
      borderBottom: '2px solid #1a1a1a'
    }
  },
  tabIndicator: {
    display: 'none'
  },
  content: {
    flex: 1,
    padding: '1rem 1.5rem',
    maxWidth: '1400px',
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
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '0.75rem',
    marginTop: '0',
    textAlign: 'left'
  },
  testGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '0.75rem',
    marginTop: '0'
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '0.85rem 1rem',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db'
    },
    '& h3': {
      fontSize: '0.9rem',
      fontWeight: 600,
      marginBottom: '0.25rem',
      color: '#111827'
    },
    '& p': {
      color: '#6b7280',
      marginBottom: '0',
      fontSize: '0.8rem',
      lineHeight: '1.3',
      display: 'none'
    }
  },
  btn: {
    ...buttonStyles.base,
    ...buttonStyles.sizes.md,
    background: '#f8f9fa',
    color: '#666',
    '&:hover': {
      background: '#e9ecef',
      borderColor: '#adb5bd',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#333'
    }
  },
  sectionFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    flexWrap: 'wrap'
  },
  sectionFilter: {
    background: 'transparent',
    border: '1px solid #e5e7eb',
    color: '#6b7280',
    padding: '0.35rem 0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 500,
    transition: 'all 0.15s ease',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
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
    gap: '0.4rem',
    marginTop: '0'
  },
  lessonItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    transition: 'all 0.1s ease',
    background: '#ffffff',
    cursor: 'pointer',
    borderLeft: '2px solid #e5e7eb',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db'
    },
    '&.completed': {
      background: '#f0fdf4',
      borderLeftColor: '#22c55e',
      opacity: 0.85,
      '& h4': {
        textDecoration: 'line-through',
        color: '#6b7280'
      },
      '& p': {
        display: 'none'
      }
    },
    '&.in-progress': {
      borderLeftColor: '#f59e0b',
      background: '#fffbeb'
    },
    '&.hidden': {
      display: 'none'
    }
  },
  lessonInfo: {
    flex: 1,
    '& h4': {
      fontSize: '0.85rem',
      fontWeight: 500,
      marginBottom: '0',
      color: '#111827'
    },
    '& p': {
      display: 'none'
    }
  },
  lessonStatus: {
    display: 'none'
  },
  sectionHeader: {
    gridColumn: '1 / -1',
    margin: '0.5rem 0 0.25rem',
    padding: '0.5rem 0.75rem',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      background: '#f3f4f6',
      borderColor: '#d1d5db'
    },
    '&:first-child': {
      marginTop: '0'
    },
    '& h3': {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: '#111827',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  },
  sectionHeaderIcon: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    transition: 'transform 0.15s ease',
    '&.expanded': {
      transform: 'rotate(90deg)'
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
    overflow: 'hidden',
    '&.active': {
      display: 'flex'
    }
  },
  lessonContent: {
    background: '#ffffff',
    width: '100%',
    height: '100vh',
    display: 'flex',
    lineHeight: '1.6',
    fontSize: '15px',
    color: '#6d6e75',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif'
  },
  lessonSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderRight: '1px solid #e9ecef',
    padding: '1.5rem',
    overflowY: 'auto',
    flexShrink: 0
  },
  lessonMain: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  lessonHeader: {
    padding: '1.5rem 2.5rem 1rem',
    background: 'white',
    borderBottom: '1px solid #e9ecef',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lessonTitle: {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0',
    letterSpacing: '-0.01em',
    lineHeight: '1.3',
    flex: 1
  },
  lessonModeToggle: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    marginRight: '3rem'
  },
  modeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    background: 'white',
    color: '#6b7280',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#1a1a1a',
      color: 'white',
      borderColor: '#1a1a1a'
    }
  },
  lessonClose: {
    position: 'absolute',
    top: '1.25rem',
    right: '1.5rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#999',
    padding: '0.25rem',
    '&:hover': {
      color: '#333'
    }
  },
  lessonRightSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderLeft: '1px solid #e9ecef',
    padding: '1.5rem',
    overflowY: 'auto',
    flexShrink: 0
  },
  lessonBody: {
    padding: '2rem 2.5rem 4rem',
    maxWidth: '900px',
    lineHeight: 1.6,
    fontSize: '15px',
    color: '#6d6e75',
    '& h1, & h2, & h3, & h4': {
      color: '#1a202c',
      fontWeight: '600',
      marginTop: '2rem',
      marginBottom: '0.75rem',
      lineHeight: '1.3'
    },
    '& h1': {
      fontSize: '1.875rem',
      borderBottom: '2px solid #e9ecef',
      paddingBottom: '0.5rem',
      fontWeight: '300'
    },
    '& h2': {
      fontSize: '1.5rem',
      color: '#2d3748',
      fontWeight: '500'
    },
    '& h3': {
      fontSize: '1.25rem',
      color: '#4a5568',
      fontWeight: '500'
    },
    '& p': {
      marginBottom: '1rem',
      lineHeight: '1.6'
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
      margin: '1.5rem 0',
      fontStyle: 'italic',
      color: '#4a5568',
      background: '#f7fafc',
      padding: '1rem 1rem',
      borderRadius: '0 4px 4px 0'
    },
    '& code': {
      backgroundColor: '#f0f0f0',
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '0.9em',
      fontFamily: 'Monaco, Consolas, monospace',
      color: '#1a1a1a'
    },
    '& .lesson-intro': {
      fontSize: '1rem',
      color: '#718096',
      fontStyle: 'italic',
      marginBottom: '2rem',
      padding: '1rem 1.25rem',
      background: '#f8f9fa',
      borderLeft: '4px solid #1a1a1a',
      borderRadius: '0 4px 4px 0'
    },
    '& .concept-box, & .tip-box, & .example-box, & .rules-box, & .key-takeaway': {
      background: 'transparent',
      border: 'none',
      borderRadius: '0',
      padding: '0',
      margin: '1.5rem 0',
      '& h4': {
        color: '#111827',
        marginBottom: '0.875rem',
        fontSize: '1rem',
        fontWeight: '600'
      }
    }
  },
  floatingControls: {
    display: 'none'
  },
  sidebarBackButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0',
    marginBottom: '1.5rem',
    color: '#6b7280',
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    '&:hover': {
      color: '#1a1a1a'
    }
  },
  sidebarNav: {
    '& h3': {
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#1a1a1a',
      marginBottom: '1rem'
    }
  },
  sidebarNavItem: {
    padding: '0.5rem 0.75rem',
    marginBottom: '0.25rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.15s',
    '&:hover': {
      background: '#f3f4f6',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#e0e7ff',
      color: '#4f46e5',
      fontWeight: 500
    }
  },
  sidebarSection: {
    marginBottom: '2rem',
    '& h4': {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#9ca3af',
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  },
  sidebarProgressBox: {
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1rem'
  },
  keyTerms: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    '& .term': {
      padding: '0.35rem 0.5rem',
      background: 'white',
      borderRadius: '4px',
      fontSize: '0.8rem',
      color: '#374151',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.15s',
      '&:hover': {
        background: '#f9fafb',
        borderColor: '#d1d5db'
      }
    }
  },
  progressBar: {
    width: '100%',
    height: '4px',
    background: '#e5e7eb',
    borderRadius: '2px',
    overflow: 'hidden',
    '& .fill': {
      height: '100%',
      background: 'linear-gradient(90deg, #22c55e, #16a34a)',
      borderRadius: '2px',
      transition: 'width 0.3s ease'
    }
  }
});

// Complete lesson structure from original HTML
const lessonStructure = [
  { id: 'getting-started', section: 'all', title: 'ACT Test Basics & Overview', desc: 'Test format, timing, and scoring overview', status: 'completed' },

  // English Section
  { id: 'sentence-structure', section: 'english', title: 'Chapter 1: Building Complete Sentences', desc: 'Independent clauses, dependent clauses, compound sentences, and comma splices', status: 'completed' },
  { id: 'commas', section: 'english', title: 'Chapter 2: Essential Comma Rules', desc: 'Unnecessary information, names rule, listing commas, and adjective lists', status: 'completed' },
  { id: 'punctuation', section: 'english', title: 'Chapter 3: Advanced Punctuation', desc: 'Semicolons, colons, dashes, apostrophes, and quotation marks', status: 'in-progress' },
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
  { id: 'introduction-to-act-math', section: 'math', title: 'Math Section Overview & Strategy', desc: 'Test format, timing, strategies, and essential tips for success', status: 'not-started' },
  { id: 'backsolving', section: 'math', title: 'Chapter 1: Working Backwards Strategy', desc: 'Powerful test-taking trick for working backwards from answer choices', status: 'not-started' },
  { id: 'substitution', section: 'math', title: 'Chapter 2: Number Substitution Technique', desc: 'Test-taking strategy for plugging in values', status: 'not-started' },
  { id: 'geometry-angles', section: 'math', title: 'Chapter 3: Understanding Angles & Lines', desc: 'Intersecting lines, parallel lines, interior angles', status: 'not-started' },
  { id: 'geometry-shapes', section: 'math', title: 'Chapter 4: Areas, Volumes & Triangles', desc: 'Area, volume, right triangles, special triangles', status: 'not-started' },
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
  { id: 'reading-intro', section: 'reading', title: 'Reading Section Fundamentals', desc: 'What is on the ACT Reading Test and what you\'ll learn in this course', status: 'not-started' },
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
  { id: 'science-introduction', section: 'science', title: 'Science Section Basics', desc: 'Test format, timing, and question types overview', status: 'not-started' },

  // Practice lessons for each chapter
  { id: 'sentence-structure-practice', section: 'english', title: 'Practice: Building Complete Sentences', desc: 'Authentic ACT questions testing sentence structure concepts', status: 'not-started' },
  { id: 'commas-practice', section: 'english', title: 'Practice: Essential Comma Rules', desc: 'ACT-style questions on comma usage and punctuation', status: 'not-started' },
  { id: 'punctuation-practice', section: 'english', title: 'Practice: Advanced Punctuation', desc: 'Semicolons, colons, dashes and apostrophes on the ACT', status: 'not-started' },
  { id: 'backsolving-practice', section: 'math', title: 'Practice: Working Backwards Strategy', desc: 'ACT math problems perfect for backsolving technique', status: 'not-started' },
  { id: 'substitution-practice', section: 'math', title: 'Practice: Number Substitution Technique', desc: 'Variable problems using substitution method', status: 'not-started' },
  { id: 'geometry-angles-practice', section: 'math', title: 'Practice: Understanding Angles & Lines', desc: 'Parallel lines, intersecting lines, and polygon angles', status: 'not-started' },
  { id: 'geometry-shapes-practice', section: 'math', title: 'Practice: Areas, Volumes & Triangles', desc: 'Area, volume, and triangle problems from real ACTs', status: 'not-started' },
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
  const [allLessons, setAllLessons] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [diagnosticTestOpen, setDiagnosticTestOpen] = useState(false);
  const [lessonProgress, setLessonProgress] = useState(() => {
    return storage.get('actPrepProgress', {});
  });
  const [expandedSections, setExpandedSections] = useState(() => {
    return storage.get('expandedSections', { english: true, math: false, reading: false, science: false });
  });
  const [lessonMode, setLessonMode] = useState('review'); // 'review' or 'practice'

  useEffect(() => {
    // Load lessons from Supabase
    const loadLessonsFromSupabase = async () => {
      const data = await getAllLessons();
      if (data) {
        // Convert to object keyed by lesson_key
        const lessonsObj = {};
        data.forEach(lesson => {
          lessonsObj[lesson.lesson_key] = {
            title: lesson.title,
            content: lesson.content,
            duration: lesson.duration,
            interactiveData: { practiceSections: [] }
          };
        });
        setLessonContent(lessonsObj);
        setAllLessons(lessonsObj);
      }
    };

    loadLessonsFromSupabase();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSectionFilter = (section) => {
    setActiveSection(section);
  };

  const toggleSection = (section) => {
    const newExpandedSections = { ...expandedSections, [section]: !expandedSections[section] };
    setExpandedSections(newExpandedSections);
    storage.set('expandedSections', newExpandedSections);
  };

  const openLesson = (lessonId) => {
    setCurrentLesson(lessonId);
    setLessonModalOpen(true);
    setLessonMode('review'); // Reset to review mode when opening a lesson
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
          <div className={classes.card} onClick={() => setDiagnosticTestOpen(true)}>
            <h3>Diagnostic Test</h3>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 1</h3>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 2</h3>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 3</h3>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 4</h3>
          </div>
          <div className={classes.card}>
            <h3>English Practice</h3>
          </div>
          <div className={classes.card}>
            <h3>Math Practice</h3>
          </div>
          <div className={classes.card}>
            <h3>Reading Practice</h3>
          </div>
          <div className={classes.card}>
            <h3>Science Practice</h3>
          </div>
        </div>
      </div>
    </div>
  );

  const LessonsContent = () => {
    // When a specific section is selected, show all lessons from that section
    if (activeSection !== 'all') {
      const filteredLessons = lessonStructure.filter(lesson => lesson.section === activeSection);

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
              {(() => {
                // Group lessons by category
                const groupedLessons = filteredLessons.reduce((acc, lesson) => {
                  const category = lesson.category || 'Other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(lesson);
                  return acc;
                }, {});

                return Object.entries(groupedLessons).map(([category, lessons]) => (
                  <React.Fragment key={category}>
                    {category !== 'Introduction' && category !== 'Practice Test' && (
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1a1a1a',
                        marginTop: category === Object.keys(groupedLessons)[0] ? '0' : '1.5rem',
                        marginBottom: '0.75rem',
                        paddingBottom: '0.5rem',
                        borderBottom: '2px solid #e5e7eb'
                      }}>
                        {category}
                      </div>
                    )}
                    {lessons.map((lesson) => (
                      <div key={lesson.id} className={`${classes.lessonItem} ${getLessonStatus(lesson.id)}`} onClick={() => openLesson(lesson.id)}>
                        <div className={classes.lessonInfo}>
                          <h4>
                            {lesson.chapterNum && <span style={{ color: '#1a73e8', fontWeight: '600', marginRight: '0.5rem' }}>{lesson.chapterNum}</span>}
                            {lesson.title}
                          </h4>
                        </div>
                        <StatusIcon status={getLessonStatus(lesson.id)} />
                      </div>
                    ))}
                  </React.Fragment>
                ));
              })()}
            </div>
          </div>
        </div>
      );
    }

    // When "All Sections" is selected, show collapsible sections
    const sections = [
      { key: 'english', title: 'English Section', lessons: lessonStructure.filter(l => l.section === 'english') },
      { key: 'math', title: 'Math Section', lessons: lessonStructure.filter(l => l.section === 'math') },
      { key: 'reading', title: 'Reading Section', lessons: lessonStructure.filter(l => l.section === 'reading') },
      { key: 'science', title: 'Science Section', lessons: lessonStructure.filter(l => l.section === 'science') }
    ];

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
            {sections.map(section => {
              // Group lessons by category within each section
              const groupedLessons = section.lessons.reduce((acc, lesson) => {
                const category = lesson.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(lesson);
                return acc;
              }, {});

              return (
                <React.Fragment key={section.key}>
                  <div className={classes.sectionHeader} onClick={() => toggleSection(section.key)}>
                    <h3>{section.title} ({section.lessons.length} lessons)</h3>
                    <span className={`${classes.sectionHeaderIcon} ${expandedSections[section.key] ? 'expanded' : ''}`}>
                      ▶
                    </span>
                  </div>
                  {expandedSections[section.key] && Object.entries(groupedLessons).map(([category, lessons]) => (
                    <React.Fragment key={`${section.key}-${category}`}>
                      {category !== 'Introduction' && category !== 'Practice Test' && (
                        <div style={{
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          color: '#4a5568',
                          marginTop: '1rem',
                          marginBottom: '0.5rem',
                          marginLeft: '1rem',
                          paddingBottom: '0.4rem',
                          borderBottom: '1px solid #e5e7eb'
                        }}>
                          {category}
                        </div>
                      )}
                      {lessons.map((lesson) => (
                        <div key={lesson.id} className={`${classes.lessonItem} ${getLessonStatus(lesson.id)}`} onClick={() => openLesson(lesson.id)}>
                          <div className={classes.lessonInfo}>
                            <h4>
                              {lesson.chapterNum && <span style={{ color: '#1a73e8', fontWeight: '600', marginRight: '0.5rem' }}>{lesson.chapterNum}</span>}
                              {lesson.title}
                            </h4>
                          </div>
                          <StatusIcon status={getLessonStatus(lesson.id)} />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              );
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

    // Get lessons from the same section for left sidebar navigation
    const currentSection = currentLessonData?.section;
    const sectionLessons = lessonStructure.filter(l => l.section === currentSection);

    return (
      <div className={`${classes.lessonModal} ${lessonModalOpen ? 'active' : ''}`}>
        <div className={classes.lessonContent}>
          {/* Left Sidebar - Navigation */}
          <div className={classes.lessonSidebar}>
            <button className={classes.sidebarBackButton} onClick={closeLessonModal}>
              ← Back to Lessons
            </button>

            <div className={classes.sidebarNav}>
              <h3>{currentSection ? `${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Section` : 'Lessons'}</h3>
              {sectionLessons.map(l => (
                <div
                  key={l.id}
                  className={`${classes.sidebarNavItem} ${l.id === currentLesson ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentLesson(l.id);
                    setLessonMode('review');
                  }}
                >
                  {l.title}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className={classes.lessonMain}>
            <div className={classes.lessonHeader} style={{ padding: '0.75rem 2rem', minHeight: 'auto' }}>
              <h1 className={classes.lessonTitle} style={{ fontSize: '1.1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>{currentSection ? `ACT® ${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}` : 'Lessons'}</span>
                {lesson && lesson.topic_number && (
                  <>
                    <span style={{ color: '#d1d5db', fontWeight: 400 }}>|</span>
                    <span style={{
                      background: '#3b82f6',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}>
                      Topic {lesson.topic_number}
                    </span>
                  </>
                )}
              </h1>

              <div style={{
                display: 'inline-flex',
                background: '#f3f4f6',
                borderRadius: '6px',
                padding: '3px',
                gap: '2px'
              }}>
                <button
                  style={{
                    padding: '0.4rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: lessonMode === 'review' ? 'white' : 'transparent',
                    color: lessonMode === 'review' ? '#1a1a1a' : '#6b7280',
                    boxShadow: lessonMode === 'review' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  onClick={() => setLessonMode('review')}
                >
                  Review
                </button>
                <button
                  style={{
                    padding: '0.4rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: lessonMode === 'practice' ? 'white' : 'transparent',
                    color: lessonMode === 'practice' ? '#1a1a1a' : '#6b7280',
                    boxShadow: lessonMode === 'practice' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  onClick={() => setLessonMode('practice')}
                >
                  Practice
                </button>
              </div>
            </div>
            <div className={classes.lessonBody}>
              {lesson && lesson.title && (
                <div style={{
                  maxWidth: '900px',
                  margin: '0 auto',
                  padding: '1rem 4rem 0'
                }}>
                  {/* Metadata bar - Lumisource style */}
                  <div style={{
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid #e5e7eb',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#2563eb',
                      fontSize: '0.875rem'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span style={{ fontWeight: '500' }}>Reading Time: 5 min</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#059669',
                      fontSize: '0.875rem'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4"/>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                      </svg>
                      <span style={{ fontWeight: '500' }}>Verified for 2025 ACT® Exam</span>
                    </div>
                  </div>

                  <h2 style={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '0.5rem',
                    lineHeight: '1.3'
                  }}>
                    {lesson.full_topic_code
                      ? `Topic ${lesson.full_topic_code} - ${lesson.title}`
                      : lesson.title
                    }
                  </h2>
                </div>
              )}
              {lessonMode === 'review' ? (
                lesson ? (
                  <ProgressiveLessonRenderer
                    lesson={lesson}
                  />
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: '#999',
                    fontSize: '1rem'
                  }}>
                    <p>This lesson content is being prepared. Check back soon!</p>
                  </div>
                )
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  color: '#999',
                  fontSize: '1rem'
                }}>
                  <p>Practice exercises coming soon!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Progress & Info */}
          <div className={classes.lessonRightSidebar}>
            <div className={classes.sidebarSection}>
              <h4>Your Progress</h4>
              <div className={classes.sidebarProgressBox}>
                <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
                  Lesson Progress
                </div>
                <div className={classes.progressBar}>
                  <div className="fill" style={{ width: `${progress.percentage}%` }}></div>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                  {progress.completed} of {progress.total} lessons completed
                </div>
              </div>

              <button
                onClick={() => updateLessonProgress(currentLesson, 'completed')}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: getLessonStatus(currentLesson) === 'completed' ? '#22c55e' : '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500
                }}
              >
                {getLessonStatus(currentLesson) === 'completed' ? '✓ Completed' : 'Mark as Complete'}
              </button>
            </div>

            {lesson && lesson.duration && (
              <div className={classes.sidebarSection}>
                <h4>Reading Time</h4>
                <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                  {lesson.duration} minutes
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <h1 className={classes.logo}>actclass.org</h1>
          <div className={classes.subtitle}>
            ACT Prep Platform
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
        </div>
      </div>

      <div className={classes.content}>
        <TestsContent />
        <LessonsContent />
      </div>

      <LessonModal />

      {/* Diagnostic Test Modal */}
      {diagnosticTestOpen && (
        <DiagnosticTest onClose={() => setDiagnosticTestOpen(false)} />
      )}

      {/* AI Chat Component */}
      <AIChat
        currentLesson={currentLesson}
        lessonContent={lessonContent[currentLesson]}
      />
    </div>
  );
}

export default App;