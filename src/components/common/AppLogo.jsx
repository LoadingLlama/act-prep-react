/**
 * App Logo Component
 * Simple logo for app sidebar and navigation
 * Uses regular system font with lowercase text
 */

import React from 'react';

const AppLogo = ({ size = 'medium', style = {}, onClick, clickable = false }) => {
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
    color: '#ffffff',
    letterSpacing: '-0.02em',
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
      nomi academy
    </div>
  );
};

export default AppLogo;
