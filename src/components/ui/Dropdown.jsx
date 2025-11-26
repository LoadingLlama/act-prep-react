/**
 * Reusable Dropdown Component
 * Matches the Study Plan dropdown styling
 */

import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import soundEffects from '../../services/soundEffects';

const Dropdown = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    soundEffects.playClick();
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => {
          if (!disabled) {
            soundEffects.playClick();
            setIsOpen(!isOpen);
          }
        }}
        disabled={disabled}
        style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          padding: '0.5rem 0.75rem',
          fontSize: '0.75rem',
          fontWeight: '500',
          color: disabled ? '#9ca3af' : '#1a1a1a',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: disabled ? 0.6 : 1
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = '#f9fafb';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#ffffff';
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <HiChevronDown style={{
          width: '14px',
          height: '14px',
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }} />
      </button>

      {isOpen && (
        <>
          {/* Invisible backdrop to close dropdown */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
          />
          {/* Dropdown menu */}
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            right: 0,
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            minWidth: '120px',
            overflow: 'hidden'
          }}>
            {options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  background: value === option.value ? '#f9fafb' : 'transparent',
                  border: 'none',
                  borderBottom: index < options.length - 1 ? '1px solid #f3f4f6' : 'none',
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  color: value === option.value ? '#08245b' : '#1a1a1a',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = value === option.value ? '#f9fafb' : 'transparent';
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
