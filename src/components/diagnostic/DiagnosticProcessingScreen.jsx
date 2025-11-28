/**
 * Diagnostic Processing Screen Component
 * Shows progress while analyzing test results
 */

import React from 'react';

/**
 * Diagnostic Processing Screen
 * @param {boolean} show - Whether to show this screen
 * @param {string} processingStep - Current processing step message
 * @param {number} processingProgress - Progress percentage (0-100)
 */
const DiagnosticProcessingScreen = ({
  show,
  processingStep,
  processingProgress
}) => {
  if (!show) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'transparent'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          border: '4px solid #fee2e2',
          borderTop: '4px solid #dc2626',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '2rem'
        }} />

        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#1a1a1a',
          marginBottom: '0.5rem'
        }}>
          Analyzing Your Results
        </h2>

        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          marginBottom: '2rem',
          maxWidth: '500px'
        }}>
          {processingStep}
        </p>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          maxWidth: '400px',
          height: '8px',
          background: '#f3f4f6',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #b91c1c 0%, #dc2626 100%)',
            width: `${processingProgress}%`,
            transition: 'width 0.5s ease'
          }} />
        </div>

        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          marginTop: '2rem',
          fontStyle: 'italic'
        }}>
          Please don't close this window...
        </p>
      </div>
    </div>
  );
};

export default DiagnosticProcessingScreen;
