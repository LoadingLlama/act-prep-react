/**
 * Date utility functions for calendar components
 * All functions work in local timezone (no UTC conversion)
 */

/**
 * Parse a date string in YYYY-MM-DD format to a Date object in local timezone
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Date|null} Date object in local timezone, or null if invalid
 */
export const parseLocalDate = (dateString) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Format a Date object as YYYY-MM-DD in local timezone
 * @param {Date} date - Date object to format
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Clean lesson title by removing "Topic X.X - " prefix
 * @param {string} title - Lesson title to clean
 * @returns {string} Cleaned title
 */
export const cleanLessonTitle = (title) => {
  if (!title) return 'Lesson';
  // Remove "Topic X.X - " prefix for consistent formatting
  return title.replace(/^Topic\s+[\d.]+\s+-\s+/, '');
};
