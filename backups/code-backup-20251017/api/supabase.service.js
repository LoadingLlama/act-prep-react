/**
 * Supabase Service
 * Centralized Supabase client configuration and base methods
 */

import { createClient } from '@supabase/supabase-js';
import logger from '../logging/logger';
import errorTracker from '../logging/errorTracker';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const error = new Error('Missing Supabase environment variables');
  errorTracker.trackError('SupabaseService', 'initialization', {
    missingUrl: !supabaseUrl,
    missingKey: !supabaseAnonKey,
  }, error);
  throw error;
}

// Create single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

logger.info('SupabaseService', 'initialized', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
});

/**
 * Base query wrapper with error handling and logging
 */
const executeQuery = async (queryName, queryFn, context = {}) => {
  const startTime = performance.now();

  try {
    logger.debug('SupabaseService', queryName, { context, action: 'start' });

    const result = await queryFn();

    const duration = performance.now() - startTime;
    logger.info('SupabaseService', queryName, {
      ...context,
      duration: `${duration.toFixed(2)}ms`,
      success: !result.error,
    });

    if (result.error) {
      errorTracker.trackError('SupabaseService', queryName, context, result.error);
      return { data: null, error: result.error };
    }

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    errorTracker.trackError('SupabaseService', queryName, {
      ...context,
      duration: `${duration.toFixed(2)}ms`,
    }, error);
    return { data: null, error };
  }
};

/**
 * Supabase Service Methods
 */
const SupabaseService = {
  // Get client instance
  getClient() {
    return supabase;
  },

  // Execute custom query with error handling
  async query(queryName, queryFn, context = {}) {
    return executeQuery(queryName, queryFn, context);
  },

  // Health check
  async healthCheck() {
    return executeQuery('healthCheck', async () => {
      const { data, error } = await supabase.from('lessons').select('count');
      return { data, error };
    });
  },
};

export default SupabaseService;
