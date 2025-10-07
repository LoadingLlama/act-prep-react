/**
 * @deprecated This file is deprecated. Import from services/api/ instead
 * Kept for backward compatibility - re-exports from services
 */

import { supabase as supabaseClient } from '../services/api/supabase.service';
import LessonsService from '../services/api/lessons.service';

export const supabase = supabaseClient;

// Re-export helper functions for backward compatibility
export const fetchLessons = LessonsService.fetchLessonsAsObject.bind(LessonsService);
export const fetchLesson = LessonsService.getLessonByKey.bind(LessonsService);
export const saveProgress = LessonsService.saveUserProgress.bind(LessonsService);
export const getUserProgress = LessonsService.getUserProgressWithLessons.bind(LessonsService);
