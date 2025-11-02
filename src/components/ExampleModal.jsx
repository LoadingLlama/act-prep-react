/**
 * ExampleModal Component
 * Displays an example in a centered modal with blurred backdrop
 * User can close at any time via X button or Continue button, marking example as complete
 * Uses React Portal to render at document.body level for proper positioning
 */

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ExampleCard from './ExampleCard';

const ExampleModal = ({ example, position, isOpen, onComplete, typingSpeed }) => {
  const [solutionViewed, setSolutionViewed] = useState(false);

  // Reset solutionViewed when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSolutionViewed(false);
    }
  }, [isOpen]);

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

  const handleClose = () => {
    // Always allow closing and mark as complete
    onComplete();
  };

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
      onClick={handleClose} // Click backdrop to close and mark as complete
      >
        {/* Close X button - positioned outside modal in top-right of screen */}
        <button
          onClick={handleClose}
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
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            opacity: 1
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
          title="Close and mark as complete"
        >
          ✕
        </button>

        {/* Modal Container - wrapper for content */}
        <div
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            maxWidth: '1200px',
            width: '90%',
            maxHeight: '90vh',
            position: 'relative',
            margin: 'auto',
            animation: 'modalFadeIn 0.2s ease-out',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Scrollable content area */}
          <div style={{
            overflowY: 'auto',
            padding: '2.5rem',
            flex: '1 1 auto'
          }}>
            {/* ExampleCard with callback when solution is viewed */}
            <ExampleCard
              example={example}
              position={position}
              isCurrentSection={true}
              typingSpeed={typingSpeed}
              onSolutionViewed={() => setSolutionViewed(true)}
            />
          </div>

          {/* Fixed Continue Button - always at bottom of modal */}
          {solutionViewed && (
            <div style={{
              flex: '0 0 auto',
              padding: '0.75rem 2.5rem',
              backgroundColor: 'rgba(249, 250, 251, 0.95)',
              borderTop: '1px solid #f3f4f6',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={onComplete}
                style={{
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  borderRadius: '4px',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.color = '#6b7280';
                }}
              >
                Continue
              </button>
            </div>
          )}
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
