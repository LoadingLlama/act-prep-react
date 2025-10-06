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

// Lesson utilities
export const lessonUtils = {
  extractKeyTerms: (content) => {
    if (!content) return [];
    // Extract bold terms from content
    const boldMatches = content.match(/<strong>(.*?)<\/strong>/g) || [];
    return boldMatches.map(match => match.replace(/<\/?strong>/g, '')).slice(0, 5);
  },

  calculateProgress: (lessonStructure, lessonProgress) => {
    const total = lessonStructure.length;
    const completed = Object.values(lessonProgress).filter(status => status === 'completed').length;
    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }
};

// Script loader utilities
export const scriptLoader = {
  load: (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  },

  cleanup: (sources) => {
    sources.forEach(src => {
      const scripts = document.querySelectorAll(`script[src="${src}"]`);
      scripts.forEach(script => script.remove());
    });
  }
};