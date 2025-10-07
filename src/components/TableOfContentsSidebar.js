import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  tocSidebar: {
    position: 'fixed',
    left: '0.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '180px',
    maxHeight: '70vh',
    overflowY: 'auto',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 248, 255, 0.9) 100%)',
    backdropFilter: 'blur(12px)',
    border: '2px solid rgba(26, 115, 232, 0.15)',
    borderRadius: '12px',
    padding: '0.8rem',
    zIndex: 50,
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(26, 115, 232, 0.15)',
    opacity: 0.9,
    '&:hover': {
      opacity: 1,
      transform: 'translateY(-50%) scale(1.02)'
    }
  },

  tocHeader: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#1a73e8',
    marginBottom: '0.6rem',
    paddingBottom: '0.4rem',
    borderBottom: '2px solid rgba(26, 115, 232, 0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },

  contentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    marginBottom: '0.8rem'
  },

  contentItem: {
    display: 'block',
    padding: '0.6rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: 'rgba(237, 242, 247, 0.8)',
      transform: 'translateY(-1px)'
    }
  },

  contentItemActive: {
    background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.15) 0%, rgba(43, 119, 201, 0.1) 100%)',
    boxShadow: '0 4px 12px rgba(26, 115, 232, 0.25)',
    border: '1px solid rgba(26, 115, 232, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(26, 115, 232, 0.2)'
    }
  },

  contentItemCompleted: {
    opacity: 0.8,
    background: 'rgba(76, 175, 80, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(76, 175, 80, 0.15)'
    }
  },

  contentItemUpcoming: {
    opacity: 0.5,
    cursor: 'not-allowed',
    background: 'rgba(158, 158, 158, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(158, 158, 158, 0.05)',
      transform: 'none'
    }
  },

  itemTitle: {
    fontSize: '0.75rem',
    color: '#4a5568',
    lineHeight: '1.3',
    fontWeight: '500',
    marginBottom: '0.2rem'
  },

  itemTitleActive: {
    color: '#1a73e8',
    fontWeight: '700'
  },

  itemTitleCompleted: {
    color: '#4caf50',
    fontWeight: '600'
  },

  itemTitleUpcoming: {
    color: '#a0aec0'
  },

  itemSubtext: {
    fontSize: '0.65rem',
    color: '#718096',
    fontWeight: '500'
  },

  quizIndicator: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
    color: 'white',
    fontSize: '0.6rem',
    padding: '0.1rem 0.4rem',
    borderRadius: '10px',
    marginLeft: '0.4rem',
    fontWeight: '700',
    boxShadow: '0 2px 4px rgba(255, 107, 53, 0.3)'
  },

  progressSection: {
    borderTop: '1px solid rgba(26, 115, 232, 0.1)',
    paddingTop: '0.6rem'
  },

  progressIndicator: {
    width: '100%',
    height: '3px',
    backgroundColor: '#e3f2fd',
    borderRadius: '3px',
    marginBottom: '0.5rem',
    overflow: 'hidden'
  },

  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.5s ease',
    background: 'linear-gradient(90deg, #1a73e8 0%, #2196f3 50%, #4caf50 100%)',
    boxShadow: '0 0 8px rgba(26, 115, 232, 0.4)'
  },

  progressText: {
    fontSize: '0.7rem',
    color: '#718096',
    textAlign: 'center',
    fontWeight: '500'
  }
});

const TableOfContentsSidebar = ({
  sections = [],
  currentSection = 0,
  maxLoadedSection = 0,
  onSectionClick = null,
  typingSpeed = 35,
  onSpeedChange = null
}) => {
  const classes = useStyles();
  const [collapsed, setCollapsed] = React.useState(false);
  const [expandedChapters, setExpandedChapters] = React.useState({});

  if (sections.length === 0) return null;

  // Group sections by chapter (based on first digit of chapterNum)
  const groupedSections = sections.reduce((acc, section, index) => {
    const chapterKey = section.chapterNum ? section.chapterNum.split('.')[0] : 'intro';
    if (!acc[chapterKey]) {
      acc[chapterKey] = {
        title: chapterKey === 'intro' ? 'Introduction' : `Chapter ${chapterKey}`,
        sections: []
      };
    }
    acc[chapterKey].sections.push({ ...section, originalIndex: index });
    return acc;
  }, {});

  const toggleChapter = (chapterKey) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterKey]: !prev[chapterKey]
    }));
  };


  const getSectionTitle = (section, index) => {
    if (section.type === 'interactive') {
      return section.data?.title || `Practice Quiz ${index + 1}`;
    }
    if (section.type === 'quiz') {
      return section.data?.title || `Interactive Quiz ${index + 1}`;
    }

    // Extract meaningful title from text content
    const content = section.content || '';

    // Priority 1: H3 headers (main section titles)
    const h3Match = content.match(/<h3[^>]*>(.*?)<\/h3>/);
    if (h3Match) {
      let title = h3Match[1].replace(/<[^>]*>/g, '').trim();
      title = title.replace(/^\d+\.\s*/, ''); // Remove leading numbers
      title = title.replace(/^Chapter\s+\d+:\s*/, ''); // Remove chapter prefixes
      return title;
    }

    // Priority 2: H4 headers (concept boxes)
    const h4Match = content.match(/<h4[^>]*>(.*?)<\/h4>/);
    if (h4Match) {
      let title = h4Match[1].replace(/<[^>]*>/g, '').trim();
      return title;
    }

    // Priority 3: Strong tags (key concepts)
    const strongMatch = content.match(/<strong[^>]*>(.*?)<\/strong>/);
    if (strongMatch) {
      let title = strongMatch[1].replace(/<[^>]*>/g, '').trim();
      // Clean specific patterns for better titles
      if (title.includes('PRO TIP')) return 'PRO TIP: Cover Test';
      if (title.includes('Quick Test')) return 'Quick Test Method';
      if (title.includes('Common subordinating')) return 'Subordinating Conjunctions';
      return title.length > 40 ? title.substring(0, 40) + '...' : title;
    }

    // Priority 4: Specific content patterns
    if (content.includes('Examples:')) {
      // Determine what kind of examples based on context
      if (content.includes('Independent')) return 'Independent Clause Examples';
      if (content.includes('Dependent')) return 'Dependent Clause Examples';
      if (content.includes('Phrase')) return 'Phrase Examples';
      if (content.includes('Cover')) return 'Cover Test Examples';
      return 'Examples';
    }

    // Priority 5: Key concept indicators
    const conceptMatch = content.match(/(independent|dependent|compound|complex|simple)\s+(clause|sentence)/i);
    if (conceptMatch) {
      return `${conceptMatch[1]} ${conceptMatch[2]}s`.replace(/^\w/, c => c.toUpperCase());
    }

    // Priority 6: Special patterns
    if (content.includes('Understanding these three components')) return 'Introduction';
    if (content.includes('FANBOYS')) return 'FANBOYS Conjunctions';
    if (content.includes('Golden Rules')) return '5 Golden Rules';
    if (content.includes('comma splice')) return 'Fixing Comma Splices';

    // Priority 7: Fallback to meaningful text
    const cleanText = content.replace(/<[^>]*>/g, '').trim();
    if (cleanText.length > 0) {
      // Get first meaningful phrase
      const sentences = cleanText.split(/[.!?]+/);
      if (sentences.length > 0 && sentences[0].trim()) {
        const words = sentences[0].trim().split(' ').slice(0, 6).join(' ');
        return words.length > 40 ? words.substring(0, 40) + '...' : words;
      }
    }

    return `Section ${index + 1}`;
  };

  const getItemClass = (index) => {
    let className = classes.contentItem;

    if (index === currentSection) {
      className += ` ${classes.contentItemActive}`;
    } else if (index <= maxLoadedSection) {
      className += ` ${classes.contentItemCompleted}`;
    } else {
      className += ` ${classes.contentItemUpcoming}`;
    }

    return className;
  };

  const getTitleClass = (index) => {
    let className = classes.itemTitle;

    if (index === currentSection) {
      className += ` ${classes.itemTitleActive}`;
    } else if (index <= maxLoadedSection) {
      className += ` ${classes.itemTitleCompleted}`;
    } else {
      className += ` ${classes.itemTitleUpcoming}`;
    }

    return className;
  };

  const handleSectionClick = (index) => {
    if (onSectionClick && index <= maxLoadedSection) {
      onSectionClick(index);
    }
  };

  return (
    <div className={classes.tocSidebar} style={{ width: collapsed ? '60px' : '220px', transition: 'width 0.3s ease' }}>
      <div className={classes.tocHeader} style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer'
      }} onClick={() => setCollapsed(!collapsed)}>
        {!collapsed && 'Contents'}
        <span style={{
          fontSize: '0.9rem',
          transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
          transition: 'transform 0.3s ease'
        }}>
          {collapsed ? '▶' : '◀'}
        </span>
      </div>

      {!collapsed && (
        <>
          <div className={classes.contentsList}>
            {Object.entries(groupedSections).map(([chapterKey, chapterData]) => {
              const isExpanded = expandedChapters[chapterKey] !== false; // Default to expanded

              return (
                <div key={chapterKey}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#1a73e8',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderRadius: '6px',
                      background: 'rgba(26, 115, 232, 0.05)',
                      marginBottom: '0.3rem'
                    }}
                    onClick={() => toggleChapter(chapterKey)}
                  >
                    <span>{chapterData.title}</span>
                    <span style={{
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      fontSize: '0.7rem'
                    }}>
                      ▶
                    </span>
                  </div>

                  {isExpanded && chapterData.sections.map((section) => {
                    const title = getSectionTitle(section, section.originalIndex);
                    const isQuiz = section.type === 'interactive' || section.type === 'quiz';

                    return (
                      <div
                        key={section.originalIndex}
                        className={getItemClass(section.originalIndex)}
                        onClick={() => handleSectionClick(section.originalIndex)}
                        style={{ marginLeft: '0.5rem' }}
                      >
                        <div className={getTitleClass(section.originalIndex)}>
                          {title}
                          {isQuiz && (
                            <span className={classes.quizIndicator}>
                              QUIZ
                            </span>
                          )}
                        </div>
                        <div className={classes.itemSubtext}>
                          {isQuiz
                            ? `${section.data?.questions?.length || 0} questions`
                            : 'Reading'
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className={classes.progressSection}>
            <div className={classes.progressText}>
              {currentSection + 1} of {sections.length} sections
            </div>
          </div>
        </>
      )}

      {collapsed && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem'
        }}>
          <div style={{
            fontSize: '0.7rem',
            color: '#1a73e8',
            fontWeight: '600',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}>
            {currentSection + 1}/{sections.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOfContentsSidebar;