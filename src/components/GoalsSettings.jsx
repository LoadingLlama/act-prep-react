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
    <div>
      <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#111' }}>
        Study Goals
      </h3>

      {message.text && (
        <div style={{
          padding: '0.75rem',
          marginBottom: '1rem',
          background: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
          color: message.type === 'success' ? '#16a34a' : '#dc2626',
          borderRadius: '4px',
          fontSize: '0.8125rem'
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Test Date and Scores */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#666', marginBottom: '0.25rem' }}>
              Test Date
            </label>
            <input
              type="date"
              value={goals.target_exam_date}
              onChange={(e) => handleChange('target_exam_date', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '0.8125rem',
                background: 'transparent',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#666', marginBottom: '0.25rem' }}>
              Current Score
            </label>
            <input
              type="number"
              min="1"
              max="36"
              value={goals.current_score}
              onChange={(e) => handleChange('current_score', e.target.value)}
              placeholder="If taken"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '0.8125rem',
                background: 'transparent',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#666', marginBottom: '0.25rem' }}>
              Target Score
            </label>
            <input
              type="number"
              min="1"
              max="36"
              value={goals.target_score}
              onChange={(e) => handleChange('target_score', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '0.8125rem',
                background: 'transparent',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Daily Study Hours */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#666' }}>
              Study Hours
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: '#666', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={goals.use_alternating_weeks}
                onChange={(e) => handleChange('use_alternating_weeks', e.target.checked)}
                style={{ marginRight: '0.375rem', cursor: 'pointer', width: '14px', height: '14px' }}
              />
              Alternating weeks
            </label>
          </div>

          {/* Week 1 */}
          <div style={{ marginBottom: goals.use_alternating_weeks ? '0.75rem' : '0' }}>
            {goals.use_alternating_weeks && (
              <div style={{ fontSize: '0.6875rem', fontWeight: '500', color: '#999', marginBottom: '0.375rem' }}>
                Week 1
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <div key={day}>
                  <label style={{ fontSize: '0.6875rem', fontWeight: '500', color: '#999', marginBottom: '0.25rem', display: 'block', textTransform: 'capitalize' }}>
                    {day.slice(0, 3)}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="8"
                    step="0.25"
                    value={goals.study_hours[day] || 0}
                    onChange={(e) => handleStudyHoursChange(day, e.target.value, 1)}
                    style={{
                      width: '100%',
                      padding: '0.375rem',
                      border: 'none',
                      borderBottom: '1px solid #e0e0e0',
                      fontSize: '0.8125rem',
                      textAlign: 'center',
                      background: 'transparent',
                      outline: 'none'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Week 2 */}
          {goals.use_alternating_weeks && (
            <div>
              <div style={{ fontSize: '0.6875rem', fontWeight: '500', color: '#999', marginBottom: '0.375rem' }}>
                Week 2
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <div key={day}>
                    <label style={{ fontSize: '0.6875rem', fontWeight: '500', color: '#999', marginBottom: '0.25rem', display: 'block', textTransform: 'capitalize' }}>
                      {day.slice(0, 3)}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="8"
                      step="0.25"
                      value={goals.study_hours_week2[day] || 0}
                      onChange={(e) => handleStudyHoursChange(day, e.target.value, 2)}
                      style={{
                        width: '100%',
                        padding: '0.375rem',
                        border: 'none',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.8125rem',
                        textAlign: 'center',
                        background: 'transparent',
                        outline: 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Review Day and Mock Exam Day */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#666', marginBottom: '0.25rem' }}>
              Review Day
            </label>
            <select
              value={goals.review_day}
              onChange={(e) => handleChange('review_day', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '0.8125rem',
                background: 'transparent',
                outline: 'none',
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
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#666', marginBottom: '0.25rem' }}>
              Mock Exam Day
            </label>
            <select
              value={goals.mock_exam_day}
              onChange={(e) => handleChange('mock_exam_day', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '0.8125rem',
                background: 'transparent',
                outline: 'none',
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
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '0.625rem 1rem',
              background: saving ? '#ccc' : '#111',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              fontWeight: '500',
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsSettings;
