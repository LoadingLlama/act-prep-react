/**
 * Structured Logger
 * Provides consistent logging across the application
 * Log Levels: ERROR, WARN, INFO, DEBUG
 */

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

const LOG_LEVEL_PRIORITY = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

class Logger {
  constructor() {
    this.currentLevel = process.env.REACT_APP_LOG_LEVEL || 'INFO';
    this.sessionId = this.generateSessionId();
    this.logs = [];
    this.maxStoredLogs = 1000;
  }

  generateSessionId() {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  shouldLog(level) {
    return LOG_LEVEL_PRIORITY[level] <= LOG_LEVEL_PRIORITY[this.currentLevel];
  }

  formatLog(level, module, action, context, error = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      module,
      action,
      sessionId: this.sessionId,
      context: context || {},
    };

    if (error) {
      logEntry.error = {
        message: error.message,
        stack: error.stack,
        name: error.name,
      };
    }

    // Store log in memory (for debugging/analytics)
    if (this.logs.length >= this.maxStoredLogs) {
      this.logs.shift();
    }
    this.logs.push(logEntry);

    return logEntry;
  }

  log(level, module, action, context, error = null) {
    if (!this.shouldLog(level)) {
      return;
    }

    const logEntry = this.formatLog(level, module, action, context, error);

    // Console output with color coding
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[36m',  // Cyan
      DEBUG: '\x1b[90m', // Gray
    };
    const resetColor = '\x1b[0m';

    const prefix = `${colors[level]}[${level}]${resetColor}`;
    const moduleAction = `${module}.${action}`;

    if (level === 'ERROR' && error) {
      console.error(prefix, moduleAction, context, error);
    } else if (level === 'WARN') {
      console.warn(prefix, moduleAction, context);
    } else {
      console.log(prefix, moduleAction, context);
    }

    // In production, send to error tracking service
    if (level === 'ERROR' && process.env.NODE_ENV === 'production') {
      this.sendToErrorTracking(logEntry);
    }
  }

  error(module, action, context, error) {
    this.log(LOG_LEVELS.ERROR, module, action, context, error);
  }

  warn(module, action, context) {
    this.log(LOG_LEVELS.WARN, module, action, context);
  }

  info(module, action, context) {
    this.log(LOG_LEVELS.INFO, module, action, context);
  }

  debug(module, action, context) {
    this.log(LOG_LEVELS.DEBUG, module, action, context);
  }

  // Get recent logs for debugging
  getRecentLogs(count = 100) {
    return this.logs.slice(-count);
  }

  // Get logs by level
  getLogsByLevel(level) {
    return this.logs.filter((log) => log.level === level);
  }

  // Get logs by module
  getLogsByModule(module) {
    return this.logs.filter((log) => log.module === module);
  }

  // Clear stored logs
  clearLogs() {
    this.logs = [];
  }

  // Send to external error tracking (placeholder)
  sendToErrorTracking(logEntry) {
    // Integration point for services like Sentry, LogRocket, etc.
    // For now, just ensure it's logged
    console.error('[ERROR_TRACKING]', logEntry);
  }

  // Set log level dynamically
  setLevel(level) {
    if (LOG_LEVELS[level]) {
      this.currentLevel = level;
      this.info('Logger', 'setLevel', { newLevel: level });
    }
  }

  // Export logs as JSON
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Singleton instance
const logger = new Logger();

export default logger;
export { LOG_LEVELS };
