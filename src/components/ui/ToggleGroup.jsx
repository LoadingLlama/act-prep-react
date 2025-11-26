/**
 * Reusable Toggle Group Component
 * Matches the Study Plan Calendar/List toggle styling
 */

import React from 'react';
import soundEffects from '../../services/soundEffects';

const ToggleGroup = ({
  value,
  onChange,
  options = [],
  disabled = false
}) => {
  const handleChange = (optionValue) => {
    if (!disabled) {
      soundEffects.playClick();
      onChange(optionValue);
    }
  };

  return (
    <div style={{
      display: 'inline-flex',
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '20px',
      padding: '0.15rem',
      gap: '0.15rem',
      opacity: disabled ? 0.6 : 1,
      pointerEvents: disabled ? 'none' : 'auto'
    }}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleChange(option.value)}
          disabled={disabled}
          style={{
            background: value === option.value ? '#08245b' : 'transparent',
            border: 'none',
            borderRadius: '20px',
            padding: '0.4rem 0.9rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            color: value === option.value ? '#ffffff' : '#6b7280',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;
