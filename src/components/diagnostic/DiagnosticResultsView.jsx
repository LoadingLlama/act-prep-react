/**
 * Diagnostic Results View Component
 * Displays the "Your Personalized Learning Path is Ready!" view
 * after diagnostic test processing is complete
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';
import { usePracticeTestStyles } from '../../styles/pages/practice-test.styles';

/**
 * Diagnostic Results View
 * @param {object} analysisData - Analysis results from diagnostic test
 * @param {object} userGoalsData - User's goals and preferences
 * @param {object} onboardingData - Onboarding form data
 * @param {function} setShowInsights - Callback to show detailed insights
 * @param {boolean} show - Whether to show this view
 */
const DiagnosticResultsView = ({
  analysisData,
  userGoalsData,
  onboardingData,
  setShowInsights,
  show
}) => {
  const classes = usePracticeTestStyles();
  const navigate = useNavigate();

  if (!show || !analysisData) return null;

  const handleClose = () => {
    // Navigate back to home/dashboard
    navigate('/app');
  };

  const weeksUntilExam = userGoalsData?.target_exam_date
    ? Math.ceil((new Date(userGoalsData.target_exam_date) - new Date()) / (1000 * 60 * 60 * 24 * 7))
    : 12; // Default to 12 weeks

  const isDefaultTimeline = !onboardingData?.target_exam_date;

  return (
    <div className={classes.container}>
      {/* Close Button */}
      <button
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          background: '#f3f4f6',
          border: 'none',
          borderRadius: '8px',
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#374151',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          transition: 'all 0.15s ease',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#e5e7eb';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#f3f4f6';
        }}
      >
        <HiXMark style={{ fontSize: '1.125rem' }} />
        Close
      </button>

      <div style={{
        padding: '1.5rem 1.5rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            margin: '0 auto 0.75rem',
            background: '#dcfce7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Your Personalized Learning Path is Ready!
          </h2>

          <p style={{
            fontSize: '0.9375rem',
            color: '#6b7280',
            lineHeight: '1.4'
          }}>
            We've created a custom study plan based on your diagnostic test results.
          </p>
        </div>

        {/* Score Overview */}
        <div style={{
          background: 'linear-gradient(135deg, #08245b 0%, #0a2f6e 100%)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', opacity: 0.9, marginBottom: '0.5rem' }}>
              Your Estimated ACT Composite Score
            </div>
            <div style={{ fontSize: '3rem', fontWeight: '700' }}>
              {analysisData.overall_score || 0}
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              out of 36
            </div>
          </div>

          {/* Section Scores */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            fontSize: '0.875rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ opacity: 0.9, marginBottom: '0.25rem' }}>English</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                {analysisData.english_score || 0}
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ opacity: 0.9, marginBottom: '0.25rem' }}>Math</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                {analysisData.math_score || 0}
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ opacity: 0.9, marginBottom: '0.25rem' }}>Reading</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                {analysisData.reading_score || 0}
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ opacity: 0.9, marginBottom: '0.25rem' }}>Science</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                {analysisData.science_score || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Study Plan Overview */}
        <div style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '1rem'
          }}>
            Your Study Plan
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {/* Study Duration */}
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Study Duration
              </div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#08245b'
              }}>
                {weeksUntilExam} weeks
              </div>
              {isDefaultTimeline && (
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                  Default timeline
                </div>
              )}
            </div>

            {/* Target Score */}
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Target Score
              </div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#08245b'
              }}>
                {userGoalsData?.target_score || analysisData.target_score || 28}
              </div>
            </div>

            {/* Study Time */}
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Daily Study Time
              </div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#08245b'
              }}>
                {analysisData.daily_minutes || userGoalsData?.daily_study_minutes || 30} min
              </div>
            </div>

            {/* Focus Areas */}
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Focus Areas
              </div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#08245b'
              }}>
                {analysisData.weak_lessons?.length || 0} topics
              </div>
            </div>
          </div>

          {/* Weak Areas Preview */}
          {analysisData.weak_lessons && analysisData.weak_lessons.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Priority Topics to Master
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {analysisData.weak_lessons.slice(0, 5).map((lesson, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}
                  >
                    {lesson.lesson_title}
                  </div>
                ))}
                {analysisData.weak_lessons.length > 5 && (
                  <div style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    color: '#6b7280'
                  }}>
                    +{analysisData.weak_lessons.length - 5} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* View Results Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/app/insights')}
            style={{
              background: '#08245b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.75rem 1.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 3px 0 0 rgba(8, 36, 91, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#061a3d';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 0 0 rgba(8, 36, 91, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#08245b';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 3px 0 0 rgba(8, 36, 91, 0.25)';
            }}
          >
            View Detailed Results & Insights
          </button>

          <div style={{
            marginTop: '0.75rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            See your question-by-question breakdown, strengths, and personalized recommendations
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResultsView;
