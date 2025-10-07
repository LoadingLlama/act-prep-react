/**
 * Logging Configuration
 * Centralized configuration for logging behavior
 */

export const LOGGING_CONFIG = {
  // Default log level (can be overridden by REACT_APP_LOG_LEVEL env var)
  defaultLevel: 'INFO',

  // Enable/disable console output
  enableConsole: true,

  // Enable/disable log storage in memory
  enableStorage: true,

  // Maximum logs to store in memory
  maxStoredLogs: 1000,

  // Maximum errors to store
  maxStoredErrors: 100,

  // Enable/disable external error tracking in production
  enableExternalTracking: true,

  // Modules to always log (even if log level is higher)
  alwaysLogModules: [
    'SupabaseService',
    'AuthService',
    'PaymentService',
  ],

  // Actions to never log (sensitive operations)
  neverLogActions: [
    'password',
    'token',
    'secret',
  ],

  // Log format options
  format: {
    timestamp: true,
    sessionId: true,
    userId: true,
    includeContext: true,
  },

  // Performance logging thresholds (ms)
  performance: {
    slowQueryThreshold: 1000,
    slowRenderThreshold: 500,
    slowApiCallThreshold: 2000,
  },
};

export default LOGGING_CONFIG;
