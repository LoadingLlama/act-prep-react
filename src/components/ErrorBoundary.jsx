/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI instead of crashing the entire app
 */

import React from 'react';
import errorTracker from '../services/logging/errorTracker';
import logger from '../services/logging/logger';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to our error tracking service
    logger.error('ErrorBoundary', 'componentDidCatch', {
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    errorTracker.trackError(error, {
      context: 'ErrorBoundary',
      componentStack: errorInfo.componentStack,
      severity: 'critical'
    });

    // Store error details in state
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Reload the page to reset the app state
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Navigate to home page
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div style={styles.container}>
          <div style={styles.content}>
            <div style={styles.iconContainer}>
              <svg style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h1 style={styles.title}>Oops! Something went wrong</h1>

            <p style={styles.message}>
              We're sorry, but something unexpected happened. The error has been logged and we'll look into it.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details (Development Only)</summary>
                <div style={styles.errorDetails}>
                  <p style={styles.errorMessage}>
                    <strong>Error:</strong> {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre style={styles.stackTrace}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div style={styles.buttonContainer}>
              <button
                onClick={this.handleGoHome}
                style={{...styles.button, ...styles.primaryButton}}
              >
                Go to Home
              </button>
              <button
                onClick={this.handleReset}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                Reload Page
              </button>
            </div>

            <p style={styles.supportText}>
              If this problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  content: {
    maxWidth: '600px',
    width: '100%',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '3rem 2rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    textAlign: 'center'
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  icon: {
    width: '64px',
    height: '64px',
    color: '#ef4444'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1rem',
    letterSpacing: '-0.02em'
  },
  message: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '2rem',
    lineHeight: '1.6'
  },
  details: {
    textAlign: 'left',
    marginBottom: '2rem',
    background: '#f9fafb',
    borderRadius: '8px',
    padding: '1rem',
    border: '1px solid #e5e7eb'
  },
  summary: {
    cursor: 'pointer',
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.875rem',
    marginBottom: '0.5rem'
  },
  errorDetails: {
    marginTop: '1rem'
  },
  errorMessage: {
    fontSize: '0.875rem',
    color: '#ef4444',
    marginBottom: '1rem',
    wordBreak: 'break-word'
  },
  stackTrace: {
    fontSize: '0.75rem',
    color: '#6b7280',
    background: '#ffffff',
    padding: '1rem',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '200px',
    border: '1px solid #e5e7eb',
    fontFamily: 'Monaco, Consolas, monospace',
    lineHeight: '1.5'
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  },
  primaryButton: {
    background: '#08245b',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(8, 36, 91, 0.25)'
  },
  secondaryButton: {
    background: '#f1f5f9',
    color: '#64748b',
    border: '1px solid #e2e8f0'
  },
  supportText: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    margin: 0
  }
};

export default ErrorBoundary;
