/**
 * Authentication Context
 * Provides global authentication state and methods throughout the app
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/api/supabase.service';
import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';

const AuthContext = createContext({});

/**
 * Hook to use authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Wraps the app and provides authentication state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check active session
    const initializeAuth = async () => {
      try {
        logger.info('AuthContext', 'initializeAuth', { action: 'start' });

        const { data: { session: currentSession }, error } = await supabase.auth.getSession();

        if (error) {
          errorTracker.trackError('AuthContext', 'initializeAuth', {}, error);
          throw error;
        }

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        logger.info('AuthContext', 'initializeAuth', {
          hasSession: !!currentSession,
          userId: currentSession?.user?.id,
        });
      } catch (error) {
        errorTracker.trackError('AuthContext', 'initializeAuth', {}, error);
        logger.error('AuthContext', 'initializeAuth', { error: error.message });
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        logger.info('AuthContext', 'authStateChange', {
          event,
          hasSession: !!currentSession,
          userId: currentSession?.user?.id,
        });

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  /**
   * Sign up with email and password
   */
  const signUp = async (email, password, metadata = {}) => {
    try {
      logger.info('AuthContext', 'signUp', { email, hasMetadata: Object.keys(metadata).length > 0 });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        errorTracker.trackError('AuthContext', 'signUp', { email }, error);
        throw error;
      }

      logger.info('AuthContext', 'signUp', {
        success: true,
        userId: data.user?.id,
      });

      return { data, error: null };
    } catch (error) {
      errorTracker.trackError('AuthContext', 'signUp', { email }, error);
      return { data: null, error };
    }
  };

  /**
   * Sign in with email and password
   */
  const signIn = async (email, password) => {
    try {
      logger.info('AuthContext', 'signIn', { email });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        errorTracker.trackError('AuthContext', 'signIn', { email }, error);
        throw error;
      }

      logger.info('AuthContext', 'signIn', {
        success: true,
        userId: data.user?.id,
      });

      return { data, error: null };
    } catch (error) {
      errorTracker.trackError('AuthContext', 'signIn', { email }, error);
      return { data: null, error };
    }
  };

  /**
   * Sign in with Google OAuth
   */
  const signInWithGoogle = async () => {
    try {
      logger.info('AuthContext', 'signInWithGoogle', { action: 'start' });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        errorTracker.trackError('AuthContext', 'signInWithGoogle', {}, error);
        throw error;
      }

      logger.info('AuthContext', 'signInWithGoogle', { success: true });

      return { data, error: null };
    } catch (error) {
      errorTracker.trackError('AuthContext', 'signInWithGoogle', {}, error);
      return { data: null, error };
    }
  };

  /**
   * Sign out
   */
  const signOut = async () => {
    try {
      logger.info('AuthContext', 'signOut', { userId: user?.id });

      const { error } = await supabase.auth.signOut();

      if (error) {
        errorTracker.trackError('AuthContext', 'signOut', { userId: user?.id }, error);
        throw error;
      }

      logger.info('AuthContext', 'signOut', { success: true });

      return { error: null };
    } catch (error) {
      errorTracker.trackError('AuthContext', 'signOut', { userId: user?.id }, error);
      return { error };
    }
  };

  /**
   * Reset password
   */
  const resetPassword = async (email) => {
    try {
      logger.info('AuthContext', 'resetPassword', { email });

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        errorTracker.trackError('AuthContext', 'resetPassword', { email }, error);
        throw error;
      }

      logger.info('AuthContext', 'resetPassword', { success: true });

      return { data, error: null };
    } catch (error) {
      errorTracker.trackError('AuthContext', 'resetPassword', { email }, error);
      return { data: null, error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
