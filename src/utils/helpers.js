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