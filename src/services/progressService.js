/**
 * Progress Service
 * Handles lesson progress tracking with Supabase sync
 * Migrates from localStorage to database for cross-device support
 */

import { supabase } from '../supabaseClient';
import { storage } from '../utils/helpers';

/**
 * Get all lesson progress for the current user from database
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Progress object keyed by lesson_id
 */
export async function getAllProgress(userId) {
  console.log('📚 Loading lesson progress from database...');

  try {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('lesson_id, status, last_accessed_at, completed_at')
      .eq('user_id', userId);

    if (error) {
      console.error('❌ Error loading progress:', error);
      return {};
    }

    // Convert array to object keyed by lesson_id
    const progressObj = {};
    data.forEach(item => {
      progressObj[item.lesson_id] = item.status;
    });

    console.log(`✅ Loaded progress for ${data.length} lessons`);
    return progressObj;
  } catch (error) {
    console.error('❌ Error in getAllProgress:', error);
    return {};
  }
}

/**
 * Update lesson progress in database
 * @param {string} userId - User ID
 * @param {string} lessonId - Lesson ID
 * @param {string} status - Progress status (not-started, in-progress, completed)
 * @returns {Promise<boolean>} Success status
 */
export async function updateProgress(userId, lessonId, status) {
  console.log(`📝 [${new Date().toISOString()}] Updating progress: ${lessonId} → ${status}`);

  try {
    // Get current status from database first to prevent downgrades
    const { data: currentData } = await supabase
      .from('lesson_progress')
      .select('status')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    // Prevent downgrade from completed to in-progress
    if (currentData?.status === 'completed' && status === 'in-progress') {
      console.log(`⚠️  Preventing downgrade: ${lessonId} is already completed`);
      return true; // Return true because the lesson is already at a higher state
    }

    // Prepare upsert data
    const updateData = {
      user_id: userId,
      lesson_id: lessonId,
      status: status,
      last_accessed_at: new Date().toISOString()
    };

    // Add completed_at timestamp if status is completed
    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
      console.log(`✅ Setting completed_at timestamp for ${lessonId}`);
    }

    console.log(`📤 Sending upsert request for ${lessonId}...`);

    // Upsert (insert or update)
    const { data, error } = await supabase
      .from('lesson_progress')
      .upsert(updateData, {
        onConflict: 'user_id,lesson_id'
      })
      .select();

    if (error) {
      console.error(`❌ [${new Date().toISOString()}] Error updating progress:`, error);
      console.error('Error details:', error);
      return false;
    }

    console.log(`✅ [${new Date().toISOString()}] Database updated successfully for ${lessonId}:`, data);
    return true;
  } catch (error) {
    console.error(`❌ [${new Date().toISOString()}] Exception in updateProgress:`, error);
    console.error('Exception details:', error);
    return false;
  }
}

/**
 * Migrate localStorage progress to Supabase
 * Called once when user logs in for the first time after this feature is added
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} Success status
 */
export async function migrateLocalStorageProgress(userId) {
  console.log('🔄 Migrating localStorage progress to Supabase...');

  try {
    // Get progress from localStorage
    const localProgress = storage.get('actPrepProgress', {});
    const lessonIds = Object.keys(localProgress);

    if (lessonIds.length === 0) {
      console.log('✅ No local progress to migrate');
      return true;
    }

    console.log(`📦 Found ${lessonIds.length} lessons in localStorage`);

    // Check which lessons already exist in database
    const { data: existingProgress } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', userId);

    const existingLessonIds = new Set(
      existingProgress ? existingProgress.map(p => p.lesson_id) : []
    );

    // Prepare records to insert (only ones not already in database)
    const recordsToInsert = lessonIds
      .filter(lessonId => !existingLessonIds.has(lessonId))
      .map(lessonId => ({
        user_id: userId,
        lesson_id: lessonId,
        status: localProgress[lessonId],
        last_accessed_at: new Date().toISOString()
      }));

    if (recordsToInsert.length === 0) {
      console.log('✅ All local progress already synced');
      return true;
    }

    // Insert all records
    const { error } = await supabase
      .from('lesson_progress')
      .insert(recordsToInsert);

    if (error) {
      console.error('❌ Error migrating progress:', error);
      return false;
    }

    console.log(`✅ Migrated ${recordsToInsert.length} lessons to database`);

    // Clear localStorage after successful migration
    storage.remove('actPrepProgress');
    console.log('✅ Cleared localStorage progress');

    return true;
  } catch (error) {
    console.error('❌ Error in migrateLocalStorageProgress:', error);
    return false;
  }
}

/**
 * Get progress for a specific lesson
 * @param {string} userId - User ID
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<string>} Status (not-started, in-progress, completed)
 */
export async function getLessonProgress(userId, lessonId) {
  try {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('status')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (error) {
      console.error('❌ Error getting lesson progress:', error);
      return 'not-started';
    }

    return data ? data.status : 'not-started';
  } catch (error) {
    console.error('❌ Error in getLessonProgress:', error);
    return 'not-started';
  }
}

/**
 * Get statistics about user's progress
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Progress statistics
 */
export async function getProgressStats(userId) {
  try {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('status')
      .eq('user_id', userId);

    if (error) {
      console.error('❌ Error getting progress stats:', error);
      return { total: 0, completed: 0, inProgress: 0, notStarted: 0 };
    }

    const completed = data.filter(p => p.status === 'completed').length;
    const inProgress = data.filter(p => p.status === 'in-progress').length;
    const notStarted = data.filter(p => p.status === 'not-started').length;

    return {
      total: data.length,
      completed,
      inProgress,
      notStarted
    };
  } catch (error) {
    console.error('❌ Error in getProgressStats:', error);
    return { total: 0, completed: 0, inProgress: 0, notStarted: 0 };
  }
}
