/**
 * Goals Settings Component
 * Allows users to view and edit their ACT prep goals
 * These goals are used to generate and adjust their learning path
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/api/supabase.service';
import logger from '../services/logging/logger';
import { HiAcademicCap, HiCalendar, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi2';

const GoalsSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [goals, setGoals] = useState({
    target_exam_date: '',
    current_score: '',
    target_score: '',
    daily_study_minutes: 30,
    study_days_per_week: 5,
    study_hours_per_week: 6,
    preferred_study_time: 'evening',
    learning_pace: 'moderate',
    reminder_frequency: 'daily',
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
          daily_study_minutes: data.daily_study_minutes || 30,
          study_days_per_week: data.study_days_per_week || 5,
          study_hours_per_week: data.study_hours_per_week || 6,
          preferred_study_time: data.preferred_study_time || 'evening',
          learning_pace: data.learning_pace || 'moderate',
          reminder_frequency: data.reminder_frequency || 'daily',
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

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1rem', color: '#6b7280' }}>Loading your goals...</div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <HiAcademicCap style={{ fontSize: '1.75rem', color: '#3b82f6' }} />
          Study Goals & Preferences
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Update your goals to personalize your learning path. Changes will be applied to future study sessions.
        </p>
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
        {/* Exam Date & Scores */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              <HiCalendar style={{ display: 'inline', marginRight: '0.25rem' }} />
              Target Exam Date
            </label>
            <input
              type="date"
              value={goals.target_exam_date}
              onChange={(e) => handleChange('target_exam_date', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Current Score
            </label>
            <input
              type="number"
              min="1"
              max="36"
              value={goals.current_score}
              onChange={(e) => handleChange('current_score', e.target.value)}
              placeholder="1-36"
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              <HiAcademicCap style={{ display: 'inline', marginRight: '0.25rem' }} />
              Target Score
            </label>
            <input
              type="number"
              min="1"
              max="36"
              value={goals.target_score}
              onChange={(e) => handleChange('target_score', e.target.value)}
              placeholder="1-36"
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        {/* Study Time */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              <HiClock style={{ display: 'inline', marginRight: '0.25rem' }} />
              Daily Study Minutes
            </label>
            <input
              type="number"
              min="15"
              max="480"
              step="15"
              value={goals.daily_study_minutes}
              onChange={(e) => handleChange('daily_study_minutes', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
              }}
            />
            <small style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem', display: 'block' }}>
              {Math.floor(goals.daily_study_minutes / 60)}h {goals.daily_study_minutes % 60}m per day
            </small>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Study Days Per Week
            </label>
            <select
              value={goals.study_days_per_week}
              onChange={(e) => handleChange('study_days_per_week', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
              }}
            >
              <option value="3">3 days</option>
              <option value="4">4 days</option>
              <option value="5">5 days</option>
              <option value="6">6 days</option>
              <option value="7">7 days</option>
            </select>
          </div>
        </div>

        {/* Preferences */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Preferred Study Time
            </label>
            <select
              value={goals.preferred_study_time}
              onChange={(e) => handleChange('preferred_study_time', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
              }}
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Learning Pace
            </label>
            <select
              value={goals.learning_pace}
              onChange={(e) => handleChange('learning_pace', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
              }}
            >
              <option value="relaxed">Relaxed</option>
              <option value="moderate">Moderate</option>
              <option value="intensive">Intensive</option>
            </select>
          </div>
        </div>

        {/* Schedule Days */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Review Day
            </label>
            <select
              value={goals.review_day}
              onChange={(e) => handleChange('review_day', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
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

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Mock Exam Day
            </label>
            <select
              value={goals.mock_exam_day}
              onChange={(e) => handleChange('mock_exam_day', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem'
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

        {/* Reminder Frequency */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Reminder Frequency
          </label>
          <select
            value={goals.reminder_frequency}
            onChange={(e) => handleChange('reminder_frequency', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '0.875rem'
            }}
          >
            <option value="never">Never</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
          </select>
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
