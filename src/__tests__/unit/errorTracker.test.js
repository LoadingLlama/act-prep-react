/**
 * Unit Tests for Error Tracker
 */

import errorTracker from '../../services/logging/errorTracker';

describe('ErrorTracker', () => {
  beforeEach(() => {
    errorTracker.clearErrors();
  });

  describe('Error Tracking', () => {
    test('should track errors with context', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Test error');

      errorTracker.trackError('TestModule', 'testAction', { key: 'value' }, error);

      const errors = errorTracker.getRecentErrors();
      expect(errors).toHaveLength(1);
      expect(errors[0].module).toBe('TestModule');
      expect(errors[0].action).toBe('testAction');
      expect(errors[0].context.key).toBe('value');
      expect(errors[0].error.message).toBe('Test error');

      consoleErrorSpy.mockRestore();
    });

    test('should track errors without error object', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      errorTracker.trackError('TestModule', 'testAction', { key: 'value' });

      const errors = errorTracker.getRecentErrors();
      expect(errors).toHaveLength(1);
      expect(errors[0].error).toBeNull();

      consoleErrorSpy.mockRestore();
    });

    test('should include timestamp and URL', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      errorTracker.trackError('TestModule', 'testAction', {});

      const errors = errorTracker.getRecentErrors();
      expect(errors[0].timestamp).toBeDefined();
      expect(errors[0].url).toBeDefined();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Error Storage', () => {
    test('should store multiple errors', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      errorTracker.trackError('Module1', 'action1', {});
      errorTracker.trackError('Module2', 'action2', {});
      errorTracker.trackError('Module3', 'action3', {});

      const errors = errorTracker.getRecentErrors();
      expect(errors).toHaveLength(3);

      consoleErrorSpy.mockRestore();
    });

    test('should limit stored errors to max count', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const originalMax = errorTracker.maxStoredErrors;
      errorTracker.maxStoredErrors = 5;

      for (let i = 0; i < 10; i++) {
        errorTracker.trackError('TestModule', `action${i}`, {});
      }

      const errors = errorTracker.getRecentErrors();
      expect(errors.length).toBeLessThanOrEqual(5);

      errorTracker.maxStoredErrors = originalMax;
      consoleErrorSpy.mockRestore();
    });

    test('should filter errors by module', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      errorTracker.trackError('Module1', 'action1', {});
      errorTracker.trackError('Module2', 'action2', {});
      errorTracker.trackError('Module1', 'action3', {});

      const module1Errors = errorTracker.getErrorsByModule('Module1');
      expect(module1Errors).toHaveLength(2);
      module1Errors.forEach((error) => {
        expect(error.module).toBe('Module1');
      });

      consoleErrorSpy.mockRestore();
    });

    test('should clear all errors', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      errorTracker.trackError('Module1', 'action1', {});
      errorTracker.trackError('Module2', 'action2', {});

      errorTracker.clearErrors();

      const errors = errorTracker.getRecentErrors();
      expect(errors).toHaveLength(0);

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Function Wrapping', () => {
    test('should wrap async functions and track errors', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const asyncFn = async () => {
        throw new Error('Async error');
      };

      const wrapped = errorTracker.wrapAsync('TestModule', 'testAction', asyncFn);

      await expect(wrapped()).rejects.toThrow('Async error');

      const errors = errorTracker.getRecentErrors();
      expect(errors).toHaveLength(1);
      expect(errors[0].module).toBe('TestModule');

      consoleErrorSpy.mockRestore();
    });

    test('should wrap async functions and return result', async () => {
      const asyncFn = async (x, y) => x + y;

      const wrapped = errorTracker.wrapAsync('TestModule', 'testAction', asyncFn);

      const result = await wrapped(2, 3);
      expect(result).toBe(5);
    });

    test('should wrap sync functions and track errors', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const syncFn = () => {
        throw new Error('Sync error');
      };

      const wrapped = errorTracker.wrapSync('TestModule', 'testAction', syncFn);

      expect(() => wrapped()).toThrow('Sync error');

      const errors = errorTracker.getRecentErrors();
      expect(errors).toHaveLength(1);
      expect(errors[0].module).toBe('TestModule');

      consoleErrorSpy.mockRestore();
    });

    test('should wrap sync functions and return result', () => {
      const syncFn = (x, y) => x + y;

      const wrapped = errorTracker.wrapSync('TestModule', 'testAction', syncFn);

      const result = wrapped(2, 3);
      expect(result).toBe(5);
    });
  });

  describe('Export Functionality', () => {
    test('should export errors as JSON', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      errorTracker.trackError('Module1', 'action1', {});
      errorTracker.trackError('Module2', 'action2', {}, new Error('test'));

      const exported = errorTracker.exportErrors();
      expect(exported).toBeDefined();

      const parsed = JSON.parse(exported);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);

      consoleErrorSpy.mockRestore();
    });
  });
});
