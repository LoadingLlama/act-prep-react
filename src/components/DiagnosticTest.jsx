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
      zIndex: 2000
    }}>
      {/* Iframe to load the comprehensive HTML diagnostic test */}
      <iframe
        src="/tests/diagnostic-test.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'white'
        }}
        title="ACT Diagnostic Test"
      />
    </div>
  );
};

export default DiagnosticTest;
