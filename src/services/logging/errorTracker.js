/**
 * Error Tracker
 * Centralized error tracking and reporting
 */

import logger from './logger';

class ErrorTracker {
  constructor() {
    this.errors = [];
    this.maxStoredErrors = 100;
    this.setupGlobalErrorHandlers();
  }

  setupGlobalErrorHandlers() {
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError('UnhandledPromiseRejection', 'globalHandler', {
        reason: event.reason,
        promise: event.promise,
      });
      event.preventDefault();
    });

    // Catch global errors
    window.addEventListener('error', (event) => {
      this.trackError('GlobalError', 'globalHandler', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      }, event.error);
    });
  }

  trackError(module, action, context, error = null) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      module,
      action,
      context,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : null,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Store error
    if (this.errors.length >= this.maxStoredErrors) {
      this.errors.shift();
    }
    this.errors.push(errorEntry);

    // Log it
    logger.error(module, action, context, error);

    // In production, send to external service
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(errorEntry);
    }
  }

  sendToExternalService(errorEntry) {
    // Integration point for Sentry, LogRocket, Rollbar, etc.
    // For now, just console.error
    console.error('[EXTERNAL_ERROR_TRACKING]', errorEntry);
  }

  getRecentErrors(count = 20) {
    return this.errors.slice(-count);
  }

  getErrorsByModule(module) {
    return this.errors.filter((err) => err.module === module);
  }

  clearErrors() {
    this.errors = [];
  }

  exportErrors() {
    return JSON.stringify(this.errors, null, 2);
  }

  // Wrap async functions with error tracking
  wrapAsync(module, action, asyncFn) {
    return async (...args) => {
      try {
        return await asyncFn(...args);
      } catch (error) {
        this.trackError(module, action, { args }, error);
        throw error;
      }
    };
  }

  // Wrap sync functions with error tracking
  wrapSync(module, action, syncFn) {
    return (...args) => {
      try {
        return syncFn(...args);
      } catch (error) {
        this.trackError(module, action, { args }, error);
        throw error;
      }
    };
  }
}

// Singleton instance
const errorTracker = new ErrorTracker();

export default errorTracker;
