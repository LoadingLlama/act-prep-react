/**
 * Unit Tests for Logger
 */

import logger, { LOG_LEVELS } from '../../services/logging/logger';

describe('Logger', () => {
  beforeEach(() => {
    logger.setLevel('DEBUG'); // Enable all logs for testing
    logger.clearLogs(); // Clear after setLevel to avoid test interference
  });

  describe('Basic Logging', () => {
    test('should log info messages', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      logger.info('TestModule', 'testAction', { key: 'value' });

      expect(consoleLogSpy).toHaveBeenCalled();
      const logs = logger.getRecentLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('INFO');
      expect(logs[0].module).toBe('TestModule');
      expect(logs[0].action).toBe('testAction');

      consoleLogSpy.mockRestore();
    });

    test('should log error messages with error object', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Test error');

      logger.error('TestModule', 'testAction', { key: 'value' }, error);

      expect(consoleErrorSpy).toHaveBeenCalled();
      const logs = logger.getRecentLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].level).toBe('ERROR');
      expect(logs[0].error).toBeDefined();
      expect(logs[0].error.message).toBe('Test error');

      consoleErrorSpy.mockRestore();
    });

    test('should log warn messages', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      logger.warn('TestModule', 'testAction', { key: 'value' });

      expect(consoleWarnSpy).toHaveBeenCalled();
      const logs = logger.getRecentLogs();
      expect(logs[0].level).toBe('WARN');

      consoleWarnSpy.mockRestore();
    });

    test('should log debug messages', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      logger.debug('TestModule', 'testAction', { key: 'value' });

      expect(consoleLogSpy).toHaveBeenCalled();
      const logs = logger.getRecentLogs();
      expect(logs[0].level).toBe('DEBUG');

      consoleLogSpy.mockRestore();
    });
  });

  describe('Log Level Filtering', () => {
    test('should not log debug when level is INFO', () => {
      logger.setLevel('INFO');
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      logger.debug('TestModule', 'testAction', {});

      expect(consoleLogSpy).not.toHaveBeenCalled();

      consoleLogSpy.mockRestore();
    });

    test('should log info when level is INFO', () => {
      logger.setLevel('INFO');
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      logger.info('TestModule', 'testAction', {});

      expect(consoleLogSpy).toHaveBeenCalled();

      consoleLogSpy.mockRestore();
    });

    test('should log error regardless of level', () => {
      logger.setLevel('ERROR');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      logger.error('TestModule', 'testAction', {}, new Error('test'));

      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Log Storage', () => {
    test('should store logs in memory', () => {
      logger.info('Module1', 'action1', {});
      logger.warn('Module2', 'action2', {});
      logger.error('Module3', 'action3', {}, new Error('test'));

      const logs = logger.getRecentLogs();
      expect(logs).toHaveLength(3);
    });

    test('should limit stored logs to max count', () => {
      // Override max for testing
      const originalMax = logger.maxStoredLogs;
      logger.maxStoredLogs = 5;

      for (let i = 0; i < 10; i++) {
        logger.info('TestModule', `action${i}`, {});
      }

      const logs = logger.getRecentLogs();
      expect(logs.length).toBeLessThanOrEqual(5);

      logger.maxStoredLogs = originalMax;
    });

    test('should filter logs by level', () => {
      logger.info('Module1', 'action1', {});
      logger.error('Module2', 'action2', {}, new Error('test'));
      logger.warn('Module3', 'action3', {});
      logger.error('Module4', 'action4', {}, new Error('test2'));

      const errorLogs = logger.getLogsByLevel('ERROR');
      expect(errorLogs).toHaveLength(2);
      errorLogs.forEach((log) => {
        expect(log.level).toBe('ERROR');
      });
    });

    test('should filter logs by module', () => {
      logger.info('Module1', 'action1', {});
      logger.info('Module2', 'action2', {});
      logger.info('Module1', 'action3', {});

      const module1Logs = logger.getLogsByModule('Module1');
      expect(module1Logs).toHaveLength(2);
      module1Logs.forEach((log) => {
        expect(log.module).toBe('Module1');
      });
    });

    test('should clear all logs', () => {
      logger.info('Module1', 'action1', {});
      logger.info('Module2', 'action2', {});

      logger.clearLogs();

      const logs = logger.getRecentLogs();
      expect(logs).toHaveLength(0);
    });
  });

  describe('Log Format', () => {
    test('should include timestamp', () => {
      logger.info('TestModule', 'testAction', {});

      const logs = logger.getRecentLogs();
      expect(logs[0].timestamp).toBeDefined();
      expect(new Date(logs[0].timestamp)).toBeInstanceOf(Date);
    });

    test('should include sessionId', () => {
      logger.info('TestModule', 'testAction', {});

      const logs = logger.getRecentLogs();
      expect(logs[0].sessionId).toBeDefined();
      expect(logs[0].sessionId).toMatch(/^session-/);
    });

    test('should include context', () => {
      const context = { userId: '123', action: 'login' };
      logger.info('TestModule', 'testAction', context);

      const logs = logger.getRecentLogs();
      expect(logs[0].context).toEqual(context);
    });
  });

  describe('Export Functionality', () => {
    test('should export logs as JSON', () => {
      logger.info('Module1', 'action1', { key: 'value' });
      logger.error('Module2', 'action2', {}, new Error('test'));

      const exported = logger.exportLogs();
      expect(exported).toBeDefined();

      const parsed = JSON.parse(exported);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);
    });
  });
});
