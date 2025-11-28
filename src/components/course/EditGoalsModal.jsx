/**
 * Edit Goals Modal Component
 * Allows users to edit their study plan settings including exam date, scores,
 * weekly study hours, alternating weeks, and special days
 */

import React from 'react';

/**
 * Edit Goals Modal
 * @param {boolean} isOpen - Whether modal is visible
 * @param {function} onClose - Close modal callback
 * @param {object} editForm - Form state object
 * @param {function} setEditForm - Form state setter
 * @param {function} saveUserGoals - Save function
 * @param {boolean} savingGoals - Save in progress flag
 * @param {object|null} validationError - Validation error object
 * @param {function} setValidationError - Validation error setter
 * @param {boolean} saveButtonShake - Shake animation flag
 */
const EditGoalsModal = ({
  isOpen,
  onClose,
  editForm,
  setEditForm,
  saveUserGoals,
  savingGoals,
  validationError,
  setValidationError,
  saveButtonShake
}) => {
  if (!isOpen) return null;

  // Real-time validation calculations
  const studyHours = editForm.study_hours || {};
  const regularStudyHours = Object.values(studyHours).reduce((sum, hours) => sum + (hours || 0), 0);
  const practiceTestHours = 3; // Guaranteed 3 hours for practice test
  const reviewHours = 2; // Guaranteed 2 hours for review
  const week1TotalHours = regularStudyHours + practiceTestHours + reviewHours;

  // Calculate Week 2 hours if alternating weeks is enabled
  let totalWeeklyHours = week1TotalHours;
  if (editForm.use_alternating_weeks) {
    const studyHoursWeek2 = editForm.study_hours_week2 || {};
    const regularStudyHoursWeek2 = Object.values(studyHoursWeek2).reduce((sum, hours) => sum + (hours || 0), 0);
    const week2TotalHours = regularStudyHoursWeek2 + practiceTestHours + reviewHours;
    // Average of both weeks
    totalWeeklyHours = (week1TotalHours + week2TotalHours) / 2;
  }

  const selectedTier = editForm.weekly_hours_tier || 'moderate';

  const tierRanges = {
    'light': { min: 1, max: 5, label: '1-5 hours/week' },
    'moderate': { min: 5, max: 10, label: '5-10 hours/week' },
    'intensive': { min: 10, max: 15, label: '10-15 hours/week' },
    'extreme': { min: 15, max: 100, label: '15+ hours/week' }
  };

  const range = tierRanges[selectedTier];
  const hoursMismatch = totalWeeklyHours < range.min || totalWeeklyHours > range.max;

  const reviewDay = editForm.review_day || 'sunday';
  const mockExamDay = editForm.mock_exam_day || 'saturday';
  const dayConflict = reviewDay === mockExamDay;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '1.5rem',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: '600', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          Edit Study Plan
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Basic Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Exam Date
              </label>
              <input
                type="date"
                value={editForm.target_exam_date}
                onChange={(e) => setEditForm({ ...editForm, target_exam_date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '0.8125rem',
                  outline: 'none',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  color: '#111'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Current Score
              </label>
              <input
                type="number"
                min="1"
                max="36"
                placeholder="Optional"
                value={editForm.current_score}
                onChange={(e) => setEditForm({ ...editForm, current_score: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '0.8125rem',
                  outline: 'none',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  color: '#111'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Target Score
              </label>
              <input
                type="number"
                min="1"
                max="36"
                value={editForm.target_score}
                onChange={(e) => setEditForm({ ...editForm, target_score: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '0.8125rem',
                  outline: 'none',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  color: '#111'
                }}
              />
            </div>
          </div>

          {/* Alternating Weeks */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', cursor: 'pointer', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <input
              type="checkbox"
              checked={editForm.use_alternating_weeks}
              onChange={(e) => setEditForm({ ...editForm, use_alternating_weeks: e.target.checked })}
              style={{ cursor: 'pointer' }}
            />
            <span>Alternating Weeks</span>
          </label>

          {/* Week 1 Schedule */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Week 1
              </label>
              <span style={{ fontSize: '0.75rem', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                {(() => {
                  const studyHoursTotal = Object.values(editForm.study_hours).reduce((sum, hours) => sum + (hours || 0), 0);
                  return (studyHoursTotal + 5).toFixed(1);
                })()}h total
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                const isMockExamDay = day === (editForm.mock_exam_day || 'saturday');
                const isReviewDay = day === (editForm.review_day || 'sunday');
                return (
                  <div key={day}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.6875rem',
                      fontWeight: '500',
                      color: '#111',
                      marginBottom: '0.25rem',
                      textTransform: 'capitalize',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      {day.slice(0, 3)}
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="12"
                      value={isMockExamDay ? 3 : isReviewDay ? 2 : (editForm.study_hours[day] || 0)}
                      disabled={isMockExamDay || isReviewDay}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        study_hours: {
                          ...editForm.study_hours,
                          [day]: parseFloat(e.target.value) || 0
                        }
                      })}
                      style={{
                        width: '100%',
                        padding: '0.375rem',
                        border: 'none',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.8125rem',
                        textAlign: 'center',
                        background: 'transparent',
                        outline: 'none',
                        cursor: (isMockExamDay || isReviewDay) ? 'not-allowed' : 'text',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        color: '#111'
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Week 2 Schedule (only if alternating weeks is checked) */}
          {editForm.use_alternating_weeks && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  Week 2
                </label>
                <span style={{ fontSize: '0.75rem', color: '#111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  {(() => {
                    const studyHoursTotal = Object.values(editForm.study_hours_week2).reduce((sum, hours) => sum + (hours || 0), 0);
                    return (studyHoursTotal + 5).toFixed(1);
                  })()}h total
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                  const isMockExamDay = day === (editForm.mock_exam_day || 'saturday');
                  const isReviewDay = day === (editForm.review_day || 'sunday');
                  return (
                    <div key={day}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.6875rem',
                        fontWeight: '500',
                        color: '#111',
                        marginBottom: '0.25rem',
                        textTransform: 'capitalize',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>
                        {day.slice(0, 3)}
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="12"
                        value={isMockExamDay ? 3 : isReviewDay ? 2 : (editForm.study_hours_week2[day] || 0)}
                        disabled={isMockExamDay || isReviewDay}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          study_hours_week2: {
                            ...editForm.study_hours_week2,
                            [day]: parseFloat(e.target.value) || 0
                          }
                        })}
                        style={{
                          width: '100%',
                          padding: '0.375rem',
                          border: 'none',
                          borderBottom: '1px solid #e0e0e0',
                          fontSize: '0.8125rem',
                          textAlign: 'center',
                          background: 'transparent',
                          outline: 'none',
                          cursor: (isMockExamDay || isReviewDay) ? 'not-allowed' : 'text',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          color: '#111'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Days Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {/* Mock Exam Day */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Mock Exam Day
              </label>
              <select
                value={editForm.mock_exam_day}
                onChange={(e) => setEditForm({ ...editForm, mock_exam_day: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '0.8125rem',
                  background: 'transparent',
                  outline: 'none',
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  color: '#111'
                }}
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>

            {/* Review Day */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Review Day
              </label>
              <select
                value={editForm.review_day}
                onChange={(e) => setEditForm({ ...editForm, review_day: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '0.8125rem',
                  background: 'transparent',
                  outline: 'none',
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  color: '#111'
                }}
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
          </div>
          {dayConflict && (
            <p style={{ fontSize: '0.6875rem', color: '#ef4444', marginTop: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Days cannot be the same
            </p>
          )}

          {/* Weekly Hours Tier */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#111', marginBottom: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Study Commitment
            </label>
            <select
              value={editForm.weekly_hours_tier}
              onChange={(e) => setEditForm({ ...editForm, weekly_hours_tier: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '0.8125rem',
                background: 'transparent',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: '#111'
              }}
            >
              <option value="light" disabled={totalWeeklyHours > 5}>Light (1-5h/week)</option>
              <option value="moderate" disabled={totalWeeklyHours < 5 || totalWeeklyHours > 10}>Moderate (5-10h/week)</option>
              <option value="intensive" disabled={totalWeeklyHours < 10 || totalWeeklyHours > 15}>Intensive (10-15h/week)</option>
              <option value="extreme" disabled={totalWeeklyHours < 15}>Extreme (15+h/week)</option>
            </select>
            {hoursMismatch && (
              <p style={{ fontSize: '0.6875rem', color: '#ef4444', marginTop: '0.25rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Hours mismatch ({totalWeeklyHours.toFixed(1)}h)
              </p>
            )}
          </div>
        </div>

        {/* Save Error Display */}
        {validationError && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#fef2f2',
            borderRadius: '4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '500', color: '#dc2626', marginBottom: '0.25rem' }}>
                  {validationError.title}
                </p>
                <p style={{ margin: 0, fontSize: '0.6875rem', color: '#991b1b' }}>
                  {validationError.message}
                </p>
                {validationError.suggestions && (
                  <ul style={{ margin: '0.25rem 0 0 1rem', paddingLeft: 0, fontSize: '0.6875rem', color: '#991b1b' }}>
                    {validationError.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={() => setValidationError(null)}
                style={{
                  padding: '0.125rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#991b1b',
                  fontSize: '1rem',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
          <button
            onClick={onClose}
            disabled={savingGoals}
            style={{
              flex: 1,
              padding: '0.625rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              background: 'white',
              color: '#111',
              fontSize: '0.8125rem',
              fontWeight: '500',
              cursor: savingGoals ? 'not-allowed' : 'pointer',
              opacity: savingGoals ? 0.5 : 1,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)'
            }}
          >
            Cancel
          </button>
          <button
            onClick={saveUserGoals}
            disabled={savingGoals}
            style={{
              flex: 1,
              padding: '0.625rem',
              border: 'none',
              borderRadius: '8px',
              background: savingGoals ? '#9ca3af' : '#1a1a1a',
              color: 'white',
              fontSize: '0.8125rem',
              fontWeight: '500',
              cursor: savingGoals ? 'not-allowed' : 'pointer',
              opacity: savingGoals ? 0.7 : 1,
              animation: saveButtonShake ? 'shake 0.5s' : 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              boxShadow: savingGoals ? '0 3px 0 0 rgba(0, 0, 0, 0.05)' : '0 3px 0 0 rgba(26, 26, 26, 0.25)'
            }}
          >
            {savingGoals ? 'Saving...' : 'Save'}
          </button>
        </div>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default EditGoalsModal;
