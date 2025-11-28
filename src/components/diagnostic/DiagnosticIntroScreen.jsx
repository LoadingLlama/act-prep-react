/**
 * Diagnostic Intro Screen Component
 * Shows test information and structure before starting the diagnostic test
 */

import React from 'react';
import { HiXMark, HiArrowRight } from 'react-icons/hi2';
import { usePracticeTestStyles } from '../../styles/pages/practice-test.styles';

/**
 * Diagnostic Intro Screen
 * @param {boolean} show - Whether to show this screen
 * @param {function} onClose - Callback to close the diagnostic test
 * @param {boolean} confirmStart - Whether user has confirmed they want to start
 * @param {function} setConfirmStart - Set confirm start state
 * @param {function} setCountdown - Set countdown value
 * @param {function} setShowCountdown - Set show countdown state
 */
const DiagnosticIntroScreen = ({
  show,
  onClose,
  confirmStart,
  setConfirmStart,
  setCountdown,
  setShowCountdown
}) => {
  const classes = usePracticeTestStyles();

  if (!show) return null;

  return (
    <div className={classes.container} style={{ overflow: 'hidden', height: '100vh' }}>
      <button onClick={onClose} className={classes.closeButton}>
        <HiXMark style={{ fontSize: '1.125rem' }} />
        Close
      </button>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '1.5rem 1.5rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            ACT Diagnostic Test
          </h1>
          <p style={{
            fontSize: '0.95rem',
            color: '#6b7280',
            lineHeight: '1.5',
            margin: 0
          }}>
            Complete diagnostic assessment with 215 questions covering all four ACT sections to identify your strengths and areas for improvement.
          </p>
        </div>

        {/* Environment Warning */}
        <div style={{
          padding: '0.75rem 1rem',
          background: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '6px',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1rem', flexShrink: 0 }}>⚠️</span>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#92400e', marginBottom: '0.125rem' }}>
              Before You Begin
            </div>
            <div style={{ fontSize: '0.75rem', color: '#78350f', lineHeight: '1.3' }}>
              Ensure you're in a quiet environment with 3 hours available. Test must be completed in one sitting.
            </div>
          </div>
        </div>

        {/* Section Details */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>📝</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>English</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Grammar, punctuation, rhetorical skills</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1a1a1a' }}>75 questions</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>45 minutes</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🔢</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>Mathematics</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Algebra, geometry, trigonometry</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1a1a1a' }}>60 questions</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>60 minutes</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>📖</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>Reading</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Comprehension across 4 passages</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1a1a1a' }}>40 questions</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>35 minutes</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🔬</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>Science</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Scientific reasoning, data interpretation</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1a1a1a' }}>40 questions</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>35 minutes</div>
            </div>
          </div>
        </div>

        {/* Total Time */}
        <div style={{
          padding: '0.75rem 1rem',
          background: '#08245b',
          color: 'white',
          borderRadius: '8px',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Total Test Time</div>
          <div style={{ fontSize: '1.125rem', fontWeight: '700' }}>2 hours 55 minutes</div>
        </div>

        {/* Begin Button - Double Click Required */}
        <button
          onClick={() => {
            if (!confirmStart) {
              setConfirmStart(true);
            } else {
              setCountdown(3);
              setShowCountdown(true);
            }
          }}
          style={{
            background: confirmStart ? '#b91c1c' : '#08245b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.75rem 1.5rem',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = confirmStart ? '#991b1b' : '#061a3d';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = confirmStart ? '#b91c1c' : '#08245b';
          }}
        >
          {confirmStart ? (
            <>
              Click Again to Start Test
              <HiArrowRight style={{ fontSize: '1rem' }} />
            </>
          ) : (
            <>
              I'm Ready - Begin Test
              <HiArrowRight style={{ fontSize: '1rem' }} />
            </>
          )}
        </button>
        {confirmStart && (
          <p style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#6b7280',
            marginTop: '0.75rem',
            marginBottom: 0
          }}>
            Click the button again to confirm and start the test
          </p>
        )}
      </div>
    </div>
  );
};

export default DiagnosticIntroScreen;
