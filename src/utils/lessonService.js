/**
 * @deprecated This file is deprecated. Import from services/api/lessons.service.js instead
 * Kept for backward compatibility - re-exports from LessonsService
 */

import LessonsService from '../services/api/lessons.service';
import logger from '../services/logging/logger';

/**
 * Fetch all lessons for a specific subject
 * @param {string} subject - 'math', 'english', 'reading', or 'science'
 * @returns {Promise<Object>} - Lessons object with lesson_key as keys
 */
export async function fetchLessonsBySubject(subject) {
  const lessons = await LessonsService.getLessonsBySubject(subject);
  if (!lessons) return {};

  // Convert array to object format matching the original structure
  const lessonsObject = {};
  lessons.forEach((lesson) => {
    lessonsObject[lesson.lesson_key] = {
      title: lesson.title,
      content: lesson.content,
    };
  });

  return lessonsObject;
}

/**
 * Fetch a single lesson by subject and key
 * @param {string} subject - 'math', 'english', 'reading', or 'science'
 * @param {string} lessonKey - The lesson key
 * @returns {Promise<Object>} - Lesson object with title and content
 */
export async function fetchLesson(subject, lessonKey) {
  logger.debug('LessonServiceWrapper', 'fetchLesson', { subject, lessonKey });

  const lesson = await LessonsService.getLessonByKey(lessonKey);
  if (!lesson) return null;

  return {
    title: lesson.title,
    content: lesson.content,
  };
}

/**
 * Fetch all lessons from all subjects
 * @returns {Promise<Object>} - All lessons organized by subject
 */
export async function fetchAllLessons() {
  const lessons = await LessonsService.getAllLessons();
  if (!lessons) return null;

  // Organize by subject
  const lessonsBySubject = {
    math: {},
    english: {},
    reading: {},
    science: {},
  };

  lessons.forEach((lesson) => {
    if (lessonsBySubject[lesson.subject]) {
      lessonsBySubject[lesson.subject][lesson.lesson_key] = {
        title: lesson.title,
        content: lesson.content,
      };
    }
  });

  return lessonsBySubject;
}

/**
 * Get lesson list (titles and keys) for navigation
 * @param {string} subject - 'math', 'english', 'reading', or 'science'
 * @returns {Promise<Array>} - Array of lesson metadata
 */
export async function fetchLessonList(subject) {
  const lessons = await LessonsService.getLessonsBySubject(subject);
  if (!lessons) return [];

  return lessons.map((lesson) => ({
    lesson_key: lesson.lesson_key,
    title: lesson.title,
    order_index: lesson.order_index,
  }));
}
