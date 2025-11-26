/**
 * Loading Skeleton Component
 * Provides fast loading skeletons for better perceived performance
 */

import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1, height = '100px' }) => {
  const skeletonStyle = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s ease-in-out infinite',
    borderRadius: '8px',
    marginBottom: '1rem'
  };

  const skeletons = Array.from({ length: count }, (_, i) => {
    if (type === 'card') {
      return (
        <div key={i} style={{
          ...skeletonStyle,
          height: height,
          width: '100%'
        }} />
      );
    }

    if (type === 'list') {
      return (
        <div key={i} style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            ...skeletonStyle,
            width: '60px',
            height: '60px',
            borderRadius: '8px'
          }} />
          <div style={{ flex: 1 }}>
            <div style={{
              ...skeletonStyle,
              height: '20px',
              width: '70%',
              marginBottom: '0.5rem'
            }} />
            <div style={{
              ...skeletonStyle,
              height: '16px',
              width: '40%'
            }} />
          </div>
        </div>
      );
    }

    if (type === 'text') {
      return (
        <div key={i} style={{
          ...skeletonStyle,
          height: '20px',
          width: `${Math.random() * 40 + 60}%`,
          marginBottom: '0.5rem'
        }} />
      );
    }

    return null;
  });

  return (
    <>
      <style>{`
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
      <div>{skeletons}</div>
    </>
  );
};

export default React.memo(LoadingSkeleton);
