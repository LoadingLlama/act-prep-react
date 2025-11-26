/**
 * Simple in-memory cache with TTL support
 * Significantly improves performance by caching API responses
 */

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes default
  }

  /**
   * Set a value in cache with optional TTL
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds (default: 5 minutes)
   */
  set(key, value, ttl = this.DEFAULT_TTL) {
    this.cache.set(key, value);
    this.timestamps.set(key, {
      setAt: Date.now(),
      ttl
    });
  }

  /**
   * Get a value from cache if it exists and hasn't expired
   * @param {string} key - Cache key
   * @returns {any|null} Cached value or null if not found/expired
   */
  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    const timestamp = this.timestamps.get(key);
    if (!timestamp) {
      return null;
    }

    const age = Date.now() - timestamp.setAt;
    if (age > timestamp.ttl) {
      // Expired - remove from cache
      this.cache.delete(key);
      this.timestamps.delete(key);
      return null;
    }

    return this.cache.get(key);
  }

  /**
   * Check if a key exists and is not expired
   * @param {string} key - Cache key
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Remove a specific key from cache
   * @param {string} key - Cache key
   */
  invalidate(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  /**
   * Clear all cached data
   */
  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }

  /**
   * Get cache statistics
   * @returns {object} Cache stats
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export singleton instance
export const cache = new CacheManager();

/**
 * Decorator function for caching async functions
 * @param {Function} fn - Async function to cache
 * @param {Function} keyGenerator - Function to generate cache key from arguments
 * @param {number} ttl - Time to live in milliseconds
 * @returns {Function} Cached version of the function
 */
export function withCache(fn, keyGenerator, ttl = 5 * 60 * 1000) {
  return async function(...args) {
    const key = keyGenerator(...args);
    const cached = cache.get(key);

    if (cached !== null) {
      return cached;
    }

    const result = await fn(...args);
    cache.set(key, result, ttl);
    return result;
  };
}

export default cache;
