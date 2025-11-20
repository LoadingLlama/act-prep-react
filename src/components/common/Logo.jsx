/**
 * Logo Component
 * Reusable logo component for Nomi Academy
 * Used across landing page, sidebar, and authentication
 */

import React from 'react';

const Logo = ({ size = 'medium', style = {}, onClick, clickable = false }) => {
  const sizes = {
    small: {
      fontSize: '20px',
    },
    medium: {
      fontSize: '24px',
    },
    large: {
      fontSize: '28px',
    },
  };

  const defaultStyle = {
    fontWeight: '600',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1e3a8a',
    letterSpacing: '-0.04em',
    margin: 0,
    cursor: clickable ? 'pointer' : 'default',
    transition: 'opacity 0.2s ease',
    ...sizes[size],
    ...style,
  };

  const hoverStyle = clickable ? {
    opacity: 0.7,
  } : {};

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        ...defaultStyle,
        ...(isHovered ? hoverStyle : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => clickable && setIsHovered(true)}
      onMouseLeave={() => clickable && setIsHovered(false)}
    >
      Nomi Academy
    </div>
  );
};

export default Logo;
