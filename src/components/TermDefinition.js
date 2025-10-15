import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  termWrapper: {
    position: 'relative',
    display: 'inline',
    cursor: 'help'
  },
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-10px)',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.25rem',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    minWidth: '320px',
    maxWidth: '400px',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    '&.visible': {
      opacity: 1,
      pointerEvents: 'auto',
      transform: 'translateX(-50%) translateY(-8px)'
    }
  },
  tooltipTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    '& svg': {
      width: '18px',
      height: '18px',
      color: '#3b82f6'
    },
    '& h4': {
      fontSize: '1.1rem !important',
      fontWeight: '600 !important',
      color: '#3b82f6 !important',
      margin: '0 !important',
      padding: '0 !important'
    }
  },
  tooltipContent: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#4b5563',
    marginBottom: '0.75rem'
  },
  tooltipContext: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#6b7280',
    fontStyle: 'italic'
  },
  relatedSection: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb',
    '& h5': {
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: '0.5rem'
    }
  },
  relatedTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  tag: {
    backgroundColor: '#059669',
    color: '#ffffff',
    fontSize: '0.8rem',
    fontWeight: '500',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    border: 'none'
  }
});

const TermDefinition = ({ term, children }) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  // Definition data for each term
  const definitions = {
    'Acute Angles': {
      definition: 'An angle that measures less than 90 degrees.',
      context: 'On the ACT, acute angles often appear in triangle problems and trigonometry questions.',
      related: ['Right Angles', 'Obtuse Angles']
    },
    'Right Angles': {
      definition: 'An angle that measures exactly 90 degrees, forming a perfect corner.',
      context: 'Right angles are fundamental to the Pythagorean theorem and perpendicular lines.',
      related: ['Acute Angles', 'Perpendicular Lines']
    },
    'Obtuse Angles': {
      definition: 'An angle that measures greater than 90 degrees but less than 180 degrees.',
      context: 'Obtuse angles appear in obtuse triangles and when analyzing polygon interior angles.',
      related: ['Acute Angles', 'Straight Angles']
    },
    'Straight Angles': {
      definition: 'An angle that measures exactly 180 degrees, forming a straight line.',
      context: 'Straight angles are key to understanding supplementary angles and angles on a line.',
      related: ['Supplementary Angles', 'Linear Pairs']
    },
    'Complementary Angles': {
      definition: 'Two angles that add up to 90 degrees.',
      context: 'The ACT frequently tests complementary angles in right triangles and perpendicular lines.',
      related: ['Supplementary Angles', 'Right Angles']
    },
    'Supplementary Angles': {
      definition: 'Two angles that add up to 180 degrees.',
      context: 'Supplementary angles appear when two angles form a straight line or in parallel line problems.',
      related: ['Complementary Angles', 'Linear Pairs']
    },
    'Vertical Angles': {
      definition: 'Opposite angles formed when two lines intersect. They are always equal.',
      context: 'Vertical angles are one of the most tested angle relationships on the ACT.',
      related: ['Adjacent Angles', 'Intersecting Lines']
    },
    'Adjacent Angles': {
      definition: 'Two angles that share a common vertex and side but do not overlap.',
      context: 'Adjacent angles on a straight line are supplementary, a common ACT pattern.',
      related: ['Vertical Angles', 'Linear Pairs']
    },
    'transversal': {
      definition: 'A line that crosses two or more parallel lines.',
      context: 'When a transversal crosses parallel lines, it creates corresponding, alternate interior, and alternate exterior angles.',
      related: ['Parallel Lines', 'Corresponding Angles']
    }
  };

  const termData = definitions[term];

  if (!termData) {
    return <>{children}</>;
  }

  return (
    <span
      className={classes.termWrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div className={`${classes.tooltip} ${isVisible ? 'visible' : ''}`}>
        <div className={classes.tooltipTitle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
          </svg>
          <h4>{term}</h4>
        </div>
        <div className={classes.tooltipContent}>
          {termData.definition}
        </div>
        {termData.context && (
          <div className={classes.tooltipContext}>
            {termData.context}
          </div>
        )}
        {termData.related && termData.related.length > 0 && (
          <div className={classes.relatedSection}>
            <h5>Related:</h5>
            <div className={classes.relatedTags}>
              {termData.related.map((relatedTerm, i) => (
                <span key={i} className={classes.tag}>{relatedTerm}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </span>
  );
};

export default TermDefinition;
