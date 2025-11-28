/**
 * Diagnostic Onboarding Form Component
 * Collects user study preferences before the diagnostic test
 * Includes flexible scheduling, alternating weeks, and study commitment tiers
 */

import React, { useState } from 'react';
import { HiXMark, HiArrowRight } from 'react-icons/hi2';
import { usePracticeTestStyles } from '../../styles/pages/practice-test.styles';

/**
 * Tooltip Component (internal)
 */
const Tooltip = ({ text, id, hoveredTooltip, setHoveredTooltip }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      marginLeft: '0.5rem'
    }}
    onMouseEnter={() => setHoveredTooltip(id)}
    onMouseLeave={() => setHoveredTooltip(null)}
  >
    <div style={{
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: '#3b82f6',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: '600',
      cursor: 'help'
    }}>
      ?
    </div>
    {hoveredTooltip === id && (
      <div style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '0.5rem',
        padding: '0.5rem 0.75rem',
        background: '#3b82f6',
        color: 'white',
        borderRadius: '6px',
        fontSize: '0.75rem',
        lineHeight: '1.3',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
        zIndex: 1000
      }}>
        {text}
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid #3b82f6'
        }} />
      </div>
    )}
  </div>
);

/**
 * Diagnostic Onboarding Form
 * @param {object} onboardingData - Form data object
 * @param {function} setOnboardingData - Form data setter
 * @param {function} saveOnboardingData - Save and proceed callback
 * @param {function} onClose - Close callback
 * @param {boolean} show - Whether to show the form
 */
const DiagnosticOnboardingForm = ({
  onboardingData,
  setOnboardingData,
  saveOnboardingData,
  onClose,
  show
}) => {
  const classes = usePracticeTestStyles();
  const [hoveredTooltip, setHoveredTooltip] = useState(null);

  if (!show) return null;

  return (
    <div className={classes.container} style={{ overflow: 'hidden', height: '100vh' }}>
      <button onClick={onClose} className={classes.closeButton}>
        <HiXMark style={{ fontSize: '1.125rem' }} />
        Close
      </button>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        height: '100vh',
        overflow: 'auto'
      }}>
        <div style={{
          width: '100%',
          background: 'transparent'
        }}>
          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>
              Personalize Your Study Plan
            </h1>
            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              lineHeight: '1.5',
              maxWidth: '600px',
              margin: '0 0 0.5rem'
            }}>
              Build a flexible study schedule that works for your life.
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: '#9ca3af',
              fontStyle: 'italic'
            }}>
              These settings are flexible and can be adjusted anytime from your profile.
            </p>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              {/* Target Test Date */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Test Date
                </label>
                <input
                  type="date"
                  value={onboardingData.target_exam_date}
                  onChange={(e) => setOnboardingData({ ...onboardingData, target_exam_date: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                />
              </div>

              {/* Current Score */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Current ACT Score
                </label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  placeholder="Leave blank if not taken"
                  value={onboardingData.current_score}
                  onChange={(e) => setOnboardingData({ ...onboardingData, current_score: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                />
              </div>

              {/* Target Score */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Target ACT Score
                </label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  value={onboardingData.target_score}
                  onChange={(e) => setOnboardingData({ ...onboardingData, target_score: parseInt(e.target.value) || 28 })}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                />
              </div>
            </div>

          {/* Daily Study Hours - Full Width */}
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                Daily Study Hours
                <Tooltip id="daily-study-hours" text="Customize your study schedule—set different hours for each day, rest days, or alternate weeks." hoveredTooltip={hoveredTooltip} setHoveredTooltip={setHoveredTooltip} />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={onboardingData.use_alternating_weeks}
                  onChange={(e) => setOnboardingData({ ...onboardingData, use_alternating_weeks: e.target.checked })}
                  style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                />
                Use alternating weeks
              </label>
            </div>

            {/* Week 1 Schedule */}
            <div style={{ marginBottom: onboardingData.use_alternating_weeks ? '1rem' : '0' }}>
              {onboardingData.use_alternating_weeks && (
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Week 1 Schedule
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <div key={day}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem', display: 'block', textTransform: 'capitalize' }}>
                      {day.slice(0, 3)}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="8"
                      step="0.25"
                      value={onboardingData.study_hours?.[day] || 0}
                      onChange={(e) => setOnboardingData({
                        ...onboardingData,
                        study_hours: { ...(onboardingData.study_hours || {}), [day]: parseFloat(e.target.value) || 0 }
                      })}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Week 2 Schedule (only shown if alternating weeks is enabled) */}
            {onboardingData.use_alternating_weeks && (
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>
                  Week 2 Schedule
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                    <div key={day}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem', display: 'block', textTransform: 'capitalize' }}>
                        {day.slice(0, 3)}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="8"
                        step="0.25"
                        value={onboardingData.study_hours_week2?.[day] || 0}
                        onChange={(e) => setOnboardingData({
                          ...onboardingData,
                          study_hours_week2: { ...(onboardingData.study_hours_week2 || {}), [day]: parseFloat(e.target.value) || 0 }
                        })}
                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem 2rem', marginTop: '1.5rem' }}>
            {/* Weekly Review Day */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Weekly Review Day
                <Tooltip id="review-day" text="Day you'll review your full practice exam results and mistakes." hoveredTooltip={hoveredTooltip} setHoveredTooltip={setHoveredTooltip} />
              </label>
              <select
                value={onboardingData.review_day}
                onChange={(e) => setOnboardingData({ ...onboardingData, review_day: e.target.value })}
                style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', background: 'white' }}
              >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>

            {/* Mock Exam Day */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                Mock Exam Day
                <Tooltip id="mock-exam-day" text="Day you'll take a full-length practice test each week." hoveredTooltip={hoveredTooltip} setHoveredTooltip={setHoveredTooltip} />
              </label>
              <select
                value={onboardingData.mock_exam_day}
                onChange={(e) => setOnboardingData({ ...onboardingData, mock_exam_day: e.target.value })}
                style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', background: 'white' }}
              >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>
          </div>

          {/* Weekly Study Commitment */}
          {(() => {
            const practiceTestHours = 3;
            const reviewHours = 2;
            const regularStudyHours = Object.values(onboardingData.study_hours).reduce((sum, hours) => sum + (hours || 0), 0);
            const week1TotalHours = regularStudyHours + practiceTestHours + reviewHours;

            let totalWeeklyHours = week1TotalHours;
            if (onboardingData.use_alternating_weeks) {
              const studyHoursWeek2 = onboardingData.study_hours_week2 || {};
              const regularStudyHoursWeek2 = Object.values(studyHoursWeek2).reduce((sum, hours) => sum + (hours || 0), 0);
              const week2TotalHours = regularStudyHoursWeek2 + practiceTestHours + reviewHours;
              totalWeeklyHours = (week1TotalHours + week2TotalHours) / 2;
            }

            const selectedTier = onboardingData.weekly_hours_tier || 'moderate';
            const tierRanges = {
              'light': { min: 1, max: 5, label: '1-5 hours/week' },
              'moderate': { min: 5, max: 10, label: '5-10 hours/week' },
              'intensive': { min: 10, max: 15, label: '10-15 hours/week' },
              'extreme': { min: 15, max: 100, label: '15+ hours/week' }
            };

            const range = tierRanges[selectedTier];
            const hoursMismatch = totalWeeklyHours < range.min || totalWeeklyHours > range.max;

            return (
              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Weekly Study Commitment
                </label>
                <select
                  value={onboardingData.weekly_hours_tier}
                  onChange={(e) => setOnboardingData({ ...onboardingData, weekly_hours_tier: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    border: hoursMismatch ? '1px solid #ef4444' : '1px solid #d1d5db',
                    borderLeft: hoursMismatch ? '3px solid #ef4444' : '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    background: 'white'
                  }}
                >
                  <option value="light" disabled={totalWeeklyHours > 8}>Light (5-8 hours/week)</option>
                  <option value="moderate" disabled={totalWeeklyHours < 8 || totalWeeklyHours > 12}>Moderate (8-12 hours/week)</option>
                  <option value="intensive" disabled={totalWeeklyHours < 12 || totalWeeklyHours > 17}>Intensive (12-17 hours/week)</option>
                  <option value="extreme" disabled={totalWeeklyHours < 17}>Extreme (17+ hours/week)</option>
                </select>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  {onboardingData.use_alternating_weeks
                    ? `Average: ${totalWeeklyHours.toFixed(1)}h/week (both weeks include 3h practice test + 2h review)`
                    : `Total: ${totalWeeklyHours.toFixed(1)}h/week (includes 3h practice test + 2h review)`
                  }
                </p>
                {hoursMismatch && (
                  <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem', fontWeight: '500' }}>
                    Your {onboardingData.use_alternating_weeks ? 'average' : 'total'} hours ({totalWeeklyHours.toFixed(1)}h/week) don't match {selectedTier.toUpperCase()} ({range.label})
                  </p>
                )}
              </div>
            );
          })()}

        </div>

        <div style={{ textAlign: 'right', marginTop: '2.5rem' }}>
          <button
            onClick={saveOnboardingData}
            style={{
              background: '#b91c1c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#991b1b';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#b91c1c';
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Continue to Diagnostic Test
              <HiArrowRight style={{ fontSize: '1rem' }} />
            </span>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DiagnosticOnboardingForm;
