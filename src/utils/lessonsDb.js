/**
 * @deprecated This file is deprecated. Import from services/api/lessons.service.js instead
 * Kept for backward compatibility - re-exports from LessonsService
 */

import LessonsService from '../services/api/lessons.service';

// Re-export all methods for backward compatibility
export const getAllLessons = LessonsService.getAllLessons.bind(LessonsService);
export const getLessonsBySubject = LessonsService.getLessonsBySubject.bind(LessonsService);
export const getLessonById = LessonsService.getLessonById.bind(LessonsService);
export const getLessonByKey = LessonsService.getLessonByKey.bind(LessonsService);
export const saveUserProgress = LessonsService.saveUserProgress.bind(LessonsService);
export const getUserLessonProgress = LessonsService.getUserLessonProgress.bind(LessonsService);
export const getAllUserProgress = LessonsService.getAllUserProgress.bind(LessonsService);
