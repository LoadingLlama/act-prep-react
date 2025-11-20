/**
 * Goals Settings Component
 * Allows users to view and edit their ACT prep goals
 * These goals are used to generate and adjust their learning path
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/api/supabase.service';
import logger from '../services/logging/logger';
import { HiAcademicCap, HiCalendar, HiCheckCircle, HiXCircle, HiQuestionMarkCircle } from 'react-icons/hi2';

// Tooltip component
const Tooltip = ({ id, text }) => (
  <span style={{ position: 'relative', display: 'inline-flex', marginLeft: '0.25rem' }}>
    <HiQuestionMarkCircle
      style={{
        fontSize: '1rem',
        color: '#9ca3af',
        cursor: 'help'
      }}
      title={text}
    />
  </span>
);

const GoalsSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [goals, setGoals] = useState({
    target_exam_date: '',
    current_score: '',
    target_score: '',
    study_hours: {
      monday: 0.75,
      tuesday: 1,
      wednesday: 0,
      thursday: 0.75,
      friday: 1,
      saturday: 2,
      sunday: 2
    },
    study_hours_week2: {
      monday: 0.75,
      tuesday: 1,
      wednesday: 0,
      thursday: 0.75,
      friday: 1,
      saturday: 2,
      sunday: 2
    },
    use_alternating_weeks: false,
    review_day: 'sunday',
    mock_exam_day: 'saturday'
  });

  useEffect(() => {
    loadGoals();
  }, [user]);

  const loadGoals = async () => {
    try {
      setLoading(true);
      logger.info('GoalsSettings', 'loadGoals', { userId: user.id });

      const { data, error } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setGoals({
          target_exam_date: data.target_exam_date || '',
          current_score: data.current_score || '',
          target_score: data.target_score || '',
          study_hours: data.study_hours || {
            monday: 0.75,
            tuesday: 1,
            wednesday: 0,
            thursday: 0.75,
            friday: 1,
            saturday: 2,
            sunday: 2
          },
          study_hours_week2: data.study_hours_week2 || {
            monday: 0.75,
            tuesday: 1,
            wednesday: 0,
            thursday: 0.75,
            friday: 1,
            saturday: 2,
            sunday: 2
          },
          use_alternating_weeks: data.use_alternating_weeks || false,
          review_day: data.review_day || 'sunday',
          mock_exam_day: data.mock_exam_day || 'saturday'
        });
      }

      setLoading(false);
    } catch (err) {
      console.error('Error loading goals:', err);
      setMessage({ type: 'error', text: 'Failed to load goals' });
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });

      logger.info('GoalsSettings', 'saveGoals', { userId: user.id });

      const { error } = await supabase
        .from('user_goals')
        .upsert({
          user_id: user.id,
          ...goals,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Goals saved successfully! Your learning path will be updated.' });
      logger.info('GoalsSettings', 'goalsSaved', { userId: user.id });
    } catch (err) {
      console.error('Error saving goals:', err);
      setMessage({ type: 'error', text: 'Failed to save goals. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setGoals(prev => ({ ...prev, [field]: value }));
  };

  const handleStudyHoursChange = (day, value, week = 1) => {
    const field = week === 1 ? 'study_hours' : 'study_hours_week2';
    setGoals(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [day]: parseFloat(value) || 0
      }
    }));
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1rem', color: '#6b7280' }}>Loading your goals...</div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '1.5rem',
        color: '#0f172a',
      }}>
        <HiAcademicCap size={24} />
        <div>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#0f172a',
            margin: '0 0 0.25rem 0',
            letterSpacing: '-0.01em',
          }}>
            Study Goals & Preferences
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: '#64748b',
            margin: 0,
          }}>
            Update your goals to personalize your learning path
          </p>
        </div>
      </div>

      {message.text && (
        <div style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
          border: `1px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {message.type === 'success' ? (
            <HiCheckCircle style={{ fontSize: '1.25rem', color: '#10b981' }} />
          ) : (
            <HiXCircle style={{ fontSize: '1.25rem', color: '#ef4444' }} />
          )}
          <span style={{
            fontSize: '0.875rem',
            color: message.type === 'success' ? '#065f46' : '#991b1b'
          }}>
            {message.text}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Test Date and Scores */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              <HiCalendar style={{ display: 'inline', marginRight: '0.25rem' }} />
              Test Date
            </label>
            <input
              type="date"
              value={goals.target_exam_date}
              onChange={(e) => handleChange('target_exam_date', e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Current ACT Score
            </label>
            <input
              type="number"
              min="1"
              max="36"
              value={goals.current_score}
              onChange={(e) => handleChange('current_score', e.target.value)}
              placeholder="Leave blank if not taken"
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              <HiAcademicCap style={{ display: 'inline', marginRight: '0.25rem' }} />
              Target ACT Score
            </label>
            <input
              type="number"
              min="1"
              max="36"
              value={goals.target_score}
              onChange={(e) => handleChange('target_score', e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.95rem'
              }}
            />
          </div>
        </div>

        {/* Daily Study Hours */}
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
              Daily Study Hours
              <Tooltip id="daily-study-hours" text="Customize your study schedule—set different hours for each day, rest days, or alternate weeks." />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={goals.use_alternating_weeks}
                onChange={(e) => handleChange('use_alternating_weeks', e.target.checked)}
                style={{ marginRight: '0.5rem', cursor: 'pointer' }}
              />
              Use alternating weeks
            </label>
          </div>

          {/* Week 1 Schedule */}
          <div style={{ marginBottom: goals.use_alternating_weeks ? '1rem' : '0' }}>
            {goals.use_alternating_weeks && (
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
                    value={goals.study_hours[day] || 0}
                    onChange={(e) => handleStudyHoursChange(day, e.target.value, 1)}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Week 2 Schedule */}
          {goals.use_alternating_weeks && (
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
                      value={goals.study_hours_week2[day] || 0}
                      onChange={(e) => handleStudyHoursChange(day, e.target.value, 2)}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Review Day and Mock Exam Day */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#10b981',
              marginBottom: '0.5rem'
            }}>
              <HiCheckCircle style={{ display: 'inline' }} />
              Weekly Review Day (2h)
            </label>
            <select
              value={goals.review_day}
              onChange={(e) => handleChange('review_day', e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '2px solid #10b981',
                fontSize: '0.95rem',
                backgroundColor: '#d1fae5',
                color: '#065f46',
                fontWeight: '400',
                cursor: 'pointer'
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
            <small style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem', display: 'block', fontWeight: '400' }}>
              Day you'll review your practice exam results
            </small>
          </div>

          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#3b82f6',
              marginBottom: '0.5rem'
            }}>
              🎯 Mock Exam Day (3h)
            </label>
            <select
              value={goals.mock_exam_day}
              onChange={(e) => handleChange('mock_exam_day', e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '2px solid #3b82f6',
                fontSize: '0.95rem',
                backgroundColor: '#eff6ff',
                color: '#1e40af',
                fontWeight: '400',
                cursor: 'pointer'
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
            <small style={{ fontSize: '0.75rem', color: '#2563eb', marginTop: '0.25rem', display: 'block', fontWeight: '400' }}>
              Day you'll take a full-length practice test
            </small>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: saving ? '#9ca3af' : '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!saving) e.target.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              if (!saving) e.target.style.backgroundColor = '#3b82f6';
            }}
          >
            {saving ? 'Saving...' : 'Save Goals'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsSettings;
