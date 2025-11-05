/**
 * Security Utilities
 * Provides sanitization, validation, and security helpers
 */

import DOMPurify from 'dompurify';
import validator from 'validator';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} dirty - Unsanitized HTML string
 * @param {object} options - DOMPurify configuration options
 * @returns {string} Sanitized HTML string
 */
export const sanitizeHTML = (dirty, options = {}) => {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }

  const defaultConfig = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'span', 'div',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'sub', 'sup'
    ],
    ALLOWED_ATTR: ['class', 'style', 'href', 'target', 'src', 'alt', 'title'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  };

  const config = { ...defaultConfig, ...options };
  return DOMPurify.sanitize(dirty, config);
};

/**
 * Validate and sanitize email address
 * @param {string} email - Email address to validate
 * @returns {string|null} Normalized email or null if invalid
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return null;
  }

  const trimmed = email.trim();

  if (!validator.isEmail(trimmed)) {
    return null;
  }

  return validator.normalizeEmail(trimmed, {
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
  });
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} { valid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = [];

  if (!password || typeof password !== 'string') {
    return { valid: false, errors: ['Password is required'] };
  }

  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }
  if (!hasSpecialChar) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize user input to prevent injection attacks
 * @param {string} input - User input string
 * @param {object} options - Validation options
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input, options = {}) => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const {
    maxLength = 1000,
    allowHTML = false,
    trim = true,
  } = options;

  let sanitized = input;

  if (trim) {
    sanitized = sanitized.trim();
  }

  if (!allowHTML) {
    sanitized = validator.escape(sanitized);
  }

  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

/**
 * Validate file upload
 * @param {File} file - File object to validate
 * @param {object} options - Validation options
 * @returns {object} { valid: boolean, error: string|null }
 */
export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxWidth = 2000,
    maxHeight = 2000,
  } = options;

  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  return { valid: true, error: null };
};

/**
 * Validate image dimensions (async)
 * @param {File} file - Image file to validate
 * @param {object} options - Dimension options
 * @returns {Promise<object>} { valid: boolean, error: string|null }
 */
export const validateImageDimensions = async (file, options = {}) => {
  const { maxWidth = 2000, maxHeight = 2000 } = options;

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      if (img.width > maxWidth || img.height > maxHeight) {
        resolve({
          valid: false,
          error: `Image dimensions too large. Maximum: ${maxWidth}x${maxHeight}px`,
        });
      } else {
        resolve({ valid: true, error: null });
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        valid: false,
        error: 'Failed to load image',
      });
    };

    img.src = objectUrl;
  });
};

/**
 * Validate numeric input
 * @param {any} value - Value to validate
 * @param {object} options - Validation options
 * @returns {object} { valid: boolean, value: number|null, error: string|null }
 */
export const validateNumber = (value, options = {}) => {
  const {
    min = -Infinity,
    max = Infinity,
    integer = false,
  } = options;

  const num = Number(value);

  if (isNaN(num)) {
    return { valid: false, value: null, error: 'Invalid number' };
  }

  if (integer && !Number.isInteger(num)) {
    return { valid: false, value: null, error: 'Must be an integer' };
  }

  if (num < min) {
    return { valid: false, value: null, error: `Must be at least ${min}` };
  }

  if (num > max) {
    return { valid: false, value: null, error: `Must be at most ${max}` };
  }

  return { valid: true, value: num, error: null };
};

/**
 * Rate limiter class for client-side rate limiting
 */
export class RateLimiter {
  constructor(options = {}) {
    this.maxAttempts = options.maxAttempts || 5;
    this.windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes
    this.storage = new Map();
  }

  check(key) {
    const now = Date.now();
    const attempts = this.storage.get(key) || [];

    // Remove old attempts outside the window
    const validAttempts = attempts.filter(
      timestamp => now - timestamp < this.windowMs
    );

    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }

    validAttempts.push(now);
    this.storage.set(key, validAttempts);
    return true;
  }

  reset(key) {
    this.storage.delete(key);
  }
}
