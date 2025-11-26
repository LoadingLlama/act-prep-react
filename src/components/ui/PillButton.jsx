/**
 * Reusable Pill Button Component
 * Matches the Study Plan "Today" button styling
 */

import React from 'react';
import soundEffects from '../../services/soundEffects';

const PillButton = ({
  onClick,
  children,
  icon,
  disabled = false,
  variant = 'default' // 'default' or 'primary'
}) => {
  const handleClick = () => {
    if (!disabled) {
      soundEffects.playClick();
      onClick();
    }
  };

  const styles = {
    default: {
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      color: '#1a1a1a',
      hoverBg: '#f9fafb',
      hoverBorder: '#d1d5db'
    },
    primary: {
      background: '#08245b',
      border: '1px solid #08245b',
      color: '#ffffff',
      hoverBg: '#1e3a8a',
      hoverBorder: '#1e3a8a'
    }
  };

  const style = styles[variant];

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        background: style.background,
        border: style.border,
        borderRadius: '20px',
        padding: '0.4rem 0.75rem',
        fontSize: '0.75rem',
        fontWeight: '500',
        color: style.color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        gap: icon ? '0.4rem' : '0',
        opacity: disabled ? 0.6 : 1
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.background = style.hoverBg;
          e.target.style.borderColor = style.hoverBorder;
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.background = style.background;
        e.target.style.borderColor = style.border.replace('1px solid ', '');
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};

export default PillButton;
