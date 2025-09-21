// Common utility functions used throughout the application

// Local storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }
};

// Script loading utility with caching and cleanup
export const scriptLoader = {
  loadedScripts: new Set(),
  scriptElements: new Map(),

  load: (src) => {
    return new Promise((resolve, reject) => {
      // Check if script already loaded
      if (scriptLoader.loadedScripts.has(src)) {
        resolve();
        return;
      }

      // Check if script element already exists
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        scriptLoader.loadedScripts.add(src);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        scriptLoader.loadedScripts.add(src);
        resolve();
      };
      script.onerror = reject;

      document.head.appendChild(script);
      scriptLoader.scriptElements.set(src, script);
    });
  },

  cleanup: (sources = []) => {
    sources.forEach(src => {
      const script = scriptLoader.scriptElements.get(src);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
        scriptLoader.scriptElements.delete(src);
        scriptLoader.loadedScripts.delete(src);
      }
    });
  },

  cleanupAll: () => {
    scriptLoader.scriptElements.forEach((script, src) => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
    scriptLoader.scriptElements.clear();
    scriptLoader.loadedScripts.clear();
  }
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
  }
};

// Lesson content utilities
export const lessonUtils = {
  extractKeyTerms: (content) => {
    if (!content) return [];

    const terms = [];
    const boldMatches = content.match(/<b[^>]*>(.*?)<\/b>/gi) || [];
    const strongMatches = content.match(/<strong[^>]*>(.*?)<\/strong>/gi) || [];
    const emMatches = content.match(/<em[^>]*>(.*?)<\/em>/gi) || [];

    [...boldMatches, ...strongMatches, ...emMatches].forEach(match => {
      const term = match.replace(/<[^>]*>/g, '').trim();
      if (term.length > 3 && term.length < 30 && !terms.includes(term)) {
        terms.push(term);
      }
    });

    return terms.slice(0, 8);
  },

  calculateProgress: (lessonStructure, progressData) => {
    const completed = lessonStructure.filter(lesson =>
      progressData[lesson.id] === 'completed'
    ).length;

    return {
      completed,
      total: lessonStructure.length,
      percentage: Math.round((completed / lessonStructure.length) * 100)
    };
  }
};

// DOM utilities
export const domUtils = {
  preventBodyScroll: () => {
    document.body.style.overflow = 'hidden';
  },

  restoreBodyScroll: () => {
    document.body.style.overflow = '';
  },

  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};