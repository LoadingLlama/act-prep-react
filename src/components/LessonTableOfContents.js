import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  toc: {
    position: 'fixed',
    right: '1.5rem',
    top: 'calc(60px + 2rem)',
    width: '200px',
    maxHeight: 'calc(100vh - 60px - 4rem)',
    overflowY: 'auto',
    padding: '0.75rem 0',
    zIndex: 50,
    opacity: 0.75,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 1
    },
    '&::-webkit-scrollbar': {
      width: '3px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#d1d5db',
      borderRadius: '2px'
    }
  },
  tocItem: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    padding: '0.4rem 0.75rem',
    marginBottom: '0.25rem',
    borderLeft: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
    lineHeight: '1.3',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    '&:hover': {
      color: '#6b7280',
      borderLeftColor: '#d1d5db'
    }
  },
  tocItemActive: {
    color: '#000000',
    borderLeft: 'none',
    paddingLeft: '0.75rem'
  },
  tocItemLocked: {
    color: '#d1d5db',
    cursor: 'not-allowed',
    '&:hover': {
      color: '#d1d5db',
      borderLeftColor: 'transparent'
    }
  },
  lockIcon: {
    fontSize: '0.65rem',
    opacity: 0.5
  },
  tocHeader: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: '#d1d5db',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem',
    paddingLeft: '0.75rem'
  }
});

const LessonTableOfContents = ({ sections, currentSection }) => {
  const classes = useStyles();
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Extract H3 headings from sections
    const extractedHeadings = [];

    sections.forEach((section, index) => {
      if (section.type !== 'quiz' && section.content) {
        // Extract h4 tags (subsections)
        const h4Matches = section.content.match(/<h4[^>]*>(.*?)<\/h4>/g);

        if (h4Matches) {
          h4Matches.forEach(match => {
            const title = match
              .replace(/<h4[^>]*>/, '')
              .replace('</h4>', '')
              .replace(/<[^>]*>/g, '')
              .replace(/^\d+\.\s*/, '') // Remove leading numbers
              .trim();

            if (title && title.length > 0) {
              extractedHeadings.push({
                title,
                sectionIndex: index
              });
            }
          });
        }
      }
    });

    setHeadings(extractedHeadings);
  }, [sections]);

  const handleHeadingClick = (sectionIndex) => {
    const sectionElement = document.querySelector(`[data-section-index="${sectionIndex}"]`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={classes.toc}>
      <div className={classes.tocHeader}>On this page</div>
      {headings.map((heading, index) => {
        const isLocked = heading.sectionIndex > currentSection;

        // Check if current section is within this heading's range
        const nextHeading = headings[index + 1];
        const isActive = currentSection >= heading.sectionIndex &&
                        (!nextHeading || currentSection < nextHeading.sectionIndex);

        return (
          <div
            key={index}
            className={`${classes.tocItem} ${isActive ? classes.tocItemActive : ''} ${isLocked ? classes.tocItemLocked : ''}`}
            onClick={() => !isLocked && handleHeadingClick(heading.sectionIndex)}
          >
            {isLocked && <span className={classes.lockIcon}>🔒</span>}
            {heading.title}
          </div>
        );
      })}
    </div>
  );
};

export default LessonTableOfContents;
