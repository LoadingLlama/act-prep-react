/**
 * Add Event Modal Component
 * Allows users to add custom study events to their calendar
 * Supports different event types (lesson, practice, practice test, custom)
 * with custom colors for "other" events
 */

import React from 'react';
import { supabase } from '../../services/api/supabase.service';
import soundEffects from '../../services/soundEffects';

/**
 * Add Event Modal
 * @param {boolean} isOpen - Whether modal is visible
 * @param {function} onClose - Close modal callback
 * @param {object} customEventForm - Form state object
 * @param {function} setCustomEventForm - Form state setter
 * @param {object} user - Current user object
 * @param {function} loadLearningPath - Reload learning path callback
 */
const AddEventModal = ({
  isOpen,
  onClose,
  customEventForm,
  setCustomEventForm,
  user,
  loadLearningPath
}) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    soundEffects.playClick();
    onClose();
    setCustomEventForm({
      title: '',
      date: '',
      type: 'lesson',
      description: '',
      duration: 30,
      customColor: '#6b7280'
    });
  };

  const handleSave = async () => {
    if (!customEventForm.title || !customEventForm.date) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      soundEffects.playClick();

      // Save to Supabase
      const { data, error } = await supabase
        .from('custom_events')
        .insert([{
          user_id: user.id,
          title: customEventForm.title,
          scheduled_date: customEventForm.date,
          duration: customEventForm.duration,
          description: customEventForm.description,
          event_type: customEventForm.type,
          custom_color: customEventForm.type === 'custom' ? customEventForm.customColor : null
        }]);

      if (error) throw error;

      soundEffects.playSuccess();
      onClose();
      setCustomEventForm({
        title: '',
        date: '',
        type: 'lesson',
        description: '',
        duration: 30,
        customColor: '#6b7280'
      });

      // Reload learning path to include custom events
      loadLearningPath();
    } catch (error) {
      console.error('Error saving custom event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '1.5rem'
        }}>
          Add Custom Event
        </h2>

        {/* Event Title */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Event Title *
          </label>
          <input
            type="text"
            value={customEventForm.title}
            onChange={(e) => setCustomEventForm({ ...customEventForm, title: e.target.value })}
            placeholder="e.g., Study Session, Practice Problems"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.15s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#08245b'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Date */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Date *
          </label>
          <input
            type="date"
            value={customEventForm.date}
            onChange={(e) => setCustomEventForm({ ...customEventForm, date: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.15s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#08245b'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Event Type */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Event Type *
          </label>
          <select
            value={customEventForm.type}
            onChange={(e) => setCustomEventForm({ ...customEventForm, type: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.15s ease',
              background: '#ffffff',
              cursor: 'pointer'
            }}
            onFocus={(e) => e.target.style.borderColor = '#08245b'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="lesson">Lesson</option>
            <option value="practice">Practice</option>
            <option value="practice_test">Practice Test</option>
            <option value="custom">Other</option>
          </select>
        </div>

        {/* Custom Color Picker - Only show if type is "custom" */}
        {customEventForm.type === 'custom' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '0.5rem'
            }}>
              Color
            </label>
            <input
              type="color"
              value={customEventForm.customColor}
              onChange={(e) => setCustomEventForm({ ...customEventForm, customColor: e.target.value })}
              style={{
                width: '100%',
                height: '50px',
                padding: '0.25rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                outline: 'none',
                transition: 'border-color 0.15s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#08245b'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        )}

        {/* Duration */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Duration (minutes)
          </label>
          <input
            type="number"
            value={customEventForm.duration}
            onChange={(e) => setCustomEventForm({ ...customEventForm, duration: parseInt(e.target.value) || 30 })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.15s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#08245b'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Description (Optional)
          </label>
          <textarea
            value={customEventForm.description}
            onChange={(e) => setCustomEventForm({ ...customEventForm, description: e.target.value })}
            placeholder="Add any notes or details..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.15s ease',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => e.target.style.borderColor = '#08245b'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleCancel}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1a1a1a',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(0, 0, 0, 0.1)';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#08245b',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 3px 0 0 rgba(8, 36, 91, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0a2d75';
              e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(8, 36, 91, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#08245b';
              e.currentTarget.style.boxShadow = '0 3px 0 0 rgba(8, 36, 91, 0.25)';
            }}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
