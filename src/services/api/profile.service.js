/**
 * Profile Service
 * Handles user profile data operations with Supabase
 */

import { supabase } from './supabase.service';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';
import { validateFileUpload, validateImageDimensions } from '../../utils/security';

const ProfileService = {
  /**
   * Get current user's profile
   */
  async getProfile(userId) {
    try {
      logger.info('ProfileService', 'getProfile', { userId });

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        errorTracker.trackError('ProfileService', 'getProfile', { userId }, error);
        return { data: null, error };
      }

      logger.info('ProfileService', 'getProfile', {
        success: true,
        hasProfile: !!data,
      });

      return { data, error: null };
    } catch (error) {
      errorTracker.trackError('ProfileService', 'getProfile', { userId }, error);
      return { data: null, error };
    }
  },

  /**
   * Create a new profile
   */
  async createProfile(userId, profileData) {
    try {
      logger.info('ProfileService', 'createProfile', { userId });

      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            ...profileData,
          },
        ])
        .select()
        .single();

      if (error) {
        errorTracker.trackError('ProfileService', 'createProfile', { userId }, error);
        return { data: null, error };
      }

      logger.info('ProfileService', 'createProfile', { success: true });

      return { data, error: null };
    } catch (error) {
      errorTracker.trackError('ProfileService', 'createProfile', { userId }, error);
      return { data: null, error };
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(userId, updates) {
    try {
      logger.info('ProfileService', 'updateProfile', {
        userId,
        fields: Object.keys(updates),
      });

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        errorTracker.trackError('ProfileService', 'updateProfile', { userId }, error);
        return { data: null, error };
      }

      logger.info('ProfileService', 'updateProfile', { success: true });

      return { data, error: null };
    } catch (error) {
      errorTracker.trackError('ProfileService', 'updateProfile', { userId }, error);
      return { data: null, error };
    }
  },

  /**
   * Update user preferences
   */
  async updatePreferences(userId, preferences) {
    try {
      logger.info('ProfileService', 'updatePreferences', {
        userId,
        preferenceKeys: Object.keys(preferences),
      });

      // Get current preferences first
      const { data: profile } = await this.getProfile(userId);
      const currentPreferences = profile?.preferences || {};

      // Merge with new preferences
      const updatedPreferences = {
        ...currentPreferences,
        ...preferences,
      };

      const { data, error} = await supabase
        .from('profiles')
        .update({ preferences: updatedPreferences })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        errorTracker.trackError('ProfileService', 'updatePreferences', { userId }, error);
        return { data: null, error };
      }

      logger.info('ProfileService', 'updatePreferences', { success: true });

      return { data, error: null };
    } catch (error) {
      errorTracker.trackError('ProfileService', 'updatePreferences', { userId }, error);
      return { data: null, error };
    }
  },

  /**
   * Upload profile avatar
   */
  async uploadAvatar(userId, file) {
    try {
      logger.info('ProfileService', 'uploadAvatar', {
        userId,
        fileName: file.name,
        fileSize: file.size,
      });

      // SECURITY: Verify authorization - user can only upload to their own profile
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        const error = new Error('Authentication required');
        errorTracker.trackError('ProfileService', 'uploadAvatar', { userId }, error);
        return { data: null, error };
      }

      if (user.id !== userId) {
        const error = new Error('Unauthorized: Cannot modify another user\'s profile');
        errorTracker.trackError('ProfileService', 'uploadAvatar', {
          userId,
          currentUserId: user.id,
          reason: 'authorization_mismatch'
        }, error);
        return { data: null, error };
      }

      // SECURITY: Validate file upload (type and size)
      const fileValidation = validateFileUpload(file, {
        maxSize: 5 * 1024 * 1024, // 5MB max
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      });

      if (!fileValidation.valid) {
        const error = new Error(fileValidation.error);
        errorTracker.trackError('ProfileService', 'uploadAvatar', { userId }, error);
        return { data: null, error };
      }

      // SECURITY: Validate image dimensions
      const dimensionValidation = await validateImageDimensions(file, {
        maxWidth: 2000,
        maxHeight: 2000
      });

      if (!dimensionValidation.valid) {
        const error = new Error(dimensionValidation.error);
        errorTracker.trackError('ProfileService', 'uploadAvatar', { userId }, error);
        return { data: null, error };
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        errorTracker.trackError('ProfileService', 'uploadAvatar', { userId }, uploadError);
        return { data: null, error: uploadError };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const avatarUrl = urlData.publicUrl;

      // Update profile with new avatar URL
      const { data, error } = await this.updateProfile(userId, {
        avatar_url: avatarUrl,
      });

      if (error) {
        errorTracker.trackError('ProfileService', 'uploadAvatar', { userId }, error);
        return { data: null, error };
      }

      logger.info('ProfileService', 'uploadAvatar', {
        success: true,
        avatarUrl,
      });

      return { data: { ...data, avatar_url: avatarUrl }, error: null };
    } catch (error) {
      errorTracker.trackError('ProfileService', 'uploadAvatar', { userId }, error);
      return { data: null, error };
    }
  },

  /**
   * Delete profile avatar
   */
  async deleteAvatar(userId, avatarUrl) {
    try {
      logger.info('ProfileService', 'deleteAvatar', { userId });

      // SECURITY: Verify authorization - user can only delete their own avatar
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        const error = new Error('Authentication required');
        errorTracker.trackError('ProfileService', 'deleteAvatar', { userId }, error);
        return { error };
      }

      if (user.id !== userId) {
        const error = new Error('Unauthorized: Cannot modify another user\'s profile');
        errorTracker.trackError('ProfileService', 'deleteAvatar', {
          userId,
          currentUserId: user.id,
          reason: 'authorization_mismatch'
        }, error);
        return { error };
      }

      // Extract file path from URL
      const urlParts = avatarUrl.split('/avatars/');
      if (urlParts.length < 2) {
        throw new Error('Invalid avatar URL');
      }

      const filePath = `avatars/${urlParts[1]}`;

      // Delete file from storage
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([filePath]);

      if (deleteError) {
        errorTracker.trackError('ProfileService', 'deleteAvatar', { userId }, deleteError);
        return { error: deleteError };
      }

      // Remove avatar URL from profile
      const { data, error } = await this.updateProfile(userId, {
        avatar_url: null,
      });

      if (error) {
        errorTracker.trackError('ProfileService', 'deleteAvatar', { userId }, error);
        return { error };
      }

      logger.info('ProfileService', 'deleteAvatar', { success: true });

      return { data, error: null };
    } catch (error) {
      errorTracker.trackError('ProfileService', 'deleteAvatar', { userId }, error);
      return { error };
    }
  },
};

export default ProfileService;
