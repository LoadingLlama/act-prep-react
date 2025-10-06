import React from 'react';

const DiagnosticTest = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'white',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with close button */}
      <div style={{
        background: '#f8f9fa',
        borderBottom: '1px solid #e9ecef',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#1a1a1a' }}>
          ACT Diagnostic Test
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#666',
            padding: '0.25rem'
          }}
        >
          ✕
        </button>
      </div>

      {/* Iframe to load the comprehensive HTML diagnostic test */}
      <iframe
        src="/tests/diagnostic-test.html"
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
          background: 'white'
        }}
        title="ACT Diagnostic Test"
      />
    </div>
  );
};

export default DiagnosticTest;
