/**
 * ExampleModal Component
 * Displays an example in a centered modal with blurred backdrop
 * User must complete the example to close the modal and proceed
 * Uses React Portal to render at document.body level for proper positioning
 */

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ExampleCard from './ExampleCard';

const ExampleModal = ({ example, position, isOpen, onComplete, typingSpeed }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop with blur effect */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflowY: 'auto'
      }}
      onClick={onComplete} // Click backdrop to close
      >
        {/* Close X button - positioned outside modal in top-right of screen */}
        <button
          onClick={onComplete}
          style={{
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#9ca3af',
            fontSize: '1.5rem',
            fontWeight: '300',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            lineHeight: '1',
            padding: '0',
            zIndex: 10000,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            e.target.style.color = '#374151';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.target.style.color = '#9ca3af';
            e.target.style.transform = 'scale(1)';
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Container */}
        <div
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            maxWidth: '1200px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.5rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            margin: 'auto',
            animation: 'modalFadeIn 0.2s ease-out'
          }}
        >
          {/* ExampleCard - removed onComplete prop to prevent auto-closing */}
          <ExampleCard
            example={example}
            position={position}
            isCurrentSection={true}
            typingSpeed={typingSpeed}
          />
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );

  // Use portal to render modal at document.body level
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ExampleModal;
