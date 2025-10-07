/**
 * Common utility functions used throughout the application
 */

import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';

// Local storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      const value = item ? JSON.parse(item) : defaultValue;

      logger.debug('StorageUtils', 'get', { key, found: !!item });
      return value;
    } catch (error) {
      errorTracker.trackError('StorageUtils', 'get', { key }, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      logger.debug('StorageUtils', 'set', { key });
      return true;
    } catch (error) {
      errorTracker.trackError('StorageUtils', 'set', { key }, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      logger.debug('StorageUtils', 'remove', { key });
      return true;
    } catch (error) {
      errorTracker.trackError('StorageUtils', 'remove', { key }, error);
      return false;
    }
  },
};

// Status utilities
export const statusUtils = {
  getDisplayText: (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'not-started':
      default:
        return 'Not Started';
    }
  },

  getNextStatus: (currentStatus) => {
    switch (currentStatus) {
      case 'not-started':
        return 'in-progress';
      case 'in-progress':
        return 'completed';
      case 'completed':
        return 'not-started';
      default:
        return 'not-started';
    }
  },
};

// DOM utilities
export const domUtils = {
  preventBodyScroll: () => {
    document.body.style.overflow = 'hidden';
    logger.debug('DOMUtils', 'preventBodyScroll', {});
  },

  restoreBodyScroll: () => {
    document.body.style.overflow = '';
    logger.debug('DOMUtils', 'restoreBodyScroll', {});
  },

  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    logger.debug('DOMUtils', 'scrollToTop', {});
  },
};

// Lesson utilities
export const lessonUtils = {
  extractKeyTerms: (content) => {
    try {
      if (!content) return [];

      // Extract bold terms from content
      const boldMatches = content.match(/<strong>(.*?)<\/strong>/g) || [];
      const terms = boldMatches.map((match) => match.replace(/<\/?strong>/g, '')).slice(0, 5);

      logger.debug('LessonUtils', 'extractKeyTerms', { termCount: terms.length });
      return terms;
    } catch (error) {
      errorTracker.trackError('LessonUtils', 'extractKeyTerms', {}, error);
      return [];
    }
  },

  calculateProgress: (lessonStructure, lessonProgress) => {
    try {
      const total = lessonStructure.length;
      const completed = Object.values(lessonProgress).filter(
        (status) => status === 'completed'
      ).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      logger.debug('LessonUtils', 'calculateProgress', {
        total,
        completed,
        percentage,
      });

      return { total, completed, percentage };
    } catch (error) {
      errorTracker.trackError('LessonUtils', 'calculateProgress', {}, error);
      return { total: 0, completed: 0, percentage: 0 };
    }
  },
};

// Script loader utilities
export const scriptLoader = {
  load: (src) => {
    logger.debug('ScriptLoader', 'load', { src });

    return new Promise((resolve, reject) => {
      try {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          logger.info('ScriptLoader', 'loaded', { src });
          resolve();
        };
        script.onerror = (error) => {
          errorTracker.trackError('ScriptLoader', 'load', { src }, error);
          reject(error);
        };
        document.body.appendChild(script);
      } catch (error) {
        errorTracker.trackError('ScriptLoader', 'load', { src }, error);
        reject(error);
      }
    });
  },

  cleanup: (sources) => {
    try {
      sources.forEach((src) => {
        const scripts = document.querySelectorAll(`script[src="${src}"]`);
        scripts.forEach((script) => script.remove());
      });

      logger.debug('ScriptLoader', 'cleanup', { count: sources.length });
    } catch (error) {
      errorTracker.trackError('ScriptLoader', 'cleanup', { sources }, error);
    }
  },
};
