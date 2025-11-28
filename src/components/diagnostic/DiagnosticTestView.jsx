/**
 * Diagnostic Test View Component
 * Renders the actual test iframe with optional countdown overlay
 */

import React from 'react';

/**
 * Diagnostic Test View
 * @param {object} iframeRef - React ref for the iframe
 * @param {boolean} showCountdown - Whether to show countdown overlay
 * @param {number} countdown - Countdown value
 * @param {boolean} show - Whether to show this view
 */
const DiagnosticTestView = ({
  iframeRef,
  showCountdown,
  countdown,
  show
}) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'white',
      zIndex: 2000
    }}>
      <iframe
        ref={iframeRef}
        key="diagnostic-test"
        src="/tests/practice-test.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'white'
        }}
        title="ACT Diagnostic Test"
      />
      {showCountdown && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          zIndex: 2001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '8rem',
              fontWeight: '700',
              color: '#08245b',
              marginBottom: '1rem'
            }}>
              {countdown}
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#6b7280',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Starting Test...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticTestView;
