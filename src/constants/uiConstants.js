/**
 * UI Constants
 * Shared constants for consistent UI across the application
 */

// Skill/Type emoji mapping (consistent across app)
export const SKILL_EMOJI = {
  'Strategy': '🎯',
  'All Sections': '📝',
  'Grammar': '📘',
  'Punctuation': '✏️',
  'Problem Solving': '🧮',
  'Algebra': '🔢',
  'Numbers': '➗',
  'Geometry': '📐',
  'Reading': '📖',
  'Comprehension': '🤔',
  'Science': '🔬',
  'Data Analysis': '📊',
  'Interpretation': '🧪',
  'Lesson': '📚',
  'Practice': '🎯',
  'Test': '📝',
  'Review': '📊'
};

// Get emoji for a skill/type
export const getSkillEmoji = (skill) => {
  return SKILL_EMOJI[skill] || '📚';
};

// Color mapping for skill categories (consistent across app)
export const SKILL_COLORS = {
  'strategy': '#3b82f6',
  'test': '#ef4444',
  'grammar': '#8b5cf6',
  'punctuation': '#a855f7',
  'problem-solving': '#f97316',
  'algebra': '#fb923c',
  'numbers': '#fdba74',
  'geometry': '#fed7aa',
  'reading': '#10b981',
  'comprehension': '#34d399',
  'science': '#14b8a6',
  'data-analysis': '#2dd4bf',
  'interpretation': '#5eead4',
  'lesson': '#3b82f6',
  'practice': '#10b981',
  'review': '#8b5cf6'
};

// Get skill category for color coding
export const getSkillCategory = (skill) => {
  const categoryMap = {
    'Strategy': 'strategy',
    'All Sections': 'test',
    'Grammar': 'grammar',
    'Punctuation': 'punctuation',
    'Problem Solving': 'problem-solving',
    'Algebra': 'algebra',
    'Numbers': 'numbers',
    'Geometry': 'geometry',
    'Reading': 'reading',
    'Comprehension': 'comprehension',
    'Science': 'science',
    'Data Analysis': 'data-analysis',
    'Interpretation': 'interpretation',
    'Lesson': 'lesson',
    'Practice': 'practice',
    'Test': 'test',
    'Review': 'review'
  };
  return categoryMap[skill] || 'strategy';
};

// Button labels based on status
export const BUTTON_LABELS = {
  'not-started': 'Start',
  'in-progress': 'Continue',
  'completed': 'Review'
};

// Get button label for status
export const getButtonLabel = (status) => {
  return BUTTON_LABELS[status] || 'Start';
};

// Date formatting helpers
export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatFullDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const formatRelativeDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  const diffTime = compareDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';

  return formatDate(date);
};

export const getDaysUntil = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

// Item type helpers
export const ITEM_TYPES = {
  lesson: {
    label: 'Lesson',
    emoji: '📚',
    category: 'lesson'
  },
  practice: {
    label: 'Practice',
    emoji: '🎯',
    category: 'practice'
  },
  test: {
    label: 'Test',
    emoji: '📝',
    category: 'test'
  },
  review: {
    label: 'Review',
    emoji: '📊',
    category: 'review'
  }
};

export const getItemType = (type) => {
  return ITEM_TYPES[type] || ITEM_TYPES.lesson;
};
