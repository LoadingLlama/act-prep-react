/**
 * University Logos Component
 * Displays scrolling university logos spanning full page width
 */

import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-25%)' },
  },

  universitiesSection: {
    marginTop: '48px',
    width: '100%',
    maxWidth: '800px',
    margin: '48px auto 0 auto',
    textAlign: 'center',
    overflow: 'hidden',
    paddingTop: '48px',
    paddingBottom: '48px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },

  universitiesLabel: {
    fontSize: '12px',
    color: '#ffffff',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '20px',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      marginBottom: '20px',
      fontWeight: '700',
    },
    '@media (max-width: 480px)': {
      fontSize: '13px',
      fontWeight: '700',
    },
  },

  universitiesScroller: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
  },

  universitiesTrack: {
    display: 'flex',
    gap: '48px',
    padding: '10px 0',
    animation: '$scroll 30s linear infinite',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      gap: '36px',
    },
  },

  universityLogo: {
    height: '40px',
    width: 'auto',
    opacity: 0.6,
    filter: 'grayscale(100%)',
    transition: 'all 0.3s ease',
    flexShrink: 0,
    objectFit: 'contain',
    '@media (max-width: 768px)': {
      height: '32px',
    },
    '&:hover': {
      opacity: 1,
      filter: 'grayscale(0%)',
    },
  },
});

const UniversityLogos = () => {
  const classes = useStyles();

  // University logos data
  const universities = [
    { src: "https://logo.clearbit.com/ucla.edu", alt: "UCLA" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/120px-MIT_logo.svg.png", alt: "MIT" },
    { src: "https://logo.clearbit.com/stanford.edu", alt: "Stanford" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/120px-Yale_University_Shield_1.svg.png", alt: "Yale" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/120px-Princeton_seal.svg.png", alt: "Princeton" },
    { src: "https://logo.clearbit.com/columbia.edu", alt: "Columbia" },
    { src: "https://logo.clearbit.com/duke.edu", alt: "Duke" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/120px-Seal_of_University_of_California%2C_Berkeley.svg.png", alt: "UC Berkeley" },
  ];

  return (
    <div id="universities" className={classes.universitiesSection}>
      <div className={classes.universitiesLabel}>Students accepted to top universities</div>
      <div className={classes.universitiesScroller}>
        <div className={classes.universitiesTrack}>
          {/* Original set */}
          {universities.map((university, index) => (
            <img
              key={`original-${index}`}
              src={university.src}
              alt={university.alt}
              className={classes.universityLogo}
            />
          ))}
          {/* Duplicate set 1 */}
          {universities.map((university, index) => (
            <img
              key={`duplicate1-${index}`}
              src={university.src}
              alt={university.alt}
              className={classes.universityLogo}
            />
          ))}
          {/* Duplicate set 2 */}
          {universities.map((university, index) => (
            <img
              key={`duplicate2-${index}`}
              src={university.src}
              alt={university.alt}
              className={classes.universityLogo}
            />
          ))}
          {/* Duplicate set 3 */}
          {universities.map((university, index) => (
            <img
              key={`duplicate3-${index}`}
              src={university.src}
              alt={university.alt}
              className={classes.universityLogo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityLogos;
